---
title: Multi-Omics Integration and Graph Analytics
description: Multi-omics data integration, community detection, graph visualization, patient similarity networks, and biomarker discovery
generated_by: claude skill chapter-content-generator
date: 2026-03-25 00:00:00
version: 0.05
---

# Multi-Omics Integration and Graph Analytics

## Summary

Covers integration of genomics, transcriptomics, proteomics, and metabolomics data into unified graphs, community detection algorithms (Louvain, Leiden), graph visualization tools, patient similarity networks, and network-based biomarker discovery.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

1. Multi-Omics Integration
2. Genomics Layer
3. Transcriptomics Layer
4. Proteomics Layer
5. Metabolomics Layer
6. Unified Omics Graph
7. Graph Model for Multi-Omics
8. Community Detection
9. Louvain Algorithm
10. Leiden Algorithm
11. Modularity Score
12. Graph Clustering
13. Spectral Clustering
14. Graph Visualization
15. Vis-Network Library
16. Cytoscape Tool
17. Force-Directed Layout
18. Hierarchical Layout
19. Network Layout Algorithms
20. Patient Similarity Network
21. Clinical Data Graph
22. Survival Analysis
23. Patient Stratification
24. Network-Based Biomarkers

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: Graph Theory Fundamentals](../04-graph-theory-fundamentals/index.md)
- [Chapter 9: Protein-Protein Interaction Networks](../09-protein-interaction-networks/index.md)
- [Chapter 11: Transcriptomics and Gene Regulatory Networks](../11-transcriptomics-regulatory-networks/index.md)
- [Chapter 14: Biomedical Knowledge Graphs and Ontologies](../14-knowledge-graphs-ontologies/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    We have spent the semester studying individual layers of biological data -- sequences, structures, interactions, pathways, and knowledge graphs. Now it is time to weave all of those layers together into a single integrated picture. **Multi-omics integration** is the grand unification of bioinformatics, and graphs are the ideal language for expressing it. In this chapter we will learn how to merge genomics, transcriptomics, proteomics, and metabolomics data into unified graphs, detect communities that reveal disease subtypes, visualize complex networks, and build patient similarity networks for precision medicine. Let's connect the dots!

## Why Multi-Omics?

The suffix "-omics" refers to the comprehensive study of an entire class of biological molecules. Over the past two decades, high-throughput technologies have made it routine to measure thousands of molecules simultaneously within a single experiment. However, each omics layer captures only one dimension of cellular activity. A genome sequence tells us what a cell *could* do; a transcriptome tells us what it is *preparing* to do; a proteome tells us what it *is* doing; and a metabolome tells us the *consequences* of what it did. No single layer provides a complete picture of cellular state or disease mechanism.

**Multi-omics integration** is the computational strategy of combining data from two or more omics layers to achieve a more holistic understanding of biological systems. The rationale is straightforward: mutations in the genome may or may not alter transcript levels (Chapter 11), altered transcripts may or may not change protein abundance, and altered proteins may or may not perturb metabolite concentrations. By integrating all layers, we can trace causal chains from genotype to phenotype and identify the specific steps where dysregulation occurs.

Graphs provide a natural framework for multi-omics integration because each omics layer can be represented as a subgraph, and edges between layers capture the regulatory and biochemical relationships that connect them. This chapter formalizes that framework and introduces the analytical tools needed to extract biological insight from unified multi-omics graphs.

## The Four Omics Layers

### Genomics Layer

The **genomics layer** represents the DNA sequence and its variants. Nodes in this layer include genes, regulatory elements (promoters, enhancers, silencers), and genomic variants (single nucleotide polymorphisms, insertions, deletions, structural variants). Edges encode relationships such as "gene contains variant," "enhancer regulates gene," and "variant is in linkage disequilibrium with variant." In a multi-omics graph, the genomics layer serves as the foundational layer -- the blueprint from which all downstream molecular activity originates.

Data sources for the genomics layer include whole-genome sequencing (WGS), whole-exome sequencing (WES), and genome-wide association studies (GWAS). The key challenge in incorporating genomic data into a multi-omics graph is the sheer density of variants: a typical human genome contains approximately 4.5 million variants relative to the reference. Filtering strategies based on functional annotation, allele frequency, and predicted pathogenicity (Chapter 10) are essential for constructing a tractable graph.

### Transcriptomics Layer

The **transcriptomics layer** represents gene expression at the RNA level. Nodes include transcripts (mRNAs, lncRNAs, miRNAs) and expression quantitative trait loci (eQTLs). Edges encode co-expression relationships (genes whose expression levels are correlated across samples), regulatory interactions (transcription factor binds promoter), and post-transcriptional regulation (miRNA targets mRNA). The gene regulatory networks we studied in Chapter 11 are essentially the transcriptomics layer of a multi-omics graph.

RNA-seq is the dominant technology for measuring transcriptomes, producing read counts that are normalized to transcripts per million (TPM) or counts per million (CPM). Single-cell RNA-seq (scRNA-seq) adds cellular resolution, allowing researchers to detect cell-type-specific expression patterns that bulk RNA-seq averages out. When constructing the transcriptomics layer, co-expression edges are typically defined using Pearson or Spearman correlation with a stringent threshold (for example, $|r| > 0.7$) to avoid spurious connections.

### Proteomics Layer

The **proteomics layer** represents the protein complement of a cell or tissue. Nodes include proteins, protein isoforms, and post-translational modifications (phosphorylation, ubiquitination, glycosylation). Edges encode physical protein-protein interactions (Chapter 9), kinase-substrate relationships, and protein complex membership. Unlike transcriptomics, where mRNA abundance is a reasonable proxy for gene activity, the proteomics layer captures functional molecules directly -- the enzymes that catalyze reactions, the receptors that transduce signals, and the structural proteins that maintain cellular architecture.

Mass spectrometry-based proteomics (LC-MS/MS) is the primary technology for large-scale protein identification and quantification. A key complication is that protein abundance does not always correlate with mRNA levels; post-transcriptional regulation, protein stability, and degradation rates create a complex mapping from transcriptome to proteome. Edges connecting the transcriptomics and proteomics layers in a unified graph must therefore be weighted by the observed correlation between mRNA and protein levels for each gene.

### Metabolomics Layer

The **metabolomics layer** represents the small molecules (metabolites) that are the substrates and products of enzymatic reactions. Nodes include metabolites, lipids, and cofactors. Edges encode biochemical reactions (metabolite A is converted to metabolite B by enzyme E), transporter relationships, and metabolite-metabolite correlations observed in profiling experiments. The metabolic pathway networks from Chapter 12 constitute the core of this layer.

Metabolomics data are generated by nuclear magnetic resonance (NMR) spectroscopy or mass spectrometry coupled with liquid or gas chromatography. A distinctive challenge of metabolomics is metabolite identification: many detected mass-to-charge ratios cannot be confidently assigned to a known metabolite, creating "dark matter" in the metabolome. In the multi-omics graph, only confidently identified metabolites are included as nodes, but edges to enzyme nodes in the proteomics layer provide a bridge that can help resolve ambiguous identifications through network context.

#### Diagram: The Four Omics Layers

<iframe src="../../sims/four-omics-layers/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Four Omics Layers MicroSim Fullscreen](../../sims/four-omics-layers/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: four-omics-layers
Library: vis-network
Status: Specified

A layered graph with four horizontal tiers: genomics (blue) at the bottom, transcriptomics (green) above it, proteomics (orange) next, and metabolomics (red) at the top. Intra-layer edges connect nodes within each layer. Inter-layer edges (dashed, gray) connect genes to transcripts, transcripts to proteins, and proteins to metabolites. A legend identifies each layer by color.
</details>

## Building a Unified Omics Graph

### Graph Model for Multi-Omics

The **graph model for multi-omics** formalizes the integration of heterogeneous omics data into a single graph structure. A **unified omics graph** $G = (V, E)$ is a heterogeneous, multilayer graph where:

- The node set $V = V_G \cup V_T \cup V_P \cup V_M$ is the union of genomics nodes ($V_G$), transcriptomics nodes ($V_T$), proteomics nodes ($V_P$), and metabolomics nodes ($V_M$).
- The edge set $E = E_{intra} \cup E_{inter}$ consists of intra-layer edges (connecting nodes within the same omics layer) and inter-layer edges (connecting nodes across different layers).
- Each node $v \in V$ carries a type label $\tau(v) \in \{gene, variant, transcript, protein, metabolite, \ldots\}$ and a feature vector $\mathbf{x}_v$ containing quantitative measurements (expression levels, fold changes, concentrations).
- Each edge $e \in E$ carries a type label $\rho(e) \in \{regulates, interacts\_with, catalyzes, correlates\_with, \ldots\}$ and optionally a weight $w(e)$ reflecting confidence or effect size.

This formalism extends the knowledge graph triple representation $(h, r, t)$ from Chapter 14 with continuous node features and weighted edges. The result is a rich, queryable structure that supports both graph-theoretic analyses (community detection, centrality) and machine learning approaches (graph neural networks, graph embeddings).

!!! mascot-thinking "Think About It: Why Not Just Concatenate Data Tables?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    A common alternative to graph-based integration is to simply concatenate omics measurements into a single wide matrix -- one row per patient, one column per feature across all omics types. While this works for some statistical methods, it discards the relational structure between molecules. The graph approach preserves the fact that gene A regulates gene B, which encodes protein C, which catalyzes the production of metabolite D. Those relationships are invisible in a flat matrix but essential for mechanistic interpretation.

### Practical Construction Steps

Building a unified omics graph for a specific study involves five steps:

1. **Node creation.** For each omics layer, create nodes for the measured entities. A typical cancer multi-omics study might include approximately 20,000 gene nodes, 20,000 transcript nodes, 8,000 protein nodes, and 500 metabolite nodes.

2. **Intra-layer edge construction.** Within each layer, add edges from curated databases (protein-protein interactions from STRING, regulatory interactions from TRRUST) and from data-driven inference (co-expression networks from correlation analysis, metabolite-metabolite correlations).

3. **Inter-layer edge construction.** Connect layers using known biological mappings: gene-to-transcript (one-to-many, from genome annotation), transcript-to-protein (from UniProt cross-references), and protein-to-metabolite (from enzyme-substrate annotations in KEGG or Reactome).

4. **Feature assignment.** Attach quantitative measurements as node attributes. For a patient cohort, each node may carry a vector of measurements across all patients, or the graph may be instantiated separately for each patient.

5. **Edge weighting.** Assign confidence scores to edges based on experimental evidence, database curation level, and statistical significance of data-driven associations.

| Step | Input | Output | Key Resources |
|---|---|---|---|
| Node creation | Omics identifiers | Typed node set | Ensembl, UniProt, HMDB |
| Intra-layer edges | Databases, correlation analysis | Weighted intra-layer edges | STRING, TRRUST, KEGG |
| Inter-layer edges | Cross-reference mappings | Inter-layer edges | UniProt ID mapping, Reactome |
| Feature assignment | Quantitative measurements | Node feature vectors | RNA-seq counts, MS intensities |
| Edge weighting | Evidence metadata | Weighted edge set | Evidence codes, $p$-values |

## Community Detection in Multi-Omics Graphs

Once a unified omics graph is constructed, a central analytical task is identifying groups of densely interconnected nodes that may represent functional modules -- sets of genes, proteins, and metabolites that work together in a biological process or are co-dysregulated in a disease. This task is called **community detection**, and it is one of the most important applications of **graph clustering** in bioinformatics.

### Modularity Score

The mathematical foundation of most community detection algorithms is the **modularity score**, a scalar quantity that measures the quality of a partition of a graph into communities. Modularity compares the density of edges within communities to the density expected under a random null model. For an undirected graph with adjacency matrix $A$ and total edge weight $m = \frac{1}{2}\sum_{ij} A_{ij}$, the modularity $Q$ of a partition is:

$$Q = \frac{1}{2m} \sum_{ij} \left[ A_{ij} - \frac{k_i k_j}{2m} \right] \delta(c_i, c_j)$$

where $k_i = \sum_j A_{ij}$ is the degree of node $i$, $c_i$ is the community assignment of node $i$, and $\delta(c_i, c_j)$ is the Kronecker delta, equal to 1 if nodes $i$ and $j$ are in the same community and 0 otherwise. The term $\frac{k_i k_j}{2m}$ is the expected number of edges between nodes $i$ and $j$ under the configuration model (a random graph preserving the degree sequence). Modularity values range from $-0.5$ to $1$, with values above $0.3$ generally indicating meaningful community structure.

### The Louvain Algorithm

The **Louvain algorithm** is a greedy, hierarchical method for maximizing modularity. It operates in two phases that are repeated iteratively:

**Phase 1 (Local optimization).** Each node starts in its own community. For each node, the algorithm evaluates the modularity gain from moving that node to each of its neighbors' communities and selects the move that yields the largest positive gain. This process is repeated until no further improvement is possible.

**Phase 2 (Aggregation).** The communities found in Phase 1 are collapsed into super-nodes, creating a new, smaller graph where edges between super-nodes are weighted by the sum of inter-community edges. Phase 1 is then applied to this coarsened graph.

The two phases alternate until modularity stabilizes. The Louvain algorithm is fast -- its time complexity is $O(n \log n)$ for sparse graphs with $n$ nodes -- making it practical for multi-omics graphs with tens of thousands of nodes. However, the Louvain algorithm has a known limitation: it can produce badly connected communities. Because it optimizes modularity greedily, it may assign nodes to communities even when those nodes are connected to the community only through a single bridge edge, resulting in communities that are internally disconnected.

### The Leiden Algorithm

The **Leiden algorithm** was developed specifically to address the connectivity problems of Louvain. It introduces a refinement phase between local optimization and aggregation:

**Phase 1 (Local moving).** Identical to Louvain's Phase 1.

**Phase 2 (Refinement).** Within each community found in Phase 1, the algorithm identifies well-connected subcommunities by optimizing a local quality function. This step ensures that every community in the refined partition is internally connected -- no community will contain disconnected subsets of nodes.

**Phase 3 (Aggregation).** The refined communities are collapsed into super-nodes, and the process restarts.

The Leiden algorithm guarantees that all communities are connected subgraphs, a property that Louvain does not guarantee. In practice, Leiden also converges faster and produces higher modularity scores on most benchmark networks.

| Feature | Louvain | Leiden |
|---|---|---|
| Optimization target | Modularity | Modularity (or CPM) |
| Connectivity guarantee | No | Yes |
| Refinement phase | No | Yes |
| Typical speed | Fast ($O(n \log n)$) | Fast (comparable to Louvain) |
| Disconnected communities | Possible | Prevented |
| Recommended for | Quick exploratory analysis | Publication-quality results |

#### Diagram: Louvain vs. Leiden Community Detection

<iframe src="../../sims/louvain-vs-leiden/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Louvain vs. Leiden MicroSim Fullscreen](../../sims/louvain-vs-leiden/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: louvain-vs-leiden
Library: p5.js
Status: Specified

A side-by-side comparison. Left panel shows a Louvain partition with one community containing a disconnected bridge (highlighted in red). Right panel shows the Leiden partition of the same graph where the refinement phase has split the disconnected community into properly connected subcommunities. Nodes are colored by community. A slider controls the number of iterations.
</details>

### Spectral Clustering

**Spectral clustering** offers an alternative to modularity-based methods by leveraging the eigenvalues and eigenvectors of graph matrices. Given the graph Laplacian $L = D - A$ (where $D$ is the diagonal degree matrix and $A$ is the adjacency matrix), spectral clustering computes the $k$ smallest non-trivial eigenvectors of $L$ and uses them as features for $k$-means clustering in the reduced eigenspace.

The key insight is that the eigenvectors of the Laplacian encode the community structure of the graph. The second-smallest eigenvector (the Fiedler vector) provides an optimal bipartition of the graph, and additional eigenvectors refine this into multiple communities. Spectral clustering is particularly effective when communities have irregular sizes or shapes, situations where modularity-based methods can suffer from a known resolution limit (the tendency to merge small communities).

In multi-omics applications, spectral clustering is often applied to patient similarity networks (discussed later in this chapter) because it handles continuous-valued edge weights naturally and produces stable, reproducible results. A practical challenge for spectral clustering is choosing the number of communities $k$. The eigengap heuristic provides guidance: examine the gaps between consecutive eigenvalues of the Laplacian, and look for a large gap between $\lambda_k$ and $\lambda_{k+1}$, which suggests $k$ is a good choice. For modularity-based methods like Louvain and Leiden, the algorithm determines $k$ automatically by optimizing $Q$. In either case, biologists typically validate $k$ by checking whether the detected communities correspond to known biological pathways or clinical subtypes.

## Graph Visualization

### Principles of Network Visualization

**Graph visualization** is the art and science of rendering a network as a two-dimensional (or three-dimensional) layout that reveals its structure to the human eye. Effective visualization requires choosing appropriate **network layout algorithms** that position nodes so that the spatial arrangement reflects the graph's topology -- densely connected clusters should appear as visually distinct groups, and hub nodes should be visually prominent.

The choice of layout algorithm depends on the graph's size and structure. For multi-omics graphs with thousands of nodes and tens of thousands of edges, algorithmic layout is essential because manual positioning is infeasible.

### Force-Directed Layout

The **force-directed layout** family of algorithms treats the graph as a physical system in which nodes are charged particles that repel each other and edges are springs that attract connected nodes. The algorithm iteratively adjusts node positions to minimize the total energy of the system, reaching an equilibrium where connected nodes are near each other and unconnected nodes are spread apart. The most widely used variant is the Fruchterman-Reingold algorithm, which balances attractive and repulsive forces:

- **Attractive force** (along edges): $f_a(d) = d^2 / k$
- **Repulsive force** (between all node pairs): $f_r(d) = -k^2 / d$

where $d$ is the distance between two nodes and $k$ is the optimal edge length (a function of the drawing area and the number of nodes). Force-directed layouts excel at revealing cluster structure and are the default choice for most biological network visualizations.

### Hierarchical Layout

The **hierarchical layout** arranges nodes in horizontal or vertical tiers based on a topological ordering. Nodes at the top of the hierarchy have no incoming edges (source nodes), and edges flow downward to sink nodes. This layout is ideal for directed acyclic graphs such as signaling cascades (Chapter 13), metabolic pathways (Chapter 12), and ontology hierarchies (Chapter 14), where the direction of information flow is a critical feature.

In a multi-omics context, a hierarchical layout can arrange the four omics layers as distinct tiers -- genomics at the bottom, transcriptomics above, proteomics next, and metabolomics at the top -- with inter-layer edges flowing upward to reflect the direction of biological information flow from DNA to metabolite.

### Visualization Tools

#### Vis-Network Library

The **vis-network library** is a JavaScript library for browser-based network visualization. It supports interactive exploration with features including zoom, pan, node dragging, tooltips, and dynamic edge bundling. Vis-network is particularly well-suited for educational and exploratory applications because it runs entirely in the browser without requiring server-side computation.

For multi-omics graphs, vis-network's hierarchical layout mode can separate omics layers into distinct visual tiers. Its physics simulation engine supports customizable force-directed layouts with adjustable repulsion, spring length, and damping parameters. When rendering networks with vis-network, note that edge labels on perfectly horizontal edges may not render correctly on initial load; adding a slight vertical offset to one endpoint resolves this rendering artifact.

```javascript
// Minimal vis-network example for a multi-omics subgraph
var nodes = new vis.DataSet([
  {id: 1, label: 'TP53', group: 'gene', level: 0},
  {id: 2, label: 'TP53 mRNA', group: 'transcript', level: 1},
  {id: 3, label: 'p53 protein', group: 'protein', level: 2},
  {id: 4, label: 'MDM2', group: 'protein', level: 2}
]);
var edges = new vis.DataSet([
  {from: 1, to: 2, label: 'transcribes'},
  {from: 2, to: 3, label: 'translates'},
  {from: 3, to: 4, label: 'interacts'}
]);
var options = {
  layout: { hierarchical: { direction: 'UD', sortMethod: 'directed' } }
};
var network = new vis.Network(container, {nodes: nodes, edges: edges}, options);
```

#### Cytoscape Tool

**Cytoscape** is a desktop application and web framework (Cytoscape.js) designed specifically for biological network analysis and visualization. Cytoscape offers over 300 plugins (called "apps") that extend its capabilities to include pathway enrichment, community detection, network motif analysis, and integration with public databases. Its strengths include publication-quality rendering, support for very large networks (hundreds of thousands of nodes), and a rich ecosystem of analysis tools.

For multi-omics visualization, Cytoscape's compound node feature allows grouping of nodes by omics layer or community membership. The cytoscape.js-cola and cytoscape.js-cose-bilkent layout extensions provide high-quality force-directed and hierarchical layouts optimized for biological networks. Cytoscape also supports direct import from STRING, IntAct, and other interaction databases through the CyREST API.

| Feature | vis-network | Cytoscape |
|---|---|---|
| Platform | Browser (JavaScript) | Desktop + Browser (Java/JS) |
| Max practical nodes | ~5,000 | ~500,000 |
| Plugin ecosystem | Limited | 300+ apps |
| Interactivity | Excellent | Good (desktop), Excellent (JS) |
| Learning curve | Low | Moderate |
| Best for | Education, web apps, prototyping | Publication figures, large-scale analysis |

!!! mascot-tip "Tip: Choosing the Right Visualization Tool"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    For quick exploration and interactive web applications, start with vis-network -- you can have a working visualization in under 20 lines of JavaScript. When you need publication-quality figures, complex layout algorithms, or analysis of networks with more than 5,000 nodes, switch to Cytoscape. For Capstone Project 5, you might prototype your patient similarity network in vis-network and then produce your final figures in Cytoscape.

## Patient Similarity Networks

### Concept and Construction

A **patient similarity network** (PSN) is a graph in which each node represents a patient and each edge connects two patients whose molecular or clinical profiles are similar. PSNs translate the abstract concept of "patient similarity" into a concrete, analyzable graph structure. By applying community detection to a PSN, researchers can identify groups of patients with shared molecular signatures -- a process called **patient stratification** -- which is essential for precision medicine.

Constructing a PSN involves three steps:

1. **Feature extraction.** For each patient, compile a feature vector from one or more omics layers. For example, a feature vector might contain the expression levels of 5,000 genes measured by RNA-seq, the abundances of 200 proteins measured by mass spectrometry, and the concentrations of 100 metabolites.

2. **Similarity computation.** Compute pairwise patient similarity using an appropriate metric. Common choices include Pearson correlation, cosine similarity, and Euclidean distance (converted to similarity via a Gaussian kernel: $w_{ij} = \exp(-d_{ij}^2 / \mu \cdot \bar{d}^2)$ where $d_{ij}$ is the Euclidean distance, $\bar{d}$ is the mean distance, and $\mu$ is a scaling parameter).

3. **Network construction.** Apply a sparsification strategy to keep only the most informative edges. The $k$-nearest neighbors (KNN) approach retains only the $k$ most similar patients for each node, producing a sparse graph that preserves local neighborhood structure while removing noisy long-range connections.

When multiple omics layers are available, a powerful strategy is Similarity Network Fusion (SNF), which constructs a separate patient similarity network for each omics layer and then iteratively fuses them into a single network. SNF captures both shared and complementary information across omics layers and has been shown to outperform simple feature concatenation for patient stratification.

#### Diagram: Patient Similarity Network Construction

<iframe src="../../sims/patient-similarity-network/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Patient Similarity Network MicroSim Fullscreen](../../sims/patient-similarity-network/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: patient-similarity-network
Library: p5.js
Status: Specified

An animated diagram showing three stages. Stage 1: a data matrix (rows = patients, columns = features) with color-coded columns for different omics types. Stage 2: a heatmap of pairwise patient similarities. Stage 3: a force-directed graph where patients are nodes, edges connect similar patients, and node colors indicate community membership detected by Leiden. A slider controls the KNN parameter $k$.
</details>

### Clinical Data Graph

A **clinical data graph** extends the patient similarity network by incorporating non-omics clinical variables -- age, sex, tumor stage, treatment history, comorbidities, and survival outcomes -- as node attributes or as additional graph structure. For example, treatment nodes can be shared across patients who received the same therapy, creating additional edges that reflect clinical groupings. The clinical data graph enables queries that traverse from molecular measurements through patient similarity to clinical outcomes, linking genotype to phenotype at the cohort level.

### Survival Analysis on Patient Networks

**Survival analysis** is the statistical framework for modeling the time until an event of interest (typically death or disease recurrence) occurs. In the context of patient similarity networks, survival analysis serves as the primary validation tool for patient stratification: if the communities detected in a PSN correspond to genuinely distinct disease subtypes, then patients in different communities should have significantly different survival curves.

The Kaplan-Meier estimator provides a non-parametric estimate of the survival function $S(t) = P(T > t)$ for each patient group, and the log-rank test assesses whether the survival curves of different groups are statistically distinguishable. A significant log-rank $p$-value (typically $p < 0.05$ after correction for multiple comparisons) provides clinical evidence that the network-derived patient groups capture biologically and clinically meaningful differences.

!!! mascot-warning "Watch Out: Overfitting in Patient Stratification"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    It is tempting to keep adjusting community detection parameters until the log-rank test yields a significant $p$-value -- but this is a form of overfitting. Always validate your stratification on an independent patient cohort. If no independent cohort is available, use cross-validation: split your cohort, detect communities on the training set, assign held-out patients to the nearest community, and evaluate survival differences on the held-out set.

### Patient Stratification and Precision Medicine

**Patient stratification** is the process of dividing a heterogeneous patient population into clinically meaningful subgroups based on molecular and clinical features. In practice, patient stratification on a PSN proceeds as follows:

1. Construct a multi-omics PSN using SNF or a similar integration method.
2. Apply the Leiden algorithm to detect patient communities.
3. Characterize each community by identifying the omics features that are differentially abundant (differentially expressed genes, differentially abundant proteins or metabolites).
4. Validate communities by survival analysis, treatment response analysis, or association with known clinical subtypes.
5. Identify **network-based biomarkers** that distinguish communities.

This workflow is the foundation of Capstone Project 5 (Multi-Omics Patient Stratification), where you will integrate multi-omics data from The Cancer Genome Atlas (TCGA), construct a PSN, detect subtypes, and validate them against clinical outcomes.

## Network-Based Biomarkers

A **network-based biomarker** is a molecular signature defined not by the behavior of individual molecules in isolation, but by their collective behavior within a network context. Traditional biomarkers are single molecules (for example, PSA for prostate cancer or HER2 for breast cancer), but single-molecule biomarkers often lack robustness because biological systems are redundant -- if one gene is silenced, a paralog may compensate. Network-based biomarkers capture the activity of entire modules or pathways, making them inherently more robust to biological noise and measurement variability.

Common types of network-based biomarkers include:

- **Subnetwork biomarkers.** A connected subgraph whose aggregate activity (for example, the mean expression of all genes in the subnetwork) distinguishes patient groups. Subnetwork biomarkers are identified by searching the multi-omics graph for subgraphs that are both topologically cohesive and differentially active between conditions.

- **Hub biomarkers.** Genes or proteins that occupy central positions in the multi-omics graph (high degree, high betweenness centrality) and whose perturbation has outsized effects on network behavior. Hub genes in disease-specific modules are strong biomarker candidates because their disruption is likely to affect many downstream processes.

- **Community biomarkers.** The characteristic molecular profile of a patient community detected by Leiden or Louvain. Community biomarkers are sets of molecules that are collectively upregulated or downregulated within a specific patient subtype, identified by differential analysis between communities.

| Biomarker Type | Definition | Identification Method | Strength |
|---|---|---|---|
| Single molecule | One gene/protein | Differential expression | Simple, established |
| Subnetwork | Connected subgraph | Network search + differential activity | Robust to noise |
| Hub | Central network node | Centrality analysis | Mechanistic insight |
| Community | Module profile | Community detection + characterization | Patient stratification |

The power of network-based biomarkers lies in their ability to integrate structural information (the graph topology) with functional information (omics measurements). A gene that is only mildly differentially expressed on its own may become a compelling biomarker when considered in the context of its network neighborhood -- if all of its interacting partners are also perturbed, the module as a whole may be strongly dysregulated even if no individual member reaches statistical significance on its own.

!!! mascot-thinking "Think About It: From Molecules to Modules"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Consider a gene that shows a fold change of 1.3 between tumor and normal tissue -- barely above the typical significance threshold. Now imagine that all 15 of its direct interaction partners also show fold changes between 1.2 and 1.5 in the same direction. Individually, none of these genes would be flagged as biomarkers. But as a network module, their coordinated shift represents a strong and reproducible signal. This is the core insight of network-based biomarker discovery.

## Capstone Connection: Multi-Omics Patient Stratification

Capstone Project 5 (Multi-Omics Patient Stratification) synthesizes the techniques introduced in this chapter into a complete analysis pipeline. You will:

1. Download multi-omics data (mRNA expression, protein abundance, DNA methylation) for a TCGA cancer cohort.
2. Construct omics-specific patient similarity networks using Gaussian kernel similarity.
3. Fuse the networks using Similarity Network Fusion.
4. Apply the Leiden algorithm to detect patient subtypes.
5. Validate subtypes by Kaplan-Meier survival analysis with log-rank testing.
6. Identify network-based biomarkers that characterize each subtype.
7. Visualize the integrated PSN using vis-network (interactive prototype) and Cytoscape (publication figure).

This project connects every major concept in this chapter -- from the individual omics layers through unified graph construction, community detection, patient stratification, and biomarker discovery -- into a single end-to-end workflow.

!!! mascot-celebration "Great Work, Explorers!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You have now mastered the tools to integrate multiple omics layers into unified graphs, detect communities that reveal disease subtypes, and discover network-based biomarkers for precision medicine. These techniques represent the cutting edge of translational bioinformatics -- the bridge from molecular measurements to clinical decisions. You are ready to tackle the capstone and put it all together. Follow the edges to discovery!

## Key Takeaways

1. **Multi-omics integration** combines genomics, transcriptomics, proteomics, and metabolomics data to achieve a holistic view of biological systems that no single layer can provide.

2. A **unified omics graph** models each omics layer as a subgraph with intra-layer edges (within a layer) and inter-layer edges (between layers), preserving the relational structure that flat data matrices discard.

3. **Community detection** algorithms identify densely connected modules in multi-omics graphs. The **Louvain algorithm** is fast but may produce disconnected communities; the **Leiden algorithm** adds a refinement phase that guarantees connected communities.

4. **Modularity** ($Q$) quantifies community quality by comparing within-community edge density to a random expectation. Values above 0.3 suggest meaningful structure.

5. **Spectral clustering** uses the eigenvectors of the graph Laplacian to embed nodes in a low-dimensional space and then applies $k$-means, offering an alternative to modularity-based methods that handles irregular community sizes.

6. **Graph visualization** tools -- **vis-network** for interactive web prototyping and **Cytoscape** for publication-quality analysis -- make complex networks interpretable through **force-directed** and **hierarchical layouts**.

7. **Patient similarity networks** translate molecular profiles into graph structure, enabling **patient stratification** through community detection and validation through **survival analysis**.

8. **Network-based biomarkers** (subnetwork, hub, and community biomarkers) leverage graph topology to identify robust molecular signatures that outperform single-molecule biomarkers by capturing coordinated changes across entire modules.
