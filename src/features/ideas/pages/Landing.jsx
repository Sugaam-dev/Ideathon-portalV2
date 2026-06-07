import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

export default function Landing() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full blur-[128px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-600 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-indigo-300 text-xs font-medium uppercase tracking-widest mb-8">
            <Sparkles size={14} />
            Now Accepting Technical Submissions
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            PMRG Solution <br />
            <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Ideathon Challenge 2026
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Transform your engineering concepts into high-scale products. Bridge the gap between prototype and industrial-grade deployment.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {user ? (
              <Link to={user.role === 'ADMIN' || user.role === 'JURY' ? '/admin' : '/dashboard'} className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                Enter Dashboard <ArrowRight size={18}/>
              </Link>
            ) : (
              <>
                <Link to="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={18}/>
                </Link>
                <Link to="/login" className="px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-2xl font-semibold hover:bg-slate-700 transition-colors">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Program Information Grid */}
      <section className="py-20 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Scaled Execution Path</h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { n: '01', label: 'Identity Registration', desc: 'Secure your profile and link departmental credentials.' },
              { n: '02', label: 'Blueprint Submittal', desc: 'Upload functional architecture and core technical data.' },
              { n: '03', label: 'Jury Evaluation', desc: 'Quantitative assessment by industry-leading committees.' },
              { n: '04', label: 'Shortlisting Notice', desc: 'Fast-tracked entry into virtual incubation rounds.' },
              { n: '05', label: 'Internal Incubation', desc: 'Gain direct access to funding and engineering resources.' },
              { n: '06', label: 'Commercial Launch', desc: 'Deploy your solution across enterprise-scale environments.' }
            ].map((s, i) => (
              <div key={i} className="group p-8 bg-slate-950 border border-slate-800 rounded-3xl hover:border-indigo-500/50 transition-colors">
                <div className="text-slate-700 group-hover:text-indigo-500 font-mono text-3xl font-bold mb-4">{s.n}</div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">{s.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}