import PropTypes from "prop-types";
import { useState } from "react";
import { signUp } from "../fireAdapter";
import Error from "./Error";
import "./LoaderOverlay.css";

const SignUp = ({ setUserCredentials, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordValidationRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  const passwordValidationMessage =
    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

  const handleSignIn = () => {
    setCurrentPage("signIn");
  };

  const handleSignUp = () => {
    if (!emailValidationRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    if (!passwordValidationRegex.test(password)) {
      setError(passwordValidationMessage);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    signUp(email, password)
      .then((userCredential) => {
        setUserCredentials(userCredential);
        setCurrentPage("signIn");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignIn} disabled={loading}>
        Sign In
      </button>
      <button onClick={handleSignUp} disabled={loading}>
        Sign Up
      </button>
      {error && <Error message={error} />}
    </div>
  );
};

SignUp.propTypes = {
  setUserCredentials: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default SignUp;
