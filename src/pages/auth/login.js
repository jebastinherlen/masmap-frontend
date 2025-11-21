// import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { useState, useEffect } from "react";
import api from "../../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the api instance and skip auth for login
      const res = await api.post(
        "/users/login",
        { email, password },
        { skipAuth: true }
      );

      // save token to localStorage
      localStorage.setItem("token", res.data.token);
      // optionally save user info
      if (res.data.user)
        localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login error", err);
      if (err.response && err.response.status === 401) {
        alert("Invalid email or password");
      } else {
        alert("Something went wrong. Please try again later.");
        setMessage(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="login-page container-sm-md-lg-xl d-flex flex-column align-items-center">
      <div className="form-group">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div>
            <button className="btn btn-success w-100">Login</button>
            <br />
            <div className="d-flex  align-items-center">
              <p className="mt-3">New User?</p>
              <Link to="/register">
                <button className="btn btn-primary">Signup</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Login;
