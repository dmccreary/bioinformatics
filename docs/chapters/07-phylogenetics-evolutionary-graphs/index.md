---
title: Phylogenetics and Evolutionary Graphs
description: Phylogenetic tree construction, evolutionary models, phylogenetic networks, and graph representations of evolution
generated_by: claude skill chapter-content-generator
date: 2026-03-25 00:00:00
version: 0.05
---

# Phylogenetics and Evolutionary Graphs

## Summary

Explores phylogenetic tree construction methods (neighbor-joining, maximum likelihood, Bayesian inference), evolutionary models, phylogenetic networks for reticulate evolution, and graph-based representations of evolutionary relationships.

## Concepts Covered

This chapter covers the following 35 concepts from the learning graph:

1. Phylogenetic Tree
2. Phylogenetics
3. Molecular Phylogenetics
4. Distance Matrix
5. Neighbor-Joining Method
6. UPGMA Method
7. Maximum Parsimony
8. Maximum Likelihood Method
9. Bayesian Inference
10. Markov Chain Monte Carlo
11. Bootstrap Analysis
12. Branch Support Values
13. Molecular Clock
14. Substitution Rate
15. Trees as DAGs
16. Phylogenetic Networks
17. Reticulate Evolution
18. Horizontal Gene Transfer
19. Recombination
20. Incomplete Lineage Sorting
21. Graph Model for Evolution
22. Cladogram
23. Phylogram
24. Monophyletic Group
25. Paraphyletic Group
26. Outgroup
27. Rooted vs Unrooted Trees
28. Tree Topology Comparison
29. Robinson-Foulds Distance
30. Ancestral Reconstruction
31. Divergence Time Estimation
32. Gene Tree vs Species Tree
33. Coalescent Theory
34. Phylogenomics
35. Comparative Genomics

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Graph Theory Fundamentals](../04-graph-theory-fundamentals/index.md)
- [Chapter 6: Sequence Alignment and Homology](../06-sequence-alignment-homology/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    Every living organism on Earth shares a common ancestor, and the history of life can be drawn as a vast branching tree. But how do we reconstruct that tree from the molecular data we have today? In this chapter we will learn how phylogenetic trees are built, evaluated, and extended into networks when evolution does not follow a simple branching pattern. We will see that trees are a special kind of directed acyclic graph — and that when evolution gets complicated, we need the full power of graph theory to represent it. Let's connect the dots!

## What Is Phylogenetics?

**Phylogenetics** is the study of evolutionary relationships among organisms, genes, or other biological entities. Its central goal is to reconstruct the branching history of life — the pattern of ancestor-descendant relationships — from observable data. A **phylogenetic tree** is the graphical representation of that history: a connected, acyclic graph in which terminal nodes (leaves) represent extant or sampled organisms, internal nodes represent hypothetical ancestors, and edges (branches) represent lineages connecting ancestors to descendants.

Classical phylogenetics relied on morphological characters — skeletal features, flower structures, embryonic development patterns — to infer relationships. **Molecular phylogenetics** revolutionized the field by using DNA, RNA, or protein sequences as the primary data source. Because molecular sequences evolve at measurable rates and can be compared quantitatively through alignment, they provide a rich and objective basis for tree reconstruction. Today, molecular data dominate phylogenetic analysis, and the methods we discuss in this chapter apply primarily to sequences, though the principles extend to any character data.

Phylogenetics is not merely an academic exercise in classification. It has urgent practical applications: tracking the emergence and spread of pathogen variants, identifying the origins of zoonotic diseases, guiding conservation efforts for endangered species, and reconstructing the evolutionary history of gene families to predict protein function. As we will see in Case Study 1 of this course, phylogenetic analysis of SARS-CoV-2 genomic sequences was indispensable for identifying new variants of concern, tracing transmission chains, and monitoring the global spread of the pandemic in near-real time.

## Trees as Graphs: Rooted, Unrooted, and DAGs

Before diving into construction methods, we must understand the graph-theoretic properties of phylogenetic trees. From the perspective of Chapter 4, a phylogenetic tree is an **acyclic connected graph** — in other words, a tree in the graph theory sense. But the biological interpretation imposes additional structure.

A **rooted tree** has a single designated node representing the most recent common ancestor (MRCA) of all taxa in the study. Edges are implicitly directed away from the root, giving the tree a temporal orientation: the root is the oldest point, and leaves represent the present. A **rooted vs unrooted tree** distinction is fundamental: an **unrooted tree** specifies only the topology of relationships (which taxa group together) without indicating the direction of evolution. An unrooted tree with $n$ leaves has $n - 1$ internal nodes and $2n - 3$ edges, while the rooted version has $n - 1$ internal nodes plus the root and $2n - 2$ edges.

To convert an unrooted tree into a rooted one, we must identify a root position. The most common strategy is to include an **outgroup** — a taxon known to be more distantly related to all other taxa in the study than they are to each other. The branch connecting the outgroup to the rest of the tree defines the root position. Alternative rooting methods include midpoint rooting (placing the root at the midpoint of the longest path) and molecular clock rooting (using rate constancy to locate the root).

### Trees as DAGs

Rooted phylogenetic trees are a special case of **directed acyclic graphs** (DAGs). Each edge points from ancestor to descendant, cycles are impossible (a descendant cannot also be its own ancestor), and there is a single source node (the root) from which all other nodes are reachable. Recognizing **trees as DAGs** connects phylogenetics directly to the graph framework of this course and opens the door to algorithms from graph theory: topological sorting, tree traversal, lowest common ancestor queries, and DAG shortest-path computations all apply directly to phylogenetic trees.

| Tree Type | Distinguishing Feature | Graph Property |
|---|---|---|
| Rooted tree | Designated root (MRCA) | DAG with single source |
| Unrooted tree | No root; topology only | Undirected acyclic connected graph |
| Cladogram | Branch lengths not meaningful | Topology-only tree |
| Phylogram | Branch lengths proportional to change | Weighted tree |

A **cladogram** displays only the branching pattern — all branches may be drawn the same length — and is used when only the topology matters. A **phylogram** draws branch lengths proportional to the amount of evolutionary change (e.g., substitutions per site), providing information about both topology and the tempo of evolution.

#### Diagram: Rooted and Unrooted Phylogenetic Trees

<iframe src="../../sims/phylogenetic-tree-types/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Phylogenetic Tree Types MicroSim Fullscreen](../../sims/phylogenetic-tree-types/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: phylogenetic-tree-types
Library: p5.js
Status: Specified

An interactive visualization showing the same set of taxa displayed as a rooted cladogram, a rooted phylogram, and an unrooted tree. Students can drag taxa to different positions, re-root the tree by clicking on branches, and toggle between cladogram and phylogram views. The outgroup is highlighted in a distinct color. A sidebar explains the graph-theoretic properties of each representation.
</details>

## Taxonomic Groups: Monophyletic and Paraphyletic

When we carve a phylogenetic tree into groups, the validity of those groups depends on whether they reflect the complete evolutionary history. A **monophyletic group** (also called a clade) consists of an ancestor and all of its descendants — it is a complete subtree rooted at an internal node. Monophyletic groups are the gold standard of biological classification: mammals, birds, and flowering plants are each monophyletic.

A **paraphyletic group** includes an ancestor and some but not all of its descendants. The classic example is "reptiles": the traditional class Reptilia excludes birds, even though birds are descended from within the reptilian lineage. Paraphyletic groups are defined by the exclusion of one or more subclades and are generally considered artificial by modern systematists.

Recognizing monophyly and paraphyly is a graph operation: given a rooted tree, a set of leaf nodes $S$ is monophyletic if the lowest common ancestor of $S$ has no descendants outside $S$. This can be checked efficiently using lowest common ancestor algorithms on the tree (DAG) structure.

## Distance-Based Tree Construction

The simplest approach to building a phylogenetic tree starts with a **distance matrix** — a symmetric matrix $D$ where entry $D_{ij}$ records the evolutionary distance between taxa $i$ and $j$. Distances are typically estimated from pairwise sequence alignments using a substitution model that corrects for multiple substitutions at the same site (see Substitution Models below). Once we have $D$, we need an algorithm to construct a tree whose branch lengths reproduce those distances as faithfully as possible.

### The UPGMA Method

The **UPGMA** (Unweighted Pair Group Method with Arithmetic Mean) algorithm is the simplest distance-based method. It operates by iterative clustering:

1. Start with each taxon as its own cluster
2. Find the pair of clusters $(i, j)$ with the smallest distance $D_{ij}$
3. Merge $i$ and $j$ into a new cluster $k$, setting the branch length from $k$ to each child at $D_{ij}/2$
4. Update distances from $k$ to all remaining clusters using the arithmetic mean:

$$D_{k,m} = \frac{|C_i| \cdot D_{i,m} + |C_j| \cdot D_{j,m}}{|C_i| + |C_j|}$$

where $|C_i|$ and $|C_j|$ are the sizes of the merged clusters.

5. Repeat until only one cluster remains

UPGMA assumes a **molecular clock** — that all lineages evolve at the same constant rate. When this assumption holds, the tree is ultrametric (all root-to-tip distances are equal) and UPGMA recovers the correct topology. When rates vary across lineages, which is the norm in real data, UPGMA can produce incorrect trees.

### The Neighbor-Joining Method

The **neighbor-joining method** (Saitou and Nei, 1987) removes the molecular clock assumption and is the most widely used distance-based algorithm. Instead of joining the closest pair, it identifies the pair of taxa whose joining minimizes the total branch length of the resulting tree. The algorithm computes a corrected distance:

$$Q_{ij} = (n - 2) \cdot D_{ij} - \sum_{k} D_{ik} - \sum_{k} D_{jk}$$

where $n$ is the current number of taxa. The pair $(i, j)$ with the smallest $Q_{ij}$ is joined. Branch lengths from the new internal node $u$ to $i$ and $j$ are:

$$d_{iu} = \frac{D_{ij}}{2} + \frac{1}{2(n-2)} \left( \sum_{k} D_{ik} - \sum_{k} D_{jk} \right)$$

$$d_{ju} = D_{ij} - d_{iu}$$

Distances from $u$ to all remaining taxa are updated as:

$$D_{um} = \frac{D_{im} + D_{jm} - D_{ij}}{2}$$

Neighbor-joining runs in $O(n^3)$ time and produces an unrooted tree. It handles rate variation across lineages and is remarkably accurate when the distance estimates are good, making it the workhorse algorithm for quick tree construction.

!!! mascot-thinking "Olli's Insight"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Think of UPGMA as assuming every lineage walks at the same steady pace — a molecular clock ticking uniformly. Neighbor-joining drops that assumption and asks a subtler question: which pair, when joined, produces the most parsimonious total tree? That flexibility is why neighbor-joining works well even when evolutionary rates differ wildly across lineages.

## Substitution Models and Rates

All tree-building methods depend on accurate estimates of evolutionary distance, and those estimates require a **substitution model** — a mathematical description of how nucleotides or amino acids change over time. The simplest DNA model, the Jukes-Cantor model (JC69), assumes all substitutions are equally likely. The corrected distance under JC69 is:

$$d = -\frac{3}{4} \ln\left(1 - \frac{4}{3} p\right)$$

where $p$ is the observed proportion of differing sites. The correction accounts for **multiple hits**: the fact that a site may have changed more than once, obscuring the true number of substitutions.

More realistic models relax the equal-rates assumption. The Kimura two-parameter model (K80) distinguishes transitions (purine-to-purine or pyrimidine-to-pyrimidine) from transversions (purine-to-pyrimidine or vice versa). The General Time-Reversible (GTR) model allows all six substitution types to have different rates and permits unequal base frequencies. GTR with gamma-distributed rate variation across sites (GTR+$\Gamma$) and a proportion of invariable sites (GTR+$\Gamma$+I) is the most commonly used model in modern phylogenomics.

The **substitution rate** — the number of substitutions per site per unit time — varies among genes, among sites within a gene, and among lineages. Estimating and accommodating this variation is central to accurate phylogenetic inference. The concept of a **molecular clock**, first proposed by Zuckerkandl and Pauling in 1962, posits that substitutions accumulate at a roughly constant rate over time. A strict molecular clock is rarely supported by data, but relaxed clock models that allow rate variation among lineages are the basis of modern **divergence time estimation**.

| Model | Parameters | Assumptions |
|---|---|---|
| JC69 | 0 (1 rate) | Equal base frequencies, equal substitution rates |
| K80 | 1 (ti/tv ratio) | Equal base frequencies, transitions differ from transversions |
| HKY85 | 4 (ti/tv + 3 base freq) | Unequal base frequencies, two rate classes |
| GTR | 8 (6 rates + 3 base freq) | Unequal base frequencies, all rates differ |
| GTR+$\Gamma$+I | 10 | GTR plus rate variation and invariable sites |

## Character-Based Methods: Maximum Parsimony

Unlike distance methods, which reduce sequence data to a single number per pair, **character-based methods** use the full alignment column by column. **Maximum parsimony** seeks the tree that requires the fewest evolutionary changes (substitutions) to explain the observed data. For each candidate tree topology, parsimony counts the minimum number of changes needed at each alignment column using the Fitch or Sankoff algorithm, and sums across all columns. The tree with the smallest total is the most parsimonious.

Parsimony is intuitive and makes no assumptions about substitution rates, but it has well-known limitations. When some lineages evolve much faster than others, parsimony can be misled by **long-branch attraction** — the tendency to group rapidly evolving lineages together regardless of their true relationships. For this reason, parsimony has largely been supplanted by model-based methods for serious phylogenetic analysis, though it remains useful for closely related sequences and as a conceptual starting point.

## Maximum Likelihood and Bayesian Inference

### Maximum Likelihood Method

The **maximum likelihood method** (Felsenstein, 1981) evaluates each candidate tree by computing the probability of observing the alignment data $D$ given the tree topology $T$, branch lengths $\mathbf{b}$, and substitution model parameters $\theta$:

$$L(T, \mathbf{b}, \theta) = P(D \mid T, \mathbf{b}, \theta) = \prod_{i=1}^{N} P(D_i \mid T, \mathbf{b}, \theta)$$

where $N$ is the number of alignment columns and independence across sites is assumed. For a single column, the likelihood is computed by summing over all possible ancestral state assignments at internal nodes, using the substitution model to calculate transition probabilities along each branch. Felsenstein's pruning algorithm computes this sum efficiently in $O(n \cdot k^2)$ time per column, where $n$ is the number of taxa and $k$ is the alphabet size.

The tree with the highest likelihood is preferred. Because the number of possible tree topologies grows super-exponentially — there are $(2n-5)!!$ unrooted trees for $n$ taxa — exhaustive search is impossible for more than about 15 taxa. Heuristic search strategies (nearest-neighbor interchange, subtree pruning and regrafting, tree bisection and reconnection) explore tree space efficiently. Software tools such as RAxML and IQ-TREE implement highly optimized ML searches.

### Bayesian Inference

**Bayesian inference** approaches phylogenetics from the opposite direction: instead of finding the single best tree, it estimates the posterior probability distribution over trees. By Bayes' theorem:

$$P(T, \mathbf{b}, \theta \mid D) = \frac{P(D \mid T, \mathbf{b}, \theta) \cdot P(T, \mathbf{b}, \theta)}{P(D)}$$

The numerator is the product of the likelihood (same as in ML) and the prior probability of the tree, branch lengths, and model parameters. The denominator $P(D)$ is a normalizing constant obtained by integrating over all possible trees and parameters — an integral that is analytically intractable.

**Markov chain Monte Carlo** (MCMC) provides the computational solution. An MCMC sampler constructs a Markov chain whose stationary distribution is the desired posterior. At each step, the chain proposes a small modification to the current tree (e.g., a branch swap or a slight change in branch length), accepts or rejects the proposal based on the Metropolis-Hastings criterion, and records the current state. After a sufficient burn-in period, the sampled trees approximate the posterior distribution. The fraction of sampled trees containing a given clade is the posterior probability of that clade — a natural measure of **branch support values**.

MrBayes and BEAST are the most widely used Bayesian phylogenetics software packages. BEAST is particularly powerful for **divergence time estimation** because it integrates relaxed molecular clock models, fossil calibration points, and tip-dating (using the known sampling times of sequences, as in viral phylogenomics) into a single coherent framework.

!!! mascot-thinking "Olli's Insight"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Maximum likelihood asks: "What single tree best explains my data?" Bayesian inference asks: "Given my data, how confident should I be in each possible tree?" The Bayesian approach naturally provides uncertainty estimates (posterior probabilities), while ML requires separate procedures like bootstrap analysis to assess confidence. Both are model-based, and both vastly outperform parsimony when evolutionary rates are heterogeneous.

## Assessing Confidence: Bootstrap Analysis and Branch Support

A phylogenetic tree is a hypothesis, and like any hypothesis it requires a measure of confidence. **Bootstrap analysis** (Felsenstein, 1985) is the most common frequentist approach. The procedure is:

1. Create a pseudoreplicate dataset by sampling alignment columns with replacement (same number of columns as the original)
2. Build a tree from the pseudoreplicate using the same method
3. Repeat steps 1-2 many times (typically 100-1000 replicates)
4. For each clade in the original tree, count the fraction of bootstrap trees that contain that clade

This fraction is the **bootstrap support value**. Values above 70% are generally considered moderate support, and values above 95% are strong support. Bootstrap values are not true probabilities, but they correlate well with the probability that the clade is correct.

**Branch support values** can also come from Bayesian posterior probabilities (discussed above), approximate likelihood ratio tests (aLRT), or the SH-aLRT implemented in IQ-TREE. Each method has different statistical properties, and it is common to report multiple support measures on the same tree.

## Comparing Tree Topologies: Robinson-Foulds Distance

When different methods, data sets, or parameter choices produce different trees, we need a way to quantify how different those trees are. **Tree topology comparison** is formalized through metrics defined on the space of all possible tree topologies.

The **Robinson-Foulds distance** (RF distance) is the most widely used metric. Given two unrooted trees $T_1$ and $T_2$ on the same set of taxa, each internal edge defines a bipartition (split) of the taxa into two groups. The RF distance counts the number of bipartitions that appear in one tree but not the other:

$$d_{RF}(T_1, T_2) = |S_1 \triangle S_2|$$

where $S_1$ and $S_2$ are the sets of bipartitions and $\triangle$ denotes the symmetric difference. The RF distance ranges from 0 (identical topologies) to $2(n-3)$ for unrooted binary trees with $n$ leaves. It can be computed in $O(n)$ time and is implemented in most phylogenetic software packages.

The RF distance has limitations: it treats all topological differences equally, whether they involve deep splits or shallow ones, and it can be overly sensitive to minor rearrangements near weakly supported nodes. Weighted variants and alternative metrics (e.g., quartet distance, geodesic distance in tree space) address some of these issues.

## Ancestral Reconstruction

**Ancestral reconstruction** is the inference of character states (nucleotides, amino acids, or other traits) at internal nodes of a phylogenetic tree. Given a tree topology, branch lengths, and the observed states at the leaves, we can estimate the most likely ancestral states using either parsimony (Fitch algorithm) or maximum likelihood (marginal reconstruction).

ML ancestral reconstruction assigns to each internal node the state that maximizes the likelihood of the observed data at the leaves, given the substitution model. This approach is preferable to parsimony when branch lengths are informative, because it accounts for the probability of multiple changes along long branches. Ancestral reconstruction is used to study the evolution of protein function (e.g., resurrecting ancestral proteins in the laboratory), to infer ancestral geographic ranges in phylogeography, and to reconstruct ancestral viral sequences for vaccine design.

## The Molecular Clock and Divergence Time Estimation

The **molecular clock** hypothesis states that molecular sequences evolve at a constant rate over time, so the amount of sequence divergence between two lineages is proportional to the time since their most recent common ancestor. Under a strict clock, we can estimate **divergence times** by calibrating the rate with fossil data or other geological events.

A strict molecular clock is rarely supported across diverse taxa — rates vary among lineages due to differences in generation time, population size, mutation rate, and selection pressure. Modern analyses therefore use **relaxed clock models** that allow rates to vary across branches while sharing information through a hierarchical prior distribution. The uncorrelated lognormal (UCLN) model and the autocorrelated rates model are the most common choices.

**Divergence time estimation** in practice integrates the tree topology, branch lengths, substitution model, clock model, and calibration data (fossil constraints, biogeographic events, or known sampling dates) within a Bayesian framework. BEAST is the leading software for this task, and it was instrumental in estimating the timing of SARS-CoV-2 emergence and the divergence dates of major variant lineages during the COVID-19 pandemic.

!!! mascot-tip "Olli's Tip"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    When you see a dated phylogenetic tree of SARS-CoV-2 variants in a news article, that tree was almost certainly built using Bayesian inference in BEAST with a relaxed molecular clock. The known collection dates of viral samples serve as tip calibrations — telling the clock when each leaf was sampled — and the software estimates the substitution rate and ancestral divergence times simultaneously. This is phylogenomics in real-time public health action!

## Gene Trees, Species Trees, and Coalescent Theory

A fundamental complication in phylogenetics is that different genes can have different evolutionary histories. The **gene tree vs species tree** distinction arises because the tree traced by a particular gene locus may not match the tree relating the species that carry those genes. Three biological processes cause this discordance.

**Incomplete lineage sorting** (ILS) occurs when ancestral polymorphisms persist through multiple speciation events. If the time between successive speciations is short relative to the ancestral population size, alleles may "sort" differently from the species branching order. ILS is governed by **coalescent theory** — the mathematical framework that traces gene copies backward in time to their most recent common ancestor within a population. Under the multispecies coalescent model, gene tree topologies are drawn from a probability distribution determined by the species tree and its population size parameters.

**Horizontal gene transfer** (HGT) is the movement of genetic material between organisms by mechanisms other than vertical inheritance — for example, conjugation in bacteria, viral transduction, or uptake of environmental DNA. HGT is pervasive in prokaryotes and means that bacterial "species trees" are not strictly trees at all; the evolutionary history of bacteria is better described as a network.

**Recombination** shuffles genetic material within a single locus, creating mosaic sequences whose different regions have different evolutionary histories. Recombination is common in viruses (including SARS-CoV-2 and influenza), sexually reproducing eukaryotes, and bacteria that undergo homologous recombination.

| Source of Discordance | Mechanism | Most Affected Taxa |
|---|---|---|
| Incomplete lineage sorting | Ancestral polymorphism | Rapid radiations |
| Horizontal gene transfer | Non-vertical DNA movement | Prokaryotes |
| Recombination | Within-locus shuffling | Viruses, bacteria, sexual eukaryotes |

Modern methods for estimating species trees in the presence of gene tree discordance include summary methods (ASTRAL, which finds the species tree maximizing the number of shared quartets with gene trees), full Bayesian multispecies coalescent methods (*BEAST), and concatenation with coalescent-aware models. These methods are essential for accurate species-level phylogenetics in groups with rapid radiations or short internodes.

#### Diagram: Gene Tree vs Species Tree Discordance

<iframe src="../../sims/gene-tree-species-tree/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Gene Tree vs Species Tree MicroSim Fullscreen](../../sims/gene-tree-species-tree/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: gene-tree-species-tree
Library: p5.js
Status: Specified

An interactive visualization showing a species tree (drawn as a wide translucent tube) with one or more gene trees embedded inside it. Students can adjust the population size of ancestral species (wider tubes allow more ILS) and watch how gene tree topologies change relative to the species tree. A toggle demonstrates horizontal gene transfer events as edges crossing between species tubes. Color-coded gene lineages trace back to their coalescent events within ancestral populations.
</details>

## Beyond Trees: Phylogenetic Networks and Reticulate Evolution

When evolution does not follow a simple bifurcating pattern — because of horizontal gene transfer, recombination, or hybridization — a tree is no longer an adequate representation. **Reticulate evolution** refers to any process that creates network-like, rather than tree-like, evolutionary relationships. In these cases, we need **phylogenetic networks**: graph structures that generalize trees by allowing nodes with more than one parent.

A phylogenetic network is a directed acyclic graph (DAG) in which:

- Leaf nodes represent extant taxa
- Internal nodes with one parent (tree nodes) represent standard speciation events
- Internal nodes with two or more parents (reticulation nodes) represent hybridization, HGT, or recombination events
- The root represents the most recent common ancestor of all taxa

This is the **graph model for evolution** in its most general form. When all internal nodes have exactly one parent, the network reduces to a tree. The number and placement of reticulation nodes quantify the degree to which the evolutionary history departs from a simple branching pattern.

!!! mascot-warning "Olli's Caution"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    Be careful not to force a tree onto data that are fundamentally network-like. If you build a tree from bacterial genomes that have undergone extensive horizontal gene transfer, the resulting tree will be misleading — different genes will support contradictory topologies, and no single tree will be correct. When you see widespread gene tree discordance, consider whether a phylogenetic network is a more appropriate model.

Several classes of phylogenetic networks exist. **Split networks** (computed by tools like SplitsTree) display conflicting signals in the data without committing to a specific evolutionary scenario — they are exploratory rather than explanatory. **Explicit hybridization networks** model specific reticulation events and can be inferred using methods that minimize the number of reticulation nodes needed to reconcile a set of gene trees (e.g., Dendroscope, PhyloNet). The computational complexity of network inference is substantially higher than tree inference, and the field is an active area of research.

#### Diagram: Phylogenetic Network with Reticulation Events

<iframe src="../../sims/phylogenetic-network/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Phylogenetic Network MicroSim Fullscreen](../../sims/phylogenetic-network/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: phylogenetic-network
Library: vis-network
Status: Specified

An interactive phylogenetic network visualization. Tree edges are drawn in teal; reticulation edges (representing HGT or hybridization events) are drawn in orange with directional arrows. Students can toggle reticulation events on and off to see how the network simplifies to a tree. Node tooltips explain whether each internal node is a tree node (speciation) or a reticulation node (HGT/hybridization). The slight y-offset on horizontal edges ensures correct label rendering on initial load.
</details>

## Phylogenomics and Comparative Genomics

**Phylogenomics** extends phylogenetic analysis from individual genes to entire genomes. Rather than building a tree from a single gene alignment, phylogenomics uses hundreds or thousands of genes simultaneously, providing far greater statistical power to resolve difficult nodes. Two main strategies exist:

- **Concatenation** (supermatrix): all gene alignments are joined end-to-end into a single large alignment, and a tree is inferred from the concatenated data. This approach is straightforward but assumes a single underlying tree for all genes.
- **Coalescent-based** (supertree): individual gene trees are estimated first, and then a species tree is inferred from the distribution of gene trees using methods like ASTRAL or *BEAST. This approach accounts for gene tree discordance due to ILS but requires accurate individual gene trees.

Phylogenomics has resolved many long-standing debates in systematics — for example, confirming that turtles are the sister group of archosaurs (birds + crocodilians) rather than of lepidosaurs (lizards + snakes), and placing the root of the eukaryotic tree of life.

**Comparative genomics** uses phylogenetic context to compare genome content, gene order, regulatory elements, and other features across species. By mapping genomic features onto a phylogenetic tree, we can infer when genes were gained or lost, when regulatory elements evolved, and how genome architecture has changed over evolutionary time. Comparative genomics depends on accurate phylogenies and is thus deeply intertwined with the tree-building methods discussed throughout this chapter.

## Case Study Connection: SARS-CoV-2 Variant Tracking

The SARS-CoV-2 pandemic provided a dramatic real-time demonstration of phylogenetics in action. As viral genomes were sequenced from patients around the world and deposited in databases like GISAID, phylogenetic trees were rebuilt daily to track the emergence and spread of new lineages. The Nextstrain platform (nextstrain.org) provides an interactive phylogenetic visualization that integrates genomic, geographic, and temporal data.

Key phylogenetic insights from the pandemic include:

- **Variant identification**: Lineages with distinct mutation profiles (Alpha, Delta, Omicron) were identified as monophyletic clades on the global phylogenetic tree
- **Divergence time estimation**: Bayesian analysis with BEAST estimated when each variant emerged, often weeks before clinical detection
- **Transmission tracking**: Local phylogenetic analyses distinguished imported cases from community transmission
- **Recombination detection**: Phylogenetic network methods detected recombinant lineages (e.g., XBB) where two Omicron sublineages recombined to create a mosaic genome

This case study illustrates every major concept in this chapter: tree construction, molecular clock analysis, gene tree discordance (due to recombination), and the need for network models when reticulate evolution is at play.

## Putting It All Together: The Graph Model for Evolution

The methods in this chapter form a coherent framework in which evolutionary relationships are modeled as graphs of increasing complexity:

1. **Align sequences** — Use the methods from Chapter 6 to produce pairwise or multiple sequence alignments
2. **Estimate distances** — Apply substitution models (JC69, GTR) to compute evolutionary distances and populate a distance matrix
3. **Build trees** — Use neighbor-joining for quick exploration, maximum likelihood for rigorous hypothesis testing, or Bayesian inference for full posterior distributions with divergence time estimates
4. **Assess support** — Apply bootstrap analysis or examine posterior probabilities to quantify confidence in each clade
5. **Compare topologies** — Use Robinson-Foulds distance to quantify differences between trees from different genes or methods
6. **Reconstruct ancestors** — Infer ancestral states at internal nodes for functional or evolutionary studies
7. **Detect discordance** — Compare gene trees to the species tree; apply coalescent theory to model incomplete lineage sorting
8. **Extend to networks** — When horizontal gene transfer, recombination, or hybridization are detected, move from tree models to phylogenetic network models
9. **Scale to genomes** — Use phylogenomic methods (concatenation or coalescent-based) for genome-scale analyses and comparative genomics

At every step, the underlying representation is a graph — from simple undirected trees to rooted DAGs to fully reticulated networks. The **graph model for evolution** is the unifying theme: evolution is a process that creates connections, and graph theory provides the language to describe and analyze those connections.

!!! mascot-celebration "Outstanding Work, Investigators!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You have journeyed from simple distance matrices to phylogenetic networks that capture the full complexity of evolution. You now understand how trees are built, evaluated, compared, and extended when evolution refuses to follow a simple branching pattern. These tools will serve you throughout the rest of the course — when we study protein interaction networks, regulatory networks, and knowledge graphs, the graph-theoretic thinking you developed here will keep paying dividends. Follow the edges!

## Key Takeaways

- **Phylogenetics** reconstructs evolutionary relationships from molecular data, producing trees that are both biological hypotheses and graph-theoretic objects.
- **Phylogenetic trees** are acyclic connected graphs; rooted trees are directed acyclic graphs (DAGs) with a single source representing the most recent common ancestor.
- **Rooted vs unrooted trees** differ in whether the direction of evolution is specified; an outgroup is the standard method for rooting.
- **Cladograms** show topology only, while **phylograms** encode branch lengths proportional to evolutionary change.
- **Monophyletic groups** (clades) include an ancestor and all its descendants; **paraphyletic groups** exclude some descendants and are considered artificial.
- **Distance matrix** methods (UPGMA, neighbor-joining) build trees from pairwise distances; neighbor-joining does not assume a molecular clock and is the most widely used distance method.
- **Substitution models** (JC69, K80, GTR) correct for multiple hits and are essential for accurate distance estimation and likelihood computation.
- **Maximum parsimony** minimizes total evolutionary changes but is susceptible to long-branch attraction.
- The **maximum likelihood method** evaluates trees by computing the probability of the data given the tree, model, and parameters; it is the current standard for rigorous tree inference.
- **Bayesian inference** with MCMC sampling provides posterior probability distributions over trees and naturally quantifies uncertainty through branch support values.
- **Bootstrap analysis** generates confidence measures by resampling alignment columns; values above 70% indicate moderate support.
- The **Robinson-Foulds distance** quantifies topological differences between trees using the symmetric difference of their bipartition sets.
- **Ancestral reconstruction** infers character states at internal nodes using parsimony or maximum likelihood.
- The **molecular clock** and relaxed clock models enable **divergence time estimation** when calibrated with fossil or sampling-date data.
- **Gene tree vs species tree** discordance arises from incomplete lineage sorting, horizontal gene transfer, and recombination; **coalescent theory** provides the mathematical framework for modeling ILS.
- **Phylogenetic networks** generalize trees to directed acyclic graphs with reticulation nodes, accommodating **reticulate evolution** including HGT, recombination, and hybridization.
- **Phylogenomics** scales phylogenetic analysis to whole genomes using concatenation or coalescent-based approaches; **comparative genomics** uses phylogenetic context to study genome evolution.
- The **graph model for evolution** unifies all these representations: simple trees, rooted DAGs, and reticulated networks are points on a spectrum of graph complexity that mirrors the complexity of evolutionary history itself.

[See Annotated References](./references.md)
