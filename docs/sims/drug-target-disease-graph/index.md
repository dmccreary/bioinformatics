---
title: Drug-Target-Disease Knowledge Graph
description: Interactive vis-network heterogeneous knowledge graph with drugs (blue circles), protein targets (green diamonds), and diseases (red squares) connected by binds, treats, and associated_with edges.
image: /sims/drug-target-disease-graph/drug-target-disease-graph.png
og:image: /sims/drug-target-disease-graph/drug-target-disease-graph.png
twitter:image: /sims/drug-target-disease-graph/drug-target-disease-graph.png
social:
   cards: false
quality_score: 3
---

# Drug-Target-Disease Knowledge Graph

<iframe src="main.html" height="550" width="100%" scrolling="no"></iframe>

[Run the Drug-Target-Disease Knowledge Graph MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim displays a **heterogeneous knowledge graph** connecting three entity types: **drugs** (blue circles), **protein targets** (green diamonds), and **diseases** (red squares). Labeled edges show the relationships: drugs "bind" targets, targets are "associated with" diseases, and drugs "treat" diseases.

### Node Types and Shapes

- **Drugs** (blue circles) — Pharmaceutical compounds
- **Protein Targets** (green diamonds) — The molecular targets that drugs act on
- **Diseases** (red squares) — Medical conditions

### Relationship Types

- **binds** (drug → target) — The drug physically interacts with the protein
- **associated_with** (target → disease) — The protein is genetically or functionally linked to the disease
- **treats** (drug → disease) — The drug is used clinically to treat the disease

### Drug Repurposing Paths

The most interesting patterns are **indirect paths**: a drug binds a target that is associated with a disease the drug was NOT designed to treat. These paths suggest potential drug repurposing opportunities.

## How to Use

1. **Click** any node to highlight all its direct connections and see the path structure
2. **Hover** for node details
3. **Trace paths** — Follow Drug → binds → Target → associated_with → Disease to discover drug-target-disease relationships
4. **Look for triangles** — When a Drug → Target → Disease path also has a direct Drug → treats → Disease edge, this validates the mechanism

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/drug-target-disease-graph/main.html"
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

- Understanding of drug mechanisms of action
- Basic knowledge of proteins as drug targets
- Concept of knowledge graphs

### Activities

1. **Exploration** (5 min): Identify all three node types by shape and color. Click several drugs and trace their connections to diseases through protein targets.
2. **Path Analysis** (5 min): Find a drug that binds a target associated with a disease the drug does NOT currently treat. This is a drug repurposing hypothesis. What additional evidence would you need?
3. **Discussion** (5 min): Why is a knowledge graph more useful for drug discovery than three separate tables of drugs, targets, and diseases?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What are the three node types and three edge types in this knowledge graph?
2. How can a Drug → Target → Disease path suggest a drug repurposing opportunity?
3. Why might a drug that "binds" a target NOT "treat" the associated disease?
4. What databases would you need to build a real drug-target-disease knowledge graph?

## References

1. [Drug repositioning — Wikipedia](https://en.wikipedia.org/wiki/Drug_repositioning)
2. [Drug target — Wikipedia](https://en.wikipedia.org/wiki/Drug_target)
3. [Knowledge graph — Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph)
4. [Pharmacology — Wikipedia](https://en.wikipedia.org/wiki/Pharmacology)
