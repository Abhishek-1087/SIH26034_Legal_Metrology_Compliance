import React, { useState } from 'react';
import { BookOpen, Search, Scale, FileText, Check, AlertOctagon, HelpCircle, Calculator } from 'lucide-react';
import { LEGAL_METROLOGY_RULES } from '../../engine/sampleData';

export default function RulebookExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pdpArea, setPdpArea] = useState(150);

  const filteredRules = LEGAL_METROLOGY_RULES.filter(r =>
    r.ruleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fontRules = [
    { area: "Up to 50 cm²", minHeight: "1.0 mm", minHeightVolume: "1.5 mm", maxArea: 50 },
    { area: "50 cm² to 100 cm²", minHeight: "1.5 mm", minHeightVolume: "2.0 mm", maxArea: 100 },
    { area: "100 cm² to 500 cm²", minHeight: "2.5 mm", minHeightVolume: "3.0 mm", maxArea: 500 },
    { area: "500 cm² to 2500 cm²", minHeight: "4.0 mm", minHeightVolume: "4.0 mm", maxArea: 2500 },
    { area: "Above 2500 cm²", minHeight: "6.0 mm", minHeightVolume: "6.0 mm", maxArea: 99999 },
  ];

  const currentFontRule = fontRules.find(r => pdpArea <= r.maxArea) || fontRules[fontRules.length - 1];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-heading">Legal Metrology Rules, 2011 Knowledge Base</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Official statutory declarations handbook, font size rules, and Legal Metrology Act 2009 penalty sections.
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Rule 6(1), MRP, Units, Penalty..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule, idx) => (
          <div key={idx} className="glass-card p-5 border-slate-800 hover:border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-bold text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-800">
                  {rule.ruleNo}
                </span>
                <span className="badge badge-warn text-[10px]">MANDATORY CLAUSE</span>
              </div>

              <h3 className="font-bold text-sm text-white mb-2 font-heading">{rule.title}</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{rule.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-mono text-rose-400">
                <strong>Statutory Offence Section:</strong> {rule.penaltySection}
              </p>
              <div className="flex justify-between text-slate-300 font-semibold pt-1 font-mono">
                <span>1st Offence: {rule.fineFirstOffence}</span>
                <span>2nd Offence: {rule.fineSecondOffence}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Rule 7 Font Size Calculator */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-base font-heading">Interactive Numeral Font Height Calculator (Rule 7)</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Principal Display Panel Area (A): <span className="font-mono text-cyan-400 font-bold">{pdpArea} cm²</span>
            </label>
            <input
              type="number"
              min="10"
              max="5000"
              value={pdpArea}
              onChange={(e) => setPdpArea(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
            />
            <span className="text-[10px] text-slate-500">Width × Height of principal label area in cm²</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Standard Min Height of Numeral</span>
            <span className="text-2xl font-extrabold font-mono text-cyan-400">
              {currentFontRule.minHeight}
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">For normal printed labels</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold block mb-1">Min Height for Blown/Molded Labels</span>
            <span className="text-2xl font-extrabold font-mono text-emerald-400">
              {currentFontRule.minHeightVolume}
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">For glass/plastic bottles & metal containers</span>
          </div>
        </div>
      </div>

    </div>
  );
}
