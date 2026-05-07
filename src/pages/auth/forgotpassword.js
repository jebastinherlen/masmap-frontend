import React, { useState } from "react";
import api from "../../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/users/forgot-password",
        { email },
        { skipAuth: true }
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Forgot Password</h2>

        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-center mt-3">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;