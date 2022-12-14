import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

console.log(process.env.STORAGE_BUCKET);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = {
  app: app,
  db: db,
};
