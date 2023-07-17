import PropTypes from "prop-types";
import { useState } from "react";
import { applyPasswordResetCode } from "../fireAdapter";

const ResetPassword = ({ setCurrentPage }) => {
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordReset = () => {
    applyPasswordResetCode(resetCode, newPassword)
      .then(() => {
        console.log("Password reset successful.");
        setCurrentPage("login");
      })
      .catch((error) => {
        console.error("Password reset error:", error);
      });
  };

  return (
    <div>
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
      <button onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );
};

ResetPassword.propTypes = {
  setCurrentPage: PropTypes.func,
};

export default ResetPassword;
