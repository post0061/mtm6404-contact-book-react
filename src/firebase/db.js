import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtRKMAQEaU39hOJHvVTAAk1_fzIjHHnxc",
  authDomain: "contact-book-78ffe.firebaseapp.com",
  projectId: "contact-book-78ffe",
  storageBucket: "contact-book-78ffe.firebasestorage.app",
  messagingSenderId: "532088697080",
  appId: "1:532088697080:web:9dd6940937cd2ea9114b0d",
  measurementId: "G-CERXR74Q49"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
