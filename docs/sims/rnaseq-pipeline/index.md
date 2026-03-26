---
title: RNA-Seq Pipeline Overview
description: Animated flowchart stepping through the RNA-seq pipeline from RNA extraction through library preparation, sequencing, QC/trimming, alignment, quantification, and differential expression analysis.
image: /sims/rnaseq-pipeline/rnaseq-pipeline.png
og:image: /sims/rnaseq-pipeline/rnaseq-pipeline.png
twitter:image: /sims/rnaseq-pipeline/rnaseq-pipeline.png
social:
   cards: false
quality_score: 3
---

# RNA-Seq Pipeline Overview

<iframe src="main.html" height="522" width="100%" scrolling="no"></iframe>

[Run the RNA-Seq Pipeline Overview MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim walks through the **RNA-seq pipeline** as an animated flowchart, from biological sample preparation through computational analysis.

### Pipeline Stages

1. **RNA Extraction** — Isolate total RNA from biological samples (cells, tissues)
2. **Library Preparation** — Convert RNA to cDNA, fragment, add adapters for sequencing
3. **Sequencing** — Generate millions of short reads on an Illumina platform
4. **QC / Trimming** — Assess read quality (FastQC), remove adapters and low-quality bases (Trimmomatic)
5. **Alignment** — Map reads to a reference genome or transcriptome (STAR, HISAT2)
6. **Quantification** — Count reads per gene to measure expression levels (featureCounts, Salmon)
7. **Differential Expression Analysis** — Identify genes with significant expression changes between conditions (DESeq2, edgeR)

## How to Use

1. **Step through** — Advance through each stage to see what processing occurs
2. **Read descriptions** — Each stage explains the biological purpose, computational tools, and output format
3. **Follow the data transformation** — Watch how RNA molecules become a table of differentially expressed genes

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/rnaseq-pipeline/main.html"
        height="522"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of gene expression (mRNA as a measure of gene activity)
- Basic concept of DNA sequencing
- Awareness of experimental design (conditions, replicates)

### Activities

1. **Exploration** (5 min): Step through all stages. At each, note the key tool and the output format.
2. **Wet Lab vs. Dry Lab** (5 min): Identify which stages are wet lab (bench work) and which are dry lab (computational). Where is the transition?
3. **Discussion** (5 min): Why do we need biological replicates for differential expression analysis? What happens to statistical power with only one replicate per condition?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. Why is library preparation necessary before sequencing RNA?
2. What is the difference between alignment-based quantification (STAR + featureCounts) and pseudo-alignment (Salmon)?
3. Why does differential expression analysis require statistical testing rather than simply comparing raw read counts?
4. Name two common tools for differential expression analysis and describe what statistical model they use.

## References

1. [RNA-Seq — Wikipedia](https://en.wikipedia.org/wiki/RNA-Seq)
2. [Gene expression profiling — Wikipedia](https://en.wikipedia.org/wiki/Gene_expression_profiling)
3. [Sequence alignment — Wikipedia](https://en.wikipedia.org/wiki/Sequence_alignment)
4. [Differential gene expression — Wikipedia](https://en.wikipedia.org/wiki/Differential_gene_expression)
