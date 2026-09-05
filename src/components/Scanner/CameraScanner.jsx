import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, Check, RefreshCw, AlertCircle } from 'lucide-react';

export default function CameraScanner({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera permission denied or camera unavailable.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 1280;
      canvas.height = videoRef.current.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      onCapture(dataUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white">Live Product Packaging Scanner</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video bg-black flex items-center justify-center">
          {cameraError ? (
            <div className="text-center p-6 text-rose-400">
              <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium">{cameraError}</p>
              <button onClick={startCamera} className="mt-4 btn btn-secondary text-xs">
                Retry Camera
              </button>
            </div>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              {/* Overlay Guidance Box */}
              <div className="absolute inset-8 border-2 border-dashed border-cyan-400/60 rounded-xl pointer-events-none flex items-center justify-center">
                <span className="text-xs font-mono font-semibold bg-slate-950/70 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                  Align Label Declarations Inside Frame
                </span>
              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/50">
          <span className="text-xs text-slate-400">Ensure good lighting for OCR legibility</span>
          <div className="flex gap-2">
            <button onClick={onClose} className="btn btn-secondary text-xs">Cancel</button>
            <button onClick={handleCapture} disabled={!!cameraError} className="btn btn-primary text-xs flex items-center gap-2">
              <Check className="w-4 h-4" /> Capture & Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
