---
title: Module Detection in PPI Networks
description: Interactive p5.js PPI network with ~20 nodes and a dropdown to compare three module detection algorithms (MCODE, MCL, Clique Percolation) that highlight different protein complex groupings.
image: /sims/ppi-module-detection/ppi-module-detection.png
og:image: /sims/ppi-module-detection/ppi-module-detection.png
twitter:image: /sims/ppi-module-detection/ppi-module-detection.png
social:
   cards: false
quality_score: 3
---

# Module Detection in PPI Networks

<iframe src="main.html" height="660" width="100%" scrolling="no"></iframe>

[Run the Module Detection in PPI Networks MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates **module detection** (protein complex identification) in a PPI network with ~20 nodes. A dropdown lets students switch between three different module detection algorithms — **MCODE**, **MCL**, and **Clique Percolation** — each of which identifies different groupings of proteins as potential complexes.

### Three Algorithms

- **MCODE** (Molecular Complex Detection) — Finds densely connected regions by scoring nodes by local density and expanding outward from seed nodes
- **MCL** (Markov Cluster Algorithm) — Simulates random walks on the graph; proteins that are frequently visited together are grouped into modules
- **Clique Percolation** — Finds overlapping communities by identifying adjacent k-cliques (completely connected subgraphs)

### Why This Matters

Protein complexes are the functional units of the cell. Identifying them computationally from PPI networks helps:

- Predict protein function (guilt by association)
- Identify potential drug targets (disrupting a complex may be more effective than targeting a single protein)
- Understand cellular organization

## How to Use

1. **Algorithm dropdown** — Switch between MCODE, MCL, and Clique Percolation to see different module assignments
2. **Compare results** — Notice which proteins are grouped differently by each algorithm
3. **Hover** over nodes for protein names and module assignments

### Suggested Exploration

- Switch between all three algorithms and note which modules are consistent across methods — these are high-confidence protein complexes
- Find proteins that are assigned to different modules depending on the algorithm — these may be bridge proteins connecting multiple complexes
- Compare the number and size of modules produced by each algorithm

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/ppi-module-detection/main.html"
        height="660"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of PPI networks
- Concept of network modules/communities
- Familiarity with protein complexes

### Activities

1. **Exploration** (5 min): Try all three algorithms. Count the number of modules each produces. Which algorithm finds the most modules? The fewest?
2. **Consensus Analysis** (5 min): Are there protein groups that all three algorithms agree on? These consensus modules are likely real protein complexes.
3. **Discussion** (5 min): Why do different algorithms produce different results? Which algorithm would you trust most for identifying protein complexes, and why?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is the biological significance of a "module" in a PPI network?
2. How does MCODE differ from MCL in its approach to finding modules?
3. Why might Clique Percolation find overlapping modules when the other algorithms do not?
4. If a protein appears in different modules depending on the algorithm, what might this suggest about its biological role?

## References

1. [Protein complex — Wikipedia](https://en.wikipedia.org/wiki/Protein_complex)
2. [Markov cluster algorithm — Wikipedia](https://en.wikipedia.org/wiki/Markov_cluster_algorithm)
3. [Clique percolation method — Wikipedia](https://en.wikipedia.org/wiki/Clique_percolation_method)
4. [Community structure — Wikipedia](https://en.wikipedia.org/wiki/Community_structure)
