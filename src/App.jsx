import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { auth } from "./fireAdapter";

function App() {
  const [userCredentials, setUserCredentials] = useState(null);
  const [currentPage, setCurrentPage] = useState("");
  // "signIn", "signUp", "home", "forgotPassword"

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

  let activeComponent = <></>;

  switch (currentPage) {
    case "home":
      activeComponent = (
        <Home
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
          setCurrentPage={setCurrentPage}
        />
      );

      break;

    case "signIn":
      activeComponent = (
        <SignIn
          setUserCredentials={setUserCredentials}
          setCurrentPage={setCurrentPage}
        />
      );

      break;

    case "signUp":
      activeComponent = (
        <SignUp
          setUserCredentials={setUserCredentials}
          setCurrentPage={setCurrentPage}
        />
      );

      break;

    case "forgotPassword":
      activeComponent = <ForgotPassword setCurrentPage={setCurrentPage} />;

      break;

    default:
      activeComponent = <></>;
      break;
  }

  return (
    <>
      <Header />
      {activeComponent}
    </>
  );
}

export default App;
