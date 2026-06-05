---
title: Single-Cell Clustering and Trajectory
description: Interactive UMAP-style scatter plot of 200 simulated single cells across 5 immune cell types, with toggle between cluster view and pseudotime trajectory view.
image: /sims/scrna-clustering/scrna-clustering.png
og:image: /sims/scrna-clustering/scrna-clustering.png
twitter:image: /sims/scrna-clustering/scrna-clustering.png
social:
   cards: false
quality_score: 3
---

# Single-Cell Clustering and Trajectory

<iframe src="main.html" height="640" width="100%" scrolling="no"></iframe>

[Run the Single-Cell Clustering and Trajectory MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim simulates a **single-cell RNA sequencing (scRNA-seq)** analysis, displaying ~200 cells in a UMAP-like 2D embedding. Students can toggle between a **cluster view** (cells colored by cell type) and a **trajectory view** (cells colored by pseudotime), revealing how the same data supports both discrete classification and continuous differentiation analysis.

### Five Immune Cell Types

The simulated dataset contains five clusters representing distinct immune cell populations:

- **T Cells** (blue) — Adaptive immune cells that coordinate immune responses
- **B Cells** (red) — Antibody-producing cells of the adaptive immune system
- **Monocytes** (green) — Innate immune cells that differentiate into macrophages and dendritic cells
- **NK Cells** (orange) — Natural killer cells of the innate immune system
- **Dendritic Cells** (purple) — Antigen-presenting cells that bridge innate and adaptive immunity

### Two Visualization Modes

- **Cluster view** — Cells colored by assigned cell type. Distinct clusters indicate different transcriptional profiles. This is the standard output of tools like Scanpy and Seurat.
- **Trajectory view** — Cells colored by pseudotime along a differentiation trajectory. Branching trajectories (e.g., from dendritic cells → T cells and dendritic cells → monocytes) show how progenitor cells differentiate along multiple lineages.

### Trajectory Structure

The simulated trajectory starts at Dendritic Cells (the progenitor) and branches into two paths:
- Dendritic Cells → T Cells → B Cells
- Dendritic Cells → Monocytes → NK Cells

## How to Use

1. **View dropdown** — Switch between Cluster view and Trajectory view
2. **Hover** over any cell to see its assigned cell type and cluster identity
3. **Regenerate button** — Create a new set of simulated cells with different random positions within each cluster
4. **Compare views** — Toggle between Cluster and Trajectory to see how the same cells are interpreted through different analytical lenses

### Suggested Exploration

- In Cluster view, identify the 5 distinct clusters and note how well-separated they are — this indicates strong transcriptional differences between cell types
- Switch to Trajectory view and observe the color gradient — cells transition smoothly from early pseudotime (dark) to late pseudotime (light)
- Notice how some clusters are closer to each other in the embedding — proximity in UMAP space suggests transcriptional similarity
- Regenerate several times and observe that cluster positions vary but relative relationships remain consistent

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/scrna-clustering/main.html"
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

- Understanding of gene expression and RNA sequencing
- Basic concept of cell types and cellular differentiation
- Familiarity with dimensionality reduction (PCA or UMAP)

### Activities

1. **Exploration** (5 min): In Cluster view, identify all five cell types. Which clusters are closest to each other in the embedding? Does this make biological sense? (Hint: T Cells and B Cells are both adaptive immune cells.)
2. **Trajectory Analysis** (5 min): Switch to Trajectory view. Follow the pseudotime gradient from early to late. Where does the trajectory branch? What does the branching point represent biologically?
3. **Comparison** (5 min): Toggle between views. Can you identify cells at cluster boundaries that might be transitioning between cell types? These are the cells where pseudotime analysis adds information beyond simple clustering.
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What does each dot in a scRNA-seq UMAP plot represent, and what determines its position?
2. Why might two clusters appear close together in a UMAP embedding? What does this suggest about their gene expression profiles?
3. What is pseudotime, and how does it differ from real time in trajectory analysis?
4. A researcher finds a cell population at the boundary between T Cells and NK Cells. What might this suggest about these cells' differentiation state?

## References

1. [Single-cell sequencing — Wikipedia](https://en.wikipedia.org/wiki/Single-cell_sequencing)
2. [UMAP — Wikipedia](https://en.wikipedia.org/wiki/Uniform_manifold_approximation_and_projection)
3. [Cell type — Wikipedia](https://en.wikipedia.org/wiki/Cell_type)
4. [Cellular differentiation — Wikipedia](https://en.wikipedia.org/wiki/Cellular_differentiation)
5. [Trajectory inference — Wikipedia](https://en.wikipedia.org/wiki/Trajectory_inference)
