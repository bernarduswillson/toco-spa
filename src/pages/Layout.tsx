import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Layout = () => {

  return (
    <div>
      <ToastContainer />

      <Outlet />
    </div>
  );
};

export default Layout;
