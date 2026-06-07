import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null; // Or your loading spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ── STRICT ADMIN LOCK ──
  // Changed from (ADMIN || JURY) to strictly (ADMIN)
  const isAuthorized = user.role === 'ADMIN';
  
  if (!isAuthorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}