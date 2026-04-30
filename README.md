# Alpha-Band Phase-Lag as a Predictive Biomarker for TMS Optimization

> A per-subject EEG feature that predicts individually optimal stimulation timing for Deep-TMS therapy.
> **r = 0.49, p = 0.015** — validated with a null control and an independent replication.

**🔗 [Full Technical Deck → hrsi56.github.io/isi-TMS](https://hrsi56.github.io/isi-TMS/)**

---

## TL;DR

Transcranial Magnetic Stimulation (TMS) therapy currently uses a **fixed inter-pulse interval (IPI = 8 ms)** for all patients. Clinical response varies widely.

This project extracts a **per-subject biomarker** from 5 minutes of resting-state EEG that predicts each individual's optimal IPI — turning a one-size-fits-all protocol into a personalized one.

The core feature is the **inter-hemispheric phase-lag** in the 13–16 Hz band, interpreted as a physical signal-propagation time across the brain.

---

## The Problem

| Current practice | What this work proposes |
| --- | --- |
| Fixed IPI (8 ms) for every patient | Per-subject IPI ∈ {4, 8, 16, 32} ms |
| Decisions driven by population averages | Decisions driven by individual EEG features |
| Amplitude-based features | Phase-based features |

**Constraint:** N = 24 subjects, 9 sessions each. Deep learning is out — the work lives in principled feature engineering.

---

## Method

```
Raw EEG (multi-channel, 256 Hz)
        │
        ▼
Artifact rejection  (filters + manual + ML-based epoch reconstruction)
        │
        ▼
FFT  →  amplitude + phase per frequency
        │
        ▼
Inter-hemispheric phase difference  (F4 vs F3)
        │
        ▼
Average across 13–16 Hz band
        │
        ▼
Convert to propagation time:   prop_time = (1000 / f) × (Δφ / 2π)
        │
        ▼
Per-subject scalar biomarker
```

**Physical intuition:** two electrodes watching the same cortical oscillation see it at slightly different times. The phase difference between them, at a given frequency, encodes how long the signal took to travel.

---

## Results

| Metric | Value | Interpretation |
| --- | --- | --- |
| Phase-lag at F4 → optimal IPI | **r = 0.49, p = 0.015** | Primary finding |
| Phase-lag at F3 (control site) | r = 0.04, p = 0.85 | Null — biomarker is site-specific, as expected |
| Replication on a related metric | **r = 0.56, p = 0.004** | Effect reproduces independently |

Subjects with longer inter-hemispheric propagation times require longer IPIs to maximize stimulation response — consistent with the biophysical interpretation.

The null result on the contralateral site rules out the main confound — that the correlation is driven by some subject-level nuisance variable.

---

## What This Enables

- **Pre-session EEG → IPI recommendation.** A 5-minute resting-state recording before the first therapy session is enough to choose an IPI from {4, 8, 16, 32} ms. No additional hardware, no behavioral task.
- **Identifying likely non-responders.** Subjects whose propagation time falls outside the range covered by any discrete IPI can be flagged before committing to a multi-week course.
- **A motivated next study.** An observational correlation isn't a clinical result — the natural follow-up is a randomized trial comparing biomarker-tuned stimulation against the fixed protocol.

---

## Why This Generalizes

The methodology is domain-agnostic. Replace "EEG channels" with any multi-sensor time series:

- **Biosignal** — ECG arrhythmia detection, sleep staging, motor-imagery BCI
- **IoT & sensors** — bearing fault detection, structural health monitoring, accelerometer arrays
- **RF & comms** — MIMO channel analysis, direction-of-arrival, radar signatures
- **Acoustic** — source localization, drone detection, industrial audio

The domain is neuroscience. The pipeline is signal processing.

---

## Stack

- **Signal processing** — MATLAB, FFT, EEGLAB
- **Statistical analysis** — linear models, correlation, bootstrap
- **Data engineering** — multi-session multi-channel time series, artifact pipelines

---

## Context

Conducted at **Brainsway Deep-TMS R&D Lab** (2021–2022) as part of an ongoing clinical study. Findings contributed to internal R&D discussion.

---

## Author

**Yarden Viktor Dejorno** — ML Engineer · Time-Series & Signal Processing

- 📧 [hrsi56@gmail.com](mailto:hrsi56@gmail.com)
- 🔗 [linkedin.com/in/yvdejorno](https://linkedin.com/in/yvdejorno)
- 💻 [github.com/hrsi56](https://github.com/hrsi56)
