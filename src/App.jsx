import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { auth } from "./fireAdapter";

function App() {
  const [userCredentials, setUserCredentials] = useState(null);
  const [currentPage, setCurrentPage] = useState("");
  // "signIn", "signUp", "home", "forgotPassword", "resetPassword"

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserCredentials({ user });
        setCurrentPage("home");
      } else {
        setUserCredentials(null);
        setCurrentPage("signIn");
      }
    });

    return () => unsubscribe();
  }, []);

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
