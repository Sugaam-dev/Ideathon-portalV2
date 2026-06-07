// import React, { useState , useEffect} from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { 
//   useIdeaDetails, 
//   useUpdatePipelineStatus, 
//   useSubmitScorecard, 
//   useDownloadAttachment 
// } from '../../ideas/api/ideasApi';
// import { ROLES } from '../../../config/constants';
// import { ArrowLeft, Star, Shield, Download, User as UserIcon, FileText } from 'lucide-react';

// function CriteriaSlider({ label, val, setVal }) {
//   return (
//     <div className="space-y-1.5">
//       <div className="flex justify-between text-xs font-semibold">
//         <span className="text-slate-500">{label} Vectors</span>
//         <span className="font-mono text-amber-600 font-bold">{val} / 10</span>
//       </div>
//       <input type="range" min="1" max="10" step="1" className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg" value={val} onChange={e => setVal(parseInt(e.target.value))} />
//     </div>
//   );
// }

// export default function AdminIdeaDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
  
//   const { data: currentIdea, isLoading } = useIdeaDetails(id);
//   const { mutate: updateStatus, isPending: isSavingStatus } = useUpdatePipelineStatus();
//   const { mutate: submitScorecard, isPending: isSavingScore } = useSubmitScorecard();
//   const { mutate: downloadAttachment } = useDownloadAttachment();
  
//   const [matrix, setMatrix] = useState({ innovation: 5, feasibility: 5, market: 5, scalability: 5 });
//   const [notes, setNotes] = useState('');
// // This connects your sliders to the backend data
// useEffect(() => {
//   if (currentIdea && currentIdea.evaluations?.length > 0) {
//     const lastEval = currentIdea.evaluations[currentIdea.evaluations.length - 1];
//     setMatrix({
//       innovation: lastEval.innovation_score,
//       feasibility: lastEval.feasibility_score,
//       market: lastEval.market_score,
//       scalability: lastEval.scalability_score
//     });
//     setNotes(lastEval.comments || '');
//   }
// }, [currentIdea]); // This runs every time new data arrives from the server
//   if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" /></div>;
//   if (!currentIdea) return <div className="p-8 text-center text-sm">Target data row missing.</div>;

//   const calculatedMean = (matrix.innovation + matrix.feasibility + matrix.market + matrix.scalability) / 4;

//   const handleScoreSubmit = () => {
//     const payload = {
//       innovation_score: matrix.innovation,
//       feasibility_score: matrix.feasibility,
//       market_score: matrix.market,
//       scalability_score: matrix.scalability,
//       comments: notes.trim() || null
//     };
//     submitScorecard({ id: currentIdea.id, payload });
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
//       {/* LEFT COLUMN: Content */}
//       <div className="lg:col-span-2 space-y-5">
//         <button onClick={() => navigate('/admin')} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500"><ArrowLeft size={14}/> Back to Suite</button>
        
//         <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
         
//           <h1 className="text-xl font-black text-slate-900">{currentIdea.title}</h1>
          
//           <div className="space-y-4 pt-4 border-t">
//             {[
//               { label: 'Problem Statement', val: currentIdea.problem_statement },
//               { label: 'Proposed Solution', val: currentIdea.proposed_solution },
//               { label: 'Market Opportunity', val: currentIdea.market_opportunity },
//               { label: 'Competitive Advantage', val: currentIdea.competitive_advantage },
//               { label: 'Revenue Model', val: currentIdea.revenue_model },
//               { label: 'Scalability', val: currentIdea.scalability },
//               { label: 'Tech Requirements', val: currentIdea.tech_requirements }
//             ].map((section, idx) => (
//               <div key={idx}>
//                 <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-1">{section.label}</h4>
//                 <p className="text-sm text-slate-700 leading-relaxed">{section.val || 'Not provided'}</p>
//               </div>
//             ))}
//           </div>
//           {/* External Links Section */}
// <div className="pt-6 border-t mt-6 grid grid-cols-2 gap-4">
//   {[
//     { label: 'Figma', url: currentIdea.figma_link },
//     { label: 'GitHub', url: currentIdea.github_link },
//     { label: 'Drive', url: currentIdea.drive_link },
//     { label: 'Live Demo', url: currentIdea.demo_url }
//   ].map((link, idx) => (
//     <a 
//       key={idx}
//       href={link.url || '#'} 
//       target={link.url ? "_blank" : undefined}
//       rel="noreferrer"
//       className={`text-xs font-bold flex items-center gap-2 ${
//         link.url 
//           ? 'text-indigo-600 hover:text-indigo-800' 
//           : 'text-slate-300 pointer-events-none cursor-not-allowed'
//       }`}
//     >
//       <FileText size={14} />
//       {link.label}
//     </a>
//   ))}
// </div>
//         </div>
//       </div>

//       {/* RIGHT COLUMN: Admin Controls & Info */}
//       <div className="space-y-5">
        
//         {/* Submitter Profile */}
//         <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
//           <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5"><UserIcon size={14}/> Submitter</h3>
//           <div className="text-sm">
//             <p className="font-semibold text-slate-900">{currentIdea.submitter_name}</p>
//             <p className="text-slate-500">{currentIdea.submitter_email}</p>
//             <p className="text-slate-400 text-xs mt-1">Org: {currentIdea.submitter_organization || 'N/A'}</p>
//           </div>
//         </div>
        

//         {/* Admin Overrides */}
//         {user?.role === ROLES.ADMIN && (
//           <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
//             <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5"><Shield size={14}/> Overrides</h3>
//             <select className="form-select w-full" value={currentIdea.status} onChange={e => updateStatus({ id: currentIdea.id, status: e.target.value })} disabled={isSavingStatus}>
//               <option value="Submitted">Submitted</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Shortlisted">Shortlisted</option>
//               <option value="Selected">Selected</option>
//             </select>
//           </div>
//         )}

//         {/* Attachments */}
//      <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
//   <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
//     <FileText size={14}/> Attachments
//   </h3>
//   {currentIdea.attachments?.length > 0 ? (
//     currentIdea.attachments.map(file => (
//       <button 
//         key={file.id} 
//         // Track specifically if THIS file is the one currently downloading
//         onClick={() => downloadAttachment({ attachmentId: file.id, originalName: file.original_name })}
//         disabled={isSavingScore || isSavingStatus} // Optional: disable if other actions pending
//         className="w-full flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-left disabled:opacity-50"
//       >
//         <span className="text-xs truncate font-medium text-indigo-600">
//           {file.original_name}
//         </span>
//         {/* Visual feedback icon change */}
//         {/* If your hook exposes isPending, you can check it here */}
//         <Download size={12} className="text-slate-400 flex-shrink-0 animate-bounce-slow" />
//       </button>
//     ))
//   ) : <p className="text-xs text-slate-400">No documents attached.</p>}
// </div>

//         {/* Scorecard */}
//         <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-5">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5"><Star size={14}/> Scorecard</h3>
//             <span className="font-mono text-base font-black text-amber-600">{calculatedMean.toFixed(2)}</span>
//           </div>
//           <div className="space-y-4 border-t pt-4">
//             <CriteriaSlider label="Innovation" val={matrix.innovation} setVal={v => setMatrix({...matrix, innovation: v})} />
//             <CriteriaSlider label="Feasibility" val={matrix.feasibility} setVal={v => setMatrix({...matrix, feasibility: v})} />
//             <CriteriaSlider label="Market" val={matrix.market} setVal={v => setMatrix({...matrix, market: v})} />
//             <CriteriaSlider label="Scalability" val={matrix.scalability} setVal={v => setMatrix({...matrix, scalability: v})} />
//           </div>
//           <textarea rows={3} className="form-textarea w-full" placeholder="Feedback..." value={notes} onChange={e => setNotes(e.target.value)} />
//           <button onClick={handleScoreSubmit} disabled={isSavingScore} className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">
//             {isSavingScore ? 'Saving...' : 'Commit Scorecard'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  useIdeaDetails, 
  useUpdatePipelineStatus, 
  useSubmitScorecard, 
  useDownloadAttachment 
} from '../../ideas/api/ideasApi';
import { ROLES } from '../../../config/constants';
import { ArrowLeft, Star, Shield, Download, User as UserIcon, FileText } from 'lucide-react';

function CriteriaSlider({ label, val, setVal }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-slate-500">{label} Vectors</span>
        <span className="font-mono text-amber-600 font-bold">{val} / 10</span>
      </div>
      <input type="range" min="1" max="10" step="1" className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg" value={val} onChange={e => setVal(parseInt(e.target.value))} />
    </div>
  );
}

export default function AdminIdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const { data: currentIdea, isLoading } = useIdeaDetails(id);
  const { mutate: updateStatus, isPending: isSavingStatus } = useUpdatePipelineStatus();
  const { mutate: submitScorecard, isPending: isSavingScore } = useSubmitScorecard();
  const { mutate: downloadAttachment } = useDownloadAttachment();
  
  const [matrix, setMatrix] = useState({ innovation: 5, feasibility: 5, market: 5, scalability: 5 });
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (currentIdea && currentIdea.evaluations?.length > 0) {
      const lastEval = currentIdea.evaluations[currentIdea.evaluations.length - 1];
      setMatrix({
        innovation: lastEval.innovation_score,
        feasibility: lastEval.feasibility_score,
        market: lastEval.market_score,
        scalability: lastEval.scalability_score
      });
      setNotes(lastEval.comments || '');
    }
  }, [currentIdea]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" /></div>;
  if (!currentIdea) return <div className="p-8 text-center text-sm">Target data row missing.</div>;

  const calculatedMean = (matrix.innovation + matrix.feasibility + matrix.market + matrix.scalability) / 4;

  const handleScoreSubmit = () => {
    const payload = {
      innovation_score: matrix.innovation,
      feasibility_score: matrix.feasibility,
      market_score: matrix.market,
      scalability_score: matrix.scalability,
      comments: notes.trim() || null
    };
    submitScorecard({ id: currentIdea.id, payload });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* LEFT COLUMN: Content */}
      <div className="lg:col-span-2 space-y-5">
        <button onClick={() => navigate('/admin')} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500"><ArrowLeft size={14}/> Back to Suite</button>
        
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
          <h1 className="text-xl font-black text-slate-900">{currentIdea.title}</h1>
          
          <div className="space-y-4 pt-4 border-t">
            {[
              { label: 'Category', val: currentIdea.category },
              { label: 'Current Stage', val: currentIdea.current_stage },
              { label: 'Problem Statement', val: currentIdea.problem_statement },
              { label: 'Proposed Solution', val: currentIdea.proposed_solution },
              { label: 'Market Opportunity', val: currentIdea.market_opportunity },
              { label: 'Competitive Advantage', val: currentIdea.competitive_advantage },
              { label: 'Revenue Model', val: currentIdea.revenue_model },
              { label: 'Business Impact', val: currentIdea.business_impact },
              { label: 'Scalability', val: currentIdea.scalability },
              { label: 'Tech Requirements', val: currentIdea.tech_requirements }
            ].map((section, idx) => (
              <div key={idx}>
                <h4 className="text-[10px] uppercase font-bold text-slate-400 mb-1">{section.label}</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{section.val || 'Not provided'}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t mt-6 grid grid-cols-2 gap-4">
            {[
              { label: 'Figma', url: currentIdea.figma_link },
              { label: 'GitHub', url: currentIdea.github_link },
              { label: 'Drive', url: currentIdea.drive_link },
              { label: 'Live Demo', url: currentIdea.demo_url }
            ].map((link, idx) => (
              <a key={idx} href={link.url || '#'} target={link.url ? "_blank" : undefined} rel="noreferrer"
                className={`text-xs font-bold flex items-center gap-2 ${link.url ? 'text-indigo-600 hover:text-indigo-800' : 'text-slate-300 pointer-events-none cursor-not-allowed'}`}>
                <FileText size={14} /> {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Admin Controls & Info */}
      <div className="space-y-5">
        <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5"><UserIcon size={14}/> Submitter</h3>
          <div className="text-sm">
            <p className="font-semibold text-slate-900">{currentIdea.submitter_name}</p>
            <p className="text-slate-500">{currentIdea.submitter_email}</p>
            <p className="text-slate-400 text-xs mt-1">Org: {currentIdea.submitter_organization || 'N/A'}</p>
          </div>
        </div>
        
        {user?.role === ROLES.ADMIN && (
          <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5"><Shield size={14}/> Overrides</h3>
            <select className="form-select w-full" value={currentIdea.status} onChange={e => updateStatus({ id: currentIdea.id, status: e.target.value })} disabled={isSavingStatus}>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Selected">Selected</option>
            </select>
          </div>
        )}

        <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5"><FileText size={14}/> Attachments</h3>
          {currentIdea.attachments?.length > 0 ? currentIdea.attachments.map(file => (
            <button key={file.id} onClick={() => downloadAttachment({ attachmentId: file.id, originalName: file.original_name })} 
              disabled={isSavingScore || isSavingStatus} className="w-full flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-left disabled:opacity-50">
              <span className="text-xs truncate font-medium text-indigo-600">{file.original_name}</span>
              <Download size={12} className="text-slate-400 flex-shrink-0" />
            </button>
          )) : <p className="text-xs text-slate-400">No documents attached.</p>}
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5"><Star size={14}/> Scorecard</h3>
            <span className="font-mono text-base font-black text-amber-600">{calculatedMean.toFixed(2)}</span>
          </div>
          <div className="space-y-4 border-t pt-4">
            <CriteriaSlider label="Innovation" val={matrix.innovation} setVal={v => setMatrix({...matrix, innovation: v})} />
            <CriteriaSlider label="Feasibility" val={matrix.feasibility} setVal={v => setMatrix({...matrix, feasibility: v})} />
            <CriteriaSlider label="Market" val={matrix.market} setVal={v => setMatrix({...matrix, market: v})} />
            <CriteriaSlider label="Scalability" val={matrix.scalability} setVal={v => setMatrix({...matrix, scalability: v})} />
          </div>
          <textarea rows={3} className="form-textarea w-full text-sm border-slate-200 rounded-xl" placeholder="Feedback..." value={notes} onChange={e => setNotes(e.target.value)} />
          <button onClick={handleScoreSubmit} disabled={isSavingScore} className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">
            {isSavingScore ? 'Saving...' : 'Commit Scorecard'}
          </button>
        </div>
      </div>
    </div>
  );
}