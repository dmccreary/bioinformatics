---
title: Network Model Comparison
description: Interactive p5.js MicroSim for network model comparison.
image: /sims/network-models/network-models.png
og:image: /sims/network-models/network-models.png
twitter:image: /sims/network-models/network-models.png
social:
   cards: false
quality_score: 3
---

# Network Model Comparison

<iframe src="main.html" height="500" width="100%" scrolling="no"></iframe>

[Run the Network Model Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim lets you compare three foundational network models
side by side, each with its own degree distribution chart.
These models are widely used in bioinformatics to describe
biological networks such as protein-protein interaction (PPI) networks,
gene regulatory networks, and metabolic pathway graphs.

### Three Network Models

**Erdos-Renyi (ER) Random Network** — Each possible edge between
nodes exists with a fixed probability *p*. This produces a
network where most nodes have a similar number of connections
and the degree distribution follows a Poisson-like bell curve.
ER networks serve as a null model: if a real biological network
looks very different from an ER graph of the same size, the
difference reveals non-random organizing principles at work.

**Barabasi-Albert (BA) Scale-Free Network** — New nodes attach
preferentially to highly connected nodes ("the rich get richer").
This produces a power-law degree distribution with a few
highly connected hub nodes and many nodes with only one or two
connections. Many real biological networks are approximately
scale-free. In PPI networks, hub proteins tend to be essential
genes — removing them is often lethal to the organism, while
removing low-degree nodes has little effect.

**Watts-Strogatz (WS) Small-World Network** — Starting from a
regular ring lattice, each edge is randomly rewired with
probability *p*. Even a small amount of rewiring dramatically
reduces the average path length while preserving high clustering.
Small-world properties appear in neural networks, metabolic
networks, and gene co-expression networks, where they enable
efficient signal propagation and modular organization.

### Degree Distributions

Below each network visualization is a bar chart showing the
**degree distribution** — how many nodes have each number of
connections. Comparing these distributions is key to
understanding the structural differences between models:

- **ER**: Narrow, symmetric distribution centered near the mean degree
- **BA**: Right-skewed distribution with a long tail (few hubs, many low-degree nodes)
- **WS**: Narrow distribution similar to ER but shifted, reflecting the regular lattice origin

### Why This Matters for Bioinformatics

Understanding network topology helps bioinformaticians:

- **Identify essential genes**: Hub nodes in scale-free PPI networks are disproportionately essential
- **Detect functional modules**: Clusters in small-world networks often correspond to protein complexes or metabolic pathways
- **Assess network robustness**: Scale-free networks are resilient to random node removal but vulnerable to targeted hub attacks
- **Build null models**: ER random graphs provide a baseline for statistical tests of network properties

## How to Use

1. **Generate** — Click the Generate button to create all three networks with the current parameter settings
2. **ER p slider** — Controls the edge probability in the Erdos-Renyi model. Higher values produce denser, more connected graphs
3. **BA m slider** — Controls how many edges each new node adds in the Barabasi-Albert model. Higher values produce denser networks with less extreme hub dominance
4. **WS p slider** — Controls the rewiring probability in the Watts-Strogatz model. At 0 you see a perfect ring lattice; increasing *p* introduces shortcuts that shrink path lengths

Each slider updates only its own network in real time, so you can
explore one model's parameter space without disturbing the others.

**Try these experiments:**

- Set ER *p* very low (0.05) and very high (0.40) — watch the degree distribution shift and widen
- Set BA *m* = 1 vs. *m* = 5 — see how hub dominance changes
- Slowly increase WS *p* from 0 to 0.5 — observe the transition from regular lattice to random-like topology

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/network-models/main.html"
        height="500"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Basic understanding of graphs (nodes and edges)
- Familiarity with degree as the number of connections a node has
- Introduction to biological networks (PPI, gene regulatory, metabolic)

### Activities

1. **Exploration** (5 min): Generate networks with default parameters. Compare the three visualizations and their degree distributions. Which network has the most uneven distribution of connections?
2. **Guided Practice** (7 min): Systematically vary one parameter at a time. For the ER model, record how the average degree changes with *p*. For the BA model, note how the number of visible hubs changes with *m*. For the WS model, describe the visual difference between *p* = 0 and *p* = 0.3.
3. **Discussion** (5 min): Given that real PPI networks tend to have a few highly connected hub proteins and many proteins with few interactions, which model best captures this property? What does this imply about how protein interaction networks evolved?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. Which network model produces a power-law degree distribution, and what biological significance does this have?
2. Why is the Erdos-Renyi model useful as a null model even though real biological networks rarely look like ER graphs?
3. A metabolic network has high clustering and short average path length. Which model best explains this topology, and what biological advantage might it confer?
4. If you removed the top 3 most-connected nodes from a BA network vs. 3 random nodes, which removal strategy would be more disruptive? Why?

## References

1. [Erdos-Renyi model — Wikipedia](https://en.wikipedia.org/wiki/Erd%C5%91s%E2%80%93R%C3%A9nyi_model)
2. [Barabasi-Albert model — Wikipedia](https://en.wikipedia.org/wiki/Barab%C3%A1si%E2%80%93Albert_model)
3. [Watts-Strogatz model — Wikipedia](https://en.wikipedia.org/wiki/Watts%E2%80%93Strogatz_model)
4. [Scale-free network — Wikipedia](https://en.wikipedia.org/wiki/Scale-free_network)
5. [Biological network — Wikipedia](https://en.wikipedia.org/wiki/Biological_network)
