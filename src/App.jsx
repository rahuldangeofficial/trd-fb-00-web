import "./App.css";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVJaEnRwkFqfSh6QHlLquJG9oGDAVCMH8",
  authDomain: "trd-fb-00.firebaseapp.com",
  projectId: "trd-fb-00",
  storageBucket: "trd-fb-00.appspot.com",
  messagingSenderId: "562347353539",
  appId: "1:562347353539:web:0be76a5d8ceca51a3c0976",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Sign Up Successful!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode + errorMessage);
    });
};

//UseCase
//signUp("example0@email.com", "password@123456");

function App() {
  return (
    <>
      <h1>trd-fb-00-web</h1>
    </>
  );
}

export default App;
