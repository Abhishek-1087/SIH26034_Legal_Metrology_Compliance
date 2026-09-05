import React, { useState } from 'react';
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

import { BENCHMARK_SAMPLES } from './engine/sampleData';
import { performPackagingOcr } from './engine/ocrProcessor';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  
  // Active product inspection state (default to first sample for instant demo display)
  const [activeProduct, setActiveProduct] = useState(BENCHMARK_SAMPLES[0]);
  const [selectedSampleId, setSelectedSampleId] = useState(BENCHMARK_SAMPLES[0].id);
  const [activeBoxId, setActiveBoxId] = useState(null);

  // Modals & Scan Status
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isEcomOpen, setIsEcomOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(null);

  // Handle sample selection
  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setActiveProduct(sample);
    setActiveBoxId(null);
  };

  // Handle custom image scan (File, Camera, or URL)
  const handleProcessCustomImage = async (imageSource, name = "Custom Package Scan") => {
    setIsScanning(true);
    setScanProgress({ status: "Loading Image Canvas...", progress: 0.1 });

    try {
      const result = await performPackagingOcr(imageSource, (prog) => {
        setScanProgress(prog);
      });

      const newProduct = {
        id: `custom-scan-${Date.now()}`,
        name: name,
        category: "Scanned Commodity",
        brand: "Packaged Commodity Label",
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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
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
