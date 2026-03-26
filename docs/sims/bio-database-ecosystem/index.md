---
title: Biological Database Ecosystem
description: Interactive vis-network diagram showing major bioinformatics databases as color-coded nodes with cross-reference edges between them.
image: /sims/bio-database-ecosystem/bio-database-ecosystem.png
og:image: /sims/bio-database-ecosystem/bio-database-ecosystem.png
twitter:image: /sims/bio-database-ecosystem/bio-database-ecosystem.png
social:
   cards: false
quality_score: 3
---

# Biological Database Ecosystem

<iframe src="main.html" height="530" width="100%" scrolling="no"></iframe>

[Run the Biological Database Ecosystem MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim maps the **ecosystem of major bioinformatics databases** as an interactive network. Each node represents a database, colored by category (sequence, structure, pathway, interaction, etc.), and edges show cross-reference links between databases. This helps students understand how biological data is organized and interconnected across the field.

### Database Categories

Databases are grouped by the type of biological data they store:

- **Sequence databases** — GenBank, UniProt, RefSeq
- **Structure databases** — PDB, AlphaFold DB
- **Pathway databases** — KEGG, Reactome
- **Interaction databases** — STRING, IntAct, BioGRID
- **Ontology/annotation** — Gene Ontology, InterPro
- **Disease/variation** — OMIM, ClinVar, dbSNP

### Cross-References

Edges between databases show how entries link to each other. For example, a UniProt protein entry cross-references its 3D structure in PDB, its gene in GenBank, its pathways in KEGG, and its known variants in ClinVar.

## How to Use

1. **Hover** over any database node to see its full name, description, and data type
2. **Drag** nodes to rearrange the layout
3. **Zoom and pan** to explore different regions of the ecosystem
4. **Follow edges** to understand how databases cross-reference each other

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/bio-database-ecosystem/main.html"
        height="530"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Basic understanding of biological data types (sequences, structures, pathways)
- Awareness that bioinformatics relies on public databases

### Activities

1. **Exploration** (5 min): Identify all sequence databases in the network. How do they differ? (GenBank stores nucleotide sequences, UniProt stores protein sequences, RefSeq provides curated reference sequences.)
2. **Cross-Reference Tracing** (5 min): Start at GenBank and follow edges to all connected databases. List each connected database and explain what type of information you would find there.
3. **Discussion** (5 min): You discover a new gene. Which databases would you need to search, and in what order, to fully characterize its sequence, structure, function, associated diseases, and pathways?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. Name three major categories of biological databases and give one example of each.
2. Why is cross-referencing between databases important for biological research?
3. What is the difference between GenBank and UniProt in terms of the data they store?
4. If you wanted to find all known disease-causing mutations in a gene, which databases would you consult?

## References

1. [Biological database — Wikipedia](https://en.wikipedia.org/wiki/Biological_database)
2. [GenBank — Wikipedia](https://en.wikipedia.org/wiki/GenBank)
3. [UniProt — Wikipedia](https://en.wikipedia.org/wiki/UniProt)
4. [Protein Data Bank — Wikipedia](https://en.wikipedia.org/wiki/Protein_Data_Bank)
5. [KEGG — Wikipedia](https://en.wikipedia.org/wiki/KEGG)
