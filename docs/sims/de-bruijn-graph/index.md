---
title: De Bruijn Graph Construction
description: Interactive visualization showing how a DNA sequence is decomposed into k-mers and assembled into a de Bruijn graph, with adjustable k-mer size and custom sequence input.
image: /sims/de-bruijn-graph/de-bruijn-graph.png
og:image: /sims/de-bruijn-graph/de-bruijn-graph.png
twitter:image: /sims/de-bruijn-graph/de-bruijn-graph.png
social:
   cards: false
quality_score: 3
---

# De Bruijn Graph Construction

<iframe src="main.html" height="670" width="100%" scrolling="no"></iframe>

[Run the De Bruijn Graph Construction MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates how **de Bruijn graphs** are constructed from DNA sequences — the mathematical foundation behind modern genome assemblers like SPAdes, Velvet, and ABySS. Students enter a DNA sequence, choose a k-mer size, and watch the sequence decompose into overlapping k-mers that form a directed graph.

### How It Works

1. The input DNA sequence is split into overlapping **k-mers** (subsequences of length k)
2. Each k-mer becomes a **directed edge** in the graph
3. The **nodes** are (k-1)-mers — the prefix and suffix of each k-mer
4. Nodes that share the same (k-1)-mer sequence are merged, creating the characteristic branching and merging structure of de Bruijn graphs
5. Nodes are laid out in a circle for clarity

### Why This Matters for Bioinformatics

De Bruijn graphs are the dominant data structure for short-read genome assembly:

- Sequencing machines produce millions of short reads (100-300 bp)
- These reads are broken into k-mers and assembled into a de Bruijn graph
- Walking through the graph (finding an Eulerian path) reconstructs the original genome
- Repeated sequences create cycles in the graph, which is why genome assembly is computationally challenging

## How to Use

1. **Sequence input** — Type or paste a DNA sequence (A, T, G, C). Invalid characters are stripped.
2. **k slider** — Adjust the k-mer size. Smaller k produces fewer, more connected nodes; larger k produces more nodes with less ambiguity.
3. **Build button** — Construct the de Bruijn graph from the current sequence and k value
4. **Reset button** — Return to the default sequence

### Suggested Experiments

- Start with the default sequence `ATGGCGTGCA` and k=4. Count the nodes and edges. Are any nodes repeated?
- Change k from 3 to 6 and observe how the graph structure changes — more nodes appear with less overlap
- Try a repetitive sequence like `ATGATGATG` and see how repeats create cycles in the graph
- Enter a longer sequence and notice how the graph becomes more complex — this illustrates the assembly challenge

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/de-bruijn-graph/main.html"
        height="670"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of DNA sequences and k-mers
- Basic graph theory (nodes, directed edges)
- Concept of genome sequencing and short reads

### Activities

1. **Exploration** (5 min): Build the graph with the default sequence at k=4. List all the k-mers and verify that each one appears as an edge. Verify that nodes are (k-1)-mers.
2. **K-mer Size Effects** (5 min): Keep the same sequence but change k from 3 to 5 to 7. How does the graph change? At what k value does the graph become a simple linear path with no branches?
3. **Repeat Sequences** (5 min): Enter `ATGATGATGATG`. Build at k=3, then k=4, then k=5. At which k value do you first see a cycle? What does this tell you about how repeats complicate genome assembly?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. In a de Bruijn graph, what do the nodes represent and what do the edges represent?
2. Why does increasing k reduce the number of branches in the graph?
3. A genome contains a 500-bp tandem repeat. If your k-mer size is 100, will the de Bruijn graph contain a cycle at this repeat? Why or why not?
4. Why do genome assemblers use de Bruijn graphs instead of simply aligning all reads to each other?

## References

1. [De Bruijn graph — Wikipedia](https://en.wikipedia.org/wiki/De_Bruijn_graph)
2. [De Bruijn sequence — Wikipedia](https://en.wikipedia.org/wiki/De_Bruijn_sequence)
3. [Sequence assembly — Wikipedia](https://en.wikipedia.org/wiki/Sequence_assembly)
4. [K-mer — Wikipedia](https://en.wikipedia.org/wiki/K-mer)
5. [Eulerian path — Wikipedia](https://en.wikipedia.org/wiki/Eulerian_path)
