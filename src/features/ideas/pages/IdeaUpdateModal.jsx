import React, { useState } from "react";
import { useUpdateIdea, useDeleteAttachment } from "../api/ideasApi";
import { apiClient } from "../../../services/apiClient";

import toast from "react-hot-toast";
import IdeaBasicInfo from "../components/IdeaBasicInfo";
import IdeaBusinessDetails from "../components/IdeaBusinessDetails";
import IdeaProblemSolution from "../components/IdeaProblemSolution";
import IdeaTechnicalDetails from "../components/IdeaTechnicalDetails";
import IdeaDocumentUpload from "../components/IdeaDocumentUpload";

// --- HELPER COMPONENTS ---
function Section({ title, children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-md">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/70">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-[10px] text-slate-400 uppercase tracking-wider ml-1">{label}</label>
      <input 
        name={name}
        value={value} 
        onChange={(e) => onChange(e)} 
        className="w-full mt-1 bg-white/5 border border-white/10 focus:border-cyan-400 outline-none rounded-xl p-3 text-white text-sm transition" 
      />
    </div>
  );
}

// --- MAIN MODAL COMPONENT ---
export default function IdeaUpdateModal({ idea, onClose }) {
  const { mutateAsync: updateIdea, isPending: isUpdating } = useUpdateIdea();
  const { mutate: deleteAttachment } = useDeleteAttachment();
  
  const [newFiles, setNewFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    title: idea.title || "",
    problem_statement: idea.problem_statement || "",
    proposed_solution: idea.proposed_solution || "",
    category: idea.category || "",
    target_audience: idea.target_audience || "",
    current_stage: idea.current_stage || "",
    market_opportunity: idea.market_opportunity || "",
    competitive_advantage: idea.competitive_advantage || "",
    revenue_model: idea.revenue_model || "",
    business_impact: idea.business_impact || "",
    scalability: idea.scalability || "",
    tech_requirements: idea.tech_requirements || "",
    figma_link: idea.figma_link || "",
    github_link: idea.github_link || "",
    drive_link: idea.drive_link || "",
    demo_url: idea.demo_url || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    const payload = { ...form };
    const optionalFields = [
      "market_opportunity", "competitive_advantage", "revenue_model", 
      "business_impact", "scalability", "tech_requirements", 
      "figma_link", "github_link", "drive_link", "demo_url"
    ];
    optionalFields.forEach((field) => {
      if (payload[field] === "") payload[field] = null;
    });

    try {
      // 1. Update text fields
      await updateIdea({ id: idea.id, data: payload });

      // 2. Upload new files if any are present
      if (newFiles.length > 0) {
        for (const file of newFiles) {
          const formData = new FormData();
          formData.append("file", file);
          await apiClient.post(`/api/ideas/${idea.id}/attachments`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      }
      
      toast.success("Idea updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update idea. Please check your connection.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-0 sm:p-5">
      <div className="w-full h-full sm:h-[95vh] sm:max-w-7xl bg-[#070A12] border border-[#1F2A44] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="shrink-0 px-6 py-4 border-b border-[#1F2A44] bg-[#0E1424]">
          <h2 className="text-2xl font-bold text-white">Update Idea</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-10 scrollbar-hide">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-10">
              <IdeaBasicInfo formData={form} handleChange={handleChange} />
              <IdeaProblemSolution formData={form} handleChange={handleChange} />
            </div>
            <div className="space-y-10">
              <IdeaBusinessDetails formData={form} handleChange={handleChange} />
              <IdeaTechnicalDetails formData={form} handleChange={handleChange} />
            </div>
          </div>

          <Section title="External Links">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Input label="Figma Link" name="figma_link" value={form.figma_link} onChange={handleChange} />
              <Input label="GitHub Link" name="github_link" value={form.github_link} onChange={handleChange} />
              <Input label="Drive Link" name="drive_link" value={form.drive_link} onChange={handleChange} />
              <Input label="Demo URL" name="demo_url" value={form.demo_url} onChange={handleChange} />
            </div>
          </Section>

          <Section title="Document Management">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] text-slate-400 uppercase tracking-wider ml-1 mb-3 block">Currently Uploaded Files</label>
                {idea.attachments?.length > 0 ? (
                  <div className="space-y-2">
                    {idea.attachments.map((file) => (
                      <div key={file.id} className="flex justify-between items-center bg-[#0B1020] p-3 rounded-xl border border-[#24304A]">
                        <span className="text-sm text-white truncate">{file.original_name}</span>
                        <button type="button" onClick={() => deleteAttachment(file.id)} className="text-rose-500 hover:text-rose-400 text-xs font-bold uppercase">Delete</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-slate-500 p-4 border border-dashed border-[#24304A] rounded-xl text-center mb-6">No documents uploaded.</p>
                    <div className="mt-6 border-t border-[#24304A] pt-6">
                      <label className="text-[10px] text-slate-400 uppercase tracking-wider ml-1 mb-2 block">Upload New Document (Max 1 file)</label>
                      <IdeaDocumentUpload ideaId={idea.id} files={newFiles} setFiles={setNewFiles} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>
          
          <div className="flex justify-end gap-4 pt-6 border-t border-[#1F2A44]">
            <button type="button" onClick={onClose} className="px-6 py-3 text-slate-400 hover:text-white transition">Cancel</button>
            <button type="submit" disabled={isUpdating || isUploading} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl text-white font-bold hover:opacity-90 transition">
              {isUpdating || isUploading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}