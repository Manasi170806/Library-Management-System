import React from "react";
import "../Auth/login.css";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa6";
import { ImFacebook } from "react-icons/im";

function Login() {
  return (
    <div className="main-logIn">
      <div className="login-container">
        {/* input fields for log in */}
        <div className="info-login">
          <div className="login-headings">
            <h2>Log in to your Account</h2>
            <p>Welcome back! Select method to log in:</p>
          </div>

          <div className="login-methods">
            <button>
              <FaGoogle />
              Google
            </button>
            <button>
              <ImFacebook />
              Facebook
            </button>
          </div>

          <div className="login-w-email">
            <span>or continue with email</span>

            <label htmlFor="email">
              <input type="email" name="" id="emailInput" placeholder="Email" />
            </label>

            <label htmlFor="password">
              <input
                type="password"
                name=""
                id="passwordInput"
                placeholder="Password"
              />
            </label>

            <button>Log in</button>
            <p>
              don't have account? <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </div>

        {/* side image related to login */}
        <div className="login-image"></div>
      </div>
    </div>
  );
}

export default Login;
