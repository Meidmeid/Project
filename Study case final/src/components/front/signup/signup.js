import React, { useEffect, useState } from "react";
import "./signup.css";
import axios from "axios";
import data from "../../back/data/data";
// import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [dataUser, setDataUsert] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { handleAddUser } = props;

  function addInfo(e) {
    e.preventDefault();
    handleAddUser(dataUser);
    setDataUsert({ name: "", email: "", password: "" });
  }

  useEffect(() => {}, [dataUser]);
  return (
    <div className="signup">
      <form onSubmit={addInfo}>
        <h1>Hello, friend !</h1>
        <br />
        <div className="mb-3">
          <label forhtml="name" className="form-label">
            Your name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={dataUser.name}
            onChange={(e) =>
              setDataUsert({ ...dataUser, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label forhtml="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            value={dataUser.email}
            onChange={(e) =>
              setDataUsert({ ...dataUser, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label forhtml="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={dataUser.password}
            onChange={(e) =>
              setDataUsert({ ...dataUser, password: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
