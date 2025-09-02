import React from "react";
import "../Auth/login.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  // const auth = getAuth();
  // signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

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
            <button className="google-btn">
              <FcGoogle style={{ fontSize: "20px" }} />
              Continue with Google
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

            <button className="login-Btn">Log in</button>
            <p>
              don't have account? <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </div>

        {/* side image related to login */}
        <div className="login-image">
          <div className="login-image-cont">
            <img src="src/assets/login-bg/login.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// Api key --> AIzaSyBKlhPox5WtqjApU1AwNdkjXUgLb4b87r4
