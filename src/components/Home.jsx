import PropTypes from "prop-types";
import { useState } from "react";
import { auth, signOut } from "../fireAdapter";
import Error from "./Error";
import "./LoaderOverlay.css";

const Home = ({ userCredentials, setUserCredentials, setCurrentPage }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUserCredentials(null);
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
      <p>Welcome, {userCredentials.user.email}!</p>
      <button onClick={handleSignOut} disabled={loading}>
        Sign Out
      </button>
      {error && <Error message={error} />}
    </div>
  );
};

Home.propTypes = {
  userCredentials: PropTypes.object,
  setUserCredentials: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default Home;
