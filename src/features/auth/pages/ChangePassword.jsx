import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePasswordThunk } from '../store/authThunks';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';

export default function ChangePassword() {
  const [formData, setFormData] = useState({ old_password: '', new_password: '', confirm_password: '' });
  const [validationError, setValidationError] = useState('');
  
  // Visibility toggle states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLoading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    // 1. Password Complexity Validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(formData.new_password)) {
      setValidationError("New password must be at least 8 characters long, and contain 1 uppercase letter, 1 digit, and 1 special character.");
      return;
    }

    // 2. Passwords Match Validation
    if (formData.new_password !== formData.confirm_password) {
      setValidationError("New passwords do not match!");
      return;
    }
    
    dispatch(changePasswordThunk({ 
      old_password: formData.old_password, 
      new_password: formData.new_password 
    }, navigate));
  };

  return (
    <div className="min-h-screen bg-[#070A12] py-16 px-6 text-slate-200">
      <div className="max-w-md mx-auto">
        <button onClick={() => navigate(-1)} className="text-xs font-bold text-slate-500 hover:text-white mb-8 uppercase flex items-center gap-2 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>

        <form onSubmit={handleSubmit} className="bg-[#0B1020] p-8 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
            <Lock size={20} className="text-cyan-400" /> Change Password
          </h2>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="mb-4 text-xs font-medium text-red-400 bg-red-950/20 border border-red-500/20 p-3 rounded-xl">
              {validationError}
            </div>
          )}
          
          {/* Current Password Field */}
          <div className="relative mb-4">
            <input 
              type={showOldPassword ? "text" : "password"} 
              placeholder="Current Password" 
              required 
              className="w-full bg-slate-900/50 border border-white/10 p-3 pr-10 rounded-xl text-sm text-white outline-none focus:border-cyan-400 transition" 
              onChange={e => setFormData({...formData, old_password: e.target.value})} 
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
            >
              {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* New Password Field */}
          <div className="relative mb-4">
            <input 
              type={showNewPassword ? "text" : "password"} 
              placeholder="New Password" 
              required 
              className="w-full bg-slate-900/50 border border-white/10 p-3 pr-10 rounded-xl text-sm text-white outline-none focus:border-cyan-400 transition" 
              onChange={e => setFormData({...formData, new_password: e.target.value})} 
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative mb-6">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm New Password" 
              required 
              className="w-full bg-slate-900/50 border border-white/10 p-3 pr-10 rounded-xl text-sm text-white outline-none focus:border-cyan-400 transition" 
              onChange={e => setFormData({...formData, confirm_password: e.target.value})} 
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          <button disabled={authLoading} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/10">
            {authLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}