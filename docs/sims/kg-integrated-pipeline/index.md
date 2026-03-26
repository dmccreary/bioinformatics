---
title: Integrated Knowledge Graph Pipeline
description: Interactive vis-network flowchart showing how ontologies and databases feed into KG construction, branching to graph embeddings, GNNs, and link prediction methods that lead to downstream applications.
image: /sims/kg-integrated-pipeline/kg-integrated-pipeline.png
og:image: /sims/kg-integrated-pipeline/kg-integrated-pipeline.png
twitter:image: /sims/kg-integrated-pipeline/kg-integrated-pipeline.png
social:
   cards: false
quality_score: 3
---

# Integrated Knowledge Graph Pipeline

<iframe src="main.html" height="550" width="100%" scrolling="no"></iframe>

[Run the Integrated Knowledge Graph Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim shows the **complete knowledge graph analysis pipeline** — from data sources and KG construction through three machine learning branches (graph embeddings, graph neural networks, and link prediction) that converge on downstream applications like drug discovery and disease gene prediction.

### Pipeline Structure

- **Inputs** — Ontologies (GO, Disease Ontology) and databases (STRING, DrugBank, OMIM)
- **KG Construction** — Build the integrated biomedical knowledge graph
- **Three ML Branches:**
    - **Graph Embeddings** (e.g., TransE, node2vec) — Learn low-dimensional vector representations of entities
    - **Graph Neural Networks** (e.g., GCN, GAT) — Learn node/edge representations using message passing
    - **Link Prediction** — Predict missing edges (new drug-target or gene-disease associations)
- **Applications** — Drug repurposing, disease gene discovery, protein function prediction

## How to Use

1. **Click** each pipeline node to see its description and key methods
2. **Follow branches** — Trace how KG construction feeds into three parallel ML approaches
3. **Explore applications** — See how each ML method contributes to biological discovery

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/kg-integrated-pipeline/main.html"
        height="550"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of knowledge graphs
- Basic concept of machine learning
- Familiarity with graph-based data representations

### Activities

1. **Exploration** (5 min): Click each node and read its description. Note which methods fall under each ML branch.
2. **Method Comparison** (5 min): Compare graph embeddings vs. GNNs. What are the key differences in how they learn from graph structure?
3. **Application Design** (5 min): You want to predict which existing drugs might treat a new disease. Which branch of the pipeline would you use? Trace the full path from data sources to prediction.
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What are the three machine learning branches in this pipeline, and how do they differ?
2. Why is link prediction particularly useful for drug repurposing?
3. How do graph embeddings convert a knowledge graph into a format suitable for machine learning?
4. What role do ontologies play in the KG construction stage?

## References

1. [Knowledge graph embedding — Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph_embedding)
2. [Graph neural network — Wikipedia](https://en.wikipedia.org/wiki/Graph_neural_network)
3. [Link prediction — Wikipedia](https://en.wikipedia.org/wiki/Link_prediction)
4. [Drug repositioning — Wikipedia](https://en.wikipedia.org/wiki/Drug_repositioning)
