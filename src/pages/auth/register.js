import React, { useState } from "react";
import "../../styles/register.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // ✅ use your axios instance

const Register = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/register", {
        name,
        email,
        password,
      }, { skipAuth: true });

      console.log("Register Success:", res.data);

      alert("Registration Successful!");
      navigate("/");

    } catch (error) {
      console.error("Registration Error:", error);
      alert(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="reg-page container-sm-md-lg-xl d-flex flex-column align-items-center">

      <div className="form-group">
        <h1>Register Page</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter Name..."
              onChange={(e) => SetName(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Email..."
              onChange={(e) => SetEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter Password..."
              onChange={(e) => SetPassword(e.target.value)}
            />
          </div>

          <br />

          <button className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
