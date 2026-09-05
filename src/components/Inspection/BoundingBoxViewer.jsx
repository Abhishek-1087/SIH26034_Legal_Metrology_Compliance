import React, { useState } from 'react';
import { Eye, CheckCircle2, AlertOctagon, Filter, ZoomIn, ZoomOut, Maximize2, ShieldAlert } from 'lucide-react';

export default function BoundingBoxViewer({ imageUrl, boundingBoxes = [], activeBoxId, setActiveBoxId }) {
  const [hoveredBox, setHoveredBox] = useState(null);
  const [filterMode, setFilterMode] = useState('ALL'); // ALL, FAILURES_ONLY, PASSES_ONLY

  const filteredBoxes = boundingBoxes.filter(b => {
    if (filterMode === 'FAILURES_ONLY') return b.compliant === false;
    if (filterMode === 'PASSES_ONLY') return b.compliant !== false;
    return true;
  });

  const selectedBox = boundingBoxes.find(b => b.id === (activeBoxId || hoveredBox));

  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-sm font-heading">Label Bounding Boxes</h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
          <button
            onClick={() => setFilterMode('ALL')}
            className={`px-2.5 py-1 rounded font-semibold transition-all ${
              filterMode === 'ALL' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({boundingBoxes.length})
          </button>

          <button
            onClick={() => setFilterMode('FAILURES_ONLY')}
            className={`px-2.5 py-1 rounded font-semibold transition-all ${
              filterMode === 'FAILURES_ONLY' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Offences ({boundingBoxes.filter(b => b.compliant === false).length})
          </button>
        </div>
      </div>

      {/* Canvas / Packaging Image Display Area */}
      <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center group shadow-inner">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt="Scanned Package Label"
              className="w-full h-full object-contain"
            />

            {/* Bounding Box Highlights */}
            {filteredBoxes.map((item) => {
              const isActive = activeBoxId === item.id || hoveredBox === item.id;
              const isCompliant = item.compliant !== false;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredBox(item.id)}
                  onMouseLeave={() => setHoveredBox(null)}
                  onClick={() => setActiveBoxId(item.id)}
                  style={{
                    left: `${item.box.x}%`,
                    top: `${item.box.y}%`,
                    width: `${item.box.width}%`,
                    height: `${item.box.height}%`
                  }}
                  className={`absolute border-2 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-between px-1.5 ${
                    isActive
                      ? isCompliant
                        ? 'border-emerald-400 bg-emerald-500/30 shadow-lg shadow-emerald-500/40 z-30 ring-2 ring-emerald-400 scale-[1.02]'
                        : 'border-rose-500 bg-rose-500/35 shadow-lg shadow-rose-500/50 z-30 ring-2 ring-rose-500 scale-[1.02] animate-pulse'
                      : isCompliant
                        ? 'border-emerald-500/70 bg-emerald-500/15 hover:border-emerald-400 hover:bg-emerald-500/25 z-10'
                        : 'border-rose-500/80 bg-rose-500/25 hover:border-rose-400 hover:bg-rose-500/35 z-10'
                  }`}
                >
                  <span className={`text-[10px] font-extrabold font-mono px-1 rounded shadow ${
                    isCompliant ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                  }`}>
                    #{item.id} {item.field}
                  </span>

                  {isCompliant ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-8 text-slate-500">
            <Eye className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-xs">No packaging image available</p>
          </div>
        )}
      </div>

      {/* Region List Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-2 my-1">
        {boundingBoxes.map(b => (
          <button
            key={b.id}
            onClick={() => setActiveBoxId(b.id)}
            className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border whitespace-nowrap transition-all ${
              activeBoxId === b.id
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                : b.compliant !== false
                  ? 'bg-slate-900 text-emerald-400 border-slate-800 hover:border-emerald-500/50'
                  : 'bg-slate-900 text-rose-400 border-slate-800 hover:border-rose-500/50'
            }`}
          >
            #{b.id} {b.field}
          </button>
        ))}
      </div>

      {/* Selected Box Text Preview */}
      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs min-h-[64px]">
        {selectedBox ? (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Region #{selectedBox.id}
                </span>
                {selectedBox.field}
              </span>
              <span className={selectedBox.compliant !== false ? 'text-emerald-400 font-bold font-mono' : 'text-rose-400 font-bold font-mono'}>
                {selectedBox.compliant !== false ? 'PASS 🟢' : 'OFFENCE 🔴'}
              </span>
            </div>
            <p className="text-slate-300 font-mono bg-slate-900 p-2 rounded border border-slate-800 line-clamp-2">
              "{selectedBox.label}"
            </p>
            {selectedBox.reason && (
              <p className="text-rose-400 text-[11px] mt-1 font-semibold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{selectedBox.reason}</span>
              </p>
            )}
          </div>
        ) : (
          <p className="text-slate-500 text-center italic py-2 text-xs">
            Hover or click any label bounding box above to inspect spatial OCR text details
          </p>
        )}
      </div>
    </div>
  );
}
