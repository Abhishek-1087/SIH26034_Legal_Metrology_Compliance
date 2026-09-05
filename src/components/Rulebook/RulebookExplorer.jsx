import React, { useState } from 'react';
import { BookOpen, Search, Scale, FileText, Check, AlertOctagon, HelpCircle } from 'lucide-react';
import { LEGAL_METROLOGY_RULES } from '../../engine/sampleData';

export default function RulebookExplorer() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRules = LEGAL_METROLOGY_RULES.filter(r =>
    r.ruleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fontRules = [
    { area: "Up to 50 cm²", minHeight: "1.0 mm", minHeightVolume: "1.5 mm" },
    { area: "50 cm² to 100 cm²", minHeight: "1.5 mm", minHeightVolume: "2.0 mm" },
    { area: "100 cm² to 500 cm²", minHeight: "2.5 mm", minHeightVolume: "3.0 mm" },
    { area: "500 cm² to 2500 cm²", minHeight: "4.0 mm", minHeightVolume: "4.0 mm" },
    { area: "Above 2500 cm²", minHeight: "6.0 mm", minHeightVolume: "6.0 mm" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white font-heading">Legal Metrology Rules, 2011 Knowledge Base</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official statutory declarations guidelines, penalty structures, and font size height specifications.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Rule 6(1), MRP, Units..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule, idx) => (
          <div key={idx} className="glass-card p-5 border-slate-800 hover:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                  {rule.ruleNo}
                </span>
                <span className="badge badge-warn text-[10px]">MANDATORY CLAUSE</span>
              </div>

              <h3 className="font-semibold text-sm text-white mb-2">{rule.title}</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{rule.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-mono text-rose-400">
                <strong>Statutory Offence Section:</strong> {rule.penaltySection}
              </p>
              <div className="flex justify-between text-slate-300 font-semibold pt-1">
                <span>1st Offence: {rule.fineFirstOffence}</span>
                <span>2nd Offence: {rule.fineSecondOffence}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Font Height Specifications Table (Rule 7 & 8) */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-white text-base mb-2 flex items-center gap-2">
          <Scale className="w-5 h-5 text-amber-400" /> Minimum Height of Declarations & Numeral Font Rules (Rule 7)
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Statutory minimum height of numerals for Net Quantity declaration based on principal display panel area.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono uppercase">
                <th className="p-3">Area of Principal Display Panel (A)</th>
                <th className="p-3">Min Height of Numeral (Normal)</th>
                <th className="p-3">Min Height when Blown / Molded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {fontRules.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-white">{row.area}</td>
                  <td className="p-3 text-cyan-400">{row.minHeight}</td>
                  <td className="p-3 text-emerald-400">{row.minHeightVolume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
