import React from 'react';

export default function IdeaTechnicalDetails({ formData, handleChange }) {
  const min = 30;
  const len = formData.tech_requirements?.length || 0;

  // Shared styles
  const inputClass = "w-full bg-[#0B1020] border border-[#24304A] rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none scrollbar-hide";
  const labelClass = "text-sm font-medium text-slate-300";
  
  // Logic: Emerald if >= 30, Rose if > 0 and < 30 (while typing), Gray if empty
  const getCounterStyle = (l, m) => {
    if (l === 0) return "text-slate-600";
    return l >= m ? "text-emerald-500" : "text-rose-500";
  };
  
  // Only highlight border red if the user started typing but didn't meet the min length
  const isInvalid = (l, m) => l > 0 && l < m;

  return (
    <section>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Technical Details</h2>
        <p className="text-sm text-slate-400 mt-1">
          Describe the technologies, tools, frameworks, and infrastructure required to build and scale your solution.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelClass}>
              Technology Requirements
              <span className="text-[9px] text-slate-600 ml-2 font-normal italic">(Optional: Min {min} chars)</span>
            </label>

            <span className={`text-[10px] font-bold uppercase tracking-wider ${getCounterStyle(len, min)}`}>
              {len > 0 ? `${len} chars` : ""}
            </span>
          </div>

          <textarea
            rows={8}
            name="tech_requirements"
            value={formData.tech_requirements}
            onChange={handleChange}
            placeholder="e.g., React.js, Node.js, PostgreSQL, Docker, AWS..."
            className={`${inputClass} ${isInvalid(len, min) ? 'border-rose-500' : ''}`}
          />
        </div>
      </div>
    </section>
  );
}