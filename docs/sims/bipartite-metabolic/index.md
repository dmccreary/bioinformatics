---
title: Bipartite Graph of a Metabolic Sub-network
description: Interactive p5.js bipartite layout with enzymes on the left and metabolites on the right, showing how enzymes connect substrates to products in a glycolysis sub-network.
image: /sims/bipartite-metabolic/bipartite-metabolic.png
og:image: /sims/bipartite-metabolic/bipartite-metabolic.png
twitter:image: /sims/bipartite-metabolic/bipartite-metabolic.png
social:
   cards: false
quality_score: 3
---

# Bipartite Graph of a Metabolic Sub-network

<iframe src="main.html" height="722" width="100%" scrolling="no"></iframe>

[Run the Bipartite Graph of a Metabolic Sub-network MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit the Bipartite Graph of a Metabolic Sub-network MicroSim using the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/0uD18j9K0)

## About This MicroSim

This MicroSim displays a **glycolysis sub-network** as a bipartite graph with enzymes (circles, teal) arranged on the left and metabolites (squares, orange) on the right. Hovering over any node highlights its connected edges and partner nodes, making it easy to trace which enzymes act on which metabolites.

### Two-Column Layout

- **Left column (Enzymes)** — The catalysts that drive each reaction (hexokinase, phosphofructokinase, pyruvate kinase, etc.)
- **Right column (Metabolites)** — The substrates and products (glucose, glucose-6-phosphate, fructose-6-phosphate, pyruvate, etc.)
- **Edges** connect each enzyme to its substrates (consumed) and products (produced)

### Why This Layout?

The two-column bipartite layout makes the enzyme-metabolite relationships immediately visible. You can quickly see which enzymes share substrates, which metabolites are produced by multiple enzymes, and how the pathway flows from glucose at the top to pyruvate at the bottom.

## How to Use

1. **Hover** over any enzyme or metabolite to highlight its connections — connected edges and partner nodes light up
2. **Trace the pathway** — Follow from glucose (top right) through connected enzymes down to pyruvate (bottom right)
3. **Identify shared metabolites** — Find metabolites connected to multiple enzymes, indicating branch points or shared intermediates

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/bipartite-metabolic/main.html"
        height="522"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
10-15 minutes

### Prerequisites

- Basic knowledge of glycolysis as a metabolic pathway
- Understanding of enzyme-substrate relationships
- Concept of bipartite graphs

### Activities

1. **Exploration** (4 min): Hover over each enzyme in order from top to bottom. For each, identify its substrate(s) and product(s). This reconstructs the glycolysis pathway from graph structure.
2. **Guided Practice** (4 min): Find ATP in the metabolites column. Which enzymes consume ATP? Which produce it? What does this tell you about the energy balance of glycolysis?
3. **Discussion** (4 min): If you removed hexokinase (the first enzyme) from this graph, what would happen to the downstream metabolites? How does this illustrate the concept of metabolic flux?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. In this bipartite layout, why are enzymes and metabolites placed in separate columns?
2. Which metabolite in glycolysis is connected to the most enzymes? What does this suggest about its role?
3. How would you identify a rate-limiting enzyme from the graph structure alone?

## References

1. [Glycolysis — Wikipedia](https://en.wikipedia.org/wiki/Glycolysis)
2. [Bipartite graph — Wikipedia](https://en.wikipedia.org/wiki/Bipartite_graph)
3. [Enzyme — Wikipedia](https://en.wikipedia.org/wiki/Enzyme)
4. [Metabolic pathway — Wikipedia](https://en.wikipedia.org/wiki/Metabolic_pathway)
