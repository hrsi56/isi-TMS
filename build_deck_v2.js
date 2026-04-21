// ML Engineering Portfolio Deck v2 — Yarden Viktor Dejorno
// Project: Alpha-Band Phase-Lag Biomarker for TMS Optimization
// Audience: ML Engineers, Hiring Managers
// Changes: removed +25% claim, removed 10TB card, new asymmetric-response slide,
//          clean single-panel result images, title overlap fix, formula fix

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBrain, FaWaveSquare, FaCode, FaChartLine, FaCheckCircle,
  FaExchangeAlt, FaDatabase, FaMicrochip, FaSearchPlus, FaArrowRight,
  FaLinkedin, FaGithub, FaEnvelope, FaSignal, FaCog, FaFilter,
  FaUserCog, FaLayerGroup, FaUsers, FaFlask
} = require("react-icons/fa");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3" x 7.5"
pres.author = "Yarden Viktor Dejorno";
pres.title = "Alpha-Band Phase-Lag as a Biomarker for TMS Optimization";

// =========== DESIGN SYSTEM ===========
const C = {
  darkBg: "0F172A", darkBg2: "1E293B",
  lightBg: "FFFFFF", offWhite: "F8FAFC",
  accent: "06B6D4", accentDark: "0891B2", accentSoft: "E0F2FE",
  textDark: "0F172A", textLight: "F1F5F9",
  muted: "64748B", mutedLight: "94A3B8",
  success: "10B981", danger: "EF4444",
  border: "E2E8F0",
};

const F = { header: "Georgia", body: "Calibri", mono: "Consolas" };

function renderIconSvg(IconComponent, color, size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconPng(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function buildDeck() {
  // ============================================================
  // SLIDE 1 — TITLE (dark) — fix overlap, drop +25% from subtitle
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };

    s.addShape(pres.shapes.OVAL, {
      x: 11.0, y: -1.5, w: 4, h: 4,
      fill: { color: C.accent, transparency: 85 }, line: { type: "none" },
    });
    s.addShape(pres.shapes.OVAL, {
      x: 12.3, y: -0.3, w: 2, h: 2,
      fill: { color: C.accentDark, transparency: 70 }, line: { type: "none" },
    });

    s.addText("PORTFOLIO PROJECT · SIGNAL PROCESSING", {
      x: 0.8, y: 1.0, w: 10, h: 0.4,
      fontFace: F.body, fontSize: 12, color: C.accent,
      charSpacing: 4, bold: true, margin: 0,
    });

    // Title — two separate lines, more spacing to prevent overlap
    s.addText("Alpha-Band Phase-Lag as a", {
      x: 0.8, y: 1.6, w: 11.5, h: 0.95,
      fontFace: F.header, fontSize: 40, color: C.textLight,
      bold: true, margin: 0,
    });
    s.addText([
      { text: "Predictive Biomarker ", options: { color: C.accent } },
      { text: "for TMS Optimization", options: { color: C.textLight } },
    ], {
      x: 0.8, y: 2.7, w: 11.5, h: 0.95,
      fontFace: F.header, fontSize: 40, bold: true, margin: 0,
    });

    // Subtitle — only r, p (no +25%)
    s.addText([
      { text: "A spectral EEG feature that predicts per-subject optimal stimulation timing — ", options: { color: C.mutedLight } },
      { text: "r = 0.49, p = 0.015", options: { color: C.accent, bold: true } },
      { text: ".", options: { color: C.mutedLight } },
    ], {
      x: 0.8, y: 4.0, w: 12.0, h: 0.5,
      fontFace: F.body, fontSize: 16, italic: true, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 5.6, w: 1.5, h: 0.04,
      fill: { color: C.accent }, line: { type: "none" },
    });
    s.addText("Yarden Viktor Dejorno", {
      x: 0.8, y: 5.75, w: 10, h: 0.5,
      fontFace: F.header, fontSize: 24, color: C.textLight, bold: true, margin: 0,
    });
    s.addText("ML Engineer · Brainsway Deep-TMS R&D Lab (2021–2022)", {
      x: 0.8, y: 6.25, w: 10, h: 0.4,
      fontFace: F.body, fontSize: 13, color: C.mutedLight, margin: 0,
    });
  }

  // ============================================================
  // SLIDE 2 — THE PROBLEM (light) — unchanged
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("01 · THE PROBLEM", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("TMS therapy is a one-size-fits-all protocol — but brains aren't.", {
      x: 0.7, y: 0.9, w: 12, h: 1.0,
      fontFace: F.header, fontSize: 30, color: C.textDark, bold: true, margin: 0,
    });

    s.addText("Paired Associative Stimulation (PAS) drives brain plasticity by firing two cortical sites at a precise interval (IPI). The therapeutic window is narrow — milliseconds matter.", {
      x: 0.7, y: 2.1, w: 5.5, h: 1.6,
      fontFace: F.body, fontSize: 14, color: C.textDark, margin: 0, paraSpaceAfter: 6,
    });
    s.addText("Current practice: use one fixed IPI (typically 8 ms) across all patients. Clinical response varies widely.", {
      x: 0.7, y: 3.7, w: 5.5, h: 1.0,
      fontFace: F.body, fontSize: 14, color: C.muted, italic: true, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.8, y: 2.1, w: 6.0, h: 4.7,
      fill: { color: C.offWhite }, line: { color: C.border, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.8, y: 2.1, w: 0.08, h: 4.7,
      fill: { color: C.accent }, line: { type: "none" },
    });
    s.addText("THE ML QUESTION", {
      x: 7.1, y: 2.3, w: 5.5, h: 0.3,
      fontFace: F.body, fontSize: 10, color: C.accent, charSpacing: 3, bold: true, margin: 0,
    });
    s.addText("Can we extract a per-subject feature from raw EEG that predicts their optimal stimulation parameter?", {
      x: 7.1, y: 2.65, w: 5.5, h: 1.6,
      fontFace: F.header, fontSize: 19, color: C.textDark, bold: true, margin: 0,
    });
    s.addText([
      { text: "Input: ", options: { bold: true, color: C.textDark } },
      { text: "multi-channel resting-state EEG (5 min, 256 Hz)", options: { color: C.muted, breakLine: true } },
      { text: "Output: ", options: { bold: true, color: C.textDark } },
      { text: "scalar — predicted optimal IPI ∈ {4, 8, 16, 32 ms}", options: { color: C.muted, breakLine: true } },
      { text: "Challenge: ", options: { bold: true, color: C.textDark } },
      { text: "N=24. Deep learning is out. Feature engineering is in.", options: { color: C.muted } },
    ], {
      x: 7.1, y: 4.5, w: 5.5, h: 2.2,
      fontFace: F.body, fontSize: 13, margin: 0, paraSpaceAfter: 6,
    });
  }

  // ============================================================
  // SLIDE 3 — THE DATA (light) — 3-stat layout (no 10TB)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("02 · THE DATA", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("Clinical trial, 24 subjects × 9 sessions.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 30, color: C.textDark, bold: true, margin: 0,
    });

    // Three stat cards (wider, centered)
    const stats = [
      { big: "24", small: "Healthy participants", note: "Repeated-measures design" },
      { big: "9×", small: "Weekly sessions per subject", note: "4 IPIs × 2 directions + sham" },
      { big: "256 Hz", small: "Multi-channel EEG", note: "Pre + post each stimulation" },
    ];
    const cardW = 3.9, cardH = 2.5, gap = 0.2;
    const totalW = stats.length * cardW + (stats.length - 1) * gap;
    const startX = (13.3 - totalW) / 2;
    stats.forEach((st, i) => {
      const x = startX + i * (cardW + gap);
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 2.1, w: cardW, h: cardH,
        fill: { color: C.offWhite }, line: { color: C.border, width: 1 },
      });
      s.addText(st.big, {
        x, y: 2.3, w: cardW, h: 1.0,
        fontFace: F.header, fontSize: 48, color: C.accent, bold: true,
        align: "center", margin: 0,
      });
      s.addText(st.small, {
        x: x + 0.15, y: 3.4, w: cardW - 0.3, h: 0.45,
        fontFace: F.body, fontSize: 14, color: C.textDark, bold: true,
        align: "center", margin: 0,
      });
      s.addText(st.note, {
        x: x + 0.15, y: 3.9, w: cardW - 0.3, h: 0.5,
        fontFace: F.body, fontSize: 11, color: C.muted,
        align: "center", italic: true, margin: 0,
      });
    });

    s.addText("Experimental design", {
      x: 0.7, y: 5.1, w: 6, h: 0.35,
      fontFace: F.body, fontSize: 11, color: C.muted, charSpacing: 3, bold: true, margin: 0,
    });
    s.addText("Each session: resting-state EEG → PAS stimulation (one condition) → resting-state EEG. The post-minus-pre change in alpha-band power defines the PAS-induced effect. The condition producing the largest per-subject effect defines the individual optimal IPI — our prediction target.", {
      x: 0.7, y: 5.5, w: 12.0, h: 1.5,
      fontFace: F.body, fontSize: 13, color: C.textDark, margin: 0,
    });
  }

  // ============================================================
  // SLIDE 4 — THE MOTIVATION (NEW — asymmetric PAS response)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("03 · WHY A PER-SUBJECT PREDICTOR?", {
      x: 0.7, y: 0.5, w: 8, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("Subjects respond to different stimulation parameters differently.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 26, color: C.textDark, bold: true, margin: 0,
    });

    // Left image
    s.addImage({
      path: "Screenshot 2026-04-21 at 22.14.46.png",
      x: 0.5, y: 2.1, w: 4.2, h: 4.2, sizing: { type: "contain", w: 4.2, h: 4.2 },
    });
    s.addText("Average PAS-induced α-power change across conditions. Direction (RL vs LR) and IPI length both matter.",
      { x: 0.5, y: 6.35, w: 4.2, h: 0.8, fontFace: F.body, fontSize: 10, color: C.muted, italic: true, align: "center", margin: 0 });

    // Right image
    s.addImage({
      path: "Screenshot 2026-04-21 at 22.14.41.png",
      x: 4.9, y: 2.1, w: 4.2, h: 4.2, sizing: { type: "contain", w: 4.2, h: 4.2 },
    });
    s.addText("Per-subject effect (circles) at each IPI. Same stimulus, opposite effects — each subject has a preferred IPI.",
      { x: 4.9, y: 6.35, w: 4.2, h: 0.8, fontFace: F.body, fontSize: 10, color: C.muted, italic: true, align: "center", margin: 0 });

    // Right column: takeaway
    s.addShape(pres.shapes.RECTANGLE, {
      x: 9.4, y: 2.1, w: 3.6, h: 4.2,
      fill: { color: C.darkBg }, line: { type: "none" },
    });
    s.addText("THE INSIGHT", {
      x: 9.6, y: 2.3, w: 3.2, h: 0.3,
      fontFace: F.body, fontSize: 10, color: C.accent, charSpacing: 3, bold: true, margin: 0,
    });
    s.addText("The group-average bar hides massive individual variability.", {
      x: 9.6, y: 2.7, w: 3.2, h: 1.3,
      fontFace: F.header, fontSize: 16, color: C.textLight, bold: true, margin: 0,
    });
    s.addText("For any given IPI, some subjects show a strong positive effect while others show a strong negative one. A fixed protocol averages the signal away.", {
      x: 9.6, y: 4.1, w: 3.2, h: 2.0,
      fontFace: F.body, fontSize: 12, color: C.mutedLight, margin: 0,
    });
  }

  // ============================================================
  // SLIDE 5 — PIPELINE ARCHITECTURE
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("04 · PIPELINE ARCHITECTURE", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("From raw EEG to a single predictive feature.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 30, color: C.textDark, bold: true, margin: 0,
    });

    const stages = [
      { label: "Raw EEG", sub: "multi-ch · 256 Hz", icon: FaSignal },
      { label: "Artifact Rejection", sub: "Filters + manual\n+ ML-based epoch\nreconstruction", icon: FaFilter },
      { label: "Spectral Decomp.", sub: "FFT → amplitude\n+ phase per freq.", icon: FaWaveSquare },
      { label: "Phase Synchrony", sub: "Inter-hemispheric\nphase-lag\n(13–16 Hz)", icon: FaExchangeAlt },
      { label: "Biomarker", sub: "Per-subject\npropagation time\nestimate", icon: FaCheckCircle },
    ];

    const stageW = 2.2, stageH = 2.4;
    const startX = 0.7, y = 2.4;
    const gap = 0.3;

    for (let i = 0; i < stages.length; i++) {
      const st = stages[i];
      const x = startX + i * (stageW + gap);

      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: stageW, h: stageH,
        fill: { color: C.darkBg }, line: { type: "none" },
      });
      const iconData = await iconPng(st.icon, "#" + C.accent, 256);
      s.addImage({ data: iconData, x: x + stageW / 2 - 0.35, y: y + 0.3, w: 0.7, h: 0.7 });
      s.addText(st.label, {
        x: x + 0.1, y: y + 1.1, w: stageW - 0.2, h: 0.45,
        fontFace: F.header, fontSize: 13, color: C.textLight, bold: true,
        align: "center", margin: 0,
      });
      s.addText(st.sub, {
        x: x + 0.15, y: y + 1.55, w: stageW - 0.3, h: 0.8,
        fontFace: F.body, fontSize: 10, color: C.mutedLight,
        align: "center", margin: 0,
      });

      if (i < stages.length - 1) {
        const arrowX = x + stageW + 0.05;
        s.addShape(pres.shapes.RIGHT_TRIANGLE, {
          x: arrowX, y: y + stageH / 2 - 0.08, w: 0.2, h: 0.16,
          fill: { color: C.accent }, line: { type: "none" }, rotate: 90,
        });
      }
    }

    s.addText("KEY INSIGHT", {
      x: 0.7, y: 5.2, w: 4, h: 0.3,
      fontFace: F.body, fontSize: 10, color: C.accent, charSpacing: 3, bold: true, margin: 0,
    });
    s.addText("The pipeline is domain-agnostic: replace \"EEG channels\" with any multi-sensor time series (ECG leads, accelerometer axes, RF antennas) and the entire downstream flow applies. Phase-synchrony between sensors is a cross-domain feature.", {
      x: 0.7, y: 5.55, w: 12, h: 1.3,
      fontFace: F.body, fontSize: 13, color: C.textDark, italic: true, margin: 0,
    });
  }

  // ============================================================
  // SLIDE 6 — THE CORE METHOD (code) — fix formula wrap
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("05 · THE CORE METHOD", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("Phase-lag as a physical measure of signal propagation.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 28, color: C.textDark, bold: true, margin: 0,
    });

    s.addText("THE IDEA", {
      x: 0.7, y: 2.1, w: 5.5, h: 0.3,
      fontFace: F.body, fontSize: 10, color: C.accent, charSpacing: 3, bold: true, margin: 0,
    });
    s.addText("Two electrodes watching the same oscillating cortical signal see it at slightly different times. The phase difference between them — at a given frequency — is proportional to how long the signal took to travel across the brain.", {
      x: 0.7, y: 2.45, w: 5.5, h: 1.6,
      fontFace: F.body, fontSize: 13, color: C.textDark, margin: 0,
    });

    // Formula — reduced font size to fit one line
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 4.1, w: 5.5, h: 1.1,
      fill: { color: C.offWhite }, line: { color: C.border, width: 1 },
    });
    s.addText([
      { text: "prop_time = ", options: { color: C.textDark } },
      { text: "(1000/f) × (Δφ/2π)", options: { bold: true, color: C.accent } },
    ], {
      x: 0.9, y: 4.3, w: 5.1, h: 0.5,
      fontFace: F.mono, fontSize: 14, margin: 0, align: "center",
    });
    s.addText("where Δφ = angle(E₂) − angle(E₁) at frequency f", {
      x: 0.9, y: 4.75, w: 5.1, h: 0.35,
      fontFace: F.body, fontSize: 11, color: C.muted, italic: true, align: "center", margin: 0,
    });

    s.addText("DESIGN CHOICE", {
      x: 0.7, y: 5.4, w: 5.5, h: 0.3,
      fontFace: F.body, fontSize: 10, color: C.accent, charSpacing: 3, bold: true, margin: 0,
    });
    s.addText("Averaged across 13–16 Hz (high-alpha/low-beta). Chosen empirically: narrow band for phase stability, away from mu-rhythm artifacts.", {
      x: 0.7, y: 5.75, w: 5.5, h: 1.1,
      fontFace: F.body, fontSize: 12, color: C.textDark, margin: 0,
    });

    s.addText("IMPLEMENTATION (MATLAB)", {
      x: 6.8, y: 2.1, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 10, color: C.accent, charSpacing: 3, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.8, y: 2.45, w: 6.0, h: 4.4,
      fill: { color: C.darkBg }, line: { type: "none" },
    });
    const code = [
      { text: "% Phase difference across hemispheres", options: { color: "64748B", breakLine: true } },
      { text: "phaseDiff = angle(F4) - angle(F3);", options: { color: C.textLight, breakLine: true } },
      { text: "phaseDiff_abs = abs(phaseDiff);", options: { color: C.textLight, breakLine: true } },
      { text: "", options: { breakLine: true } },
      { text: "% Average across 13-16 Hz band", options: { color: "64748B", breakLine: true } },
      { text: "band = freqs > 13 & freqs < 16;", options: { color: C.textLight, breakLine: true } },
      { text: "phaseDiff_band = mean(phaseDiff_abs(:,band), 2);", options: { color: C.textLight, breakLine: true } },
      { text: "", options: { breakLine: true } },
      { text: "% Convert to propagation time (ms)", options: { color: "64748B", breakLine: true } },
      { text: "propTime = (1000 ./ freqs(band)) .* ...", options: { color: C.textLight, breakLine: true } },
      { text: "           (phaseDiff_band ./ (2 * pi));", options: { color: C.textLight, breakLine: true } },
      { text: "", options: { breakLine: true } },
      { text: "% Per-subject estimate", options: { color: "64748B", breakLine: true } },
      { text: "subjectFeature = mean(propTime, 'all');", options: { color: C.accent } },
    ];
    s.addText(code, {
      x: 7.0, y: 2.6, w: 5.7, h: 4.1,
      fontFace: F.mono, fontSize: 12, margin: 0, paraSpaceAfter: 2,
    });
  }

  // ============================================================
  // SLIDE 7 — MAIN RESULT — clean r=0.49 image
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("06 · RESULTS", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("The feature predicts what we hoped.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 30, color: C.textDark, bold: true, margin: 0,
    });

    s.addText("The extracted per-subject phase-lag correlates significantly with the individually optimal IPI — subjects with longer inter-hemispheric propagation times need longer inter-pulse intervals to maximize stimulation response.", {
      x: 0.7, y: 2.1, w: 5.5, h: 2.2,
      fontFace: F.body, fontSize: 14, color: C.textDark, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 4.5, w: 5.5, h: 2.3,
      fill: { color: C.darkBg }, line: { type: "none" },
    });
    s.addText("r = 0.49", {
      x: 0.7, y: 4.65, w: 5.5, h: 1.0,
      fontFace: F.header, fontSize: 60, color: C.accent, bold: true,
      align: "center", margin: 0,
    });
    s.addText([
      { text: "p = 0.015  ", options: { color: C.textLight, bold: true } },
      { text: "·  linear regression, 2-tailed", options: { color: C.mutedLight } },
    ], {
      x: 0.7, y: 5.75, w: 5.5, h: 0.4,
      fontFace: F.body, fontSize: 14, align: "center", margin: 0,
    });
    s.addText("Right hemisphere stimulation site (F4 electrode)", {
      x: 0.7, y: 6.2, w: 5.5, h: 0.4,
      fontFace: F.body, fontSize: 12, color: C.mutedLight, italic: true,
      align: "center", margin: 0,
    });

    // Clean single scatter
    s.addImage({
      path: "Screenshot 2026-04-21 at 22.14.29.png",
      x: 6.5, y: 2.0, w: 6.5, h: 4.8, sizing: { type: "contain", w: 6.5, h: 4.8 },
    });
  }

  // ============================================================
  // SLIDE 8 — VALIDATION
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("07 · VALIDATION", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("Not an artifact — the asymmetry is meaningful.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 28, color: C.textDark, bold: true, margin: 0,
    });

    const col1 = { x: 0.7, y: 2.2, w: 6.0, h: 4.6, label: "RIGHT HEMISPHERE (F4)", r: "r = 0.49", p: "p = 0.015", tag: "Significant", tagColor: C.success };
    const col2 = { x: 7.0, y: 2.2, w: 6.0, h: 4.6, label: "LEFT HEMISPHERE (F3)", r: "r = 0.04", p: "p = 0.85", tag: "Not significant", tagColor: C.muted };

    for (const col of [col1, col2]) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: col.x, y: col.y, w: col.w, h: col.h,
        fill: { color: C.offWhite }, line: { color: C.border, width: 1 },
      });
      s.addText(col.label, {
        x: col.x + 0.2, y: col.y + 0.2, w: col.w - 0.4, h: 0.35,
        fontFace: F.body, fontSize: 10, color: C.accent, charSpacing: 3, bold: true, margin: 0,
      });
      s.addText(col.r, {
        x: col.x + 0.2, y: col.y + 0.6, w: col.w - 0.4, h: 0.7,
        fontFace: F.header, fontSize: 36, color: C.textDark, bold: true, margin: 0,
      });
      s.addText(col.p, {
        x: col.x + 0.2, y: col.y + 1.3, w: col.w - 0.4, h: 0.35,
        fontFace: F.body, fontSize: 14, color: C.muted, margin: 0,
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: col.x + 0.2, y: col.y + 1.75, w: 1.8, h: 0.38,
        fill: { color: col.tagColor }, line: { type: "none" },
      });
      s.addText(col.tag, {
        x: col.x + 0.2, y: col.y + 1.75, w: 1.8, h: 0.38,
        fontFace: F.body, fontSize: 11, color: "FFFFFF", bold: true,
        align: "center", valign: "middle", margin: 0,
      });
      const interp = col.label.includes("RIGHT")
        ? "Phase-lag at this site tracks the true conduction delay for the stimulated circuit."
        : "Left-hemisphere phase-lag is dominated by other dynamics — the biomarker is site-specific, as expected biologically.";
      s.addText(interp, {
        x: col.x + 0.2, y: col.y + 2.4, w: col.w - 0.4, h: 1.9,
        fontFace: F.body, fontSize: 12, color: C.textDark, margin: 0,
      });
    }

    s.addText("Why this matters: the control direction is null, which rules out the main confound that the correlation is driven by some subject-level nuisance variable.", {
      x: 0.7, y: 6.95, w: 12.3, h: 0.5,
      fontFace: F.body, fontSize: 12, color: C.muted, italic: true, margin: 0,
    });
  }

  // ============================================================
  // SLIDE 9 — REPLICATION — clean r=0.56 image
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("08 · REPLICATION", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("A second, related feature replicates the signal.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 28, color: C.textDark, bold: true, margin: 0,
    });

    s.addText("If the phase-lag story is real, a related metric — the signed mean phase difference across all 9 conditions — should also predict the magnitude of the PAS-induced effect at each subject's optimal IPI.", {
      x: 0.7, y: 2.1, w: 5.6, h: 1.8,
      fontFace: F.body, fontSize: 13, color: C.textDark, margin: 0,
    });
    s.addText("It does:", {
      x: 0.7, y: 4.0, w: 5.6, h: 0.4,
      fontFace: F.body, fontSize: 13, color: C.textDark, bold: true, margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 4.5, w: 5.6, h: 2.3,
      fill: { color: C.darkBg }, line: { type: "none" },
    });
    s.addText("r = 0.56", {
      x: 0.7, y: 4.65, w: 5.6, h: 1.0,
      fontFace: F.header, fontSize: 60, color: C.accent, bold: true, align: "center", margin: 0,
    });
    s.addText([
      { text: "p = 0.0042  ", options: { color: C.textLight, bold: true } },
      { text: "·  stronger than the primary finding", options: { color: C.mutedLight } },
    ], {
      x: 0.7, y: 5.75, w: 5.6, h: 0.4,
      fontFace: F.body, fontSize: 13, align: "center", margin: 0,
    });
    s.addText("Phase-delay → induced Δpower at optimal IPI", {
      x: 0.7, y: 6.2, w: 5.6, h: 0.4,
      fontFace: F.body, fontSize: 11, color: C.mutedLight, italic: true,
      align: "center", margin: 0,
    });

    s.addImage({
      path: "Screenshot 2026-04-21 at 22.14.23.png",
      x: 6.5, y: 2.0, w: 6.5, h: 4.8, sizing: { type: "contain", w: 6.5, h: 4.8 },
    });
  }

  // ============================================================
  // SLIDE 10 — WHAT THIS ENABLES (renamed from IMPACT, no +25%)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("09 · WHAT THIS ENABLES", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("From a fixed protocol to subject-tailored stimulation.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 28, color: C.textDark, bold: true, margin: 0,
    });

    // Three icon-led content blocks spanning the slide
    const enablePoints = [
      {
        icon: FaUserCog,
        title: "Pre-session EEG → IPI recommendation",
        body: "A 5-minute resting-state EEG — collected before the first therapy session — is enough to extract the biomarker and select an IPI from the discrete set {4, 8, 16, 32 ms}. No additional hardware, no behavioral task.",
      },
      {
        icon: FaUsers,
        title: "Who is unlikely to respond",
        body: "Subjects whose propagation time falls outside the range where any discrete IPI provides a good match are flagged as likely non-responders — information a clinician can act on before committing to a multi-week course.",
      },
      {
        icon: FaFlask,
        title: "A motivated next study",
        body: "An observational correlation is not a clinical result. The natural follow-up is a randomized controlled trial with stimulation individually adjusted from the biomarker, versus the current fixed protocol.",
      },
    ];

    const blockH = 1.35;
    for (let i = 0; i < enablePoints.length; i++) {
      const pt = enablePoints[i];
      const y = 2.2 + i * (blockH + 0.2);

      // Icon in colored circle
      s.addShape(pres.shapes.OVAL, {
        x: 0.7, y: y + 0.15, w: 0.9, h: 0.9,
        fill: { color: C.accent }, line: { type: "none" },
      });
      const iconData = await iconPng(pt.icon, "#FFFFFF", 256);
      s.addImage({ data: iconData, x: 0.9, y: y + 0.35, w: 0.5, h: 0.5 });

      s.addText(pt.title, {
        x: 1.9, y, w: 11, h: 0.5,
        fontFace: F.header, fontSize: 18, color: C.textDark, bold: true, margin: 0,
      });
      s.addText(pt.body, {
        x: 1.9, y: y + 0.55, w: 11, h: 0.85,
        fontFace: F.body, fontSize: 12, color: C.muted, margin: 0,
      });
    }

    s.addText("Findings contributed to internal R&D discussion at Brainsway's Deep-TMS clinical trial program.", {
      x: 0.7, y: 6.8, w: 12.0, h: 0.4,
      fontFace: F.body, fontSize: 11, color: C.muted, italic: true, margin: 0,
    });
  }

  // ============================================================
  // SLIDE 11 — TRANSFERABILITY
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.lightBg };

    s.addText("10 · TRANSFERABILITY", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("Same pipeline, other domains.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 30, color: C.textDark, bold: true, margin: 0,
    });
    s.addText("The techniques used here — multi-sensor spectral decomposition, inter-channel phase-synchrony, per-subject feature extraction — generalize directly to any multi-channel time-series domain:", {
      x: 0.7, y: 2.0, w: 12.0, h: 1.0,
      fontFace: F.body, fontSize: 14, color: C.textDark, margin: 0,
    });

    const domains = [
      { icon: FaBrain, title: "Biosignal", ex: "ECG arrhythmia\nsleep staging\nmotor imagery BCI" },
      { icon: FaMicrochip, title: "IoT & Sensors", ex: "bearing fault detection\nstructural health\naccelerometer arrays" },
      { icon: FaSignal, title: "RF & Comms", ex: "MIMO channel analysis\ndirection-of-arrival\nradar signatures" },
      { icon: FaWaveSquare, title: "Acoustic", ex: "source localization\ndrone detection\nindustrial audio" },
    ];

    const cardW = 3.0, cardH = 2.9;
    for (let i = 0; i < domains.length; i++) {
      const d = domains[i];
      const x = 0.7 + i * (cardW + 0.15);
      const y = 3.3;

      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: cardW, h: cardH,
        fill: { color: C.offWhite }, line: { color: C.border, width: 1 },
      });
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7,
        fill: { color: C.accent }, line: { type: "none" },
      });
      const iconData = await iconPng(d.icon, "#FFFFFF", 256);
      s.addImage({ data: iconData, x: x + 0.43, y: y + 0.43, w: 0.44, h: 0.44 });
      s.addText(d.title, {
        x: x + 0.3, y: y + 1.15, w: cardW - 0.6, h: 0.45,
        fontFace: F.header, fontSize: 18, color: C.textDark, bold: true, margin: 0,
      });
      s.addText(d.ex, {
        x: x + 0.3, y: y + 1.65, w: cardW - 0.6, h: 1.2,
        fontFace: F.body, fontSize: 12, color: C.muted, margin: 0, paraSpaceAfter: 2,
      });
    }

    s.addText("The domain is neuroscience. The methodology is signal processing.", {
      x: 0.7, y: 6.5, w: 12, h: 0.5,
      fontFace: F.header, fontSize: 16, color: C.accent, italic: true, bold: true, margin: 0,
    });
  }

  // ============================================================
  // SLIDE 12 — STACK & CONTACT
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: C.darkBg };

    s.addShape(pres.shapes.OVAL, {
      x: -1, y: 5.5, w: 4, h: 4,
      fill: { color: C.accent, transparency: 88 }, line: { type: "none" },
    });

    s.addText("11 · STACK & CONTACT", {
      x: 0.7, y: 0.5, w: 6, h: 0.3,
      fontFace: F.body, fontSize: 11, color: C.accent, charSpacing: 4, bold: true, margin: 0,
    });
    s.addText("Built with.", {
      x: 0.7, y: 0.9, w: 12, h: 0.9,
      fontFace: F.header, fontSize: 30, color: C.textLight, bold: true, margin: 0,
    });

    const stack = [
      { cat: "Signal Processing", items: "MATLAB · FFT · EEGLAB" },
      { cat: "Statistical Analysis", items: "linear models · correlation · bootstrap" },
      { cat: "Data Engineering", items: "multi-session time series · artifact pipelines" },
      { cat: "Deliverables", items: "conference poster · internal R&D findings" },
    ];
    stack.forEach((item, i) => {
      const row = Math.floor(i / 2), col = i % 2;
      const x = 0.7 + col * 6.2;
      const y = 2.2 + row * 1.2;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 0.04, h: 0.9,
        fill: { color: C.accent }, line: { type: "none" },
      });
      s.addText(item.cat.toUpperCase(), {
        x: x + 0.2, y, w: 5.8, h: 0.35,
        fontFace: F.body, fontSize: 10, color: C.accent, charSpacing: 3, bold: true, margin: 0,
      });
      s.addText(item.items, {
        x: x + 0.2, y: y + 0.4, w: 5.8, h: 0.55,
        fontFace: F.body, fontSize: 15, color: C.textLight, margin: 0,
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 5.1, w: 1.5, h: 0.04,
      fill: { color: C.accent }, line: { type: "none" },
    });
    s.addText("Yarden Viktor Dejorno", {
      x: 0.7, y: 5.25, w: 10, h: 0.5,
      fontFace: F.header, fontSize: 22, color: C.textLight, bold: true, margin: 0,
    });
    s.addText("ML Engineer · Time-Series & Signal Processing", {
      x: 0.7, y: 5.75, w: 10, h: 0.4,
      fontFace: F.body, fontSize: 13, color: C.mutedLight, margin: 0,
    });

    const contacts = [
      { icon: FaEnvelope, text: "hrsi56@gmail.com" },
      { icon: FaLinkedin, text: "linkedin.com/in/yvdejorno" },
      { icon: FaGithub, text: "github.com/hrsi56" },
    ];
    for (let i = 0; i < contacts.length; i++) {
      const c = contacts[i];
      const x = 0.7 + i * 4.2;
      const y = 6.5;
      const iconData = await iconPng(c.icon, "#" + C.accent, 256);
      s.addImage({ data: iconData, x, y: y + 0.02, w: 0.3, h: 0.3 });
      s.addText(c.text, {
        x: x + 0.4, y, w: 3.7, h: 0.4,
        fontFace: F.body, fontSize: 12, color: C.textLight, margin: 0,
      });
    }
  }

  await pres.writeFile({ fileName: "/Users/djourno/Downloads/yarden_deck_v2.pptx" });
  console.log("Deck v2 written.");
}

buildDeck().catch(e => { console.error(e); process.exit(1); });
