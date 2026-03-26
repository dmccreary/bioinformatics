---
title: Protein Interaction Network Overview
description: Interactive p5.js force-directed visualization of a 25-node cancer protein interaction network with hub highlighting, degree-scaled node sizes, and hover details.
image: /sims/ppi-network-overview/ppi-network-overview.png
og:image: /sims/ppi-network-overview/ppi-network-overview.png
twitter:image: /sims/ppi-network-overview/ppi-network-overview.png
social:
   cards: false
quality_score: 3
---

# Protein Interaction Network Overview

<iframe src="main.html" height="582" width="100%" scrolling="no"></iframe>

[Run the Protein Interaction Network Overview MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes a **25-protein interaction network** built from well-characterized cancer signaling proteins using a p5.js force-directed layout. Proteins are represented as nodes, with edges showing known physical or functional interactions. The force simulation positions tightly connected proteins near each other, revealing the modular structure of cancer signaling.

### Proteins Included

The network spans several major cancer signaling pathways:

- **TP53 / DNA damage** — TP53, MDM2, BRCA1, ATM, CHEK2
- **Cell cycle** — RB1, CDK2, CCND1, E2F1
- **PI3K/AKT** — AKT1, PTEN, PIK3CA, EGFR, ERBB2
- **MAPK cascade** — SRC, RAF1, BRAF, MAP2K1, MAPK1
- **Transcription** — MYC, JUN, FOS
- **JAK/STAT** — STAT3, JAK2
- **Adaptor** — GRB2

### Visual Encoding

- **Node size** scales with degree (number of interactions) — larger nodes are more connected
- **Hub nodes** (high degree) are highlighted, indicating proteins central to many interactions
- **Edges** represent known protein-protein interactions
- **Force-directed layout** automatically clusters proteins that share many connections

## How to Use

1. **Hover** over any node to see its protein name and network metrics
2. **Observe the layout** — the force simulation clusters pathway members together
3. **Reset button** — Randomize node positions and watch the force simulation re-organize the network
4. **Identify hubs** — Find the most connected proteins and consider their biological significance

### Suggested Exploration

- Find TP53 — it should be one of the largest nodes with 6 connections. In real biology, TP53 is the most frequently mutated gene in human cancers.
- Locate GRB2 — this adaptor protein bridges receptor tyrosine kinases to downstream signaling cascades, making it a critical network connector.
- Compare pathway clusters — can you visually distinguish the DNA damage pathway from the MAPK cascade based on how the force layout positions them?

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/ppi-network-overview/main.html"
        height="582"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of proteins and their cellular functions
- Basic graph theory (nodes, edges, degree)
- Familiarity with cancer signaling pathways

### Activities

1. **Exploration** (5 min): Let the force simulation stabilize. Identify the 3 most connected proteins (largest nodes). What do these hub proteins have in common biologically?
2. **Pathway Identification** (5 min): Try to identify visual clusters that correspond to signaling pathways. Do the TP53/DNA-damage proteins cluster together? Do the MAPK proteins form a recognizable group?
3. **Hub Analysis** (5 min): If you were designing a cancer drug, which protein(s) would you target based on their network position? Consider: targeting a hub disrupts many pathways, but may cause severe side effects.
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is a "hub" protein in a PPI network, and why are hubs often essential genes?
2. Why does the force-directed layout tend to place proteins from the same signaling pathway near each other?
3. GRB2 is an adaptor protein with moderate degree but connects receptor tyrosine kinases to downstream signaling. What network metric (other than degree) would capture its importance?
4. If you removed TP53 from this network, how many connections would be lost? What does this suggest about TP53's role in cancer?

## References

1. [Protein-protein interaction — Wikipedia](https://en.wikipedia.org/wiki/Protein%E2%80%93protein_interaction)
2. [Interactome — Wikipedia](https://en.wikipedia.org/wiki/Interactome)
3. [TP53 — Wikipedia](https://en.wikipedia.org/wiki/P53)
4. [Scale-free network — Wikipedia](https://en.wikipedia.org/wiki/Scale-free_network)
5. [Network biology — Wikipedia](https://en.wikipedia.org/wiki/Network_biology)
