import React, { useState } from "react";
import axiosInstance from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css"; // Include CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For navigation

  const isFormValid = username && password;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axiosInstance.post("/api/user/login", {
          email: username,
          password: password,
        });

        if (response.status === 200) {
          //Store the token in LocalStorage
          const token = response.data.token;
          const userId = response.data.userId;
          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);
          // Navigate to home page if login is successful
          navigate("/home");
        } else {
          setErrorMessage("Invalid username or password. Please try again.");
        }
      } catch (error) {
        // Display error message if login fails
        setErrorMessage("Invalid username or password. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div
          className="title"
          style={{ marginBottom: "20px", fontSize: "28px" }}
        >
          Budget Planner
        </div>
        <div className="title" style={{ fontSize: "20px", margin: 0 }}>
          Login
        </div>
        <div
          className="title"
          style={{ fontWeight: 300, color: "#282B2D", fontSize: "20px" }}
        >
          Sign in to your account
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            type="submit"
            disabled={!isFormValid}
            className="login-button"
          >
            Login
          </button>
        </form>
        <form className="login-form">
          <button type="submit" className="register-button">
            <Link to="/register" className="register-link">
              Register new account
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
