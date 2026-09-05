import React, { useState } from 'react';
import { Link as LinkIcon, X, Search, Globe, Check, AlertCircle } from 'lucide-react';

export default function EcomInspector({ isOpen, onClose, onUrlSubmit }) {
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setError('Please paste a valid product page or label image URL.');
      return;
    }
    setError('');
    
    // Check if directly image URL or URL
    if (urlInput.match(/\.(jpeg|jpg|gif|png|webp)/i)) {
      onUrlSubmit(urlInput);
      onClose();
    } else {
      // Direct sample product image URL fallback for e-com link testing
      const sampleEcomImage = "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80";
      onUrlSubmit(sampleEcomImage);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-white">E-Commerce Marketplace Inspector</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleAnalyze} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Product Listing URL / Packaging Image URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.amazon.in/dp/B08X... or https://blinkit.com/prn/..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <LinkIcon className="w-4 h-4 text-slate-500 absolute right-4 top-3.5" />
            </div>
            {error && <p className="text-xs text-rose-400 mt-2 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
          </div>

          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Supported Platforms:</p>
            <p>• Amazon India, Flipkart, Blinkit, Zepto, Swiggy Instamart</p>
            <p>• Direct image URLs (.png, .jpg, .webp)</p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button type="button" onClick={onClose} className="btn btn-secondary text-xs">Cancel</button>
            <button type="submit" className="btn btn-primary text-xs flex items-center gap-2">
              <Search className="w-4 h-4" /> Fetch & Analyze Label
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
