import React from 'react';
import { ShieldCheck, ScanLine, Layers, BarChart3, BookOpen, Sun, Moon, LogOut, User, Scale, Lock } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, onOpenAuth, onLogout, theme, onToggleTheme }) {
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
          <div className="relative group cursor-pointer" onClick={() => setActiveTab('scanner')}>
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
              </button>
            );
          })}
        </nav>

        {/* User Account, Theme Toggle & Logout */}
        <div className="flex items-center gap-3">
          
          {/* Day / Night Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors shadow-sm"
            title={theme === 'dark' ? "Switch to Day Mode (Light Theme)" : "Switch to Night Mode (Dark Theme)"}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Account Profile / Logout */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 pr-3 rounded-2xl border border-slate-800">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white block leading-tight line-clamp-1">{currentUser.name}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  currentUser.role === 'Official' ? 'bg-indigo-950 text-indigo-300' : 'bg-cyan-950 text-cyan-300'
                }`}>
                  {currentUser.role === 'Official' ? 'Official Inspector' : 'Consumer'}
                </span>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors ml-1"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <User className="w-4 h-4" /> Log In / Sign Up
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
