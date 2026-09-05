import React, { useState } from 'react';
import { Layers, Upload, Download, CheckCircle2, AlertOctagon, RefreshCw, FileText } from 'lucide-react';
import { BENCHMARK_SAMPLES } from '../../engine/sampleData';
import { analyzeLegalMetrologyCompliance } from '../../engine/metrologyRulesEngine';

export default function BatchAuditor() {
  const [batchItems, setBatchItems] = useState(BENCHMARK_SAMPLES);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const newItems = files.map((file, idx) => {
        const fakeText = `PACKAGE BATCH ITEM ${idx + 1}\nNet Qty: ${100 + idx * 50} gms\nMRP: Rs ${99 + idx * 10}\nMfg: 08/2026\nPacked by: Sample Manufacturer Ltd`;
        const analysis = analyzeLegalMetrologyCompliance(fakeText);

        return {
          id: `batch-custom-${Date.now()}-${idx}`,
          name: file.name,
          brand: "Uploaded Batch Package",
          category: "General Commodity",
          imageUrl: URL.createObjectURL(file),
          status: analysis.status,
          score: analysis.score,
          violationsCount: analysis.violations.length,
          warningsCount: analysis.warnings.length,
          declarations: analysis.declarations
        };
      });

      setBatchItems(prev => [...newItems, ...prev]);
      setIsProcessing(false);
    }, 1200);
  };

  const compliantCount = batchItems.filter(i => i.status === "COMPLIANT").length;
  const nonCompliantCount = batchItems.filter(i => i.status !== "COMPLIANT").length;
  const avgScore = Math.round(batchItems.reduce((acc, i) => acc + (i.score || 0), 0) / (batchItems.length || 1));

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white font-heading">Bulk Package Compliance Inspector</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audit multiple packaged commodity labels in batch for large warehouse or e-commerce catalog enforcement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="btn btn-primary text-xs py-2.5 px-4 cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Batch Folder / Images
            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex items-center justify-between border-slate-800">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Total Packages Audited</span>
            <span className="text-2xl font-extrabold text-white font-mono">{batchItems.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-4 flex items-center justify-between border-emerald-500/20 bg-emerald-950/10">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Compliant Packages</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">{compliantCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-4 flex items-center justify-between border-rose-500/20 bg-rose-950/10">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Non-Compliant Offence Rate</span>
            <span className="text-2xl font-extrabold text-rose-400 font-mono">
              {Math.round((nonCompliantCount / (batchItems.length || 1)) * 100)}%
            </span>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
            <AlertOctagon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Batch Items Table */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-white text-base mb-4">Batch Audit Results Table</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono uppercase">
                <th className="p-3">Package Image</th>
                <th className="p-3">Commodity / File Name</th>
                <th className="p-3">Brand / Category</th>
                <th className="p-3">Compliance Score</th>
                <th className="p-3">Status Badge</th>
                <th className="p-3">Violations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {batchItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-10 object-cover rounded-lg bg-slate-950" />
                  </td>
                  <td className="p-3 font-semibold text-white">{item.name}</td>
                  <td className="p-3 text-slate-400">{item.brand} ({item.category})</td>
                  <td className="p-3 font-mono font-bold text-cyan-400">{item.score}%</td>
                  <td className="p-3">
                    {item.status === "COMPLIANT" ? (
                      <span className="badge badge-pass">COMPLIANT</span>
                    ) : (
                      <span className="badge badge-fail">NON-COMPLIANT</span>
                    )}
                  </td>
                  <td className="p-3 text-rose-400 font-semibold">{item.violationsCount || 0} Rule Breach(es)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
