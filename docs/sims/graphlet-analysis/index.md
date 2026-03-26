---
title: Graphlet Orbits and Network Comparison
description: Interactive p5.js display of 2-5 node graphlet types with a sample PPI network where clicking any node shows its Graphlet Degree Vector (GDV) as a bar chart for topological comparison.
image: /sims/graphlet-analysis/graphlet-analysis.png
og:image: /sims/graphlet-analysis/graphlet-analysis.png
twitter:image: /sims/graphlet-analysis/graphlet-analysis.png
social:
   cards: false
quality_score: 3
---

# Graphlet Orbits and Network Comparison

<iframe src="main.html" height="602" width="100%" scrolling="no"></iframe>

[Run the Graphlet Orbits and Network Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim introduces **graphlets** — small connected subgraph patterns (2-5 nodes) that characterize the local topology around each node in a network. Students can view all graphlet types, click nodes in a sample PPI network, and see each node's **Graphlet Degree Vector (GDV)** as a bar chart.

### What Are Graphlets?

Graphlets are the non-isomorphic connected subgraphs of a given size. They are the building blocks of network topology:

- **2-node graphlet** — A single edge (1 type)
- **3-node graphlets** — Path and triangle (2 types)
- **4-node graphlets** — Path, star, cycle, tailed triangle, complete graph (6 types)
- **5-node graphlets** — 21 distinct patterns

### Graphlet Degree Vector (GDV)

Each node's GDV counts how many times it participates in each graphlet orbit position. The GDV provides a much richer topological fingerprint than simple degree, capturing the local network neighborhood structure.

### Why This Matters

Graphlet analysis is used in bioinformatics to:

- Compare PPI network topology across species
- Identify functionally similar proteins (similar GDV = similar network role)
- Detect network motifs characteristic of biological networks
- Measure network similarity beyond global statistics

## How to Use

1. **View graphlet types** — The reference panel shows all graphlet patterns organized by size
2. **Click** any node in the PPI network to see its GDV bar chart
3. **Compare GDVs** — Click different nodes and compare their bar charts to understand how their local topology differs

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/graphlet-analysis/main.html"
        height="602"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of graph theory (nodes, edges, subgraphs)
- Concept of network motifs and patterns
- Familiarity with PPI networks

### Activities

1. **Exploration** (5 min): Review all graphlet types. Click several nodes in the PPI network and examine their GDV bar charts. Which graphlet orbits are most common?
2. **Comparison** (5 min): Find two nodes with high degree. Do they have similar GDVs? Now find a hub node and a peripheral node — how do their GDVs differ?
3. **Discussion** (5 min): Two proteins have identical degree (both connect to 5 partners) but very different GDVs. What does this tell you about their network roles? Could they have different biological functions?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is a graphlet, and how does it differ from a network motif?
2. Why does the Graphlet Degree Vector provide more information than simple node degree?
3. How could graphlet analysis help identify functionally similar proteins across species?
4. If two PPI networks have similar graphlet frequency distributions, what does this suggest about their topology?

## References

1. [Graphlet — Wikipedia](https://en.wikipedia.org/wiki/Graphlet)
2. [Network motif — Wikipedia](https://en.wikipedia.org/wiki/Network_motif)
3. [Graph isomorphism — Wikipedia](https://en.wikipedia.org/wiki/Graph_isomorphism)
4. [Protein-protein interaction — Wikipedia](https://en.wikipedia.org/wiki/Protein%E2%80%93protein_interaction)
