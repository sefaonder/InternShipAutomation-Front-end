import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import usePermission from 'src/hooks/usePermission';

export const RequireAuth = ({ role }) => {
  const token = useSelector((state) => state.auth);

  const location = useLocation();

  const checkPermission = usePermission();

  const requiredRole = checkPermission(role);

  if (!requiredRole) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
