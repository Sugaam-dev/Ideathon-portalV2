import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GuestRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return null; // Prevents UI flickering during initial session validation
  }

  if (user) {
    const isManagement = user.role === 'ADMIN' || user.role === 'JURY';
    return <Navigate to={isManagement ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}