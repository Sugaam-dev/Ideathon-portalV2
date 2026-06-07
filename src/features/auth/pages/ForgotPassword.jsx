// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { forgotPasswordThunk, resetPasswordThunk } from '../store/authThunks';
// import { setForgotPasswordStep } from '../store/authSlice';
// import { ArrowLeft, Mail, KeyRound, CheckCircle, Lock } from 'lucide-react';

// export default function ForgotPassword() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { forgotPasswordStep, authLoading, recoveryEmail } = useSelector((state) => state.auth);

//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');

//   const renderContent = () => {
//     // 1. EMAIL STEP
//     if (forgotPasswordStep === 'email') {
//       return (
//         <form onSubmit={(e) => { e.preventDefault(); dispatch(forgotPasswordThunk(email)); }} className="space-y-4">
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//             <input type="email" required placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}
//               className="w-full pl-10 pr-3 py-3 bg-[#0B1020] border border-[#24304A] rounded-xl text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 transition" />
//           </div>
//           <button type="submit" disabled={authLoading} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-cyan-500/10">
//             {authLoading ? "Sending..." : "Generate Recovery Code"}
//           </button>
//         </form>
//       );
//     }

//     // 2. OTP STEP
//     if (forgotPasswordStep === 'otp') {
//       return (
//         <form onSubmit={(e) => { e.preventDefault(); dispatch(setForgotPasswordStep('reset')); }} className="space-y-4">
//           <div className="relative">
//             <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//             <input type="text" required maxLength={6} placeholder="6-digit code" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
//               className="w-full pl-10 pr-3 py-3 bg-[#0B1020] border border-[#24304A] rounded-xl text-center font-mono tracking-widest text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 transition" />
//           </div>
//           <button type="submit" disabled={otp.length !== 6} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition">Verify Code</button>
//         </form>
//       );
//     }

//     // 3. RESET STEP
//     if (forgotPasswordStep === 'reset') {
//       return (
//         <form onSubmit={(e) => { e.preventDefault(); dispatch(resetPasswordThunk({ email: recoveryEmail, otp_code: otp, new_password: password })); }} className="space-y-4">
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//             <input type="password" required minLength={8} placeholder="New Password (min 8 chars)" value={password} onChange={e => setPassword(e.target.value)}
//               className="w-full pl-10 pr-3 py-3 bg-[#0B1020] border border-[#24304A] rounded-xl text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 transition" />
//           </div>
//           <button type="submit" disabled={authLoading} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition">Set New Password</button>
//         </form>
//       );
//     }

//     // 4. SUCCESS STEP
//     return (
//       <div className="text-center space-y-4">
//         <div className="flex justify-center"><CheckCircle size={48} className="text-emerald-500" /></div>
//         <p className="text-slate-400 text-sm">Your password has been reset successfully.</p>
//         <button onClick={() => { dispatch(setForgotPasswordStep('email')); navigate('/login'); }} className="w-full py-3 bg-[#1F2A44] text-white rounded-xl font-semibold hover:bg-[#2A3755] transition">Go to Sign In</button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#152244] text-white flex items-center justify-center px-4">
//       {/* BACKGROUND GLOW */}
//        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
//   {/* Cyan Glow - Top Left - Reduced intensity */}
//   <div className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-cyan-500 rounded-full blur-[100px] opacity-15" />
  
//   {/* Violet Glow - Bottom Right - Reduced intensity */}
//   <div className="absolute bottom-[-5%] right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-violet-600 rounded-full blur-[100px] opacity-15" />
// </div>

//       <div className="relative z-10 w-full max-w-md">
//         <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-400 mb-6 hover:text-white transition"><ArrowLeft size={16} /> Back to Sign In</Link>
        
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold tracking-tight">Recover Account</h1>
//           <p className="text-sm text-slate-400 mt-1">Let's get you back into your workspace.</p>
//         </div>

//         <div className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-6 shadow-2xl shadow-black/40">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { forgotPasswordThunk, resetPasswordThunk } from '../store/authThunks';
import { setForgotPasswordStep } from '../store/authSlice';
import { ArrowLeft, Mail, KeyRound, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotPasswordStep, authLoading, recoveryEmail } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (val) => {
    setPassword(val);
    // Enforces: Min 8 chars, 1 uppercase, 1 digit, 1 special character
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!regex.test(val)) {
      setPasswordError("Password must be min 8 chars, with 1 uppercase, 1 digit, and 1 special character.");
    } else {
      setPasswordError("");
    }
  };

  const renderContent = () => {
    if (forgotPasswordStep === 'email') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); dispatch(forgotPasswordThunk(email)); }} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input type="email" required placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-[#0B1020] border border-[#24304A] rounded-xl text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 transition" />
          </div>
          <button type="submit" disabled={authLoading} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-cyan-500/20">
            {authLoading ? "Sending..." : "Generate Recovery Code"}
          </button>
        </form>
      );
    }

    if (forgotPasswordStep === 'otp') {
      return (
        <form onSubmit={(e) => { e.preventDefault(); dispatch(setForgotPasswordStep('reset')); }} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input type="text" required maxLength={6} placeholder="6-digit code" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full pl-10 pr-3 py-3 bg-[#0B1020] border border-[#24304A] rounded-xl text-center font-mono tracking-widest text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 transition" />
          </div>
          <button type="submit" disabled={otp.length !== 6} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition">Verify Code</button>
        </form>
      );
    }

    if (forgotPasswordStep === 'reset') {
      return (
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          if (passwordError) return;
          dispatch(resetPasswordThunk({ email: recoveryEmail, otp_code: otp, new_password: password })); 
        }} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input type={showPassword ? "text" : "password"} required placeholder="New Password" value={password} onChange={e => handlePasswordChange(e.target.value)}
              className={`w-full pl-10 pr-10 py-3 bg-[#0B1020] border ${passwordError ? 'border-red-500' : 'border-[#24304A]'} rounded-xl text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 transition`} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {passwordError && (
            <p className="text-[10px] text-red-400 mt-1 leading-normal">{passwordError}</p>
          )}
          <button type="submit" disabled={authLoading || !!passwordError || !password} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition">Set New Password</button>
        </form>
      );
    }

    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center"><CheckCircle size={48} className="text-emerald-500" /></div>
        <p className="text-slate-400 text-sm">Your password has been reset successfully.</p>
        <button onClick={() => { dispatch(setForgotPasswordStep('email')); navigate('/login'); }} className="w-full py-3 bg-[#1F2A44] text-white rounded-xl font-semibold hover:bg-[#2A3755] transition">Go to Sign In</button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#152244] text-[#E2E8F0] flex items-center justify-center px-4">
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-cyan-500 rounded-full blur-[100px] opacity-15" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-violet-600 rounded-full blur-[100px] opacity-15" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-400 mb-6 hover:text-white transition"><ArrowLeft size={16} /> Back to Sign In</Link>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Recover Account</h1>
          <p className="text-sm text-slate-400 mt-1">Let's get you back into your workspace.</p>
        </div>

        <div className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-6 shadow-2xl shadow-black/40">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}