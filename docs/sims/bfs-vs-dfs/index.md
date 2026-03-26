---
title: BFS vs DFS Traversal Comparison
description: Side-by-side animation comparing breadth-first search (queue-based) and depth-first search (stack-based) graph traversal on the same 8-node graph.
image: /sims/bfs-vs-dfs/bfs-vs-dfs.png
og:image: /sims/bfs-vs-dfs/bfs-vs-dfs.png
twitter:image: /sims/bfs-vs-dfs/bfs-vs-dfs.png
social:
   cards: false
quality_score: 3
---

# BFS vs DFS Traversal Comparison

<iframe src="main.html" height="482" width="100%" scrolling="no"></iframe>

[Run the BFS vs DFS Traversal Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim runs **breadth-first search (BFS)** and **depth-first search (DFS)** side by side on the same 8-node graph, allowing students to directly compare how each algorithm explores the graph structure. BFS uses a **queue** (blue) and explores level by level, while DFS uses a **stack** (red) and dives deep along each branch before backtracking.

### Visual Encoding

- **Blue nodes and edges** — Visited by BFS, with numbered visit order
- **Red nodes and edges** — Visited by DFS, with numbered visit order
- **Gray nodes** — Not yet visited
- **Queue display** (BFS) — Shows the current contents of the FIFO queue
- **Stack display** (DFS) — Shows the current contents of the LIFO stack
- Both traversals start from the same root node (A) and use the same graph

### Why This Matters for Bioinformatics

Graph traversal algorithms are foundational for analyzing biological networks:

- **BFS** finds shortest paths in protein-protein interaction networks, identifying the minimum number of interactions connecting two proteins
- **DFS** is used in topological sorting of metabolic pathways and detecting cycles in regulatory networks
- Both algorithms underpin community detection, network motif finding, and pathway enrichment analysis

## How to Use

1. **Step button** — Advance both BFS and DFS by one step simultaneously, watching how each algorithm chooses the next node differently
2. **Play button** — Auto-step through the traversal at the speed set by the slider
3. **Reset button** — Clear all visited nodes and restart both traversals
4. **Speed slider** — Control the auto-play speed (milliseconds between steps)

### Suggested Experiments

- Step through slowly and compare the visit order: BFS visits all neighbors of A before moving deeper, while DFS dives down the leftmost branch first
- Notice when the two algorithms visit the same node at different times — this reveals their fundamentally different exploration strategies
- After both traversals complete, compare the numbered visit orders to understand the tree structures each algorithm implicitly builds

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/bfs-vs-dfs/main.html"
        height="482"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of graphs as nodes (vertices) connected by edges
- Basic knowledge of queues (FIFO) and stacks (LIFO) as data structures
- Familiarity with the concept of graph traversal

### Activities

1. **Exploration** (5 min): Click Step repeatedly and watch both traversals progress. Write down the visit order for BFS and DFS separately. Which algorithm reaches node H first?
2. **Guided Practice** (5 min): Reset and step through again. After each step, predict which node each algorithm will visit next by looking at the queue (BFS) and stack (DFS) contents. Verify your predictions.
3. **Discussion** (5 min): In a PPI network, you want to find all proteins within 2 interactions of a target protein. Which algorithm is more appropriate and why? Now consider finding all proteins in a connected component — does the choice of algorithm matter?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What data structure does BFS use, and how does this produce a level-by-level exploration pattern?
2. What data structure does DFS use, and why does this cause the algorithm to explore deeply before backtracking?
3. If you needed to find the shortest path (fewest edges) between two nodes in an unweighted graph, which algorithm guarantees the optimal solution? Why?
4. Give a bioinformatics example where DFS would be more appropriate than BFS.

## References

1. [Breadth-first search — Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)
2. [Depth-first search — Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)
3. [Graph traversal — Wikipedia](https://en.wikipedia.org/wiki/Graph_traversal)
4. [Biological network — Wikipedia](https://en.wikipedia.org/wiki/Biological_network)
