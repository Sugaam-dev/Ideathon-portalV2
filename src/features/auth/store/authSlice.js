// import { createSlice } from '@reduxjs/toolkit';

// // const initialState = {
// //   user: null,
// //   loading: true, // Application boots up verifying session
// //   authLoading: false, // For submission buttons
// //   registrationStep: 'form', // 'form' | 'otp'
// //   forgotPasswordStep: 'email', // 'email' | 'otp' | 'reset' | 'done'
// //   registeredEmail: '',
// //   recoveryEmail: '',
// // };
// const initialState = {
//   user: null,
//   loading: true,
//   authLoading: false,
//   registrationStep: 'form',
//   forgotPasswordStep: 'email',
//   registeredEmail: '',
//   recoveryEmail: '',
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.loading = false;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setAuthLoading: (state, action) => {
//       state.authLoading = action.payload;
//     },
//     setRegistrationStep: (state, action) => {
//       state.registrationStep = action.payload;
//     },
//     setForgotPasswordStep: (state, action) => {
//       state.forgotPasswordStep = action.payload;
//     },
//     setRegisteredEmail: (state, action) => {
//       state.registeredEmail = action.payload;
//     },
//     setRecoveryEmail: (state, action) => {
//       state.recoveryEmail = action.payload;
//     },
//     purgeSession: (state) => {
//       state.user = null;
//       state.loading = false;
//       state.registrationStep = 'form';
//       state.forgotPasswordStep = 'email';
//     }
//   }
// });

// export const {
//   setUser,
//   setLoading,
//   setAuthLoading,
//   setRegistrationStep,
//   setForgotPasswordStep,
//   setRegisteredEmail,
//   setRecoveryEmail,
//   purgeSession
// } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: true,
  authLoading: false,
  registrationStep: 'form',
  forgotPasswordStep: 'email',
  registeredEmail: '',
  recoveryEmail: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setRegistrationStep: (state, action) => {
      state.registrationStep = action.payload;
    },
    setForgotPasswordStep: (state, action) => {
      state.forgotPasswordStep = action.payload;
    },
    setRegisteredEmail: (state, action) => {
      state.registeredEmail = action.payload;
    },
    setRecoveryEmail: (state, action) => {
      state.recoveryEmail = action.payload;
    },
    purgeSession: (state) => {
      state.user = null;
      state.loading = false;
      state.registrationStep = 'form';
      state.forgotPasswordStep = 'email';
    }
  }
});

export const {
  setUser,
  setLoading,
  setAuthLoading,
  setRegistrationStep,
  setForgotPasswordStep,
  setRegisteredEmail,
  setRecoveryEmail,
  purgeSession
} = authSlice.actions;

export default authSlice.reducer;