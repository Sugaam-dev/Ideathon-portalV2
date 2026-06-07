import React from 'react';

export default function IdeaProblemSolution({ formData, handleChange }) {
  const inputClass = "w-full bg-[#0B1020] border border-[#24304A] rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none scrollbar-hide";
  const labelClass = "text-sm font-medium text-slate-300";

  // Logic: Green if within range, Red if violating min/max
  const getCounterStyle = (len, min, max) => {
    return (len >= min && len <= max) ? "text-emerald-500" : "text-rose-500";
  };

  const isInvalid = (len, min, max) => len > 0 && (len < min || len > max);

  return (
    <section>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Problem & Solution</h2>
        <p className="text-slate-400 text-sm mt-1">
          Explain the challenge and how your innovation addresses it.
        </p>
      </div>

      <div className="space-y-6">
        {[
          { label: "Problem Statement", name: "problem_statement", val: formData.problem_statement, placeholder: "Describe the real-world problem...", min: 80, max: 6000 },
          { label: "Proposed Solution", name: "proposed_solution", val: formData.proposed_solution, placeholder: "Describe your solution and key features...", min: 80, max: 30000 },
          { label: "Target Audience", name: "target_audience", val: formData.target_audience, placeholder: "Who will benefit from this idea?...", min: 30, max: 3000 },
        ].map((field) => (
          <div key={field.name}>
            <div className="flex justify-between items-center mb-2">
              <label className={labelClass}>
                {field.label} <span className="text-red-500">*</span>
                <span className="text-[9px] text-slate-600 ml-2 font-normal italic">
                  (Min {field.min} / Max {field.max} chars)
                </span>
              </label>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${getCounterStyle(field.val.length, field.min, field.max)}`}>
                {field.val.length}/{field.max} chars
              </span>
            </div>
            <textarea
              rows={field.name === "proposed_solution" ? 8 : 6}
              name={field.name}
              value={field.val}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`${inputClass} ${isInvalid(field.val.length, field.min, field.max) ? 'border-rose-500' : ''}`}
            />
          </div>
        ))}

        {/* Tips Box */}
        <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-4">
          <h4 className="font-bold text-cyan-400 text-sm mb-2 flex items-center gap-2">
            💡 Tips for a strong submission
          </h4>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc ml-4">
            <li>Clearly explain the current challenge.</li>
            <li>Highlight why existing solutions are insufficient.</li>
            <li>Describe how your solution is unique.</li>
            <li>Specify who will benefit from it.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}