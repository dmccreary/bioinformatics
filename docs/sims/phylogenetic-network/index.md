---
title: Phylogenetic Network with Reticulation Events
description: Interactive vis-network phylogenetic network showing tree edges in teal and reticulation (hybridization/HGT) edges in orange, with a toggle to show or hide reticulation events.
image: /sims/phylogenetic-network/phylogenetic-network.png
og:image: /sims/phylogenetic-network/phylogenetic-network.png
twitter:image: /sims/phylogenetic-network/phylogenetic-network.png
social:
   cards: false
quality_score: 3
---

# Phylogenetic Network with Reticulation Events

<iframe src="main.html" height="510" width="100%" scrolling="no"></iframe>

[Run the Phylogenetic Network with Reticulation Events MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim displays a **phylogenetic network** — an extension of a phylogenetic tree that can represent **reticulation events** such as hybridization, horizontal gene transfer (HGT), and recombination. Tree edges are shown in teal, while reticulation edges are shown in orange.

### Tree vs. Network

- **Teal edges** — Standard tree edges representing vertical inheritance (parent to offspring)
- **Orange edges** — Reticulation edges representing non-tree-like events (hybridization, HGT, or recombination)
- **Toggle checkbox** — Show or hide reticulation edges to compare the tree-like view with the full network

### Why Phylogenetic Networks?

Traditional phylogenetic trees assume strictly bifurcating descent. But many biological processes violate this:

- **Horizontal gene transfer** in bacteria transfers genes between unrelated lineages
- **Hybridization** in plants and animals creates offspring from two distinct species
- **Recombination** in viruses shuffles genetic material between strains

Phylogenetic networks capture these complex evolutionary histories that trees cannot represent.

## How to Use

1. **Toggle reticulation events** — Use the checkbox to show/hide orange reticulation edges
2. **Compare views** — With reticulation hidden, you see a standard tree; with reticulation shown, you see the full network
3. **Hover** over nodes and edges for details about each taxon and evolutionary event

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/phylogenetic-network/main.html"
        height="510"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of phylogenetic trees
- Concept of horizontal gene transfer and hybridization
- Familiarity with evolutionary processes

### Activities

1. **Exploration** (5 min): View the network with and without reticulation edges. How many reticulation events are present? Which taxa are involved?
2. **Tree vs. Network** (5 min): With reticulation hidden, describe the tree topology. Now add reticulation back — how does it change your understanding of the evolutionary relationships?
3. **Discussion** (5 min): In which organisms are phylogenetic networks most important (bacteria, plants, viruses)? Why are simple trees insufficient for these groups?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What is a reticulation event, and why can't a standard bifurcating tree represent it?
2. Give two biological processes that create reticulate evolutionary patterns.
3. Why is horizontal gene transfer particularly common in bacteria?
4. How does a phylogenetic network change the interpretation of evolutionary relationships compared to a tree?

## References

1. [Phylogenetic network — Wikipedia](https://en.wikipedia.org/wiki/Phylogenetic_network)
2. [Horizontal gene transfer — Wikipedia](https://en.wikipedia.org/wiki/Horizontal_gene_transfer)
3. [Hybrid (biology) — Wikipedia](https://en.wikipedia.org/wiki/Hybrid_(biology))
4. [Reticulate evolution — Wikipedia](https://en.wikipedia.org/wiki/Reticulate_evolution)
