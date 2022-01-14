import React, { createContext, useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  currentUser: "",
  register: (email, password) => {},
  login: (email, password) => {},
  forgotPassword: (email) => {},
  logOut: () => {},
  addDocWatch: (prevMovies, movie) => {},
  addDocWatched: (prevMovies, movie) => {},
  getWatchedIdFirebase: () => {
    return Promise();
  },
  setDocs: () => {},
  updateDocs: (prev, stateWatch) => {},
  updateWatched: (prev, stateWatched) => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const userId = currentUser && currentUser.uid;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const getWatchedIdFirebase = async () => {
    if (currentUser) {
      const docRef = doc(db, `users/${userId}`);
      const res = await getDoc(docRef);
      const infoDoc = res.data();
      const idWatchedMovies = infoDoc.watched.map((movie) => movie.id);
      return idWatchedMovies
    }
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
      navigate("/add");
      setLoading(false);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const context = {
    currentUser: currentUser,
    register,
    login,
    forgotPassword,
    logOut,
    getWatchedIdFirebase,
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
