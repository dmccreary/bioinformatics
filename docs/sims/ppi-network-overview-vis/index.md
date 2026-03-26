---
title: PPI Network Overview
description: Interactive force-directed protein-protein interaction network with 25 cancer-related proteins, hub highlighting, betweenness centrality, and network statistics.
social:
   cards: false
quality_score: 0
---

# PPI Network Overview

<iframe src="main.html" height="530" width="100%" scrolling="no"></iframe>

[Run the PPI Network Overview MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes a **25-node protein-protein interaction (PPI) network**
built from well-characterized cancer signaling proteins. The network uses the
vis-network library's **ForceAtlas2** force-directed layout algorithm, which
automatically positions tightly connected proteins near each other and pushes
loosely connected proteins apart — revealing the modular structure of the network
without any manual placement.

Each node represents a protein, and each edge represents a known physical or
functional interaction between two proteins. The network includes proteins from
several major cancer signaling pathways:

- **TP53 / DNA damage response** — TP53, MDM2, BRCA1, ATM, CHEK2
- **Cell cycle regulation** — RB1, CDK2, CCND1, E2F1
- **PI3K/AKT signaling** — AKT1, PTEN, PIK3CA, EGFR, ERBB2
- **MAPK cascade** — SRC, RAF1, BRAF, MAP2K1, MAPK1
- **Transcription factors** — MYC, JUN, FOS
- **JAK/STAT signaling** — STAT3, JAK2
- **Adaptor protein** — GRB2

### Visual Encoding

- **Node size** scales with degree (number of connections) — larger nodes have more interactions
- **Red nodes** are hub proteins with degree greater than 4, indicating they interact with many partners
- **Blue nodes** are regular proteins with 4 or fewer connections
- **Edges** represent known protein-protein interactions

### Network Statistics (Sidebar)

The sidebar displays global network properties that characterize the overall
structure:

- **Nodes / Edges** — basic size of the network
- **Average Degree** — the mean number of interactions per protein
- **Max Degree** — the most connected protein's interaction count
- **Density** — fraction of all possible edges that are present (low density indicates a sparse, selective interaction network)
- **Average Clustering Coefficient** — measures how often a protein's neighbors also interact with each other, indicating local modularity

### Hover Details

Hovering over any node reveals per-protein metrics:

- **Degree** — number of direct interaction partners
- **Betweenness Centrality** — how often the protein lies on shortest paths between other proteins (normalized 0–1). High betweenness proteins like GRB2 act as bridges between network modules
- **Clustering Coefficient** — proportion of the protein's neighbors that also interact with each other. A value of 1.0 means all neighbors form a complete subgraph

## How to Use

- **Hover** over a node to see its name, degree, betweenness centrality, and clustering coefficient in the sidebar
- **Drag** any node to rearrange the layout — the physics simulation adjusts neighboring nodes in response
- **Scroll** to zoom in and out of the network
- **Click and drag** the background to pan across the network
- **Regenerate** — click the button in the lower left to randomize node positions and produce a fresh layout

## Key Concepts Illustrated

### Hub Proteins

Hub proteins (shown in red) are highly connected nodes that interact with many
partners. In biological networks, hubs tend to be essential genes — knocking them
out often has severe consequences for the organism. TP53, for example, is the
most frequently mutated gene in human cancers.

### Betweenness Centrality

A protein with high betweenness centrality sits on many shortest paths between
other proteins, making it a critical communication bridge. GRB2, an adaptor
protein, connects receptor tyrosine kinases (EGFR, ERBB2) to downstream
signaling cascades (PI3K/AKT, MAPK) — reflected in its high betweenness despite
having moderate degree.

### Clustering and Modularity

Proteins within the same signaling pathway tend to have high clustering
coefficients because they interact densely with each other. The force-directed
layout reveals this modularity visually by placing pathway members close together.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/ppi-network-overview-vis/main.html"
        height="640"
        width="100%"
        scrolling="no"></iframe>
```
