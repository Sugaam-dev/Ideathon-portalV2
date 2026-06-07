import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useIdeaDetails } from "../api/ideasApi";
import { EDITABLE_STATUSES } from "../../../config/constants";
import { ArrowLeft, Pencil, Lock } from "lucide-react";

import IdeaUpdateModal from "./IdeaUpdateModal";

const STATUS_MAP = {
  Submitted: "text-slate-300 bg-slate-900/40 border-slate-700",
  "Under Review": "text-amber-300 bg-amber-950/30 border-amber-800",
  Shortlisted: "text-purple-300 bg-purple-950/30 border-purple-800",
  Selected: "text-emerald-300 bg-emerald-950/30 border-emerald-800",
};

const Row = ({ k, v }) =>
  v ? (
    <div className="py-4 border-b border-white/5 last:border-0">
      <div className="text-[10px] text-slate-500 uppercase tracking-widest">
        {k}
      </div>
      <div className="text-slate-200 mt-1 leading-relaxed break-words">
        {v}
      </div>
    </div>
  ) : null;

// Helper component for individual metric badges
const ScoreBadge = ({ label, score }) => (
  <div className="bg-white/5 p-3 rounded-lg border border-white/5">
    <div className="text-[9px] text-slate-400 uppercase tracking-wider">{label}</div>
    <div className="text-md font-bold text-white">{score ?? "N/A"}</div>
  </div>
);

export default function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: currentIdea, isLoading } = useIdeaDetails(id);

  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070A12]">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentIdea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <p>Idea not found</p>
        <Link className="text-cyan-400 mt-3" to="/dashboard">
          Go Back
        </Link>
      </div>
    );
  }

  const evalData = currentIdea.evaluations?.[0];

  const calculatedScore = evalData
    ? (
        evalData.feasibility_score +
        evalData.innovation_score +
        evalData.market_score +
        evalData.scalability_score
      ) / 4
    : null;

  const finalScore = currentIdea.evaluation_score ?? calculatedScore;
  const editingAuthorized = EDITABLE_STATUSES.includes(currentIdea.status);

  return (
    <div className="min-h-screen bg-[#070A12] text-white p-6">
        {/* BACKGROUND GLOW */}
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
  {/* Cyan Glow - Top Left - Reduced intensity */}
  <div className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-cyan-500 rounded-full blur-[100px] opacity-15" />
  
  {/* Violet Glow - Bottom Right - Reduced intensity */}
  <div className="absolute bottom-[-5%] right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-violet-600 rounded-full blur-[100px] opacity-15" />
</div>
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

        {/* LEFT: Overview */}
        <div className="lg:col-span-3 bg-[#0B1020] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Idea Overview</h2>
          <Row k="Title" v={currentIdea.title} />
          <Row k="Problem" v={currentIdea.problem_statement} />
          <Row k="Solution" v={currentIdea.proposed_solution} />
          <Row k="Audience" v={currentIdea.target_audience} />
          <Row k="Stage" v={currentIdea.current_stage} />
          <Row k="Category" v={currentIdea.category} />
          <Row k="Market Opportunity" v={currentIdea.market_opportunity} />
          <Row k="Competitive Advantage" v={currentIdea.competitive_advantage} />
          <Row k="Revenue Model" v={currentIdea.revenue_model} />
          <Row k="Business Impact" v={currentIdea.business_impact} />
          <Row k="Scalability" v={currentIdea.scalability} />
          <Row k="Tech Requirements" v={currentIdea.tech_requirements} />
        </div>

        {/* RIGHT: Status & Scores */}
        <div className="bg-[#0B1020] border border-white/10 rounded-2xl p-5 space-y-6 sticky top-6">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Status</div>
            <div className={`inline-block mt-2 px-2 py-1 text-[10px] border rounded ${STATUS_MAP[currentIdea.status]}`}>
              {currentIdea.status}
            </div>
          </div>

          {/* Detailed Score Breakdown */}
          {evalData && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 uppercase tracking-widest">Metrics</div>
              <div className="grid grid-cols-2 gap-2">
                <ScoreBadge label="Inn" score={evalData.innovation_score} />
                <ScoreBadge label="Feas" score={evalData.feasibility_score} />
                <ScoreBadge label="Mkt" score={evalData.market_score} />
                <ScoreBadge label="Scal" score={evalData.scalability_score} />
              </div>
              <div className="pt-2">
                <div className="text-xs text-slate-500">Average Score</div>
                <div className="text-3xl font-black text-amber-400">
                  {finalScore?.toFixed(1)} <span className="text-lg text-slate-600">/ 10</span>
                </div>
              </div>
            </div>
          )}

          {editingAuthorized ? (
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Pencil size={14} /> Edit Idea
            </button>
          ) : (
            <div className="w-full py-3 bg-white/5 text-xs text-slate-500 rounded-xl flex items-center justify-center gap-2">
              <Lock size={14} /> Locked
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <IdeaUpdateModal
          idea={currentIdea}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}