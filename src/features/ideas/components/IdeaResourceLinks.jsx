import React from 'react';
import { FiGithub, FiFigma, FiGlobe } from "react-icons/fi";
import { FaGoogleDrive } from "react-icons/fa";

export default function IdeaResourceLinks({ formData, handleChange }) {
  const isValidUrl = (value) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const LinkInput = ({ icon, label, name, placeholder }) => {
    const valid = isValidUrl(formData[name]);
    
    return (
      <div>
        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-wider">
          {label}
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors">
            {icon}
          </div>
          <input
            type="url"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full bg-[#0B1020] border rounded-xl pl-12 pr-4 py-3 text-white outline-none transition-all ${
              valid 
                ? "border-[#24304A] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50" 
                : "border-rose-500/50 focus:ring-1 focus:ring-rose-500/50"
            }`}
          />
        </div>
        {!valid && <p className="text-[10px] text-rose-400 mt-1">Please enter a valid URL.</p>}
      </div>
    );
  };

  return (
    <section className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Resources & Links</h2>
        <p className="text-sm text-slate-400 mt-1">
          Share project resources that help reviewers understand your idea.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <LinkInput icon={<FiGithub size={18} />} label="GitHub Repository" name="github_link" placeholder="https://github.com/..." />
        <LinkInput icon={<FiFigma size={18} />} label="Figma Design" name="figma_link" placeholder="https://figma.com/..." />
        <LinkInput icon={<FaGoogleDrive size={18} />} label="Google Drive" name="drive_link" placeholder="https://drive.google.com/..." />
        <LinkInput icon={<FiGlobe size={18} />} label="Live Demo URL" name="demo_url" placeholder="https://your-project.com" />
      </div>

      <div className="mt-8 rounded-xl border border-cyan-500/10 bg-cyan-950/20 p-4">
        <h4 className="font-bold text-cyan-400 text-sm mb-2 flex items-center gap-2">
          💡 Recommended Resources
        </h4>
        <ul className="text-xs text-slate-400 space-y-1.5 ml-1">
          <li>• GitHub source code repository</li>
          <li>• Figma wireframes or UI designs</li>
          <li>• Product pitch deck (Google Drive)</li>
          <li>• Live application demo</li>
        </ul>
      </div>
    </section>
  );
}