// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyAzlr33wQjVs23gXK70BNjIY2RZ6JuCxhI",
  authDomain: "geochem-food-express.firebaseapp.com",
  projectId: "geochem-food-express",
  storageBucket: "geochem-food-express.firebasestorage.app",
  messagingSenderId: "79520620224",
  appId: "1:79520620224:web:0b6f9d3d0088b019809725",
  measurementId: "G-CPX41PP08L",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, analytics, auth, db }
