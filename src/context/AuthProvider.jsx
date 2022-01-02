import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext({
  currentUser: "",
  register: (email, password) => {},
  login: (email, password) => {},
  forgotPassword: (email) => {},
  logOut: () => {}
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
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
    logOut
  };

  return (
    <AuthContext.Provider value={context}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
