import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_ROUTES } from "../app-modules/api_routes";
import "./login.css";

const Signinform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }

    const userData = {
      email: email,
      password: password,
      name: name
    };

    try {
      const response = await Axios.post(API_ROUTES.signup, userData);

      if (response.status === 200) {
        navigate('/login');
      } else {
        console.log("User registration failed with status:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("User with this email already exists");
      } else {
        console.error("User registration failed:", error);
      }
    }
  };

  return (
    <div className="loginform">
      <form onSubmit={handleSubmit}>
        <div className="emailinp">
          <label>
            <h3>Email</h3>
          </label>
          <br />
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="emailinp">
          <label>
            <h3>Password</h3>
          </label>
          <br />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="emailinp">
          <label>
            <h3>Name</h3>
          </label>
          <br />
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="submit-btn">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <button type="button" className="btn btn-primary">
            Cancel
          </button>
        </div>
      </form>
      <div className="already">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      {error && (
        <div className="error-container">
          <p className="error-msg">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Signinform;
