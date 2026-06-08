import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminEmailLogs } from '../../ideas/api/ideasApi';
import { formatDate } from '../../../utils/formatters';
import { ArrowLeft, Search, Mail, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
export default function AdminEmailLogs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const emailFilters = useMemo(() => ({
    page: page,
    limit: 15,
    status: status || undefined,
    search: search.trim() || undefined
  }), [page, status, search]);
  const { data: emailLogsData, isLoading, error } = useAdminEmailLogs(emailFilters);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate('/admin')} 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft size={14} /> Back to Suite
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Mail className="text-indigo-600" size={24} /> System Email Dispatch Audits
          </h1>
          <p className="text-xs text-slate-500 mt-1">Review SMTP rotation history, deliverability tracking, and connection failover logs.</p>
        </div>
      </div>
      {/* Filter controls */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            className="form-input pl-9 w-full" 
            placeholder="Search logs by recipient, subject, or SMTP account..." 
            value={search} 
            onChange={handleSearchChange} 
          />
        </div>
        <select className="form-select md:w-44" value={status} onChange={handleStatusChange}>
          <option value="">All Outcomes</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="FAILED">FAILED</option>
        </select>
      </div>
      {/* Logs Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-16 flex justify-center">
            <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="p-16 text-center text-rose-500 font-medium text-sm">
            Failed to retrieve email logs. Ensure you have administrator credentials.
          </div>
        ) : !emailLogsData || emailLogsData.results.length === 0 ? (
          <div className="p-16 text-center text-slate-400 font-medium text-sm">
            No email dispatch logs found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  <th className="p-4">Recipient</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">SMTP Account Used</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {emailLogsData.results.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 font-semibold text-slate-800">{log.recipient_email}</td>
                      <td className="p-4 text-slate-600 truncate max-w-[250px]" title={log.subject}>
                        {log.subject}
                      </td>
                      <td className="p-4 text-xs font-mono text-slate-500">{log.smtp_account_used}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          log.status === 'SUCCESS' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                          {log.status === 'SUCCESS' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-400">{formatDate(log.sent_at)}</td>
                    </tr>
                    {log.status === 'FAILED' && log.error_message && (
                      <tr className="bg-rose-50/30">
                        <td colSpan={5} className="px-4 py-2 text-xs text-rose-600 font-mono border-b border-slate-100">
                          <span className="font-bold uppercase tracking-wider text-[9px] mr-2 text-rose-700">Error Details:</span>
                          {log.error_message}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Pagination Controls */}
      {emailLogsData && emailLogsData.pages > 1 && (
        <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          <button
            disabled={page <= 1}
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <span className="text-xs text-slate-500 font-medium">
            Page {page} of {emailLogsData.pages} ({emailLogsData.total} logs)
          </span>
          <button
            disabled={page >= emailLogsData.pages}
            onClick={() => setPage(prev => Math.min(emailLogsData.pages, prev + 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
