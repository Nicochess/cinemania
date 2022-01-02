import React, { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
