import PropTypes from "prop-types";
import { useState } from "react";
import { forgotPassword } from "../fireAdapter";
import Error from "./Error";

const ForgotPassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleForgotPassword = () => {
    forgotPassword(email)
      .then(() => {
        console.log("Password reset email sent successfully.");
        setCurrentPage("resetPassword");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Password Reset Code</button>
      {error && <Error message={error} />}
    </div>
  );
};

ForgotPassword.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default ForgotPassword;
