import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext({
  currentUser: "",
  register: (email, password) => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
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
  };

  return (
    <AuthContext.Provider value={context}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
