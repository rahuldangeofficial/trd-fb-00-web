import PropTypes from "prop-types";
import { useState } from "react";
import { signIn, signUp } from "../fireAdapter";
import Error from "./Error";

const Login = ({ setUserCredentials, setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = () => {
    signIn(email, password)
      .then((userCredential) => {
        setUserCredentials(userCredential);
        setCurrentPage("home");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignUp = () => {
    signUp(email, password)
      .then((userCredential) => {
        setUserCredentials(userCredential);
        setCurrentPage("home");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleForgotPassword = () => {
    setCurrentPage("forgotPassword");
  };

  return (
    <div>
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
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleForgotPassword}>Forgot Password</button>
      {error && <Error message={error} />}
    </div>
  );
};

Login.propTypes = {
  setUserCredentials: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default Login;
