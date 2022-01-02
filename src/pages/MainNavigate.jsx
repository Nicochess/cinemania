import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainNavigate = () => {

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainNavigate;
