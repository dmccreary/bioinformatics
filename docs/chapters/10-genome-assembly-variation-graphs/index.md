---
title: Genome Assembly and Variation Graphs
description: De Bruijn graphs for assembly, pangenome graphs, variation graphs, sequencing technologies, and variant calling
generated_by: claude skill chapter-content-generator
date: 2026-03-25 00:00:00
version: 0.05
---

# Genome Assembly and Variation Graphs

## Summary

Introduces genome assembly using de Bruijn graphs, k-mer analysis, pangenome and variation graphs, the vg toolkit, variant calling methods, sequencing technologies, and graph-based approaches to representing genomic variation.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Genome Assembly
2. De Bruijn Graph
3. K-mer
4. K-mer Spectrum
5. Contig
6. Scaffold
7. N50 Metric
8. Assembly Quality Metrics
9. Reference Genome
10. Reference Bias
11. Pangenome
12. Pangenome Graph
13. Variation Graph
14. VG Toolkit
15. Graph Model for Variants
16. Read Mapping to Graphs
17. Genome Annotation
18. Gene Prediction
19. Next-Gen Sequencing
20. Short Reads
21. Long Reads
22. Sequencing Depth
23. Coverage
24. Variant Calling
25. SNP Calling
26. Structural Variant Calling
27. Genotyping
28. Haplotype
29. Phasing
30. Population Reference Graph

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Molecular Biology](../01-foundations-molecular-biology/index.md)
- [Chapter 3: Bioinformatics Data Formats](../03-bioinformatics-data-formats/index.md)
- [Chapter 4: Graph Theory Fundamentals](../04-graph-theory-fundamentals/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    A genome is not a static string of letters waiting to be read — it is a vast puzzle that arrives in millions of tiny fragments. To reconstruct the full picture, bioinformaticians turn to graph algorithms, and one graph structure in particular — the de Bruijn graph — has become the foundation of modern genome assembly. In this chapter we will build assemblies from scratch, measure their quality, and then push beyond the single-reference paradigm into pangenome and variation graphs that capture the full diversity of a species. Let's connect the dots!

## From Fragments to Genomes

**Genome assembly** is the computational process of reconstructing a complete genome sequence from shorter overlapping fragments produced by a sequencing instrument. No current technology can read an entire chromosome in one pass, so every assembly project begins with the same challenge: given millions of short sequence reads, stitch them back together into the longest, most accurate contiguous sequences possible.

The difficulty of assembly scales with genome size and repetitive content. A bacterial genome of five million base pairs with few repeats can be assembled into a handful of large pieces in minutes. The human genome, at three billion base pairs riddled with transposable elements, segmental duplications, and tandem repeats, remains one of the hardest puzzles in computational biology. Assembly is where sequencing technology meets graph theory, and the choice of graph model determines both the quality and the computational cost of the result.

#### Diagram: Genome Assembly Pipeline Overview

<iframe src="../../sims/genome-assembly-pipeline/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Genome Assembly Pipeline MicroSim Fullscreen](../../sims/genome-assembly-pipeline/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: genome-assembly-pipeline
Library: p5.js
Status: Specified

An animated pipeline diagram showing the stages of genome assembly: raw reads enter from the left, pass through quality filtering, k-mer counting, de Bruijn graph construction, contig generation, scaffolding, and gap filling. Each stage is represented as a labeled box connected by directional arrows. Clicking a stage highlights it and displays a brief description in a side panel. The animation shows reads flowing through the pipeline, merging into longer contigs and scaffolds.
</details>

## Sequencing Technologies

Before we can assemble a genome, we need sequences. **Next-generation sequencing** (NGS) refers to the family of high-throughput platforms — Illumina being the most widely used — that produce millions of reads in a single instrument run. Understanding how these technologies work is essential because the read length, error profile, and throughput of each platform directly shape the assembly strategy.

### Short Reads

Illumina sequencing produces **short reads**, typically 100 to 300 base pairs in length. These reads have very low error rates (less than 0.1% per base after quality filtering) and are generated at enormous throughput — a single NovaSeq run can produce several terabases of data. Short reads are ideal for resequencing projects where a reference genome already exists, but their limited length makes it difficult to span repetitive regions during de novo assembly. Paired-end sequencing, where both ends of a DNA fragment are read, partially alleviates this limitation by providing information about the distance between read pairs.

### Long Reads

**Long reads** from Pacific Biosciences (PacBio) and Oxford Nanopore Technologies (ONT) range from thousands to hundreds of thousands of base pairs. PacBio HiFi reads achieve median lengths of 15-20 kilobases with accuracy exceeding 99.9%, while ONT ultra-long reads can exceed one megabase, though with higher per-base error rates (3-5% for the latest chemistries). Long reads can span most repetitive elements in the human genome, dramatically simplifying assembly graph topology. Many modern projects use a hybrid strategy: long reads for structural continuity and short reads for base-level polishing.

### Sequencing Depth and Coverage

**Sequencing depth** (also called read depth) is the average number of times each base in the genome is represented by a sequencing read. **Coverage** is a related concept that describes the fraction of the genome represented by at least one read. The Lander-Waterman model provides a theoretical framework for the relationship between sequencing effort and coverage:

$$P(\text{base not covered}) = e^{-c}$$

where $c$ is the average sequencing depth. At $c = 30\times$ depth, the probability that any given base is not covered is $e^{-30} \approx 9.3 \times 10^{-14}$, which is vanishingly small. In practice, coverage is not uniform due to GC-content bias, repetitive regions, and library preparation artifacts, so most projects aim for 30-50x depth for short-read assembly and 30x or more for long-read assembly.

The expected depth at any position can be calculated as:

$$c = \frac{N \cdot L}{G}$$

where $N$ is the number of reads, $L$ is the average read length, and $G$ is the genome size.

## K-mers: The Building Blocks of Assembly

A **k-mer** is a substring of length $k$ extracted from a sequence read. For a read of length $L$, there are $L - k + 1$ overlapping k-mers. K-mers are the atomic units of de Bruijn graph-based assembly: rather than aligning entire reads to one another (an expensive all-versus-all comparison), the assembler decomposes every read into its constituent k-mers and builds a graph from the overlaps between them.

### A Concrete K-mer Example

Consider the short sequence `ATGCGTAC` and $k = 4$. The k-mers are:

| Position | 4-mer |
|----------|-------|
| 1 | ATGC |
| 2 | TGCG |
| 3 | GCGT |
| 4 | CGTA |
| 5 | GTAC |

Each k-mer overlaps the next by $k - 1 = 3$ bases. This overlap is exactly the property exploited by the de Bruijn graph.

!!! mascot-thinking "What's the Link? Choosing the Right K"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    The choice of $k$ is a critical trade-off. A small $k$ increases sensitivity (more overlaps) but also increases ambiguity because short k-mers are more likely to appear at multiple genomic locations. A large $k$ improves specificity but requires higher coverage to ensure every k-mer is observed. Most short-read assemblers use $k$ values between 21 and 127, and some use multiple values of $k$ in an iterative strategy.

### The K-mer Spectrum

The **k-mer spectrum** is a histogram plotting the frequency of each distinct k-mer across the entire read set. A typical k-mer spectrum from a diploid genome shows a characteristic shape: a large peak near the expected depth (representing k-mers from unique genomic regions), a smaller peak at roughly twice that depth (representing k-mers from regions present in two copies), and a spike of very-low-frequency k-mers (representing sequencing errors, since a single base error in a read creates up to $k$ novel erroneous k-mers).

The k-mer spectrum is invaluable for quality control before assembly even begins. From it, you can estimate genome size, heterozygosity, and repetitive content. If the total number of k-mers at the main peak frequency $f$ is $M$ and the total number of distinct k-mers is $D$, then the estimated genome size is approximately:

$$G_{\text{est}} \approx \frac{M}{f}$$

Tools such as KMC, Jellyfish, and GenomeScope automate k-mer counting and spectrum analysis.

## De Bruijn Graphs: The Core Assembly Graph

The **de Bruijn graph** is the central graph data structure in modern genome assembly. Named after the Dutch mathematician Nicolaas Govert de Bruijn, it was originally studied in combinatorics for constructing sequences in which every possible subsequence of a given length appears exactly once. In bioinformatics, the de Bruijn graph provides an elegant and computationally efficient framework for representing the overlap relationships among millions of k-mers.

### Formal Definition

A de Bruijn graph $G = (V, E)$ for a set of k-mers is constructed as follows:

- **Nodes**: Each node represents a unique $(k-1)$-mer — that is, a substring of length $k - 1$.
- **Edges**: For each k-mer in the dataset, create a directed edge from the node representing the k-mer's $(k-1)$-length prefix to the node representing its $(k-1)$-length suffix.

For example, the k-mer `ATGC` (where $k = 4$) generates a directed edge from node `ATG` (the prefix) to node `TGC` (the suffix).

### Building a De Bruijn Graph: Step by Step

Let us construct a de Bruijn graph from the sequence `ATGCGTAC` with $k = 4$. We already extracted the five 4-mers above. Now we identify the 3-mer prefix and suffix of each:

| 4-mer | Prefix (3-mer) | Suffix (3-mer) | Edge |
|-------|----------------|----------------|------|
| ATGC | ATG | TGC | ATG -> TGC |
| TGCG | TGC | GCG | TGC -> GCG |
| GCGT | GCG | CGT | GCG -> CGT |
| CGTA | CGT | GTA | CGT -> GTA |
| GTAC | GTA | TAC | GTA -> TAC |

The resulting graph has six nodes (`ATG`, `TGC`, `GCG`, `CGT`, `GTA`, `TAC`) and five directed edges forming a simple path. Reconstructing the original sequence amounts to finding an **Eulerian path** through this graph — a path that traverses every edge exactly once.

#### Diagram: De Bruijn Graph Construction

<iframe src="../../sims/de-bruijn-graph/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View De Bruijn Graph MicroSim Fullscreen](../../sims/de-bruijn-graph/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: de-bruijn-graph
Library: p5.js
Status: Specified

An interactive de Bruijn graph builder. Students enter a short DNA sequence and select a value of k using a slider (range 3-7). The visualization decomposes the sequence into k-mers, displays the prefix/suffix table, and draws the corresponding directed graph with labeled nodes and edges. Nodes are colored circles with (k-1)-mer labels. Edges are labeled with the k-mer they represent. An "Animate Eulerian Path" button highlights the Eulerian path step by step, reconstructing the sequence in a text panel below the graph.
</details>

### Why Eulerian Paths?

The key insight connecting de Bruijn graphs to genome assembly is this: if every k-mer in the genome appears exactly once in the sequencing data, then reconstructing the genome is equivalent to finding an Eulerian path through the de Bruijn graph. An Eulerian path visits every edge exactly once, and because each edge represents a k-mer, the path spells out the original sequence.

In practice, genomes contain repeated k-mers (from repetitive elements), sequencing errors introduce spurious k-mers, and coverage gaps leave edges missing. These complications create bubbles, tips, and tangles in the graph that assemblers must resolve using heuristic algorithms. Nevertheless, the Eulerian path formulation gives de Bruijn graph assemblers a fundamental computational advantage: finding an Eulerian path in a graph with $m$ edges takes $O(m)$ time, whereas the overlap-based alternative (finding a Hamiltonian path through a read-overlap graph) is NP-hard.

### Practical Assemblers

Popular de Bruijn graph assemblers include SPAdes (designed for bacterial and small eukaryotic genomes), MEGAHIT (memory-efficient, suitable for metagenomics), and Velvet (one of the earliest de Bruijn graph assemblers). For long reads, assemblers such as hifiasm and Flye use string graph or overlap-layout-consensus approaches, though some incorporate de Bruijn graph modules for specific steps.

## Contigs, Scaffolds, and Assembly Quality

### From Graph to Contigs

A **contig** (contiguous sequence) is an unambiguous path through the assembly graph — a stretch of assembled sequence with no gaps or branches. Contigs end where the graph becomes ambiguous: at repeat boundaries, where coverage drops to zero, or where heterozygous variants create bubbles. A typical short-read assembly of a mammalian genome produces thousands to tens of thousands of contigs.

### Scaffolding

**Scaffolds** are ordered and oriented sets of contigs connected by estimated gap sizes. Paired-end and mate-pair sequencing provide the distance constraints needed for scaffolding: if two reads from a pair map to different contigs, the contigs must be adjacent with a gap approximately equal to the insert size minus the mapped read lengths. Long reads and Hi-C chromatin conformation data provide even stronger scaffolding signals, sometimes enabling chromosome-scale scaffolds.

### The N50 Metric

The **N50 metric** is the most widely used measure of assembly contiguity. It is defined as the length $L$ such that sequences of length $L$ or greater account for at least 50% of the total assembled length. To compute N50:

1. Sort all contigs (or scaffolds) by length in descending order.
2. Compute the cumulative sum of lengths.
3. N50 is the length of the contig at which the cumulative sum first exceeds 50% of the total assembly size.

For example, suppose an assembly has contigs of lengths 10, 8, 7, 5, 3, 2, and 1 (in kilobases), totaling 36 kb. Half of 36 is 18. The cumulative sums are 10, 18, 25, ... so the N50 is 8 kb (the contig at which we reach 18 kb).

!!! mascot-tip "Follow the Edges!"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    N50 alone does not guarantee a good assembly. A high N50 can result from misassemblies that incorrectly join distant genomic regions. Always pair N50 with correctness metrics such as the number of misassemblies, mismatches per 100 kb, and the fraction of the reference genome covered. Tools like QUAST compute a comprehensive set of **assembly quality metrics** in one step.

### Additional Quality Metrics

Beyond N50, **assembly quality metrics** include NG50 (N50 normalized to the expected genome size), L50 (the number of contigs needed to reach the N50 length), BUSCO completeness (the fraction of expected single-copy orthologs found in the assembly), and the total number of contigs. A high-quality mammalian assembly typically has an N50 exceeding 10 Mb, fewer than 100 misassemblies against a reference, and BUSCO completeness above 95%.

## The Reference Genome and Its Limitations

A **reference genome** is a representative consensus sequence for a species, assembled from one or a small number of individuals and used as the coordinate system for downstream analyses such as read mapping, variant calling, and genome annotation. The human reference genome (GRCh38, and its successor T2T-CHM13) has been indispensable for decades of biomedical research.

However, a single linear reference introduces **reference bias** — the systematic tendency for analyses to favor alleles present in the reference and underrepresent or entirely miss alleles absent from it. Reference bias affects read mapping (reads carrying non-reference alleles map with lower confidence), variant calling (structural variants different from the reference are harder to detect), and population studies (rare populations whose genomes diverge substantially from the reference are underserved).

The human reference genome was assembled primarily from a single individual of mixed European-African ancestry. Populations with greater divergence from this individual — such as sub-Saharan African populations with the highest genomic diversity — suffer disproportionately from reference bias. Pangenome graphs offer a path toward equitable genomics by embedding population-level diversity directly into the reference structure.

## Pangenome and Variation Graphs

### The Pangenome Concept

A **pangenome** is the entire collection of genomic sequences present across all individuals of a species (or a defined population). It captures not only the "core genome" shared by all individuals but also "variable genome" segments — insertions, deletions, inversions, and rearrangements — that differ among individuals. The concept originated in microbiology, where bacterial pangenomes can vary dramatically in gene content, and has now been extended to humans through the Human Pangenome Reference Consortium.

### Pangenome Graphs

A **pangenome graph** encodes the pangenome as a graph rather than a linear string. In the simplest formulation, the graph is a directed acyclic graph (DAG) in which nodes represent sequence segments and edges represent adjacencies. The reference path through the graph reproduces the linear reference genome, while alternative paths represent variant haplotypes. This is the **graph model for variants**: instead of annotating variants as deviations from a linear reference, the graph embeds all known variants as alternative paths, eliminating reference bias at the structural level.

### Variation Graphs

A **variation graph** generalizes the pangenome graph to include cycles (for inversions and complex rearrangements) and bidirected edges (to represent both strands of DNA). Formally, a variation graph is a bidirected sequence graph $G = (V, E, \sigma)$, where each node $v \in V$ carries a DNA sequence label $\sigma(v)$, and each edge $e \in E$ connects two node endpoints (left or right sides), allowing traversal in either orientation. Paths through the graph represent haplotypes, and the graph can encode SNPs, insertions, deletions, inversions, translocations, and complex rearrangements in a unified framework.

#### Diagram: Variation Graph for a Genomic Region

<iframe src="../../sims/variation-graph/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Variation Graph MicroSim Fullscreen](../../sims/variation-graph/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: variation-graph
Library: p5.js
Status: Specified

An interactive variation graph showing a small genomic region with SNPs, an insertion, and a deletion represented as alternative paths through the graph. Nodes are labeled with sequence segments and colored by type (reference = teal, SNP variant = orange, insertion = purple, deletion shown as a skip edge). Two haplotype paths are highlighted in different colors. A dropdown lets students switch between haplotypes to see how each traverses the graph differently. A text panel reconstructs the haplotype sequence as the student follows the path.
</details>

### The VG Toolkit

The **VG toolkit** (vg) is an open-source software suite for working with variation graphs. It provides tools for constructing variation graphs from a reference genome and a set of variants (in VCF format), indexing graphs for efficient **read mapping to graphs**, calling variants from graph-aligned reads, and simulating reads from graph haplotypes. The vg toolkit implements the succinct graph data structures needed to handle genome-scale variation graphs in memory — a human pangenome graph containing tens of millions of nodes can be loaded and queried on a standard workstation.

Key vg commands include:

- `vg construct` — builds a variation graph from a reference FASTA and VCF file.
- `vg index` — creates indexes (GCSA2, XG, GBWT) for graph mapping.
- `vg map` and `vg giraffe` — map reads to the graph; giraffe is optimized for genotyping.
- `vg call` — performs variant calling from graph-aligned reads.
- `vg pack` — computes read support across the graph.

Read mapping to a variation graph is conceptually similar to linear read mapping, but the aligner must consider all paths through the graph that are compatible with the read sequence. The vg giraffe mapper achieves near-linear-reference speed by using haplotype information encoded in a GBWT index to prune the search space.

## Genome Annotation and Gene Prediction

Once a genome is assembled, **genome annotation** identifies the functional elements encoded in the sequence — genes, regulatory regions, repeat elements, and non-coding RNAs. Annotation combines computational prediction with experimental evidence.

**Gene prediction** uses algorithms to identify protein-coding genes in assembled sequence. Ab initio predictors like Augustus and GeneMark use statistical models (hidden Markov models trained on known gene structures) to predict exon-intron boundaries. Evidence-based methods incorporate RNA-seq alignments, protein homology, and cross-species conservation to refine gene models. Modern annotation pipelines such as BRAKER and NCBI's RefSeq pipeline integrate both approaches, producing increasingly accurate and complete gene catalogs.

Annotation on a pangenome graph raises new challenges: genes may be present in some haplotypes but absent in others, and structural variants can disrupt or create gene fusions. Graph-aware annotation tools are an active area of development.

## Variant Calling

**Variant calling** is the process of identifying positions in a genome where an individual differs from the reference (or, in a graph context, determining which paths through the graph are supported by sequencing data). Variant calling is one of the most important downstream applications of both assembly and read mapping.

### SNP Calling

**SNP calling** identifies single nucleotide polymorphisms — positions where one base is substituted for another. In a linear-reference workflow, reads are mapped to the reference with tools like BWA-MEM, duplicates are marked, and a probabilistic caller such as GATK HaplotypeCaller or DeepVariant evaluates the evidence for each candidate variant. In a graph-based workflow, the vg toolkit maps reads to the variation graph and calls variants against the graph, reducing reference bias and improving sensitivity for variants near other variants.

### Structural Variant Calling

**Structural variant calling** detects larger genomic alterations: deletions, insertions, duplications, inversions, and translocations, typically defined as variants affecting 50 or more base pairs. Structural variants are harder to detect than SNPs because they may be larger than a single read, requiring split-read analysis, read-pair analysis, or assembly-based approaches. Long reads have dramatically improved structural variant detection, and pangenome graphs provide a natural framework for representing and genotyping structural variants because the graph already encodes alternative structural configurations as distinct paths.

!!! mascot-warning "Watch Out for Reference Bias in Variant Calling"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    When using a linear reference, reads carrying structural variants often fail to map or map with low quality, causing the variant to be missed entirely. This is especially problematic for insertions (sequence present in the sample but absent from the reference). Graph-based approaches address this by embedding known variants into the reference structure, ensuring that reads carrying those variants map correctly.

### Genotyping, Haplotypes, and Phasing

**Genotyping** determines the alleles present at a specific variant site in a given individual. For a diploid organism, each variant site has a genotype: homozygous reference (0/0), heterozygous (0/1), or homozygous alternate (1/1).

A **haplotype** is a set of alleles inherited together on a single chromosome. Because standard short-read sequencing produces reads from both chromosomes simultaneously, determining which alleles co-occur on the same chromosome — a process called **phasing** — requires additional information. Statistical phasing uses population-level linkage disequilibrium patterns (tools: Eagle, SHAPEIT). Read-backed phasing uses paired-end or long reads that span multiple variant sites to directly link alleles on the same molecule. Variation graphs naturally encode haplotype information: each path through the graph corresponds to a haplotype, and the GBWT (Graph BWT) index in the vg toolkit efficiently stores and queries millions of haplotype paths.

### Population Reference Graphs

A **population reference graph** extends the pangenome concept by incorporating allele frequency information from a specific population. Rather than treating all variant paths equally, a population reference graph weights paths by their frequency in the population of interest. This enables more accurate genotyping and imputation, particularly for rare variants. The PRG concept was pioneered for the major histocompatibility complex (MHC), one of the most polymorphic regions of the human genome, where a linear reference is particularly inadequate.

## Case Study 3: Pangenome Graph for Structural Variant Discovery

This chapter directly supports Case Study 3 from the course description. In this case study, students construct a pangenome variation graph from a set of human genome assemblies, map short reads to the graph, and identify structural variants missed by traditional linear reference approaches.

The workflow proceeds as follows:

1. **Graph construction**: Use `vg construct` or Minigraph-Cactus to build a pangenome graph from multiple genome assemblies (for example, assemblies from the Human Pangenome Reference Consortium).
2. **Indexing**: Build GCSA2, XG, and GBWT indexes with `vg index` to enable efficient read mapping.
3. **Read mapping**: Map Illumina short reads from a new sample to the pangenome graph using `vg giraffe`.
4. **Variant calling**: Use `vg call` and `vg pack` to identify variants supported by the mapped reads, including structural variants.
5. **Comparison**: Call variants on the same reads using a traditional linear-reference pipeline (BWA-MEM + GATK) and compare the two call sets. Quantify the number of structural variants detected only by the graph-based approach.

Students typically find that the graph-based pipeline detects 10-30% more structural variants, particularly insertions and complex rearrangements, with fewer false positives at known variant sites. This exercise demonstrates concretely why pangenome graphs are replacing linear references as the standard coordinate system for genomic analysis.

!!! mascot-thinking "What's the Link? Graphs Capture What Strings Cannot"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Think of a linear reference genome as a single path through a maze. If the path you are looking for takes a different route, you might never find it. A pangenome graph is the entire maze — every known route is already mapped. When you search for a new traveler's path, you are far more likely to find a match because the graph contains the structural context that a single string lacks.

## Putting It All Together

The concepts in this chapter form a pipeline that connects raw sequencing data to biological insight:

| Stage | Key Concepts | Graph Structure |
|-------|-------------|-----------------|
| Sequencing | Next-gen sequencing, short reads, long reads, sequencing depth, coverage | — |
| Assembly | K-mer, k-mer spectrum, de Bruijn graph, contig, scaffold | De Bruijn graph |
| Quality assessment | N50 metric, assembly quality metrics | — |
| Reference construction | Reference genome, pangenome, pangenome graph | Variation graph |
| Read mapping | Read mapping to graphs, VG toolkit | Variation graph |
| Annotation | Genome annotation, gene prediction | — |
| Variant discovery | Variant calling, SNP calling, structural variant calling | Graph model for variants |
| Population analysis | Genotyping, haplotype, phasing, population reference graph | Population reference graph |

Each row builds on the one above, and graph structures appear at every stage from assembly through population analysis. The de Bruijn graph converts raw reads into contigs; the variation graph converts contigs and variant catalogs into a pangenome reference; and the population reference graph adds frequency information for clinical and population-genetic applications.

!!! mascot-celebration "Great Work, Investigators!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You have traveled from raw sequencing reads all the way to population-scale pangenome graphs — assembling genomes with de Bruijn graphs, measuring quality with N50 and BUSCO, and discovering structural variants that linear references miss entirely. These graph-based methods are reshaping genomics right now, and you now have the conceptual foundation to work with them. Onward, explorers!

## Key Takeaways

1. **Genome assembly** reconstructs complete genome sequences from short overlapping reads, and the de Bruijn graph is the dominant data structure for this task.
2. **De Bruijn graphs** represent k-mer overlaps as directed edges between $(k-1)$-mer nodes; genome reconstruction corresponds to finding an Eulerian path through the graph.
3. **K-mers** and the **k-mer spectrum** provide the foundation for assembly and enable pre-assembly estimation of genome size, heterozygosity, and error content.
4. **Contigs** are unambiguous paths through the assembly graph; **scaffolds** order and orient contigs using paired-end, long-read, or Hi-C data.
5. **N50** measures assembly contiguity but must be paired with correctness metrics; comprehensive **assembly quality metrics** (QUAST, BUSCO) give a fuller picture.
6. **Sequencing technologies** — short reads (Illumina) for accuracy and throughput, long reads (PacBio, ONT) for contiguity — shape the assembly strategy.
7. The **Lander-Waterman model** relates sequencing depth to expected coverage: $P(\text{not covered}) = e^{-c}$.
8. A single **reference genome** introduces **reference bias**; alleles absent from the reference are systematically underrepresented in downstream analyses.
9. **Pangenome graphs** and **variation graphs** embed population-level diversity directly into the reference structure, eliminating reference bias.
10. The **VG toolkit** enables graph construction, read mapping to graphs, variant calling, and haplotype-aware analysis on genome-scale variation graphs.
11. **Variant calling** includes **SNP calling** and **structural variant calling**; graph-based methods detect variants — especially insertions and complex rearrangements — that linear methods miss.
12. **Genotyping**, **haplotype** reconstruction, and **phasing** determine which alleles co-occur on each chromosome; variation graphs and the GBWT index naturally encode haplotype structure.
13. **Population reference graphs** add allele frequency information to pangenome graphs, enabling more accurate genotyping and imputation.
14. **Genome annotation** and **gene prediction** identify functional elements in assembled sequence, with emerging methods adapting to graph-based references.

[See Annotated References](./references.md)
