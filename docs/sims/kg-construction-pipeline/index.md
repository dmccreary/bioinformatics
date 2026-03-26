---
title: Knowledge Graph Construction Pipeline
description: Interactive vis-network flowchart showing the step-by-step process of building a biomedical knowledge graph from source databases through extraction, schema mapping, entity resolution, integration, to a unified KG.
image: /sims/kg-construction-pipeline/kg-construction-pipeline.png
og:image: /sims/kg-construction-pipeline/kg-construction-pipeline.png
twitter:image: /sims/kg-construction-pipeline/kg-construction-pipeline.png
social:
   cards: false
quality_score: 3
---

# Knowledge Graph Construction Pipeline

<iframe src="main.html" height="520" width="100%" scrolling="no"></iframe>

[Run the Knowledge Graph Construction Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim presents the **knowledge graph construction pipeline** as an interactive flowchart. Students step through the stages of building a biomedical KG from heterogeneous source databases to a unified, queryable graph.

### Pipeline Stages

1. **Source Databases** — Multiple biological databases (UniProt, PDB, KEGG, STRING, OMIM) provide raw data
2. **Extraction** — Parse and extract entities and relationships from each source format (XML, JSON, flat files)
3. **Schema Mapping** — Map extracted entities to a common ontology or schema (e.g., map UniProt protein IDs to gene names)
4. **Entity Resolution** — Identify and merge duplicate entities across sources (the same protein may have different IDs in different databases)
5. **Integration** — Combine all resolved entities and relationships into a single graph structure
6. **Unified Knowledge Graph** — The final KG with consistent entity types, relationship labels, and properties

## How to Use

1. **Click** each stage to see its description, challenges, and example tools
2. **Step through** — Follow the data flow from source databases to unified KG
3. **Consider the challenges** — Entity resolution and schema mapping are the hardest stages

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/kg-construction-pipeline/main.html"
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

- Understanding of biological databases and their contents
- Concept of knowledge graphs (nodes, edges, types)
- Basic awareness of data integration challenges

### Activities

1. **Exploration** (5 min): Click each pipeline stage and note the key challenge at each step.
2. **Entity Resolution Exercise** (5 min): The protein p53 appears as "TP53" in GenBank, "P04637" in UniProt, and "7157" in Entrez Gene. Discuss how entity resolution would merge these into a single node.
3. **Discussion** (5 min): Why is schema mapping necessary? What happens if two databases use different relationship types for the same biological interaction?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What are the six stages of the KG construction pipeline?
2. Why is entity resolution one of the most challenging stages?
3. How does a common ontology (like Gene Ontology) help with schema mapping?
4. What would happen if you skipped the entity resolution stage?

## References

1. [Knowledge graph — Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph)
2. [Entity resolution — Wikipedia](https://en.wikipedia.org/wiki/Record_linkage)
3. [Ontology (information science) — Wikipedia](https://en.wikipedia.org/wiki/Ontology_(information_science))
4. [Data integration — Wikipedia](https://en.wikipedia.org/wiki/Data_integration)
