---
title: Variation Graph for a Genomic Region
description: Interactive p5.js directed graph showing a reference path with alternative paths for SNPs, insertions, and deletions, with toggleable read alignments along different paths.
image: /sims/variation-graph/variation-graph.png
og:image: /sims/variation-graph/variation-graph.png
twitter:image: /sims/variation-graph/variation-graph.png
social:
   cards: false
quality_score: 3
---

# Variation Graph for a Genomic Region

<iframe src="main.html" height="502" width="100%" scrolling="no"></iframe>

[Run the Variation Graph for a Genomic Region MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes a **variation graph (VG)** — a directed graph that represents a reference genome along with known genetic variants. Instead of a single linear reference sequence, a variation graph encodes multiple alleles as alternative paths through the graph.

### Graph Structure

- **Reference path** — The main path through the graph representing the reference genome sequence
- **SNP paths** — Alternative nodes that branch and rejoin, encoding single nucleotide polymorphisms
- **Insertion paths** — Extra nodes inserted between reference nodes, encoding insertions
- **Deletion paths** — Edges that skip reference nodes, encoding deletions
- **Read paths** — Toggleable alignments showing how sequencing reads traverse different paths

### Why Variation Graphs?

Traditional linear reference genomes introduce **reference bias** — reads from non-reference alleles may fail to align or align incorrectly. Variation graphs solve this by:

- Representing all known variants as first-class paths
- Allowing reads to align to any path, reducing reference bias
- Enabling genotyping by identifying which paths each read traverses
- Tools: vg, GraphAligner, minigraph

## How to Use

1. **Examine the graph** — Follow the reference path and identify where alternative paths branch off for SNPs, insertions, and deletions
2. **Toggle read paths** — Show or hide read alignments to see which paths individual reads traverse
3. **Identify variants** — Each branching point in the graph represents a known variant site

### Suggested Exploration

- Find the SNP site: one path has the reference allele, the other has the alternate allele. Which reads support each allele?
- Find the insertion: extra nodes appear in one path but not the reference. How do reads align through this region?
- Find the deletion: one path skips a reference node. What does this mean for reads from individuals with this deletion?

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/variation-graph/main.html"
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

- Understanding of reference genomes and genome variants (SNPs, indels)
- Concept of read alignment to a reference
- Basic graph theory (directed graphs, paths)

### Activities

1. **Exploration** (5 min): Trace the reference path through the graph. Identify all variant sites (branching points). Classify each as SNP, insertion, or deletion.
2. **Read Alignment** (5 min): Toggle on read paths. For each variant site, count how many reads support the reference allele vs. the alternate allele. What genotype would you call?
3. **Discussion** (5 min): Why does a linear reference genome create bias against non-reference alleles? How do variation graphs solve this problem? Which populations benefit most from variation graphs?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is reference bias in read alignment, and how do variation graphs reduce it?
2. How is a SNP represented in a variation graph compared to a VCF file?
3. Why are variation graphs particularly important for studying structurally diverse genomic regions (like the MHC locus)?
4. A read traverses the reference path at all variant sites. What genotype does this suggest?

## References

1. [Genome graph — Wikipedia](https://en.wikipedia.org/wiki/Genome_graph)
2. [Variant Call Format — Wikipedia](https://en.wikipedia.org/wiki/Variant_Call_Format)
3. [Reference genome — Wikipedia](https://en.wikipedia.org/wiki/Reference_genome)
4. [Single-nucleotide polymorphism — Wikipedia](https://en.wikipedia.org/wiki/Single-nucleotide_polymorphism)
