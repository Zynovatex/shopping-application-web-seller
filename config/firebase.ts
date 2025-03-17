// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzk1LWw7P1BGjPCjrmGECNiZLO64GkuJk",
  authDomain: "virtual-city-b6fc3.firebaseapp.com",
  projectId: "virtual-city-b6fc3",
  storageBucket: "virtual-city-b6fc3.firebasestorage.app",
  messagingSenderId: "469865833244",
  appId: "1:469865833244:web:08db8fe9a1f90bc520d0d9",
  measurementId: "G-TW3NX5H88V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const storage = getStorage(app);
export { storage };
