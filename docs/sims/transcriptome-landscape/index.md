---
title: The Transcriptome Landscape
description: Interactive cell diagram showing the transcriptome from DNA in the nucleus through different RNA types (mRNA, tRNA, rRNA, ncRNA), mRNA export, and alternative splicing, with toggle buttons for each RNA type.
image: /sims/transcriptome-landscape/transcriptome-landscape.png
og:image: /sims/transcriptome-landscape/transcriptome-landscape.png
twitter:image: /sims/transcriptome-landscape/transcriptome-landscape.png
social:
   cards: false
quality_score: 3
---

# The Transcriptome Landscape

<iframe src="main.html" height="562" width="100%" scrolling="no"></iframe>

[Run the The Transcriptome Landscape MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim presents the **transcriptome landscape** — the complete set of RNA molecules in a cell. A cell diagram shows DNA in the nucleus being transcribed into different RNA types, with toggle buttons that let students show or hide each RNA class to understand the diversity of the transcriptome.

### RNA Types

- **mRNA (messenger RNA)** — Carries protein-coding instructions from DNA to ribosomes. Only ~2-5% of the transcriptome by species count, but a large fraction by mass.
- **tRNA (transfer RNA)** — Adaptor molecules that match codons to amino acids during translation. ~600 genes in the human genome.
- **rRNA (ribosomal RNA)** — Structural and catalytic component of ribosomes. Comprises ~80% of total RNA by mass.
- **Non-coding RNA (ncRNA)** — Includes miRNA, lncRNA, snRNA, snoRNA. Regulatory functions including gene silencing, splicing, and chromatin modification.

### Additional Features

- **mRNA export** — Shows how processed mRNA moves from nucleus to cytoplasm through nuclear pores
- **Alternative splicing** — Illustrates how one gene can produce multiple mRNA variants by including different combinations of exons

## How to Use

1. **Toggle buttons** — Show or hide each RNA type to focus on one class at a time
2. **Observe locations** — Note where each RNA type is produced and where it functions
3. **Compare abundance** — Consider why rRNA is 80% of cellular RNA while mRNA is only 2-5%

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/transcriptome-landscape/main.html"
        height="562"
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
- Knowledge of RNA as a single-stranded molecule
- Basic concept of gene expression

### Activities

1. **Exploration** (5 min): Toggle each RNA type on and off. Where is each type produced? Where does it function? Which types leave the nucleus?
2. **Abundance Analysis** (5 min): rRNA is 80% of total RNA by mass. If you do RNA-seq without enrichment, what will most of your reads come from? Why do RNA-seq protocols include rRNA depletion or poly-A selection?
3. **Alternative Splicing** (5 min): One human gene produces an average of 3 mRNA variants through alternative splicing. How does this increase proteome complexity beyond what the gene count suggests?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. Name four types of RNA and describe the function of each.
2. Why does the transcriptome change between cell types even though the genome is identical?
3. What is the difference between the transcriptome measured by RNA-seq and the total RNA content of a cell?
4. How does alternative splicing contribute to protein diversity?

## References

1. [Transcriptome — Wikipedia](https://en.wikipedia.org/wiki/Transcriptome)
2. [Messenger RNA — Wikipedia](https://en.wikipedia.org/wiki/Messenger_RNA)
3. [Non-coding RNA — Wikipedia](https://en.wikipedia.org/wiki/Non-coding_RNA)
4. [Alternative splicing — Wikipedia](https://en.wikipedia.org/wiki/Alternative_splicing)
