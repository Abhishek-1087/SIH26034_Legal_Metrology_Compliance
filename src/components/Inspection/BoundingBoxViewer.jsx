import React, { useState } from 'react';
import { Eye, CheckCircle2, AlertCircle, Sparkles, ZoomIn } from 'lucide-react';

export default function BoundingBoxViewer({ imageUrl, boundingBoxes = [], activeBoxId, setActiveBoxId }) {
  const [hoveredBox, setHoveredBox] = useState(null);

  const selectedBox = boundingBoxes.find(b => b.id === (activeBoxId || hoveredBox));

  return (
    <div className="glass-card p-5 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-white text-base">Interactive Label Bounding Boxes</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {boundingBoxes.length} Regions Detected
        </span>
      </div>

      {/* Canvas / Image Wrapper with Bounding Boxes */}
      <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt="Scanned Packaging Label"
              className="w-full h-full object-contain"
            />

            {/* Bounding Boxes Overlay */}
            {boundingBoxes.map((item) => {
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
                  className={`absolute border-2 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-between px-1 ${
                    isActive
                      ? isCompliant
                        ? 'border-emerald-400 bg-emerald-500/25 shadow-lg shadow-emerald-500/30 z-20 ring-2 ring-emerald-400'
                        : 'border-rose-500 bg-rose-500/30 shadow-lg shadow-rose-500/40 z-20 ring-2 ring-rose-500 animate-pulse'
                      : isCompliant
                        ? 'border-emerald-500/60 bg-emerald-500/10 hover:border-emerald-400 hover:bg-emerald-500/20'
                        : 'border-rose-500/80 bg-rose-500/20 hover:border-rose-400 hover:bg-rose-500/30'
                  }`}
                >
                  <span className={`text-[10px] font-bold font-mono px-1 rounded ${
                    isCompliant ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                  }`}>
                    #{item.id} {item.field}
                  </span>

                  {isCompliant ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-rose-400" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-8 text-slate-500">
            <ZoomIn className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No package image loaded</p>
          </div>
        )}
      </div>

      {/* Selected Box Details Footer */}
      <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs min-h-[60px]">
        {selectedBox ? (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Region #{selectedBox.id}
                </span>
                {selectedBox.field}
              </span>
              <span className={selectedBox.compliant !== false ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                {selectedBox.compliant !== false ? 'PASS' : 'VIOLATION DETECTED'}
              </span>
            </div>
            <p className="text-slate-300 font-mono bg-slate-950 p-1.5 rounded border border-slate-800 line-clamp-2">
              "{selectedBox.label}"
            </p>
            {selectedBox.reason && (
              <p className="text-rose-400 text-[11px] mt-1">
                <strong>Reason:</strong> {selectedBox.reason}
              </p>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-center italic py-2">
            Hover or click on any bounding box above to inspect spatial OCR text details
          </p>
        )}
      </div>
    </div>
  );
}
