# Course Description for Biometrics

**Title:** Bioinformatics

**Duration:** 14 weeks
**Prerequisites:** Introductory biology (molecular biology or genetics), one semester of programming (Python preferred), basic statistics
**Target Audience:** Upper-division undergraduates, graduate students, and working professionals seeking to expand their bioinformatics skill set
**Modality:** In-person or hybrid with hands-on lab sessions

## Course Overview

This course provides a comprehensive introduction to bioinformatics with a distinctive emphasis on graph-based representations of biological data. Students learn how biological relationships — protein interactions, metabolic pathways, gene regulatory networks, evolutionary trees, and knowledge graphs — are naturally modeled as graphs, and how graph algorithms and databases unlock insights that tabular or sequence-only approaches miss.

The course moves from foundational sequence analysis through structural and systems biology, arriving at modern graph-powered approaches to drug discovery, precision medicine, and multi-omics integration. Each module pairs biological concepts with hands-on computational labs using Python, NetworkX, Neo4j, and visualization tools. A semester-long capstone project gives students experience solving a real bioinformatics problem end-to-end.

## Topics Covered

### Module 1 — Foundations (Weeks 1–3)

- **Week 1: Introduction to Bioinformatics and Biological Databases**
    - Canonical data types in bioinformatics (sequences, structures, interactions, ontologies)
    - Major databases: NCBI, UniProt, PDB, Ensembl, KEGG, Reactome
    - Data formats: FASTA, FASTQ, GenBank, PDB, GFF3, OWL

- **Week 2: Introduction to Graph Theory for Biology**
    - Nodes, edges, directed vs. undirected graphs, weighted graphs, bipartite graphs, labeled property graphs (LPGs)
    - Graph properties: degree distribution, clustering coefficient, centrality, connected components
    - Why biological data is inherently graph-structured
    - Labeled property graph model vs. RDF triple model
    - Scaling graph databases to billions of vertices with distributed graphs

- **Week 3: Graph Databases and Query Languages**
    - Relational vs. graph databases for biological data
    - The Cypher query language
    - The GQL query language
    - Loading biological datasets into a graph database
    - An LPG graph data model for protein interaction
    - Hands-on lab: Running graph queries on a protein interaction graph

### Module 2 — Sequence Analysis (Weeks 4–5)

- **Week 4: Sequence Alignment and Homology**
    - Pairwise alignment: Smith-Waterman, Needleman-Wunsch
    - BLAST and sequence similarity searching
    - Scoring matrices (BLOSUM, PAM) and gap penalties
    - Sequence similarity networks as graphs
    - Graph data model for sequence similarity networks

- **Week 5: Phylogenetics and Evolutionary Graphs**
    - Multiple sequence alignment (Clustal, MUSCLE)
    - Tree-building methods: neighbor-joining, maximum likelihood, Bayesian inference
    - Trees as directed acyclic graphs
    - Phylogenetic network models for reticulate evolution (horizontal gene transfer, hybridization)
    - Graph data model for evolutionary relationships

### Module 3 — Structural Bioinformatics (Weeks 6–7)

- **Week 6: Protein Structure Prediction and Analysis**
    - Levels of protein structure
    - Structure prediction: homology modeling, AlphaFold overview
    - A graph data model for protein contact maps
    - Residue interaction networks

- **Week 7: Molecular Interaction Networks**
    - Protein-protein interaction (PPI) networks: yeast two-hybrid, co-immunoprecipitation, mass spectrometry
    - PPI databases: STRING, BioGRID, IntAct
    - Network topology analysis: hubs, bottlenecks, modules
    - Graph data model for PPI networks

### Module 4 — Genomics and Transcriptomics (Weeks 8–9)

- **Week 8: Genome Assembly and Variation Graphs**
    - De Bruijn graphs for genome assembly
    - Reference genome limitations and bias
    - Pangenome graphs and variation graphs (vg toolkit)
    - Graph data model for genomic variants

- **Week 9: Gene Regulatory Networks**
    - Transcription factor binding, promoters, enhancers
    - RNA-seq analysis pipeline overview
    - Co-expression networks and differential network analysis
    - Inferring regulatory networks: WGCNA, ARACNE, GENIE3
    - Graph data model for gene regulation

### Module 5 — Pathway and Systems Biology (Weeks 10–11)

- **Week 10: Metabolic Pathway Modeling**
    - Metabolic networks as bipartite graphs (metabolites and reactions)
    - KEGG, Reactome, and BioCyc pathway databases
    - Flux balance analysis and constraint-based modeling
    - Graph data model for metabolic pathways

- **Week 11: Signaling Networks and Disease Modules**
    - Cell signaling cascades as directed graphs
    - Network medicine: disease modules, network proximity, guilt by association
    - Drug-target-disease knowledge graphs
    - Graph data model for drug repurposing

### Module 6 — Advanced Graph Applications (Weeks 12–13)

- **Week 12: Biomedical Knowledge Graphs and Ontologies**
    - Gene Ontology (GO), Disease Ontology, Human Phenotype Ontology
    - Building knowledge graphs from heterogeneous biomedical data
    - Graph embeddings and link prediction for biological discovery
    - Graph neural networks (GNNs) for molecular property prediction
    - Graph data model for biomedical knowledge graphs

- **Week 13: Multi-Omics Integration and Graph Analytics at Scale**
    - Integrating genomics, transcriptomics, proteomics, and metabolomics in a unified graph
    - Community detection algorithms for biological module discovery
    - Graph visualization examples: Vis-network, Cytoscape, Gephi
    - Graph data model for multi-omics integration
    - Scalability: graph partitioning, distributed graph databases
    - Appendix: A vis-network tutorial for informatics professionals

### Module 7 — Capstone (Week 14)

- **Week 14: Capstone Presentations and Course Synthesis**
    - Student capstone project presentations
    - Peer review and discussion
    - Future directions in graph-based bioinformatics

## Topics Not Covered

This course does not include:

- **Wet-lab techniques** — no bench work; the course is entirely computational
- **Clinical bioinformatics and HIPAA compliance** — clinical data governance is mentioned but not taught in depth
- **Deep learning architectures in detail** — GNNs are introduced conceptually but building custom deep learning models is beyond scope
- **Population genetics and GWAS** — mentioned in the context of variation graphs but not covered as a standalone topic
- **Metagenomics and microbiome analysis** — a natural extension but deferred to a follow-on course
- **R/Bioconductor programming** — the course uses Python exclusively; R users can transfer concepts independently
- **Quantum computing for bioinformatics** — too nascent for a survey course

## Case Studies

### Case Study 1: SARS-CoV-2 Variant Tracking with Phylogenetic Networks

Students build a phylogenetic network of SARS-CoV-2 spike protein sequences, identify recombination events that violate a strict tree model, and visualize variant lineage relationships as a graph in Neo4j.

### Case Study 2: Drug Repurposing with a Biomedical Knowledge Graph

Using a simplified version of the Hetionet knowledge graph, students query drug-gene-disease relationships to identify candidate drugs for repurposing against a rare disease, applying network proximity and link prediction.

### Case Study 3: Pangenome Graph for Structural Variant Discovery

Students construct a pangenome variation graph from a set of human genome assemblies, map short reads to the graph, and identify structural variants missed by traditional linear reference approaches.

### Case Study 4: Cancer Driver Gene Identification via PPI Network Analysis

Students load a cancer-specific protein interaction network into Neo4j, compute centrality measures, run community detection, and cross-reference results with known cancer gene databases (COSMIC, OncoKB) to rank candidate driver genes.

## Capstone Projects

Students select one of the following capstone projects (or propose their own with instructor approval). Each project requires a graph data model, a working implementation, a written report, and a 15-minute presentation.

### Project 1: Antibiotic Resistance Gene Network

Build a graph database linking antibiotic resistance genes, mobile genetic elements, bacterial species, and antibiotics. Use graph queries to identify potential horizontal gene transfer pathways and predict resistance spread.

**Graph data model:** Nodes represent resistance genes, mobile genetic elements (plasmids, transposons), bacterial species, and antibiotic compounds. Edges capture "carried-by," "confers-resistance-to," "transferred-via," and "found-in-species" relationships with properties for evidence type and confidence score.

### Project 2: Rare Disease Diagnosis Assistant

Construct a knowledge graph connecting phenotypes (HPO terms), genes, variants, and diseases. Given a set of patient phenotypes, use graph traversal and scoring to rank candidate diagnoses.

**Graph data model:** Nodes represent phenotypes (HPO), genes, genetic variants, and diseases (OMIM/Orphanet). Edges capture "associated-with," "causes," "variant-of," and "phenotype-of" relationships with properties for frequency, severity, and source database.

### Project 3: Metabolic Model Comparison Across Organisms

Load genome-scale metabolic models for three related organisms into a graph database. Compare pathway topology, identify conserved and organism-specific modules, and visualize metabolic differences.

**Graph data model:** A bipartite graph where metabolite nodes and reaction nodes are connected by "substrate-of" and "product-of" edges. Reaction nodes link to enzyme and gene nodes. An "organism" property on each reaction enables cross-species filtering and comparison.

### Project 4: Protein Function Prediction with Graph Embeddings

Generate graph embeddings from a protein interaction network and use them as features in a classifier to predict Gene Ontology annotations for unannotated proteins. Evaluate against held-out GO labels.

**Graph data model:** Protein nodes with properties for species, sequence length, and known GO annotations. Interaction edges carry experimental method, confidence score, and source database. GO term nodes form a separate DAG subgraph connected to proteins via "annotated-with" edges.

### Project 5: Multi-Omics Patient Stratification

Integrate transcriptomic and proteomic data from a cancer cohort into a patient similarity network. Apply community detection to identify patient subgroups and correlate with clinical outcomes.

**Graph data model:** Patient nodes with clinical metadata (stage, survival, treatment). Gene and protein nodes connect to patients via weighted "expressed-in" edges. Patient-to-patient similarity edges are computed from multi-omics profiles with a similarity score property used for community detection.

### Project 6: Custom Project (Instructor Approved)

Students may propose a bioinformatics problem of personal or professional interest that requires graph-based data modeling and analysis. A one-page proposal is due by Week 5.

**Graph data model:** The proposal must include a labeled property graph schema diagram showing node types, relationship types, and key properties, along with a justification for why a graph model is the appropriate representation for the chosen problem.

## Assessment

| Component | Weight |
|---|---|
| Weekly labs and homework | 30% |
| Midterm exam (Weeks 1–7) | 15% |
| Case study reports (4 total) | 20% |
| Capstone project | 25% |
| Class participation and peer review | 10% |

## Required Software and Tools

- Python 3.10+ with Biopython, NetworkX, pandas, scikit-learn
- Neo4j Desktop (Community Edition) or similar tool (Memgraph etc) that runs Cypher
- Vis-network JavasScript library for network visualization
- Jupyter Notebooks
- Command-line tools: BLAST+, MUSCLE, vg toolkit

## Learning Objectives by Bloom's Taxonomy

### Level 1 — Remember

1. List the major biological databases (NCBI, UniProt, PDB, KEGG, Reactome) and the types of data each contains
2. Define fundamental graph theory terms: node, edge, degree, path, connected component, centrality, clustering coefficient
3. Identify the standard bioinformatics file formats (FASTA, FASTQ, GenBank, PDB, GFF3)
4. Recall the key steps in a basic RNA-seq analysis pipeline
5. Name the three main approaches to phylogenetic tree construction (distance-based, maximum likelihood, Bayesian)

### Level 2 — Understand

6. Explain why biological relationships (interactions, pathways, regulation, evolution) are naturally represented as graphs rather than tables
7. Describe the difference between a labeled property graph model and an RDF triple model
8. Summarize how de Bruijn graphs are used in genome assembly
9. Interpret degree distributions, hub-and-spoke patterns, and scale-free properties in biological networks
10. Distinguish between sequence similarity networks, protein interaction networks, and gene regulatory networks in terms of what nodes and edges represent

### Level 3 — Apply

11. Perform pairwise and multiple sequence alignment using standard tools (BLAST, MUSCLE)
12. Write Cypher queries to traverse and filter a biological graph database in Neo4j
13. Load biological datasets from public databases into a graph database with an appropriate schema
14. Compute network centrality measures (degree, betweenness, closeness) for a protein interaction network using NetworkX
15. Construct a phylogenetic tree from a set of homologous sequences and interpret branch support values

### Level 4 — Analyze

16. Analyze the topology of a biological network to identify hubs, bottlenecks, and densely connected modules
17. Compare graph-based pangenome representations with linear reference genomes for variant calling accuracy
18. Evaluate the quality and completeness of a protein interaction network by assessing data source reliability and coverage bias
19. Differentiate between correlation-based and information-theoretic methods for gene regulatory network inference
20. Assess the strengths and limitations of different community detection algorithms when applied to biological networks

### Level 5 — Evaluate

21. Critically evaluate a published knowledge graph study for biological validity, data integration quality, and methodological rigor
22. Judge the suitability of different graph database technologies (Neo4j, RDF stores, in-memory graph libraries) for a given bioinformatics problem
23. Appraise the predictive value of graph embeddings and link prediction for drug repurposing compared with traditional approaches
24. Evaluate trade-offs between network complexity, interoperability, and computational cost when modeling multi-omics data as a graph
25. Assess when a graph-based approach adds genuine value versus when simpler tabular methods suffice

### Level 6 — Create

26. Design a graph data model for a novel bioinformatics dataset that captures entities, relationships, and properties appropriate to the biological domain
27. Build an end-to-end bioinformatics pipeline that ingests raw data, constructs a graph, runs analytical queries, and produces a visualization
28. Develop a knowledge graph that integrates data from at least three heterogeneous biomedical sources
29. Construct a capstone project that formulates a biological question, selects appropriate graph methods, implements a solution, and communicates results
30. Propose and justify a graph-based approach to an unsolved or open bioinformatics problem, including data model, algorithm selection, and validation strategy