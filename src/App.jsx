import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";

function App() {
  const [userCredentials, setUserCredentials] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  // "login", "home", "forgotPassword", "resetPassword"

  return (
    <>
      <Header />
      {currentPage === "login" && (
        <LoginPage
          setUserCredentials={setUserCredentials}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "home" && (
        <HomePage
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "forgotPassword" && (
        <ForgotPasswordPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "resetPassword" && (
        <ResetPasswordPage setCurrentPage={setCurrentPage} />
      )}
      <Footer />
    </>
  );
}

export default App;
