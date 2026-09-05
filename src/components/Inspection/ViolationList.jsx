import React from 'react';
import { AlertOctagon, AlertTriangle, Scale, ShieldAlert, BookOpen } from 'lucide-react';

export default function ViolationList({ violations = [], warnings = [], penaltyEstimate }) {
  return (
    <div className="glass-card p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <h3 className="font-semibold text-white text-base">Detected Offences & Statutory Penalties</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Legal Metrology Act, 2009 Enforcement
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Violations & Warnings Column (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          {violations.length === 0 && warnings.length === 0 ? (
            <div className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-center">
              <p className="text-emerald-400 font-semibold text-sm">
                No offences detected! Package strictly complies with Legal Metrology (Packaged Commodities) Rules, 2011.
              </p>
            </div>
          ) : (
            <>
              {/* Critical & Major Violations */}
              {violations.map((v, idx) => (
                <div key={idx} className="p-4 bg-rose-950/20 border border-rose-500/40 rounded-xl flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs font-mono text-rose-400 px-2 py-0.5 rounded bg-rose-950 border border-rose-800">
                        {v.ruleNo || "Offence"}
                      </span>
                      <h4 className="font-semibold text-sm text-white">{v.field}</h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                        {v.severity || "CRITICAL"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{v.message}</p>
                    {v.legalRef && (
                      <p className="text-[11px] text-slate-400 font-mono">
                        <strong>Statutory Penalty Clause:</strong> {v.legalRef}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Warnings */}
              {warnings.map((w, idx) => (
                <div key={idx} className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950 border border-amber-800">
                        {w.ruleNo || "Notice"}
                      </span>
                      <h4 className="font-semibold text-sm text-white">{w.field}</h4>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        MINOR WARNING
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{w.message}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Penalty Estimator Box (1 col) */}
        <div className="glass-card p-5 border-rose-500/20 bg-slate-900/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
              <Scale className="w-5 h-5 text-amber-400" />
              <h4 className="font-semibold text-white text-sm">Penalty Calculator (Sec 36)</h4>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">First Offence Penalty (Sec 36(1)):</span>
                <p className="font-bold text-rose-400 text-sm font-mono bg-slate-950 p-2.5 rounded border border-slate-800">
                  {penaltyEstimate?.firstOffence || "Up to ₹ 25,000 per violation"}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Second & Subsequent Offence (Sec 36(2)):</span>
                <p className="font-bold text-rose-400 text-sm font-mono bg-slate-950 p-2.5 rounded border border-slate-800">
                  {penaltyEstimate?.secondOffence || "Up to ₹ 50,000 or Imprisonment"}
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Legal Provision:
                </p>
                <p>Non-compliance with declaration rules under Legal Metrology Act, 2009 is a punishable offence compounded under Section 48.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-center">
            Ministry of Consumer Affairs, Food & Public Distribution Guidelines
          </div>
        </div>

      </div>
    </div>
  );
}
