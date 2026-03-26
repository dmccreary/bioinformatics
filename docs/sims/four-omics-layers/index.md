---
title: The Four Omics Layers
description: Interactive vis-network diagram showing four horizontal omics layers (genomics, transcriptomics, proteomics, metabolomics) with cancer-related genes connected by intra-layer and cross-layer edges.
image: /sims/four-omics-layers/four-omics-layers.png
og:image: /sims/four-omics-layers/four-omics-layers.png
twitter:image: /sims/four-omics-layers/four-omics-layers.png
social:
   cards: false
quality_score: 3
---

# The Four Omics Layers

<iframe src="main.html" height="550" width="100%" scrolling="no"></iframe>

[Run the The Four Omics Layers MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes the **multi-omics landscape** of cancer biology as a four-tiered force-directed network. Each horizontal layer represents a different omics level, and edges connect molecules both within and across layers to show how genetic information flows from genome to metabolome.

### The Four Layers

- **Genomics** (blue, bottom) — Gene loci including BRCA1, TP53, EGFR, and MYC, with edges representing co-alteration or co-amplification patterns
- **Transcriptomics** (green) — mRNA transcripts and regulatory RNAs like miR-21, with edges for co-expression and regulatory relationships
- **Proteomics** (orange) — Protein products and their physical interactions, including key signaling proteins like AKT
- **Metabolomics** (red, top) — Small molecules (glucose, glutamine, lactate, ATP) linked by metabolic reactions

### Cross-Layer Connections

Vertical edges connecting layers represent the biological processes that link omics levels:

- **Gene → mRNA** edges represent transcription
- **mRNA → Protein** edges represent translation
- **Protein → Metabolite** edges represent enzymatic regulation (e.g., MYC upregulates glutamine metabolism, EGFR stimulates glucose uptake)

### Why This Matters for Bioinformatics

Multi-omics integration is a central challenge in modern bioinformatics. Understanding how mutations at the genomic level propagate through transcription and translation to alter metabolic phenotypes is essential for identifying drug targets, explaining why some mutations have large phenotypic effects, and building predictive models that integrate data across biological scales.

## How to Use

1. **Hover** over any node to see its description in a tooltip — each molecule is annotated with its biological role and clinical significance
2. **Drag** nodes to rearrange the layout and explore connections
3. **Scroll** to zoom in on specific layers or regions
4. **Trace cross-layer paths** — Follow a gene from the genomics layer up through transcription, translation, and metabolic effects to see the full information flow

### Suggested Exploration

- Start at EGFR in the genomics layer and trace its path upward: EGFR gene → EGFR mRNA → EGFR protein → glucose uptake. This shows how a single gene amplification can rewire cellular metabolism.
- Find miR-21 in the transcriptomics layer. Notice it suppresses TP53 mRNA — a regulatory relationship that doesn't follow the simple gene → mRNA → protein flow.
- Compare the connectivity of MYC across layers: it is co-amplified with EGFR at the genomic level, co-expressed at the transcript level, and directly upregulates glutamine metabolism at the protein-metabolite interface.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/four-omics-layers/main.html"
        height="550"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of the central dogma (DNA → RNA → Protein)
- Familiarity with gene expression and protein function
- Basic knowledge of metabolic pathways and small molecules

### Activities

1. **Layer Exploration** (5 min): Start at the bottom (genomics) layer. Hover over each node and read its description. Move up through each layer and note how the same gene name appears at different omics levels (e.g., BRCA1 gene, BRCA1 mRNA, BRCA1 protein).
2. **Cross-Layer Tracing** (5 min): Choose TP53 and trace its full path from gene to protein. Then find all nodes that TP53's protein product interacts with. How does a TP53 mutation potentially affect the proteomics layer?
3. **Regulatory Complexity** (5 min): Find miR-21 in the transcriptomics layer. This microRNA suppresses TP53 mRNA. Discuss: if miR-21 is overexpressed in a tumor, what happens to p53 protein levels? What downstream effects would you predict?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. Name the four omics layers and give one example of a molecule type found at each level.
2. Why is multi-omics integration more informative than studying a single omics layer in isolation?
3. Trace the path from EGFR gene to glucose metabolism. What does this tell you about the Warburg effect in cancer cells?
4. How could a mutation in the TP53 gene affect molecules at the proteomics and metabolomics layers?

## References

1. [Omics — Wikipedia](https://en.wikipedia.org/wiki/Omics)
2. [Multi-omics — Wikipedia](https://en.wikipedia.org/wiki/Multi-omics)
3. [Warburg effect (oncology) — Wikipedia](https://en.wikipedia.org/wiki/Warburg_effect_(oncology))
4. [Systems biology — Wikipedia](https://en.wikipedia.org/wiki/Systems_biology)
5. [MYC — Wikipedia](https://en.wikipedia.org/wiki/Myc)
