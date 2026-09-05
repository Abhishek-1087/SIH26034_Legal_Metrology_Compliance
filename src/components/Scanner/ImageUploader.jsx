import React, { useRef, useState } from 'react';
import { Upload, Camera, Link, RefreshCw, Sparkles, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

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
    <div className="glass-card p-6 mb-6 relative overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
            : 'border-slate-700 hover:border-indigo-500/50 bg-slate-800/20 hover:bg-slate-800/40'
        }`}
      >
        {/* Animated Laser Scanning Line during scanning */}
        {isScanning && <div className="scanner-laser"></div>}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center relative z-10">
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600/20 via-cyan-500/20 to-transparent border border-indigo-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-indigo-500/10 group">
            <Upload className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
          </div>

          <h3 className="text-lg font-bold text-white mb-1.5 font-heading">
            Upload Packaging Photo or <span className="text-cyan-400 underline underline-offset-4 font-semibold">Browse File</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mb-6 leading-relaxed">
            Drag & drop front/back packaging labels, pouch photos, bottles, or carton images (PNG, JPG, WEBP). Auto-enhances contrast and detects Legal Metrology declarations.
          </p>

          {isScanning ? (
            <div className="w-full max-w-md bg-slate-900 p-4 rounded-2xl border border-indigo-500/40 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="text-cyan-400 font-semibold flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  {scanProgress?.status || "Analyzing Packaging Label & OCR..."}
                </span>
                <span className="text-cyan-400 font-mono font-bold text-sm">
                  {Math.round((scanProgress?.progress || 0.15) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(scanProgress?.progress || 0.15) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onOpenCamera(); }}
                className="btn btn-secondary text-xs py-2.5 px-4 flex items-center gap-2 border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 shadow-sm"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                Live Camera Scan
              </button>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onOpenEcom(); }}
                className="btn btn-secondary text-xs py-2.5 px-4 flex items-center gap-2 border-slate-700 hover:border-indigo-500/50 hover:text-indigo-400 shadow-sm"
              >
                <Link className="w-4 h-4 text-indigo-400" />
                E-Commerce Product Link
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
