import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Auth bootstrap
import { getMyProfile } from '../features/auth/store/authThunks';

// Structural Route Layers
import BaseLayout from '../components/layout/BaseLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import GuestRoute from './GuestRoute';

// Pages
import Landing from '../features/ideas/pages/Landing';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import Dashboard from '../features/ideas/pages/Dashboard';
import SubmitIdea from '../features/ideas/pages/SubmitIdea';
import IdeaDetail from '../features/ideas/pages/IdeaDetail';
import Account from '../features/auth/pages/Account';
import AdminDashboard from '../features/evaluations/pages/AdminDashboard';
import AdminIdeaDetail from '../features/evaluations/pages/AdminIdeaDetail';
import GoogleCallback from '../features/auth/pages/GoogleCallback';
import ChangePassword from '../features/auth/pages/ChangePassword';

export default function AppRoutes() {
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth);

  // ✅ CRITICAL FIX: Restore session on refresh
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/google-callback" element={<GoogleCallback />} />

        <Route element={<BaseLayout />}>
          <Route path="/" element={<Landing />} />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <SubmitIdea />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword/>
    </ProtectedRoute>
  }
/>

          <Route
            path="/ideas/:id"
            element={
              <ProtectedRoute>
                <IdeaDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/ideas/:id"
            element={
              <AdminRoute>
                <AdminIdeaDetail />
              </AdminRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}