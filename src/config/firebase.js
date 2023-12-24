// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM_h4WSNV3pYt4wfaGqPi1u04um0Jgis0",
  authDomain: "bank-sampah-delima.firebaseapp.com",
  projectId: "bank-sampah-delima",
  storageBucket: "bank-sampah-delima.appspot.com",
  messagingSenderId: "210882791266",
  appId: "1:210882791266:web:4330422f2f29a598350e3b",
  measurementId: "G-HRQCPD87VJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
