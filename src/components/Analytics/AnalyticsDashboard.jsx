import React, { useState } from 'react';
import { BarChart3, TrendingDown, PieChart, ShieldAlert, Award, AlertOctagon, Calculator, Sparkles, Scale } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [unitCount, setUnitCount] = useState(250);

  const topViolations = [
    { rule: "Rule 6(1)(c) - Net Quantity Unit", count: 42, percentage: 38, detail: "Illegal non-standard units ('gms', 'ltrs', 'pcs')" },
    { rule: "Rule 6(1)(e) - MRP Tax Clause", count: 35, percentage: 31, detail: "Missing mandatory '(incl. of all taxes)' clause" },
    { rule: "Rule 6(1)(f) - Consumer Care Email", count: 28, percentage: 25, detail: "Missing official customer care email address" },
    { rule: "Rule 6(1)(g) - Country of Origin", count: 19, percentage: 17, detail: "Missing origin country on imported/packaged goods" },
    { rule: "Rule 6(11) - Unit Sale Price", count: 14, percentage: 12, detail: "Missing unit rate per gram/ml declaration" },
  ];

  const categoryRisk = [
    { category: "Cosmetics & Personal Care", nonComplianceRate: "54%", risk: "HIGH", color: "text-rose-400 border-rose-500/30 bg-rose-950/20" },
    { category: "Snack Foods & Confectionery", nonComplianceRate: "42%", risk: "HIGH", color: "text-rose-400 border-rose-500/30 bg-rose-950/20" },
    { category: "Beverages & Dairy", nonComplianceRate: "28%", risk: "MEDIUM", color: "text-amber-400 border-amber-500/30 bg-amber-950/20" },
    { category: "Consumer Electronics", nonComplianceRate: "12%", risk: "LOW", color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20" },
  ];

  // Fine compounding estimation
  const firstOffenceEstimate = Math.min(25000 * unitCount, 5000000);
  const secondOffenceEstimate = Math.min(50000 * unitCount, 10000000);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white font-heading">Inspector Enforcement Analytics</h2>
        </div>
        <p className="text-xs text-slate-400">
          Macro compliance metrics, category breach rates, and cumulative penalty estimators under Legal Metrology (Packaged Commodities) Rules, 2011.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Most Frequent Violations Bar Chart */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2 font-heading">
              <PieChart className="w-5 h-5 text-indigo-400" /> Most Frequent Rule Violations
            </h3>
            <span className="text-xs text-slate-400 font-mono">Last 30 Days</span>
          </div>

          <div className="space-y-4">
            {topViolations.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200">{item.rule}</span>
                  <span className="text-cyan-400 font-mono">{item.percentage}% ({item.count} cases)</span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-rose-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 italic block">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commodity Category Risk Heatmap */}
        <div className="glass-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2 font-heading">
                <ShieldAlert className="w-5 h-5 text-rose-400" /> Category Risk Heatmap
              </h3>
              <span className="text-xs text-slate-400 font-mono">Sector Benchmark</span>
            </div>

            <div className="space-y-3">
              {categoryRisk.map((cat, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between ${cat.color}`}>
                  <div>
                    <h4 className="font-bold text-xs text-white">{cat.category}</h4>
                    <span className="text-[11px] text-slate-300 font-mono">Non-Compliance Offence Rate: {cat.nonComplianceRate}</span>
                  </div>
                  <span className="text-xs font-extrabold font-mono px-3 py-1 rounded-md bg-slate-950 border border-slate-800">
                    {cat.risk} RISK
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-950 rounded-2xl border border-indigo-500/30 text-xs text-slate-300 shadow-inner">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Key Enforcement Finding:
            </span>
            Over 38% of non-compliant packaged commodities violate Rule 6(1)(c) by using obsolete units like <code className="text-cyan-300 font-mono">gms</code> instead of mandatory metric symbol <code className="text-cyan-300 font-mono">g</code>.
          </div>
        </div>

      </div>

      {/* Interactive Offence Fine Compounding Calculator */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-base font-heading">Cumulative Batch Offence Fine Estimator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Estimated Non-Compliant Batch Units: <span className="font-mono text-cyan-400 text-sm font-bold">{unitCount} Units</span>
            </label>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={unitCount}
              onChange={(e) => setSearchTerm ? setUnitCount(Number(e.target.value)) : null}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-slate-500">Adjust slider to simulate market seizure quantity</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Sec 36(1) First Offence Estimate</span>
            <span className="text-xl font-extrabold font-mono text-rose-400">
              ₹ {firstOffenceEstimate.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">Up to ₹ 25,000 per violation</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Sec 36(2) Repeat Offence Estimate</span>
            <span className="text-xl font-extrabold font-mono text-rose-400">
              ₹ {secondOffenceEstimate.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-rose-400 block mt-1">+ Mandatory Imprisonment Up to 1 Year</span>
          </div>
        </div>
      </div>

    </div>
  );
}
