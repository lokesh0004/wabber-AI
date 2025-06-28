// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC_BzOOwWB8dacQU9ThM_2ufehbzaiV6k",
  authDomain: "webber-ai-89eaa.firebaseapp.com",
  databaseURL: "https://webber-ai-89eaa-default-rtdb.firebaseio.com",
  projectId: "webber-ai-89eaa",
  storageBucket: "webber-ai-89eaa.firebasestorage.app",
  messagingSenderId: "625849373657",
  appId: "1:625849373657:web:042de0f6e7d4271bde7fc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export { app };