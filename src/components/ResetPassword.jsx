import PropTypes from "prop-types";
import { useState } from "react";
import { applyPasswordResetCode } from "../fireAdapter";
import Error from "./Error";
import "./LoaderOverlay.css";

const ResetPassword = ({ setCurrentPage }) => {
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const passwordValidationRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
  const passwordValidationMessage =
    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

  const handlePasswordReset = () => {
    if (!passwordValidationRegex.test(newPassword)) {
      setError(passwordValidationMessage);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);

    applyPasswordResetCode(resetCode, newPassword)
      .then(() => {
        setSuccessMessage("Password reset successful. You can now sign in with your new password.");
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
        type="text"
        placeholder="Enter Password Reset Code or Link"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset} disabled={loading}>
        Reset Password
      </button>
      {successMessage && <p>{successMessage}</p>}
      {error && <Error message={error} />}
    </div>
  );
};

ResetPassword.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default ResetPassword;
