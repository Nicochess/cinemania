import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../components/MenuBar";

const MainNavigate = () => {

  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  );
};

export default MainNavigate;
