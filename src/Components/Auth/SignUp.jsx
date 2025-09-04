import "../Auth/signup.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/firebase";
import { useState, useEffect } from "react";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [welcome, setwelcome] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setwelcome(
          `Welcome, ${currentUser.displayName || name || currentUser.email}`
        );
        setisSignUp(true);
        setloading(false);
      } else {
        setisSignUp(false);
      }
    });

    return () => unsubscribe();
  }, [name]);

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

  const handleSignUp = () => {
    if (!email || !password || !name || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setwelcome(`Welcome, ${name || userCredential.user.email}`);
        setisSignUp(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setwelcome(`Welcome, ${result.user.displayName}`);
        setisSignUp(true);
      })
      .catch((err) => console.log("sign in failed " + err));
  };

  return (
    <div className="main-signUp">
      <div className="signUp-container">
        {!isSignUp ? (
          <>
            <div className="signUp-image">
              <div className="signUp-image-cont">
                <img src="src/assets/login-bg/sign up.jpg" alt="" />
              </div>
            </div>

            <div className="info-signUp">
              <div className="signUp-headings">
                <h2>Sign Up to your Account</h2>
                <p>Create an account to get started!</p>
              </div>

              <div className="signUp-methods">
                <button className="google-btn" onClick={handleSignInWithGoogle}>
                  <FcGoogle style={{ fontSize: "20px" }} />
                  Continue with Google
                </button>
              </div>

              <div className="signUp-w-email">
                <span>or continue with email</span>

                <label htmlFor="Full-Name">
                  <input
                    type="text"
                    id="nameInput"
                    placeholder="Full Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

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

                <label htmlFor="confirm-password">
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </label>

                <button className="signUp-Btn" onClick={handleSignUp}>
                  Create Account
                </button>
                <p>
                  Already have account? <Link to="/logIn">Sign In</Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="welcome-text">
            <h1>{welcome}</h1>
            <p>We’re glad to have you here !</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
