import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

// signUp Usage Example
// signUp("example0@email.com", "password@123456")
//   .then((userCredential) => {
//     console.log(userCredential); // Access the resolved userCredential here
//   })
//   .catch((error) => {
//     console.error(error); // Handle any errors here
//   });

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

// getCollectionData Usage Example
// getCollectionData("collection1")
//   .then((queryItemList) => {
//     console.log(queryItemList); // Access the resolved queryItemList here
//   })
//   .catch((error) => {
//     console.error(error); // Handle any errors here
//   });
export { getCollectionData, signUp, app, db, auth };
