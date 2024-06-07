import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

export const firebaseConfig = {
    apiKey: "AIzaSyBOSH5jRg0ZVR0Jelmm0mrXYitJgOQZBrY",
    authDomain: "easy-lista-de-tarefas.firebaseapp.com",
    projectId: "easy-lista-de-tarefas",
    storageBucket: "easy-lista-de-tarefas.appspot.com",
    messagingSenderId: "463276411533",
    appId: "1:463276411533:web:768abe343c45dc9eb170c4",
    measurementId: "G-34TBT3RQHY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, app };
