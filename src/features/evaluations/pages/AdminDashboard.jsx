import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAdminStats, useAdminPool, useAdminUsers } from '../../ideas/api/ideasApi';
import { formatDate } from '../../../utils/formatters';
import { CATEGORIES } from '../../../config/constants';
import AdminUserDetailModal from './AdminUserDetailModal';
import AdminEmailLogs from './AdminEmailLogs';
import { 
  Search, BarChart3, Users, Lightbulb, CheckCircle2, ShieldAlert, 
  Layers, UserCheck, Shield, Award, Mail
} from 'lucide-react';
const STATUS_MAP = {
  'Submitted': 'badge-submitted', 
  'Under Review': 'badge-review',
  'Shortlisted': 'badge-shortlisted', 
  'Selected': 'badge-selected',
  'Incubation Phase': 'badge-incubation',
  'Closed': 'badge-closed'
};
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions' | 'users' | 'email-logs'
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  
  // Audited User Detail Modal State
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch('');
    setStatus('');
    setCategory('');
  };
  const filters = useMemo(() => ({
    search: search.trim() || undefined,
    status: status || undefined,
    category: category || undefined
  }), [search, status, category]);
  const { data: stats, isLoading: isStatsLoading } = useAdminStats();
  const { data: submissions = [], isLoading: isPoolLoading } = useAdminPool(filters);
  const { data: usersList = [], isLoading: isUsersLoading } = useAdminUsers();
  // Filtered users search mapping
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return usersList;
    const term = search.toLowerCase();
    return usersList.filter(u => 
      u.name.toLowerCase().includes(term) || 
      u.email.toLowerCase().includes(term)
    );
  }, [search, usersList]);
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management Suite</div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Ideathon Admin Gateway</h1>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Tab Selection */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
            <button 
              onClick={() => handleTabChange('submissions')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'submissions' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers size={14} /> Submissions Pool
            </button>
            <button 
              onClick={() => handleTabChange('users')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'users' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserCheck size={14} /> User Accounts
            </button>
            <button 
              onClick={() => handleTabChange('email-logs')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'email-logs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Mail size={14} /> Email Logs
            </button>
          </div>
        </div>
      </div>
      {/* Analytics Summary Panels */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {isStatsLoading ? [...Array(5)].map((_, i) => <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />) : stats && (
          <>
            {[
              { label: 'Total Participants', val: stats.total_participants, icon: <Users size={16} />, color: 'text-slate-800' },
              { label: 'Blueprints Pool', val: stats.total_ideas, icon: <Lightbulb size={16} />, color: 'text-indigo-600' },
              { label: 'Shortlisted', val: stats.shortlisted, icon: <BarChart3 size={16} />, color: 'text-purple-600' },
              { label: 'Selected', val: stats.selected, icon: <CheckCircle2 size={16} />, color: 'text-emerald-600' },
              { label: 'Under Review', val: stats.under_review, icon: <ShieldAlert size={16} />, color: 'text-amber-600' }
            ].map((card, i) => (
              <div key={i} className="bg-white border rounded-2xl p-5 shadow-sm flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-black ${card.color} tracking-tight`}>{card.val}</div>
                  <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{card.label}</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">{card.icon}</div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* Filters */}
      {activeTab !== 'email-logs' && (
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              className="form-input pl-9 w-full" 
              placeholder={activeTab === 'submissions' ? "Search by title, submitter name, or email..." : "Search users by name or email..."} 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
          {activeTab === 'submissions' && (
            <>
              <select className="form-select md:w-44" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
              </select>
              <select className="form-select md:w-44" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </>
          )}
        </div>
      )}
      {/* VIEW PANEL ROUTER (TABS) */}
      {activeTab === 'submissions' ? (
        /* =======================================
           SUBMISSIONS TABLE (TREAT IDEAS)
           ======================================= */
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          {isPoolLoading ? (
            <div className="p-16 flex justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" /></div>
          ) : submissions.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-medium text-sm">No submissions match the query.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    <th className="p-4">ID</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Submitter</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-center">Score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {submissions.map((sub) => (
                    <tr key={`${sub.id}-${sub.evaluation_score}`} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 font-mono text-xs text-slate-400">#{sub.submitter_order_number}</td>
                      <td className="p-4 font-semibold text-slate-800 truncate max-w-[200px]">{sub.title}</td>
                      <td className="p-4">
                        <div className="font-medium text-slate-700">{sub.submitter_name}</div>
                        <div className="text-[11px] text-slate-400">{sub.submitter_email}</div>
                      </td>
                      <td className="p-4 text-xs text-slate-500">{sub.category}</td>
                      <td className="p-4 text-center font-bold text-amber-600 text-xs">
                        {sub.evaluation_score != null ? sub.evaluation_score.toFixed(1) : '—'}
                      </td>
                      <td className="p-4"><span className={`badge ${STATUS_MAP[sub.status] || 'badge-review'}`}>{sub.status}</span></td>
                      <td className="p-4 text-xs text-slate-400">{formatDate(sub.submitted_at)}</td>
                      <td className="p-4 text-right">
                        <Link to={`/admin/ideas/${sub.id}`} className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-slate-900 text-white rounded-lg">Review</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : activeTab === 'users' ? (
        /* =======================================
           USER ACCOUNTS TABLE (AUDIT USERS)
           ======================================= */
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          {isUsersLoading ? (
            <div className="p-16 flex justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" /></div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-medium text-sm">No user accounts found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    <th className="p-4">User Details</th>
                    <th className="p-4">Access Role</th>
                    <th className="p-4 text-center">Submissions</th>
                    <th className="p-4">Profile Verification</th>
                    <th className="p-4">Registered Date</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredUsers.map((account) => (
                    <tr key={account.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">{account.name}</div>
                        <div className="text-xs text-slate-400">{account.email}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          account.role === 'ADMIN' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          account.role === 'JURY' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                          'bg-slate-50 text-slate-600 border border-slate-100'
                        }`}>
                          {account.role === 'ADMIN' ? <Shield size={10} /> : account.role === 'JURY' ? <Award size={10} /> : <Users size={10} />}
                          {account.role}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-slate-700">
                        {account.ideas_count}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          account.is_profile_complete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${account.is_profile_complete ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {account.is_profile_complete ? 'Verified' : 'Pending OAuth Setup'}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-400">{formatDate(account.created_at)}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => setSelectedUserId(account.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-slate-900 text-white rounded-lg"
                        >
                          View Account
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* =======================================
           EMAIL DISPATCH LOGS
           ======================================= */
        <AdminEmailLogs />
      )}
      {/* Audit Modal Overlay */}
      {selectedUserId && (
        <AdminUserDetailModal 
          userId={selectedUserId} 
          onClose={() => setSelectedUserId(null)} 
        />
      )}
    </div>
  );
}
