import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800 shrink-0 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        &copy; {new Date().getFullYear()} PMRG Solution Ideathon Portal. All rights reserved.
      </div>
    </footer>
  );
}