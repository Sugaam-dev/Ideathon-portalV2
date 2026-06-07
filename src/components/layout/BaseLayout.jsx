import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function BaseLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <Navbar />
      
      {/* Change pt-14 to pt-20 to match h-20 of Navbar */}
      <main className="flex-1 flex flex-col pt-20 w-full animate-in fade-in duration-200">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}