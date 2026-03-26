---
title: Bipartite Metabolic Graph Structure
description: Interactive vis-network showing a bipartite metabolic graph with metabolite nodes (circles) and reaction nodes (squares) connected by directed substrate-to-product edges.
image: /sims/bipartite-metabolic-graph/bipartite-metabolic-graph.png
og:image: /sims/bipartite-metabolic-graph/bipartite-metabolic-graph.png
twitter:image: /sims/bipartite-metabolic-graph/bipartite-metabolic-graph.png
social:
   cards: false
quality_score: 3
---

# Bipartite Metabolic Graph Structure

<iframe src="main.html" height="560" width="100%" scrolling="no"></iframe>

[Run the Bipartite Metabolic Graph Structure MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes a **bipartite metabolic network** — a graph with two distinct node types: **metabolites** (circles, teal) and **reactions** (squares, orange). Directed edges show the flow of substrates into reactions and products out, capturing the structure of metabolic pathways as a graph.

### Bipartite Graph Structure

In a bipartite metabolic graph:

- **Metabolite nodes** represent chemical compounds (glucose, pyruvate, ATP, etc.)
- **Reaction nodes** represent enzyme-catalyzed transformations
- **Substrate edges** (metabolite → reaction) show which compounds are consumed
- **Product edges** (reaction → metabolite) show which compounds are produced
- Edges only connect metabolites to reactions (never metabolite-to-metabolite or reaction-to-reaction)

### Why Bipartite?

The bipartite structure enforces the biological constraint that metabolites don't spontaneously convert into each other — they must pass through an enzyme-catalyzed reaction. This makes the graph more biologically accurate than a simple metabolite-metabolite network.

## How to Use

1. **Click** any node to highlight all its direct connections — substrates and products for reactions, or participating reactions for metabolites
2. **Hover** for tooltips showing node details
3. **Drag** nodes to rearrange the layout
4. **Trace pathways** — Follow directed edges from substrates through reactions to products to trace metabolic flux

### Suggested Exploration

- Find glucose and trace all the reactions it participates in as a substrate
- Identify metabolites that appear as products of one reaction and substrates of the next — these are the intermediates of a metabolic pathway
- Look for hub metabolites (like ATP) that participate in many reactions — these are the currency metabolites of the cell

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/bipartite-metabolic-graph/main.html"
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

- Basic understanding of metabolic reactions (substrates, products, enzymes)
- Knowledge of glycolysis or the citric acid cycle
- Concept of bipartite graphs

### Activities

1. **Exploration** (5 min): Identify the two node types by shape and color. Click several reaction nodes and list their substrates and products. Verify that edges only connect metabolites to reactions.
2. **Pathway Tracing** (5 min): Starting from glucose, follow the directed edges through sequential reactions. How many reaction steps can you trace? This reconstructs a metabolic pathway from graph structure alone.
3. **Hub Analysis** (5 min): Which metabolites are connected to the most reactions? Why are molecules like ATP, NADH, and water considered "currency metabolites"? Should they be treated differently in network analysis?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What makes a metabolic graph "bipartite," and why is this structure biologically meaningful?
2. Why can't you have a direct edge between two metabolite nodes in a bipartite metabolic graph?
3. What is a "currency metabolite," and why might you want to remove these from network analysis?
4. How would you use this graph to identify all the products that can be made from a given substrate?

## References

1. [Bipartite graph — Wikipedia](https://en.wikipedia.org/wiki/Bipartite_graph)
2. [Metabolic network — Wikipedia](https://en.wikipedia.org/wiki/Metabolic_network)
3. [Metabolic pathway — Wikipedia](https://en.wikipedia.org/wiki/Metabolic_pathway)
4. [Glycolysis — Wikipedia](https://en.wikipedia.org/wiki/Glycolysis)
