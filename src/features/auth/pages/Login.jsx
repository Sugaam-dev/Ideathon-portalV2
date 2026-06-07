// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser, initiateGoogleOAuth } from "../store/authThunks";
// import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false); // Added visibility state

//   const { authLoading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(form, navigate));
//   };

//   return (
//     <div className="min-h-screen bg-[#152244] text-white flex items-center justify-center px-4">

//       {/* BACKGROUND GLOW */}
//   <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
//   {/* Cyan Glow - Top Left - Reduced intensity */}
//   <div className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-cyan-500 rounded-full blur-[100px] opacity-15" />
  
//   {/* Violet Glow - Bottom Right - Reduced intensity */}
//   <div className="absolute bottom-[-5%] right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-violet-600 rounded-full blur-[100px] opacity-15" />
// </div>

//       {/* CARD */}
//       <div className="relative z-10 w-full max-w-md">

//         {/* BACK BUTTON */}
        

//         {/* HEADER */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold tracking-tight">
//             Welcome
//           </h1>
//           <p className="text-sm text-slate-400 mt-1">
//             Access your PMRG Ideathon workspace
//           </p>
//         </div>

//         {/* CARD BOX */}
//         <div className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-6 shadow-2xl shadow-black/40 space-y-5">

//           {/* GOOGLE LOGIN */}
//           <button
//             type="button"
//             onClick={() => dispatch(initiateGoogleOAuth())}
//             className="
//               w-full flex items-center justify-center gap-3
//               py-2.5 px-4
//               border border-[#24304A]
//               rounded-xl
//               bg-[#0B1020]
//               text-sm font-semibold text-slate-200
//               hover:border-cyan-400
//               hover:text-cyan-300
//               transition
//             "
//           >
//             {/* Google Icon */}
//             <svg className="w-4 h-4" viewBox="0 0 24 24">
//               <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.23 2.673 1.22 6.573l4.046 3.192z"/>
//               <path fill="#4285F4" d="M23.49 12.275c0-.818-.073-1.609-.21-2.373H12v4.491h6.455c-.278 1.482-1.114 2.736-2.373 3.582l3.691 2.864C21.927 18.809 23.49 15.818 23.49 12.275z"/>
//               <path fill="#FBBC05" d="M5.266 14.235L1.22 17.427A11.944 11.944 0 0 1 0 12c0-1.95.464-3.791 1.22-5.427l4.046 3.192a7.03 7.03 0 0 0-.527 2.235c0 .786.132 1.54.373 2.235z"/>
//               <path fill="#34A853" d="M12 24c3.245 0 5.973-1.077 7.964-2.927l-3.691-2.864a7.124 7.124 0 0 1-4.273 1.2A7.077 7.077 0 0 1 5.266 14.235L1.22 17.427C3.23 21.327 7.27 24 12 24z"/>
//             </svg>

//             Sign in with Google
//           </button>

//           {/* DIVIDER */}
//           <div className="flex items-center gap-3">
//             <div className="flex-1 h-px bg-[#1F2A44]" />
//             <span className="text-xs text-slate-500">or</span>
//             <div className="flex-1 h-px bg-[#1F2A44]" />
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-4">

//             {/* EMAIL */}
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />

//               <input
//                 type="email"
//                 required
//                 placeholder="Email Address"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 className="
//                   w-full pl-10 pr-3 py-3
//                   bg-[#0B1020]
//                   border border-[#24304A]
//                   rounded-xl
//                   text-sm text-white
//                   outline-none
//                   focus:border-cyan-400
//                   focus:ring-2 focus:ring-cyan-500/10
//                   transition
//                 "
//               />
//             </div>

//             {/* PASSWORD */}
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm({ ...form, password: e.target.value })
//                 }
//                 className="
//                   w-full pl-10 pr-10 py-3
//                   bg-[#0B1020]
//                   border border-[#24304A]
//                   rounded-xl
//                   text-sm text-white
//                   outline-none
//                   focus:border-cyan-400
//                   focus:ring-2 focus:ring-cyan-500/10
//                   transition
//                 "
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
//               >
//                 {showPassword ?<Eye size={16} /> : <EyeOff size={16} />}
//               </button>
//             </div>

//             {/* FORGOT PASSWORD LINK */}
//             <div className="text-right">
//                 <Link to="/forgot-password" className="text-xs text-slate-400 hover:text-cyan-400 transition">
//                     Forgot password?
//                 </Link>
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               disabled={authLoading}
//               className="
//                 w-full py-3.5
//                 bg-gradient-to-r from-cyan-500 to-violet-500
//                 text-white
//                 rounded-xl
//                 font-bold
//                 hover:opacity-90
//                 active:scale-[0.98]
//                 transition
//                 shadow-lg shadow-cyan-500/10
//               "
//             >
//               {authLoading ? "Signing in..." : "Access Dashboard"}
//             </button>
//           </form>

//           {/* FOOTER */}
//           <p className="text-center text-xs text-slate-400">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="text-cyan-400 hover:text-cyan-300 font-medium"
//             >
//               Register now
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, initiateGoogleOAuth } from "../store/authThunks";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form, navigate));
  };

  return (
    <div className="min-h-screen bg-[#152244] text-white flex items-center justify-center px-4">
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-cyan-500 rounded-full blur-[100px] opacity-15" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-violet-600 rounded-full blur-[100px] opacity-15" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
          <p className="text-sm text-slate-400 mt-1">Access your PMRG Ideathon workspace</p>
        </div>

        {/* CARD BOX */}
        <div className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-6 shadow-2xl shadow-black/40 space-y-5">
          {/* GOOGLE LOGIN */}
          <button
            type="button"
            onClick={() => dispatch(initiateGoogleOAuth())}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-[#24304A] rounded-xl bg-[#0B1020] text-sm font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition"
          >
            {/* Google Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.23 2.673 1.22 6.573l4.046 3.192z"/>
              <path fill="#4285F4" d="M23.49 12.275c0-.818-.073-1.609-.21-2.373H12v4.491h6.455c-.278 1.482-1.114 2.736-2.373 3.582l3.691 2.864C21.927 18.809 23.49 15.818 23.49 12.275z"/>
              <path fill="#FBBC05" d="M5.266 14.235L1.22 17.427A11.944 11.944 0 0 1 0 12c0-1.95.464-3.791 1.22-5.427l4.046 3.192a7.03 7.03 0 0 0-.527 2.235c0 .786.132 1.54.373 2.235z"/>
              <path fill="#34A853" d="M12 24c3.245 0 5.973-1.077 7.964-2.927l-3.691-2.864a7.124 7.124 0 0 1-4.273 1.2A7.077 7.077 0 0 1 5.266 14.235L1.22 17.427C3.23 21.327 7.27 24 12 24z"/>
            </svg>
            Sign in with Google
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#1F2A44]" />
            <span className="text-xs text-slate-500">or</span>
            <div className="flex-1 h-px bg-[#1F2A44]" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-3 py-3 bg-[#0B1020] border border-[#24304A] rounded-xl text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 transition"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-10 py-3 bg-[#0B1020] border border-[#24304A] rounded-xl text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/10 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* FORGOT PASSWORD LINK */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-slate-400 hover:text-cyan-400 transition">
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition shadow-lg shadow-cyan-500/10"
            >
              {authLoading ? "Signing in..." : "Access Dashboard"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-xs text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}