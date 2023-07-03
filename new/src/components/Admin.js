import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
export default function Admin() {
  const [productOrder, setProductOrder] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://64745acf7de100807b1ab87d.mockapi.io/orders"
        );
        setProductOrder(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  const handleDone = async (id) => {
    try {
      await axios.delete(
        `https://64745acf7de100807b1ab87d.mockapi.io/orders/${id}`
      );
      setProductOrder((prevOrders) =>
        prevOrders.filter((order) => order.id !== id)
      );
      toastr.success("Order done!", "", {
        positionClass: "toast-bottom-right",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Order</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">User</th>
                <th scope="col">Email</th>
                <th scope="col">Address </th>
                <th scope="col">State</th>
                <th scope="col">Country</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productOrder.map((order) => {
                return (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.firstName}</td>
                    <td>{order.lastName}</td>
                    <td>{order.userName}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td>{order.state}</td>
                    <td>{order.country}</td>
                    <td>
                      {order.product.map((product) => {
                        return <div key={product.id}>{product.title}</div>;
                      })}
                    </td>
                    <td>
                      {order.product.map((product) => {
                        return <div key={product.id}>{product.price}</div>;
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleDone(order.id)}
                      >
                        Done
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
