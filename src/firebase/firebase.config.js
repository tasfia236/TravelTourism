// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP-Em97td6RMDDgnah_Xv7YFAavbVzYdo",
  authDomain: "tourist-guide-e209e.firebaseapp.com",
  projectId: "tourist-guide-e209e",
  storageBucket: "tourist-guide-e209e.appspot.com",
  messagingSenderId: "344282663369",
  appId: "1:344282663369:web:fd6bd687145d6739180018"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;