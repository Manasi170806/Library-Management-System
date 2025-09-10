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

// Only this email is allowed
const ADMIN_EMAIL = "8438tanvipatel@gmail.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setUser(currentUser);
      } else {
        if (currentUser) {
          alert("❌ You are not authorized to access this app.");
          signOut(auth);
        }
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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

  // Email login only for admin
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user.email !== ADMIN_EMAIL) {
          alert("❌ Only admin can log in.");
          signOut(auth);
        } else {
          alert("✅ Login successful, Welcome Admin!");
        }
      })
      .catch((err) => alert("Login failed: " + err.message));
  };

  // Google login only for admin
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user.email !== ADMIN_EMAIL) {
          alert("❌ Only admin can log in with Google.");
          signOut(auth);
        }
      })
      .catch((err) => console.log("Google sign in failed: " + err.message));
  };

  const handleSignOut = () => {
    signOut(auth).then(() => alert("You have been logged out"));
  };

  return (
    <div className="main-logIn">
      <div className="login-container">
        {!user ? (
          <div className="info-login">
            <div className="login-headings">
              <h2>Admin Login</h2>
              <p>Only admin can access this panel.</p>
            </div>

            <div className="login-methods">
              <button className="google-btn" onClick={handleSignInWithGoogle}>
                <FcGoogle style={{ fontSize: "20px", marginRight: "8px" }} />
                Continue with Google
              </button>
            </div>

            <div className="login-w-email">
              <span>or login with email</span>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-Btn" onClick={handleSignIn}>
                Log in
              </button>
            </div>
          </div>
        ) : (
          <div className="log-Out">
            <h3>
              Welcome Admin!
              <p style={{ fontSize: "18px", color: "black", backgroundColor: "white" }}>{user.email}</p>
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
