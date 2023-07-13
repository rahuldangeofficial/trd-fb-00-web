import "./App.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDVJaEnRwkFqfSh6QHlLquJG9oGDAVCMH8",
  authDomain: "trd-fb-00.firebaseapp.com",
  projectId: "trd-fb-00",
  storageBucket: "trd-fb-00.appspot.com",
  messagingSenderId: "562347353539",
  appId: "1:562347353539:web:0be76a5d8ceca51a3c0976"
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <h1>trd-fb-00-web</h1>
    </>
  );
}

export default App;
