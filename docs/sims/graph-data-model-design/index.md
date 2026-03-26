---
title: Graph Data Model Design Process
description: Interactive vis-network flowchart showing the iterative process of designing a graph data model — from entity identification through relationship definition, property assignment, query validation, and iteration.
image: /sims/graph-data-model-design/graph-data-model-design.png
og:image: /sims/graph-data-model-design/graph-data-model-design.png
twitter:image: /sims/graph-data-model-design/graph-data-model-design.png
social:
   cards: false
quality_score: 3
---

# Graph Data Model Design Process

<iframe src="main.html" height="520" width="100%" scrolling="no"></iframe>

[Run the Graph Data Model Design Process MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim shows the **iterative design process** for building a graph data model, visualized as a cyclic flowchart. Each step in the process is a node, with a feedback loop from the final validation step back to the beginning, emphasizing that graph data model design is never a one-pass process.

### Design Steps

1. **Identify Entities** — Determine what real-world objects become nodes (genes, proteins, diseases, drugs)
2. **Define Relationships** — Determine what connections exist between entities and what they mean (interacts_with, treats, encodes)
3. **Assign Properties** — Add key-value attributes to nodes and edges (gene name, molecular weight, confidence score)
4. **Validate Against Queries** — Test the model against the questions you need to answer (Can the model answer "which drugs treat diseases linked to gene X"?)
5. **Iterate** — Refine the model based on validation results, cycling back to add missing entities or relationships

## How to Use

1. **Click** each step to see its detailed description and examples from bioinformatics
2. **Follow the cycle** — Notice that the process loops back from Iterate to Identify Entities
3. **Consider the examples** — Each step includes concrete biomedical examples

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/graph-data-model-design/main.html"
        height="520"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Basic understanding of graph databases (nodes, edges, properties)
- Familiarity with biological entities (genes, proteins, diseases)
- Concept of data modeling

### Activities

1. **Exploration** (5 min): Click each step in the design cycle. What is the key question answered at each step?
2. **Hands-On Design** (5 min): Imagine you need a graph to answer "Which proteins interact with BRCA1, and what diseases are they associated with?" Walk through each design step and sketch your model on paper.
3. **Discussion** (5 min): Why is graph data model design iterative rather than linear? What might cause you to go back and redesign your model?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What are the five steps in the graph data model design process?
2. Why is "Validate Against Queries" an important step before deploying a graph database?
3. Give an example of when you would need to iterate on your graph model after initial design.
4. How does a graph data model differ from a relational (tabular) data model for biological data?

## References

1. [Graph database — Wikipedia](https://en.wikipedia.org/wiki/Graph_database)
2. [Data modeling — Wikipedia](https://en.wikipedia.org/wiki/Data_modeling)
3. [Knowledge graph — Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph)
