import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, Shield, Menu, X, User, LogIn, UserPlus } from 'lucide-react';
import logo from '../../assets/PMRGlogo.png'; 

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 h-20 flex items-center justify-between bg-white/60 backdrop-blur-md border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      
      {/* Brand Logo - Responsive height */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="PMRG Portal" className="h-16 md:h-18 w-auto object-contain" />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-2">
        {user ? (
          <>
            {(user.role === 'ADMIN' || user.role === 'JURY') && (
              <Link to="/admin" className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100/50 transition-all flex items-center gap-2">
                <Shield size={16} /> Admin
              </Link>
            )}
            <Link to="/dashboard" className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100/50 transition-all flex items-center gap-2">
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link to="/account" className="px-5 py-2 rounded-xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10">
              <User size={16} /> Account
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Sign In</Link>
            <Link to="/register" className="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden shadow-xl animate-in slide-in-from-top-5">
          {user ? (
            <>
              {(user.role === 'ADMIN' || user.role === 'JURY') && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"><Shield size={20} /> Admin</Link>
              )}
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"><LayoutDashboard size={20} /> Dashboard</Link>
              <Link to="/account" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"><User size={20} /> Account</Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 text-slate-700 font-semibold"><LogIn size={20} /> Sign In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-indigo-600 text-white font-bold"><UserPlus size={20} /> Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}