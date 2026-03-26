---
title: FASTQ Quality Control Pipeline
description: Interactive vis-network flowchart showing the FASTQ quality control pipeline steps with decision nodes for filtering low-quality reads and adapter contamination.
image: /sims/fastq-qc-pipeline/fastq-qc-pipeline.png
og:image: /sims/fastq-qc-pipeline/fastq-qc-pipeline.png
twitter:image: /sims/fastq-qc-pipeline/fastq-qc-pipeline.png
social:
   cards: false
quality_score: 3
---

# FASTQ Quality Control Pipeline

<iframe src="main.html" height="580" width="100%" scrolling="no"></iframe>

[Run the FASTQ Quality Control Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim presents the **FASTQ quality control pipeline** as an interactive directed flowchart. Each node represents a processing step or decision point, showing how raw sequencing reads are filtered and trimmed before downstream analysis.

### Pipeline Steps

1. **Raw FASTQ** — Unprocessed sequencing reads with quality scores
2. **Quality Assessment** — Tools like FastQC evaluate per-base quality, GC content, adapter contamination, and read length distribution
3. **Adapter Trimming** — Remove adapter sequences ligated during library preparation (Trimmomatic, Cutadapt)
4. **Quality Filtering** — Remove reads below a quality threshold (e.g., Phred < 20)
5. **Length Filtering** — Remove reads shorter than a minimum length after trimming
6. **Deduplication** — Optional removal of PCR duplicate reads
7. **Clean FASTQ** — High-quality reads ready for alignment or assembly

### Decision Nodes

The flowchart includes decision points where reads pass or fail quality criteria, illustrating how different QC steps filter the data and how the filtering criteria affect the final read count.

## How to Use

1. **Click** any pipeline step to see its description, the tools commonly used, and the parameters involved
2. **Follow the flow** — Trace reads from raw input through each processing step to clean output
3. **Identify decision points** — See where reads are filtered out and why

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/fastq-qc-pipeline/main.html"
        height="580"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of DNA sequencing (Illumina short reads)
- Concept of Phred quality scores
- Awareness that raw data requires preprocessing

### Activities

1. **Exploration** (5 min): Click each pipeline step in order. For each, note what problem it addresses and what tool is commonly used.
2. **Parameter Discussion** (5 min): What happens if you set the quality threshold too high? Too low? Discuss the trade-off between read quality and read quantity.
3. **Pipeline Design** (5 min): If you were analyzing RNA-seq data vs. whole-genome sequencing, would you change any QC parameters? Why?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. Why is quality control the first step in any sequencing analysis pipeline?
2. What is a Phred quality score, and what does a Phred score of 30 mean?
3. Why must adapter sequences be removed before alignment?
4. What are the risks of over-filtering (too strict QC) vs. under-filtering (too lenient QC)?

## References

1. [FASTQ format — Wikipedia](https://en.wikipedia.org/wiki/FASTQ_format)
2. [Phred quality score — Wikipedia](https://en.wikipedia.org/wiki/Phred_quality_score)
3. [DNA sequencing — Wikipedia](https://en.wikipedia.org/wiki/DNA_sequencing)
4. [Sequence assembly — Wikipedia](https://en.wikipedia.org/wiki/Sequence_assembly)
