# Log: Course Description Generation

**Date:** 2026-03-24
**File:** docs/course-description.md

## Initial Prompt

Create a detailed course description for a 14-week college-level course in Bioinformatics.
The course is targeting both college students and professionals looking to expand their knowledge
of bioinformatics. The focus of the class is general bioinformatics but with a
special focus on graph representations of data. The course has detailed data models
of graph models for important bioinformatics data.
Create an overview of the course, topics covered, topics not covered, case studies,
and descriptions of capstone projects.
At the end of the course description create a detailed list of learning objectives grouped by
the 2001 Bloom taxonomy.
Store the course description in a new markdown file docs/course-description.md using the mkdocs material markdown format.

## Changes Made During Review

### 1. Renamed "central dogma" terminology

**Original:** "The central dogma and data types in bioinformatics"
**Changed to:** "Canonical data types in bioinformatics"
**Reason:** The user found "central dogma" sounds negative and misleading. Francis Crick later admitted he misunderstood the word "dogma" — he meant it as a central principle, not an unquestionable belief. The concept (DNA → RNA → Protein) will be explained in the Week 1 chapter content with historical context about the naming.

### 2. Updated Week 2 content

- Replaced "hypergraphs" with "labeled property graphs (LPGs)" for practical relevance
- Added "Scaling graph databases to billions of vertices with distributed graphs"

### 3. Updated Week 3 content

- Replaced "Neo4j and the Cypher query language" with separate bullets for Cypher and GQL
- Changed "building a small protein interaction graph in Neo4j" to "An LPG graph data model for protein interaction"
- Updated hands-on lab description to "Running graph queries on a protein interaction graph"

### 4. Updated Week 6

- Changed "Protein contact maps as graphs" to "A graph data model for protein contact maps"

### 5. Added "Graph data model for X" to every content week

Ensured each week (4–13) has an explicit graph data model bullet:

| Week | Graph Data Model |
|------|-----------------|
| 3 | protein interaction (LPG) |
| 4 | sequence similarity networks |
| 5 | evolutionary relationships |
| 6 | protein contact maps |
| 7 | PPI networks |
| 8 | genomic variants |
| 9 | gene regulation |
| 10 | metabolic pathways |
| 11 | drug repurposing |
| 12 | biomedical knowledge graphs |
| 13 | multi-omics integration |

### 6. Added explicit graph data models to all capstone projects

Each of the 6 capstone projects now includes a **Graph data model** paragraph describing node types, edge types, and key properties:

- **Project 1 (Antibiotic Resistance):** resistance genes, mobile genetic elements, bacterial species, antibiotic compounds
- **Project 2 (Rare Disease Diagnosis):** phenotypes (HPO), genes, variants, diseases (OMIM/Orphanet)
- **Project 3 (Metabolic Model Comparison):** bipartite graph of metabolites and reactions with organism property
- **Project 4 (Protein Function Prediction):** protein nodes, interaction edges, GO term DAG subgraph
- **Project 5 (Multi-Omics Stratification):** patient nodes, gene/protein nodes, patient-to-patient similarity edges
- **Project 6 (Custom Project):** requirement for labeled property graph schema diagram in proposal

### 7. Updated Week 13 visualization tools

- Changed "Graph visualization: Cytoscape, Gephi, vis-network" to "Graph visualization examples: Vis-network, Cytoscape, Gephi"
- Added "Appendix: A vis-network tutorial for informatics professionals"

### 8. Updated Required Software and Tools

- Changed Neo4j requirement to "Neo4j Desktop (Community Edition) or similar tool (Memgraph etc) that runs Cypher"
- Replaced "Cytoscape for network visualization" with "Vis-network JavaScript library for network visualization"

### 9. Updated copyright year to 2026

### 10. Commented out Google Analytics (no property ID yet)