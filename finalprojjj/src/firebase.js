import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCO2m4t5o1YQtSmCOj9V2MJxw6B6igJ4lQ",
  authDomain: "advfinal-3a2b2.firebaseapp.com",
  databaseURL: "https://advfinal-3a2b2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "advfinal-3a2b2",
  storageBucket: "advfinal-3a2b2.appspot.com",
  messagingSenderId: "646998426997",
  appId: "1:646998426997:web:4d30b2cbef280ed9c0bf3c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default db;
