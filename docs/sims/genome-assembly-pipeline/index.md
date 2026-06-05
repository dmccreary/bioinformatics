---
title: Genome Assembly Pipeline Overview
description: Animated flowchart stepping through the genome assembly pipeline from raw reads through QC, k-mer counting, de Bruijn graph construction, contig assembly, scaffolding, gap filling, to final assembly.
image: /sims/genome-assembly-pipeline/genome-assembly-pipeline.png
og:image: /sims/genome-assembly-pipeline/genome-assembly-pipeline.png
twitter:image: /sims/genome-assembly-pipeline/genome-assembly-pipeline.png
social:
   cards: false
quality_score: 3
---

# Genome Assembly Pipeline Overview

<iframe src="main.html" height="640" width="100%" scrolling="no"></iframe>

[Run the Genome Assembly Pipeline Overview MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim presents the **genome assembly pipeline** as an animated, step-through flowchart. Students advance through each stage to understand how millions of short sequencing reads are transformed into a contiguous genome assembly.

### Pipeline Stages

1. **Raw Reads** — Millions of short DNA sequences (100-300 bp) from a sequencing machine
2. **QC Filter** — Remove low-quality reads, trim adapters, filter contaminants
3. **K-mer Counting** — Count all k-length subsequences to estimate genome size and detect errors
4. **De Bruijn Graph** — Construct the assembly graph where k-mers define edges between (k-1)-mer nodes
5. **Contigs** — Traverse the graph to produce contiguous sequences (contigs)
6. **Scaffolding** — Use paired-end or mate-pair information to order and orient contigs
7. **Gap Filling** — Fill gaps between scaffolded contigs using overlap information
8. **Final Assembly** — The completed genome assembly in FASTA format

## How to Use

1. **Step through** — Advance through each pipeline stage to see what processing occurs
2. **Read descriptions** — Each stage explains the computational methods and tools used
3. **Follow the data flow** — Understand how raw reads are progressively transformed into a genome

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/genome-assembly-pipeline/main.html"
        height="640"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of DNA sequencing technologies
- Basic concept of k-mers and sequence overlap
- Familiarity with the de Bruijn graph concept

### Activities

1. **Exploration** (5 min): Step through all stages. At each, note what the input is, what processing occurs, and what the output is.
2. **Error Handling** (5 min): Sequencing errors create erroneous k-mers. At which pipeline stages are errors detected or corrected? How does k-mer counting help?
3. **Discussion** (5 min): Repetitive sequences (transposons, tandem repeats) are the main challenge in genome assembly. At which stage(s) do repeats cause problems? How does scaffolding help resolve ambiguities?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. Why is de Bruijn graph construction preferred over overlap-layout-consensus for short-read assembly?
2. What is the difference between a contig and a scaffold?
3. How does k-mer counting help estimate genome size before assembly?
4. Why are long reads (PacBio, Oxford Nanopore) sometimes used alongside short reads to improve assemblies?

## References

1. [Sequence assembly — Wikipedia](https://en.wikipedia.org/wiki/Sequence_assembly)
2. [De Bruijn graph — Wikipedia](https://en.wikipedia.org/wiki/De_Bruijn_graph)
3. [Contig — Wikipedia](https://en.wikipedia.org/wiki/Contig)
4. [Scaffolding (bioinformatics) — Wikipedia](https://en.wikipedia.org/wiki/Scaffolding_(bioinformatics))
