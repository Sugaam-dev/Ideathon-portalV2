import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <Provider store={store}>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'bg-slate-900 text-slate-100 rounded-xl text-sm shadow-xl border border-slate-800',
          duration: 4000,
        }} 
      />
      <AppRoutes />
    </Provider>
  );
}