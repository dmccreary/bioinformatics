---
title: Biomedical Knowledge Graphs and Ontologies
description: Gene Ontology, knowledge graph construction, graph embeddings, link prediction, GNNs, and text mining for biology
generated_by: claude skill chapter-content-generator
date: 2026-03-25 00:00:00
version: 0.05
---

# Biomedical Knowledge Graphs and Ontologies

## Summary

Introduces Gene Ontology and disease ontologies, biomedical knowledge graph construction from heterogeneous data, graph embeddings (Node2Vec, TransE), link prediction, graph neural networks for molecular property prediction, and text mining.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Knowledge Graph
2. Biomedical Knowledge Graph
3. Gene Ontology
4. GO Molecular Function
5. GO Biological Process
6. GO Cellular Component
7. GO Term Enrichment
8. Disease Ontology
9. Human Phenotype Ontology
10. Ontology Structure
11. Ontology Reasoning
12. Semantic Similarity
13. Heterogeneous Data
14. Data Integration
15. Schema Mapping
16. Entity Resolution
17. Graph Embeddings
18. Node2Vec
19. TransE
20. Knowledge Graph Embedding
21. Link Prediction
22. Triple Classification
23. Relation Extraction
24. Named Entity Recognition
25. Text Mining for Biology
26. Graph Neural Networks
27. Message Passing
28. GNN for Molecules
29. Graph Model for Knowledge
30. Hetionet

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Biological Databases](../02-biological-databases/index.md)
- [Chapter 4: Graph Theory Fundamentals](../04-graph-theory-fundamentals/index.md)
- [Chapter 5: Graph Databases and Query Languages](../05-graph-databases-query-languages/index.md)
- [Chapter 8: Structural Bioinformatics and Molecular Interactions](../08-structural-bioinformatics/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    Throughout this course we have modeled sequences as graphs, phylogenies as trees, protein interactions as networks, and metabolic reactions as hypergraphs. Now we bring all of those representations together inside a single unified structure: the **knowledge graph**. In this chapter we will explore how biomedical ontologies give meaning to nodes and edges, how graph embeddings compress vast networks into learnable vectors, and how graph neural networks predict molecular properties. This is the capstone of our graph journey -- let's connect the dots!

## What Is a Knowledge Graph?

A **knowledge graph** is a directed, labeled multigraph in which nodes represent real-world entities and edges represent typed relationships between them. Every edge is stored as a triple $(h, r, t)$ where $h$ is the head entity, $r$ is the relation type, and $t$ is the tail entity. For example, the triple (TP53, associated_with, Li-Fraumeni syndrome) states that the gene TP53 is associated with a specific cancer predisposition syndrome. Because entities and relations carry explicit types and labels, knowledge graphs are inherently semantic: they encode not just structure but meaning.

A **biomedical knowledge graph** specializes this framework by drawing its entities from the life sciences -- genes, proteins, diseases, drugs, pathways, anatomical structures, and phenotypes -- and its relations from curated biological databases and the scientific literature. Biomedical knowledge graphs are distinguished by their extreme heterogeneity: a single graph may contain dozens of node types and hundreds of edge types. This heterogeneity is a strength, because it allows a single query to traverse from a drug to its protein target, through a signaling pathway (Chapter 13), into a disease module, and out to a clinical phenotype -- all within one connected structure.

#### Diagram: Anatomy of a Biomedical Knowledge Graph

<iframe src="../../sims/biomedical-kg-anatomy/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Biomedical Knowledge Graph Anatomy MicroSim Fullscreen](../../sims/biomedical-kg-anatomy/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: biomedical-kg-anatomy
Library: vis-network
Status: Specified

A heterogeneous graph with color-coded node types: genes (blue), diseases (red), drugs (green), phenotypes (orange), and GO terms (purple). Edges are labeled with relation types such as "targets," "associated_with," "treats," and "annotated_to." A legend maps colors to entity types.
</details>

The idea of a **graph model for knowledge** is not new -- semantic web technologies like RDF and OWL have used triples for decades -- but the explosion of biomedical data has made knowledge graphs indispensable for modern bioinformatics. Where traditional relational databases require rigid schemas and expensive JOIN operations to connect disparate tables (Chapter 5), knowledge graphs store relationships as first-class citizens, making multi-hop queries natural and efficient.

## Ontologies: The Backbone of Biomedical Knowledge

An ontology is a formal specification of a shared conceptualization. In practice, a biomedical ontology defines a controlled vocabulary of terms, organizes those terms into a hierarchy, and specifies the logical relationships among them. The **ontology structure** of most biomedical ontologies is a directed acyclic graph (DAG), not a simple tree, because a single term can have multiple parents. For example, the Gene Ontology term "cell adhesion" is a child of both "biological adhesion" and "cellular process."

### The Gene Ontology

The **Gene Ontology** (GO) is the most widely used ontology in bioinformatics. It provides a structured vocabulary for describing gene and protein function across all organisms. GO is organized into three independent sub-ontologies, each capturing a different dimension of function:

- **GO Molecular Function** describes the elemental activities of a gene product at the biochemical level -- what a protein does in isolation. Examples include "protein kinase activity," "DNA binding," and "ATP hydrolase activity." A molecular function term answers the question "what does this protein do?"

- **GO Biological Process** describes the larger biological objectives accomplished by ordered assemblies of molecular functions. Examples include "apoptotic process," "signal transduction," and "DNA repair." A biological process term answers the question "why does the cell need this activity?"

- **GO Cellular Component** describes the subcellular location or macromolecular complex where a gene product performs its function. Examples include "nucleus," "mitochondrial inner membrane," and "proteasome complex." A cellular component term answers the question "where in the cell does this happen?"

| Sub-Ontology | Question Answered | Example Terms | Approximate Term Count |
|---|---|---|---|
| Molecular Function | What does it do? | Kinase activity, DNA binding | ~12,000 |
| Biological Process | Why is it needed? | Apoptosis, DNA repair | ~30,000 |
| Cellular Component | Where does it act? | Nucleus, ribosome | ~4,500 |

Each GO annotation links a gene product to a GO term together with an evidence code indicating the type of experimental or computational support. Evidence codes range from IDA (Inferred from Direct Assay) for high-confidence experimental results to IEA (Inferred from Electronic Annotation) for automated predictions. The combination of a structured vocabulary, a DAG hierarchy, and evidence-backed annotations makes GO an extraordinarily powerful resource for functional analysis.

!!! mascot-thinking "Think About It: Why a DAG Instead of a Tree?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    If GO used a strict tree structure, every term could have only one parent, and we would lose crucial biological nuance. "Glucose transport" is both a "carbohydrate transport" and a "sugar import" -- forcing a single-parent hierarchy would require us to choose one, losing the other relationship. The DAG structure lets biology, not data-modeling convenience, dictate the hierarchy.

### GO Term Enrichment Analysis

**GO term enrichment** analysis determines whether a set of genes (for example, the differentially expressed genes from a transcriptomics experiment in Chapter 11) is statistically enriched for particular GO terms compared to a background gene set. The standard statistical test is the hypergeometric test. Given a universe of $N$ genes, of which $K$ are annotated to a specific GO term, and a query set of $n$ genes, of which $k$ are annotated to the term, the probability of observing $k$ or more annotated genes by chance is:

$$P(X \geq k) = 1 - \sum_{i=0}^{k-1} \frac{\binom{K}{i}\binom{N-K}{n-i}}{\binom{N}{n}}$$

A small $p$-value indicates that the GO term is significantly overrepresented in the query set. Because thousands of GO terms are tested simultaneously, multiple testing correction (typically Benjamini-Hochberg false discovery rate) is essential. GO enrichment analysis bridges the gap between a list of genes and biological interpretation -- it answers the question "what processes are these genes collectively involved in?"

### Disease and Phenotype Ontologies

Beyond GO, several ontologies capture disease and phenotypic knowledge. The **Disease Ontology** (DO) provides a hierarchical classification of human diseases organized by etiology, anatomical site, and clinical presentation. DO terms link diseases to their genetic basis, enabling queries such as "find all genes associated with autoimmune diseases" by traversing the ontology DAG from a broad category to its children.

The **Human Phenotype Ontology** (HPO) describes the clinical phenotypes -- observable signs and symptoms -- associated with human genetic diseases. HPO is particularly valuable for rare disease diagnosis (Capstone Project 2) because it allows clinicians to encode a patient's phenotypic profile as a set of HPO terms and then compute the similarity between that profile and known disease phenotype profiles using graph-based metrics.

### Ontology Reasoning and Semantic Similarity

**Ontology reasoning** exploits the logical structure of the DAG to infer implicit knowledge from explicit annotations. The most common reasoning rule is the "true path rule": if a gene product is annotated to a GO term, it is implicitly annotated to all ancestor terms as well. This propagation allows enrichment analyses to capture broad functional themes even when individual annotations are very specific.

**Semantic similarity** quantifies how closely related two ontology terms (or two genes) are based on their positions in the DAG. The information content (IC) of a term $t$ is defined as $IC(t) = -\log p(t)$, where $p(t)$ is the frequency of annotations to $t$ and its descendants. The Resnik similarity between two terms is the IC of their most informative common ancestor (MICA):

$$sim_{Resnik}(t_1, t_2) = IC(MICA(t_1, t_2))$$

Higher IC values correspond to more specific (and therefore more informative) shared ancestors. Semantic similarity is the computational backbone of phenotype-driven disease diagnosis, where a patient's HPO term set is compared against all known disease profiles to generate a ranked list of candidate diagnoses.

## Building Knowledge Graphs from Heterogeneous Data

Real-world biomedical data is scattered across hundreds of databases, each with its own schema, identifier system, and update cycle. Constructing a biomedical knowledge graph requires integrating this **heterogeneous data** into a unified graph structure -- a process that involves three major challenges: schema mapping, entity resolution, and data integration.

**Schema mapping** is the process of aligning the data models of different source databases so that their entities and relationships can be represented in a common graph schema. For example, one database might store protein-disease associations as a two-column table with UniProt IDs and OMIM disease IDs, while another stores them as RDF triples with Entrez Gene IDs and Disease Ontology IDs. Schema mapping defines how these different representations correspond to the same edge type in the target knowledge graph.

**Entity resolution** (also called record linkage or entity disambiguation) identifies when different identifiers or names in different databases refer to the same real-world entity. The gene TP53 may appear as "P53_HUMAN" in UniProt, "7157" in Entrez Gene, and "ENSG00000141510" in Ensembl. Entity resolution maps all of these to a single canonical node in the knowledge graph. Cross-reference databases like UniProt ID mapping and the HUGO Gene Nomenclature Committee (HGNC) provide curated mappings that facilitate this process.

**Data integration** is the overarching process of combining schema-mapped, entity-resolved data from multiple sources into a single coherent knowledge graph. A typical biomedical knowledge graph integration pipeline extracts triples from each source database, normalizes identifiers, resolves conflicts (such as contradictory interaction directions), assigns confidence scores, and loads the resulting triples into a graph database for querying.

#### Diagram: Knowledge Graph Construction Pipeline

<iframe src="../../sims/kg-construction-pipeline/main.html" width="100%" height="500" scrolling="no"></iframe>

*[View Knowledge Graph Construction Pipeline MicroSim Fullscreen](../../sims/kg-construction-pipeline/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: kg-construction-pipeline
Library: vis-network
Status: Specified

A left-to-right flowchart showing multiple source databases (UniProt, OMIM, DrugBank, GO) feeding into extraction nodes, then schema mapping, entity resolution, and data integration steps, ending with a single unified knowledge graph node. Arrows are labeled with the transformation at each stage.
</details>

!!! mascot-tip "Tip: Start with Established Knowledge Graphs"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    Building a biomedical knowledge graph from scratch is a massive engineering effort. Before starting your own, investigate whether an existing resource meets your needs. Hetionet, the Monarch Initiative, the Biological Expression Language (BEL), and the Open Biological and Biomedical Ontology (OBO) Foundry all provide curated, ready-to-use knowledge graphs and ontologies.

### Case Study: Hetionet

**Hetionet** is an open-source biomedical knowledge graph that integrates data from 29 public databases into a single heterogeneous network. It contains 47,031 nodes of 11 types (genes, compounds, diseases, anatomies, pathways, biological processes, cellular components, molecular functions, side effects, pharmacologic classes, and symptoms) and 2,250,197 edges of 24 types. Hetionet was specifically designed to support drug repurposing through systematic exploration of the paths connecting compounds to diseases (Case Study 2).

The power of Hetionet lies in its ability to encode indirect relationships. A drug may not directly treat a particular disease, but Hetionet can reveal that the drug targets a protein that participates in a biological process that is disrupted in the disease. By extracting and scoring all such metapaths -- sequences of edge types connecting a compound to a disease -- researchers identified novel drug repurposing candidates that were subsequently validated in independent datasets.

| Hetionet Feature | Value |
|---|---|
| Nodes | 47,031 |
| Node types | 11 |
| Edges | 2,250,197 |
| Edge types | 24 |
| Source databases | 29 |
| Primary application | Drug repurposing |

## Graph Embeddings for Biomedical Knowledge

The knowledge graphs we have been discussing may contain millions of nodes and edges. To make this information accessible to machine learning algorithms, we need to compress the graph structure into dense, low-dimensional vectors -- a process called **graph embeddings**. Each node (and sometimes each edge) is mapped to a vector in $\mathbb{R}^d$ such that the geometric relationships between vectors reflect the topological relationships in the graph. Once nodes are embedded, standard machine learning algorithms can perform tasks like link prediction, node classification, and clustering.

### Node2Vec: Random Walks on Graphs

**Node2Vec** extends the word2vec idea from natural language processing to graphs. Just as word2vec learns word embeddings from sequences of words in sentences, Node2Vec learns node embeddings from sequences of nodes generated by random walks on the graph. The key innovation is the use of biased random walks that interpolate between breadth-first search (BFS) and depth-first search (DFS) exploration strategies.

Given a random walk that has just traversed edge $(t, v)$ and is now at node $v$, the probability of transitioning to a neighbor $x$ of $v$ is:

$$P(c_i = x \mid c_{i-1} = v) = \frac{\alpha_{pq}(t, x) \cdot w_{vx}}{Z}$$

where $w_{vx}$ is the edge weight, $Z$ is a normalizing constant, and $\alpha_{pq}$ is the search bias defined as:

$$\alpha_{pq}(t, x) = \begin{cases} \frac{1}{p} & \text{if } d_{tx} = 0 \\ 1 & \text{if } d_{tx} = 1 \\ \frac{1}{q} & \text{if } d_{tx} = 2 \end{cases}$$

Here $d_{tx}$ is the shortest-path distance between the previous node $t$ and the candidate next node $x$. The return parameter $p$ controls the likelihood of immediately revisiting the previous node (low $p$ encourages backtracking), while the in-out parameter $q$ governs whether the walk explores the local neighborhood (high $q$, BFS-like) or ventures further away (low $q$, DFS-like). BFS-like walks capture structural equivalence (nodes that play similar roles), while DFS-like walks capture homophily (nodes in the same community). In a biomedical knowledge graph, tuning $p$ and $q$ allows Node2Vec to learn embeddings that emphasize either local functional similarity or global pathway membership.

#### Diagram: Node2Vec Biased Random Walk

<iframe src="../../sims/node2vec-random-walk/main.html" width="100%" height="540" scrolling="no"></iframe>

*[View Node2Vec Random Walk MicroSim Fullscreen](../../sims/node2vec-random-walk/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: node2vec-random-walk
Library: p5.js
Status: Specified

An animated graph with nodes and edges. A walker (highlighted circle) moves step by step along a random walk. At each step, candidate neighbors are shown with their transition probabilities labeled as 1/p, 1, or 1/q depending on their distance to the previous node. Sliders control p and q values and the animation shows how walk behavior changes.
</details>

### TransE: Translating Embeddings for Knowledge Graphs

While Node2Vec treats the graph as homogeneous (ignoring edge types), **knowledge graph embedding** methods explicitly model the different relation types. **TransE** is the foundational model in this family. Its core idea is elegant: if a triple $(h, r, t)$ holds, then the embedding of the head entity plus the embedding of the relation should be close to the embedding of the tail entity:

$$\mathbf{h} + \mathbf{r} \approx \mathbf{t}$$

The scoring function measures how well a triple satisfies this translation constraint:

$$f(h, r, t) = -\|\mathbf{h} + \mathbf{r} - \mathbf{t}\|_{L_1 \text{ or } L_2}$$

Higher scores (less negative) indicate more plausible triples. TransE is trained by minimizing a margin-based ranking loss that pushes the score of true triples above the score of corrupted (false) triples:

$$\mathcal{L} = \sum_{(h,r,t) \in S} \sum_{(h',r,t') \in S'} \max(0, \gamma + f(h',r,t') - f(h,r,t))$$

where $S$ is the set of observed triples, $S'$ is the set of corrupted triples (generated by replacing $h$ or $t$ with a random entity), and $\gamma$ is the margin hyperparameter. TransE works well for one-to-one relations but struggles with one-to-many and many-to-many relations (for example, "gene -- participates_in -- pathway" where many genes participate in the same pathway). Extensions such as TransR, RotatE, and ComplEx address these limitations by using more expressive transformation functions.

!!! mascot-thinking "Think About It: Why Does Translation Work for Relations?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Consider the analogy from word embeddings: "king" - "man" + "woman" $\approx$ "queen." The vector from "man" to "king" is approximately the same as the vector from "woman" to "queen." TransE applies the same logic: the relation vector $\mathbf{r}$ for "treats" should translate any drug entity close to the disease it treats. Relations become directional offsets in embedding space.

## Link Prediction and Triple Classification

Once entities and relations are embedded, the most powerful downstream task is **link prediction**: given a head entity and a relation, predict the most likely tail entity, or vice versa. In a biomedical knowledge graph, link prediction can answer questions like "which diseases might drug X treat?" or "which genes might be associated with disease Y?" -- questions that are central to drug repurposing (Case Study 2) and rare disease diagnosis (Capstone Project 2).

Link prediction works by scoring all candidate triples and ranking them. For a query $(h, r, ?)$, the model computes $f(h, r, t')$ for every candidate entity $t'$ and returns the top-ranked candidates. Standard evaluation metrics include Mean Reciprocal Rank (MRR) and Hits@K (the fraction of true tail entities that appear in the top $K$ predictions).

**Triple classification** is a related task that determines whether a given triple $(h, r, t)$ is true or false. A threshold $\delta_r$ is learned for each relation type: if $f(h, r, t) > \delta_r$, the triple is classified as positive. Triple classification is useful for validating computationally predicted interactions -- for example, determining whether a predicted gene-disease association is likely to be real.

| Task | Input | Output | Biomedical Application |
|---|---|---|---|
| Link prediction | $(h, r, ?)$ or $(?, r, t)$ | Ranked entity list | Drug repurposing, gene-disease discovery |
| Triple classification | $(h, r, t)$ | True / False | Interaction validation |
| Relation extraction | Entity pair + text | Relation type | Literature curation |

## Text Mining for Biomedical Knowledge

A large fraction of biomedical knowledge exists only in unstructured text -- the 36 million abstracts in PubMed and millions of full-text articles. **Text mining for biology** extracts structured information from this text and adds it to knowledge graphs, ensuring that the latest findings are captured even before they appear in curated databases.

The text mining pipeline begins with **named entity recognition** (NER), the task of identifying mentions of biomedical entities (genes, diseases, drugs, mutations) in text. Modern biomedical NER systems use transformer-based language models (such as BioBERT and PubMedBERT) fine-tuned on annotated corpora. Given the sentence "Mutations in BRCA1 are associated with hereditary breast cancer," a NER system would identify "BRCA1" as a gene and "hereditary breast cancer" as a disease.

After entities are identified, **relation extraction** determines the semantic relationship between pairs of entities mentioned in the same sentence or document. In our example, the system would extract the triple (BRCA1, associated_with, hereditary breast cancer). Relation extraction models are typically trained on curated datasets of known biomedical relationships and can be formulated as sequence classification tasks using the same transformer architectures.

#### Diagram: Text Mining Pipeline for Knowledge Graph Population

<iframe src="../../sims/text-mining-pipeline/main.html" width="100%" height="500" scrolling="no"></iframe>

*[View Text Mining Pipeline MicroSim Fullscreen](../../sims/text-mining-pipeline/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: text-mining-pipeline
Library: vis-network
Status: Specified

A left-to-right flowchart showing a PubMed abstract as input, followed by NER (with highlighted entity spans), relation extraction (with labeled arcs between entities), and finally new triples being added to a knowledge graph. Color-coded entity types match the knowledge graph node colors.
</details>

The combination of NER and relation extraction enables large-scale automated knowledge graph construction. The PubTator system, for example, has annotated over 36 million PubMed abstracts with gene, disease, chemical, mutation, and species mentions, providing a rich source of candidate triples for knowledge graph expansion. However, automated extraction introduces noise, so confidence scores and human validation remain essential quality controls.

## Graph Neural Networks for Biomedical Applications

While graph embeddings like Node2Vec and TransE learn static vectors for each node, **graph neural networks** (GNNs) learn dynamic representations that incorporate both node features and graph structure through a process called **message passing**. GNNs have become the state-of-the-art approach for molecular property prediction, drug discovery, and knowledge graph reasoning.

### The Message Passing Framework

In a GNN, each node $v$ maintains a feature vector $\mathbf{h}_v$ that is iteratively updated by aggregating information from its neighbors. At each layer $l$, the message passing update consists of three steps:

$$\mathbf{m}_v^{(l)} = \text{AGGREGATE}\left(\left\{\mathbf{h}_u^{(l-1)} : u \in \mathcal{N}(v)\right\}\right)$$

$$\mathbf{h}_v^{(l)} = \text{UPDATE}\left(\mathbf{h}_v^{(l-1)}, \mathbf{m}_v^{(l)}\right)$$

The AGGREGATE function collects messages from all neighbors $\mathcal{N}(v)$ of node $v$, and the UPDATE function combines the aggregated message with the node's current representation. Common choices for AGGREGATE include sum, mean, and max pooling; the UPDATE function is typically a neural network layer with a nonlinear activation. After $L$ layers of message passing, each node's representation encodes information from its $L$-hop neighborhood in the graph.

This framework directly connects to the graph concepts we studied in Chapter 4: the neighborhood $\mathcal{N}(v)$ is the set of adjacent nodes in the adjacency list, and $L$ layers of message passing correspond to exploring the $L$-hop ego graph around each node.

### GNNs for Molecular Property Prediction

One of the most successful applications of GNNs in bioinformatics is **GNN for molecules**. A molecule is naturally represented as a graph where atoms are nodes and chemical bonds are edges. Node features encode atomic properties (element type, degree, charge, aromaticity) and edge features encode bond properties (single, double, triple, aromatic). A GNN processes this molecular graph through several message passing layers, producing atom-level representations that are then pooled into a single molecular representation for property prediction.

$$\mathbf{h}_{\text{mol}} = \text{READOUT}\left(\left\{\mathbf{h}_v^{(L)} : v \in V\right\}\right)$$

The READOUT function (often sum or attention-weighted pooling) produces a fixed-size vector regardless of molecular size. This molecular embedding can then be fed into a classifier or regressor to predict properties such as solubility, toxicity, binding affinity, or blood-brain barrier permeability. Unlike traditional molecular fingerprints (Chapter 8), GNN-learned representations are task-specific and can capture subtle structural features that fixed fingerprints miss.

| GNN Architecture | AGGREGATE | Key Innovation | Biomedical Use |
|---|---|---|---|
| GCN | Normalized mean | Spectral convolution | Protein function prediction |
| GAT | Attention-weighted sum | Learned attention weights | Drug-target interaction |
| MPNN | Edge-conditioned sum | Edge feature integration | Molecular property prediction |
| SchNet | Continuous filter | 3D distance encoding | Binding energy prediction |

!!! mascot-warning "Watch Out: Over-Smoothing in Deep GNNs"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    Stacking too many message passing layers causes all node representations to converge to the same vector -- a phenomenon called over-smoothing. In practice, most molecular GNNs use only 3-5 layers. If your task requires capturing long-range interactions, consider skip connections, virtual nodes, or transformer-based architectures instead of simply adding more layers.

### GNNs for Knowledge Graph Reasoning

GNNs can also be applied directly to knowledge graphs for link prediction and node classification. Relational Graph Convolutional Networks (R-GCNs) extend the message passing framework to heterogeneous graphs by using different weight matrices for different relation types:

$$\mathbf{h}_v^{(l)} = \sigma\left(\sum_{r \in \mathcal{R}} \sum_{u \in \mathcal{N}_r(v)} \frac{1}{|\mathcal{N}_r(v)|} \mathbf{W}_r^{(l)} \mathbf{h}_u^{(l-1)} + \mathbf{W}_0^{(l)} \mathbf{h}_v^{(l-1)}\right)$$

where $\mathcal{R}$ is the set of relation types, $\mathcal{N}_r(v)$ is the set of neighbors connected to $v$ via relation $r$, and $\mathbf{W}_r^{(l)}$ is the relation-specific weight matrix at layer $l$. This formulation allows the GNN to learn different aggregation patterns for different types of biological relationships -- treating a "targets" edge differently from an "associated_with" edge.

## Putting It All Together: From Ontology to Prediction

The concepts in this chapter form a complete computational pipeline for biomedical discovery. Ontologies (GO, DO, HPO) provide the semantic framework that defines what entities and relationships mean. Data integration techniques (schema mapping, entity resolution) construct knowledge graphs from heterogeneous sources. Graph embedding methods (Node2Vec, TransE) compress these graphs into machine-learnable representations. Link prediction and triple classification leverage those embeddings to generate novel hypotheses. Text mining expands the knowledge graph with the latest findings from the literature. And GNNs provide the most expressive framework for learning from both graph structure and node features simultaneously.

#### Diagram: Integrated Knowledge Graph Pipeline

<iframe src="../../sims/kg-integrated-pipeline/main.html" width="100%" height="600" scrolling="no"></iframe>

*[View Integrated Knowledge Graph Pipeline MicroSim Fullscreen](../../sims/kg-integrated-pipeline/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: kg-integrated-pipeline
Library: vis-network
Status: Specified

A comprehensive flowchart showing the full pipeline: ontologies and databases at the top feeding into a knowledge graph construction layer, then branching into three paths -- graph embeddings (Node2Vec, TransE), GNNs (message passing), and text mining (NER, relation extraction). All three paths converge on downstream tasks: link prediction, drug repurposing, and disease diagnosis. Arrows labeled with data flow descriptions.
</details>

This pipeline is the engine behind both Case Study 2 (drug repurposing with Hetionet) and Capstone Project 2 (rare disease diagnosis). In Case Study 2, researchers used Hetionet's knowledge graph structure, extracted metapath features, and trained classifiers to predict novel compound-disease treatment pairs. In Capstone Project 2, students build a diagnosis system that encodes patient phenotypes as HPO terms, computes semantic similarity against known disease profiles, and uses link prediction on a knowledge graph to prioritize candidate disease genes. Both applications demonstrate how the graph concepts from every chapter in this course -- from basic graph theory (Chapter 4) and graph databases (Chapter 5) through protein interaction networks (Chapter 9), regulatory networks (Chapter 11), metabolic networks (Chapter 12), and signaling networks (Chapter 13) -- converge in the knowledge graph framework.

!!! mascot-celebration "Congratulations, Investigators!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You have now seen how every graph concept in this course connects to a single, powerful framework: the biomedical knowledge graph. From DAG-structured ontologies to biased random walks, from translation-based embeddings to message-passing neural networks, you have the tools to model, integrate, and reason over the full complexity of biological knowledge. Follow the edges -- they lead everywhere!

## Key Takeaways

1. A **knowledge graph** stores biomedical information as typed triples $(h, r, t)$, unifying genes, diseases, drugs, and pathways in a single queryable structure.

2. The **Gene Ontology** organizes gene function into three sub-ontologies (Molecular Function, Biological Process, Cellular Component) structured as DAGs, enabling GO term enrichment analysis via the hypergeometric test.

3. **Disease Ontology** and **Human Phenotype Ontology** provide structured vocabularies for diseases and clinical phenotypes, supporting semantic similarity computation for phenotype-driven diagnosis.

4. Building knowledge graphs from **heterogeneous data** requires **schema mapping**, **entity resolution**, and careful **data integration** across dozens of source databases.

5. **Node2Vec** generates node embeddings through biased random walks controlled by parameters $p$ (return) and $q$ (in-out), interpolating between BFS and DFS exploration strategies.

6. **TransE** embeds knowledge graph triples using the translation principle $\mathbf{h} + \mathbf{r} \approx \mathbf{t}$, enabling **link prediction** and **triple classification** for hypothesis generation.

7. **Text mining** combines **named entity recognition** and **relation extraction** to populate knowledge graphs from the biomedical literature at scale.

8. **Graph neural networks** use **message passing** to learn node representations that incorporate both features and local graph structure, with powerful applications to **molecular property prediction**.

9. **Hetionet** demonstrates the practical power of biomedical knowledge graphs, integrating 29 databases and 24 edge types to support systematic drug repurposing.

10. This chapter's concepts form a complete pipeline -- from ontology design through graph construction, embedding, and prediction -- that serves as the capstone of the graph-based approach to bioinformatics developed throughout this course.

[See Annotated References](./references.md)
