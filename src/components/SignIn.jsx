import PropTypes from "prop-types";
import { useState } from "react";
import { signIn } from "../fireAdapter";
import Error from "./Error";
import "./LoaderOverlay.css";

const SignIn = ({ setUserCredentials, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    signIn(email, password)
      .then((userCredential) => {
        setUserCredentials(userCredential);
        setCurrentPage("home");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSignUp = () => {
    setCurrentPage("signUp");
  };

  const handleForgotPassword = () => {
    setCurrentPage("forgotPassword");
  };

  return (
    <div>
      {loading && (
        <div className="loader-overlay">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn} disabled={loading}>
        Sign In
      </button>
      <button onClick={handleSignUp} disabled={loading}>
        Sign Up
      </button>
      <button onClick={handleForgotPassword}>Forgot Password</button>
      {error && <Error message={error} />}
    </div>
  );
};

SignIn.propTypes = {
  setUserCredentials: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default SignIn;
