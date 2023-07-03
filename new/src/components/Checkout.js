import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { delItem } from "../redux/actions/index";
import * as Yup from "yup";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const SigninSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  userName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.number().required("Required"),
  paymentMethod: Yup.mixed().required("Required"),
  ccName: Yup.string()
    .required("Required")
    .matches(/^[A-Z\s]+$/, "Invalid Name"),
  ccNumber: Yup.number().required("Required"),
  ccExpiration: Yup.number().required("Required"),
  ccCvv: Yup.number().required("Required"),
});

const Checkout = () => {
  const state = useSelector((state) => state.addItem);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    paymentMethod: "",
    sameAddress: false,
    saveInfo: false,
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCvv: "",
    promoCode: "",
  });
  var total = 0;
  const itemList = (item) => {
    total = total + item.price;
    return (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between lh-sm"
      >
        <div>
          <h6 className="my-0">{item.title}</h6>
        </div>
        <span className="text-muted">${item.price}</span>
      </li>
    );
  };
  const handleSubmit = (values, { resetForm }) => {
    axios
      .post("https://64745acf7de100807b1ab87d.mockapi.io/orders", {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        address: values.address,
        address2: values.address2,
        country: values.country,
        state: values.state,
        zip: values.zip,
        paymentMethod: values.paymentMethod,
        sameAddress: values.sameAddress,
        saveInfo: values.saveInfo,
        ccName: values.ccName,
        ccNumber: values.ccNumber,
        ccExpiration: values.ccExpiration,
        ccCvv: values.ccCvv,
        promoCode: values.promoCode,
        product: state,
      })
      .then((res) => {
        toastr.success("Payment successful!", "", {
          positionClass: "toast-top-right",
        });
        state.forEach((element) => {
          dispatch(delItem(element));
        });
        resetForm();
      })
      .catch((err) => {
        toastr.error("Error: " + err);
      });
  };
  return (
    <Formik
      initialValues={form}
      validationSchema={SigninSchema}
      onSubmit={handleSubmit}
    >
      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {state.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {state.map(itemList)}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total}</strong>
              </li>
            </ul>

            <Form className="card p-2">
              <div className="input-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                  name="promoCode"
                />
                <button type="submit" className="btn btn-secondary">
                  Reset
                </button>
              </div>
            </Form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>

            <Form className="needs-validation">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Your first name"
                    name="firstName"
                    required
                  />
                  <ErrorMessage
                    name="firstName"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Your last name"
                    name="lastName"
                    required
                  />
                  <ErrorMessage
                    name="lastName"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <Field
                      type="text"
                      className="form-control"
                      id="username"
                      name="userName"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <ErrorMessage
                    name="userName"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    required
                  />
                  <ErrorMessage
                    name="address"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    placeholder="Apartment or suite"
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="country"
                    name="country"
                    required
                  >
                    <option>Choose...</option>
                    <option value="Việt Nam">Việt Nam</option>
                  </Field>
                  <ErrorMessage
                    name="country"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <Field
                    as="select"
                    className="form-select"
                    id="state"
                    name="state"
                    required
                  >
                    <option>Choose...</option>
                    <option value="Hà Nội">Hà Nội</option>
                  </Field>
                  <ErrorMessage
                    name="state"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    required
                  />
                  <ErrorMessage
                    name="zip"
                    component={"span"}
                    className="text-danger"
                  />
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <Field
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                  name="sameAddress"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <Field
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                  name="saveInfo"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Payment</h4>

              <div className="my-3">
                <div className="form-check">
                  <Field
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    value="Credit card"
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    value="Debit card"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    value="Paypal"
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
                <ErrorMessage
                  name="paymentMethod"
                  component={"span"}
                  className="text-danger"
                />
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cc-name"
                    name="ccName"
                    required
                  />
                  <ErrorMessage
                    name="ccName"
                    component={"span"}
                    className="text-danger"
                  />
                  <div>
                    <small className="text-muted">
                      Full name as displayed on card
                    </small>
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cc-number"
                    name="ccNumber"
                    required
                  />
                  <ErrorMessage
                    name="ccNumber"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    name="ccExpiration"
                    required
                  />
                  <ErrorMessage
                    name="ccExpiration"
                    component={"span"}
                    className="text-danger"
                  />
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    name="ccCvv"
                    required
                  />
                  <ErrorMessage
                    name="ccCvv"
                    component={"span"}
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </Form>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default Checkout;
