import React from 'react';

export default function IdeaBusinessDetails({ formData, handleChange }) {
  const inputClass = "w-full bg-[#0B1020] border border-[#24304A] rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none scrollbar-hide";
  const labelClass = "text-sm font-medium text-slate-300";
  
  // Logic: Green if within range, Red if violating min/max, Gray if empty
  const getCounterColor = (len, min, max) => {
    if (len === 0) return "text-slate-600";
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
        <h2 className="text-xl font-bold text-white">Business & Market Details</h2>
        <p className="text-slate-400 text-sm mt-1">
          Strengthen your idea by explaining market potential, competitive advantage, and business impact.
        </p>
      </div>

      <div className="space-y-6">
        {[
          { label: "Market Opportunity", name: "market_opportunity", val: formData.market_opportunity, placeholder: "Describe the market need, demand, size...", min: 50, max: 3000 },
          { label: "Competitive Advantage", name: "competitive_advantage", val: formData.competitive_advantage, placeholder: "What makes your solution different?", min: 50, max: 3000 },
          { label: "Business Impact", name: "business_impact", val: formData.business_impact, placeholder: "Expected benefits, savings, efficiency...", min: 50, max: 3000 },
          { label: "Scalability", name: "scalability", val: formData.scalability, placeholder: "How will this grow across users or regions?", min: 50, max: 3000 },
        ].map((field) => (
          <div key={field.name}>
            <div className="flex justify-between mb-2">
              <label className={labelClass}>
                {field.label} 
                <span className="text-[10px] text-slate-600 ml-2 font-normal italic">
                  (Optional: Min {field.min} / Max {field.max} chars)
                </span>
              </label>
              <span className={getCounterColor(field.val.length, field.min, field.max)}>
                {field.val.length > 0 ? `${field.val.length}/${field.max} chars` : ""}
              </span>
            </div>
            <textarea
              rows={4}
              name={field.name}
              value={field.val}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`${inputClass} ${isInvalid(field.val.length, field.min, field.max) ? 'border-rose-500' : ''}`}
            />
          </div>
        ))}

        <div>
          <label className={`${labelClass} mb-2 block`}>Revenue Model</label>
          <input
            type="text"
            name="revenue_model"
            value={formData.revenue_model}
            onChange={handleChange}
            placeholder="Subscription, SaaS, Freemium, Marketplace, etc."
            className="w-full bg-[#0B1020] border border-[#24304A] rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>
    </section>
  );
}