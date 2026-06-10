import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { processGoogleCallbackThunk } from '../store/authThunks';

export default function GoogleCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    // 1. Retrieve the saved state key
    const savedState = sessionStorage.getItem("oauth_state");

    // 2. Verify state matches to prevent OAuth CSRF hijacking
    if (code && state && savedState && savedState === state) {
      sessionStorage.removeItem("oauth_state"); // Clear storage
      dispatch(processGoogleCallbackThunk(code));
    } else {
      console.error("CSRF Validation failed. Token mismatch!");
      alert("Security handshake failed. Please try logging in again.");
      navigate('/login', { replace: true });
    }
  }, [dispatch, searchParams, navigate]);

  useEffect(() => {
    if (user) {
      // Force completion checking redirection
      if (!user.is_profile_complete) {
        navigate('/account', { replace: true });
      } else {
        navigate(user.role === 'ADMIN' || user.role === 'JURY' ? '/admin' : '/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Validating secure security token with Google...</p>
    </div>
  );
}