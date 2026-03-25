---
title: Biological Databases
description: Major public repositories for biological data — NCBI, UniProt, PDB, KEGG, Reactome, and programmatic access methods
generated_by: claude skill chapter-content-generator
date: 2026-03-24 22:55:15
version: 0.05
---

# Biological Databases

## Summary

Surveys the major public repositories for biological data including NCBI, UniProt, PDB, KEGG, Reactome, and specialized disease and ontology databases, along with programmatic access methods and data provenance practices.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Biological Databases
2. NCBI
3. GenBank Database
4. UniProt
5. Swiss-Prot
6. TrEMBL
7. Protein Data Bank
8. Ensembl
9. KEGG Database
10. Reactome Database
11. BioGRID Database
12. STRING Database
13. IntAct Database
14. COSMIC Database
15. Gene Ontology Database
16. Disease Ontology Database
17. Human Phenotype Ontology DB
18. BioCyc Database
19. OMIM Database
20. Hetionet Database
21. Database Cross-References
22. Programmatic Database Access
23. REST APIs for Biology
24. Batch Data Download
25. Data Provenance

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Molecular Biology](../01-foundations-molecular-biology/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    In Chapter 1 we learned the molecular alphabet — DNA, RNA, and proteins. Now we need to find where all that molecular data actually lives. Biological databases are the shared memory of the life sciences, and learning to navigate them is one of the most practical skills you will develop in this course. Let's connect the dots between molecules and the repositories that store them!

## Why Biological Databases Matter

Modern biology generates data at an extraordinary pace. A single human genome sequencing run produces roughly 100 gigabytes of raw data, and global sequencing output doubles approximately every seven months. No individual laboratory can store, curate, or analyze this volume of information alone. Biological databases solve this problem by providing centralized, publicly accessible repositories where researchers deposit, annotate, and retrieve molecular data according to shared standards.

Biological databases are far more than passive storage systems. They impose structure on heterogeneous experimental results, enforce controlled vocabularies, and create cross-references that link a gene in one database to its protein product in another, its metabolic pathway in a third, and its disease associations in a fourth. These cross-references form a vast knowledge graph — and understanding that graph is a recurring theme throughout this course.

The major categories of biological databases include:

- **Sequence databases** — store nucleotide and amino acid sequences (GenBank, UniProt)
- **Structure databases** — store three-dimensional atomic coordinates of macromolecules (PDB)
- **Pathway and interaction databases** — capture metabolic reactions, signaling cascades, and protein-protein interactions (KEGG, Reactome, BioGRID, STRING, IntAct)
- **Ontology and annotation databases** — provide standardized vocabularies and functional annotations (Gene Ontology, Disease Ontology, Human Phenotype Ontology)
- **Disease and phenotype databases** — link genes and variants to clinical conditions (COSMIC, OMIM)
- **Integrative databases** — combine data from multiple sources into unified knowledge graphs (Hetionet)

| Category | Primary Data Type | Example Databases |
|----------|-------------------|-------------------|
| Sequence | Nucleotide/amino acid strings | GenBank, UniProt, Ensembl |
| Structure | 3D atomic coordinates | PDB |
| Pathway/Interaction | Reactions, edges, networks | KEGG, Reactome, BioGRID, STRING, IntAct |
| Ontology | Controlled vocabularies, DAGs | Gene Ontology, Disease Ontology, HPO |
| Disease/Phenotype | Variant-disease associations | COSMIC, OMIM |
| Integrative | Heterogeneous knowledge graphs | Hetionet, BioCyc |

## The NCBI Ecosystem

The National Center for Biotechnology Information (NCBI) is the single most important gateway to biological data in the world. Established in 1988 as a division of the United States National Library of Medicine, NCBI hosts dozens of interconnected databases and provides the Entrez search system that links them together. Understanding the NCBI ecosystem is essential for any bioinformatics practitioner because nearly every public sequence, publication, and genomic annotation passes through one of its portals.

NCBI's databases include GenBank (nucleotide sequences), RefSeq (curated reference sequences), PubMed (biomedical literature), the Sequence Read Archive (raw sequencing reads), dbSNP (single nucleotide polymorphisms), ClinVar (variant-disease relationships), and many others. The unifying feature is Entrez, which allows a single query to retrieve results across all NCBI databases simultaneously and follow hyperlinks between related records.

### GenBank: The Nucleotide Sequence Archive

The GenBank Database is the NIH genetic sequence database and one of the three members of the International Nucleotide Sequence Database Collaboration (INSDC), alongside the European Nucleotide Archive (ENA) and the DNA Data Bank of Japan (DDBJ). These three archives mirror each other daily, so a sequence deposited in any one of them is available from all three within 24 hours.

A GenBank record contains far more than a raw sequence. Each entry includes:

- **Accession number** — a stable, unique identifier (e.g., NM_007294.4 for human BRCA1 mRNA)
- **Organism and taxonomy** — linked to the NCBI Taxonomy database
- **Feature annotations** — coding sequences, regulatory elements, variation sites
- **Literature references** — linked to PubMed identifiers
- **Cross-references** — links to protein records, genome assemblies, and other databases

As of early 2026, GenBank contains over 250 million sequence records comprising more than 1.5 trillion nucleotide bases. The exponential growth of this archive mirrors the drop in sequencing costs and the expansion of genome-scale projects.

## Protein Databases: UniProt and the PDB

### UniProt: The Universal Protein Resource

UniProt is the world's most comprehensive protein sequence and function database. It is maintained by a consortium of the Swiss Institute of Bioinformatics (SIB), the European Bioinformatics Institute (EMBL-EBI), and the Protein Information Resource (PIR). UniProt consists of two main components with very different levels of curation.

**Swiss-Prot** is the manually curated section of UniProt. Each Swiss-Prot entry has been reviewed by a human expert who verifies the protein's existence, assigns function based on published experimental evidence, maps domains and post-translational modifications, and adds cross-references to other databases. As of 2026, Swiss-Prot contains approximately 570,000 reviewed entries. The curation effort is expensive and slow, but the resulting data quality is extremely high — Swiss-Prot entries are considered a gold standard in protein annotation.

**TrEMBL** (Translated EMBL) is the automatically annotated section of UniProt. TrEMBL entries are generated by computational translation of nucleotide sequences from the EMBL/GenBank/DDBJ databases and are annotated by automated pipelines rather than human curators. TrEMBL contains over 250 million entries and grows much faster than Swiss-Prot because automated annotation scales with sequencing output while manual curation does not.

| Feature | Swiss-Prot | TrEMBL |
|---------|-----------|--------|
| Curation | Manual (expert-reviewed) | Automated |
| Size (approx.) | 570,000 entries | 250,000,000+ entries |
| Quality | Gold standard | Variable |
| Growth rate | Slow (limited by curators) | Fast (scales with sequencing) |
| Use case | Reference annotations, benchmarks | Comprehensive searches, novel organisms |

The distinction between Swiss-Prot and TrEMBL matters in practice. When you need high-confidence functional annotations for a well-studied organism, you query Swiss-Prot. When you need broad coverage across all known organisms or are working with newly sequenced genomes, you search TrEMBL as well — but you treat unreviewed annotations with appropriate caution.

### Protein Data Bank: Three-Dimensional Structures

The Protein Data Bank (PDB) is the single global archive for experimentally determined three-dimensional structures of biological macromolecules. Founded in 1971, the PDB was one of the first open-access databases in any scientific field. It now contains over 220,000 structures determined by X-ray crystallography, cryo-electron microscopy (cryo-EM), and nuclear magnetic resonance (NMR) spectroscopy.

Each PDB entry includes atomic coordinates, experimental metadata (resolution, method, R-factors), and annotations of secondary structure, ligands, and biological assemblies. PDB identifiers are four-character alphanumeric codes (e.g., 1BNA for the classic B-DNA dodecamer). The PDB is managed by the Worldwide Protein Data Bank (wwPDB) consortium, with regional partners including RCSB PDB (United States), PDBe (Europe), and PDBj (Japan).

The structural data in the PDB is critical for drug design, enzyme engineering, and understanding molecular mechanisms. In the context of this course, PDB structures often serve as nodes in protein interaction networks, where the availability of a co-crystal structure for two interacting proteins provides strong evidence for a physical interaction edge.

## Genome Annotation: Ensembl

Ensembl is a genome browser and annotation system maintained by EMBL-EBI and the Wellcome Sanger Institute. While NCBI provides genome assemblies and annotations primarily through RefSeq, Ensembl offers an independent, complementary annotation pipeline with particular strengths in comparative genomics and regulatory element prediction.

Ensembl provides gene models, transcript variants, protein predictions, regulatory annotations, and variation data for over 300 vertebrate and model organism genomes. Its BioMart data-mining tool allows users to construct complex queries across multiple data types without writing code. For bioinformatics pipelines, Ensembl's REST API and Perl/Python client libraries provide programmatic access to nearly every data type the browser displays.

A key feature of Ensembl is its stable identifier system. Each gene, transcript, and protein receives an identifier (e.g., ENSG00000141510 for human TP53) that persists across genome assembly updates, with a version number that increments when the underlying annotation changes. This stability is essential for reproducible analyses.

## Pathway and Interaction Databases

Biological molecules do not act in isolation — they participate in metabolic reactions, signaling cascades, and physical complexes. Pathway and interaction databases capture these relationships as networks, making them natural entry points for graph-based analysis.

### KEGG: Kyoto Encyclopedia of Genes and Genomes

The KEGG Database integrates genomic, chemical, and systems information into a collection of manually curated pathway maps. KEGG pathways represent metabolic reactions, signaling cascades, and disease mechanisms as directed graphs where nodes are genes, proteins, or small molecules and edges are biochemical reactions or regulatory relationships. KEGG also maintains databases of compounds, drugs, and organismal genomes, all cross-referenced to pathway maps.

KEGG is particularly valuable for pathway enrichment analysis — a common bioinformatics task where you test whether a set of differentially expressed genes is enriched for genes in a particular pathway. The structured, graph-based representation of pathways makes this analysis straightforward.

### Reactome: Open-Access Pathway Knowledgebase

The Reactome Database is a free, open-source, curated pathway database with a focus on human biology. Reactome represents biological processes as a hierarchy of events — from high-level pathways (e.g., "Signal Transduction") down to individual biochemical reactions with defined inputs, outputs, catalysts, and regulators. Every annotation in Reactome is traced to published experimental evidence.

Reactome's data model is inherently graph-structured: reactions are nodes connected by substrate and product edges, grouped into pathway subgraphs that are themselves connected in a hierarchy. Reactome provides extensive analysis tools, including pathway enrichment, expression overlay, and interactome visualization.

### Protein-Protein Interaction Databases

Protein-protein interactions (PPIs) are among the most important biological relationships for graph-based bioinformatics. Three major databases capture these interactions with different emphases.

**BioGRID** (Biological General Repository for Interaction Datasets) is a curated database of genetic and protein interactions. BioGRID focuses on literature curation — trained curators read published papers and extract interaction data using controlled vocabularies. As of 2026, the BioGRID Database contains over 2.5 million interactions across major model organisms.

**STRING** (Search Tool for the Retrieval of Interacting Genes/Proteins) takes a broader approach. The STRING Database integrates experimental interaction data with computational predictions, text mining, and genomic context information to assign a confidence score to each predicted interaction. STRING is particularly useful when you need a comprehensive interaction network and are willing to accept predicted interactions alongside experimentally verified ones.

**IntAct** is the molecular interaction database maintained by EMBL-EBI. The IntAct Database specializes in detailed curation of molecular interactions using the PSI-MI (Proteomics Standards Initiative — Molecular Interactions) controlled vocabulary. IntAct emphasizes standardization and data exchange, making it a key node in the International Molecular Exchange (IMEx) consortium.

| Database | Scope | Curation Style | Strength |
|----------|-------|---------------|----------|
| BioGRID | Genetic + protein interactions | Literature curation | Breadth of model organisms |
| STRING | Functional associations | Integrated (experimental + predicted) | Confidence scoring, coverage |
| IntAct | Molecular interactions | Deep, standardized curation | PSI-MI compliance, detail |

!!! mascot-thinking "Let's Connect the Dots!"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli thinking">
    Each of these interaction databases represents biology as a graph — proteins are nodes, interactions are edges. But they differ in what counts as an "edge." BioGRID and IntAct require published experimental evidence, while STRING also includes predicted interactions. When you build a protein interaction network for analysis, your choice of source database determines the density and reliability of your graph.

## Ontology and Annotation Databases

Ontologies are structured, controlled vocabularies that define the terms used to describe biological entities and their relationships. In bioinformatics, ontologies serve as the shared language that allows different databases, tools, and research groups to describe the same biological concepts in a machine-readable, interoperable way.

### Gene Ontology

The Gene Ontology Database (GO) is the most widely used ontology in bioinformatics. GO provides a structured vocabulary organized into three independent ontologies:

- **Molecular Function** — describes activities at the molecular level (e.g., "protein kinase activity")
- **Biological Process** — describes larger biological programs (e.g., "apoptotic process")
- **Cellular Component** — describes locations within the cell (e.g., "mitochondrial matrix")

GO terms are organized as a directed acyclic graph (DAG), not a simple tree. A single term can have multiple parent terms, reflecting the fact that biological concepts often belong to more than one category. For example, "DNA repair" is a child of both "cellular response to DNA damage stimulus" and "DNA metabolic process." This DAG structure is a natural fit for graph-based analysis and is one reason GO is so central to bioinformatics.

GO annotations link specific gene products to GO terms with evidence codes that indicate how the annotation was established — experimental evidence (IDA, IPI, IMP), computational analysis (ISS, ISO), or electronic annotation (IEA). Understanding evidence codes is important because they indicate the reliability of each annotation.

### Disease Ontology and Human Phenotype Ontology

The Disease Ontology Database (DO) provides a standardized vocabulary for human diseases, organized as a DAG that classifies diseases by etiology, anatomy, and cell type. The DO cross-references disease terms to other vocabularies including ICD, MeSH, and OMIM, making it a useful bridge between clinical and molecular databases.

The Human Phenotype Ontology DB (HPO) describes clinical abnormalities (phenotypes) associated with human diseases. HPO terms range from high-level descriptions ("Abnormality of the cardiovascular system") to highly specific clinical findings ("Perimembranous ventricular septal defect"). HPO is particularly valuable for rare disease diagnosis, where computational matching of a patient's phenotype profile against the HPO can suggest candidate diagnoses.

Both DO and HPO are DAG-structured ontologies with rich cross-references, and both play important roles in the knowledge graphs we will build later in this course.

## Disease and Specialized Databases

### COSMIC: Catalogue of Somatic Mutations in Cancer

The COSMIC Database (Catalogue Of Somatic Mutations In Cancer) is the world's largest and most comprehensive resource for exploring the impact of somatic mutations in human cancer. COSMIC curates data from the scientific literature and large-scale genome-wide screening studies to catalog point mutations, gene fusions, genomic rearrangements, and copy number variations across all human cancer types.

COSMIC is essential for cancer bioinformatics because it provides the reference dataset against which newly discovered mutations are compared. If a variant found in a patient's tumor matches a known COSMIC entry with high frequency across many cancer types, that variant is more likely to be a driver mutation rather than a passenger.

### OMIM: Online Mendelian Inheritance in Man

The OMIM Database is a comprehensive catalog of human genes and genetic disorders. Founded by Victor McKusick in 1966 as a printed book, OMIM has evolved into an authoritative online resource that links genes to the Mendelian phenotypes they cause. Each OMIM entry includes a detailed narrative description of the gene or disorder, its molecular basis, clinical features, and relevant literature.

OMIM uses a distinctive six-digit numbering system where the first digit indicates the mode of inheritance (1 = autosomal dominant, 2 = autosomal recessive, etc.). OMIM entries are extensively cross-referenced to GenBank, UniProt, PDB, and other databases, making them valuable nodes in biomedical knowledge graphs.

### BioCyc: Metabolic Pathway and Genome Database

The BioCyc Database is a collection of organism-specific pathway and genome databases. Each BioCyc database contains the genome, metabolic pathways, regulatory network, and other cellular processes for a single organism. The flagship database, EcoCyc, provides a deeply curated model of *Escherichia coli* K-12 metabolism. MetaCyc, another component, is a reference database of metabolic pathways from over 3,000 organisms.

BioCyc represents metabolic networks as directed graphs where metabolites are nodes and enzymatic reactions are edges. This graph structure enables pathway analysis, flux balance analysis, and metabolic engineering applications.

!!! mascot-tip "Pro Tip from Olli"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    When starting a new bioinformatics project, resist the urge to download everything at once. Instead, begin by identifying the two or three databases most relevant to your biological question, then follow cross-references outward as needed. The interconnected nature of biological databases means you can usually reach any data you need within two or three hops.

## Integrative Databases: Hetionet

The Hetionet Database represents a different philosophy from the specialized databases described above. Rather than deeply curating one data type, Hetionet integrates data from 29 public resources into a single heterogeneous network (or "hetnet") that connects genes, compounds, diseases, anatomies, pathways, molecular functions, cellular components, biological processes, symptoms, side effects, and pharmacologic classes.

Hetionet contains over 47,000 nodes of 11 types and over 2.2 million edges of 24 types. The network was constructed specifically to enable computational drug repurposing — the use of graph algorithms to predict new therapeutic uses for existing drugs by traversing paths through the network. For example, if a drug treats disease A, and disease A shares molecular pathways with disease B, the drug might also treat disease B. Hetionet makes these multi-hop inferences tractable by encoding all the relevant relationships in a single, queryable graph.

Hetionet is a powerful teaching example for this course because it illustrates how the specialized databases we have discussed — GenBank for genes, Disease Ontology for diseases, Gene Ontology for functions, KEGG and Reactome for pathways — can be unified into a single knowledge graph where graph algorithms reveal relationships that no single database could expose on its own.

#### Diagram: Biological Database Ecosystem

<iframe src="../../sims/bio-database-ecosystem/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Diagram Specification</summary>

- **Sim ID**: bio-database-ecosystem
- **Library**: vis-network
- **Status**: Specified

This interactive network diagram shows the major biological databases covered in this chapter as nodes, colored by category (sequence = blue, structure = green, pathway/interaction = orange, ontology = purple, disease = red, integrative = gold). Edges represent cross-reference relationships between databases. Users can click a node to highlight its connections and see a brief description.

Node types and examples:

- Sequence: NCBI/GenBank, UniProt (Swiss-Prot + TrEMBL), Ensembl
- Structure: PDB
- Pathway/Interaction: KEGG, Reactome, BioGRID, STRING, IntAct
- Ontology: Gene Ontology, Disease Ontology, HPO
- Disease: COSMIC, OMIM
- Integrative: Hetionet, BioCyc

Edges represent known cross-reference links (e.g., GenBank to UniProt, UniProt to PDB, GO to UniProt, OMIM to GenBank, Hetionet to many sources). Layout uses a force-directed algorithm. Node labels are database names. Edge labels are omitted to reduce clutter.

Note: Apply slight y-offset (from 480 to 490) for any horizontal edges to avoid the vis-network label rendering bug.
</details>

## Database Cross-References

Database Cross-References (also called xrefs or dbxrefs) are the hyperlinks of biological data. A cross-reference is a structured pointer from a record in one database to a related record in another database. For example, a UniProt protein entry cross-references the GenBank nucleotide sequence from which it was translated, the PDB structures in which it has been crystallized, the GO terms that describe its function, the KEGG pathways in which it participates, and the OMIM entries for diseases associated with its mutations.

Cross-references transform isolated databases into an interconnected knowledge graph. From a graph perspective, each database record is a node, and each cross-reference is a typed, directed edge. The density of cross-referencing in biological databases is remarkably high — a single well-studied human protein may have cross-references to dozens of databases.

The practical importance of cross-references cannot be overstated. They enable:

- **Data integration** — combining information from multiple databases without manual matching
- **Identifier mapping** — translating between the different identifier systems used by different databases
- **Network construction** — building multi-layered biological networks by traversing cross-references
- **Quality control** — cross-checking annotations from independent sources

!!! mascot-thinking "Follow the Edges!"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli thinking">
    Think of database cross-references as the edges in a massive knowledge graph. When you look up a gene in GenBank and follow a cross-reference to its UniProt protein, then from UniProt to a PDB structure, and from PDB to a drug binding site — you have traversed a path through that graph. This is exactly the kind of multi-hop reasoning that graph databases and knowledge graphs formalize.

## Programmatic Database Access

While web browsers are fine for exploring individual records, serious bioinformatics work requires programmatic database access — the ability to query databases, retrieve records, and process results using scripts and pipelines. All major biological databases provide some form of programmatic interface.

### REST APIs for Biology

REST APIs for Biology (Representational State Transfer Application Programming Interfaces) are the most common method for programmatic access to biological databases. A REST API allows you to construct a URL that specifies a query and receive structured data (typically JSON or XML) in response. Most biological database APIs follow standard REST conventions.

Common REST API patterns in bioinformatics include:

- **NCBI E-utilities** — a suite of eight server-side programs that provide access to Entrez databases (e.g., `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=NM_007294&rettype=fasta`)
- **UniProt REST API** — supports queries by accession, keyword, taxonomy, and advanced search syntax, returning results in multiple formats
- **Ensembl REST API** — over 80 endpoints covering sequences, variants, comparative genomics, and regulation
- **PDB REST API** — search and download structures using programmatic queries
- **KEGG REST API** — retrieve pathway maps, gene entries, and compound information

A typical workflow using REST APIs might look like this:

1. Query NCBI for gene identifiers matching a search term
2. Retrieve the protein accession numbers linked to those genes
3. Fetch functional annotations from UniProt for each protein
4. Look up pathway memberships in KEGG or Reactome
5. Aggregate results into a table or network for downstream analysis

```python
# Example: Fetching a protein sequence from UniProt REST API
import requests

accession = "P04637"  # Human TP53 (p53 tumor suppressor)
url = f"https://rest.uniprot.org/uniprotkb/{accession}.fasta"
response = requests.get(url)

if response.ok:
    fasta_sequence = response.text
    print(fasta_sequence[:200])  # Print first 200 characters
```

### Batch Data Download

REST APIs are well-suited for retrieving individual records or small result sets, but many bioinformatics analyses require bulk data. Batch Data Download methods address this need through several mechanisms:

- **FTP/HTTPS bulk downloads** — most major databases maintain FTP sites or HTTPS endpoints where entire database releases can be downloaded as compressed flat files (e.g., the complete UniProt Swiss-Prot in FASTA format, the full PDB archive)
- **Aspera** — NCBI and EBI offer high-speed Aspera transfers for large datasets like the Sequence Read Archive
- **Database dump files** — databases like Reactome and BioGRID provide periodic release files in standard formats (TSV, XML, BioPAX)
- **BioMart** — Ensembl's BioMart tool supports batch queries that return custom-formatted result tables for thousands of genes at once
- **Programmatic batch queries** — some APIs support posting lists of identifiers for batch retrieval (e.g., UniProt's ID mapping service)

When performing batch downloads, always check the database's usage policies. Many APIs enforce rate limits (typically 3-10 requests per second) and require you to include a contact email in your request headers so administrators can reach you if your scripts cause problems.

!!! mascot-warning "Watch Out!"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    Be a responsible database citizen! Never hammer a public API with thousands of rapid-fire requests. Most databases publish rate limits and usage guidelines — follow them. Use batch download options when you need large datasets, cache results locally to avoid redundant queries, and always include your email in API request headers as requested by NCBI and other providers.

## Data Provenance

Data Provenance refers to the documented history of a piece of data — where it came from, how it was generated, what transformations it has undergone, and what evidence supports it. In bioinformatics, provenance is critical because the same biological entity (a gene, protein, or pathway) may appear in dozens of databases with subtly different annotations, and understanding which annotations to trust requires knowing their provenance.

Key aspects of data provenance in biological databases include:

- **Evidence codes** — GO uses a standardized set of evidence codes (IDA = Inferred from Direct Assay, IEA = Inferred from Electronic Annotation, etc.) that indicate the type and strength of evidence behind each annotation
- **Source attribution** — databases track which publication, experiment, or computational pipeline generated each data point
- **Version control** — database releases are numbered and archived, so analyses can be tied to specific data versions
- **Curation status** — the distinction between reviewed (Swiss-Prot) and unreviewed (TrEMBL) entries is a form of provenance metadata
- **Assertion confidence** — databases like STRING assign numerical confidence scores to predicted interactions

For reproducible bioinformatics research, you should always record:

1. Which database you queried
2. The database version or release date
3. The query parameters you used
4. The date of your download
5. Any filters or transformations applied to the raw data

This practice ensures that your results can be reproduced and that discrepancies between analyses can be traced to differences in the underlying data rather than unexplained variation.

| Provenance Element | Example | Why It Matters |
|-------------------|---------|----------------|
| Database version | UniProt Release 2026_01 | Annotations change between releases |
| Evidence code | GO:0006915 (IDA) | Distinguishes experimental from predicted |
| Curation status | Swiss-Prot (reviewed) | Indicates manual expert verification |
| Download date | 2026-03-15 | Archives are updated on different schedules |
| Query parameters | taxonomy:9606 AND reviewed:true | Ensures reproducibility |

## Putting It All Together: A Database Navigation Workflow

To illustrate how these databases work together, consider a common bioinformatics scenario: you have identified a gene of interest from a differential expression experiment and want to learn everything you can about it.

1. **Start at NCBI** — search the Gene database for your gene symbol to find its official name, genomic location, and summary
2. **Retrieve the sequence from GenBank** — download the mRNA and coding sequence in FASTA format
3. **Check UniProt** — find the Swiss-Prot entry for the protein product; review function, domains, post-translational modifications, and subcellular localization
4. **Look up structures in PDB** — determine whether any crystal or cryo-EM structures exist; examine ligand binding sites
5. **Explore pathways in KEGG and Reactome** — identify the metabolic or signaling pathways in which the protein participates
6. **Find interaction partners in STRING or BioGRID** — build a local interaction network around the protein
7. **Check disease associations in OMIM and COSMIC** — determine whether mutations in the gene are associated with Mendelian disorders or cancer
8. **Review Gene Ontology annotations** — confirm molecular function, biological process, and cellular component assignments
9. **Assess phenotypic impact via HPO and Disease Ontology** — link the gene to clinical phenotypes and disease classifications
10. **Document provenance** — record database versions, download dates, and evidence codes for all data collected

This workflow traverses multiple databases, following cross-references at each step. It is a manual traversal of the biological knowledge graph — and automating this traversal with programmatic access and graph algorithms is one of the central goals of this course.

!!! mascot-celebration "Great Work, Investigators!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You now have a map of the biological database landscape — from sequence archives like GenBank to integrative knowledge graphs like Hetionet. More importantly, you understand that these databases are not isolated silos but a richly interconnected network. In the chapters ahead, we will write code to traverse these connections, build networks, and extract biological insights from the graph structure itself. Onward!

## Key Takeaways

1. **Biological databases** are centralized, publicly accessible repositories that store, curate, and distribute molecular data according to shared standards.

2. **NCBI** is the primary gateway to biological data, hosting GenBank (nucleotide sequences), RefSeq, PubMed, and dozens of other databases connected by the Entrez search system.

3. **UniProt** is the world's most comprehensive protein database, divided into manually curated **Swiss-Prot** (high quality, smaller) and automatically annotated **TrEMBL** (comprehensive, larger).

4. **The Protein Data Bank** (PDB) is the global archive for experimentally determined three-dimensional structures of biological macromolecules.

5. **Ensembl** provides genome annotations, gene models, and comparative genomics data with stable identifiers and powerful programmatic access tools.

6. **Pathway databases** (KEGG, Reactome) and **interaction databases** (BioGRID, STRING, IntAct) represent biological relationships as graphs — the natural data structure for network-based analysis.

7. **Ontology databases** (Gene Ontology, Disease Ontology, Human Phenotype Ontology) provide structured vocabularies organized as directed acyclic graphs (DAGs) that enable standardized annotation and cross-database interoperability.

8. **Disease databases** (COSMIC, OMIM) and **metabolic databases** (BioCyc) provide specialized, deeply curated resources for cancer genomics, Mendelian genetics, and metabolic modeling.

9. **Hetionet** exemplifies the integrative database approach, combining data from 29 sources into a single heterogeneous knowledge graph for computational drug repurposing.

10. **Database cross-references** are the edges of the biological knowledge graph, linking records across databases and enabling data integration, identifier mapping, and network construction.

11. **Programmatic access** through REST APIs and batch download methods is essential for scalable bioinformatics work; always follow rate limits and usage policies.

12. **Data provenance** — recording database versions, evidence codes, curation status, and download dates — is critical for reproducible research.
