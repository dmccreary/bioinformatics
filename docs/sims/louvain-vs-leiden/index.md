---
title: Louvain vs. Leiden Community Detection
description: Side-by-side comparison of Louvain and Leiden community detection algorithms on a 20-node graph, demonstrating how Leiden's refinement phase fixes disconnected communities that Louvain can produce.
image: /sims/louvain-vs-leiden/louvain-vs-leiden.png
og:image: /sims/louvain-vs-leiden/louvain-vs-leiden.png
twitter:image: /sims/louvain-vs-leiden/louvain-vs-leiden.png
social:
   cards: false
quality_score: 3
---

# Louvain vs. Leiden Community Detection

<iframe src="main.html" height="640" width="100%" scrolling="no"></iframe>

[Run the Louvain vs. Leiden Community Detection MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides a **side-by-side comparison** of the Louvain and Leiden community detection algorithms on the same 20-node graph. It demonstrates a well-known flaw in Louvain — the tendency to produce **disconnected communities** — and shows how Leiden's refinement phase fixes this problem.

### The Graph

A 20-node graph with 3 natural communities:
- **Community 1** (7 nodes, top-left) — Densely connected cluster
- **Community 2** (6 nodes, top-right) — Contains two sub-clusters connected by a bridge
- **Community 3** (7 nodes, bottom) — Dense cluster with moderate inter-community connections

### Algorithm Phases

Step through four phases to see how each algorithm behaves:

1. **Initial Graph** — All nodes uncolored. Both algorithms start with each node in its own community.
2. **Local Moving** — Nodes are greedily moved to the neighboring community that maximizes modularity. Louvain and Leiden differ in node processing order.
3. **Community Result** — Louvain incorrectly merges nodes 7-8 into Community 1 (blue), leaving them disconnected from the rest of their natural community. Leiden keeps Community 2 intact (orange).
4. **Leiden Refinement** — Leiden adds a refinement phase that checks each community for internal connectivity. Disconnected sub-communities are split and re-assigned, guaranteeing well-connected results.

### Why This Matters for Bioinformatics

Community detection is widely used in biological network analysis:
- Identifying **protein complexes** in PPI networks
- Finding **co-expressed gene modules** in expression data
- Detecting **cell type clusters** in scRNA-seq analysis (Leiden is the default in Scanpy)

Leiden is now preferred over Louvain in most bioinformatics tools because it guarantees connected communities while being equally fast.

## How to Use

1. **Next Phase button** — Step through the four algorithm phases, observing the changes on both the Louvain (left) and Leiden (right) sides
2. **Reset button** — Return to the initial graph state
3. **Compare sides** — At each phase, compare how nodes are colored on the left (Louvain) vs. right (Leiden)
4. **Look for the flaw** — In Phase 3, find the disconnected nodes in Louvain's blue community that are not directly connected to the rest of the blue cluster

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/louvain-vs-leiden/main.html"
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

- Understanding of graphs, communities, and clustering
- Concept of modularity as a measure of community quality
- Familiarity with biological networks (PPI, co-expression)

### Activities

1. **Exploration** (5 min): Step through all four phases. At Phase 3, identify which nodes Louvain misassigned. Verify that these nodes are disconnected from the rest of their assigned community by tracing edges.
2. **Guided Practice** (5 min): Reset and step through again. At each phase, explain what the algorithm is doing. Why does Louvain's greedy approach lead to the disconnected community? How does Leiden's refinement fix it?
3. **Discussion** (5 min): Scanpy (the standard scRNA-seq analysis tool) switched from Louvain to Leiden as its default clustering algorithm. Given what you've seen in this simulation, why might disconnected communities be particularly problematic for identifying cell types?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is the Louvain algorithm's known flaw, and what causes it?
2. How does the Leiden algorithm's refinement phase fix this problem?
3. Why is it important that detected communities be internally connected in biological network analysis?
4. Both algorithms optimize modularity. What does modularity measure, and why is it a useful objective for community detection?

## References

1. [Louvain method — Wikipedia](https://en.wikipedia.org/wiki/Louvain_method)
2. [Leiden algorithm — Wikipedia](https://en.wikipedia.org/wiki/Leiden_algorithm)
3. [Community structure — Wikipedia](https://en.wikipedia.org/wiki/Community_structure)
4. [Modularity (networks) — Wikipedia](https://en.wikipedia.org/wiki/Modularity_(networks))
5. [Network analysis in systems biology — Wikipedia](https://en.wikipedia.org/wiki/Biological_network#Network_analysis)
