import React, { createContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext({
  currentUser: "",
  register: (email, password) => {},
  login: (email, password) => {},
  forgotPassword: (email) => {},
  logOut: () => {},
  addDocWatch: (prevMovies, movie) => {},
  addDocWatched: (prevMovies, movie) => {},
  setDocs: () => {},
  updateDocs: (prev, stateWatch) => {},
  updateWatched: (prev, stateWatched) => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const userId = currentUser && currentUser.uid;
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const forgotPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const logOut = () => {
    return auth.signOut();
  };

  const setDocs = async () => {
    if (currentUser) {
      const docRef = doc(db, `users/${userId}`);
      const res = await getDoc(docRef);

      if (res.exists()) {
        const infoDoc = res.data();
        return infoDoc;
      } else {
        await setDoc(docRef, {
          watchlist: [],
          watched: [],
        });
      }
    }
  };

  const updateDocs = (newState) => {
    const docRef = doc(db, `users/${userId}`);

    updateDoc(docRef, {
      watchlist: [...newState],
    });
  };

  const updateWatched = (newState) => {
    const docRef = doc(db, `users/${userId}`);

    updateDoc(docRef, {
      watched: [...newState],
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const context = {
    currentUser: currentUser,
    register,
    login,
    forgotPassword,
    logOut,
    updateDocs,
    updateWatched,
    setLoading,
    setDocs,
  };

  return (
    <AuthContext.Provider value={context}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
