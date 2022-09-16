import React from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";

import AMenu from "../components/admin/AMenu";

import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

import Unauthorized from "../components/Unauthorized";

import ProtectedRoute from "./protected-route.component";

const ROLES = {
  admin: "admin",
  teacher: "teacher",
  student: "student",
};

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SignIn />
          </ProtectedRoute>
        }
      />

      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* <Route element={<RequireAuth allowedRole={ROLES.admin} />}> */}
      <Route path="a/menu" element={<AMenu />} />
      {/* </Route> */}

      {/* 
      <Route element={<RequireAuth allowedRole={ROLES.teacher} />}>
        <Route path="t/menu" element={<TMenu />} />

      </Route>
      <Route element={<RequireAuth allowedRole={ROLES.student} />}>
        <Route path="s/menu" element={<SMenu />} />

      </Route> */}
    </ReactRouterRoutes>
  );
};

export default Routes;
