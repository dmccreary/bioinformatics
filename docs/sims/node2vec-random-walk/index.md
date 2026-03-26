---
title: Node2Vec Biased Random Walk
description: Interactive p5.js MicroSim for node2vec biased random walk.
image: /sims/node2vec-random-walk/node2vec-random-walk.png
og:image: /sims/node2vec-random-walk/node2vec-random-walk.png
twitter:image: /sims/node2vec-random-walk/node2vec-random-walk.png
social:
   cards: false
quality_score: 3
---

# Node2Vec Biased Random Walk

<iframe src="main.html" height="522" width="100%" scrolling="no"></iframe>

[Run the Node2Vec Biased Random Walk MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim visualizes the **node2vec biased random walk** algorithm,
a foundational technique for learning low-dimensional vector representations
(embeddings) of nodes in a graph. Node2vec embeddings are widely used in
bioinformatics for tasks such as protein function prediction, drug-target
interaction discovery, and disease gene prioritization.

### How Node2Vec Works

Node2vec generates node embeddings by first collecting sequences of nodes
through biased random walks, then feeding those sequences into a
word2vec-style model (Skip-gram). The key insight is that the walk's
bias — controlled by two parameters **p** and **q** — determines
what kind of structural information the embedding captures.

### The p and q Parameters

At each step, the walker is at a current node and came from a previous
node. Every neighbor of the current node is assigned an unnormalized
transition weight based on its relationship to the previous node:

- **1/p (return weight)** — applied to the previous node. Low *p*
  encourages the walker to backtrack, producing walks that stay
  near the starting node and capture local community structure.
- **1 (stay weight)** — applied to neighbors that are also neighbors
  of the previous node. These are "BFS-like" moves that explore
  the local neighborhood.
- **1/q (outward weight)** — applied to neighbors that are *not*
  connected to the previous node. Low *q* encourages the walker
  to move outward into unexplored territory, producing longer-range
  "DFS-like" walks that capture structural equivalence.

### Intuition for Parameter Settings

| Setting | Walk Behavior | Captures |
|---------|--------------|----------|
| Low p, high q | Stays close, revisits neighbors | Local community / homophily |
| High p, low q | Explores outward, avoids backtracking | Structural role / equivalence |
| p = 1, q = 1 | Unbiased (DeepWalk equivalent) | Balanced mix |

### Why This Matters for Bioinformatics

In protein-protein interaction (PPI) networks, node2vec embeddings can:

- **Predict protein function** — proteins with similar embeddings
  tend to share Gene Ontology annotations
- **Identify drug targets** — by embedding drug-target-disease graphs
  and finding nodes close in embedding space
- **Detect disease modules** — low-p walks capture tightly connected
  protein complexes that often correspond to disease pathways
- **Transfer annotations** — structurally equivalent nodes (captured
  by low-q walks) often perform analogous roles even if they are
  distant in the network

## How to Use

1. **p slider** — Controls the return parameter. Slide left (low p)
   to encourage backtracking; slide right (high p) to discourage it
2. **q slider** — Controls the in-out parameter. Slide left (low q)
   to encourage outward exploration (DFS-like); slide right (high q)
   to encourage local exploration (BFS-like)
3. **Step** — Advance the walk by one step. Green dashed lines show
   candidate neighbors with their transition weight labels (1/p, 1, or 1/q)
4. **Auto** — Toggle automatic stepping to watch the walk unfold
5. **Reset** — Return the walker to the starting node

### Color Legend

- **Red** — Current node (walker's position)
- **Green** — Candidate neighbors for the next step
- **Orange** — Previously visited nodes in the walk trail
- **Blue** — Unvisited nodes

The side panel shows the full walk history, current parameter values,
and the probability each candidate has of being selected next.

**Try these experiments:**

- Set p = 0.25, q = 4 — watch the walker repeatedly revisit the same small cluster of nodes (BFS / community detection behavior)
- Set p = 4, q = 0.25 — watch the walker traverse long paths across the graph without backtracking (DFS / structural role behavior)
- Set p = 1, q = 1 — observe the unbiased random walk (equivalent to the original DeepWalk algorithm)
- Run several walks with the same parameters and notice how the stochastic nature produces different paths each time

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/node2vec-random-walk/main.html"
        height="522"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Basic understanding of graphs (nodes, edges, neighbors)
- Familiarity with random walks on graphs
- Introduction to the concept of node embeddings and why vector representations of biological entities are useful

### Activities

1. **Exploration** (5 min): With default settings (p = 1, q = 1), click Step repeatedly and observe the walk path. Note which nodes get visited and how the walk spreads through the graph. This is the unbiased DeepWalk baseline.

2. **BFS-like behavior** (5 min): Set p = 0.25 and q = 4. Reset and step through 10-15 steps. Observe how the walker stays within a local neighborhood. Discuss why this behavior would capture protein complex membership in a PPI network.

3. **DFS-like behavior** (5 min): Set p = 4 and q = 0.25. Reset and step through 10-15 steps. Observe how the walker moves outward through the graph. Discuss why this behavior would capture structural roles (e.g., hub proteins vs. peripheral proteins).

4. **Discussion** (5 min): Compare the walk histories from activities 2 and 3. If two proteins always appear in the same BFS-like walks, what does that suggest about their relationship? What if they appear in similar DFS-like walks but are in different parts of the network?

### Assessment

1. Explain in your own words what the *p* parameter controls and how it affects the random walk behavior.
2. A researcher wants to use node2vec to find proteins that belong to the same protein complex. Should they use low or high *p*? Low or high *q*? Explain your reasoning.
3. Why does node2vec use *biased* random walks instead of simple unbiased random walks? What information would be lost with unbiased walks?
4. Two proteins have very similar node2vec embeddings generated with low *q*. Are they necessarily close together in the PPI network? What can you infer about them?

## References

1. [Node2vec — Wikipedia](https://en.wikipedia.org/wiki/Node2vec)
2. [Graph embedding — Wikipedia](https://en.wikipedia.org/wiki/Graph_embedding)
3. [Random walk — Wikipedia](https://en.wikipedia.org/wiki/Random_walk)
4. [Word2vec — Wikipedia](https://en.wikipedia.org/wiki/Word2vec)
5. [Protein-protein interaction — Wikipedia](https://en.wikipedia.org/wiki/Protein%E2%80%93protein_interaction)
