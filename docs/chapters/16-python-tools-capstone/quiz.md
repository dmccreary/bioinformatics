# Quiz: Python Tools and Capstone Projects

Test your understanding of the Python bioinformatics ecosystem, reproducible analysis practices, graph data model design, and capstone project concepts.

---

#### 1. What is the primary advantage of NetworkX for bioinformatics graph analysis?

<div class="upper-alpha" markdown>
1. It can only create trees, which simplifies analysis compared to general graphs
2. It provides a Pythonic API for creating, manipulating, and analyzing graphs with hundreds of built-in algorithms covering centrality, shortest paths, and community detection
3. It replaces the need for graph databases like Neo4j in all applications
4. It can only process graphs with fewer than 100 nodes
</div>

??? question "Show Answer"
    The correct answer is **B**. NetworkX is the standard Python library for graph construction and analysis, offering a simple API where nodes can be any hashable object and edges carry arbitrary attribute dictionaries. It includes algorithms for centrality measures, shortest paths, community detection, graph traversal, and network motif analysis. While powerful for analysis, NetworkX works in memory and is not a replacement for graph databases (C is incorrect) when persistent storage and concurrent access are needed.

    **Concept Tested:** NetworkX

---

#### 2. Why are Conda environments important for reproducible bioinformatics analysis?

<div class="upper-alpha" markdown>
1. Conda environments make code run faster by optimizing Python bytecode
2. Conda environments isolate project dependencies and record exact package versions, ensuring that an analysis can be reproduced on different machines and at later dates
3. Conda environments are required by all bioinformatics journals for manuscript submission
4. Conda environments automatically fix bugs in bioinformatics software
</div>

??? question "Show Answer"
    The correct answer is **B**. Conda environments create isolated spaces with specific versions of Python and its dependencies, preventing conflicts between projects and ensuring reproducibility. By exporting an environment file (`conda env export > environment.yml`), a researcher documents the exact versions of every package used in an analysis. Another researcher can recreate that environment identically, even years later. This is a cornerstone of reproducible science alongside version control and workflow managers.

    **Concept Tested:** Conda Environments and Reproducible Analysis

---

#### 3. What role does Biopython play in the Python bioinformatics ecosystem?

<div class="upper-alpha" markdown>
1. It provides parsers for bioinformatics file formats, interfaces to NCBI databases, and modules for sequence alignment, phylogenetics, and structural biology
2. It is exclusively used for visualizing biological networks
3. It replaces pandas for all data manipulation tasks in bioinformatics
4. It can only parse FASTA files and has no other functionality
</div>

??? question "Show Answer"
    The correct answer is **A**. Biopython is the foundational library for biological sequence analysis in Python. It provides parsers for FASTA, GenBank, PDB, FASTQ, and other formats; interfaces to NCBI Entrez databases for retrieving sequences and annotations; BLAST wrappers for similarity searches; and modules for phylogenetic tree construction and structural analysis. It handles the full workflow from data retrieval through parsing to analysis, making it essential for sequence-oriented bioinformatics.

    **Concept Tested:** Biopython

---

#### 4. What is the first critical step in designing a graph data model for a capstone project?

<div class="upper-alpha" markdown>
1. Choosing the programming language before understanding the data
2. Identifying the biological entities (node types) and relationships (edge types) relevant to the research question, then defining the schema
3. Importing all available data into a graph database without filtering
4. Running community detection algorithms on random data to test performance
</div>

??? question "Show Answer"
    The correct answer is **B**. Graph data model design begins with identifying the core entities (what becomes a node) and relationships (what becomes an edge) that are relevant to the biological question. For example, an antibiotic resistance knowledge graph needs nodes for resistance genes, organisms, antibiotics, and mobile genetic elements, with edges like "confers_resistance_to" and "carried_by." The schema defines node labels, relationship types, and property keys before any data is loaded, ensuring that the graph structure supports the queries needed to answer the research question.

    **Concept Tested:** Graph Data Model Design and Capstone Project Design

---

#### 5. How does the Neo4j Python driver connect Python analysis code to a graph database?

<div class="upper-alpha" markdown>
1. It converts Python code into Cypher automatically without user input
2. It provides a connection interface that allows Python scripts to send Cypher queries to a Neo4j database, retrieve results as Python objects, and manage transactions
3. It replaces NetworkX for all graph algorithm computations
4. It can only read data from Neo4j but cannot write or modify the graph
</div>

??? question "Show Answer"
    The correct answer is **B**. The Neo4j Python driver establishes a connection between Python code and a Neo4j graph database, allowing scripts to send Cypher queries, retrieve results as Python dictionaries or records, and manage read/write transactions. This enables workflows where data is stored and queried in Neo4j while Python handles statistical analysis, machine learning, and visualization. The driver supports both reading and writing (D is incorrect) and complements rather than replaces NetworkX (C is incorrect).

    **Concept Tested:** Neo4j Python Driver

---

#### 6. What is a workflow manager, and why is it important for reproducible bioinformatics?

<div class="upper-alpha" markdown>
1. A project management tool for scheduling team meetings
2. A software tool like Snakemake or Nextflow that defines analysis pipelines as directed acyclic graphs of tasks, automatically managing dependencies, parallelization, and re-execution of failed steps
3. A version control system for tracking changes to code files
4. A visualization tool for displaying the results of bioinformatics analyses
</div>

??? question "Show Answer"
    The correct answer is **B**. Workflow managers like Snakemake, Nextflow, and CWL define bioinformatics pipelines as directed acyclic graphs where each node is a computational task and edges represent data dependencies. They automatically determine execution order, parallelize independent tasks, track which outputs are up-to-date, and re-run only the steps affected by changes. This ensures reproducibility by explicitly documenting every step of the analysis pipeline and its inputs, outputs, and parameters.

    **Concept Tested:** Workflow Managers

---

#### 7. In the context of capstone projects, what is a phenotype-gene mapping used for in rare disease diagnosis?

<div class="upper-alpha" markdown>
1. Mapping the geographic locations where rare diseases are most prevalent
2. Connecting clinical phenotypes (described using HPO terms) to candidate genes through knowledge graph traversal to prioritize diagnostic hypotheses
3. Measuring the physical distance between gene loci on a chromosome
4. Predicting the phenotypic appearance of organisms based on genome sequence alone
</div>

??? question "Show Answer"
    The correct answer is **B**. In the rare disease knowledge graph capstone, patient clinical features are encoded as Human Phenotype Ontology (HPO) terms. These are connected through a knowledge graph to genes known to cause similar phenotypic profiles. By computing semantic similarity between the patient's HPO terms and disease-associated phenotype profiles, the system generates a ranked list of candidate diagnoses and causal genes. This graph-based approach is particularly valuable for rare diseases where individual clinical expertise may be limited.

    **Concept Tested:** Phenotype-Gene Mapping and Rare Disease Knowledge Graph

---

#### 8. What is the purpose of version control (e.g., Git) in scientific computing?

<div class="upper-alpha" markdown>
1. To compress code files and reduce storage requirements
2. To track every change to code and analysis scripts, enabling rollback to previous states, collaboration, and documentation of the analytical history
3. To automatically optimize Python code for faster execution
4. To prevent other researchers from accessing proprietary algorithms
</div>

??? question "Show Answer"
    The correct answer is **B**. Version control systems like Git track every modification to code files, recording who changed what and when. This enables researchers to roll back to previous working versions, compare changes across time, collaborate without overwriting each other's work, and maintain a complete audit trail of the analytical process. Combined with Conda environments and workflow managers, version control forms the three pillars of reproducible computational science.

    **Concept Tested:** Version Control for Science

---

#### 9. How can graph-based approaches contribute to antibiotic resistance surveillance?

<div class="upper-alpha" markdown>
1. By visualizing antibiotic molecular structures in three dimensions
2. By modeling resistance genes, mobile genetic elements, organisms, and antibiotics as a knowledge graph that tracks how resistance spreads across bacterial populations through horizontal gene transfer
3. By sequencing antibiotics to determine their chemical composition
4. By replacing laboratory susceptibility testing with computational predictions exclusively
</div>

??? question "Show Answer"
    The correct answer is **B**. An antibiotic resistance knowledge graph connects resistance genes (nodes) to the antibiotics they confer resistance against, the mobile genetic elements (plasmids, transposons) that carry them, and the bacterial organisms in which they are found. Graph queries can trace how resistance genes spread across species through horizontal gene transfer, identify emerging multi-drug resistance patterns, and predict which organisms are at risk of acquiring new resistance mechanisms. This complements (not replaces) laboratory testing.

    **Concept Tested:** Antibiotic Resistance Graph and Resistance Gene Network

---

#### 10. What distinguishes a "bench to bedside" pipeline in graph-based bioinformatics?

<div class="upper-alpha" markdown>
1. It refers to the physical layout of laboratory benches in a hospital
2. It describes the end-to-end workflow from raw molecular data through graph-based analysis to clinically actionable insights, such as identifying drug targets or stratifying patients for treatment
3. It is a specific software package for hospital information systems
4. It measures the distance a biological sample travels from collection to analysis
</div>

??? question "Show Answer"
    The correct answer is **B**. A "bench to bedside" pipeline traces the complete path from laboratory-generated molecular data (genomics, proteomics, metabolomics) through computational analysis using graph-based methods (knowledge graphs, network medicine, community detection) to clinical decision support. This includes data integration, graph construction, algorithmic analysis (disease module detection, drug repurposing), validation, and translation into actionable clinical insights such as personalized treatment recommendations or biomarker-guided patient stratification.

    **Concept Tested:** Bench to Bedside Pipeline
