import PropTypes from "prop-types";
import { auth, signOut } from "../fireAdapter";

const HomePage = ({ userCredentials, setUserCredentials, setCurrentPage }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserCredentials(null);
        setCurrentPage("login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <div>
      <p>Welcome, {userCredentials.user.email}!</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

HomePage.propTypes = {
  userCredentials: PropTypes.object,
  setUserCredentials: PropTypes.func,
  setCurrentPage: PropTypes.func,
};

export default HomePage;
