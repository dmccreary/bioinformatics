---
title: Transcriptomics and Gene Regulatory Networks
description: RNA-seq analysis, differential expression, co-expression networks, regulatory network inference, and single-cell transcriptomics
generated_by: claude skill chapter-content-generator
date: 2026-03-25 00:00:00
version: 0.05
---

# Transcriptomics and Gene Regulatory Networks

## Summary

Covers RNA-seq analysis pipelines, differential expression testing, gene regulatory network inference methods (WGCNA, ARACNE, GENIE3), co-expression networks, single-cell and spatial transcriptomics, and graph models for regulation.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Transcriptome
2. RNA-Seq Pipeline
3. Read Quality Trimming
4. Read Alignment
5. Transcript Quantification
6. Differential Expression
7. Fold Change
8. Statistical Testing for DE
9. False Discovery Rate
10. Transcription Factor
11. Promoter Region
12. Enhancer Region
13. Cis-Regulatory Element
14. Operon
15. Gene Regulatory Network
16. Co-Expression Network
17. WGCNA
18. ARACNE
19. GENIE3
20. Mutual Information
21. Network Inference Methods
22. Boolean Network Model
23. Bayesian Network Model
24. Graph Model for Regulation
25. Single-Cell RNA-Seq
26. Cell Type Clustering
27. Trajectory Analysis
28. Spatial Transcriptomics
29. Alternative Splicing
30. Non-Coding RNA

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Molecular Biology](../01-foundations-molecular-biology/index.md)
- [Chapter 4: Graph Theory Fundamentals](../04-graph-theory-fundamentals/index.md)
- [Chapter 10: Genome Assembly and Variation Graphs](../10-genome-assembly-variation-graphs/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    Every cell in your body carries essentially the same genome, yet a neuron looks and behaves nothing like a white blood cell. The secret lies in which genes are turned on, turned off, and turned up or down — the **transcriptome**. In this chapter we will trace RNA from its birth at a promoter to its measurement by sequencing, learn how to identify genes that change between conditions, and then build the graph structures — co-expression networks and gene regulatory networks — that reveal how thousands of genes coordinate their activity. Let's connect the dots!

## The Transcriptome

The **transcriptome** is the complete set of RNA molecules present in a cell, tissue, or organism at a specific moment in time. Unlike the genome, which is essentially fixed, the transcriptome is dynamic: it shifts in response to developmental signals, environmental stress, disease, and even the time of day. Measuring the transcriptome gives us a snapshot of gene activity and, by extension, a window into cell function.

RNA comes in many forms. Messenger RNA (mRNA) carries protein-coding information and is the primary target of most transcriptomic studies. However, cells also produce a rich repertoire of **non-coding RNA** species — ribosomal RNA (rRNA), transfer RNA (tRNA), microRNAs (miRNAs), long non-coding RNAs (lncRNAs), and circular RNAs (circRNAs) — that regulate gene expression at multiple levels. A single gene can also produce multiple transcript variants through **alternative splicing**, in which different combinations of exons are joined together to produce distinct mRNAs from the same genomic locus. In humans, over 95% of multi-exon genes undergo alternative splicing, vastly expanding the functional diversity of the proteome.

#### Diagram: The Transcriptome Landscape

<iframe src="../../sims/transcriptome-landscape/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Transcriptome Landscape MicroSim Fullscreen](../../sims/transcriptome-landscape/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: transcriptome-landscape
Library: p5.js
Status: Specified

An interactive diagram showing a cell with its nucleus, depicting DNA being transcribed into various RNA types (mRNA, miRNA, lncRNA, rRNA). Arrows show mRNA export to the cytoplasm for translation. Alternative splicing is depicted with an exon-intron gene model where different exon combinations produce different transcript isoforms. Users can click on each RNA type for a brief description.
</details>

## The RNA-Seq Pipeline

**RNA-Seq** (RNA sequencing) is the dominant technology for measuring transcriptomes at scale. An **RNA-Seq pipeline** is the sequence of computational steps that transforms raw sequencing reads into biologically meaningful gene expression estimates. Understanding each stage is essential for producing reliable results.

### Sample Preparation and Sequencing

The wet-lab portion begins with RNA extraction, followed by selection of the RNA population of interest (typically poly-A selection for mRNA or ribosomal depletion for total RNA). The selected RNA is reverse-transcribed into complementary DNA (cDNA), fragmented, ligated with sequencing adapters, and loaded onto a sequencing instrument. The result is tens of millions of short reads, typically 50 to 150 base pairs in length.

### Read Quality Trimming

Raw reads contain adapter sequences, low-quality bases near the 3' end, and occasional sequencing artifacts. **Read quality trimming** removes these contaminants to improve downstream alignment accuracy. Tools such as Trimmomatic, fastp, and Cutadapt scan each read, clip adapter sequences, trim bases below a quality threshold (commonly Phred score < 20), and discard reads that fall below a minimum length after trimming. Quality reports generated by FastQC before and after trimming provide visual confirmation that the cleaning step was effective.

### Read Alignment

After trimming, reads must be mapped back to a reference genome or transcriptome. **Read alignment** for RNA-Seq differs from genomic alignment because reads frequently span exon-exon junctions. Splice-aware aligners such as STAR and HISAT2 use a two-pass strategy: they first align reads that map contiguously and then use the discovered splice junctions to guide alignment of junction-spanning reads. The output is a BAM file containing the genomic coordinates of every aligned read.

### Transcript Quantification

**Transcript quantification** converts aligned reads into expression estimates — typically counts of reads assigned to each gene or transcript. Tools like featureCounts and HTSeq count the number of reads overlapping annotated gene models. An alternative family of methods — Salmon and kallisto — bypasses genome alignment entirely, instead using lightweight pseudo-alignment directly to the transcriptome to estimate transcript-level abundances at high speed. The resulting count matrix, with genes in rows and samples in columns, is the starting point for all downstream statistical analysis.

#### Diagram: RNA-Seq Pipeline Overview

<iframe src="../../sims/rnaseq-pipeline/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View RNA-Seq Pipeline MicroSim Fullscreen](../../sims/rnaseq-pipeline/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: rnaseq-pipeline
Library: p5.js
Status: Specified

An animated flowchart showing the RNA-Seq pipeline stages: RNA extraction, library preparation, sequencing, quality trimming, read alignment (with splice-aware mapping illustrated), and transcript quantification. Reads flow through each stage as small colored rectangles. Clicking a stage highlights it and displays tools commonly used at that step (e.g., fastp, STAR, featureCounts). A final panel shows a simplified gene-by-sample count matrix.
</details>

## Differential Expression Analysis

The central question in most RNA-Seq experiments is: which genes change their expression levels between experimental conditions? **Differential expression** (DE) analysis provides a statistical framework for answering this question while accounting for biological variability and the massive multiple-testing burden of testing thousands of genes simultaneously.

### Fold Change

The simplest measure of expression change is the **fold change** (FC), defined as the ratio of mean expression between two conditions:

$$\text{FC} = \frac{\bar{x}_{\text{treatment}}}{\bar{x}_{\text{control}}}$$

Because fold change is asymmetric (up-regulation gives values above 1 while down-regulation gives values between 0 and 1), bioinformaticians typically use the log2 fold change:

$$\log_2(\text{FC}) = \log_2\!\left(\frac{\bar{x}_{\text{treatment}}}{\bar{x}_{\text{control}}}\right)$$

A $\log_2(\text{FC})$ of 1 means the gene is expressed at twice the level in the treatment group; a value of $-1$ means it is expressed at half the level. Log2 fold change treats up- and down-regulation symmetrically and is the standard axis in volcano plots and MA plots.

### Statistical Testing for Differential Expression

Fold change alone is insufficient because it ignores variance. A gene with a large fold change but enormous variability across replicates may not be genuinely differentially expressed. **Statistical testing for DE** therefore models the count distribution and estimates per-gene dispersion. DESeq2 and edgeR, the two most widely used tools, model RNA-Seq counts with a negative binomial distribution:

$$K_{ij} \sim \text{NB}(\mu_{ij}, \alpha_i)$$

where $K_{ij}$ is the count for gene $i$ in sample $j$, $\mu_{ij}$ is the expected count, and $\alpha_i$ is the gene-specific dispersion parameter. Both tools use empirical Bayes shrinkage to borrow information across genes when estimating dispersion, which stabilizes estimates when the number of replicates is small (as is common in biological experiments).

!!! mascot-thinking "What's the Link? Why Not Just Use a T-Test?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    RNA-Seq counts are not normally distributed — they follow a discrete, skewed distribution with mean-variance coupling (genes with higher expression have higher variance). The negative binomial model captures this relationship, making DESeq2 and edgeR far more appropriate than a standard t-test for count data. Using the wrong statistical model inflates false positives and can lead to misleading biological conclusions.

### False Discovery Rate

When testing 20,000 genes simultaneously, even a modest per-gene error rate produces hundreds of false positives. The **false discovery rate** (FDR) controls the expected proportion of false positives among all genes called significant. The Benjamini-Hochberg procedure is the standard method: it ranks all $m$ p-values from smallest to largest and finds the largest rank $k$ for which:

$$p_{(k)} \leq \frac{k}{m} \cdot q$$

where $q$ is the desired FDR threshold (typically 0.05). All genes with rank $\leq k$ are declared significant. The adjusted p-value (or q-value) for each gene represents the minimum FDR at which that gene would be called significant. In practice, a gene is considered differentially expressed if its adjusted p-value is below 0.05 and its absolute $\log_2(\text{FC})$ exceeds a biologically meaningful threshold (often 1.0).

#### Diagram: Volcano Plot for Differential Expression

<iframe src="../../sims/volcano-plot/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Volcano Plot MicroSim Fullscreen](../../sims/volcano-plot/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: volcano-plot
Library: p5.js
Status: Specified

An interactive volcano plot with log2 fold change on the x-axis and negative log10 adjusted p-value on the y-axis. Simulated gene data points are colored by significance: gray for non-significant, blue for significant fold change only, red for significant by both fold change and FDR thresholds. Sliders allow the user to adjust the fold change and FDR cutoffs and watch the coloring update in real time. Hovering over a point shows a gene name tooltip.
</details>

## Transcriptional Regulation: The Molecular Machinery

Before we can model gene regulatory networks, we need to understand the molecular players. Gene expression is controlled at the transcriptional level by a set of DNA elements and protein factors that together determine when, where, and how strongly a gene is transcribed.

### Transcription Factors

A **transcription factor** (TF) is a protein that binds to specific DNA sequences to activate or repress transcription of a target gene. The human genome encodes roughly 1,600 transcription factors, each recognizing a characteristic sequence motif of 6 to 20 base pairs. TFs work combinatorially: the expression of a gene typically depends on the presence and activity of multiple TFs, creating a complex regulatory logic that can be modeled as a directed graph.

### Promoter Regions

The **promoter region** is the stretch of DNA immediately upstream of a gene's transcription start site (TSS), typically spanning a few hundred base pairs. Core promoter elements — such as the TATA box, the initiator element (Inr), and CpG islands — recruit the general transcription machinery (RNA polymerase II and its associated factors). Proximal promoter elements, located within a few hundred base pairs of the TSS, bind specific transcription factors that modulate the rate of transcription.

### Enhancer Regions and Cis-Regulatory Elements

An **enhancer region** is a distal regulatory sequence that can increase transcription of a target gene from thousands or even millions of base pairs away. Enhancers function by looping through three-dimensional chromatin architecture to physically contact the promoter, bringing their bound transcription factors into proximity with the transcription machinery. Both promoters and enhancers are examples of **cis-regulatory elements** — DNA sequences that regulate gene expression from the same chromosome. The identification of active enhancers through chromatin accessibility assays (ATAC-seq) and histone modification profiling (ChIP-seq for H3K27ac) is a major area of functional genomics research.

### Operons

In prokaryotes, genes involved in the same metabolic pathway are often organized into **operons** — clusters of genes transcribed as a single polycistronic mRNA from a shared promoter. The lac operon in *Escherichia coli*, which controls lactose metabolism, is the classic example: a single promoter drives transcription of three structural genes (*lacZ*, *lacY*, *lacA*), and a repressor protein bound to an operator sequence blocks transcription in the absence of lactose. Operons represent a compact, elegant form of gene regulation that simplifies the regulatory network by coupling the expression of functionally related genes.

!!! mascot-tip "Follow the Edges!"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    When reading the literature, pay attention to the distinction between **cis**-regulatory elements (on the same chromosome as the target gene) and **trans**-acting factors (proteins like transcription factors that are encoded elsewhere in the genome but act upon the target). This cis/trans distinction maps directly onto graph modeling: cis elements are attributes of the target node, while trans factors create edges between regulator and target.

## Gene Regulatory Networks

A **gene regulatory network** (GRN) is a directed graph $G = (V, E)$ in which nodes represent genes (or their protein products) and directed edges represent regulatory relationships — activation or repression. If transcription factor A activates gene B, the GRN contains a directed edge $A \rightarrow B$ with a positive sign; if A represses B, the edge carries a negative sign. GRNs capture the wiring diagram of transcriptional control and are essential for understanding how cells make decisions, differentiate, and respond to stimuli.

GRNs exhibit several characteristic structural features. **Feed-forward loops**, in which a TF regulates a target both directly and indirectly through an intermediate TF, are statistically enriched compared to random networks and serve as signal-processing modules. **Autoregulatory loops**, where a TF regulates its own transcription, provide stability or bistability depending on whether the feedback is positive or negative. The global topology of GRNs tends to be scale-free, with a small number of master regulators (hubs) controlling large portions of the network.

## Co-Expression Networks

A **co-expression network** is an undirected weighted graph in which nodes represent genes and edges connect genes whose expression profiles are correlated across a set of samples. Unlike GRNs, co-expression networks do not imply direct regulatory relationships — two genes may be co-expressed because they share a common regulator, participate in the same pathway, or respond to the same environmental signal. Nevertheless, the principle of "guilt by association" makes co-expression networks powerful tools for predicting gene function and identifying functional modules.

The construction of a co-expression network begins with a gene expression matrix (genes $\times$ samples). For every pair of genes, a similarity measure — typically Pearson correlation — is computed. The resulting similarity matrix is then converted into an adjacency matrix by applying either a hard threshold (setting edges to 0 or 1 based on a correlation cutoff) or a soft threshold that preserves continuous edge weights.

### WGCNA

**Weighted Gene Co-expression Network Analysis** (WGCNA) is the most widely used method for building and analyzing co-expression networks. WGCNA applies a soft-thresholding power $\beta$ to the absolute correlation to construct a weighted adjacency:

$$a_{ij} = |\text{cor}(x_i, x_j)|^{\beta}$$

The power $\beta$ is chosen to approximate a scale-free network topology (typically by selecting the lowest $\beta$ for which the scale-free fit index $R^2$ exceeds 0.8). WGCNA then computes a topological overlap matrix (TOM), which measures not only the direct connection between two genes but also the similarity of their connection patterns to all other genes. Hierarchical clustering of the TOM distance matrix identifies modules of tightly co-expressed genes, which are summarized by their first principal component (the module eigengene). These modules can then be correlated with clinical traits or experimental variables to identify biologically relevant gene sets.

!!! mascot-thinking "What's the Link? Why Soft Thresholding?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    A hard threshold forces you to make an arbitrary binary decision — two genes are either connected or not. Soft thresholding preserves the continuous nature of correlation while suppressing weak, likely noisy connections. The power function acts like a magnifying glass: strong correlations remain close to 1 while weak correlations are pushed toward 0. This produces a network that better reflects the biological hierarchy of regulatory relationships.

## Network Inference Methods

Inferring the structure of regulatory networks from gene expression data alone is one of the grand challenges of systems biology. Multiple computational approaches exist, each with distinct assumptions, strengths, and limitations. Three of the most influential **network inference methods** are WGCNA (described above), ARACNE, and GENIE3.

### ARACNE

**ARACNE** (Algorithm for the Reconstruction of Accurate Cellular Networks) infers regulatory interactions using **mutual information** (MI), an information-theoretic measure of statistical dependence between two random variables. Unlike Pearson correlation, mutual information captures nonlinear relationships. For two genes $X$ and $Y$ with joint probability distribution $p(x, y)$:

$$I(X; Y) = \sum_{x} \sum_{y} p(x, y) \log_2 \frac{p(x, y)}{p(x) \cdot p(y)}$$

Mutual information equals zero if and only if $X$ and $Y$ are statistically independent. ARACNE first computes pairwise MI for all gene pairs, then applies the **data processing inequality** (DPI) to remove indirect interactions. The DPI states that for a chain $X \rightarrow Z \rightarrow Y$, the mutual information between the endpoints cannot exceed the mutual information of either direct link: $I(X; Y) \leq \min(I(X; Z), I(Z; Y))$. By examining every triplet and removing the weakest edge, ARACNE prunes indirect edges and produces a sparser, more accurate network.

### GENIE3

**GENIE3** (Gene Network Inference with Ensemble of trees) frames network inference as a set of regression problems. For each gene $j$, GENIE3 trains a random forest to predict the expression of gene $j$ from the expression of all other genes. The importance of each predictor gene $i$ in the random forest model for gene $j$ is taken as a measure of the regulatory strength of the edge $i \rightarrow j$. Aggregating importance scores across all $n$ regression problems produces a complete ranked list of putative regulatory interactions. GENIE3 won the DREAM4 In Silico Multifactorial challenge and remains a top-performing method across benchmarks.

### Comparing Network Inference Methods

| Feature | WGCNA | ARACNE | GENIE3 |
|---------|-------|--------|--------|
| **Network type** | Undirected, weighted | Undirected (MI-based) | Directed (regulator to target) |
| **Edge metric** | Pearson correlation (soft-thresholded) | Mutual information | Random forest feature importance |
| **Captures nonlinear relationships** | No | Yes | Yes |
| **Handles indirect interactions** | Partially (via TOM) | Yes (DPI pruning) | Implicitly (multivariate regression) |
| **Scalability** | High (10,000+ genes) | Moderate (MI estimation is expensive) | Moderate (one forest per gene) |
| **Identifies modules** | Yes (primary strength) | No (edge list only) | No (edge list only) |
| **Requires known regulators** | No | No (but often restricted to TFs) | No (but often restricted to TFs) |
| **Output** | Modules + eigengenes | Ranked edge list | Ranked edge list |

#### Diagram: Co-Expression Network and Module Detection

<iframe src="../../sims/coexpression-network/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Co-Expression Network MicroSim Fullscreen](../../sims/coexpression-network/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: coexpression-network
Library: p5.js
Status: Specified

An interactive network visualization of a simulated co-expression network. Nodes represent genes, colored by module assignment (clusters of tightly co-expressed genes). Edge thickness reflects correlation strength. A slider adjusts the soft-thresholding power, and users can observe how increasing the power prunes weak edges and sharpens module boundaries. Clicking a module highlights its member genes and displays the module eigengene as a small line chart.
</details>

## Graph Models for Regulation

Beyond simple edge lists, several formal **graph models for regulation** provide frameworks for simulating and predicting regulatory dynamics.

### Boolean Network Models

A **Boolean network model** represents each gene as a binary variable (on = 1, off = 0) whose state at time $t + 1$ is determined by a Boolean function of its regulators at time $t$. For example, if gene $C$ is activated when $A$ is on AND $B$ is off, the update rule is:

$$C(t+1) = A(t) \wedge \neg B(t)$$

Boolean networks are computationally tractable and can capture the qualitative logic of gene regulation — including attractors that correspond to stable cell states. Stuart Kauffman's random Boolean network (RBN) model showed that networks with an average of two inputs per gene exhibit a phase transition between ordered and chaotic behavior, with the critical regime ("edge of chaos") producing complex, lifelike dynamics.

### Bayesian Network Models

A **Bayesian network model** is a directed acyclic graph (DAG) in which nodes represent genes and edges encode conditional dependencies. Each node is associated with a conditional probability distribution that quantifies the probabilistic relationship between a gene and its parents in the graph. Bayesian networks can model continuous expression data and capture stochastic aspects of gene regulation. Structure learning algorithms (hill-climbing, score-based methods using BIC or BDe scores) search the space of possible DAGs to find the network structure that best explains the observed data. The requirement that the graph be acyclic is a significant limitation, since real regulatory networks contain feedback loops; dynamic Bayesian networks (DBNs), which model time-series data, partially address this by allowing edges between time slices.

!!! mascot-warning "Watch Out for Cycles!"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    Standard Bayesian networks require a directed acyclic graph (DAG), which means they cannot directly represent feedback loops — one of the most common and important motifs in gene regulation. If you are working with time-series expression data, consider dynamic Bayesian networks, which unfold the network across time and allow cyclic relationships between time steps.

### Graph Model Summary

The choice of graph model depends on the question being asked. Boolean networks excel at qualitative analysis of regulatory logic and cell-state attractors. Bayesian networks provide a principled probabilistic framework for structure learning from observational data. Co-expression networks reveal functional modules without requiring causal assumptions, while directed GRN inference methods like GENIE3 attempt to identify the regulators driving expression changes. In all cases, the graph is the central abstraction: nodes represent molecular entities, edges represent relationships, and network properties reveal biological organization.

## Single-Cell and Spatial Transcriptomics

Bulk RNA-Seq measures the average expression across millions of cells, masking the heterogeneity that is fundamental to tissue biology. Recent advances in single-cell and spatial technologies have opened new frontiers in transcriptomics.

### Single-Cell RNA-Seq

**Single-cell RNA-Seq** (scRNA-seq) measures the transcriptome of individual cells, revealing cell-to-cell variability that is invisible in bulk experiments. Droplet-based platforms (10x Genomics Chromium) can profile tens of thousands of cells in a single experiment, generating a sparse gene-by-cell expression matrix. Because each cell is sequenced shallowly (typically 1,000 to 5,000 genes detected per cell), scRNA-seq data are characterized by high levels of technical noise and dropout events (genes that are expressed but not detected due to low capture efficiency).

### Cell Type Clustering

The first analytical step in most scRNA-seq workflows is **cell type clustering**: grouping cells with similar expression profiles into putative cell types or states. After normalization and selection of highly variable genes, the expression matrix is reduced to a low-dimensional space using PCA, and a k-nearest-neighbor (KNN) graph is constructed in this reduced space. Community detection algorithms — most commonly the Louvain or Leiden algorithm — partition the KNN graph into clusters that correspond to cell types. The graph-based clustering approach is a direct application of the community detection methods introduced in Chapter 4 and is the standard in tools like Scanpy and Seurat.

### Trajectory Analysis

Cells captured by scRNA-seq are often in transitional states — differentiating from one cell type to another. **Trajectory analysis** (also called pseudotime analysis) orders cells along a continuous path of gene expression change, reconstructing the sequence of transcriptional events that occur during differentiation. Methods such as Monocle 3 build a principal graph (a tree or graph structure) through the low-dimensional cell embedding, and each cell is projected onto this graph to obtain a pseudotime coordinate. The result is a branching trajectory that reveals differentiation pathways and the genes that drive cell-fate decisions.

#### Diagram: Single-Cell Clustering and Trajectory

<iframe src="../../sims/scrna-clustering/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Single-Cell Clustering MicroSim Fullscreen](../../sims/scrna-clustering/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: scrna-clustering
Library: p5.js
Status: Specified

A UMAP-style 2D scatter plot of simulated single-cell data. Cells are colored by cluster (cell type) assignment. A toggle button switches between cluster view and trajectory view, where a principal curve traces through the point cloud to show a differentiation trajectory with pseudotime encoded as a color gradient. A slider controls the resolution parameter for clustering, and users can observe how increasing resolution splits clusters into finer subpopulations.
</details>

### Spatial Transcriptomics

**Spatial transcriptomics** preserves the physical location of gene expression within a tissue section, bridging transcriptomics and histology. Technologies such as 10x Visium, MERFISH, and Slide-seq capture gene expression at thousands of spatial locations (spots or individual molecules). The resulting data can be modeled as a spatial graph in which nodes represent tissue locations and edges connect spatially adjacent spots. Graph neural networks and spatial autocorrelation statistics (Moran's I) applied to this spatial graph can identify spatially variable genes — genes whose expression patterns are structured in space rather than randomly distributed. Spatial transcriptomics is transforming our understanding of tumor microenvironments, brain regionalization, and developmental patterning.

## Putting It All Together: From Expression to Regulatory Insight

A typical integrative analysis begins with the RNA-Seq pipeline to generate a count matrix, applies differential expression analysis to identify genes that change between conditions, and then uses network inference to place those genes in a regulatory context. The workflow can be summarized as a layered graph model:

1. **Expression layer**: A bipartite graph connecting samples to genes, weighted by expression levels.
2. **Co-expression layer**: An undirected graph connecting genes with correlated expression (built by WGCNA or simple thresholding).
3. **Regulatory layer**: A directed graph connecting transcription factors to their targets (inferred by ARACNE, GENIE3, or integrated with ChIP-seq binding data).
4. **Spatial layer** (when available): A graph connecting tissue locations, with gene expression as node attributes.

This multi-layer **graph model for regulation** integrates evidence from multiple data types and scales, enabling researchers to move from a list of differentially expressed genes to mechanistic hypotheses about which transcription factors drive the observed changes, which modules of genes respond together, and how the regulatory architecture is organized in space and across cell types.

!!! mascot-celebration "Great Work, Explorers!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You have journeyed from raw sequencing reads through statistical testing to the construction of gene regulatory networks — tying together molecular biology, statistics, information theory, and graph algorithms. The transcriptome is not just a list of numbers; it is a dynamic network of interacting genes. By learning to build and analyze these networks, you now have a powerful lens for understanding how cells make decisions. Onward to metabolic pathways!

## Key Takeaways

1. The **transcriptome** is the complete set of RNA molecules in a cell, reflecting gene activity at a point in time. **Alternative splicing** and **non-coding RNAs** add layers of complexity beyond simple gene counts.

2. The **RNA-Seq pipeline** — quality trimming, read alignment, transcript quantification — transforms raw reads into a gene expression matrix suitable for statistical analysis.

3. **Differential expression** analysis uses the negative binomial model to identify genes with statistically significant changes between conditions. **Fold change** measures effect size, while the **false discovery rate** controls for multiple testing.

4. **Transcription factors** bind to **promoter regions**, **enhancer regions**, and other **cis-regulatory elements** to control gene expression. In prokaryotes, **operons** co-regulate functionally related genes.

5. **Gene regulatory networks** are directed graphs in which edges represent activation or repression by transcription factors. **Co-expression networks** are undirected graphs that reveal modules of functionally related genes.

6. Three major **network inference methods** — **WGCNA** (correlation-based modules), **ARACNE** (**mutual information** with DPI pruning), and **GENIE3** (random forest regression) — offer complementary approaches to reconstructing regulatory relationships.

7. **Boolean network models** capture qualitative regulatory logic, while **Bayesian network models** provide probabilistic structure learning. Both are formal **graph models for regulation**.

8. **Single-cell RNA-Seq** reveals cell-to-cell heterogeneity. **Cell type clustering** uses graph-based community detection on KNN graphs, and **trajectory analysis** reconstructs differentiation pathways.

9. **Spatial transcriptomics** preserves tissue location, enabling spatial graph analysis of gene expression patterns.

10. The overarching theme: transcriptomics data naturally map onto graph structures — from co-expression networks to directed regulatory networks to spatial graphs — making graph algorithms essential tools for understanding gene regulation.

[See Annotated References](./references.md)
