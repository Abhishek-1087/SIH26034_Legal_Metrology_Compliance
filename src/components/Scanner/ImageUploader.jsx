import React, { useRef, useState } from 'react';
import { Upload, Camera, Link, RefreshCw, FileText, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({ onImageSelected, onOpenCamera, onOpenEcom, isScanning, scanProgress }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-950/20'
            : 'border-slate-700 hover:border-indigo-500/50 bg-slate-900/40 hover:bg-slate-900/80'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
            <Upload className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-semibold text-white mb-1">
            Drop Packaging Label Image Here or <span className="text-cyan-400 underline underline-offset-4">Browse File</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-md mb-6">
            Supports front/back packaging labels, bottles, boxes, pouch photos (JPG, PNG, WEBP). Auto-enhances contrast and detects Legal Metrology declarations.
          </p>

          {isScanning ? (
            <div className="w-full max-w-md bg-slate-950 p-4 rounded-xl border border-indigo-500/30">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-indigo-300 font-semibold flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  {scanProgress?.status || "Processing Image & OCR..."}
                </span>
                <span className="text-cyan-400 font-mono font-bold">
                  {Math.round((scanProgress?.progress || 0.1) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(scanProgress?.progress || 0.1) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onOpenCamera(); }}
                className="btn btn-secondary text-xs py-2 px-4 flex items-center gap-2 border-slate-700 hover:border-slate-600"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                Live Camera Scan
              </button>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onOpenEcom(); }}
                className="btn btn-secondary text-xs py-2 px-4 flex items-center gap-2 border-slate-700 hover:border-slate-600"
              >
                <Link className="w-4 h-4 text-indigo-400" />
                E-Commerce URL Scan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
