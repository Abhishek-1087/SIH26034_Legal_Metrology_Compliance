import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Scale, ArrowRight, KeyRound, Sparkles } from 'lucide-react';
import { loginUser, registerUser } from '../../engine/authService';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState('Consumer'); // 'Consumer' or 'Official'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (isSignup) {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }
      const res = registerUser(fullName, email, password, role);
      if (res.success) {
        onAuthSuccess(res.user);
        onClose();
      }
    } else {
      const res = loginUser(email, password, role);
      if (res.success) {
        onAuthSuccess(res.user);
        onClose();
      }
    }
  };

  const handleQuickLogin = (demoRole) => {
    if (demoRole === 'Official') {
      const res = loginUser("inspector@metrology.gov.in", "admin123", "Official");
      onAuthSuccess(res.user);
    } else {
      const res = loginUser("consumer@gmail.com", "user123", "Consumer");
      onAuthSuccess(res.user);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          
          {/* LM Logo Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 mb-3">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center border border-slate-800">
                <span className="font-extrabold font-mono text-cyan-400 text-lg border-2 border-cyan-400 rounded-full w-9 h-9 flex items-center justify-center">
                  LM
                </span>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-white tracking-tight font-heading">
              Compliance Checker
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Legal Metrology (Packaged Commodities) Rules, 2011
            </p>
          </div>

          {/* Segmented Role Selector */}
          <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 grid grid-cols-2 gap-1 mb-6">
            <button
              type="button"
              onClick={() => setRole('Consumer')}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                role === 'Consumer'
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Consumer
            </button>
            <button
              type="button"
              onClick={() => setRole('Official')}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                role === 'Official'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Official Inspector
            </button>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isSignup && (
              <div>
                <label className="block text-[11px] font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  FULL NAME
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                EMAIL
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'Official' ? "inspector@metrology.gov.in" : "consumer@gmail.com"}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-medium text-center bg-rose-950/30 p-2 rounded-lg border border-rose-500/30">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110 transition-all mt-2"
            >
              {isSignup ? 'Create Account' : 'Log in'}
            </button>

          </form>

          {/* Mode Switcher */}
          <div className="text-center mt-5 pt-4 border-t border-slate-800/60">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-xs text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {isSignup ? (
                <>Already have an account? <span className="text-cyan-400 font-semibold underline underline-offset-4">Log in</span></>
              ) : (
                <>Need an account? <span className="text-cyan-400 font-semibold underline underline-offset-4">Sign up</span></>
              )}
            </button>
          </div>

          {/* Quick Preset Buttons for Evaluators */}
          <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Quick Test Credentials:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('Official')}
                className="text-indigo-400 hover:text-indigo-300 font-mono font-semibold"
              >
                [Inspector]
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Consumer')}
                className="text-cyan-400 hover:text-cyan-300 font-mono font-semibold"
              >
                [Consumer]
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
