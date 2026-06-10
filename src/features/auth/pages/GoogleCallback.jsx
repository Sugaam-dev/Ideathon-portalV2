import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { processGoogleCallbackThunk } from '../store/authThunks';

export default function GoogleCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const processedRef = useRef(false);

  useEffect(() => {
    // Prevent double execution in React StrictMode
    if (processedRef.current) return;

    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    // Wait until code and state parameters are present
    if (!code || !state) return;

    // Retrieve the saved state key from sessionStorage or fallback cookie
    const savedState = sessionStorage.getItem("oauth_state") || document.cookie
      .split(';')
      .find(row => row.trim().startsWith('oauth_state='))
      ?.split('=')[1];

    console.log("Google callback state verification:", { urlState: state, savedState });

    processedRef.current = true;

    // 2. Verify state matches to prevent OAuth CSRF hijacking
    if (savedState && savedState === state) {
      // Clear both storage and cookie
      sessionStorage.removeItem("oauth_state");
      document.cookie = "oauth_state=; path=/; max-age=0; SameSite=Lax; Secure" + 
        (window.location.hostname.endsWith("pmrgsolution.com") ? "; domain=.pmrgsolution.com" : "");
      
      dispatch(processGoogleCallbackThunk(code));
    } else {
      console.error("CSRF Validation failed. Token mismatch!", { urlState: state, savedState });
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