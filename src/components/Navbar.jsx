import React from 'react';
import { ShieldCheck, ScanLine, Layers, BarChart3, BookOpen, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'scanner', label: 'Packaging Scanner', icon: ScanLine },
    { id: 'batch', label: 'Batch Inspector', icon: Layers },
    { id: 'analytics', label: 'Audit Analytics', icon: BarChart3 },
    { id: 'rulebook', label: 'Rulebook & Penalties', icon: BookOpen },
  ];

  return (
    <header className="glass-nav px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-heading">
                LM-CompliScan <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">AI 2.0</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SIH 26034
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Legal Metrology (Packaged Commodities) Rules, 2011 Compliance System
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/25 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Ministry Badge */}
        <div className="hidden lg:flex items-center gap-2 text-right">
          <div className="text-right">
            <span className="text-[11px] font-medium text-slate-400 block">Ministry of Consumer Affairs</span>
            <span className="text-[10px] text-cyan-400 font-mono block">Govt. of India Compliance Engine</span>
          </div>
        </div>

      </div>
    </header>
  );
}
