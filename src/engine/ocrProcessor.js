import { createWorker } from 'tesseract.js';
import { preprocessImageForOcr } from './imagePreprocessing';
import { analyzeLegalMetrologyCompliance } from './metrologyRulesEngine';

/**
 * Optical Character Recognition & Spatial Text Box Extractor
 */
export async function performPackagingOcr(imageSource, progressCallback = null) {
  try {
    if (progressCallback) progressCallback({ status: "PREPROCESSING", progress: 0.15 });

    // Step 1: Preprocess Image
    const { processedDataUrl, width, height } = await preprocessImageForOcr(imageSource);

    if (progressCallback) progressCallback({ status: "INITIALIZING_OCR", progress: 0.35 });

    // Step 2: Initialize Tesseract Worker
    const worker = await createWorker('eng');

    if (progressCallback) progressCallback({ status: "RECOGNIZING_TEXT", progress: 0.65 });

    const ret = await worker.recognize(processedDataUrl);
    const rawOcrText = ret.data.text;
    const words = ret.data.words || [];

    await worker.terminate();

    if (progressCallback) progressCallback({ status: "ANALYZING_RULES", progress: 0.90 });

    // Step 3: Map spatial bounding boxes relative to 100% canvas size
    const boundingBoxes = (ret.data.lines || []).map((line, idx) => {
      const bbox = line.bbox;
      const xPercent = Math.round((bbox.x0 / width) * 100);
      const yPercent = Math.round((bbox.y0 / height) * 100);
      const wPercent = Math.round(((bbox.x1 - bbox.x0) / width) * 100);
      const hPercent = Math.round(((bbox.y1 - bbox.y0) / height) * 100);

      return {
        id: idx + 1,
        field: identifyFieldType(line.text),
        label: line.text.trim(),
        box: {
          x: Math.max(0, Math.min(95, xPercent)),
          y: Math.max(0, Math.min(95, yPercent)),
          width: Math.max(5, Math.min(95, wPercent)),
          height: Math.max(4, Math.min(50, hPercent))
        },
        compliant: isLineCompliant(line.text)
      };
    });

    // Step 4: Run Legal Metrology Compliance Engine
    const analysis = analyzeLegalMetrologyCompliance(rawOcrText);

    if (progressCallback) progressCallback({ status: "COMPLETE", progress: 1.0 });

    return {
      rawOcrText,
      analysis,
      boundingBoxes: boundingBoxes.length > 0 ? boundingBoxes : generateFallbackBoxes(rawOcrText),
      processedDataUrl
    };

  } catch (err) {
    console.error("OCR Processing error:", err);
    throw new Error("OCR Processing failed: " + err.message);
  }
}

function identifyFieldType(text) {
  const t = text.toLowerCase();
  if (/mrp|price|rs|₹/i.test(t)) return "MRP";
  if (/net\s*qty|g|kg|ml|l|wt/i.test(t)) return "Net Quantity";
  if (/mfg|packed|pkd|date/i.test(t)) return "Mfg Date";
  if (/manufactured|marketed|imported|by/i.test(t)) return "Manufacturer";
  if (/consumer|customer|care|complaint|email|tel/i.test(t)) return "Customer Care";
  if (/origin|made\s*in/i.test(t)) return "Country of Origin";
  return "Declaration Line";
}

function isLineCompliant(text) {
  const t = text.toLowerCase();
  if (/gms|gm\b|kilo|ltrs|milli-litres/i.test(t)) return false;
  if (/mrp|price/i.test(t) && !/tax/i.test(t)) return false;
  return true;
}

function generateFallbackBoxes(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  return lines.slice(0, 8).map((line, idx) => ({
    id: idx + 1,
    field: identifyFieldType(line),
    label: line,
    box: { x: 10, y: 12 + idx * 10, width: 80, height: 8 },
    compliant: isLineCompliant(line)
  }));
}
