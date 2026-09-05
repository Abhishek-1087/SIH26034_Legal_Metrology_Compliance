import React from 'react';
import { BENCHMARK_SAMPLES } from '../../engine/sampleData';
import { Sparkles, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export default function SampleSelector({ selectedSampleId, onSelectSample }) {
  return (
    <div className="glass-card p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-semibold text-white">Benchmark Packaging Samples</h3>
        </div>
        <span className="text-xs text-slate-400">Click to instantly test predefined packaging labels</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BENCHMARK_SAMPLES.map((sample) => {
          const isSelected = selectedSampleId === sample.id;
          const isCompliant = sample.status === "COMPLIANT";
          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`cursor-pointer rounded-xl p-3 border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="relative h-28 w-full rounded-lg overflow-hidden mb-3 bg-slate-950">
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {isCompliant ? (
                      <span className="badge badge-pass flex items-center gap-1 shadow">
                        <CheckCircle2 className="w-3 h-3" /> COMPLIANT
                      </span>
                    ) : (
                      <span className="badge badge-fail flex items-center gap-1 shadow">
                        <AlertCircle className="w-3 h-3" /> {sample.violationsCount} VIOLATIONS
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="font-semibold text-sm text-slate-100 line-clamp-1">{sample.name}</h4>
                <p className="text-xs text-slate-400 mb-2">{sample.brand} • {sample.category}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-400">Compliance Score</span>
                <span className={`font-bold font-mono ${isCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
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
