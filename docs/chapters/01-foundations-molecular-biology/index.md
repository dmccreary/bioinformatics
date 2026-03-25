---
title: Foundations of Molecular Biology
description: Core molecular biology concepts underpinning bioinformatics — DNA, RNA, proteins, the central dogma, mutations, and epigenetics
generated_by: claude skill chapter-content-generator
date: 2026-03-24 21:40:06
version: 0.05
---

# Foundations of Molecular Biology

## Summary

Introduces bioinformatics as a discipline and covers the core molecular biology concepts that underpin all computational biology work, including DNA, RNA, protein structure, the central dogma, gene expression, mutations, and epigenetics.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Bioinformatics
2. Computational Biology
3. Central Dogma
4. DNA Structure
5. RNA Structure
6. Protein Structure
7. Amino Acids
8. Nucleotides
9. Codons
10. Gene
11. Genome
12. Transcription
13. Translation
14. Gene Expression
15. Sequence Data
16. Molecular Biology
17. Cell Biology Basics
18. Genetic Code
19. Open Reading Frame
20. Complementary Base Pairing
21. Chromosomes
22. Mutations
23. Single Nucleotide Polymorphism
24. Insertion and Deletion
25. Structural Variant
26. Copy Number Variation
27. Epigenetics
28. DNA Methylation
29. Histone Modification
30. Central Dogma Exceptions

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    Welcome to your first chapter in bioinformatics! Before we can analyze genomes, build protein interaction networks, or query biological knowledge graphs, we need a shared vocabulary — the molecules, processes, and data types that make life work at the molecular level. Let's connect the dots between biology and computation!

## What Is Bioinformatics?

Bioinformatics sits at the intersection of biology, computer science, and statistics. It is the application of computational methods to biological data — from storing and retrieving DNA sequences to predicting protein structures, modeling metabolic networks, and mining clinical datasets for drug targets. The field emerged in the 1960s and 1970s as protein and nucleic acid sequences accumulated faster than researchers could analyze them by hand, and it has grown exponentially alongside advances in sequencing technology.

Computational biology is a closely related term that is sometimes used interchangeably with bioinformatics. In practice, computational biology tends to emphasize the development of new algorithms and mathematical models for biological problems, while bioinformatics focuses more on building software tools and databases that make those methods accessible to working biologists. The distinction is not sharp — most practitioners do both — but you will encounter both terms in the literature and in job titles.

| Term | Emphasis | Typical Output |
|------|----------|----------------|
| Bioinformatics | Tools, databases, pipelines | BLAST, UniProt, Galaxy workflows |
| Computational Biology | Algorithms, models, theory | New alignment algorithms, network models |

Throughout this course, we use "bioinformatics" as the umbrella term. The unifying theme is that biological relationships — between sequences, proteins, genes, diseases, and drugs — are naturally represented as **graphs**, and graph-based methods often outperform purely tabular approaches for questions that involve connections and context.

## The Cell as a Computational Unit

Before diving into molecules, it helps to establish the cellular context. Every living organism is composed of one or more cells, and the cell is the fundamental unit of life. Cells maintain internal chemical environments, respond to signals, divide, and — in multicellular organisms — specialize into distinct tissues and organs.

The two major categories of cells are:

- **Prokaryotic cells** (bacteria, archaea) — no membrane-bound nucleus; DNA resides in a nucleoid region
- **Eukaryotic cells** (animals, plants, fungi, protists) — membrane-bound nucleus and organelles such as mitochondria and endoplasmic reticulum

For bioinformatics purposes, the most important cellular components are the **nucleus** (where DNA resides in eukaryotes), the **ribosome** (where proteins are synthesized), and the **cytoplasm** (where many metabolic reactions occur). The flow of genetic information from DNA to RNA to protein occurs across these compartments, and understanding that spatial organization is essential when we later model gene regulatory networks and signaling cascades as graphs.

#### Diagram: Prokaryotic vs Eukaryotic Cell Comparison

<iframe src="../../sims/prokaryote-vs-eukaryote/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Prokaryotic vs Eukaryotic Cell MicroSim Fullscreen](../../sims/prokaryote-vs-eukaryote/main.html)*

This interactive dual-panel diagram compares a rod-shaped prokaryotic cell (left) with a eukaryotic animal cell (right). Use **Explore mode** to hover over each numbered structure and learn its function and bioinformatics relevance, or switch to **Quiz mode** to test your knowledge by identifying structures. Shared structures (plasma membrane, ribosomes, cytoplasm) use matching colors across both cells.

## Molecular Biology: The Building Blocks

Molecular biology is the study of biological activity at the molecular level — particularly the structure, function, and interactions of nucleic acids and proteins. It provides the mechanistic explanations for how genes are expressed, how proteins fold, and how cells communicate. For bioinformatics, molecular biology supplies the data types we analyze: sequences of nucleotides, sequences of amino acids, and the three-dimensional coordinates of folded macromolecules.

### Nucleotides: The Alphabet of Nucleic Acids

Nucleotides are the monomeric building blocks of DNA and RNA. Each nucleotide consists of three components:

1. A **nitrogenous base** — either a purine (adenine, guanine) or a pyrimidine (cytosine, thymine in DNA, uracil in RNA)
2. A **five-carbon sugar** — deoxyribose in DNA, ribose in RNA
3. A **phosphate group** — which links successive nucleotides via phosphodiester bonds

The sequence of bases along a nucleic acid strand constitutes the **sequence data** that bioinformatics tools process. When we store a DNA sequence in FASTA format, we are recording a string over the four-letter alphabet `{A, C, G, T}`. RNA sequences use `{A, C, G, U}`.

### DNA Structure

Deoxyribonucleic acid (DNA) is the hereditary molecule in all cellular organisms. Its structure, famously described by Watson and Crick in 1953, consists of two antiparallel polynucleotide strands wound into a right-handed double helix. The strands are held together by hydrogen bonds between complementary bases on opposite strands.

**Complementary base pairing** follows strict rules:

- Adenine (A) pairs with Thymine (T) — two hydrogen bonds
- Guanine (G) pairs with Cytosine (C) — three hydrogen bonds

This complementarity is fundamental to nearly every process in molecular biology: DNA replication, transcription, hybridization-based assays, and the design of PCR primers. In bioinformatics, it means that knowing one strand of a DNA sequence automatically determines the other, and algorithms exploit this property extensively.

| Base | Complement | Hydrogen Bonds | Classification |
|------|------------|----------------|----------------|
| Adenine (A) | Thymine (T) | 2 | Purine |
| Thymine (T) | Adenine (A) | 2 | Pyrimidine |
| Guanine (G) | Cytosine (C) | 3 | Purine |
| Cytosine (C) | Guanine (G) | 3 | Pyrimidine |

!!! mascot-thinking "Key Insight"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli thinking">
    Complementary base pairing is the thread that connects almost everything in this course — from sequence alignment scoring to hybridization probes to the way graph databases store paired reads. If you remember one rule from this chapter, make it this one: A pairs with T, G pairs with C.

### RNA Structure

Ribonucleic acid (RNA) differs from DNA in three key ways: it uses ribose instead of deoxyribose, it substitutes uracil (U) for thymine (T), and it is typically single-stranded. However, RNA molecules frequently fold back on themselves to form complex secondary and tertiary structures through intramolecular base pairing (A-U and G-C pairs, plus non-canonical G-U wobble pairs).

The major functional classes of RNA include:

- **Messenger RNA (mRNA)** — carries the protein-coding sequence from DNA to ribosomes
- **Transfer RNA (tRNA)** — adaptor molecules that read codons and deliver amino acids
- **Ribosomal RNA (rRNA)** — structural and catalytic component of ribosomes
- **Non-coding RNA (ncRNA)** — microRNA, long non-coding RNA, and others that regulate gene expression without encoding proteins

Non-coding RNAs are an increasingly important class of molecules in bioinformatics. They participate in gene silencing, chromatin remodeling, and post-transcriptional regulation, and they are often studied using network approaches that model RNA-target interactions as directed graphs.

### Amino Acids and Protein Structure

Proteins are polymers of amino acids linked by peptide bonds. There are 20 standard amino acids, each with a unique side chain (R group) that determines its chemical properties — hydrophobic, hydrophilic, charged, or special (like cysteine's ability to form disulfide bonds or proline's rigid ring).

Protein structure is organized into four hierarchical levels:

1. **Primary structure** — the linear amino acid sequence, written as a string over a 20-letter alphabet
2. **Secondary structure** — local folding patterns, primarily **alpha helices** and **beta sheets**, stabilized by hydrogen bonds along the backbone
3. **Tertiary structure** — the overall 3D fold of a single polypeptide chain, determined by hydrophobic interactions, disulfide bonds, ionic interactions, and van der Waals forces
4. **Quaternary structure** — the arrangement of multiple polypeptide subunits into a functional complex

In bioinformatics, primary structure is stored as sequence data (FASTA format), while tertiary structure is recorded as 3D atomic coordinates in PDB format. Tools like AlphaFold have revolutionized structure prediction by achieving near-experimental accuracy from sequence alone.

#### Diagram: Protein Structure Hierarchy

<iframe src="../../sims/protein-structure-levels/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Protein Structure Hierarchy</summary>
Type: infographic
**sim-id:** protein-structure-levels<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Remember (L1)
**Bloom Verb:** Identify, describe

**Learning Objective:** Students will identify and describe the four levels of protein structure (primary, secondary, tertiary, quaternary) and recognize the types of bonds and forces that stabilize each level.

**Visual Elements:**
- Four panels arranged left to right (or wrapping on narrow screens)
- Panel 1 — Primary: a linear chain of colored circles representing amino acids with single-letter codes
- Panel 2 — Secondary: a ribbon diagram showing an alpha helix and a beta sheet with hydrogen bonds indicated by dashed lines
- Panel 3 — Tertiary: a compact 3D-like fold of the entire chain with hydrophobic core shaded
- Panel 4 — Quaternary: two or more folded subunits assembled together

**Interactive Controls:**
- Click on any panel to expand it and see a detailed description, stabilizing forces, and bioinformatics data format (e.g., "Primary → FASTA", "Tertiary → PDB")
- Hover over bond types (hydrogen bonds, disulfide bridges, hydrophobic interactions) to see tooltip explanations

**Data Visibility Requirements:**
- Default: all four panels visible with level name and a key visual
- Expanded: panel fills display area, shows labeled diagram with force annotations and 2-3 sentence description

**Instructional Rationale:** A visual hierarchy with interactive drill-down supports the Remember/identify objective by giving students a spatial mental model of the four levels that they can revisit and explore at their own pace.

**Canvas:** Responsive, minimum 700px wide. Aliceblue background.
</details>

## The Central Dogma of Molecular Biology

The term **central dogma** was coined by Francis Crick in 1958 to describe the directional flow of genetic information in biological systems:

$$
\text{DNA} \xrightarrow{\text{transcription}} \text{RNA} \xrightarrow{\text{translation}} \text{Protein}
$$

Crick later admitted that he had misunderstood the word "dogma" — he intended it to mean a central principle or axiom, not an unquestionable religious belief. The name stuck, and you will encounter it throughout the molecular biology literature. In this course description, we use the phrase "canonical data types" to sidestep the confusing connotation, but you should understand the term since it appears in virtually every textbook and research paper.

!!! mascot-tip "Olli's Tip"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli's tip">
    When you see "central dogma" in a paper, mentally translate it to "the standard information flow: DNA → RNA → Protein." The word "dogma" is a historical accident, not a statement about scientific certainty.

The central dogma defines the core data types in bioinformatics:

- **DNA sequences** — the hereditary blueprint, stored in genome databases
- **RNA sequences** — the intermediate message, measured by RNA-seq
- **Protein sequences** — the functional output, cataloged in UniProt

### Transcription

Transcription is the process of copying a gene's DNA sequence into a complementary messenger RNA (mRNA) molecule. The enzyme **RNA polymerase** binds to a **promoter** region upstream of the gene, unwinds the double helix, and synthesizes the mRNA strand in the 5′ → 3′ direction using the template DNA strand. In eukaryotes, the primary transcript (pre-mRNA) undergoes processing — 5′ capping, 3′ polyadenylation, and splicing to remove introns — before the mature mRNA is exported from the nucleus to the cytoplasm.

From a bioinformatics perspective, transcription is the process that generates the data measured by RNA-seq experiments. The abundance of each mRNA species reflects gene expression levels, and changes in expression between conditions (e.g., healthy vs. diseased tissue) are the foundation of differential expression analysis.

### The Genetic Code and Codons

The genetic code maps triplets of nucleotides (**codons**) to amino acids. With four possible bases at each of three positions, there are $4^3 = 64$ possible codons. Of these, 61 encode the 20 standard amino acids (making the code **degenerate** — most amino acids are specified by more than one codon), and 3 are **stop codons** (UAA, UAG, UGA) that signal the end of translation.

Key properties of the genetic code:

- **Universal** — nearly all organisms use the same codon table (with minor exceptions in mitochondria and some organisms)
- **Degenerate** — multiple codons can encode the same amino acid
- **Non-overlapping** — each nucleotide belongs to exactly one codon in a given reading frame
- **Unambiguous** — each codon specifies exactly one amino acid

An **open reading frame (ORF)** is a stretch of DNA that begins with a start codon (ATG, encoding methionine) and ends with a stop codon, with no internal stop codons. ORF finding is one of the earliest and most fundamental bioinformatics tasks — it identifies potential protein-coding regions in a newly sequenced genome.

#### Diagram: Codon Table Explorer

<iframe src="../../sims/codon-table-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Codon Table Explorer</summary>
Type: microsim
**sim-id:** codon-table-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Use, demonstrate

**Learning Objective:** Students will use the codon table to translate a short mRNA sequence into an amino acid sequence, demonstrating understanding of the genetic code's degeneracy and the role of start and stop codons.

**Visual Elements:**
- A circular or grid-format codon table showing all 64 codons mapped to their amino acids, color-coded by amino acid property (hydrophobic = blue, polar = green, charged = red, special = yellow)
- An input area where the student types or selects an mRNA sequence (up to 30 nucleotides)
- A translation output area showing the resulting amino acid chain with codon-to-amino-acid mapping highlighted
- Start codons (AUG) highlighted in green, stop codons in red

**Interactive Controls:**
- Text input: type an mRNA sequence (validated to only accept A, U, G, C)
- Button: "Translate" — performs codon-by-codon translation
- Button: "Random Sequence" — generates a random mRNA with at least one start and one stop codon
- Toggle: "Show Reading Frames" — displays all three forward reading frames with ORFs highlighted
- Hover over any cell in the codon table to see: codon, amino acid name, three-letter code, one-letter code, and property

**Data Visibility Requirements:**
- Stage 1: Show the raw mRNA sequence with nucleotides in distinct colors
- Stage 2: Show the sequence split into triplets (codons) with visual grouping
- Stage 3: Show each codon mapped to its amino acid via the table, with connecting lines
- Stage 4: Show the resulting polypeptide chain with amino acid properties color-coded

**Instructional Rationale:** Hands-on translation of sequences supports the Apply/use objective by giving students direct practice with the codon table rather than passive memorization. The reading frame toggle extends to ORF identification, connecting to genome annotation tasks later in the course.

**Canvas:** Responsive, minimum 700px wide. Aliceblue background.
</details>

### Translation

Translation is the process by which ribosomes decode mRNA into a polypeptide chain. The ribosome moves along the mRNA in the 5′ → 3′ direction, reading one codon at a time. Transfer RNA (tRNA) molecules, each carrying a specific amino acid and bearing a complementary **anticodon**, base-pair with the mRNA codon in the ribosome's active site. The ribosome catalyzes peptide bond formation between successive amino acids, building the polypeptide from its N-terminus to its C-terminus.

Translation proceeds in three phases:

1. **Initiation** — the ribosome assembles at the start codon (AUG) with the initiator tRNA carrying methionine
2. **Elongation** — successive tRNAs deliver amino acids; the ribosome translocates one codon at a time
3. **Termination** — a release factor recognizes the stop codon, and the completed polypeptide is released

### Gene Expression

Gene expression is the overarching process by which information encoded in a gene is used to produce a functional gene product — usually a protein, but sometimes a functional RNA. Expression is regulated at multiple levels:

- **Transcriptional regulation** — transcription factors, enhancers, silencers, and chromatin state determine whether and how much mRNA is produced
- **Post-transcriptional regulation** — mRNA stability, alternative splicing, and microRNA-mediated degradation modulate mRNA availability
- **Translational regulation** — ribosome availability, initiation factors, and mRNA secondary structure affect translation efficiency
- **Post-translational regulation** — protein modifications, folding, localization, and degradation control functional protein levels

In bioinformatics, gene expression data is typically captured as read counts from RNA-seq experiments and normalized to enable comparison across samples. The resulting expression matrices are the starting point for co-expression network analysis and regulatory network inference — topics we will explore in depth in later chapters.

#### Diagram: Central Dogma Information Flow

<iframe src="../../sims/central-dogma-flow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Central Dogma Information Flow</summary>
Type: infographic
**sim-id:** central-dogma-flow<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Explain, summarize

**Learning Objective:** Students will explain the flow of genetic information from DNA through RNA to protein, identifying the key molecular machinery and regulation points at each step.

**Visual Elements:**
- A horizontal flow diagram with three main stages: DNA → RNA → Protein
- Each stage represented as a distinct panel with the molecule depicted schematically (double helix, single strand, folded chain)
- Arrows between stages labeled "Transcription" and "Translation"
- Key molecular players shown at each transition: RNA polymerase at the transcription arrow, ribosome at the translation arrow
- Regulation points marked with small control icons at each level (transcriptional, post-transcriptional, translational, post-translational)

**Interactive Controls:**
- Step-through mode: "Next" / "Previous" buttons to walk through the process one stage at a time
- At each stage, an info panel below shows: (1) what molecule is being produced, (2) what machinery is involved, (3) where in the cell it happens, (4) the bioinformatics data type that captures it (e.g., "RNA-seq measures mRNA abundance")
- Hover over regulation points to see a tooltip describing that regulatory mechanism

**Data Visibility Requirements:**
- Stage 1: DNA in nucleus, highlight the gene region with promoter labeled
- Stage 2: Transcription in progress — RNA polymerase on template strand, growing mRNA
- Stage 3: Mature mRNA after processing (cap, poly-A tail, introns removed)
- Stage 4: Translation at ribosome — codons read, amino acids assembled
- Stage 5: Folded protein with annotation of its function

**Instructional Rationale:** A step-through infographic with concrete molecular details at each stage supports the Understand/explain objective by requiring students to trace the full information flow rather than just memorizing "DNA → RNA → Protein." Connecting each step to its bioinformatics data type reinforces the course's computational focus.

**Canvas:** Responsive, minimum 700px wide. Aliceblue background.
</details>

## Genes, Genomes, and Chromosomes

A **gene** is a segment of DNA that encodes a functional product — typically a protein, but also functional RNAs. In molecular terms, a gene includes the coding sequence (exons), non-coding intervening sequences (introns, in eukaryotes), and regulatory regions (promoter, enhancers, UTRs).

The **genome** is the complete set of genetic material in an organism. Genome sizes vary enormously:

| Organism | Approximate Genome Size | Estimated Gene Count |
|----------|------------------------|---------------------|
| *E. coli* (bacterium) | 4.6 Mb | ~4,300 |
| *S. cerevisiae* (yeast) | 12 Mb | ~6,000 |
| *D. melanogaster* (fruit fly) | 180 Mb | ~14,000 |
| *H. sapiens* (human) | 3,200 Mb | ~20,000 |
| *T. aestivum* (wheat) | 17,000 Mb | ~107,000 |

In eukaryotes, the genome is organized into **chromosomes** — linear DNA molecules packaged with histone proteins into a compact structure called chromatin. Humans have 23 pairs of chromosomes (22 autosomes plus one pair of sex chromosomes). During cell division, chromosomes condense and become visible under a microscope. Chromosome number, structure, and rearrangements are important in clinical genetics and cancer genomics.

**Sequence data** in bioinformatics refers to the digitized representation of nucleotide or amino acid sequences. Sequencing technologies — from Sanger sequencing in the 1970s through next-generation short-read platforms (Illumina) to modern long-read technologies (PacBio, Oxford Nanopore) — generate the raw sequence data that populates biological databases. The volume of sequence data has grown faster than Moore's Law, making efficient storage, retrieval, and analysis a core bioinformatics challenge.

## Mutations and Genetic Variation

Mutations are heritable changes in the DNA sequence. They are the raw material for evolution and the molecular basis of genetic diversity and disease. From a bioinformatics perspective, mutations are the "signals" we detect through variant calling pipelines and represent as nodes and edges in variation graphs and disease knowledge graphs.

### Types of Mutations

Mutations range in scale from single-nucleotide changes to large chromosomal rearrangements:

**Single Nucleotide Polymorphism (SNP)** — a change in a single base pair. SNPs are the most common type of genetic variation in human populations, occurring roughly once every 1,000 base pairs. They may be synonymous (no amino acid change due to codon degeneracy), missense (amino acid change), or nonsense (premature stop codon).

**Insertion and Deletion (Indel)** — the addition or removal of one or more nucleotides. Small indels in coding regions that are not multiples of three cause **frameshift mutations**, which alter the reading frame downstream and typically produce nonfunctional proteins. Indels are the second most common variant type after SNPs.

**Structural Variants (SVs)** — large-scale genomic alterations including:

- **Deletions** — loss of a segment (>50 bp)
- **Duplications** — copying of a segment
- **Inversions** — reversal of a segment's orientation
- **Translocations** — movement of a segment to a different chromosome

**Copy Number Variation (CNV)** — a specific type of structural variant where the number of copies of a particular genomic region differs between individuals. CNVs can encompass entire genes and are implicated in both normal phenotypic variation and disease susceptibility.

| Variant Type | Scale | Example | Detection Method |
|-------------|-------|---------|-----------------|
| SNP | 1 bp | A → G at position 1,234 | Short-read sequencing, arrays |
| Indel | 1–49 bp | Deletion of 3 bp in exon 4 | Short-read sequencing |
| Structural Variant | ≥50 bp | 5 kb inversion on chr 7 | Long-read sequencing, SV callers |
| Copy Number Variation | ≥1 kb | Duplication of gene region | Array CGH, read depth analysis |

!!! mascot-warning "Common Mistake"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns">
    Don't confuse **mutation** with **disease**. Most mutations are neutral — they have no effect on the organism. Only a small fraction are pathogenic (harmful), and some are even beneficial. In bioinformatics, we analyze all variants, not just disease-causing ones.

#### Diagram: Mutation Types and Their Effects on Protein Sequence

<iframe src="../../sims/mutation-types-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Mutation Types and Their Effects on Protein Sequence</summary>
Type: microsim
**sim-id:** mutation-types-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Differentiate, examine

**Learning Objective:** Students will differentiate between SNPs, insertions, deletions, and frameshift mutations by observing how each type of change in a DNA sequence alters the resulting mRNA codons and protein sequence.

**Visual Elements:**
- A reference DNA sequence (top row, ~30 nucleotides) with codon boundaries marked
- A mutated DNA sequence (second row) with the mutation highlighted in red
- The mRNA sequence derived from each (third and fourth rows)
- The amino acid sequence from each (fifth and sixth rows) with changes highlighted
- Visual diff markers showing where the protein sequence diverges

**Interactive Controls:**
- Dropdown: mutation type (SNP — synonymous, SNP — missense, SNP — nonsense, 1-bp insertion, 1-bp deletion, 3-bp deletion)
- Button: "Apply Mutation" — introduces the selected mutation at a marked position in the reference
- Button: "Reset" — returns to the reference sequence
- Slider: position along the sequence where the mutation is introduced
- Each row is color-coded: reference in blue, mutant in red, unchanged positions in gray

**Data Visibility Requirements:**
- Stage 1: Reference DNA → mRNA → protein shown with codon groupings
- Stage 2: Mutation introduced; changed nucleotide(s) highlighted in red
- Stage 3: New codon groupings shown (critical for frameshifts)
- Stage 4: Translated protein shown with changed amino acids highlighted; frameshift = all downstream amino acids changed

**Instructional Rationale:** Allowing students to apply different mutation types at different positions and immediately see the downstream effect on protein sequence supports the Analyze/differentiate objective. Students discover for themselves that a 1-bp indel is far more disruptive than a synonymous SNP, building intuition for variant prioritization in later chapters.

**Canvas:** Responsive, minimum 700px wide. Aliceblue background.
</details>

## Epigenetics: Beyond the DNA Sequence

Epigenetics refers to heritable changes in gene expression that do not involve alterations to the underlying DNA sequence. Epigenetic mechanisms add a layer of regulation above the genetic code, controlling which genes are active in a given cell type or condition. Two major epigenetic mechanisms are especially relevant to bioinformatics:

### DNA Methylation

DNA methylation involves the addition of a methyl group ($\ce{-CH3}$) to the 5-carbon position of cytosine, typically at CpG dinucleotides (sites where cytosine is followed by guanine). In mammals, methylation of CpG islands in promoter regions is generally associated with gene silencing. Genome-wide DNA methylation patterns are measured by bisulfite sequencing or methylation arrays, producing large datasets amenable to computational analysis.

### Histone Modification

DNA in eukaryotic cells is wrapped around histone protein octamers to form nucleosomes — the fundamental units of chromatin. The N-terminal tails of histones can be chemically modified by:

- **Acetylation** (e.g., H3K27ac) — generally associated with active transcription
- **Methylation** (e.g., H3K4me3 for activation, H3K27me3 for repression)
- **Phosphorylation**, **ubiquitination**, and other modifications

These modifications alter chromatin accessibility and recruit regulatory proteins, effectively switching genes on or off. The combinatorial pattern of histone modifications has been termed the "histone code." In bioinformatics, ChIP-seq experiments map histone modifications across the genome, and the resulting datasets are analyzed as signal tracks or integrated into epigenomic network models.

!!! mascot-thinking "Key Insight"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli thinking">
    Epigenetics explains a puzzle: every cell in your body has the same DNA, yet a neuron looks and behaves completely differently from a liver cell. The difference is which genes are turned on or off — and that's controlled by epigenetic marks, not sequence changes. This has profound implications for disease: cancer, for example, often involves both genetic mutations and epigenetic dysregulation.

## Exceptions to the Central Dogma

While DNA → RNA → Protein is the dominant information flow, several important exceptions exist:

- **Reverse transcription** — retroviruses (e.g., HIV) use the enzyme reverse transcriptase to synthesize DNA from an RNA template. This violates the "DNA → RNA" directionality. Reverse transcriptase is also used in the lab for RT-PCR and RNA-seq library preparation.
- **RNA replication** — some RNA viruses replicate their genomes using RNA-dependent RNA polymerase, bypassing DNA entirely.
- **Prions** — misfolded proteins that propagate by inducing conformational changes in normal versions of the same protein. This represents information flow at the protein level, independent of nucleic acids.
- **Non-coding RNA function** — many RNA molecules are functional end products (tRNA, rRNA, miRNA, lncRNA) that never get translated into protein. The central dogma's "RNA → Protein" step is skipped.

These exceptions are not merely biological curiosities — they have direct bioinformatics implications. Reverse transcription is the basis for cDNA library construction. RNA viruses require specialized alignment and phylogenetic tools. And the growing catalog of functional non-coding RNAs has spawned dedicated databases (e.g., NONCODE, miRBase) and analysis pipelines.

#### Diagram: Central Dogma and Its Exceptions

<iframe src="../../sims/central-dogma-exceptions/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Central Dogma and Its Exceptions</summary>
Type: diagram
**sim-id:** central-dogma-exceptions<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Explain, classify

**Learning Objective:** Students will explain the standard flow of genetic information and classify the known exceptions (reverse transcription, RNA replication, prions, functional ncRNAs) by identifying which step of the central dogma each exception modifies or bypasses.

**Visual Elements:**
- Central triangle/flow diagram with DNA, RNA, and Protein at the three main positions
- Standard arrows: DNA → RNA (transcription), RNA → Protein (translation), DNA → DNA (replication)
- Exception arrows in dashed style: RNA → DNA (reverse transcription, red), RNA → RNA (RNA replication, orange), Protein → Protein (prion propagation, purple), RNA → ∅ (functional ncRNA, teal, arrow ending without reaching Protein)
- Each exception arrow labeled with the biological example (e.g., "HIV reverse transcriptase")

**Interactive Controls:**
- Default view shows only the standard arrows
- Button: "Show Exceptions" — reveals all exception arrows with animation
- Click on any arrow (standard or exception) to see an info panel with: process name, molecular machinery, biological example, and bioinformatics relevance
- Toggle: "Standard Only" / "All Pathways" to switch between views

**Data Visibility Requirements:**
- Default: three standard arrows visible with process names
- Exception mode: four additional arrows appear, each with a distinct color and label
- Info panel: 3-4 sentences per pathway explaining the mechanism and its significance

**Instructional Rationale:** Starting with the standard model and then revealing exceptions helps students build a correct baseline before learning about departures. Clicking individual arrows to see details supports the Understand/classify objective by requiring active categorization rather than passive reading.

**Canvas:** Responsive, minimum 700px wide. Aliceblue background.
</details>

## Connecting Molecular Biology to Graphs

Every concept in this chapter has a graph representation waiting in later chapters. Here is a preview of how the molecular foundations you have just learned map to graph-based approaches:

| Molecular Concept | Graph Representation | Course Chapter |
|-------------------|---------------------|----------------|
| Protein-protein interactions | PPI networks (nodes = proteins, edges = interactions) | Ch. 9 |
| Gene regulation | Regulatory networks (directed edges = regulatory relationships) | Ch. 11 |
| Metabolic pathways | Bipartite graphs (metabolites and reactions as node types) | Ch. 12 |
| Mutations and disease | Disease knowledge graphs (gene-variant-disease edges) | Ch. 13 |
| Evolutionary relationships | Phylogenetic trees and networks (DAGs, reticulate graphs) | Ch. 7 |
| Sequence similarity | Sequence similarity networks (edges weighted by alignment score) | Ch. 6 |

This table is your roadmap for the course. The molecular biology vocabulary you have built in this chapter — genes, proteins, mutations, expression, epigenetics — will recur in every subsequent chapter as the "node labels" and "edge properties" in biological graphs.

!!! mascot-celebration "Excellent Work!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You've covered the molecular foundations that the entire course builds upon. From nucleotides to epigenetics, these are the building blocks you'll see modeled as nodes, edges, and properties in the graph databases and networks ahead. Onward to biological databases in Chapter 2!

## Key Takeaways

1. **Bioinformatics** applies computational methods to biological data; **computational biology** emphasizes algorithm and model development. Both fields are deeply intertwined.
2. **Nucleotides** (A, C, G, T/U) are the monomers of DNA and RNA. **Complementary base pairing** (A-T, G-C) is the fundamental rule connecting the two strands of the double helix.
3. The **central dogma** describes the flow DNA → RNA → Protein. The term is a historical misnomer by Crick — treat it as "the standard information flow," not a religious principle.
4. **Genes** are encoded in the **genome**, organized on **chromosomes**, and expressed through **transcription** and **translation** using the **genetic code** (61 sense codons + 3 stop codons).
5. **Mutations** range from single nucleotide polymorphisms (SNPs) to large structural variants. Most are neutral; a few cause disease.
6. **Epigenetics** — including **DNA methylation** and **histone modifications** — controls gene expression without changing the DNA sequence.
7. **Exceptions** to the central dogma (reverse transcription, RNA replication, prions, functional ncRNAs) are biologically important and drive specialized bioinformatics tools.
8. Every molecular concept in this chapter maps to a graph-based representation that you will explore in later chapters.
