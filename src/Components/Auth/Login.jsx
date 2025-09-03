import React, { useState } from "react";
import "../Auth/login.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert("user login successful !!"))
      .catch((err) => alert("user login failed ! " + err));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
      })
      .catch((error) => {
        alert("An error happened." + error);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user.displayName);
      })
      .catch((err) => console.log("sign in failed " + err));
  };

  return (
    <div className="main-logIn">
      <div className="login-container">
        {/* input fields for log in */}
        {!auth.currentUser ? (
          <div className="info-login">
            <div className="login-headings">
              <h2>Log in to your Account</h2>
              <p>Welcome back! Select method to log in:</p>
            </div>

            <div className="login-methods">
              <button className="google-btn" onClick={handleSignInWithGoogle}>
                <FcGoogle style={{ fontSize: "20px" }} />
                Continue with Google
              </button>
            </div>

            <div className="login-w-email">
              <span>or continue with email</span>
              <label htmlFor="email">
                <input
                  type="email"
                  id="emailInput"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  id="passwordInput"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button className="login-Btn" onClick={handleSignIn}>
                Log in
              </button>
              <p>
                don’t have account? <Link to="/signup">Create Account</Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="log-Out">
            <h3>
              Welcome!
              <p
                style={{ fontSize: "18px", color: "black", fontWeight: "400" }}
              >
                {auth.currentUser.email}
              </p>
            </h3>
            <button onClick={handleSignOut}>Log Out</button>
          </div>
        )}

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
