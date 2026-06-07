import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useMyIdeas } from '../api/ideasApi';
import { formatDate } from '../../../utils/formatters';
import { Plus, Eye, Clock, Filter } from 'lucide-react';

const STATUS_MAP = {
  Submitted: 'text-slate-300 border-slate-500 bg-slate-500/10',
  'Under Review': 'text-amber-400 border-amber-500/50 bg-amber-500/10',
  Shortlisted: 'text-purple-400 border-purple-500/50 bg-purple-500/10',
  'Interview Scheduled': 'text-blue-400 border-blue-500/50 bg-blue-500/10',
  Selected: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10',
  'Incubation Phase': 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10',
  Closed: 'text-rose-400 border-rose-500/50 bg-rose-500/10',
};

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

const { data: ideas = [], isLoading } = useMyIdeas(!!user);
  // 🔥 Derived analytics (optimized using useMemo)
  const stats = useMemo(() => {
    return ideas.reduce(
      (acc, idea) => {
        acc.total += 1;

        if (idea.status === 'Under Review') acc.review += 1;
        if (idea.status === 'Shortlisted') acc.shortlisted += 1;
        if (idea.status === 'Selected') acc.selected += 1;

        return acc;
      },
      {
        total: 0,
        review: 0,
        shortlisted: 0,
        selected: 0,
      }
    );
  }, [ideas]);

  const handleStatusClick = (status) => {
    console.log('Filter request:', status);
    // future: navigate(`/dashboard?status=${status}`)
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white p-4 md:p-8">
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-600/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">
              Workspace Portfolio
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hello, {user?.name}
            </h1>
          </div>

          <Link
            to="/submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 hover:opacity-90 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/10"
          >
            <Plus size={16} /> Submit Fresh Idea
          </Link>
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Submitted', val: stats.total },
            { label: 'Under Review', val: stats.review, status: 'Under Review' },
            { label: 'Shortlisted', val: stats.shortlisted, status: 'Shortlisted' },
            { label: 'Selected Entries', val: stats.selected, status: 'Selected' },
          ].map((s, idx) => (
            <button
              key={idx}
              onClick={() => s.status && handleStatusClick(s.status)}
              className="bg-[#0E1424] border border-[#1F2A44] p-5 rounded-2xl hover:border-cyan-500/50 transition-all text-left group"
            >
              <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {s.val}
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl shadow-2xl overflow-hidden">
          
          <div className="p-6 border-b border-[#1F2A44] flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              My Submissions Pool
            </h2>
            <Filter size={16} className="text-slate-500" />
          </div>

          {isLoading ? (
            <div className="p-12 flex justify-center">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : ideas.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold text-white mb-1">
                No project submissions located
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mb-5">
                Start by submitting your first idea.
              </p>
              <Link
                to="/submit"
                className="inline-flex px-6 py-2 bg-[#1F2A44] hover:bg-[#2A3755] rounded-xl text-xs font-semibold"
              >
                Launch Form
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#0B1020] border-b border-[#1F2A44] text-[11px] uppercase text-slate-500">
                    <th className="p-4">#</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Stage</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Submitted</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#1F2A44]">
                  {ideas.map((idea) => (
                    <tr
                      key={idea.id}
                      className="hover:bg-[#151C2F]/50 transition-colors"
                    >
                      <td className="p-4 text-xs text-slate-500 font-mono">
                        #{idea.submitter_order_number || 1}
                      </td>

                      <td className="p-4 font-semibold">{idea.title}</td>

                      <td className="p-4 text-xs text-slate-400">
                        {idea.category}
                      </td>

                      <td className="p-4 text-xs text-slate-400">
                        {idea.current_stage}
                      </td>

                      <td className="p-4">
  <span
    className={`px-6 py-1 rounded-md text-[10px] font-bold uppercase border text-center inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] ${
      STATUS_MAP[idea.status] || 'text-slate-300 border-slate-700 bg-slate-800'
    }`}
  >
    {idea.status}
  </span>
</td>

                      <td className="p-4 text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(idea.submitted_at)}
                      </td>

                      <td className="p-4 text-right">
                        <Link
                          to={`/ideas/${idea.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-white px-3 py-1.5 border border-[#1F2A44] rounded-lg"
                        >
                          <Eye size={12} /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}