import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_ROUTES } from '../app-modules/api_routes';
import "./login.css";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const login = () => {
    setError(""); // Clear any previous errors
    Axios.post(API_ROUTES.login, {
      email: email,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setError(response.data.message || "An error occurred"); // Display the error message from the server, or a generic error message
      } else {
        navigate("/dashboard");
        localStorage.setItem("token", response.data.token);
      }
    }).catch((error) => {
      setError("An error occurred while logging in"); // Display generic error message for network or other errors
    });
  };

  return (
    <Fragment>
      <div className="loginform">
        <form onSubmit={handleSubmit}>
          <div className="emailinp">
            <label>
              <h3>Email</h3>
            </label>
            <br />
            <input
              type="text"
              required
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password">
            <label>
              <h3>Password</h3>
            </label>
            <br />
            <input
              type="password"
              required
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="submit-btn">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="button" className="btn btn-primary">
              Cancel
            </button>
          </div>
        </form>
        <div className="already">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        {error && (
          <div className="error-container">
            <p className="error-msg">{error}</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Loginform;