import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SampleSelector from './components/Scanner/SampleSelector';
import ImageUploader from './components/Scanner/ImageUploader';
import CameraScanner from './components/Scanner/CameraScanner';
import EcomInspector from './components/Scanner/EcomInspector';
import BoundingBoxViewer from './components/Inspection/BoundingBoxViewer';
import ComplianceScoreCard from './components/Inspection/ComplianceScoreCard';
import DeclarationGrid from './components/Inspection/DeclarationGrid';
import ViolationList from './components/Inspection/ViolationList';
import BatchAuditor from './components/Batch/BatchAuditor';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import RulebookExplorer from './components/Rulebook/RulebookExplorer';
import AuthModal from './components/Auth/AuthModal';

import { BENCHMARK_SAMPLES } from './engine/sampleData';
import { performPackagingOcr } from './engine/ocrProcessor';
import { getCurrentUser, logoutUser } from './engine/authService';
import { ShieldCheck, Sparkles, Scale, AlertTriangle, UserCheck, Moon, Sun } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  
  // Theme State (Day / Night Mode)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lm_theme') || 'dark';
  });

  // User Auth State (Persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Active product inspection state
  const [activeProduct, setActiveProduct] = useState(BENCHMARK_SAMPLES[0]);
  const [selectedSampleId, setSelectedSampleId] = useState(BENCHMARK_SAMPLES[0].id);
  const [activeBoxId, setActiveBoxId] = useState(null);

  // Modals & Scan Status
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isEcomOpen, setIsEcomOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(null);

  // Sync theme attribute to HTML document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lm_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setActiveProduct(sample);
    setActiveBoxId(null);
  };

  const handleProcessCustomImage = async (imageSource, name = "Custom Package Scan") => {
    setIsScanning(true);
    setScanProgress({ status: "Loading Canvas & Image Preprocessor...", progress: 0.15 });

    try {
      const result = await performPackagingOcr(imageSource, (prog) => {
        setScanProgress(prog);
      });

      const newProduct = {
        id: `custom-scan-${Date.now()}`,
        name: name,
        category: "Scanned Packaged Commodity",
        brand: "Custom Label Input",
        imageUrl: typeof imageSource === "string" ? imageSource : URL.createObjectURL(imageSource),
        status: result.analysis.status,
        score: result.analysis.score,
        declarations: result.analysis.declarations,
        violationsCount: result.analysis.violations.length,
        warningsCount: result.analysis.warnings.length,
        analysis: result.analysis,
        boundingBoxes: result.boundingBoxes,
        penaltyEstimate: result.analysis.penaltyEstimate
      };

      setSelectedSampleId(null);
      setActiveProduct(newProduct);
      setActiveBoxId(null);
    } catch (err) {
      console.error("Scan error:", err);
      alert("Failed to analyze packaging label: " + err.message);
    } finally {
      setIsScanning(false);
      setScanProgress(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* Top Metric & User Status Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-card p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Logged In Role</span>
              <span className="text-xs font-extrabold text-cyan-400 font-mono flex items-center gap-1 mt-0.5">
                <UserCheck className="w-3.5 h-3.5" />
                {currentUser ? (currentUser.role === 'Official' ? 'Official Inspector' : 'Public Consumer') : 'Guest Auditor'}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Scale className="w-4 h-4" />
            </div>
          </div>

          <div className="glass-card p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Active Mode</span>
              <span className="text-xs font-extrabold text-amber-400 font-mono capitalize">
                {theme === 'dark' ? 'Night Mode 🌙' : 'Day Mode ☀️'}
              </span>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
          </div>

          <div className="glass-card p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Penalty Calculator</span>
              <span className="text-xs font-extrabold text-rose-400 font-mono">Sec 36 Enforced</span>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="glass-card p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Ministry Standard</span>
              <span className="text-xs font-extrabold text-emerald-400 font-mono">Dept of Consumer Affairs</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
        </div>

        {activeTab === 'scanner' && (
          <div className="space-y-6">
            
            {/* Benchmark Samples Selector */}
            <SampleSelector
              selectedSampleId={selectedSampleId}
              onSelectSample={handleSelectSample}
            />

            {/* Custom Packaging Image Upload Zone */}
            <ImageUploader
              onImageSelected={(file) => handleProcessCustomImage(file, file.name)}
              onOpenCamera={() => setIsCameraOpen(true)}
              onOpenEcom={() => setIsEcomOpen(true)}
              isScanning={isScanning}
              scanProgress={scanProgress}
            />

            {/* Compliance Score Card */}
            <ComplianceScoreCard productData={activeProduct} />

            {/* Bounding Box Viewer & Visual Label Inspection Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Bounding Box Image Preview (5 cols) */}
              <div className="lg:col-span-5">
                <BoundingBoxViewer
                  imageUrl={activeProduct?.imageUrl}
                  boundingBoxes={activeProduct?.boundingBoxes || []}
                  activeBoxId={activeBoxId}
                  setActiveBoxId={setActiveBoxId}
                />
              </div>

              {/* Declarations Grid (7 cols) */}
              <div className="lg:col-span-7">
                <DeclarationGrid declarations={activeProduct?.declarations || {}} />
              </div>

            </div>

            {/* Offences & Statutory Penalties List */}
            <ViolationList
              violations={activeProduct?.violationsCount ? (activeProduct?.analysis?.violations || []) : (activeProduct?.analysis?.violations || [])}
              warnings={activeProduct?.warningsCount ? (activeProduct?.analysis?.warnings || []) : (activeProduct?.analysis?.warnings || [])}
              penaltyEstimate={activeProduct?.penaltyEstimate}
            />

          </div>
        )}

        {activeTab === 'batch' && <BatchAuditor />}

        {activeTab === 'analytics' && <AnalyticsDashboard />}

        {activeTab === 'rulebook' && <RulebookExplorer />}

      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />

      <CameraScanner
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => handleProcessCustomImage(dataUrl, "Live Camera Scan")}
      />

      <EcomInspector
        isOpen={isEcomOpen}
        onClose={() => setIsEcomOpen(false)}
        onUrlSubmit={(url) => handleProcessCustomImage(url, "E-Commerce Package Image")}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>SIH26034 • Ministry of Consumer Affairs, Food & Public Distribution • Packaged Commodities Rules, 2011 Compliance System</p>
      </footer>

    </div>
  );
}
