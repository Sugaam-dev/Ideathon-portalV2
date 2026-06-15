import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyRegistrationOtp, resendRegistrationOtpThunk } from "../store/authThunks";
import { setRegistrationStep } from "../store/authSlice";
import { Loader2, ShieldCheck, Sparkles, Eye, EyeOff } from "lucide-react";
import localforage from "localforage";
const CompactInput = ({ label, error, maxLength, showToggle, onToggle, isToggled, ...props }) => (
  <div className="relative pt-4 group">
    <input
      {...props}
      maxLength={maxLength}
      className={`w-full bg-transparent border-b ${
        error ? "border-red-500" : "border-[#2A3553]"
      } py-2 pr-8 text-sm text-[#E5E7EB] placeholder-transparent focus:border-cyan-400 outline-none transition-all peer`}
      placeholder={label}
    />
    <label
      className={`absolute left-0 top-4 text-sm ${
        error ? "text-red-500" : "text-slate-500"
      } pointer-events-none peer-focus:top-[-4px] peer-focus:text-[10px] peer-focus:text-cyan-400 peer-not-placeholder-shown:top-[-4px] peer-not-placeholder-shown:text-[10px] transition-all`}
    >
      {label}
    </label>
    {showToggle && (
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-0 bottom-2 text-slate-500 hover:text-slate-300 transition"
      >
        {isToggled ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    )}
  </div>
);
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registrationStep, authLoading, registeredEmail, user } = useSelector(
    (state) => state.auth,
  );
  const [form, setForm] = useState(() => {
    const saved = sessionStorage.getItem("register_form");
    return saved ? JSON.parse(saved) : {
      name: "",
      email: "",
      phone: "",
      organization: "",
      internship_id: "",
      department: "",
      linkedin: "",
      password: "",
      confirm: "",
    };
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // Resume file state
  const [resumeFile, setResumeFile] = useState(null);

  const [initialResumeLoadDone, setInitialResumeLoadDone] = useState(false);

  // Sync form state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("register_form", JSON.stringify(form));
  }, [form]);

  // Sync resumeFile to localforage
  useEffect(() => {
    if (!initialResumeLoadDone) return;
    if (resumeFile) {
      localforage.setItem("register_resume", resumeFile);
    } else {
      localforage.removeItem("register_resume");
    }
  }, [resumeFile, initialResumeLoadDone]);

  // Load saved resume on mount
  useEffect(() => {
    const loadSavedResume = async () => {
      // If there's no active form in sessionStorage, it's a fresh tab session. Clear orphaned files.
      const hasSession = sessionStorage.getItem("register_form");
      if (!hasSession) {
        await localforage.removeItem("register_resume");
        setInitialResumeLoadDone(true);
        return;
      }

      const savedResume = await localforage.getItem("register_resume");
      if (savedResume) {
        setResumeFile(savedResume);
      }
      setInitialResumeLoadDone(true);
    };
    loadSavedResume();
  }, []);

  // Cleanup registration session on successful registration/login
  useEffect(() => {
    if (user) {
      sessionStorage.removeItem("register_form");
      localforage.removeItem("register_resume");
      sessionStorage.removeItem("registrationStep");
      sessionStorage.removeItem("registeredEmail");
    }
  }, [user]);

  // OTP Resend Timer Logic
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    let interval;
    if (registrationStep === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [registrationStep, resendTimer]);
  const handleResendOtp = () => {
    if (!canResend) return;
    dispatch(resendRegistrationOtpThunk(registeredEmail));
    setResendTimer(60);
    setCanResend(false);
  };
  const validateField = (name, value) => {
    const optionalFields = ["organization", "internship_id", "department", "linkedin"];
    if (optionalFields.includes(name) && !value.trim()) return "";
    let error = "";
    if (name === "name" && !value.trim()) error = "Full name is required";
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) error = "Invalid email";
    
    // if (name === "phone" && !/^\+?[0-9]{10,20}$/.test(value)) 
    //     error = "Enter a valid phone number (10-20 digits)";
    if (name === "phone" && !/^[6-9]\d{9}$/.test(value))
    error = "Enter a valid mobile number";
    if (name === "password") {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
      if (!regex.test(value)) 
        error = "Min 8 chars, 1 Upper, 1 Digit, 1 Special";
    }
    if (name === "confirm" && value !== form.password)
      error = "Passwords do not match";
      
    return error;
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach(
      (key) => (newErrors[key] = validateField(key, form[key])),
    );
    if (Object.values(newErrors).every((err) => err === "")) {
      // Build FormData payload for file upload support
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim());
      formData.append("phone", form.phone.trim());
      formData.append("password", form.password);
      
      if (form.organization.trim()) formData.append("organization", form.organization.trim());
      if (form.department.trim()) formData.append("department", form.department.trim());
      if (form.linkedin.trim()) formData.append("linkedin", form.linkedin.trim());
      if (resumeFile) formData.append("resume", resumeFile);
      dispatch(registerUser(formData));
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <div className="min-h-screen bg-[#152244] text-white flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-cyan-500 rounded-full blur-[100px] opacity-10" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-violet-600 rounded-full blur-[100px] opacity-10" />
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500">
              <Sparkles size={24} />
            </div>
            <h1 className="text-3xl font-black">PMRG IDEATHON 2026</h1>
          </div>
          <p className="text-slate-400 text-base leading-relaxed">
            Securely initialize your participation profile. Ensure all
            credentials meet standard complexity requirements for network
            security.
          </p>
        </div>
        <div className="bg-[#0E1424]/90 backdrop-blur-xl p-6 sm:p-10 rounded-[2rem] border border-[#1F2A44] shadow-2xl">
          {registrationStep === "otp" ? (
            <div className="space-y-6 text-center">
              <ShieldCheck className="mx-auto text-cyan-400" size={48} />
              <h2 className="text-xl font-bold">Verification Required</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                A 6-digit verification code has been dispatched to <span className="text-cyan-400 font-semibold">{registeredEmail}</span>. 
                {" "}(<button 
                  type="button"
                  onClick={() => dispatch(setRegistrationStep("form"))} 
                  className="text-cyan-400 hover:text-cyan-300 underline font-semibold cursor-pointer"
                >
                  Edit
                </button>). 
                Please enter it below to activate your account. The code remains valid for 5 minutes.
              </p>
              <div className="flex justify-center gap-2">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    maxLength={1}
                    value={v}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value;
                      setOtp(newOtp);
                      if (e.target.value && i < 5)
                        otpRefs.current[i + 1]?.focus();
                    }}
                    className="w-10 h-12 sm:w-12 sm:h-14 bg-[#0B1020] border border-[#24304A] text-center text-xl font-bold rounded-xl outline-none focus:border-cyan-400"
                  />
                ))}
              </div>
              <div className="text-xs pt-1">
                <button
                  type="button"
                  disabled={!canResend}
                  onClick={handleResendOtp}
                  className={`font-semibold transition-all ${
                    canResend 
                      ? "text-cyan-400 hover:text-cyan-300 underline cursor-pointer" 
                      : "text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {canResend ? "Resend Verification Code" : `Resend code in ${resendTimer}s`}
                </button>
              </div>
              <button
                onClick={() =>
                  dispatch(verifyRegistrationOtp(registeredEmail, otp.join(""), navigate))
                }
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl font-bold hover:opacity-90 transition-all"
              >
                {authLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Finalize Activation"
                )}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {[
                  { label: "Full Name *", key: "name" },
                  { label: "Email Address *", key: "email" },
                  { label: "Phone Number *", key: "phone", maxLength: 10 },
                  { label: "Organization", key: "organization" },
                  { label: "Department", key: "department" },
                  { label: "LinkedIn URL", key: "linkedin", full: true },
                  { 
                    label: "Password *", 
                    key: "password", 
                    type: showPassword ? "text" : "password", 
                    full: true,
                    showToggle: true,
                    onToggle: () => setShowPassword(!showPassword),
                    isToggled: showPassword
                  },
                  { 
                    label: "Confirm Password *", 
                    key: "confirm", 
                    type: showConfirm ? "text" : "password", 
                    full: true,
                    showToggle: true,
                    onToggle: () => setShowConfirm(!showConfirm),
                    isToggled: showConfirm
                  },
                ].map((field) => (
                  <div key={field.key} className={field.full ? "sm:col-span-2" : ""}>
                    <CompactInput
                      label={field.label}
                      type={field.type || "text"}
                      maxLength={field.maxLength}
                      value={form[field.key]}
                      onChange={(e) => {
                        if (field.key === "phone") {
                          const cleanValue = e.target.value.replace(/[^0-9+]/g, "");
                          setForm({ ...form, [field.key]: cleanValue });
                        } else {
                          setForm({ ...form, [field.key]: e.target.value });
                        }
                      }}
                      onBlur={handleBlur}
                      name={field.key}
                      error={errors[field.key]}
                      showToggle={field.showToggle}
                      onToggle={field.onToggle}
                      isToggled={field.isToggled}
                    />
                    {errors[field.key] && (
                      <p className="text-[10px] text-red-400 mt-1">{errors[field.key]}</p>
                    )}
                  </div>
                ))}
                
                {/* Resume File Upload Widget */}
                <div className="sm:col-span-2 pt-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    Upload Resume (Optional, PDF/DOC/DOCX only)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    className="w-full bg-[#0B1020] border-b border-[#2A3553] py-2 text-sm text-[#E5E7EB] outline-none file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-950/50 file:text-cyan-400 hover:file:bg-cyan-900/50 transition-all"
                  />
                  {resumeFile && (
                    <p className="text-[10px] text-cyan-400 mt-1">Selected: {resumeFile.name}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl font-bold text-white hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/20"
              >
                {authLoading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "PROCEED TO SECURE GATE"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
