---
title: PPI Network Topology Explorer
description: Interactive dual-panel PPI network where nodes are colored by a selectable topological metric (degree, betweenness, clustering coefficient) alongside a histogram showing the metric distribution.
image: /sims/ppi-topology-explorer/ppi-topology-explorer.png
og:image: /sims/ppi-topology-explorer/ppi-topology-explorer.png
twitter:image: /sims/ppi-topology-explorer/ppi-topology-explorer.png
social:
   cards: false
quality_score: 3
---

# PPI Network Topology Explorer

<iframe src="main.html" height="640" width="100%" scrolling="no"></iframe>

[Run the PPI Network Topology Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides a **topology explorer** for a PPI network. The left panel shows the network with nodes colored by a selectable topological metric, while the right panel displays a histogram of that metric's distribution across all nodes.

### Available Metrics

- **Degree** — Number of direct interaction partners. High-degree nodes are hubs.
- **Betweenness Centrality** — How often a node lies on shortest paths between other nodes. High betweenness indicates bridge proteins.
- **Clustering Coefficient** — How densely a node's neighbors are interconnected. High clustering indicates membership in a tight protein complex.

### Visual Encoding

- **Node color** — Gradient from cool (low value) to warm (high value) for the selected metric
- **Histogram** — Distribution of the selected metric across all nodes, showing whether the network has a few extreme values or is uniformly distributed

## How to Use

1. **Metric dropdown** — Switch between degree, betweenness centrality, and clustering coefficient
2. **Compare colorings** — See how the same network looks different depending on which metric you visualize
3. **Hover** over nodes to see their name and metric value
4. **Read the histogram** — Understand the overall distribution of the metric

### Suggested Experiments

- Color by degree: identify the hub proteins (warmest colors)
- Switch to betweenness: are the same proteins highlighted, or are there bridge proteins with moderate degree but high betweenness?
- Switch to clustering coefficient: proteins in tight complexes will have high values, while connector proteins will have low values

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/ppi-topology-explorer/main.html"
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

- Understanding of PPI networks
- Basic graph theory metrics (degree, path length)
- Concept of network centrality

### Activities

1. **Exploration** (5 min): Switch between all three metrics. For each, identify the top 3 proteins and note whether they overlap.
2. **Hub vs. Bridge** (5 min): Find a protein that is a hub (high degree) but NOT a bridge (low betweenness). Find a bridge protein (high betweenness) with moderate degree. What biological roles might these different network positions reflect?
3. **Discussion** (5 min): Which metric would be most useful for identifying essential genes? Drug targets? Members of protein complexes?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What does degree centrality measure, and why are high-degree proteins often essential?
2. How does betweenness centrality differ from degree, and what biological role do high-betweenness proteins play?
3. What does a high clustering coefficient indicate about a protein's network neighborhood?
4. Why is it important to analyze multiple topological metrics rather than relying on degree alone?

## References

1. [Centrality — Wikipedia](https://en.wikipedia.org/wiki/Centrality)
2. [Betweenness centrality — Wikipedia](https://en.wikipedia.org/wiki/Betweenness_centrality)
3. [Clustering coefficient — Wikipedia](https://en.wikipedia.org/wiki/Clustering_coefficient)
4. [Network biology — Wikipedia](https://en.wikipedia.org/wiki/Network_biology)
