import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, FileCheck2, Info } from 'lucide-react';

export default function DeclarationGrid({ declarations = {} }) {
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
      <div className="flex items-center gap-2 mb-4">
        <FileCheck2 className="w-5 h-5 text-indigo-400" />
        <h3 className="font-semibold text-white text-base">Mandatory Declarations Compliance Matrix</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.map((item, idx) => {
          const d = item.data || { found: false, text: null };
          const isPass = d.found && (d.isValidUnit !== false) && (d.taxClauseFound !== false) && (d.emailFound !== false);

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                isPass
                  ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
                  : d.found
                    ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50'
                    : 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-slate-900 text-indigo-300 border border-slate-800">
                  {item.rule}
                </span>
                {isPass ? (
                  <span className="badge badge-pass text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> PASS
                  </span>
                ) : (
                  <span className="badge badge-fail text-[10px]">
                    <XCircle className="w-3 h-3" /> FAIL
                  </span>
                )}
              </div>

              <h4 className="font-semibold text-xs text-white mb-1">{item.name}</h4>

              <p className="text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800 text-slate-300 line-clamp-2 min-h-[38px] mb-2">
                {d.text ? d.text : <span className="text-rose-400 italic">[NOT DETECTED]</span>}
              </p>

              <div className="flex items-center gap-1 text-[11px] text-slate-400">
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
