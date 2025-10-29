import { auth, db } from "./firebase-config.js"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

await setPersistence(auth, browserLocalPersistence)

// Check if user is authenticated
export function checkAuth() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user)
    })
  })
}

// Sign up new user
export async function signUpUser(email, password, fullName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, {
      displayName: fullName,
    })

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: email,
      displayName: fullName,
      createdAt: new Date().toISOString(),
      role: "customer",
    })

    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign in existing user
export async function signInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign out user
export async function signOutUser() {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get current user data from Firestore
export async function getUserData(uid) {
  try {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() }
    } else {
      return { success: false, error: "User data not found" }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Check if user is admin
export async function isAdmin(uid) {
  const userData = await getUserData(uid)
  return userData.success && userData.data.role === "admin"
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider()
    provider.addScope("profile")
    provider.addScope("email")
    provider.setCustomParameters({
      prompt: "consent",
    })

    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Google User",
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        role: "customer",
      })
    }

    return { success: true, user }
  } catch (error) {
    console.error("[v0] Google sign-in error:", error)
    return { success: false, error: error.message }
  }
}

export async function signInWithApple() {
  try {
    const provider = new OAuthProvider("apple.com")
    provider.addScope("email")
    provider.addScope("name")
    provider.setCustomParameters({
      usePopup: true,
    })

    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email || "apple-user@geochem.local",
        displayName: user.displayName || "Apple User",
        createdAt: new Date().toISOString(),
        role: "customer",
      })
    }

    return { success: true, user }
  } catch (error) {
    console.error("[v0] Apple sign-in error:", error)
    return { success: false, error: error.message }
  }
}

// Change password
export async function changePassword(newPassword) {
  try {
    const user = auth.currentUser
    if (!user) {
      return { success: false, error: "No user logged in" }
    }
    await updatePassword(user, newPassword)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update user profile
export async function updateUserProfile(uid, updates) {
  try {
    await updateDoc(doc(db, "users", uid), {
      ...updates,
      updatedAt: new Date().toISOString(),
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
