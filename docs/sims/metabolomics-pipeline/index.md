---
title: Metabolomics to Network Mapping Pipeline
description: Interactive p5.js pipeline flowchart stepping through metabolomics analysis from sample preparation through LC-MS/MS, feature extraction, statistical testing, and pathway enrichment.
image: /sims/metabolomics-pipeline/metabolomics-pipeline.png
og:image: /sims/metabolomics-pipeline/metabolomics-pipeline.png
twitter:image: /sims/metabolomics-pipeline/metabolomics-pipeline.png
social:
   cards: false
quality_score: 3
---

# Metabolomics to Network Mapping Pipeline

<iframe src="main.html" height="502" width="100%" scrolling="no"></iframe>

[Run the Metabolomics to Network Mapping Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim walks through the **metabolomics analysis pipeline**, from biological sample preparation through mass spectrometry analysis, computational feature extraction, statistical testing, and pathway enrichment mapping. Each stage includes an icon and description panel.

### Pipeline Stages

1. **Sample Preparation** — Biological samples (blood, tissue, cell lysate) are processed to extract metabolites
2. **LC-MS/MS** — Liquid chromatography coupled with tandem mass spectrometry separates and identifies metabolites by mass-to-charge ratio
3. **Feature Extraction** — Raw spectral data is processed into a feature table (metabolite x sample matrix of peak intensities)
4. **Statistical Testing** — Differential abundance analysis identifies metabolites that differ significantly between conditions
5. **Pathway Enrichment** — Significant metabolites are mapped onto known metabolic pathways to identify dysregulated pathways

## How to Use

1. **Step button** — Advance through each pipeline stage
2. **Read descriptions** — Each stage explains what happens, what tools are used, and what the output is
3. **Follow the data transformation** — Watch how raw biological samples become pathway-level insights

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/metabolomics-pipeline/main.html"
        height="502"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Basic understanding of metabolites and metabolic pathways
- Concept of mass spectrometry
- Familiarity with statistical hypothesis testing

### Activities

1. **Exploration** (5 min): Step through all stages. At each, note what the input and output are.
2. **Method Comparison** (5 min): How is the metabolomics pipeline similar to and different from an RNA-seq pipeline? Both start with biological samples and end with pathway-level insights.
3. **Discussion** (5 min): Metabolite identification is a major bottleneck — many detected features cannot be matched to known metabolites. How does this affect downstream analysis?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What instrument is used for metabolite detection, and what does it measure?
2. What is a feature table in metabolomics, and what does each cell represent?
3. How does pathway enrichment analysis help interpret a list of significant metabolites?
4. Why is metabolomics considered complementary to genomics and proteomics?

## References

1. [Metabolomics — Wikipedia](https://en.wikipedia.org/wiki/Metabolomics)
2. [Mass spectrometry — Wikipedia](https://en.wikipedia.org/wiki/Mass_spectrometry)
3. [Liquid chromatography-mass spectrometry — Wikipedia](https://en.wikipedia.org/wiki/Liquid_chromatography%E2%80%93mass_spectrometry)
4. [Metabolic pathway — Wikipedia](https://en.wikipedia.org/wiki/Metabolic_pathway)
