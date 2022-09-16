import React from "react";
import { Outlet } from "react-router-dom";
import AppBarComponent from "./AppBar";

const Layout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default Layout;
