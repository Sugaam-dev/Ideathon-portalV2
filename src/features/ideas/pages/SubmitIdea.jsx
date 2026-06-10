import React, { useState, useEffect } from "react";
import { useCreateIdea } from "../api/ideasApi";
import Stepper from "../components/Stepper";
import TermsAndConditions from "../components/TermsAndConditions";
import IdeaInformation from "../components/IdeaInformation";
import IdeaResourceLinks from "../components/IdeaResourceLinks";
import IdeaDocumentUpload from "../components/IdeaDocumentUpload";
import ReviewAndSubmit from "../components/ReviewAndSubmit";
import localforage from "localforage";

export default function SubmitIdea() {
  const { mutate: createIdea, isPending: submitting } = useCreateIdea();

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = sessionStorage.getItem("idea_currentStep");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [acceptedTerms, setAcceptedTerms] = useState(() => {
    const saved = sessionStorage.getItem("idea_acceptedTerms");
    return saved === "true";
  });
  const [files, setFiles] = useState([]);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("idea_formData");
    return saved ? JSON.parse(saved) : {
      title: "", category: "", current_stage: "", problem_statement: "",
      proposed_solution: "", target_audience: "", market_opportunity: "",
      competitive_advantage: "", revenue_model: "", business_impact: "",
      scalability: "", tech_requirements: "", github_link: "",
      figma_link: "", drive_link: "", demo_url: "",
    };
  });

  const [initialFilesLoadDone, setInitialFilesLoadDone] = useState(false);

  // Sync currentStep to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("idea_currentStep", currentStep.toString());
  }, [currentStep]);

  // Sync acceptedTerms to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("idea_acceptedTerms", acceptedTerms.toString());
  }, [acceptedTerms]);

  // Sync formData to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("idea_formData", JSON.stringify(formData));
  }, [formData]);

  // Sync files to localforage
  useEffect(() => {
    if (!initialFilesLoadDone) return;
    if (files && files.length > 0) {
      localforage.setItem("idea_files", files);
    } else {
      localforage.removeItem("idea_files");
    }
  }, [files, initialFilesLoadDone]);

  // Load saved files on mount
  useEffect(() => {
    const loadSavedFiles = async () => {
      // If there's no active step in sessionStorage, it's a fresh tab session. Clear orphaned files.
      const hasSession = sessionStorage.getItem("idea_currentStep");
      if (!hasSession) {
        await localforage.removeItem("idea_files");
        setInitialFilesLoadDone(true);
        return;
      }

      const savedFiles = await localforage.getItem("idea_files");
      if (savedFiles) {
        setFiles(savedFiles);
      }
      setInitialFilesLoadDone(true);
    };
    loadSavedFiles();
  }, []);

  // Cleanup on success
  useEffect(() => {
    if (successData) {
      sessionStorage.removeItem("idea_currentStep");
      sessionStorage.removeItem("idea_acceptedTerms");
      sessionStorage.removeItem("idea_formData");
      localforage.removeItem("idea_files");
    }
  }, [successData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Remove error when user starts typing
    if (error) setError("");
  };

  const validateStep2 = () => {
    setError("");
    if (!formData.title.trim()) { setError("Idea title is required"); return false; }
    if (!formData.category) { setError("Category is required"); return false; }
    if (!formData.current_stage) { setError("Current stage is required"); return false; }
    if (formData.problem_statement.trim().length < 80) { setError("Problem statement must be at least 80 characters"); return false; }
    if (formData.proposed_solution.trim().length < 80) { setError("Proposed solution must be at least 80 characters"); return false; }
    return true;
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (currentStep === 1 && !acceptedTerms) { setError("Please accept the Terms & Conditions"); return; }
    if (currentStep === 2 && !validateStep2()) return;
    goToStep(currentStep + 1);
  };

  const handlePrevious = () => goToStep(currentStep - 1);

  const handleSubmit = () => {
    // Sanitize formData: Convert empty strings of optional fields to null
    const sanitizedData = { ...formData };
    const optionalFields = [
      "market_opportunity", "competitive_advantage", "revenue_model", 
      "business_impact", "scalability", "tech_requirements", 
      "figma_link", "github_link", "drive_link", "demo_url"
    ];

    optionalFields.forEach((field) => {
      if (sanitizedData[field] === "") {
        sanitizedData[field] = null;
      }
    });

    // Enforce only one file uploaded by slicing the array to at most 1 item
    const singleFilePayload = files.slice(0, 1);

    createIdea(
      { ideaPayload: sanitizedData, files: singleFilePayload },
      { onSuccess: (data) => setSuccessData(data) }
    );
  };

  if (successData) {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center px-4">
        <div className="bg-[#0E1424] border border-[#1F2A44] rounded-3xl p-10 max-w-2xl w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-white">Submission Successful</h1>
          <p className="mt-3 text-slate-400">Your innovation idea has been submitted successfully.</p>
            <p className="mt-3 text-red-400">Please check both your Inbox and Spam/Junk folder for further updates regarding your status.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A12] py-10">
      <div className=" mx-auto px-2">
        <Stepper currentStep={currentStep} />
        
        <div className="mt-8">
          {currentStep === 1 && <TermsAndConditions acceptedTerms={acceptedTerms} setAcceptedTerms={setAcceptedTerms} />}
          {currentStep === 2 && <IdeaInformation formData={formData} handleChange={handleChange} />}
          {currentStep === 3 && (
            <div className="space-y-6">
              <IdeaResourceLinks formData={formData} handleChange={handleChange} />
              <IdeaDocumentUpload files={files} setFiles={setFiles} />
            </div>
          )}
          {currentStep === 4 && (
            <ReviewAndSubmit
              formData={formData}
              files={files}
              submitting={submitting}
              onSubmit={handleSubmit}
              onBack={() => goToStep(3)}
              onEditDetails={() => goToStep(2)}
            />
          )}
        </div>

        {/* Navigation Section (Inline, Not Fixed) */}
        {currentStep < 4 && (
          <div className="mt-10">
            {error && (
              <div className="mb-4 p-3 max-w-3xl mx-auto bg-rose-500/10 border border-rose-500/50 rounded-xl text-rose-400 text-xs font-bold text-center">
                {error}
              </div>
            )}
            <div className="flex justify-between">
              <button 
                onClick={handlePrevious} 
                disabled={currentStep === 1} 
                className="px-6 py-3 rounded-xl border border-[#1F2A44] text-slate-300 hover:bg-[#0E1424] transition-all disabled:opacity-30"
              >
                Previous
              </button>
              <button 
                onClick={handleNext} 
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}