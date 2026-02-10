import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

const user = auth.currentUser;

if (!user) {
  throw new Error("User must be logged in to start checkout");
}

// 1️⃣ Create checkout session document
const docRef = await addDoc(
  collection(db, "customers", user.uid, "checkout_sessions"),
  {
    price: "price_XXXXXXXX", // 👈 your Stripe PRICE ID
    success_url: `${window.location.origin}/success`,
    cancel_url: `${window.location.origin}/cancel`,
    mode: "subscription", 
  }
);

// 2️⃣ Listen for the Stripe extension to attach the URL
const unsubscribe = onSnapshot(docRef, (snap) => {
  const data = snap.data();

  if (!data) return;

  const { error, url } = data;

  if (error) {
    console.error("Stripe checkout error:", error);
    alert(error.message);
    unsubscribe();
  }

  if (url) {
    window.location.assign(url);
    unsubscribe(); // ✅ prevent multiple redirects
  }
});
