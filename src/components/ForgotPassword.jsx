import PropTypes from "prop-types";
import { useState } from "react";
import { forgotPassword } from "../fireAdapter";

const ForgotPassword = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    forgotPassword(email)
      .then(() => {
        console.log("Password reset email sent successfully.");
        setCurrentPage("resetPassword");
      })
      .catch((error) => {
        console.error("Forgot password error:", error);
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
    </div>
  );
};

ForgotPassword.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default ForgotPassword;
