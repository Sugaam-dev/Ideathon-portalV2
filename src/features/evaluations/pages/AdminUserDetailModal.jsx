import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminUserDetails, useDownloadUserResume } from '../../ideas/api/ideasApi';
import { formatDate } from '../../../utils/formatters';
import { 
  X, Mail, Phone, Building2, Briefcase, Link2, FileText, Download, Loader2, ExternalLink 
} from 'lucide-react';
function UserInfoRow({ icon: Icon, label, value, isLink = false }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-[#1F2A44] hover:bg-slate-900/60 transition">
      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 border border-[#24304A]">
        <Icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{label}</div>
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 mt-0.5">
            View LinkedIn <ExternalLink size={10} />
          </a>
        ) : (
          <div className="text-xs font-semibold text-slate-300 mt-0.5 truncate">{value}</div>
        )}
      </div>
    </div>
  );
}
export default function AdminUserDetailModal({ userId, onClose }) {
  const { data: userDetails, isLoading, error } = useAdminUserDetails(userId);
  const { mutateAsync: downloadResume, isPending: isDownloading } = useDownloadUserResume();
  const handleDownload = async () => {
    if (!userDetails || !userDetails.resume_filename) return;
    try {
      await downloadResume({ userId: userDetails.id, filename: userDetails.resume_filename });
    } catch (err) {
      alert("Failed to download user's resume.");
    }
  };
  if (!userId) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="w-full max-w-4xl bg-[#0E1424] border border-[#1F2A44] rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2A44] bg-[#070A12]/40">
          <div>
            <h2 className="text-lg font-black text-white">Participant Profile Audit</h2>
            <p className="text-xs text-slate-500 mt-0.5">Review credentials, resume records, and ideathon portfolio.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1F2A44] transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="animate-spin text-cyan-500" size={32} />
              <p className="text-xs text-slate-500 font-medium">Fetching profile details...</p>
            </div>
          ) : error || !userDetails ? (
            <div className="py-20 text-center text-rose-400 text-sm">Failed to retrieve user details. Please close and try again.</div>
          ) : (
            <>
              {/* Profile Card & Resume */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Profile Info */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-cyan-500/10 pb-2">Profile Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <UserInfoRow icon={Mail} label="Email Address" value={userDetails.email} />
                    <UserInfoRow icon={Phone} label="Contact Number" value={userDetails.phone} />
                    <UserInfoRow icon={Building2} label="Organization" value={userDetails.organization} />
                    <UserInfoRow icon={Briefcase} label="Department" value={userDetails.department} />
                    {userDetails.linkedin && (
                      <div className="sm:col-span-2">
                        <UserInfoRow icon={Link2} label="LinkedIn Profile" value={userDetails.linkedin} isLink={true} />
                      </div>
                    )}
                  </div>
                </div>
                {/* Right Resume Panel */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-cyan-500/10 pb-2">Resume Record</h3>
                  <div className="p-4 rounded-2xl bg-[#070A12]/40 border border-[#1F2A44] flex flex-col justify-between h-[154px] shadow-inner">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-[#24304A] shrink-0">
                        <FileText size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">File Attachment</div>
                        <div className="text-xs font-semibold text-slate-300 truncate mt-0.5" title={userDetails.resume_filename || "N/A"}>
                          {userDetails.resume_filename ? userDetails.resume_filename.split("_resume")[1] || "Uploaded Resume" : "No resume"}
                        </div>
                      </div>
                    </div>
                    {userDetails.has_resume ? (
                      <button 
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="animate-spin" size={14} /> Downloading...
                          </>
                        ) : (
                          <>
                            <Download size={14} /> Download Resume
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="text-center text-[11px] font-semibold text-slate-600 border border-dashed border-[#1F2A44] rounded-xl py-2 bg-[#070A12]/10">
                        No Resume Provided
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Submissions List */}
              <div className="space-y-4 pt-2">
                <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-cyan-500/10 pb-2">
                  Ideathon Portfolio ({userDetails.ideas?.length || 0})
                </h3>
                
                {userDetails.ideas?.length === 0 ? (
                  <div className="text-center p-8 rounded-2xl border border-dashed border-[#1F2A44] text-slate-500 text-xs">
                    This user has not submitted any ideas yet.
                  </div>
                ) : (
                  <div className="border border-[#1F2A44] rounded-2xl overflow-hidden shadow-inner bg-[#070A12]/20">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#070A12]/40 border-b border-[#1F2A44] text-[9px] font-bold uppercase text-slate-500 tracking-wider">
                            <th className="p-3">Title</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                            <th className="p-3"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1F2A44] text-xs text-slate-300">
                          {userDetails.ideas.map((idea) => (
                            <tr key={idea.id} className="hover:bg-slate-900/20 transition-colors">
                              <td className="p-3 font-semibold text-slate-200">{idea.title}</td>
                              <td className="p-3 text-slate-400">{idea.category}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  idea.status === 'Selected' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' :
                                  idea.status === 'Shortlisted' ? 'bg-purple-950/40 text-purple-400 border border-purple-500/20' :
                                  idea.status === 'Under Review' ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20' :
                                  'bg-slate-900 text-slate-400 border border-slate-700/30'
                                }`}>
                                  {idea.status}
                                </span>
                              </td>
                              <td className="p-3 text-[10px] text-slate-500">{formatDate(idea.submitted_at)}</td>
                              <td className="p-3 text-right">
                                <Link 
                                  to={`/admin/ideas/${idea.id}`}
                                  onClick={onClose}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-[#1F2A44]"
                                >
                                  Review
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
