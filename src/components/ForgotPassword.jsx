import PropTypes from "prop-types";
import { useState } from "react";
import { forgotPassword } from "../fireAdapter";
import Error from "./Error";
import "./LoaderOverlay.css";

const ForgotPassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    setLoading(true);
    forgotPassword(email)
      .then(() => {
        console.log("Password reset email sent successfully.");
        setCurrentPage("resetPassword");
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
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword} disabled={loading}>
        Send Password Reset Code
      </button>
      {error && <Error message={error} />}
    </div>
  );
};

ForgotPassword.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default ForgotPassword;
