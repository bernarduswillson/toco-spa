import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import useCookie from '../hooks/useCookie';
import useAuth from '../hooks/useAuth';

interface requireAuthProps {
  allowedRole: number;
}

const RequireAuth = ( props: requireAuthProps ) => {
    const { allowedRole } = props;
    const { userdata } = useCookie();
    const { setAuth } = useAuth();

    setAuth(userdata);
    
    return(
      userdata?.role === allowedRole ? (
        <Outlet />
      ) : (
        userdata?.user ? (
          <Navigate to="/" replace/>
        ) : (
          <Navigate to="/login" replace/>
        )
      )
    );
};

export default RequireAuth;