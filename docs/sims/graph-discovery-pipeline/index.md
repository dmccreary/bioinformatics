---
title: Graph-Based Discovery Pipeline
description: Interactive vis-network DAG showing the end-to-end pipeline from data acquisition through graph construction, analysis, machine learning, visualization, and interpretation.
image: /sims/graph-discovery-pipeline/graph-discovery-pipeline.png
og:image: /sims/graph-discovery-pipeline/graph-discovery-pipeline.png
twitter:image: /sims/graph-discovery-pipeline/graph-discovery-pipeline.png
social:
   cards: false
quality_score: 3
---

# Graph-Based Discovery Pipeline

<iframe src="main.html" height="470" width="100%" scrolling="no"></iframe>

[Run the Graph-Based Discovery Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes the **end-to-end pipeline for graph-based biological discovery** as a directed acyclic graph (DAG). Each node represents a major stage, from raw data acquisition through graph construction, computational analysis, machine learning, visualization, interpretation, and communication of results.

### Pipeline Stages

1. **Data Acquisition** — Retrieve biological data from databases (STRING, KEGG, UniProt, PDB)
2. **Data Wrangling** — Clean, normalize, and integrate heterogeneous data sources
3. **Graph Construction** — Build the biological network (nodes, edges, properties)
4. **Graph Analysis** — Compute network metrics (centrality, clustering, community detection)
5. **Machine Learning** — Apply graph embeddings, GNNs, or link prediction
6. **Visualization** — Create interactive network visualizations for exploration
7. **Interpretation** — Connect computational findings to biological hypotheses
8. **Communication** — Publish results, share data, write papers

## How to Use

1. **Click** each pipeline stage to see its description, key tools, and example outputs
2. **Follow the flow** — Trace the path from data to discovery
3. **Note dependencies** — Some stages branch or merge, reflecting the non-linear nature of research

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/graph-discovery-pipeline/main.html"
        height="470"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Familiarity with biological databases
- Basic understanding of network analysis
- Concept of computational pipelines

### Activities

1. **Exploration** (5 min): Click each stage and list the key tools or methods used at that stage.
2. **Pipeline Design** (5 min): You want to discover new drug targets for Alzheimer's disease using a protein interaction network. For each pipeline stage, describe what specific actions you would take.
3. **Discussion** (5 min): Why is data wrangling often the most time-consuming stage? What challenges arise when integrating data from multiple sources?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. List the eight stages of the graph-based discovery pipeline in order.
2. Why is graph construction placed after data wrangling rather than immediately after data acquisition?
3. How do machine learning methods (like graph neural networks) add value beyond traditional graph analysis metrics?
4. Why is visualization important for biological interpretation of network analysis results?

## References

1. [Network biology — Wikipedia](https://en.wikipedia.org/wiki/Network_biology)
2. [Data wrangling — Wikipedia](https://en.wikipedia.org/wiki/Data_wrangling)
3. [Graph neural network — Wikipedia](https://en.wikipedia.org/wiki/Graph_neural_network)
4. [Scientific communication — Wikipedia](https://en.wikipedia.org/wiki/Scholarly_communication)
