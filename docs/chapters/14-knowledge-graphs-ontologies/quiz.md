# Quiz: Biomedical Knowledge Graphs and Ontologies

Test your understanding of Gene Ontology, knowledge graph construction, graph embeddings, link prediction, graph neural networks, and text mining for biology.

---

#### 1. What is GO term enrichment analysis used for?

<div class="upper-alpha" markdown>
1. Measuring the expression level of individual genes in an RNA-seq experiment
2. Determining whether a set of genes is statistically overrepresented for particular Gene Ontology terms compared to a background, bridging gene lists to biological interpretation
3. Aligning protein sequences to identify conserved domains
4. Predicting the three-dimensional structure of proteins based on their GO annotations
</div>

??? question "Show Answer"
    The correct answer is **B**. GO term enrichment analysis tests whether genes in a query set (e.g., differentially expressed genes) are annotated to specific GO terms more frequently than expected by chance. The standard statistical test is the hypergeometric test, with Benjamini-Hochberg correction for multiple testing. This analysis bridges the gap between a list of genes and biological interpretation by answering "what biological processes, molecular functions, or cellular components are these genes collectively involved in?"

    **Concept Tested:** GO Term Enrichment

---

#### 2. What is entity resolution in the context of knowledge graph construction?

<div class="upper-alpha" markdown>
1. Determining the three-dimensional coordinates of molecular entities
2. Identifying when different identifiers or names in different databases refer to the same real-world entity, such as mapping TP53, P53_HUMAN, and ENSG00000141510 to a single node
3. Resolving disputes between database curators about the function of a gene
4. Deleting duplicate records from a single database
</div>

??? question "Show Answer"
    The correct answer is **B**. Entity resolution (also called record linkage or entity disambiguation) identifies when different identifiers in different databases refer to the same biological entity. For example, the gene TP53 appears as "P53_HUMAN" in UniProt, "7157" in Entrez Gene, and "ENSG00000141510" in Ensembl. Entity resolution maps all of these to a single canonical node in the knowledge graph. Cross-reference databases like UniProt ID mapping and HGNC provide curated mappings to facilitate this process.

    **Concept Tested:** Entity Resolution

---

#### 3. How do graph embeddings like Node2Vec work, and what problem do they solve?

<div class="upper-alpha" markdown>
1. They compress graph images into smaller file sizes for web display
2. They map each node in a graph to a low-dimensional dense vector that preserves network structure, enabling machine learning algorithms to operate on graph data
3. They embed molecular structures into three-dimensional crystal lattices
4. They translate graph queries from Cypher to SQL
</div>

??? question "Show Answer"
    The correct answer is **B**. Graph embeddings like Node2Vec map each node in a graph to a dense, low-dimensional vector (typically 64-256 dimensions) such that nodes close in the network have similar vector representations. Node2Vec uses biased random walks to explore both local neighborhood structure (BFS-like) and broader community structure (DFS-like). These vector representations enable standard machine learning algorithms (classification, clustering, regression) to operate on graph-structured data for tasks like link prediction and node classification.

    **Concept Tested:** Graph Embeddings and Node2Vec

---

#### 4. What is link prediction in a knowledge graph, and why is it valuable for biomedicine?

<div class="upper-alpha" markdown>
1. Predicting which web hyperlinks will break in the future
2. Predicting missing edges (relationships) between entities in a knowledge graph, such as undiscovered drug-disease associations or gene-function annotations
3. Linking database records to published papers in PubMed
4. Predicting the number of edges a new node will acquire after being added to the graph
</div>

??? question "Show Answer"
    The correct answer is **B**. Link prediction estimates the likelihood of unobserved edges in a knowledge graph based on existing graph structure and entity properties. In biomedicine, this enables prediction of novel drug-disease treatment relationships, undiscovered protein-protein interactions, or missing gene-function annotations. Methods include knowledge graph embeddings (TransE, RotatE), graph neural networks, and topological heuristics. Link prediction is especially valuable because biomedical knowledge graphs are inherently incomplete.

    **Concept Tested:** Link Prediction

---

#### 5. What is the key difference between TransE and Node2Vec as graph embedding methods?

<div class="upper-alpha" markdown>
1. TransE works only on undirected graphs while Node2Vec works only on directed graphs
2. TransE models relation-specific translations in embedding space (head + relation approximately equals tail), while Node2Vec learns node embeddings from random walks without modeling relation types
3. Node2Vec requires labeled training data while TransE is fully unsupervised
4. TransE produces higher-dimensional embeddings than Node2Vec
</div>

??? question "Show Answer"
    The correct answer is **B**. TransE is a knowledge graph embedding method that models each relation as a translation vector in embedding space, learning embeddings such that $\mathbf{h} + \mathbf{r} \approx \mathbf{t}$ for valid triples $(h, r, t)$. This explicitly captures relation types. Node2Vec learns node embeddings from biased random walks on the graph, capturing structural similarity but without explicitly modeling different relation types. TransE is better suited for multi-relational knowledge graphs, while Node2Vec works well for homogeneous networks.

    **Concept Tested:** TransE and Knowledge Graph Embedding

---

#### 6. How do graph neural networks (GNNs) use the message passing framework?

<div class="upper-alpha" markdown>
1. By sending text messages between researchers who study the same proteins
2. By iteratively aggregating feature information from a node's neighbors to update the node's representation, allowing the network to learn from graph structure
3. By passing graph data between different database servers
4. By converting graph structures into tabular data for traditional neural networks
</div>

??? question "Show Answer"
    The correct answer is **B**. In the message passing framework, each node aggregates feature vectors from its neighbors, combines them with its own features, and passes the result through a neural network layer to update its representation. After $k$ rounds of message passing, each node's representation encodes information from its $k$-hop neighborhood. This framework enables GNNs to learn from both node features and graph topology simultaneously, making them effective for molecular property prediction, protein function classification, and link prediction.

    **Concept Tested:** Graph Neural Networks and Message Passing

---

#### 7. What is semantic similarity in the context of biomedical ontologies?

<div class="upper-alpha" markdown>
1. The percentage of shared characters between two term names
2. A quantitative measure of how closely related two ontology terms are based on their positions in the DAG, using information content of their most informative common ancestor
3. The number of publications that mention both terms together
4. The Euclidean distance between two terms in a word embedding space
</div>

??? question "Show Answer"
    The correct answer is **B**. Semantic similarity quantifies relatedness between ontology terms based on their DAG structure. The Resnik similarity uses the information content of the most informative common ancestor (MICA), where $IC(t) = -\log p(t)$ and $p(t)$ is the annotation frequency. More specific shared ancestors yield higher similarity. This metric is used in phenotype-driven disease diagnosis, where a patient's HPO terms are compared against known disease profiles to rank candidate diagnoses.

    **Concept Tested:** Semantic Similarity

---

#### 8. What role does named entity recognition (NER) play in text mining for biology?

<div class="upper-alpha" markdown>
1. It identifies and classifies mentions of biological entities (genes, diseases, drugs) in unstructured text, enabling automated extraction of knowledge from scientific literature
2. It translates biological entity names between different languages
3. It corrects spelling errors in database entries
4. It assigns unique numerical identifiers to all proteins in a genome
</div>

??? question "Show Answer"
    The correct answer is **A**. Named entity recognition identifies mentions of biological entities (gene names, disease names, drug names, chemical compounds) in unstructured text such as journal articles and clinical notes. NER is the first step in a text mining pipeline that extracts structured knowledge from the biomedical literature. Combined with relation extraction (identifying relationships between detected entities), NER enables automated population of knowledge graphs from millions of published papers.

    **Concept Tested:** Named Entity Recognition and Text Mining for Biology

---

#### 9. Why is the Gene Ontology organized as a directed acyclic graph (DAG) rather than a simple tree?

<div class="upper-alpha" markdown>
1. A DAG uses less storage space than a tree structure
2. A tree structure would require choosing only one parent for each term, losing important biological relationships where terms belong to multiple categories
3. DAGs are easier to query than trees in graph databases
4. The Gene Ontology committee preferred DAGs for historical reasons with no scientific justification
</div>

??? question "Show Answer"
    The correct answer is **B**. A tree restricts each term to a single parent, but biological concepts often belong to multiple categories. For example, "glucose transport" is both a type of "carbohydrate transport" and a type of "sugar import." A DAG allows multiple parents, preserving these important biological relationships. If GO used a tree, curators would be forced to choose one parent and lose the other relationship, reducing the ontology's ability to capture biological nuance.

    **Concept Tested:** Ontology Structure

---

#### 10. How does Hetionet exemplify the power of biomedical knowledge graphs?

<div class="upper-alpha" markdown>
1. It stores the complete genome sequences of all known organisms
2. It integrates data from 29 sources into a heterogeneous network of 11 node types and 24 edge types, enabling multi-hop reasoning for tasks like computational drug repurposing
3. It provides a web interface for manual curation of protein structures
4. It replaces the need for all other biological databases
</div>

??? question "Show Answer"
    The correct answer is **B**. Hetionet integrates data from 29 public resources into a single heterogeneous network containing over 47,000 nodes of 11 types (genes, compounds, diseases, anatomies, etc.) and over 2.2 million edges of 24 types. This unified graph structure enables multi-hop reasoning that spans data types — for example, predicting new drug-disease treatment relationships by traversing paths from a drug through its targets, shared pathways, and into disease modules. Hetionet demonstrates that graph integration reveals relationships no single database could expose alone.

    **Concept Tested:** Hetionet and Biomedical Knowledge Graph
