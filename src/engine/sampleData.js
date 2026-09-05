// High-resolution SVG packaging label generator for 100% realistic label visual testing

function createSnackLabelSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none">
    <!-- Packaging Background -->
    <rect width="800" height="600" fill="#1e1b4b"/>
    <rect x="40" y="40" width="720" height="520" rx="24" fill="#0f172a" stroke="#3730a3" stroke-width="4"/>
    <rect x="60" y="60" width="680" height="480" rx="16" fill="#18181b"/>

    <!-- Brand Header -->
    <rect x="80" y="80" width="640" height="90" rx="12" fill="#c2410c"/>
    <text x="400" y="135" font-family="Inter, sans-serif" font-size="32" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">CRISPY CRUNCH POTATO CHIPS</text>

    <!-- Net Quantity Declaration Box -->
    <rect x="100" y="200" width="340" height="50" rx="8" fill="#27272a" stroke="#ef4444" stroke-width="2"/>
    <text x="120" y="233 font-family="monospace" font-size="20" font-weight="700" fill="#fca5a5">Net Qty: 150 gms</text>
    <text x="310" y="233" font-family="sans-serif" font-size="12" font-weight="800" fill="#ef4444">(ILLEGAL UNIT)</text>

    <!-- MRP Declaration Box -->
    <rect x="100" y="270" width="320" height="50" rx="8" fill="#27272a" stroke="#ef4444" stroke-width="2"/>
    <text x="120" y="303" font-family="monospace" font-size="20" font-weight="700" fill="#fca5a5">MRP: Rs 45.00</text>
    <text x="270" y="303" font-family="sans-serif" font-size="11" font-weight="800" fill="#ef4444">(MISSING TAX CLAUSE)</text>

    <!-- Mfg Date Declaration Box -->
    <rect x="100" y="340" width="300" height="45" rx="8" fill="#27272a" stroke="#22c55e" stroke-width="2"/>
    <text x="120" y="369" font-family="monospace" font-size="18" font-weight="700" fill="#86efac">Mfg Date: 05/2026</text>

    <!-- Manufacturer Address Box -->
    <rect x="100" y="405" width="600" height="60" rx="8" fill="#27272a" stroke="#22c55e" stroke-width="2"/>
    <text x="120" y="430" font-family="sans-serif" font-size="14" font-weight="700" fill="#ffffff">Packed by: Snacko Foods Pvt Ltd</text>
    <text x="120" y="452" font-family="sans-serif" font-size="13" fill="#a1a1aa">Industrial Area Phase 2, Pune - 411057, Maharashtra</text>

    <!-- Consumer Care Details -->
    <rect x="100" y="480" width="600" height="45" rx="8" fill="#27272a" stroke="#f59e0b" stroke-width="2"/>
    <text x="120" y="508" font-family="sans-serif" font-size="13" font-weight="700" fill="#fde047">For Complaints: Manager, Ph: 1800-123-4567 (Missing Email ID)</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function createAlmondMilkLabelSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none">
    <!-- Carton Packaging Background -->
    <rect width="800" height="600" fill="#0284c7"/>
    <rect x="40" y="40" width="720" height="520" rx="24" fill="#ffffff"/>
    <rect x="60" y="60" width="680" height="480" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="3"/>

    <!-- Brand Header -->
    <rect x="80" y="80" width="640" height="85" rx="12" fill="#0369a1"/>
    <text x="400" y="132" font-family="Inter, sans-serif" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">PURE HARVEST ORGANIC ALMOND MILK</text>

    <!-- Net Quantity Declaration Box -->
    <rect x="100" y="190" width="280" height="50" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="120" y="223" font-family="monospace" font-size="20" font-weight="800" fill="#0369a1">Net Quantity: 1 L</text>

    <!-- Unit Sale Price Box -->
    <rect x="420" y="190" width="280" height="50" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="435" y="223" font-family="monospace" font-size="18" font-weight="800" fill="#0369a1">Unit Price: ₹ 0.22 / ml</text>

    <!-- MRP Declaration Box -->
    <rect x="100" y="260" width="600" height="55" rx="8" fill="#f0f9ff" stroke="#16a34a" stroke-width="2"/>
    <text x="120" y="295" font-family="monospace" font-size="21" font-weight="800" fill="#15803d">MRP ₹ 220.00 (incl. of all taxes)</text>

    <!-- Packing Date -->
    <rect x="100" y="330" width="340" height="45" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="120" y="359" font-family="monospace" font-size="17" font-weight="800" fill="#0369a1">Packing Date: 08/2026</text>

    <!-- Manufacturer Box -->
    <rect x="100" y="390" width="600" height="65" rx="8" fill="#f0f9ff" stroke="#0284c7" stroke-width="2"/>
    <text x="120" y="415" font-family="sans-serif" font-size="14" font-weight="800" fill="#0f172a">Manufactured & Marketed by: Harvest Organics Ltd</text>
    <text x="120" y="440" font-family="sans-serif" font-size="13" fill="#475569">Plot 42, Biotech Park, Mysuru - 570018, Karnataka</text>

    <!-- Consumer Care Box -->
    <rect x="100" y="468" width="600" height="55" rx="8" fill="#f0f9ff" stroke="#16a34a" stroke-width="2"/>
    <text x="120" y="493" font-family="sans-serif" font-size="13" font-weight="800" fill="#15803d">Consumer Care: Executive Officer, Tel: 0821-2983741</text>
    <text x="120" y="513" font-family="sans-serif" font-size="12" font-weight="700" fill="#15803d">Email: care@harvestorganics.in • Country of Origin: India</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function createFaceSerumLabelSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none">
    <!-- Cosmetic Packaging Background -->
    <rect width="800" height="600" fill="#831843"/>
    <rect x="40" y="40" width="720" height="520" rx="24" fill="#fdf2f8"/>
    <rect x="60" y="60" width="680" height="480" rx="16" fill="#ffffff" stroke="#fbcfe8" stroke-width="3"/>

    <!-- Brand Header -->
    <rect x="80" y="80" width="640" height="90" rx="12" fill="#be185d"/>
    <text x="400" y="135" font-family="Inter, sans-serif" font-size="32" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">GLOW GODDESS ROSE SERUM</text>

    <!-- Net Quantity Box -->
    <rect x="100" y="200" width="380" height="50" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="2"/>
    <text x="120" y="233" font-family="monospace" font-size="20" font-weight="800" fill="#be123c">Volume: 30 milli-litres</text>

    <!-- MRP Box -->
    <rect x="100" y="270" width="320" height="50" rx="8" fill="#fff1f2" stroke="#e11d48" stroke-width="2"/>
    <text x="120" y="303" font-family="monospace" font-size="20" font-weight="800" fill="#be123c">Price: Rs 799</text>

    <!-- Importer Box -->
    <rect x="100" y="340" width="600" height="60" rx="8" fill="#fff1f2" stroke="#be185d" stroke-width="2"/>
    <text x="120" y="368" font-family="sans-serif" font-size="15" font-weight="800" fill="#881337">Imported by: Luxe Beauty Corp, Mumbai</text>
    <text x="120" y="388" font-family="sans-serif" font-size="12" fill="#9f1239">Batch No: LR-8849</text>

    <!-- Missing Declarations Alerts -->
    <rect x="100" y="420" width="600" height="45" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="2"/>
    <text x="120" y="448" font-family="sans-serif" font-size="14" font-weight="800" fill="#be123c">⚠️ MISSING: Country of Origin Declaration (Rule 6(1)(g))</text>

    <rect x="100" y="480" width="600" height="45" rx="8" fill="#ffe4e6" stroke="#e11d48" stroke-width="2"/>
    <text x="120" y="508" font-family="sans-serif" font-size="14" font-weight="800" fill="#be123c">⚠️ MISSING: Month &amp; Year of Import (Rule 6(1)(d))</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function createEarbudsLabelSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="none">
    <!-- Electronics Box Background -->
    <rect width="800" height="600" fill="#0f172a"/>
    <rect x="40" y="40" width="720" height="520" rx="24" fill="#1e293b"/>
    <rect x="60" y="60" width="680" height="480" rx="16" fill="#0f172a" stroke="#334155" stroke-width="3"/>

    <!-- Brand Header -->
    <rect x="80" y="80" width="640" height="85" rx="12" fill="#4f46e5"/>
    <text x="400" y="132" font-family="Inter, sans-serif" font-size="30" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">FLEXIFIT WIRELESS EARBUDS</text>

    <!-- Net Quantity Box -->
    <rect x="100" y="190" width="280" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
    <text x="120" y="223" font-family="monospace" font-size="20" font-weight="800" fill="#a5b4fc">Net Quantity: 1 N</text>

    <!-- MRP Box -->
    <rect x="400" y="190" width="300" height="50" rx="8" fill="#1e1b4b" stroke="#22c55e" stroke-width="2"/>
    <text x="415" y="223" font-family="monospace" font-size="18" font-weight="800" fill="#86efac">MRP ₹ 1,499.00 (inclusive of all taxes)</text>

    <!-- Importer Box -->
    <rect x="100" y="260" width="600" height="65" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
    <text x="120" y="288" font-family="sans-serif" font-size="14" font-weight="800" fill="#ffffff">Imported &amp; Marketed by: SonicWave Tech Pvt Ltd</text>
    <text x="120" y="310" font-family="sans-serif" font-size="13" fill="#cbd5e1">Sector 62, Noida - 201309, Uttar Pradesh</text>

    <!-- Mfg Date Box -->
    <rect x="100" y="340" width="320" height="45" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="2"/>
    <text x="120" y="369" font-family="monospace" font-size="16" font-weight="800" fill="#a5b4fc">Month &amp; Year of Import: 07/2026</text>

    <!-- Country of Origin -->
    <rect x="440" y="340" width="260" height="45" rx="8" fill="#1e1b4b" stroke="#22c55e" stroke-width="2"/>
    <text x="455" y="369" font-family="sans-serif" font-size="14" font-weight="800" fill="#86efac">Country of Origin: Vietnam</text>

    <!-- Customer Care Box -->
    <rect x="100" y="405" width="600" height="65" rx="8" fill="#1e1b4b" stroke="#22c55e" stroke-width="2"/>
    <text x="120" y="430" font-family="sans-serif" font-size="13" font-weight="800" fill="#86efac">Consumer Complaint Cell: Quality Head, Toll-Free 1800-444-999</text>
    <text x="120" y="452" font-family="sans-serif" font-size="13" font-weight="800" fill="#86efac">Email: support@sonicwave.in • Address as above</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Benchmark sample dataset of packaged commodities with CRISP HIGH-DEF PACKAGING LABELS
export const BENCHMARK_SAMPLES = [
  {
    id: "sample-1",
    name: "Crispy Crunch Potato Chips 150g",
    category: "Snack Foods",
    brand: "Snacko Foods Pvt Ltd",
    imageUrl: createSnackLabelSvg(),
    status: "NON_COMPLIANT",
    score: 62,
    rawOcrText: `CRISPY CRUNCH POTATO CHIPS
Net Qty: 150 gms
Mfg Date: 05/2026
MRP: Rs 45.00
Packed by: Snacko Foods Pvt Ltd, Industrial Area Phase 2, Pune - 411057
For complaints contact: Manager at above address, Ph: 1800-123-4567
Country of Origin: India`,
    violationsCount: 2,
    warningsCount: 1,
    declarations: {
      manufacturer: { found: true, text: "Snacko Foods Pvt Ltd, Industrial Area Phase 2, Pune - 411057" },
      commodity: { found: true, text: "Crispy Crunch Potato Chips" },
      netQuantity: { found: true, text: "150 gms", isValidUnit: false, unitFound: "gms", standardUnit: "g" },
      mfgDate: { found: true, text: "05/2026", formatValid: true },
      mrp: { found: true, text: "Rs 45.00", taxClauseFound: false, currencyFound: true },
      consumerCare: { found: true, text: "Manager at above address, Ph: 1800-123-4567", emailFound: false, phoneFound: true },
      countryOfOrigin: { found: true, text: "India" },
      unitSalePrice: { found: false, text: null }
    },
    boundingBoxes: [
      { id: 1, field: "Commodity", label: "CRISPY CRUNCH POTATO CHIPS", box: { x: 10, y: 13, width: 80, height: 15 }, compliant: true },
      { id: 2, field: "Net Quantity", label: "Net Qty: 150 gms", box: { x: 12, y: 33, width: 43, height: 9 }, compliant: false, reason: "Illegal unit representation 'gms'. Standard unit under Rule 6(1)(c) must be 'g'." },
      { id: 3, field: "MRP", label: "MRP: Rs 45.00", box: { x: 12, y: 45, width: 40, height: 9 }, compliant: false, reason: "Missing mandatory tax clause '(incl. of all taxes)' mandated by Rule 6(1)(e)." },
      { id: 4, field: "Mfg Date", label: "Mfg Date: 05/2026", box: { x: 12, y: 56, width: 38, height: 8 }, compliant: true },
      { id: 5, field: "Manufacturer", label: "Packed by: Snacko Foods Pvt Ltd...", box: { x: 12, y: 67, width: 75, height: 11 }, compliant: true },
      { id: 6, field: "Customer Care", label: "For complaints contact...", box: { x: 12, y: 80, width: 75, height: 9 }, compliant: false, reason: "Missing mandatory Email ID in Consumer Care details mandated by Rule 6(1)(f)." }
    ]
  },
  {
    id: "sample-2",
    name: "Pure Harvest Organic Almond Milk 1L",
    category: "Beverages",
    brand: "Harvest Organics Ltd",
    imageUrl: createAlmondMilkLabelSvg(),
    status: "COMPLIANT",
    score: 98,
    rawOcrText: `PURE HARVEST ALMOND MILK
Net Quantity: 1 L
Net Qty Unit Price: ₹ 0.22 / ml
Month & Year of Packing: 08/2026
MRP ₹ 220.00 (incl. of all taxes)
Manufactured & Marketed by: Harvest Organics Ltd, Plot 42, Biotech Park, Mysuru - 570018, Karnataka.
Consumer Care: Executive Officer, Address as above, Tel: 0821-2983741, Email: care@harvestorganics.in
Country of Origin: India`,
    violationsCount: 0,
    warningsCount: 0,
    declarations: {
      manufacturer: { found: true, text: "Harvest Organics Ltd, Plot 42, Biotech Park, Mysuru - 570018, Karnataka" },
      commodity: { found: true, text: "Pure Harvest Almond Milk" },
      netQuantity: { found: true, text: "1 L", isValidUnit: true, unitFound: "L", standardUnit: "L" },
      mfgDate: { found: true, text: "08/2026", formatValid: true },
      mrp: { found: true, text: "MRP ₹ 220.00 (incl. of all taxes)", taxClauseFound: true, currencyFound: true },
      consumerCare: { found: true, text: "Executive Officer, Tel: 0821-2983741, Email: care@harvestorganics.in", emailFound: true, phoneFound: true },
      countryOfOrigin: { found: true, text: "India" },
      unitSalePrice: { found: true, text: "₹ 0.22 / ml" }
    },
    boundingBoxes: [
      { id: 1, field: "Commodity", label: "PURE HARVEST ALMOND MILK", box: { x: 10, y: 13, width: 80, height: 14 }, compliant: true },
      { id: 2, field: "Net Quantity", label: "Net Quantity: 1 L", box: { x: 12, y: 31, width: 35, height: 9 }, compliant: true },
      { id: 3, field: "Unit Sale Price", label: "Unit Price: ₹ 0.22 / ml", box: { x: 52, y: 31, width: 35, height: 9 }, compliant: true },
      { id: 4, field: "MRP", label: "MRP ₹ 220.00 (incl. of all taxes)", box: { x: 12, y: 43, width: 75, height: 9 }, compliant: true },
      { id: 5, field: "Mfg Date", label: "Packing Date: 08/2026", box: { x: 12, y: 55, width: 42, height: 8 }, compliant: true },
      { id: 6, field: "Manufacturer", label: "Manufactured by: Harvest Organics Ltd...", box: { x: 12, y: 65, width: 75, height: 11 }, compliant: true },
      { id: 7, field: "Customer Care", label: "Consumer Care: Executive Officer...", box: { x: 12, y: 78, width: 75, height: 10 }, compliant: true }
    ]
  },
  {
    id: "sample-3",
    name: "GlowGoddess Rose Face Serum 30ml",
    category: "Personal Care / Cosmetics",
    brand: "Luxe Beauty Corp",
    imageUrl: createFaceSerumLabelSvg(),
    status: "NON_COMPLIANT",
    score: 45,
    rawOcrText: `GLOW GODDESS ROSE SERUM
Volume: 30 milli-litres
Batch No: LR-8849
Price: Rs 799
Imported by: Luxe Beauty Corp, Mumbai
Customer Support: 9988776655`,
    violationsCount: 4,
    warningsCount: 1,
    declarations: {
      manufacturer: { found: true, text: "Luxe Beauty Corp, Mumbai" },
      commodity: { found: true, text: "Glow Goddess Rose Serum" },
      netQuantity: { found: true, text: "30 milli-litres", isValidUnit: false, unitFound: "milli-litres", standardUnit: "ml" },
      mfgDate: { found: false, text: null, formatValid: false },
      mrp: { found: true, text: "Rs 799", taxClauseFound: false, currencyFound: true },
      consumerCare: { found: true, text: "Customer Support: 9988776655", emailFound: false, phoneFound: true },
      countryOfOrigin: { found: false, text: null },
      unitSalePrice: { found: false, text: null }
    },
    boundingBoxes: [
      { id: 1, field: "Commodity", label: "GLOW GODDESS ROSE SERUM", box: { x: 10, y: 13, width: 80, height: 15 }, compliant: true },
      { id: 2, field: "Net Quantity", label: "Volume: 30 milli-litres", box: { x: 12, y: 33, width: 48, height: 9 }, compliant: false, reason: "Non-standard unit 'milli-litres'. Rule 6(1)(c) mandates 'ml' or 'mL'." },
      { id: 3, field: "MRP", label: "Price: Rs 799", box: { x: 12, y: 45, width: 40, height: 9 }, compliant: false, reason: "Missing tax clause '(incl. of all taxes)'. Rule 6(1)(e)." },
      { id: 4, field: "Manufacturer", label: "Imported by: Luxe Beauty Corp...", box: { x: 12, y: 56, width: 75, height: 10 }, compliant: true },
      { id: 5, field: "Country of Origin", label: "[MISSING DECLARATION]", box: { x: 12, y: 70, width: 75, height: 8 }, compliant: false, reason: "Missing Country of Origin declaration for imported commodity under Rule 6(1)(g)." },
      { id: 6, field: "Mfg Date", label: "[MISSING DECLARATION]", box: { x: 12, y: 80, width: 75, height: 8 }, compliant: false, reason: "Missing Month & Year of Mfg/Import mandated by Rule 6(1)(d)." }
    ]
  },
  {
    id: "sample-4",
    name: "FlexiFit Wireless Earbuds (Pack of 1 N)",
    category: "Electronics",
    brand: "SonicWave Technologies",
    imageUrl: createEarbudsLabelSvg(),
    status: "COMPLIANT",
    score: 95,
    rawOcrText: `FLEXIFIT WIRELESS EARBUDS
Net Quantity: 1 N (1 Pair Earbuds, 1 Charging Case, 1 Cable)
Month & Year of Import: 07/2026
MRP ₹ 1,499.00 (inclusive of all taxes)
USP: ₹ 1,499.00 / N
Imported & Marketed by: SonicWave Tech Pvt Ltd, Sector 62, Noida - 201309, UP.
Consumer Complaint Cell: Contact Quality Head at above address or Toll-Free 1800-444-999, Email: support@sonicwave.in
Country of Origin: Vietnam`,
    violationsCount: 0,
    warningsCount: 0,
    declarations: {
      manufacturer: { found: true, text: "SonicWave Tech Pvt Ltd, Sector 62, Noida - 201309, UP" },
      commodity: { found: true, text: "FlexiFit Wireless Earbuds" },
      netQuantity: { found: true, text: "1 N", isValidUnit: true, unitFound: "N", standardUnit: "N" },
      mfgDate: { found: true, text: "07/2026", formatValid: true },
      mrp: { found: true, text: "MRP ₹ 1,499.00 (inclusive of all taxes)", taxClauseFound: true, currencyFound: true },
      consumerCare: { found: true, text: "Quality Head, Toll-Free 1800-444-999, Email: support@sonicwave.in", emailFound: true, phoneFound: true },
      countryOfOrigin: { found: true, text: "Vietnam" },
      unitSalePrice: { found: true, text: "₹ 1,499.00 / N" }
    },
    boundingBoxes: [
      { id: 1, field: "Commodity", label: "FLEXIFIT WIRELESS EARBUDS", box: { x: 10, y: 13, width: 80, height: 14 }, compliant: true },
      { id: 2, field: "Net Quantity", label: "Net Quantity: 1 N", box: { x: 12, y: 31, width: 35, height: 9 }, compliant: true },
      { id: 3, field: "MRP", label: "MRP ₹ 1,499.00 (inclusive of all taxes)", box: { x: 50, y: 31, width: 38, height: 9 }, compliant: true },
      { id: 4, field: "Importer", label: "Imported by: SonicWave Tech Pvt Ltd...", box: { x: 12, y: 43, width: 75, height: 11 }, compliant: true },
      { id: 5, field: "Mfg Date", label: "Month & Year of Import: 07/2026", box: { x: 12, y: 56, width: 40, height: 8 }, compliant: true },
      { id: 6, field: "Country of Origin", label: "Country of Origin: Vietnam", box: { x: 55, y: 56, width: 32, height: 8 }, compliant: true },
      { id: 7, field: "Customer Care", label: "Consumer Complaint Cell...", box: { x: 12, y: 67, width: 75, height: 11 }, compliant: true }
    ]
  }
];

export const LEGAL_METROLOGY_RULES = [
  {
    ruleNo: "Rule 6(1)(a)",
    title: "Manufacturer / Packer / Importer Details",
    description: "Every package shall bear the name and complete address of the manufacturer, packer, or importer.",
    mandatory: true,
    penaltySection: "Section 36(1) of Legal Metrology Act, 2009",
    fineFirstOffence: "Up to ₹ 25,000",
    fineSecondOffence: "Up to ₹ 50,000"
  },
  {
    ruleNo: "Rule 6(1)(b)",
    title: "Generic / Common Name of Commodity",
    description: "The generic or common name of the commodity contained in the package must be prominently declared.",
    mandatory: true,
    penaltySection: "Section 36(1) of Legal Metrology Act, 2009",
    fineFirstOffence: "Up to ₹ 25,000",
    fineSecondOffence: "Up to ₹ 50,000"
  },
  {
    ruleNo: "Rule 6(1)(c)",
    title: "Net Quantity & Standard Unit Representation",
    description: "Net quantity must be expressed in standard SI metric units (g, kg, ml, l/L, m, cm, N or U). Non-standard units like gms, grm, kilo, ltr, doz are strictly illegal.",
    mandatory: true,
    penaltySection: "Section 36(2) of Legal Metrology Act, 2009",
    fineFirstOffence: "Up to ₹ 25,000",
    fineSecondOffence: "Up to ₹ 50,000"
  },
  {
    ruleNo: "Rule 6(1)(d)",
    title: "Month and Year of Manufacture / Packing / Import",
    description: "The month and year in which the commodity is manufactured, packed or imported must be declared in MM/YYYY format.",
    mandatory: true,
    penaltySection: "Section 36(1) of Legal Metrology Act, 2009",
    fineFirstOffence: "Up to ₹ 25,000",
    fineSecondOffence: "Up to ₹ 50,000"
  },
  {
    ruleNo: "Rule 6(1)(e)",
    title: "Maximum Retail Price (MRP) & Tax Clause",
    description: "MRP must be declared in Indian Rupees (₹ or Rs) and explicitly mention '(incl. of all taxes)' or 'inclusive of all taxes'. Dual MRP stickers are prohibited.",
    mandatory: true,
    penaltySection: "Section 36(1) & 36(2) of Legal Metrology Act, 2009",
    fineFirstOffence: "Up to ₹ 25,000",
    fineSecondOffence: "Up to ₹ 50,000"
  },
  {
    ruleNo: "Rule 6(1)(f)",
    title: "Consumer Care Contact Details",
    description: "Package must state the name/designation, full address, telephone number, and official e-mail address of the person or office for consumer complaints.",
    mandatory: true,
    penaltySection: "Section 36(1) of Legal Metrology Act, 2009",
    fineFirstOffence: "Up to ₹ 25,000",
    fineSecondOffence: "Up to ₹ 50,000"
  },
  {
    ruleNo: "Rule 6(1)(g)",
    title: "Country of Origin",
    description: "Mandatory declaration of Country of Origin on all packaged commodities (especially imported goods).",
    mandatory: true,
    penaltySection: "Section 36(1) of Legal Metrology Act, 2009",
    fineFirstOffence: "Up to ₹ 25,000",
    fineSecondOffence: "Up to ₹ 50,000"
  },
  {
    ruleNo: "Rule 6(11)",
    title: "Unit Sale Price (USP)",
    description: "Mandatory declaration of Unit Sale Price (e.g. ₹ per g / per ml / per N) on pre-packaged commodities to enable consumer price comparison.",
    mandatory: true,
    penaltySection: "Section 36(1) of Legal Metrology Act, 2009",
    fineFirstOffence: "Up to ₹ 25,000",
    fineSecondOffence: "Up to ₹ 50,000"
  }
];
