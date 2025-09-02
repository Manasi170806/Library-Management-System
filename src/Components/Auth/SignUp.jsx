import "../Auth/signup.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function SignUp() {
  return (
    <div className="main-signUp">
      <div className="signUp-container">
        {/* side image for create account */}
        <div className="signUp-image">
          <div className="signUp-image-cont">
            <img src="src/assets/login-bg/sign up.jpg" alt="" />
          </div>
        </div>

        {/* input fields for log in */}
        <div className="info-signUp">
          <div className="signUp-headings">
            <h2>Sign Up to your Account</h2>
            <p>Create an account to get started!</p>
          </div>

          <div className="signUp-methods">
            <button className="google-btn">
              <FcGoogle style={{ fontSize: "20px" }} />
              Continue with Google
            </button>
          </div>

          <div className="signUp-w-email">
            <span>or continue with email</span>

            <label htmlFor="Full-Name">
              <input
                type="text"
                name=""
                id="nameInput"
                placeholder="Full Name"
              />
            </label>

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

            <label htmlFor="confirm-password">
              <input
                type="password"
                name=""
                id="confirm-password"
                placeholder="Confirm Password"
              />
            </label>

            <button className="signUp-Btn">Create Account</button>
            <p>
              Already have account? <Link to="/logIn">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
