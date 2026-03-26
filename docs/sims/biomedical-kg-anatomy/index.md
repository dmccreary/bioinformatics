---
title: Anatomy of a Biomedical Knowledge Graph
description: Interactive vis-network showing a heterogeneous biomedical knowledge graph with genes, diseases, drugs, phenotypes, and GO terms connected by labeled relationship edges.
image: /sims/biomedical-kg-anatomy/biomedical-kg-anatomy.png
og:image: /sims/biomedical-kg-anatomy/biomedical-kg-anatomy.png
twitter:image: /sims/biomedical-kg-anatomy/biomedical-kg-anatomy.png
social:
   cards: false
quality_score: 3
---

# Anatomy of a Biomedical Knowledge Graph

<iframe src="main.html" height="560" width="100%" scrolling="no"></iframe>

[Run the Anatomy of a Biomedical Knowledge Graph MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim displays a **heterogeneous biomedical knowledge graph** — a graph where nodes and edges have different types. Students can explore how genes, diseases, drugs, phenotypes, and Gene Ontology (GO) terms are interconnected through typed, labeled relationships.

### Node Types

- **Genes** (blue) — Gene/protein entities (e.g., BRCA1, TP53, EGFR)
- **Diseases** (red) — Disease entities (e.g., breast cancer, lung cancer)
- **Drugs** (green) — Pharmaceutical compounds (e.g., tamoxifen, erlotinib)
- **Phenotypes** (orange) — Observable characteristics (e.g., tumor growth, inflammation)
- **GO Terms** (purple) — Gene Ontology functional annotations

### Edge Types (Relationships)

- **gene–disease**: "associated_with" — a gene is linked to a disease
- **drug–gene**: "targets" — a drug acts on a gene/protein
- **drug–disease**: "treats" — a drug is used to treat a disease
- **gene–phenotype**: "causes" — a gene mutation causes a phenotype
- **gene–GO**: "annotated_with" — a gene has a functional annotation

### Why This Matters

Biomedical knowledge graphs power drug repurposing, disease gene discovery, and clinical decision support. Understanding their structure is essential for bioinformaticians working with graph databases and machine learning on biological knowledge.

## How to Use

1. **Click** any node to see its details and all connected relationships
2. **Hover** over edges to see the relationship type
3. **Drag** nodes to explore the graph layout
4. **Zoom** to focus on specific regions of the graph
5. **Trace paths** — Follow multi-hop paths like Drug → targets → Gene → associated_with → Disease to understand drug mechanisms

### Suggested Exploration

- Find a drug node and trace its path: which gene does it target, and what diseases is that gene associated with?
- Find a gene connected to both a disease and a GO term — the GO term helps explain *why* the gene is associated with the disease
- Look for triangles: Drug → targets → Gene → associated_with → Disease. Does the drug also have a direct "treats" edge to that disease?

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/biomedical-kg-anatomy/main.html"
        height="560"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of genes, proteins, and their roles in disease
- Basic graph theory (nodes, edges, types)
- Concept of knowledge representation

### Activities

1. **Exploration** (5 min): Identify all five node types by color. For each type, find one example and read its details. How many relationships does each node have?
2. **Path Tracing** (5 min): Find a drug and trace its path to a disease through a gene target. Write out the full path using the format: Drug → targets → Gene → associated_with → Disease.
3. **Discussion** (5 min): Drug repurposing uses knowledge graphs to find existing drugs that might treat new diseases. How could you use this graph to identify a drug repurposing candidate? What kind of path would you look for?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What makes a knowledge graph "heterogeneous" compared to a simple network?
2. Why are labeled edges important in a biomedical knowledge graph? Give an example of two edges that connect the same node types but have different meanings.
3. How could a bioinformatician use a knowledge graph to predict new gene-disease associations?
4. What is the difference between the "targets" and "treats" relationships in this graph?

## References

1. [Knowledge graph — Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph)
2. [Biomedical informatics — Wikipedia](https://en.wikipedia.org/wiki/Biomedical_informatics)
3. [Drug repurposing — Wikipedia](https://en.wikipedia.org/wiki/Drug_repositioning)
4. [Gene Ontology — Wikipedia](https://en.wikipedia.org/wiki/Gene_Ontology)
5. [Graph database — Wikipedia](https://en.wikipedia.org/wiki/Graph_database)
