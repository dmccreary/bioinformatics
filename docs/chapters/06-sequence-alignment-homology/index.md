---
title: Sequence Alignment and Homology
description: Pairwise and multiple sequence alignment, BLAST, scoring matrices, HMMs, and sequence similarity networks
generated_by: claude skill chapter-content-generator
date: 2026-03-24 22:55:15
version: 0.05
---

# Sequence Alignment and Homology

## Summary

Covers pairwise and multiple sequence alignment algorithms (Smith-Waterman, Needleman-Wunsch, BLAST), scoring matrices, hidden Markov models, sequence similarity networks, and their graph data models for representing homology relationships.

## Concepts Covered

This chapter covers the following 35 concepts from the learning graph:

1. Sequence Alignment
2. Pairwise Alignment
3. Global Alignment
4. Local Alignment
5. Smith-Waterman Algorithm
6. Needleman-Wunsch Algorithm
7. Dynamic Programming
8. Scoring Matrices
9. BLOSUM Matrix
10. PAM Matrix
11. Substitution Model
12. Gap Penalties
13. Affine Gap Penalty
14. BLAST
15. BLAST E-Value
16. BLAST Heuristics
17. PSI-BLAST
18. Sequence Homology
19. Orthologs
20. Paralogs
21. Sequence Identity
22. Sequence Similarity
23. Sequence Similarity Network
24. Graph Model for Similarity
25. Multiple Sequence Alignment
26. Clustal
27. MUSCLE Aligner
28. Progressive Alignment
29. Consensus Sequence
30. Sequence Profile
31. Hidden Markov Model
32. Profile HMM
33. Sequence Motif
34. Regular Expressions
35. Motif Discovery

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Molecular Biology](../01-foundations-molecular-biology/index.md)
- [Chapter 3: Bioinformatics Data Formats](../03-bioinformatics-data-formats/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    How do we know whether two genes are related? How can we find the needle-in-a-haystack match for a new protein sequence inside a database of millions? The answer is **sequence alignment** — one of the most fundamental operations in all of bioinformatics. In this chapter we will build up from simple pairwise comparisons to powerful database searches, multiple alignments, and hidden Markov models, all while keeping our graph lens polished. Let's connect the dots!

## What Is Sequence Alignment?

Sequence alignment is the process of arranging two or more biological sequences — DNA, RNA, or protein — so that regions of similarity are placed in corresponding columns. The goal is to identify residues (nucleotides or amino acids) that may share a common evolutionary origin, a functional role, or a structural position. Alignment is the computational foundation upon which most downstream bioinformatics analyses rest: phylogenetic tree construction, protein structure prediction, functional annotation, and variant interpretation all begin with a good alignment.

A pairwise alignment compares exactly two sequences. Consider the following toy protein sequences, each five residues long:

```
Sequence A:  M  K  T  L  A
Sequence B:  M  R  T  -  A
```

The dash (`-`) in Sequence B represents a **gap** — a position where no residue in B corresponds to the residue in A. Gaps model insertions or deletions (collectively called "indels") that have occurred since the two sequences diverged from a common ancestor. The columns where both sequences contain a residue are called **matched positions**, and the alignment above has four matched columns and one gap column.

Two questions immediately arise: which arrangement of gaps and matches is "best," and how do we search through the enormous number of possible arrangements efficiently? The answers involve **scoring matrices**, **gap penalties**, and an algorithmic technique called **dynamic programming**.

| Alignment Property | Description |
|---|---|
| Match | Identical residues in the same column |
| Mismatch | Different residues in the same column |
| Gap | A dash inserted opposite a residue |
| Score | Numerical value summarizing alignment quality |

## Scoring Matrices and Substitution Models

Before we can score an alignment we need a **substitution model** — a quantitative description of how likely each possible residue-to-residue change is over evolutionary time. In practice this model is encoded as a **scoring matrix**: a symmetric table that assigns a numerical score to every pair of residues.

### The BLOSUM Family

The **BLOSUM** (BLOcks SUbstitution Matrix) family of matrices was derived by Steven and Jorja Henikoff in 1992 from conserved blocks found in multiply-aligned protein sequences. BLOSUM62, the most widely used variant, was constructed from alignments filtered so that no two sequences shared more than 62% identity. Higher-numbered BLOSUM matrices (e.g., BLOSUM80) are tuned for closely related sequences, while lower-numbered matrices (e.g., BLOSUM45) are better for distant relationships.

### The PAM Family

The **PAM** (Point Accepted Mutation) matrices, developed by Margaret Dayhoff in the 1970s, take the opposite approach: they estimate amino acid replacement probabilities over short evolutionary distances and then extrapolate to longer distances. PAM1 corresponds to one accepted mutation per 100 residues; PAM250, frequently used in practice, represents approximately 250 such steps. Despite their different derivation strategies, BLOSUM62 and PAM250 produce similar results for typical database searches.

| Matrix | Derivation | Best For |
|---|---|---|
| BLOSUM62 | Observed substitutions in conserved blocks | General-purpose protein searches |
| BLOSUM80 | Blocks with up to 80% identity | Closely related proteins |
| BLOSUM45 | Blocks with up to 45% identity | Distantly related proteins |
| PAM250 | Extrapolated from PAM1 | Distant evolutionary comparisons |
| PAM120 | Extrapolated from PAM1 | Moderate evolutionary distances |

For DNA sequences, scoring is simpler: a match typically receives a positive score (e.g., +1) and a mismatch receives a penalty (e.g., -1), although more sophisticated nucleotide substitution models exist for phylogenetics.

To build intuition, consider specific BLOSUM62 entries. The score for (W, W) is +11 — tryptophan is so chemically distinctive that finding it conserved at the same position is strong evidence of shared ancestry. The score for (W, G) is -3, reflecting the rarity of replacing bulky tryptophan with tiny glycine. Each cell in the matrix encodes an evolutionary "price" derived from observed substitution frequencies.

## Gap Penalties

Gaps represent insertions or deletions, and because indels are relatively rare compared to substitutions, they should carry a penalty. The simplest model assigns a **linear gap penalty**: each gap position costs a fixed amount $d$. The penalty for a gap of length $g$ is then:

$$P_{\text{linear}}(g) = g \cdot d$$

However, empirical data show that, once an indel event begins, extending it by additional residues is more likely than starting a new one. This observation leads to the **affine gap penalty** model, which separates the cost of opening a gap from the cost of extending it:

$$P_{\text{affine}}(g) = d_{\text{open}} + (g - 1) \cdot d_{\text{extend}}$$

Here $d_{\text{open}}$ is a large penalty for initiating the gap and $d_{\text{extend}}$ is a smaller penalty for each additional position. Typical values for protein alignment are $d_{\text{open}} = -11$ and $d_{\text{extend}} = -1$ (BLAST defaults). The affine model produces biologically more realistic alignments because it favors fewer, longer gaps over many short ones.

## Dynamic Programming: Needleman-Wunsch and Smith-Waterman

Dynamic programming is an algorithmic strategy that solves a problem by breaking it into overlapping sub-problems, solving each sub-problem once, and storing the results in a table. It is the engine behind both the **Needleman-Wunsch** algorithm for global alignment and the **Smith-Waterman** algorithm for local alignment.

### Global Alignment with Needleman-Wunsch

The Needleman-Wunsch algorithm (1970) finds the optimal **global alignment** — the best end-to-end alignment of two complete sequences. Given sequences $X$ of length $m$ and $Y$ of length $n$, we fill an $(m+1) \times (n+1)$ matrix $F$ according to the recurrence:

$$F(i, j) = \max \begin{cases} F(i-1, j-1) + s(x_i, y_j) \\ F(i-1, j) + d \\ F(i, j-1) + d \end{cases}$$

where $s(x_i, y_j)$ is the substitution score from the scoring matrix and $d$ is the gap penalty (a negative number). The boundary conditions are $F(0,0) = 0$, $F(i,0) = i \cdot d$, and $F(0,j) = j \cdot d$. After filling the matrix, we **traceback** from $F(m,n)$ to $F(0,0)$, following pointers that record which cell contributed the maximum at each step. The resulting path through the matrix defines the optimal alignment.

### A Worked Example

Align sequences $X = \texttt{MKA}$ and $Y = \texttt{MA}$ with match = +1, mismatch = -1, gap = -2.

**Step 1 — Initialize boundaries:**

|   |   | M | A |
|---|---|---|---|
|   | 0 | -2 | -4 |
| **M** | -2 |   |   |
| **K** | -4 |   |   |
| **A** | -6 |   |   |

**Step 2 — Fill cells using the recurrence:**

|   |   | M | A |
|---|---|---|---|
|   | 0 | -2 | -4 |
| **M** | -2 | **1** | -1 |
| **K** | -4 | -1 | **0** |
| **A** | -6 | -3 | **0** |

**Step 3 — Traceback from F(3,2) = 0:**

```
X:  M  K  A
Y:  M  -  A
Score: 0  (match +1, gap -2, match +1)
```

The algorithm runs in $O(mn)$ time and $O(mn)$ space, which is quadratic in the length of the sequences.

### Local Alignment with Smith-Waterman

The **Smith-Waterman** algorithm (1981) finds the best **local alignment** — the highest-scoring subsequence pair. It modifies Needleman-Wunsch in two critical ways:

$$F(i, j) = \max \begin{cases} 0 \\ F(i-1, j-1) + s(x_i, y_j) \\ F(i-1, j) + d \\ F(i, j-1) + d \end{cases}$$

First, boundary values are all zero: $F(i,0) = 0$ and $F(0,j) = 0$. Second, an extra option of 0 is included in the recurrence, meaning that a cell can "restart" the alignment whenever continuing would produce a negative score. The traceback begins at the cell with the highest value anywhere in the matrix and proceeds until a cell with value 0 is reached.

Local alignment is the appropriate choice when you expect that only a portion of each sequence is related — for example, when searching for a conserved domain embedded in a much longer protein.

#### Diagram: Dynamic Programming Matrix Visualization

<iframe src="../../sims/dp-alignment-matrix/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View DP Alignment Matrix MicroSim Fullscreen](../../sims/dp-alignment-matrix/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: dp-alignment-matrix
Library: p5.js
Status: Specified

An interactive visualization of the Needleman-Wunsch and Smith-Waterman dynamic programming matrices. Students can enter short sequences, adjust match/mismatch/gap scores, and watch the matrix fill step by step. The traceback path is highlighted in a contrasting color. A toggle switches between global and local alignment modes.
</details>

## BLAST: Fast Database Searching

While Smith-Waterman produces mathematically optimal local alignments, its $O(mn)$ runtime makes it impractical for searching entire databases containing billions of residues. The **Basic Local Alignment Search Tool** (BLAST), introduced by Altschul et al. in 1990, sacrifices a small amount of sensitivity for enormous speed gains through a set of **BLAST heuristics**.

### How BLAST Works

BLAST operates in three stages:

1. **Seeding** — The query sequence is broken into short overlapping "words" (default length 3 for proteins, 11 for DNA). For each word, BLAST identifies all similar words that score above a threshold $T$ when compared using the scoring matrix.
2. **Extension** — When a word hit is found in the database, BLAST extends the alignment in both directions, keeping a running score. Extension stops when the score drops below a threshold relative to the maximum observed so far.
3. **Evaluation** — High-scoring segment pairs (HSPs) that survive extension are evaluated statistically to determine significance.

!!! mascot-thinking "Olli's Insight"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Imagine searching for a book in a library. Smith-Waterman reads every page of every book to find the best match — thorough but slow. BLAST first scans the index for promising keywords, then only reads the pages around each hit. That is why BLAST can search millions of sequences in seconds!

### The BLAST E-Value

The statistical significance of a BLAST hit is reported as an **E-value** (expect value). The E-value estimates the number of alignments with a score $\geq S$ that would be expected by chance when searching a database of size $D$:

$$E = K \cdot m \cdot n \cdot e^{-\lambda S}$$

Here $m$ is the query length, $n$ is the total database size, and $K$ and $\lambda$ are statistical parameters that depend on the scoring matrix and gap penalties. An E-value of $10^{-5}$ means that a match this good would occur by chance only once in 100,000 random searches. In practice, E-values below $10^{-3}$ are often considered significant, and values below $10^{-10}$ are strong evidence of biological relationship.

### PSI-BLAST

**PSI-BLAST** (Position-Specific Iterated BLAST) extends the standard BLAST approach to detect remote homologs that share very low sequence identity. In the first round, PSI-BLAST performs a standard search. It then constructs a **sequence profile** — a position-specific scoring matrix (PSSM) — from the significant hits, and uses that profile as the query for subsequent rounds. Each iteration can recruit additional distant homologs, refining the profile further. PSI-BLAST is particularly powerful for proteins that belong to large superfamilies with highly diverged members.

## Sequence Homology, Orthologs, and Paralogs

**Sequence homology** is a qualitative statement: two sequences are either homologous (sharing a common ancestor) or they are not. Homology is not a matter of degree — it is an all-or-nothing assertion about evolutionary history. What varies quantitatively is **sequence identity** (the percentage of aligned positions with identical residues) and **sequence similarity** (a broader measure that includes biochemically conservative substitutions scored positively by the scoring matrix).

!!! mascot-warning "Olli's Caution"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    A common mistake is saying "these sequences have 40% homology." Homology is not a percentage — either they share a common ancestor or they do not. The correct phrasing is "these sequences share 40% sequence identity" or "40% sequence similarity." Scientists will notice and correct you, so build good habits now!

Homologous sequences fall into two major categories based on how they diverged:

- **Orthologs** are genes in different species that diverged through a **speciation** event. They typically retain the same function. For example, human hemoglobin beta and mouse hemoglobin beta are orthologs.
- **Paralogs** are genes within the same species (or across species) that diverged through a **gene duplication** event. After duplication, one or both copies may acquire new functions (neofunctionalization) or divide the ancestral function (subfunctionalization). Human hemoglobin alpha and hemoglobin beta are paralogs.

| Relationship | Divergence Mechanism | Functional Expectation |
|---|---|---|
| Orthologs | Speciation | Usually conserved |
| Paralogs | Gene duplication | May diverge or specialize |

Understanding the distinction between orthologs and paralogs is essential for functional annotation: transferring a function from a well-studied ortholog is much safer than from a paralog, which may have evolved a different role.

## Sequence Similarity Networks and Graph Models

The graph perspective that runs through this course applies naturally to sequence alignment results. A **sequence similarity network** (SSN) is an undirected graph where:

- Each **node** represents a protein (or gene) sequence
- Each **edge** connects two sequences whose pairwise alignment score exceeds a chosen threshold (often an E-value cutoff)
- Edges may be **weighted** by sequence identity, bit score, or negative log E-value

This is a direct application of the **graph model for similarity**: any pairwise similarity measure can generate a graph by thresholding. At stringent thresholds (e.g., E-value < $10^{-50}$), edges connect only very similar sequences, and the network breaks into many small, tight clusters corresponding to protein families. As the threshold is relaxed, clusters merge, revealing broader superfamily relationships.

#### Diagram: Sequence Similarity Network

<iframe src="../../sims/sequence-similarity-network/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Sequence Similarity Network MicroSim Fullscreen](../../sims/sequence-similarity-network/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: sequence-similarity-network
Library: vis-network
Status: Specified

An interactive graph visualization of a sequence similarity network. Nodes represent protein sequences colored by functional family. Edges represent significant BLAST hits. A slider controls the E-value threshold: as the slider moves from stringent to relaxed, more edges appear and clusters merge. Node tooltips show sequence accession and function. The slight y-offset on edge labels ensures correct rendering on initial load.
</details>

SSNs are analyzed using standard graph metrics: **connected components** identify potential protein families, **clustering coefficients** reveal internal cohesion, and **betweenness centrality** pinpoints sequences that bridge distinct functional groups. Tools such as the Enzyme Function Initiative's EFI-EST generate SSNs directly from BLAST results for visualization in Cytoscape.

!!! mascot-tip "Olli's Tip"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    When building a sequence similarity network, the choice of E-value threshold dramatically changes the graph topology. Start with a very stringent threshold and gradually relax it, watching how clusters merge. The threshold where biologically meaningful families first become visible is usually the most informative one for your analysis.

## Multiple Sequence Alignment

A **multiple sequence alignment** (MSA) extends pairwise alignment to three or more sequences simultaneously. The exact dynamic programming solution for $k$ sequences of length $n$ requires $O(n^k)$ time and space — exponential in the number of sequences — so practical MSA methods rely on heuristic strategies.

### Progressive Alignment

The dominant heuristic is **progressive alignment**, used by both **Clustal** (ClustalW, Clustal Omega) and other tools. The algorithm proceeds in three steps:

1. Compute pairwise alignments (or pairwise distances) for all sequence pairs
2. Build a **guide tree** from the distance matrix using neighbor-joining or UPGMA
3. Align sequences progressively following the guide tree, starting from the closest pair and adding sequences or groups one at a time

The weakness of progressive alignment is its "greedy" nature: errors introduced early in the process propagate and cannot be corrected later. The guide tree quality directly affects the final MSA.

### MUSCLE Aligner

The **MUSCLE** (MUltiple Sequence Comparison by Log-Expectation) aligner, developed by Robert Edgar in 2004, improves on progressive alignment by adding iterative refinement. After an initial progressive alignment, MUSCLE re-estimates the guide tree from the current alignment and re-aligns, repeating until convergence. This refinement step corrects many errors that pure progressive methods propagate.

### Consensus Sequences and Sequence Profiles

Given an MSA, we can summarize the aligned columns in two ways:

- A **consensus sequence** records the most frequent residue at each position, sometimes using IUPAC ambiguity codes for columns without a clear winner
- A **sequence profile** (also called a position-specific scoring matrix, or PSSM) records the frequency of every residue at each column, providing a richer probabilistic description

Sequence profiles capture information that a single consensus sequence cannot — for example, a position that tolerates leucine and isoleucine equally would collapse to a single residue in the consensus but remain fully informative in the profile.

## Hidden Markov Models and Profile HMMs

A **hidden Markov model** (HMM) is a statistical model consisting of a set of hidden states connected by transition probabilities, where each state emits observable symbols according to an emission probability distribution. HMMs are widely used in speech recognition, natural language processing, and — critically for bioinformatics — sequence analysis.

A **profile HMM** is a specialized HMM architecture designed to represent a multiple sequence alignment. It contains three types of states for each column of the MSA:

- **Match states** — emit residues according to the observed frequencies in the alignment column
- **Insert states** — emit residues to model insertions relative to the consensus
- **Delete states** — "silent" states that produce no output, modeling positions where a sequence has a gap

The transitions between match, insert, and delete states are learned from the training alignment. Profile HMMs capture both the residue preferences at each position (via emission probabilities) and the patterns of insertions and deletions (via transition probabilities), making them far more sensitive than simple sequence profiles for detecting remote homologs.

The HMMER software suite (hmmbuild, hmmsearch, hmmscan) is the standard tool for building and searching with profile HMMs. The Pfam database of protein families is built entirely on profile HMMs, and each Pfam entry corresponds to a single profile HMM trained on a curated seed alignment.

#### Diagram: Profile HMM Architecture

<iframe src="../../sims/profile-hmm-architecture/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Profile HMM Architecture MicroSim Fullscreen](../../sims/profile-hmm-architecture/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: profile-hmm-architecture
Library: vis-network
Status: Specified

An interactive node-link diagram showing the architecture of a profile HMM. Match states (large teal circles) form the backbone. Insert states (smaller green diamonds) loop off each match state. Delete states (gray triangles) provide skip paths. Transition arrows are weighted by probability. Clicking a match state displays its emission probability distribution as a bar chart. The slight y-offset on horizontal edges ensures correct label rendering on initial load.
</details>

## Sequence Motifs and Motif Discovery

A **sequence motif** is a short, recurring pattern in a set of related biological sequences that is presumed to have functional or structural significance. Motifs typically correspond to binding sites, catalytic residues, post-translational modification sites, or other conserved functional elements. They are shorter and more specific than the full-length patterns captured by profile HMMs.

### Representing Motifs with Regular Expressions

One common way to describe a motif is with a **regular expression** — a compact pattern language that specifies which residues are allowed at each position. The PROSITE database uses a notation where:

- `[AC]` means alanine or cysteine
- `{P}` means any amino acid except proline
- `x` means any amino acid
- A hyphen separates positions

For example, the N-glycosylation motif is written as `N-{P}-[ST]-{P}`, meaning asparagine, then any residue except proline, then serine or threonine, then any residue except proline. Regular expressions are fast to search but limited in expressiveness — they cannot capture position-specific preferences or correlations between positions.

### Computational Motif Discovery

**Motif discovery** is the problem of finding unknown motifs in a set of unaligned sequences — for example, discovering the transcription factor binding site shared by a set of co-regulated promoters. Algorithms for motif discovery include:

- **MEME** (Multiple Em for Motif Elicitation) — uses expectation-maximization to find probabilistic motifs
- **Gibbs sampling** — a stochastic search method that iteratively refines motif positions
- **Word enumeration** — exhaustive counting of short k-mers followed by statistical evaluation

Discovered motifs are typically represented as **position weight matrices** (PWMs), which are closely related to the sequence profiles and profile HMMs discussed above. PWMs can be visualized as sequence logos, where the height of each letter at each position reflects its information content.

| Motif Representation | Expressiveness | Speed | Example Tool |
|---|---|---|---|
| Regular expression | Low (binary match) | Very fast | PROSITE scan |
| Position weight matrix | Medium (probabilistic) | Fast | MEME, FIMO |
| Profile HMM | High (insertion/deletion) | Moderate | HMMER |

!!! mascot-thinking "Olli Connects the Dots"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli connects the dots">
    Notice how the representations form a spectrum of increasing power: regular expressions capture only which residues are allowed, PWMs add frequency information, and profile HMMs additionally model insertions and deletions. Each step up the ladder costs more computation but detects more distant relationships. Choosing the right level depends on your question and your data.

## Putting It All Together: From Sequence to Network

The concepts in this chapter form a coherent pipeline that connects raw sequences to rich graph structures:

1. **Score** — Choose a scoring matrix (BLOSUM, PAM) and gap penalty model (linear or affine) that match your evolutionary question
2. **Align pairwise** — Use Needleman-Wunsch for global or Smith-Waterman for local alignment; use BLAST or PSI-BLAST for large-scale database searches
3. **Assess homology** — Evaluate E-values and sequence identity; distinguish orthologs from paralogs
4. **Build MSAs** — Apply progressive alignment (Clustal, MUSCLE) to groups of related sequences
5. **Model families** — Construct profile HMMs from MSAs to sensitively detect remote family members
6. **Discover motifs** — Use MEME or Gibbs sampling to find conserved functional elements
7. **Build graphs** — Construct sequence similarity networks from BLAST results; analyze with graph algorithms to identify families, superfamilies, and bridging sequences

Each step feeds into the next, and the final graph representation connects this chapter to the broader theme of the course: biological relationships are best understood as networks of connections.

!!! mascot-celebration "Great Work, Investigators!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You have traveled from simple pairwise alignments all the way to hidden Markov models and sequence similarity networks. You now have the tools to compare sequences, detect evolutionary relationships, and represent those relationships as graphs. These skills will serve you throughout the rest of the course — in phylogenetics, structural bioinformatics, and protein interaction networks. Follow the edges!

## Key Takeaways

- **Sequence alignment** is the foundational operation in bioinformatics, arranging sequences to reveal evolutionary and functional relationships through matches, mismatches, and gaps.
- **Scoring matrices** (BLOSUM, PAM) encode substitution models derived from evolutionary data, and the choice of matrix affects alignment sensitivity at different evolutionary distances.
- **Gap penalties** — especially the affine gap model with separate open and extend costs — produce biologically realistic alignments by favoring fewer, longer indels.
- **Dynamic programming** underlies both the Needleman-Wunsch (global) and Smith-Waterman (local) algorithms, guaranteeing optimal alignments in $O(mn)$ time.
- **BLAST** trades a small amount of sensitivity for massive speed gains through seeding, extension, and statistical evaluation, making database-scale searches practical.
- The **E-value** quantifies statistical significance: lower E-values indicate stronger evidence that a match is not due to chance.
- **PSI-BLAST** iteratively builds sequence profiles to detect remote homologs invisible to standard BLAST.
- **Homology** is a binary assertion about shared ancestry; **sequence identity** and **sequence similarity** are the quantitative measures, not homology itself.
- **Orthologs** (diverged by speciation) and **paralogs** (diverged by duplication) have different implications for functional inference.
- **Sequence similarity networks** apply the graph model for similarity: nodes are sequences, edges are significant alignments, and graph algorithms reveal family structure.
- **Multiple sequence alignment** via progressive methods (Clustal, MUSCLE) and iterative refinement captures patterns across many related sequences.
- **Consensus sequences** summarize an MSA simply; **sequence profiles** (PSSMs) retain full probabilistic information.
- **Hidden Markov models** — especially profile HMMs — are the most sensitive statistical framework for modeling sequence families, capturing position-specific residue preferences and indel patterns.
- **Sequence motifs** can be represented as regular expressions, position weight matrices, or profile HMMs, with increasing power and computational cost.
- **Motif discovery** algorithms (MEME, Gibbs sampling) find unknown conserved patterns in sets of unaligned sequences.

[See Annotated References](./references.md)
