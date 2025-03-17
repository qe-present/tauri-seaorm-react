import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from "../components/MainNavgation.jsx";

const Root = () => {
  return (
    <>
        <MainNavigation/>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;