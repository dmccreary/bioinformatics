---
title: Gene Tree vs Species Tree Discordance
description: Interactive p5.js visualization showing species tree as translucent tubes with gene lineages inside, demonstrating how gene trees can disagree with the species tree due to incomplete lineage sorting or horizontal gene transfer.
image: /sims/gene-tree-species-tree/gene-tree-species-tree.png
og:image: /sims/gene-tree-species-tree/gene-tree-species-tree.png
twitter:image: /sims/gene-tree-species-tree/gene-tree-species-tree.png
social:
   cards: false
quality_score: 3
---

# Gene Tree vs Species Tree Discordance

<iframe src="main.html" height="590" width="100%" scrolling="no"></iframe>

[Run the Gene Tree vs Species Tree Discordance MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim illustrates **gene tree / species tree discordance** — the phenomenon where the evolutionary history of a gene differs from the evolutionary history of the species that carry it. The species tree is shown as translucent tubes, with gene lineages drawn inside, making it easy to see where the gene tree agrees or disagrees with the species tree.

### Key Concepts

- **Species tree** (translucent tubes) — The true evolutionary history of species divergence
- **Gene tree** (colored lines inside tubes) — The evolutionary history of a specific gene, which may differ from the species tree
- **Discordance** — When gene tree topology disagrees with species tree topology
- **Horizontal Gene Transfer (HGT)** — A toggle shows how genes transferred between species create discordance (especially common in bacteria)

### Causes of Discordance

- **Incomplete Lineage Sorting (ILS)** — Ancestral polymorphisms that persist through speciation events
- **Horizontal Gene Transfer** — Genes move between species (common in prokaryotes)
- **Gene duplication and loss** — Paralogs may be mistaken for orthologs

## How to Use

1. **Observe the species tree** — The translucent tubes show the accepted species relationships
2. **Follow the gene lineages** — Trace the colored gene tree inside the species tree
3. **HGT checkbox** — Toggle horizontal gene transfer events to see how they create discordance
4. **Compare topologies** — Note where the gene tree branching pattern differs from the species tree

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/gene-tree-species-tree/main.html"
        height="590"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of phylogenetic trees and common ancestry
- Knowledge of DNA sequence divergence and molecular evolution
- Basic concept of gene families and orthologs

### Activities

1. **Exploration** (5 min): Trace the species tree and gene tree. Where do they agree? Where do they disagree?
2. **HGT Toggle** (5 min): Enable horizontal gene transfer. How does HGT create a gene tree topology that is impossible under vertical inheritance alone?
3. **Discussion** (5 min): If you built a phylogenetic tree from only one gene, how confident should you be that it reflects the species tree? Why do bioinformaticians use multiple genes or whole genomes?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is gene tree / species tree discordance, and why does it occur?
2. How does incomplete lineage sorting differ from horizontal gene transfer as a cause of discordance?
3. Why is discordance a bigger problem in phylogenomics of closely related species?
4. How do multi-gene methods (like ASTRAL) deal with gene tree discordance?

## References

1. [Gene tree — Wikipedia](https://en.wikipedia.org/wiki/Gene_tree)
2. [Incomplete lineage sorting — Wikipedia](https://en.wikipedia.org/wiki/Incomplete_lineage_sorting)
3. [Horizontal gene transfer — Wikipedia](https://en.wikipedia.org/wiki/Horizontal_gene_transfer)
4. [Phylogenomics — Wikipedia](https://en.wikipedia.org/wiki/Phylogenomics)
