# Quiz: Graph Theory Fundamentals

Test your understanding of graph theory concepts including graph types, centrality measures, traversal algorithms, and network models applied to bioinformatics.

---

#### 1. In a directed graph representing a gene regulatory network, what does a node with high in-degree indicate?

<div class="upper-alpha" markdown>
1. A gene that regulates many downstream targets
2. A gene that receives regulatory input from many transcription factors
3. A gene that has been deleted from the genome
4. A gene with the shortest path to all other genes
</div>

??? question "Show Answer"
    The correct answer is **B**. In a directed graph, the in-degree of a node counts the number of edges pointing toward it. In a gene regulatory network, a node with high in-degree is a gene that receives regulatory input from many transcription factors, making it a potential integration hub. A gene that regulates many targets (A) would have high out-degree, not in-degree. Shortest paths (D) relate to closeness centrality, not degree.

    **Concept Tested:** In-Degree

---

#### 2. Which graph type is most appropriate for modeling a metabolic network where enzymes and metabolites are fundamentally different entity types?

<div class="upper-alpha" markdown>
1. Multigraph
2. Hypergraph
3. Bipartite graph
4. Simple undirected graph
</div>

??? question "Show Answer"
    The correct answer is **C**. A bipartite graph partitions nodes into two disjoint sets such that edges only connect nodes from different sets. Metabolic networks naturally fit this model with one partition containing metabolites and the other containing enzymes, with edges connecting enzymes to their substrates and products. A multigraph (A) allows multiple edges between the same pair but does not enforce the two-partition structure. A hypergraph (B) is for multi-node relationships.

    **Concept Tested:** Bipartite Graphs

---

#### 3. What does betweenness centrality measure in a biological network?

<div class="upper-alpha" markdown>
1. The number of direct interaction partners a node has
2. How quickly a node can propagate a signal to all other nodes
3. How often a node lies on the shortest path between other pairs of nodes
4. Whether a node is connected to other highly connected nodes
</div>

??? question "Show Answer"
    The correct answer is **C**. Betweenness centrality measures how frequently a node appears on shortest paths between all other pairs of nodes. Nodes with high betweenness serve as bridges or bottlenecks controlling information flow. Option A describes degree centrality. Option B describes closeness centrality. Option D describes eigenvector centrality. In a metabolic network, a metabolite with high betweenness is a critical intermediate connecting separate pathways.

    **Concept Tested:** Betweenness Centrality

---

#### 4. Why is the adjacency matrix representation inefficient for most biological networks?

<div class="upper-alpha" markdown>
1. It cannot represent weighted edges
2. It requires $O(n^2)$ space, which is wasteful since biological networks are typically sparse with density below 1%
3. It does not support directed graphs
4. It cannot store more than 1,000 nodes
</div>

??? question "Show Answer"
    The correct answer is **B**. An adjacency matrix for $n$ nodes requires $O(n^2)$ space regardless of edge count. Since biological networks are typically sparse (e.g., a human PPI network with 20,000 nodes but only 300,000 edges has 99.85% zero entries), this representation wastes enormous amounts of memory. The matrix can represent weighted edges (A) and directed graphs (C), and has no inherent size limit (D). Edge lists or adjacency lists are more practical for sparse biological networks.

    **Concept Tested:** Adjacency Matrix

---

#### 5. What distinguishes breadth-first search (BFS) from depth-first search (DFS)?

<div class="upper-alpha" markdown>
1. BFS uses a stack while DFS uses a queue
2. BFS can only work on undirected graphs while DFS works on directed graphs
3. BFS explores all neighbors at the current distance before moving deeper, while DFS explores as far as possible along each branch before backtracking
4. BFS has exponential time complexity while DFS runs in linear time
</div>

??? question "Show Answer"
    The correct answer is **C**. BFS explores nodes level by level using a queue (first-in, first-out), visiting all nodes at distance 1 from the source before distance 2, and so on. DFS explores as far as possible along each branch using a stack (last-in, first-out) before backtracking. Option A reverses the data structures. Both algorithms work on directed and undirected graphs (B), and both have the same $O(|V| + |E|)$ time complexity (D).

    **Concept Tested:** Breadth-First Search and Depth-First Search

---

#### 6. What key structural property defines a scale-free network?

<div class="upper-alpha" markdown>
1. All nodes have exactly the same number of connections
2. The network forms a perfect tree with no cycles
3. The degree distribution follows a power law, with most nodes having few connections and a few hubs having many
4. Every pair of nodes is connected by exactly one edge
</div>

??? question "Show Answer"
    The correct answer is **C**. Scale-free networks exhibit a power-law degree distribution $P(k) \sim k^{-\gamma}$, meaning most nodes have few connections while a small number of hubs have extremely many. This distribution appears as a straight line on a log-log plot. The term "scale-free" reflects the absence of a characteristic scale. Scale-free networks are robust to random failures but vulnerable to targeted attacks on hubs, which has implications for drug targeting strategies.

    **Concept Tested:** Scale-Free Networks

---

#### 7. In the Barabasi-Albert model, what mechanism produces the power-law degree distribution?

<div class="upper-alpha" markdown>
1. Random removal of low-degree nodes over time
2. Preferential attachment, where new nodes are more likely to connect to existing nodes that already have many connections
3. Equal probability of connecting to any existing node
4. Periodic rewiring of all edges in the network
</div>

??? question "Show Answer"
    The correct answer is **B**. The Barabasi-Albert model generates scale-free networks through two mechanisms: growth (new nodes are continuously added) and preferential attachment (new nodes connect preferentially to high-degree nodes). The probability that a new edge connects to node $v$ is proportional to $v$'s current degree, creating a "rich get richer" dynamic. Equal probability (C) describes the Erdos-Renyi model. Periodic rewiring (D) relates to the Watts-Strogatz small-world model.

    **Concept Tested:** Barabasi-Albert Model

---

#### 8. What is a network motif?

<div class="upper-alpha" markdown>
1. A node with the highest centrality score in the network
2. The largest connected component of a graph
3. A small subgraph pattern that occurs significantly more often than expected in random networks
4. An isolated node with no edges
</div>

??? question "Show Answer"
    The correct answer is **C**. Network motifs are small subgraph patterns (typically 3-4 nodes) that occur significantly more often in a real network than in randomized versions preserving the same degree sequence. They function as building blocks of complex networks. In gene regulatory networks, common motifs include feed-forward loops (noise filters) and bi-fan patterns. Motifs are detected by comparing subgraph frequencies against a null distribution from random networks.

    **Concept Tested:** Network Motifs

---

#### 9. What two properties characterize a small-world network?

<div class="upper-alpha" markdown>
1. Low clustering coefficient and long average path length
2. High clustering coefficient and short average path length
3. Power-law degree distribution and zero clustering coefficient
4. Equal degree for all nodes and maximum possible diameter
</div>

??? question "Show Answer"
    The correct answer is **B**. Small-world networks combine high clustering (like a regular lattice, where neighbors of a node tend to be neighbors of each other) with short average path length (like a random graph, where any two nodes can be reached in few steps). The Watts-Strogatz model generates small-world networks by rewiring edges in a regular lattice. Most real biological networks are both scale-free and small-world simultaneously.

    **Concept Tested:** Small-World Networks

---

#### 10. Dijkstra's algorithm finds shortest paths in weighted graphs but has an important limitation. What is it?

<div class="upper-alpha" markdown>
1. It can only process graphs with fewer than 100 nodes
2. It does not work correctly with negative edge weights
3. It requires the graph to be a tree
4. It cannot handle directed graphs
</div>

??? question "Show Answer"
    The correct answer is **B**. Dijkstra's algorithm requires all edge weights to be non-negative. If a biological network uses negative weights (for example, log-transformed probabilities), the Bellman-Ford algorithm must be used instead, at the cost of higher time complexity $O(|V| \cdot |E|)$ compared to Dijkstra's $O((|V| + |E|) \log |V|)$. Dijkstra's algorithm works on graphs of any size (A), on general graphs not just trees (C), and handles both directed and undirected graphs (D).

    **Concept Tested:** Dijkstra Algorithm
