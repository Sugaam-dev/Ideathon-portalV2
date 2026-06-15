import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { logoutUser, updateProfileThunk, deleteResumeThunk } from '../store/authThunks';
import { apiClient } from '../../../services/apiClient';
import { 
  Mail, Phone, Building2, Briefcase, Link as LinkIcon, LogOut, ArrowLeft, 
  Shield, User, ExternalLink, AlertTriangle, Save, Download, Trash2, FileText, Upload 
} from 'lucide-react';

function InfoRow({ icon: Icon, label, value, isLink = false }) {
  if (!value) return null;
  return (
    <div className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-900/50 flex items-center justify-center shrink-0 text-cyan-400 border border-white/5 shadow-inner">
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{label}</div>
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-0.5">
            View Profile <ExternalLink size={12} />
          </a>
        ) : (
          <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 break-words">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Account() {
  const { user, authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Local state for profile updating form
  const [profileForm, setProfileForm] = useState({
    phone: user?.phone === "Google OAuth Verified" ? "" : (user?.phone || ""),
    organization: user?.organization || "",
    department: user?.department || "",
    linkedin: user?.linkedin || "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

  const handleLogout = () => {
    queryClient.clear();
    dispatch(logoutUser(navigate));
  };

  const handleDownloadResume = async () => {
    try {
      const response = await apiClient.get('/api/auth/resume/download', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Extract original filename or fallback
      const originalName = user.resume_filename 
        ? user.resume_filename.split("_resume")[1] || "resume.pdf"
        : "resume.pdf";
        
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Could not download resume file.");
    }
  };

  const handleDeleteResume = () => {
    if (window.confirm("Are you sure you want to permanently delete your resume?")) {
      dispatch(deleteResumeThunk());
    }
  };

  const handleResumeUpload = (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("phone", user.phone);
    formData.append("organization", user.organization);
    formData.append("department", user.department);
    if (user.linkedin) formData.append("linkedin", user.linkedin);
    formData.append("resume", file);
    dispatch(updateProfileThunk(formData, navigate));
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "phone") {
      if (!value.trim()) {
        error = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        error = "Enter a valid 10-digit mobile number starting with 6-9";
      }
    }
    if (name === "organization" && !value.trim()) {
      error = "Organization is required";
    }
    if (name === "department" && !value.trim()) {
      error = "Department is required";
    }
    if (name === "linkedin" && value.trim()) {
      if (!value.trim().startsWith("http://") && !value.trim().startsWith("https://") && !value.trim().startsWith("www.linkedin.com")) {
        error = "URL must begin with http://, https://, or www.linkedin.com";
      }
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    Object.keys(profileForm).forEach((key) => {
      const err = validateField(key, profileForm[key]);
      if (err) errors[key] = err;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const formData = new FormData();
    formData.append("phone", profileForm.phone.trim());
    formData.append("organization", profileForm.organization.trim());
    formData.append("department", profileForm.department.trim());
    
    if (profileForm.linkedin.trim()) {
      formData.append("linkedin", profileForm.linkedin.trim());
    }
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    dispatch(updateProfileThunk(formData, navigate));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#070A12] py-8 sm:py-16 px-4 sm:px-6 text-slate-200">
      <div className="max-w-3xl mx-auto w-full">
        {/* Background Glows */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[400px] bg-cyan-500 rounded-full blur-[100px] opacity-10" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[400px] bg-violet-600 rounded-full blur-[100px] opacity-10" />
        </div>
        
        {/* Back Button - Only show if profile is complete */}
        {user.is_profile_complete && (
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500 hover:text-white transition-colors mb-6 uppercase tracking-widest">
            <ArrowLeft size={14} /> Back
          </button>
        )}

        {/* Profile Warning Banner */}
        {!user.is_profile_complete && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-200 flex gap-3 items-start shadow-lg">
            <AlertTriangle className="shrink-0 text-amber-400" size={20} />
            <div>
              <h4 className="text-sm font-bold">Profile Details Required</h4>
              <p className="text-xs text-amber-300/80 mt-1">
                You logged in via Google OAuth. Please submit your phone number (exactly 10 digits), organization, and department below to unlock your workspace.
              </p>
            </div>
          </div>
        )}

        <div className="relative bg-[#0B1020] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent" />
          
          <div className="px-6 sm:px-8 pt-8 sm:pt-12 pb-8 relative">
            {/* Header */}
            <div className="flex flex-col items-center sm:flex-row sm:items-end gap-6 mb-8 sm:mb-10 text-center sm:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-1 shadow-2xl shadow-cyan-500/10">
                <div className="w-full h-full rounded-[1.4rem] bg-[#070A12] flex items-center justify-center text-3xl sm:text-4xl font-black text-cyan-400 border border-white/5">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">{user.name}</h1>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                  {user.role === 'ADMIN' ? <Shield size={12} /> : <User size={12} />}
                  {user.role}
                </div>
              </div>
            </div>

            {/* Profile Info Details View (Active only if complete) */}
            {user.is_profile_complete ? (
              <div className="space-y-6 pt-4 sm:pt-6 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <InfoRow icon={Mail} label="Email Address" value={user.email} />
                  <InfoRow icon={Phone} label="Contact Number" value={user.phone} />
                  <InfoRow icon={Building2} label="Organization" value={user.organization} />
                  <InfoRow icon={Briefcase} label="Department" value={user.department} />
                  {user.linkedin && (
                    <div className="md:col-span-2">
                        <InfoRow icon={LinkIcon} label="LinkedIn Profile" value={user.linkedin} isLink={true} />
                    </div>
                  )}
                </div>

                {/* Resume Widget - Only rendered for PARTICIPANT users */}
                {user.role === 'PARTICIPANT' && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center text-cyan-400 border border-white/5 shadow-inner">
                        <FileText size={20} />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Profile Resume</div>
                        <div className="text-xs font-semibold text-slate-200 mt-0.5 break-all pr-2">
                          {user.resume_filename ? user.resume_filename.split("_resume")[1] || "Uploaded Resume" : "No resume uploaded"}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {user.resume_filename ? (
                        <>
                          <button 
                            onClick={handleDownloadResume} 
                            className="px-3 py-2 bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/20 text-cyan-400 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                          >
                            <Download size={14} /> Download
                          </button>
                          <button 
                            onClick={handleDeleteResume} 
                            className="px-3 py-2 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleResumeUpload(e.target.files[0])}
                            className="hidden"
                            id="resume-reupload"
                          />
                          <label
                            htmlFor="resume-reupload"
                            className="cursor-pointer px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-[#070A12] text-xs font-black rounded-xl flex items-center gap-1.5 transition-all"
                          >
                            <Upload size={14} /> Upload Resume
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Profile Completeness Completion Form */
              <form onSubmit={handleProfileSubmit} className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-sm font-bold text-white mb-4">Complete Profile Setup</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Phone Number *</label>
                    <input
                      type="text"
                      name="phone"
                      maxLength={10}
                      required
                      placeholder="10-digit number"
                      value={profileForm.phone}
                      onChange={(e) => {
                        const cleanVal = e.target.value.replace(/[^0-9]/g, "");
                        setProfileForm({ ...profileForm, phone: cleanVal });
                        setFormErrors((prev) => ({ ...prev, phone: validateField("phone", cleanVal) }));
                      }}
                      onBlur={handleBlur}
                      className="w-full bg-[#070A12] border border-white/10 px-3 py-2.5 rounded-xl text-sm text-white focus:border-cyan-400 outline-none"
                    />
                    {formErrors.phone && <p className="text-[10px] text-red-400 mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Organization *</label>
                    <input
                      type="text"
                      name="organization"
                      required
                      placeholder="Your organization"
                      value={profileForm.organization}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, organization: e.target.value });
                        setFormErrors((prev) => ({ ...prev, organization: validateField("organization", e.target.value) }));
                      }}
                      onBlur={handleBlur}
                      className="w-full bg-[#070A12] border border-white/10 px-3 py-2.5 rounded-xl text-sm text-white focus:border-cyan-400 outline-none"
                    />
                    {formErrors.organization && <p className="text-[10px] text-red-400 mt-1">{formErrors.organization}</p>}
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Department *</label>
                    <input
                      type="text"
                      name="department"
                      required
                      placeholder="Your department"
                      value={profileForm.department}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, department: e.target.value });
                        setFormErrors((prev) => ({ ...prev, department: validateField("department", e.target.value) }));
                      }}
                      onBlur={handleBlur}
                      className="w-full bg-[#070A12] border border-white/10 px-3 py-2.5 rounded-xl text-sm text-white focus:border-cyan-400 outline-none"
                    />
                    {formErrors.department && <p className="text-[10px] text-red-400 mt-1">{formErrors.department}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">LinkedIn URL (Optional)</label>
                    <input
                      type="text"
                      name="linkedin"
                      placeholder="https://www.linkedin.com/in/username"
                      value={profileForm.linkedin}
                      onChange={(e) => {
                        setProfileForm({ ...profileForm, linkedin: e.target.value });
                        setFormErrors((prev) => ({ ...prev, linkedin: validateField("linkedin", e.target.value) }));
                      }}
                      onBlur={handleBlur}
                      className="w-full bg-[#070A12] border border-white/10 px-3 py-2.5 rounded-xl text-sm text-white focus:border-cyan-400 outline-none"
                    />
                    {formErrors.linkedin && <p className="text-[10px] text-red-400 mt-1">{formErrors.linkedin}</p>}
                  </div>

                  {/* Optional Resume Upload Field for Google Authenticated Profile Completion - ONLY for PARTICIPANT users */}
                  {user.role === 'PARTICIPANT' && (
                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        Upload Resume (Optional, PDF/DOC/DOCX)
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResumeFile(e.target.files[0])}
                        className="w-full bg-[#070A12] border border-white/10 px-3 py-2.5 rounded-xl text-sm text-slate-300 focus:border-cyan-400 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-950/50 file:text-cyan-400 hover:file:bg-cyan-900/50 transition-all"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full sm:w-auto px-6 py-3 mt-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl font-bold text-white hover:opacity-90 active:scale-[0.98] transition flex items-center justify-center gap-2"
                >
                  <Save size={16} /> {authLoading ? "Saving..." : "Save & Activate Portfolio"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Session Card */}
        <div className="mt-6 p-6 rounded-3xl border border-white/10 bg-[#0B1020] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-white">Security & Session</h3>
            <p className="text-[11px] text-slate-500">Manage your password and terminate session.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 w-full sm:w-auto">
            {/* ONLY render Change Password button if user has a password (is not Google-only) */}
            {user.has_password && (
              <button onClick={() => navigate('/change-password')} className="flex-1 sm:flex-none px-4 py-3 bg-white/5 hover:bg-cyan-950/30 border border-[#1F2A44] text-cyan-400 text-[11px] font-bold rounded-2xl transition-all">
                Change Password
              </button>
            )}
            <button onClick={handleLogout} className="flex-1 sm:flex-none px-4 py-3 bg-white/5 hover:bg-rose-950/30 border border-[#1F2A44] text-rose-400 text-[11px] font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}