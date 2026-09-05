import React, { useState, useEffect } from 'react';
import { Layers, Upload, Download, CheckCircle2, AlertOctagon, Search, Filter, FileText, ArrowUpDown, Eye } from 'lucide-react';
import { BENCHMARK_SAMPLES } from '../../engine/sampleData';
import { analyzeLegalMetrologyCompliance } from '../../engine/metrologyRulesEngine';
import { fetchScanLogs, saveBatchScans } from '../../engine/apiService';

export default function BatchAuditor() {
  const [batchItems, setBatchItems] = useState(BENCHMARK_SAMPLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedBatchItem, setSelectedBatchItem] = useState(null);
  const [isLoadingDb, setIsLoadingDb] = useState(false);

  useEffect(() => {
    async function loadDbScans() {
      setIsLoadingDb(true);
      const dbScans = await fetchScanLogs();
      if (dbScans && dbScans.length > 0) {
        setBatchItems(dbScans);
      }
      setIsLoadingDb(false);
    }
    loadDbScans();
  }, []);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

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
        declarations: analysis.declarations,
        violations: analysis.violations
      };
    });

    const saved = await saveBatchScans(newItems);
    setBatchItems(prev => [...saved, ...prev]);
  };

  const filteredItems = batchItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const compliantCount = batchItems.filter(i => i.status === "COMPLIANT").length;
  const nonCompliantCount = batchItems.filter(i => i.status !== "COMPLIANT").length;

  const handleExportCsv = () => {
    const headers = "ID,Name,Brand,Category,Status,Score,ViolationsCount\n";
    const rows = batchItems.map(i => `"${i.id}","${i.name}","${i.brand}","${i.category}","${i.status}",${i.score},${i.violationsCount || 0}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Batch_Legal_Metrology_Audit_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-heading">Bulk Package Compliance Inspector</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Audit large batches of packaged commodity labels for warehouse, retail catalog, and e-commerce enforcement.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="btn btn-secondary text-xs py-2.5 px-4 flex items-center gap-2 border-slate-700 hover:border-slate-600"
          >
            <Download className="w-4 h-4 text-cyan-400" /> Export CSV Report
          </button>

          <label className="btn btn-primary text-xs py-2.5 px-4 cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Batch Images
            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4.5 flex items-center justify-between border-slate-800">
          <div>
            <span className="text-xs text-slate-400 font-semibold block mb-1">Total Packages Audited</span>
            <span className="text-3xl font-extrabold text-white font-mono">{batchItems.length}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-4.5 flex items-center justify-between border-emerald-500/20 bg-emerald-950/10">
          <div>
            <span className="text-xs text-slate-400 font-semibold block mb-1">Compliant Packages</span>
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">{compliantCount}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-4.5 flex items-center justify-between border-rose-500/20 bg-rose-950/10">
          <div>
            <span className="text-xs text-slate-400 font-semibold block mb-1">Non-Compliance Offence Rate</span>
            <span className="text-3xl font-extrabold text-rose-400 font-mono">
              {Math.round((nonCompliantCount / (batchItems.length || 1)) * 100)}%
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertOctagon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <h3 className="font-bold text-white text-base font-heading">Batch Inspection Log Matrix</h3>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by commodity name..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 font-mono"
            >
              <option value="ALL">All Statuses</option>
              <option value="COMPLIANT">Compliant Only</option>
              <option value="NON_COMPLIANT">Non-Compliant Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono uppercase">
                <th className="p-3">Package Image</th>
                <th className="p-3">Commodity / File Name</th>
                <th className="p-3">Brand & Sector</th>
                <th className="p-3">Compliance Rating</th>
                <th className="p-3">Status</th>
                <th className="p-3">Offences</th>
                <th className="p-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800" />
                  </td>
                  <td className="p-3 font-bold text-white">{item.name}</td>
                  <td className="p-3 text-slate-400">{item.brand} <span className="text-slate-500 font-mono">({item.category})</span></td>
                  <td className="p-3 font-mono font-extrabold text-cyan-400 text-sm">{item.score}%</td>
                  <td className="p-3">
                    {item.status === "COMPLIANT" ? (
                      <span className="badge badge-pass text-[10px]">COMPLIANT</span>
                    ) : (
                      <span className="badge badge-fail text-[10px]">NON-COMPLIANT</span>
                    )}
                  </td>
                  <td className="p-3 text-rose-400 font-bold font-mono">{item.violationsCount || 0} Breach(es)</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedBatchItem(item)}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
                      title="View batch item detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Item Details Modal */}
      {selectedBatchItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">{selectedBatchItem.name}</h3>
              <button onClick={() => setSelectedBatchItem(null)} className="btn btn-secondary text-xs py-1 px-3">Close</button>
            </div>
            
            <div className="flex gap-4 items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
              <img src={selectedBatchItem.imageUrl} alt={selectedBatchItem.name} className="w-20 h-20 object-cover rounded-lg" />
              <div>
                <p className="text-xs text-slate-400">Score: <strong className="text-cyan-400 font-mono text-sm">{selectedBatchItem.score}%</strong></p>
                <p className="text-xs text-slate-400">Status: <strong className={selectedBatchItem.status === 'COMPLIANT' ? 'text-emerald-400' : 'text-rose-400'}>{selectedBatchItem.status}</strong></p>
                <p className="text-xs text-slate-400">Brand: {selectedBatchItem.brand}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 mb-2">Rule Violations Breakdown:</h4>
              {selectedBatchItem.violations && selectedBatchItem.violations.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedBatchItem.violations.map((v, i) => (
                    <div key={i} className="p-2 bg-rose-950/30 border border-rose-500/30 rounded-lg text-xs text-rose-300 font-mono">
                      • {v.ruleNo}: {v.message}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-emerald-400">No violations detected for this package.</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
