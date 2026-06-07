import React from 'react';

const categories = [
  "Healthcare", "Education", "Agriculture", "FinTech", "AI / ML",
  "Cybersecurity", "E-Commerce", "Environment", "Transportation", "Other"
];

const stages = ["Idea", "Prototype", "MVP", "Beta", "Production"];

export default function IdeaBasicInfo({ formData, handleChange }) {
  const inputClass = "w-full bg-[#0B1020] border border-[#24304A] rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all";
  const labelClass = "block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-wider";

  // Helper: Returns border color only if invalid
  const getBorderColor = (val, min, max) => {
    if (val.length === 0) return "border-[#24304A]";
    if (val.length < min || val.length > max) return "border-red-500";
    return "border-[#24304A]"; // Keep neutral if valid
  };

  // Helper: Returns text color for the character count (Green if satisfied, Red if not)
  const getCounterColor = (val, min, max) => {
    if (val.length === 0) return "text-slate-500";
    return (val.length >= min && val.length <= max) ? "text-emerald-500" : "text-red-500";
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Basic Information</h2>
        <p className="text-slate-400 text-sm mt-1">Provide core details about your innovation.</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            {/* Requirement is now explicitly in the label */}
            <label className={labelClass}>
              Idea Title <span className="text-red-500">*</span> 
              <span className="text-[9px] font-normal text-slate-600 ml-2">(Min 10 chars)</span>
            </label>
            <span className={`text-[10px] font-bold ${getCounterColor(formData.title, 10, 1200)}`}>
              {formData.title.length}/1200
            </span>
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., AI Powered Hospital Management"
            className={`${inputClass} ${getBorderColor(formData.title, 10, 1200)}`}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Category <span className="text-red-500">*</span></label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputClass} appearance-none`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0E1424]">{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Current Stage <span className="text-red-500">*</span></label>
            <select
              name="current_stage"
              value={formData.current_stage}
              onChange={handleChange}
              className={`${inputClass} appearance-none`}
            >
              <option value="">Select Stage</option>
              {stages.map((st) => (
                <option key={st} value={st} className="bg-[#0E1424]">{st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}