import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

interface requireAuthProps {
  allowedRole: number;
}

const RequireAuth = ( props: requireAuthProps ) => {
    const { allowedRole } = props;
    const { auth } = useAuth();

    console.log(auth);

    return(
      auth?.role === allowedRole ? (
        <Outlet />
      ) : (
        auth?.user ? (
          <Navigate to="/" replace/>
        ) : (
          <Navigate to="/login" replace/>
        )
      )
    );
};

export default RequireAuth;