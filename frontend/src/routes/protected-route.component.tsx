import React from "react";
import { Navigate } from "react-router";

import { useAppSelector } from "../hooks/hooks";

import { selectCurrentUser } from "../store/auth.slice";

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const user = useAppSelector(state => selectCurrentUser(state));

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
