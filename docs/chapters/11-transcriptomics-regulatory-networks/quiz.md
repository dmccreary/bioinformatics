# Quiz: Transcriptomics and Gene Regulatory Networks

Test your understanding of RNA-seq analysis, differential expression, co-expression networks, regulatory network inference, and single-cell transcriptomics.

---

#### 1. Why do DESeq2 and edgeR use the negative binomial distribution rather than a normal distribution for modeling RNA-seq counts?

<div class="upper-alpha" markdown>
1. RNA-seq counts are continuous and symmetric, which the negative binomial handles better
2. The negative binomial distribution is computationally faster than the normal distribution
3. RNA-seq counts are discrete with mean-variance coupling, where higher-expressed genes have higher variance, which the negative binomial captures appropriately
4. The normal distribution can only model data with exactly three replicates
</div>

??? question "Show Answer"
    The correct answer is **C**. RNA-seq read counts are discrete (not continuous), skewed, and exhibit mean-variance coupling where genes with higher expression show proportionally higher variance. The negative binomial distribution models this relationship with a gene-specific dispersion parameter. Both DESeq2 and edgeR use empirical Bayes shrinkage to stabilize dispersion estimates when replicates are few. Using a normal distribution or t-test would violate distributional assumptions and inflate false positive rates.

    **Concept Tested:** Statistical Testing for DE

---

#### 2. What is the false discovery rate (FDR) and why is it important in differential expression analysis?

<div class="upper-alpha" markdown>
1. FDR is the probability that a single gene is a false positive; it replaces the p-value entirely
2. FDR controls the expected proportion of false positives among all genes declared significant, accounting for the multiple testing burden of testing thousands of genes
3. FDR measures the fold change threshold required for a gene to be considered significant
4. FDR is only relevant when analyzing fewer than 100 genes
</div>

??? question "Show Answer"
    The correct answer is **B**. When testing thousands of genes simultaneously, using a standard p-value threshold (e.g., 0.05) would produce hundreds of false positives by chance alone. The false discovery rate controls the expected proportion of false discoveries among all rejected hypotheses. The Benjamini-Hochberg procedure adjusts p-values to produce FDR-corrected values (often called q-values or adjusted p-values). An FDR threshold of 0.05 means that no more than 5% of genes called significant are expected to be false positives.

    **Concept Tested:** False Discovery Rate

---

#### 3. What does WGCNA identify in transcriptomic data?

<div class="upper-alpha" markdown>
1. Individual differentially expressed genes between two conditions
2. Modules of highly co-expressed genes using weighted correlation networks, often corresponding to shared biological functions
3. The three-dimensional structure of RNA molecules
4. Single nucleotide polymorphisms in transcribed regions
</div>

??? question "Show Answer"
    The correct answer is **B**. WGCNA (Weighted Gene Co-expression Network Analysis) builds a co-expression network where genes are nodes and edge weights reflect pairwise expression correlation across samples. It then identifies modules — clusters of genes with highly correlated expression patterns — using hierarchical clustering. These modules often correspond to shared biological pathways or functions, and module eigengenes can be correlated with clinical traits to identify disease-associated gene programs.

    **Concept Tested:** WGCNA and Co-Expression Network

---

#### 4. How does single-cell RNA-seq (scRNA-seq) differ from bulk RNA-seq?

<div class="upper-alpha" markdown>
1. scRNA-seq measures only non-coding RNAs while bulk RNA-seq measures mRNA
2. scRNA-seq profiles gene expression in individual cells, revealing cellular heterogeneity that bulk RNA-seq masks by averaging across thousands of cells
3. scRNA-seq requires a reference genome while bulk RNA-seq does not
4. scRNA-seq produces longer reads than bulk RNA-seq
</div>

??? question "Show Answer"
    The correct answer is **B**. Bulk RNA-seq measures the average expression across thousands or millions of cells in a sample, masking cell-to-cell variation. Single-cell RNA-seq profiles transcriptomes of individual cells, enabling discovery of rare cell types, mapping of cell state transitions, and construction of cell-type-specific regulatory networks. The trade-off is that scRNA-seq data is sparser (more zeros per gene due to dropout) and requires specialized computational methods for normalization and analysis.

    **Concept Tested:** Single-Cell RNA-Seq

---

#### 5. In a gene regulatory network, what do nodes and directed edges represent?

<div class="upper-alpha" markdown>
1. Nodes represent metabolites and edges represent enzymatic reactions
2. Nodes represent genes or transcription factors and directed edges represent regulatory relationships such as activation or repression
3. Nodes represent chromosomes and edges represent physical linkage
4. Nodes represent experimental samples and edges represent statistical correlations
</div>

??? question "Show Answer"
    The correct answer is **B**. In a gene regulatory network (GRN), nodes represent genes or transcription factors and directed edges represent regulatory relationships — indicating that one gene's product regulates the expression of another gene. Edges can represent activation (positive regulation) or repression (negative regulation). GRNs are inherently directed graphs because regulation flows from transcription factor to target gene. Inference methods like ARACNE and GENIE3 reconstruct these networks from expression data.

    **Concept Tested:** Gene Regulatory Network and Graph Model for Regulation

---

#### 6. What is the purpose of the read alignment step in an RNA-seq pipeline, and why must it be splice-aware?

<div class="upper-alpha" markdown>
1. Read alignment converts RNA sequences to DNA sequences; splice awareness corrects sequencing errors
2. Read alignment maps reads to a reference genome; splice-aware aligners handle reads that span exon-exon junctions where introns have been removed
3. Read alignment removes duplicate reads; splice awareness identifies alternative promoters
4. Read alignment counts the number of reads per gene; splice awareness normalizes for gene length
</div>

??? question "Show Answer"
    The correct answer is **B**. Read alignment maps trimmed RNA-seq reads back to the reference genome coordinates. Because RNA-seq reads come from mature mRNA where introns have been spliced out, many reads span exon-exon junctions and cannot be mapped contiguously to the genome. Splice-aware aligners like STAR and HISAT2 can identify these junction-spanning reads and map them correctly across the intron gap, which is essential for accurate transcript quantification.

    **Concept Tested:** Read Alignment

---

#### 7. What is a log2 fold change of -2 in differential expression analysis?

<div class="upper-alpha" markdown>
1. The gene is expressed at twice the level in the treatment group
2. The gene is expressed at four times the level in the treatment group
3. The gene is expressed at one-quarter the level in the treatment group compared to control
4. The gene shows no change in expression between conditions
</div>

??? question "Show Answer"
    The correct answer is **C**. A log2 fold change of -2 means $2^{-2} = 0.25$, indicating the gene is expressed at one-quarter (25%) of its control level in the treatment group — a four-fold down-regulation. Log2 fold change treats up- and down-regulation symmetrically: +1 means two-fold up, -1 means two-fold down, +2 means four-fold up, -2 means four-fold down. This symmetry makes it the standard metric displayed on volcano plots and MA plots.

    **Concept Tested:** Fold Change

---

#### 8. How does ARACNE infer gene regulatory relationships from expression data?

<div class="upper-alpha" markdown>
1. By measuring physical binding between proteins using mass spectrometry
2. By computing mutual information between gene expression profiles and applying the data processing inequality to remove indirect interactions
3. By aligning gene sequences to find regulatory motifs
4. By comparing gene expression between exactly two experimental conditions
</div>

??? question "Show Answer"
    The correct answer is **B**. ARACNE (Algorithm for the Reconstruction of Accurate Cellular Networks) computes mutual information between all pairs of genes based on their expression profiles across multiple samples. It then applies the data processing inequality (DPI) to distinguish direct regulatory interactions from indirect ones: if gene A regulates gene B, and B regulates C, the mutual information between A and C will be the weakest of the three pairs, and the A-C edge is pruned. This produces a sparser, more accurate network.

    **Concept Tested:** ARACNE and Mutual Information

---

#### 9. What is trajectory analysis in single-cell transcriptomics?

<div class="upper-alpha" markdown>
1. Tracking the physical movement of cells under a microscope
2. Ordering single cells along a pseudotime axis to reconstruct continuous biological processes like differentiation, revealing how gene expression changes progressively
3. Aligning RNA-seq reads to a reference trajectory stored in a database
4. Measuring the speed at which RNA polymerase transcribes genes
</div>

??? question "Show Answer"
    The correct answer is **B**. Trajectory analysis (also called pseudotime analysis) computationally orders individual cells along a continuous path representing a biological process such as cell differentiation, immune activation, or disease progression. Even though all cells are measured at a single time point, cells at different stages of the process are captured simultaneously. Algorithms like Monocle and Slingshot reconstruct the ordering, enabling analysis of how gene expression changes progressively along the trajectory.

    **Concept Tested:** Trajectory Analysis

---

#### 10. What is an operon, and in which organisms is it primarily found?

<div class="upper-alpha" markdown>
1. An operon is a cluster of co-regulated genes transcribed as a single mRNA unit, found primarily in prokaryotes
2. An operon is a type of non-coding RNA found in eukaryotic genomes
3. An operon is a protein complex that regulates transcription in all organisms
4. An operon is an alternative splicing pattern unique to plant genomes
</div>

??? question "Show Answer"
    The correct answer is **A**. An operon is a cluster of functionally related genes that share a single promoter and are transcribed together as one polycistronic mRNA molecule. Operons are a hallmark of prokaryotic gene regulation, enabling coordinated expression of genes in the same metabolic pathway. The classic example is the *lac* operon in *E. coli*, which coordinates expression of genes for lactose metabolism. Operons are rare in eukaryotes, where each gene typically has its own promoter.

    **Concept Tested:** Operon
