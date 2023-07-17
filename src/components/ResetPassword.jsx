import PropTypes from "prop-types";
import { useState } from "react";
import { applyPasswordResetCode } from "../fireAdapter";
import Error from "./Error";
import "./LoaderOverlay.css";

const ResetPassword = ({ setCurrentPage }) => {
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = () => {
    setLoading(true);
    applyPasswordResetCode(resetCode, newPassword)
      .then(() => {
        console.log("Password reset successful.");
        setCurrentPage("login");
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
      <button onClick={handlePasswordReset} disabled={loading}>
        Reset Password
      </button>
      {error && <Error message={error} />}
    </div>
  );
};

ResetPassword.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default ResetPassword;
