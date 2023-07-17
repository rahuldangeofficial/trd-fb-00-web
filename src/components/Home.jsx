import PropTypes from "prop-types";
import { useState } from "react";
import { auth, signOut } from "../fireAdapter";
import Error from "./Error";

const Home = ({ userCredentials, setUserCredentials, setCurrentPage }) => {
  const [error, setError] = useState(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserCredentials(null);
        setCurrentPage("login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <p>Welcome, {userCredentials.user.email}!</p>
      <button onClick={handleSignOut}>Sign Out</button>
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
