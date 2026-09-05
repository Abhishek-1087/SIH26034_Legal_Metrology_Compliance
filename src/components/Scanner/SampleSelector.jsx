import React, { useState } from 'react';
import { BENCHMARK_SAMPLES } from '../../engine/sampleData';
import { Sparkles, CheckCircle2, AlertOctagon, Filter, ChevronRight, Zap } from 'lucide-react';

export default function SampleSelector({ selectedSampleId, onSelectSample }) {
  const [filterCategory, setFilterCategory] = useState('ALL');

  const categories = ['ALL', 'Snack Foods', 'Beverages', 'Personal Care / Cosmetics', 'Electronics'];

  const filteredSamples = BENCHMARK_SAMPLES.filter(s =>
    filterCategory === 'ALL' || s.category === filterCategory
  );

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Benchmark Commodity Test Suite</h3>
            <p className="text-xs text-slate-400">One-click test predefined packaging labels for legal metrology offences</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'All Samples' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSamples.map((sample) => {
          const isSelected = selectedSampleId === sample.id;
          const isCompliant = sample.status === "COMPLIANT";

          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`group cursor-pointer rounded-2xl p-3.5 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-400/80 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/50'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div>
                <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-slate-950">
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute top-2 right-2">
                    {isCompliant ? (
                      <span className="badge badge-pass text-[10px] py-1 px-2.5 shadow-md">
                        <CheckCircle2 className="w-3 h-3" /> COMPLIANT
                      </span>
                    ) : (
                      <span className="badge badge-fail text-[10px] py-1 px-2.5 shadow-md">
                        <AlertOctagon className="w-3 h-3" /> {sample.violationsCount} OFFENCE(S)
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="font-bold text-sm text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                  {sample.name}
                </h4>
                <p className="text-xs text-slate-400 mb-3">{sample.brand} • <span className="font-mono text-slate-500">{sample.category}</span></p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-800/80">
                <span className="text-slate-400 font-medium">Compliance Rating</span>
                <span className={`font-extrabold font-mono text-sm ${isCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {sample.score}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
