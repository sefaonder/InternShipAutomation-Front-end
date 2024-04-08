import { useLocation, Navigate, Outlet, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from 'src/store/services/auth/authSlice';
import React, { useEffect } from 'react';

export const RequireAuth = ({ roles }) => {
  // TODO: require more Role base control
  const token = useSelector((state) => state.auth);

  const location = useLocation();
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
