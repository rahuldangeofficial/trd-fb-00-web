import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithRedirect,
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

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Authentication persistence configured successfully.");
  })
  .catch((error) => {
    console.error("Error configuring authentication persistence:", error);
  });

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithRedirect(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const userCredential = GoogleAuthProvider.credentialFromResult(result);
    return userCredential;
  } catch (error) {
    console.error(error.code, error.message);
    throw error;
  }
};

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

const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // The password reset email has been sent successfully.
    // The user can now check their email to reset their password.
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    throw error; // Rethrow the error to be caught by the caller
  }
};

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

export {
  getCollectionData,
  signIn,
  signUp,
  signOut,
  forgotPassword,
  app,
  db,
  auth,
  signInWithGoogle,
};
