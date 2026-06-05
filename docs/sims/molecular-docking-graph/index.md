---
title: Molecular Docking and Protein-Ligand Graph
description: Interactive dual-panel display showing a 2D ligand in a binding pocket with interaction lines alongside its graph representation where atoms and residues are nodes and interactions are edges.
image: /sims/molecular-docking-graph/molecular-docking-graph.png
og:image: /sims/molecular-docking-graph/molecular-docking-graph.png
twitter:image: /sims/molecular-docking-graph/molecular-docking-graph.png
social:
   cards: false
quality_score: 3
---

# Molecular Docking and Protein-Ligand Graph

<iframe src="main.html" height="610" width="100%" scrolling="no"></iframe>

[Run the Molecular Docking and Protein-Ligand Graph MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim shows two views of a **protein-ligand docking interaction**: a 2D binding pocket diagram (left) and its corresponding **graph representation** (right). The left panel shows a drug molecule in a protein binding pocket with interaction lines, while the right panel converts the same information into a graph where atoms/residues are nodes and interactions are typed edges.

### Two Panels

- **Binding Pocket View** (left) — The ligand sits in the protein's binding site with colored lines showing hydrogen bonds, hydrophobic contacts, and other interactions with specific amino acid residues
- **Graph Representation** (right) — The same interactions as a graph: ligand atoms and protein residues become nodes, and non-covalent interactions become labeled edges

### Interaction Types

- **Hydrogen bonds** — Directional interactions between donor and acceptor groups
- **Hydrophobic contacts** — Van der Waals interactions between nonpolar groups
- **Pi-stacking** — Interactions between aromatic rings
- **Salt bridges** — Electrostatic interactions between charged groups

### Why This Matters

Graph representations of protein-ligand interactions are used in:
- Machine learning for drug binding affinity prediction
- Virtual screening of drug candidates
- Understanding structure-activity relationships

## How to Use

1. **Compare panels** — See how the 2D binding pocket maps to the graph representation
2. **Identify interaction types** — Different colors/styles represent different non-covalent interaction types
3. **Hover** for details on specific atoms, residues, and interaction types

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/molecular-docking-graph/main.html"
        height="610"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of protein structure and binding sites
- Basic knowledge of drug-target interactions
- Concept of non-covalent molecular interactions

### Activities

1. **Exploration** (5 min): Examine the binding pocket view. Identify all interaction types by color. Then find the same interactions in the graph view.
2. **Graph Analysis** (5 min): In the graph representation, which protein residue has the most interactions with the ligand? What does this suggest about its importance for drug binding?
3. **Discussion** (5 min): If you mutated the most-connected residue to alanine, what would you predict would happen to drug binding affinity? How could this graph representation help in drug design?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. Why is a graph representation useful for encoding protein-ligand interactions?
2. What types of non-covalent interactions hold a drug in its binding pocket?
3. How could machine learning on protein-ligand graphs predict binding affinity for new drug candidates?
4. What is the advantage of representing docking results as a graph rather than just a docking score?

## References

1. [Molecular docking — Wikipedia](https://en.wikipedia.org/wiki/Molecular_docking)
2. [Protein-ligand docking — Wikipedia](https://en.wikipedia.org/wiki/Protein%E2%80%93ligand_docking)
3. [Non-covalent interaction — Wikipedia](https://en.wikipedia.org/wiki/Non-covalent_interaction)
4. [Drug design — Wikipedia](https://en.wikipedia.org/wiki/Drug_design)
