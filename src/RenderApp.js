import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./shared/navigation/Navbar";

const RenderApp = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RenderApp;
