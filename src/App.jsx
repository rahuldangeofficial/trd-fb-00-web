import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  const [userCredentials, setUserCredentials] = useState(null);
  const [currentPage, setCurrentPage] = useState("signIn");
  // "signIn", "signUp", "home", "forgotPassword", "resetPassword"

  return (
    <>
      <Header />
      {currentPage === "signIn" && (
        <SignIn
          setUserCredentials={setUserCredentials}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "signUp" && (
        <SignUp
          setUserCredentials={setUserCredentials}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "home" && (
        <Home
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "forgotPassword" && (
        <ForgotPassword setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "resetPassword" && (
        <ResetPassword setCurrentPage={setCurrentPage} />
      )}
      <Footer />
    </>
  );
}

export default App;
