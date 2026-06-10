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
  registrationStep: sessionStorage.getItem("registrationStep") || 'form',
  forgotPasswordStep: sessionStorage.getItem("forgotPasswordStep") || 'email',
  registeredEmail: sessionStorage.getItem("registeredEmail") || '',
  recoveryEmail: sessionStorage.getItem("recoveryEmail") || '',
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
      if (action.payload) {
        sessionStorage.setItem("registrationStep", action.payload);
      } else {
        sessionStorage.removeItem("registrationStep");
      }
    },
    setForgotPasswordStep: (state, action) => {
      state.forgotPasswordStep = action.payload;
      if (action.payload) {
        sessionStorage.setItem("forgotPasswordStep", action.payload);
      } else {
        sessionStorage.removeItem("forgotPasswordStep");
      }
    },
    setRegisteredEmail: (state, action) => {
      state.registeredEmail = action.payload;
      if (action.payload) {
        sessionStorage.setItem("registeredEmail", action.payload);
      } else {
        sessionStorage.removeItem("registeredEmail");
      }
    },
    setRecoveryEmail: (state, action) => {
      state.recoveryEmail = action.payload;
      if (action.payload) {
        sessionStorage.setItem("recoveryEmail", action.payload);
      } else {
        sessionStorage.removeItem("recoveryEmail");
      }
    },
    purgeSession: (state) => {
      state.user = null;
      state.loading = false;
      state.registrationStep = 'form';
      state.forgotPasswordStep = 'email';
      state.registeredEmail = '';
      state.recoveryEmail = '';
      sessionStorage.removeItem("registrationStep");
      sessionStorage.removeItem("forgotPasswordStep");
      sessionStorage.removeItem("registeredEmail");
      sessionStorage.removeItem("recoveryEmail");
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