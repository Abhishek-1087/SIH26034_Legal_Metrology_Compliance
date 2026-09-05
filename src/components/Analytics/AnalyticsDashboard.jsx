import React from 'react';
import { BarChart3, TrendingDown, PieChart, ShieldAlert, Award, AlertOctagon } from 'lucide-react';

export default function AnalyticsDashboard() {
  const topViolations = [
    { rule: "Rule 6(1)(c) - Net Quantity Unit", count: 42, percentage: 38, detail: "Illegal non-standard units ('gms', 'ltrs', 'pcs')" },
    { rule: "Rule 6(1)(e) - MRP Tax Clause", count: 35, percentage: 31, detail: "Missing mandatory '(incl. of all taxes)' clause" },
    { rule: "Rule 6(1)(f) - Consumer Care Email", count: 28, percentage: 25, detail: "Missing official customer care email address" },
    { rule: "Rule 6(1)(g) - Country of Origin", count: 19, percentage: 17, detail: "Missing origin country on imported/packaged goods" },
    { rule: "Rule 6(11) - Unit Sale Price", count: 14, percentage: 12, detail: "Missing unit rate per gram/ml declaration" },
  ];

  const categoryRisk = [
    { category: "Cosmetics & Personal Care", nonComplianceRate: "54%", risk: "HIGH", color: "text-rose-400" },
    { category: "Snack Foods & Confectionery", nonComplianceRate: "42%", risk: "HIGH", color: "text-rose-400" },
    { category: "Beverages & Dairy", nonComplianceRate: "28%", risk: "MEDIUM", color: "text-amber-400" },
    { category: "Consumer Electronics", nonComplianceRate: "12%", risk: "LOW", color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white font-heading">Inspector Enforcement Analytics</h2>
        </div>
        <p className="text-xs text-slate-400">
          Macro compliance statistics and common violation trends under Legal Metrology (Packaged Commodities) Rules, 2011.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Most Frequent Violations Bar Chart */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white text-base flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-400" /> Most Frequent Rule Violations
            </h3>
            <span className="text-xs text-slate-400 font-mono">Last 30 Days</span>
          </div>

          <div className="space-y-4">
            {topViolations.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{item.rule}</span>
                  <span className="text-cyan-400 font-mono">{item.percentage}% ({item.count} cases)</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-rose-500 h-full rounded-full transition-all duration-500"
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" /> Non-Compliance Risk by Category
              </h3>
              <span className="text-xs text-slate-400 font-mono">Sector Benchmark</span>
            </div>

            <div className="space-y-3">
              {categoryRisk.map((cat, idx) => (
                <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-xs text-white">{cat.category}</h4>
                    <span className="text-[10px] text-slate-400">Non-Compliance Offence Rate: {cat.nonComplianceRate}</span>
                  </div>
                  <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 ${cat.color}`}>
                    {cat.risk} RISK
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 bg-slate-950 rounded-xl border border-indigo-500/20 text-xs text-slate-300">
            <span className="font-bold text-indigo-300 block mb-1">Key Enforcement Finding:</span>
            Over 38% of non-compliant packaged commodities violate Rule 6(1)(c) by using obsolete units like <code className="text-cyan-300 font-mono">gms</code> instead of metric symbol <code className="text-cyan-300 font-mono">g</code>.
          </div>
        </div>

      </div>
    </div>
  );
}
