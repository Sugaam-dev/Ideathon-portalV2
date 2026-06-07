import React from 'react';
import IdeaBasicInfo from "./IdeaBasicInfo";
import IdeaProblemSolution from "./IdeaProblemSolution";
import IdeaBusinessDetails from "./IdeaBusinessDetails";
import IdeaTechnicalDetails from "./IdeaTechnicalDetails";

export default function IdeaInformation({ formData, handleChange }) {
  // We use the 'columns' class for a masonry layout where each card 
  // takes only the height it needs, effectively closing the gaps.
  return (
    <div className="w-full  mx-auto px-2  py-8">
      <div className="columns-1 md:columns-2 gap-6 space-y-6">
        
        {/* Each item is a break-inside-avoid element to prevent cutting cards */}
        <div className="break-inside-avoid bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-2 md:p-8 shadow-xl">
          <IdeaBasicInfo formData={formData} handleChange={handleChange} />
        </div>

        <div className="break-inside-avoid bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-2 md:p-8 shadow-xl">
          <IdeaProblemSolution formData={formData} handleChange={handleChange} />
        </div>

        <div className="break-inside-avoid bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-2 md:p-8 shadow-xl">
          <IdeaBusinessDetails formData={formData} handleChange={handleChange} />
        </div>

        <div className="break-inside-avoid bg-[#0E1424] border border-[#1F2A44] rounded-2xl p-2 md:p-8 shadow-xl">
          <IdeaTechnicalDetails formData={formData} handleChange={handleChange} />
        </div>

      </div>
    </div>
  );
}