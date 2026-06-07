// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { processGoogleCallbackThunk } from '../store/authThunks';

// export default function GoogleCallback() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const code = searchParams.get('code');
//     const state = searchParams.get('state');

//     if (code && state) {
//       dispatch(processGoogleCallbackThunk(code, state));
//     } else {
//       navigate('/login', { replace: true });
//     }
//   }, [dispatch, searchParams, navigate]);

//   useEffect(() => {
//     if (user) {
//       navigate(user.role === 'ADMIN' || user.role === 'JURY' ? '/admin' : '/dashboard', { replace: true });
//     }
//   }, [user, navigate]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
//       <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4"></div>
//       <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Validating secure security token with Google...</p>
//     </div>
//   );
// }


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

    if (code && state) {
      dispatch(processGoogleCallbackThunk(code, state));
    } else {
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