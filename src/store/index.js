import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';

// The ideas and evaluations reducers are no longer needed 
// because TanStack Query now handles this data in its own cache.

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});