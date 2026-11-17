import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // If logged in with a different role, navigate to their dashboard
    if (user?.role === 'farmer') return <Navigate to="/dashboard/farmer" replace />;
    if (user?.role === 'transporter') return <Navigate to="/dashboard/transporter" replace />;
    return <Navigate to="/dashboard/buyer" replace />;
  }

  return children;
}
