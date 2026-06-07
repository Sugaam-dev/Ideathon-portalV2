import React from 'react';
import { FiUploadCloud, FiTrash2, FiFileText } from "react-icons/fi";

// ADDED DEFAULT VALUES: files = [] and setFiles = () => {}
// This prevents the "Cannot read property 'length' of undefined" error
export default function IdeaDocumentUpload({ files = [], setFiles = () => {}, ideaId }) {
  
  const handleFileChange = (event) => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);
    // Enforce only one file: take only the first one
    if (selectedFiles.length > 0) {
      setFiles([selectedFiles[0]]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (!event.dataTransfer.files) return;
    const droppedFiles = Array.from(event.dataTransfer.files);
    // Enforce only one file: take only the first one
    if (droppedFiles.length > 0) {
      setFiles([droppedFiles[0]]);
    }
  };

  const handleDragOver = (event) => event.preventDefault();

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <section className="bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Supporting Documents</h2>
        <p className="text-sm text-slate-400 mt-1">
          Upload pitch decks, business plans, wireframes, or other supporting documents.
        </p>
      </div>

      {files && files.length === 0 ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-[#24304A] rounded-2xl p-10 text-center hover:border-cyan-500/50 transition-all bg-[#0B1020]"
        >
          <FiUploadCloud size={50} className="mx-auto text-cyan-500 mb-4" />
          <h3 className="font-semibold text-white">Drag & Drop File</h3>
          <p className="text-sm text-slate-400 mt-2 mb-5">or click below to browse files</p>
          
          <label className="inline-flex cursor-pointer items-center px-6 py-3 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-900/20">
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </label>
          <p className="text-xs text-slate-500 mt-4">Maximum file size: 25 MB (Only 1 file allowed)</p>
        </div>
      ) : (
        <div className="mt-6">
          <h3 className="font-semibold text-slate-300 mb-4">Uploaded File</h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-xl border border-[#1F2A44] bg-[#0B1020] p-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <FiFileText size={20} className="text-cyan-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{file.name}</p>
                    <p className="text-[10px] text-slate-500">{formatSize(file.size)}</p>
                  </div>
                </div>
                <button type="button" onClick={() => removeFile(index)} className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0">
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl border border-cyan-500/10 bg-cyan-950/20 p-4">
        <h4 className="font-bold text-cyan-400 text-sm mb-2">Recommended Documents</h4>
        <ul className="text-xs text-slate-400 space-y-1.5 ml-1">
          <li>• Pitch Deck (PDF)</li>
          <li>• Business Model Canvas</li>
          <li>• UI/UX Screens</li>
          <li>• Architecture Diagram</li>
        </ul>
      </div>
    </section>
  );
}