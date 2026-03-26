---
title: Cell Signaling Cascade Overview
description: Interactive vis-network showing the MAPK/ERK signaling cascade as a directed graph from receptor through adaptor, RAF, MEK, ERK to transcription factors, with feedback loops and cellular compartment coloring.
image: /sims/signaling-cascade-overview/signaling-cascade-overview.png
og:image: /sims/signaling-cascade-overview/signaling-cascade-overview.png
twitter:image: /sims/signaling-cascade-overview/signaling-cascade-overview.png
social:
   cards: false
quality_score: 3
---

# Cell Signaling Cascade Overview

<iframe src="main.html" height="570" width="100%" scrolling="no"></iframe>

[Run the Cell Signaling Cascade Overview MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes the **MAPK/ERK signaling cascade** as a directed graph. The pathway flows from a cell surface receptor through adaptor proteins, kinase cascade (RAF → MEK → ERK), to transcription factors in the nucleus. Feedback loops are shown as curved edges, and nodes are colored by cellular compartment.

### Pathway Components

- **Receptor** (cell membrane) — Receives extracellular signal (e.g., growth factor)
- **Adaptor** (cytoplasm) — Bridges receptor to intracellular signaling (e.g., GRB2, SOS)
- **RAF → MEK → ERK** (cytoplasm) — Sequential kinase cascade where each kinase phosphorylates and activates the next
- **Transcription Factors** (nucleus) — ERK phosphorylates TFs (e.g., JUN, FOS) that activate gene expression
- **Feedback loops** — Negative feedback from ERK back to upstream components regulates signal strength

### Cellular Compartments

Nodes are colored by location: membrane (gray), cytoplasm (blue), and nucleus (green), showing how signals traverse cellular compartments.

## How to Use

1. **Follow the cascade** — Trace the directed edges from receptor to transcription factors
2. **Identify feedback loops** — Find curved edges that point backward (upstream)
3. **Hover** for protein names and roles
4. **Click** nodes to highlight all their connections

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/signaling-cascade-overview/main.html"
        height="570"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of cell signaling and signal transduction
- Concept of kinases and phosphorylation
- Basic knowledge of gene regulation

### Activities

1. **Exploration** (5 min): Trace the pathway from receptor to transcription factors. How many kinase steps are there? Why is this called a "cascade"?
2. **Feedback Analysis** (5 min): Identify all feedback loops. Are they positive or negative? What is the biological purpose of negative feedback in signaling?
3. **Discussion** (5 min): Many cancer drugs target components of the MAPK pathway (e.g., BRAF inhibitors). Using this diagram, predict what would happen if you inhibited MEK. Would the feedback loop compensate?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is signal amplification, and how does the kinase cascade achieve it?
2. Why are feedback loops essential for controlling signaling pathway output?
3. The BRAF V600E mutation makes BRAF constitutively active. Trace the downstream effects using this cascade diagram.
4. How does representing a signaling pathway as a directed graph help identify drug targets?

## References

1. [MAPK/ERK pathway — Wikipedia](https://en.wikipedia.org/wiki/MAPK/ERK_pathway)
2. [Signal transduction — Wikipedia](https://en.wikipedia.org/wiki/Signal_transduction)
3. [Kinase — Wikipedia](https://en.wikipedia.org/wiki/Kinase)
4. [Feedback — Wikipedia](https://en.wikipedia.org/wiki/Feedback)
