import React from 'react';
import { ShieldCheck, ScanLine, Layers, BarChart3, BookOpen, Activity, Sparkles, Scale } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'scanner', label: 'Packaging Scanner', icon: ScanLine, count: 'Live OCR' },
    { id: 'batch', label: 'Batch Inspector', icon: Layers, count: 'Bulk' },
    { id: 'analytics', label: 'Audit Analytics', icon: BarChart3, count: 'Insights' },
    { id: 'rulebook', label: 'Rules & Penalties', icon: BookOpen, count: 'Sec 36' },
  ];

  return (
    <header className="glass-nav px-4 sm:px-8 py-3.5 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-11 h-11 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
              <Scale className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white font-heading">
                LM-CompliScan <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">AI 2.0</span>
              </h1>
              <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                SIH 26034
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>Legal Metrology (Packaged Commodities) Rules, 2011</span>
              <span className="inline-block w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Engine
              </span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-slate-950/40 text-cyan-200' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Ministry Badge */}
        <div className="hidden xl:flex items-center gap-3 pl-4 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs">
            🇮🇳
          </div>
          <div className="text-left">
            <span className="text-[11px] font-bold text-slate-300 block leading-tight">Ministry of Consumer Affairs</span>
            <span className="text-[10px] text-cyan-400 font-mono block">Govt. of India Compliance Portal</span>
          </div>
        </div>

      </div>
    </header>
  );
}
