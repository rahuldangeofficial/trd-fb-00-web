import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    throw error; // Rethrow the error to be caught by the caller
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    throw error; // Rethrow the error to be caught by the caller
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User signed in:", user);
    // Continue with further processing or UI updates
  } else {
    // User is signed out
    console.log("User signed out");
    // Perform actions specific to signed-out user
  }
});

const getCollectionData = async (collectionPath) => {
  const queryCol = collection(db, collectionPath);

  try {
    const querySnapshot = await getDocs(queryCol);
    const queryItemList = querySnapshot.docs.map((doc) => doc.data());
    return queryItemList;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export { getCollectionData, signIn, signUp, signOut, app, db, auth };

{
  //Use case
  // getCollectionData Usage Example
  // getCollectionData("collection1")
  //   .then((queryItemList) => {
  //     console.log(queryItemList); // Access the resolved queryItemList here
  //   })
  //   .catch((error) => {
  //     console.error(error); // Handle any errors here
  //   });
  // signIn Usage Example
  // signIn("example@email.com", "password123")
  //   .then((userCredential) => {
  //     console.log("User signed in:", userCredential.user);
  //     // Continue with further processing or UI updates
  //   })
  //   .catch((error) => {
  //     console.error("Sign in error:", error);
  //     // Handle sign in error
  //   });
  // signUp Usage Example
  // signUp("example0@email.com", "password@123456")
  //   .then((userCredential) => {
  //     console.log(userCredential); // Access the resolved userCredential here
  //   })
  //   .catch((error) => {
  //     console.error(error); // Handle any errors here
  //   });
}
