import React from 'react';

const steps = ["Terms", "Idea Details", "Documents", "Review"];

export default function Stepper({ currentStep }) {
  return (
    <div className="w-full py-10 px-4">
      <div className="relative flex justify-between items-center max-w-2xl mx-auto">
        {/* Background Track */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-[#1F2A44]" />
        
        {/* Animated Progress Fill */}
        <div 
          className="absolute top-5 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-700 ease-in-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={step} className="relative flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 ease-in-out
                  ${isActive 
                    ? "bg-[#070A12] border-cyan-400 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.4)]" 
                    : isCompleted 
                      ? "bg-[#070A12] border-violet-500" 
                      : "bg-[#0E1424] border-[#1F2A44]"
                  }
                `}
              >
                {isCompleted ? (
                  <span className="text-violet-400 font-bold">✓</span>
                ) : (
                  <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? "text-cyan-400" : "text-slate-600"}`}>
                    {stepNumber}
                  </span>
                )}
              </div>

              {/* Label */}
              <span 
                className={`absolute top-14 text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300
                  ${isActive ? "text-white" : "text-slate-500"}
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}