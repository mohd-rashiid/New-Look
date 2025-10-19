import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase/config";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, userData) => {
    try {
      // Step 1: Create user in Firebase Auth
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Step 2: Save user in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        name: userData,
        email: result.user.email,
        createdAt: serverTimestamp(),
      });

      return result.user;
    } catch (error) {
      throw error;
    }
  };

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  async function fetchUserData(uid) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Check localStorage first
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          // Fetch from Firestore
          await fetchUserData(user.uid);
        }
      } else {
        setUserData(null);
        localStorage.removeItem("userData");
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Persist user data to localStorage when it changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
