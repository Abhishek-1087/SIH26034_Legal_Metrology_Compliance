import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertOctagon, FileCheck2, Info, Copy, Edit3, Check } from 'lucide-react';

export default function DeclarationGrid({ declarations = {} }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, idx) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const items = [
    {
      rule: "Rule 6(1)(a)",
      name: "Manufacturer / Importer",
      data: declarations.manufacturer,
      hint: "Must include complete Name & Address with Pincode"
    },
    {
      rule: "Rule 6(1)(b)",
      name: "Commodity Generic Name",
      data: declarations.commodity,
      hint: "Common or generic name of package contents"
    },
    {
      rule: "Rule 6(1)(c)",
      name: "Net Quantity",
      data: declarations.netQuantity,
      hint: "Standard metric units only (g, kg, ml, L, N). 'gms' is illegal!"
    },
    {
      rule: "Rule 6(1)(d)",
      name: "Month & Year of Mfg/Packing",
      data: declarations.mfgDate,
      hint: "Date format MM/YYYY or Month YYYY"
    },
    {
      rule: "Rule 6(1)(e)",
      name: "MRP & Tax Clause",
      data: declarations.mrp,
      hint: "Must declare ₹ / Rs and '(incl. of all taxes)'"
    },
    {
      rule: "Rule 6(1)(f)",
      name: "Consumer Care Details",
      data: declarations.consumerCare,
      hint: "Designation, Address, Phone & mandatory E-mail ID"
    },
    {
      rule: "Rule 6(1)(g)",
      name: "Country of Origin",
      data: declarations.countryOfOrigin,
      hint: "Mandatory declaration of manufacturing origin country"
    },
    {
      rule: "Rule 6(11)",
      name: "Unit Sale Price (USP)",
      data: declarations.unitSalePrice,
      hint: "Price per unit / gram / ml for price comparison"
    }
  ];

  return (
    <div className="glass-card p-5 mb-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-base font-heading">Mandatory Declarations Audit Grid</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
          Rule 6(1) Enforced
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const d = item.data || { found: false, text: null };
          const isPass = d.found && (d.isValidUnit !== false) && (d.taxClauseFound !== false) && (d.emailFound !== false);

          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isPass
                  ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
                  : d.found
                    ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50'
                    : 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800">
                    {item.rule}
                  </span>
                  {isPass ? (
                    <span className="badge badge-pass text-[10px] py-0.5 px-2">
                      <CheckCircle2 className="w-3 h-3" /> PASS
                    </span>
                  ) : (
                    <span className="badge badge-fail text-[10px] py-0.5 px-2">
                      <XCircle className="w-3 h-3" /> FAIL
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-xs text-white mb-1.5">{item.name}</h4>

                <div className="relative group mb-2">
                  <p className="text-xs font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-200 line-clamp-2 min-h-[42px] pr-7">
                    {d.text ? d.text : <span className="text-rose-400 italic">[NOT DETECTED]</span>}
                  </p>

                  {d.text && (
                    <button
                      onClick={() => handleCopy(d.text, idx)}
                      className="absolute right-2 top-2 p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Copy extracted text"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="line-clamp-1">{item.hint}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
