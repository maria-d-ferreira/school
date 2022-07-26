import React from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import SignInPage from "../pages/auth/signIn.page";
import SignUpPage from "../pages/auth/signUp.page";
import HomePage from "../pages/home.page";
import ProtectedRoute from "./protected-route.component";

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
