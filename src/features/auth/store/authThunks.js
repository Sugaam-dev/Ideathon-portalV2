// import { apiClient } from '../../../services/apiClient';
// import { 
//   setUser, 
//   setLoading, 
//   setAuthLoading, 
//   setRegistrationStep, 
//   setForgotPasswordStep, 
//   setRegisteredEmail,
//   setRecoveryEmail,
//   purgeSession 
// } from './authSlice';
// import toast from 'react-hot-toast';

// // Helper to extract error message safely
// const getErrMsg = (err) => err?.response?.data?.message || err?.message || 'An unexpected error occurred';

// export const getMyProfile = () => async (dispatch) => {
//   try {
//     const res = await apiClient.get('/api/auth/me');
//     dispatch(setUser(res.data));
//   } catch (err) {
//     dispatch(setUser(null));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export const registerUser = (formData) => async (dispatch) => {
//   dispatch(setAuthLoading(true));
//   try {
//     await apiClient.post('/api/auth/register', formData);
//     toast.success('Verification code dispatched!');
//     dispatch(setRegisteredEmail(formData.email));
//     dispatch(setRegistrationStep('otp'));
//   } catch (err) {
//     toast.error(getErrMsg(err));
//   } finally {
//     dispatch(setAuthLoading(false));
//   }
// };

// export const verifyRegistrationOtp = (email, otpCode) => async (dispatch) => {
//   dispatch(setAuthLoading(true));
//   try {
//     const res = await apiClient.post('/api/auth/verify-otp', { email, otp_code: otpCode });
//     toast.success('Account fully activated!');
//     dispatch(setUser(res.data));
//   } catch (err) {
//     toast.error(getErrMsg(err));
//   } finally {
//     dispatch(setAuthLoading(false));
//   }
// };

// export const loginUser = (credentials, navigate) => async (dispatch) => {
//   dispatch(setAuthLoading(true));
//   try {
//     const res = await apiClient.post('/api/auth/login', credentials);
//     toast.success(`Welcome back, ${res.data.name}!`);
//     dispatch(setUser(res.data));
//     // console.log(res.data)
//     navigate(res.data.role === 'ADMIN' || res.data.role === 'JURY' ? '/admin' : '/dashboard', { replace: true });
//   } catch (err) {
//     toast.error(getErrMsg(err));
//   } finally {
//     dispatch(setAuthLoading(false));
//   }
// };

// export const initiateGoogleOAuth = () => async () => {
//   try {
//     const res = await apiClient.get('/api/auth/google/login');
//     if (res.data?.auth_url) window.location.href = res.data.auth_url;
//   } catch (err) {
//     toast.error('Failed to initialize Google OAuth.');
//   }
// };

// export const processGoogleCallbackThunk = (code, state) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const res = await apiClient.post('/api/auth/google/callback', { code, state });
//     toast.success(`Welcome, ${res.data.name}!`);
//     dispatch(setUser(res.data));
//   } catch (err) {
//     toast.error('Google authorization failed.');
//     dispatch(setUser(null));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export const forgotPasswordThunk = (email) => async (dispatch) => {
//   dispatch(setAuthLoading(true));
//   try {
//     const res = await apiClient.post('/api/auth/forgot-password', { email });
//     toast.success(res.data.message || 'Recovery code dispatched.');
//     dispatch(setRecoveryEmail(email));
//     dispatch(setForgotPasswordStep('otp'));
//   } catch (err) {
//     toast.error(getErrMsg(err));
//   } finally {
//     dispatch(setAuthLoading(false));
//   }
// };

// export const resetPasswordThunk = (payload) => async (dispatch) => {
//   dispatch(setAuthLoading(true));
//   try {
//     await apiClient.post('/api/auth/reset-password', payload);
//     toast.success('Password updated!');
//     dispatch(setForgotPasswordStep('done'));
//   } catch (err) {
//     toast.error(getErrMsg(err));
//   } finally {
//     dispatch(setAuthLoading(false));
//   }
// };

// export const logoutUser = (navigate) => async (dispatch) => {
//   try {
//     await apiClient.post('/api/auth/logout');
//     dispatch(purgeSession());
//     toast.success('Logged out.');
//     navigate('/', { replace: true });
//   } catch (err) {
//     toast.error('Logout failed.');
//     // Force purge even on server error to clear local state
//     dispatch(purgeSession()); 
//   }
// };

// export const changePasswordThunk = (payload, navigate) => async (dispatch) => {
//   dispatch(setAuthLoading(true));
//   try {
//     await apiClient.put('/api/auth/change-password', payload);
//     toast.success('Password updated successfully!');
//     navigate('/account'); // Navigate back to account page after success
//   } catch (err) {
//     toast.error(getErrMsg(err));
//   } finally {
//     dispatch(setAuthLoading(false));
//   }
// };

import { apiClient } from '../../../services/apiClient';
import { 
  setUser, 
  setLoading, 
  setAuthLoading, 
  setRegistrationStep, 
  setForgotPasswordStep, 
  setRegisteredEmail,
  setRecoveryEmail,
  purgeSession 
} from './authSlice';
import toast from 'react-hot-toast';

// Helper to extract error message safely (Aligned with FastAPI .detail return structure)
const getErrMsg = (err) => err?.response?.data?.detail || err?.response?.data?.message || err?.message || 'An unexpected error occurred';

export const getMyProfile = () => async (dispatch) => {
  try {
    const res = await apiClient.get('/api/auth/me');
    dispatch(setUser(res.data));
  } catch (err) {
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = (formData) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    await apiClient.post('/api/auth/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    toast.success('Verification code dispatched!');
    const email = formData.get('email');
    dispatch(setRegisteredEmail(email));
    dispatch(setRegistrationStep('otp'));
  } catch (err) {
    toast.error(getErrMsg(err));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const verifyRegistrationOtp = (email, otpCode, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiClient.post('/api/auth/verify-otp', { email, otp_code: otpCode });
    toast.success('Account fully activated!');
    dispatch(setUser(res.data));
    
    // Redirect logic checking profile completion status
    if (!res.data.is_profile_complete) {
      navigate('/account', { replace: true });
    } else {
      navigate(res.data.role === 'ADMIN' || res.data.role === 'JURY' ? '/admin' : '/dashboard', { replace: true });
    }
  } catch (err) {
    toast.error(getErrMsg(err));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const loginUser = (credentials, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiClient.post('/api/auth/login', credentials);
    toast.success(`Welcome back, ${res.data.name}!`);
    dispatch(setUser(res.data));
    
    // Redirect logic checking profile completion status
    if (!res.data.is_profile_complete) {
      navigate('/account', { replace: true });
    } else {
      navigate(res.data.role === 'ADMIN' || res.data.role === 'JURY' ? '/admin' : '/dashboard', { replace: true });
    }
  } catch (err) {
    toast.error(getErrMsg(err));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const initiateGoogleOAuth = () => async () => {
  try {
    const res = await apiClient.get('/api/auth/google/login');
    if (res.data?.auth_url) window.location.href = res.data.auth_url;
  } catch (err) {
    toast.error('Failed to initialize Google OAuth.');
  }
};

export const processGoogleCallbackThunk = (code, state) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await apiClient.get('/api/auth/google/callback', { params: { code, state } });
    toast.success(`Welcome, ${res.data.name}!`);
    dispatch(setUser(res.data));
  } catch (err) {
    toast.error('Google authorization failed.');
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProfileThunk = (formData, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiClient.put('/api/auth/profile/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    toast.success('Profile details saved successfully!');
    dispatch(setUser(res.data));
    navigate(res.data.role === 'ADMIN' || res.data.role === 'JURY' ? '/admin' : '/dashboard', { replace: true });
  } catch (err) {
    toast.error(getErrMsg(err));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const deleteResumeThunk = () => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiClient.delete('/api/auth/resume/delete');
    toast.success('Resume deleted successfully!');
    dispatch(setUser(res.data));
  } catch (err) {
    toast.error(getErrMsg(err));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const forgotPasswordThunk = (email) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiClient.post('/api/auth/forgot-password', { email });
    toast.success(res.data.message || 'Recovery code dispatched.');
    dispatch(setRecoveryEmail(email));
    dispatch(setForgotPasswordStep('otp'));
  } catch (err) {
    toast.error(getErrMsg(err));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const resetPasswordThunk = (payload) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    await apiClient.post('/api/auth/reset-password', payload);
    toast.success('Password updated!');
    dispatch(setForgotPasswordStep('done'));
  } catch (err) {
    toast.error(getErrMsg(err));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  try {
    await apiClient.post('/api/auth/logout');
    dispatch(purgeSession());
    toast.success('Logged out.');
    navigate('/', { replace: true });
  } catch (err) {
    toast.error('Logout failed.');
    dispatch(purgeSession()); 
  }
};

export const changePasswordThunk = (payload, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    await apiClient.put('/api/auth/change-password', payload);
    toast.success('Password updated successfully!');
    navigate('/account');
  } catch (err) {
    toast.error(getErrMsg(err));
  } finally {
    dispatch(setAuthLoading(false));
  }
};