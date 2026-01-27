"use client"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRawEpNCSwEsglanJm2PvxwVCuqqlamvY",
  authDomain: "summarist-4aab6.firebaseapp.com",
  projectId: "summarist-4aab6",
  storageBucket: "summarist-4aab6.firebasestorage.app",
  messagingSenderId: "817962683682",
  appId: "1:817962683682:web:332702f0d9bdc3058de97b",
  measurementId: "G-93JYWZVS89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in browser environments
if (typeof window !== "undefined") {
  try {
    // getAnalytics may throw if analytics isn't supported in the environment
    // so guard it inside a try/catch.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getAnalytics } = require("firebase/analytics");
    getAnalytics(app);
  } catch (err) {
    // ignore analytics initialization errors on server or unsupported envs
  }
}

export const initFirebase = () => {
  return app;
}