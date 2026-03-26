---
title: Overview of a Metabolic Network
description: Interactive vis-network visualization of a metabolic network with hub metabolites (ATP, NADH, pyruvate) scaled by connectivity, pathway clusters color-coded, and click-to-highlight pathway tracing.
image: /sims/metabolic-network-overview/metabolic-network-overview.png
og:image: /sims/metabolic-network-overview/metabolic-network-overview.png
twitter:image: /sims/metabolic-network-overview/metabolic-network-overview.png
social:
   cards: false
quality_score: 3
---

# Overview of a Metabolic Network

<iframe src="main.html" height="550" width="100%" scrolling="no"></iframe>

[Run the Overview of a Metabolic Network MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim displays a **metabolic network** where metabolites are nodes and reactions are edges. Hub metabolites like ATP, NADH, and pyruvate appear as large nodes reflecting their high connectivity. Different metabolic pathways are color-coded, and clicking a pathway highlights its constituent metabolites and reactions.

### Visual Encoding

- **Node size** scales with degree — highly connected metabolites (currency metabolites) are larger
- **Pathway colors** — Each metabolic pathway cluster is assigned a distinct color (glycolysis, TCA cycle, pentose phosphate, etc.)
- **Click to highlight** — Click any node or pathway label to highlight connected components

### Hub Metabolites

Currency metabolites like ATP, NADH, CoA, and water participate in hundreds of reactions. Their high connectivity makes them hubs in the network, but their ubiquity means they often need special treatment in network analysis to avoid trivially connecting all pathways.

## How to Use

1. **Click** any metabolite to highlight its connected reactions and pathway
2. **Hover** for metabolite names and pathway assignments
3. **Drag and zoom** to explore the network
4. **Identify hubs** — Find the largest nodes (most connected metabolites)

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/metabolic-network-overview/main.html"
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

- Understanding of metabolic pathways (glycolysis, TCA cycle)
- Basic knowledge of enzymes and metabolites
- Concept of network hubs

### Activities

1. **Exploration** (5 min): Identify the 3 largest hub metabolites. Why are these molecules so highly connected?
2. **Pathway Tracing** (5 min): Click to highlight glycolysis. Trace the pathway from glucose to pyruvate. How many intermediate metabolites are involved?
3. **Discussion** (5 min): Should hub metabolites like ATP and water be included or removed from metabolic network analysis? What are the arguments for each approach?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What is a currency metabolite, and why does it act as a hub in a metabolic network?
2. How does the network view of metabolism differ from the traditional linear pathway diagram?
3. Why might removing water and ATP from the network reveal more biologically meaningful connections?

## References

1. [Metabolic network — Wikipedia](https://en.wikipedia.org/wiki/Metabolic_network)
2. [Metabolic pathway — Wikipedia](https://en.wikipedia.org/wiki/Metabolic_pathway)
3. [Glycolysis — Wikipedia](https://en.wikipedia.org/wiki/Glycolysis)
4. [Citric acid cycle — Wikipedia](https://en.wikipedia.org/wiki/Citric_acid_cycle)
