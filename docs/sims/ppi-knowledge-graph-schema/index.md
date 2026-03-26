---
title: PPI Knowledge Graph Schema
description: Interactive vis-network schema diagram showing the node types (Protein, Gene, Disease, Drug, Pathway, Organism) and labeled relationship types that define a PPI knowledge graph data model.
image: /sims/ppi-knowledge-graph-schema/ppi-knowledge-graph-schema.png
og:image: /sims/ppi-knowledge-graph-schema/ppi-knowledge-graph-schema.png
twitter:image: /sims/ppi-knowledge-graph-schema/ppi-knowledge-graph-schema.png
social:
   cards: false
quality_score: 3
---

# PPI Knowledge Graph Schema

<iframe src="main.html" height="560" width="100%" scrolling="no"></iframe>

[Run the PPI Knowledge Graph Schema MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim displays the **schema** (data model) for a protein-protein interaction knowledge graph. Unlike a data-level graph that shows specific proteins, this schema shows the **types** of nodes and the **types** of relationships between them — it is a blueprint for how PPI data should be organized.

### Node Types

- **Protein** — Individual protein entities with properties (name, sequence, molecular weight)
- **Gene** — Genes that encode proteins
- **Disease** — Medical conditions linked to proteins
- **Drug** — Pharmaceutical compounds that target proteins
- **Pathway** — Biological pathways that proteins participate in
- **Organism** — Species from which proteins originate

### Relationship Types

- Protein **interacts_with** Protein
- Gene **encodes** Protein
- Protein **associated_with** Disease
- Drug **targets** Protein
- Protein **participates_in** Pathway
- Protein **belongs_to** Organism

## How to Use

1. **Click** any node type to see its properties and example values
2. **Read edge labels** — Each relationship type is labeled with its semantic meaning
3. **Trace paths** — Follow multi-hop paths through the schema to understand what queries the graph can answer

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/ppi-knowledge-graph-schema/main.html"
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

- Understanding of knowledge graphs and schemas
- Familiarity with biological entities (proteins, genes, diseases)
- Concept of data modeling

### Activities

1. **Exploration** (5 min): Identify all node types and relationship types. How many node types are there? How many relationship types?
2. **Query Design** (5 min): Using this schema, write natural-language queries that the KG could answer. For example: "Which drugs target proteins associated with breast cancer?" Identify the path: Drug → targets → Protein → associated_with → Disease.
3. **Schema Extension** (5 min): What node types or relationship types are missing? Consider adding: clinical trials, publications, cellular locations. How would you connect them?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What is the difference between a schema-level graph and a data-level graph?
2. How does the "encodes" relationship between Gene and Protein reflect the central dogma?
3. Design a 3-hop query using this schema that could help identify drug repurposing candidates.
4. Why is having a well-defined schema important before populating a knowledge graph with data?

## References

1. [Knowledge graph — Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph)
2. [Database schema — Wikipedia](https://en.wikipedia.org/wiki/Database_schema)
3. [Protein-protein interaction — Wikipedia](https://en.wikipedia.org/wiki/Protein%E2%80%93protein_interaction)
4. [Ontology (information science) — Wikipedia](https://en.wikipedia.org/wiki/Ontology_(information_science))
