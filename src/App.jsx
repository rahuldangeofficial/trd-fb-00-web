import "./App.css";
import { useState } from "react";
import { auth, signIn, signUp, signOut } from "./fireAdapter";

function App() {
  const [userCredentials, setUserCredentials] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signIn(email, password)
      .then((userCredential) => {
        setUserCredentials(userCredential);
      })
      .catch((error) => {
        console.error("Sign in error:", error);
      });
  };

  const handleSignUp = () => {
    signUp(email, password)
      .then((userCredential) => {
        setUserCredentials(userCredential);
      })
      .catch((error) => {
        console.error("Sign up error:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserCredentials(null);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <>
      <h1>trd-fb-00-web</h1>
      {userCredentials ? (
        <div>
          <p>Welcome, {userCredentials.user.email}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
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
        </div>
      )}
    </>
  );
}

export default App;
