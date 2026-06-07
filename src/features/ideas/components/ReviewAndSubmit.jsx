import React from 'react';
import { FiFileText, FiGithub, FiLink, FiArrowLeft, FiSend, FiFigma, FiGlobe, FiCpu } from "react-icons/fi";
import { FaGoogleDrive } from "react-icons/fa";

export default function ReviewAndSubmit({
  formData,
  files,
  submitting,
  onSubmit,
  onBack,
}) {
  const renderValue = (value) => (value?.trim() ? value : "Not Provided");

  const Section = ({ title, children }) => (
    <div className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-6 md:p-8 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-6 border-b border-[#1F2A44] pb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-8 shadow-xl text-center">
        <h2 className="text-2xl font-bold text-white">Review & Submit</h2>
        <p className="text-slate-400 mt-2">Please double-check all information before submitting.</p>
      </div>

      {/* Basic Info */}
      <Section title="Basic Information">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Idea Title</label>
            <p className="text-white font-medium mt-1">{renderValue(formData.title)}</p>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Category</label>
            <p className="text-white font-medium mt-1">{renderValue(formData.category)}</p>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Current Stage</label>
            <p className="text-white font-medium mt-1">{renderValue(formData.current_stage)}</p>
          </div>
        </div>
      </Section>

      {/* Problem & Solution */}
      <Section title="Problem & Solution">
        <div className="space-y-6">
          {["Problem Statement", "Proposed Solution", "Target Audience"].map((field) => {
            const key = field.toLowerCase().replace(" ", "_");
            return (
              <div key={key}>
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{field}</label>
                <p className="text-slate-300 mt-2 whitespace-pre-wrap leading-relaxed">{renderValue(formData[key])}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Business Details */}
      <Section title="Business & Market Details">
        <div className="grid md:grid-cols-2 gap-6">
          {["Market Opportunity", "Competitive Advantage", "Revenue Model", "Business Impact", "Scalability"].map((field) => {
            const key = field.toLowerCase().replace(" ", "_");
            return (
              <div key={key}>
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{field}</label>
                <p className="text-white font-medium mt-1">{renderValue(formData[key])}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Technical Details */}
      <Section title="Technical Details">
        <div className="flex items-start gap-4">
          <FiCpu className="text-cyan-500 mt-1" size={24} />
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Technology Requirements</label>
            <p className="text-slate-300 mt-2 whitespace-pre-wrap leading-relaxed">{renderValue(formData.tech_requirements)}</p>
          </div>
        </div>
      </Section>

      {/* Resource Links */}
      <Section title="Resources & Links">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "Github", key: "github_link", icon: <FiGithub /> },
            { label: "Figma", key: "figma_link", icon: <FiFigma /> },
            { label: "Drive", key: "drive_link", icon: <FaGoogleDrive /> },
            { label: "Demo", key: "demo_url", icon: <FiGlobe /> },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-3 bg-[#0B1020] p-3 rounded-xl border border-[#24304A]">
              <div className="text-cyan-500">{item.icon}</div>
              <div className="overflow-hidden">
                <p className="text-[10px] uppercase font-bold text-slate-500">{item.label}</p>
                <p className="text-white text-sm truncate">{renderValue(formData[item.key])}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Uploaded Documents */}
      <Section title="Uploaded Documents">
        {files.length === 0 ? (
          <p className="text-slate-500 italic">No documents uploaded.</p>
        ) : (
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-3 bg-[#0B1020] p-4 rounded-xl border border-[#24304A]">
                <FiFileText className="text-cyan-500" />
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{file.name}</p>
                  <p className="text-[10px] text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-[#1F2A44] text-slate-300 hover:bg-[#0E1424] transition-all font-semibold"
        >
          <FiArrowLeft /> Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="flex-[2] flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : <><FiSend /> Submit Innovation Idea</>}
        </button>
      </div>
    </div>
  );
}