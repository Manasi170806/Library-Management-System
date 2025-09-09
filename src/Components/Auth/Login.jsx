import React, { useEffect, useState } from "react";
import "../Auth/login.css";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const ADMIN_EMAIL = "8438tanvipatel@gmail.com"; //password:8438tanvipatel

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setUser(currentUser);
      } else {
        if (currentUser) {
          alert("You are not authorized to access this app.");
          signOut(auth);
        }
        setUser(null);
      }
      setLoading(false);
    });

    return () => authChange();
  }, []);

  if (loading) {
    return (
      <p
        style={{
          textAlign: "center",
          margin: "5rem 0",
          fontSize: "20px",
          color: "blue",
        }}
      >
        Loading...
      </p>
    );
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => alert("Login successful"))
      .catch((err) => alert("Login failed: " + err));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => alert("Sign-out successful"))
      .catch((error) => alert("Error: " + error));
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user.email !== ADMIN_EMAIL) {
          alert("Only admin can login with Google.");
          signOut(auth);
        }
      })
      .catch((err) => console.log("Google sign in failed: " + err));
  };

  return (
    <div className="main-logIn">
      <div className="login-container">
        {!user ? (
          <div className="info-login">
            <div className="login-headings">
              <h2>Log in to your Account</h2>
              <p>Welcome back! Select method to log in:</p>
            </div>

            <div className="login-methods">
              <button className="google-btn" onClick={handleSignInWithGoogle}>
                <FcGoogle
                  style={{
                    fontSize: "20px",
                    marginRight: "8px",
                    marginTop: "5px",
                  }}
                />
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
            </div>
          </div>
        ) : (
          <div className="log-Out">
            <h3>
              Welcome Admin!
              <p
                style={{
                  fontSize: "18px",
                  color: "black",
                  fontWeight: "400",
                  backgroundColor: "white",
                }}
              >
                {user.email}
              </p>
            </h3>
            <button onClick={handleSignOut}>Log Out</button>
          </div>
        )}

        <div className="login-image">
          <div className="login-image-cont">
            <img src="src/assets/login-bg/login.jpg" alt="login-bg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
