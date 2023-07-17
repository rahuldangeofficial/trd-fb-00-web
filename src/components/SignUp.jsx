import PropTypes from "prop-types";
import { useState } from "react";
import { signUp } from "../fireAdapter";
import Error from "./Error";
import "./LoaderOverlay.css";

const SignUp = ({ setUserCredentials, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setCurrentPage("signIn");
  };

  const handleSignUp = () => {
    setLoading(true);
    signUp(email, password)
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
      {error && <Error message={error} />}
    </div>
  );
};

SignUp.propTypes = {
  setUserCredentials: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default SignUp;
