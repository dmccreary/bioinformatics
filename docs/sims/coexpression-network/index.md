---
title: Co-Expression Network and Module Detection
description: Interactive p5.js gene co-expression network with ~30 genes in 4 modules, edge thickness proportional to correlation, and an adjustable soft-threshold slider.
image: /sims/coexpression-network/coexpression-network.png
og:image: /sims/coexpression-network/coexpression-network.png
twitter:image: /sims/coexpression-network/coexpression-network.png
social:
   cards: false
quality_score: 3
---

# Co-Expression Network and Module Detection

<iframe src="main.html" height="640" width="100%" scrolling="no"></iframe>

[Run the Co-Expression Network and Module Detection MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim simulates a **weighted gene co-expression network** with ~30 genes organized into 4 functional modules. Edge thickness represents the correlation strength between gene pairs, and a **soft-threshold slider** lets students explore how threshold selection affects network topology and module boundaries.

### Co-Expression Networks

In a co-expression network:

- Each **node** is a gene
- Each **edge** represents correlated expression across samples — genes that go up and down together are connected
- **Edge weight** (thickness) reflects the strength of the correlation
- **Modules** (color-coded clusters) are groups of tightly co-expressed genes that often share biological function

### Soft Thresholding

The soft-threshold slider controls which edges are displayed. At low thresholds, many weak correlations appear and the network is dense. At high thresholds, only the strongest correlations survive and modules become clearly separated. This illustrates the core concept of **WGCNA (Weighted Gene Co-expression Network Analysis)** — choosing the right threshold to reveal biologically meaningful modules.

## How to Use

1. **Soft threshold slider** — Adjust to filter edges by correlation strength. Low = dense, noisy network; high = sparse, modular network
2. **Hover** over nodes to see gene names and module assignments
3. **Observe modules** — Watch how the four color-coded modules emerge as you increase the threshold
4. **Compare edge thickness** — Thicker edges indicate stronger co-expression

### Suggested Experiments

- Start with a low threshold and observe the dense, hard-to-interpret network
- Slowly increase the threshold and watch modules emerge as weak inter-module edges disappear first
- At high threshold, note that intra-module edges (within a color) survive longer than inter-module edges — this is the basis for module detection

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/coexpression-network/main.html"
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

- Understanding of gene expression and RNA-seq
- Basic concept of correlation as a measure of co-expression
- Familiarity with network modules/communities

### Activities

1. **Exploration** (5 min): Set the threshold low and count visible edges. Then increase it gradually. At what threshold do the four modules become clearly distinct?
2. **Module Analysis** (5 min): At a moderate threshold, identify the four modules by color. Which modules are closest to each other (connected by inter-module edges)? What might this mean biologically?
3. **Discussion** (5 min): In WGCNA, genes within the same module are assumed to share biological function. Why is this a reasonable assumption? What would it mean if two modules are connected by many inter-module edges?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What does an edge in a co-expression network represent, and how is its weight determined?
2. Why is threshold selection important in co-expression network analysis?
3. How could you use a co-expression network to predict the function of an unknown gene?
4. What biological insight does module detection provide that individual gene analysis does not?

## References

1. [Gene co-expression network — Wikipedia](https://en.wikipedia.org/wiki/Gene_co-expression_network)
2. [Weighted correlation network analysis — Wikipedia](https://en.wikipedia.org/wiki/Weighted_correlation_network_analysis)
3. [Gene expression — Wikipedia](https://en.wikipedia.org/wiki/Gene_expression)
4. [Cluster analysis — Wikipedia](https://en.wikipedia.org/wiki/Cluster_analysis)
