import React from 'react';

export default function TermsAndConditions({
  acceptedTerms,
  setAcceptedTerms,
}) {
  return (
    <div className="bg-[#0E1424] max-w-6xl mx-auto border border-[#1F2A44] rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/40">
      <h2 className="text-xl font-bold text-white mb-6">
        Terms & Conditions
      </h2>

      <div className="space-y-4 text-slate-400 text-sm">
        {[
          "This submission is my original work and does not infringe on any intellectual property rights.",
          "I have all necessary permissions and rights to submit this idea.",
          "No confidential, trade-secret, or proprietary information is included.",
          "I understand that I am permitted to submit a maximum of three (3) ideas under my account.",
          "Each idea is limited to a maximum of one (1) supporting document (Pitch Deck, Canvas, etc.).",
          "Documents follow a 'delete-to-replace' workflow—you must delete the existing file before uploading a new one.",
          "Submissions and attachments are frozen and cannot be updated or deleted once the idea status changes from 'Submitted' (e.g., Under Review, Shortlisted).",
          "Submission of an idea does not guarantee approval, funding, or automatic entry into evaluation stages.",
          "I agree to comply with the ideathon evaluation criteria and the final review decisions."
        ].map((text, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
            <p className="leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-[#1F2A44]">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="peer w-5 h-5 appearance-none rounded border border-[#24304A] bg-[#0B1020] checked:bg-cyan-500 checked:border-cyan-500 transition-all cursor-pointer"
            />
            <svg 
              className="absolute left-0.5 w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" 
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
            I agree to all Terms & Conditions and rules
          </span>
        </label>
      </div>
    </div>
  );
}