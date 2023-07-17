import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [userCredentials, setUserCredentials] = useState(null);
  const [currentPage, setCurrentPage] = useState("login");
  // "login", "home", "forgotPassword", "resetPassword"

  return (
    <>
      <Header />
      {currentPage === "login" && (
        <Login
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
