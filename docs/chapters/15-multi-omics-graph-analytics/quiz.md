# Quiz: Multi-Omics Integration and Graph Analytics

Test your understanding of multi-omics data integration, community detection algorithms, graph visualization, patient similarity networks, and network-based biomarker discovery.

---

#### 1. Why is a graph-based approach preferred over simple table concatenation for multi-omics integration?

<div class="upper-alpha" markdown>
1. Graph databases require less storage space than relational databases
2. Graphs preserve the relational structure between molecules (e.g., gene A regulates gene B which encodes protein C), which is lost when data is concatenated into a flat matrix
3. Table concatenation cannot handle missing data while graphs can
4. Graphs are faster to query than tables in all cases
</div>

??? question "Show Answer"
    The correct answer is **B**. While concatenating omics data into a wide matrix works for some statistical methods, it discards the known biological relationships between molecules across layers. A graph-based approach preserves the fact that genes regulate transcripts, transcripts encode proteins, and proteins catalyze metabolic reactions. These inter-layer edges are essential for mechanistic interpretation and for tracing causal chains from genotype to phenotype through multiple molecular layers.

    **Concept Tested:** Graph Model for Multi-Omics and Unified Omics Graph

---

#### 2. What does the Louvain algorithm optimize, and what is its purpose in biological network analysis?

<div class="upper-alpha" markdown>
1. It optimizes sequence alignment scores to identify homologous genes
2. It optimizes the modularity score to detect densely connected communities within a network, revealing functional modules in multi-omics graphs
3. It optimizes the shortest path between all pairs of nodes
4. It optimizes the layout coordinates for network visualization
</div>

??? question "Show Answer"
    The correct answer is **B**. The Louvain algorithm is a greedy optimization method for community detection that maximizes the modularity score $Q$, which measures the density of edges within communities relative to a random null model. In biological networks, detected communities often correspond to functional modules such as co-regulated gene sets, protein complexes, or metabolic sub-pathways. The Louvain algorithm is fast and scalable, handling networks with millions of nodes.

    **Concept Tested:** Louvain Algorithm and Modularity Score

---

#### 3. How does the Leiden algorithm improve upon the Louvain algorithm for community detection?

<div class="upper-alpha" markdown>
1. The Leiden algorithm uses a completely different optimization objective
2. The Leiden algorithm guarantees that all detected communities are connected, fixing a known weakness of Louvain which can produce disconnected communities
3. The Leiden algorithm only works on directed graphs
4. The Leiden algorithm runs in constant time regardless of network size
</div>

??? question "Show Answer"
    The correct answer is **B**. A known weakness of the Louvain algorithm is that it can produce communities that are internally disconnected, meaning some pairs of nodes within the same community have no path connecting them through other community members. The Leiden algorithm adds a refinement phase that guarantees community connectivity while maintaining comparable speed. This improvement matters biologically because a disconnected "module" is difficult to interpret as a coherent functional unit.

    **Concept Tested:** Leiden Algorithm

---

#### 4. What is a patient similarity network, and how is it used in precision medicine?

<div class="upper-alpha" markdown>
1. A social network connecting patients who share the same physician
2. A network where nodes represent patients and edges connect patients with similar multi-omics profiles, enabling identification of disease subtypes and patient stratification for treatment
3. A network of hospitals ranked by patient satisfaction scores
4. A database of patient medical records organized alphabetically
</div>

??? question "Show Answer"
    The correct answer is **B**. In a patient similarity network (PSN), each node represents a patient and edges connect patients whose molecular profiles (genomic variants, gene expression, protein levels, metabolite concentrations) are similar according to a defined metric. Community detection on PSNs identifies patient subgroups with distinct molecular characteristics, enabling patient stratification for targeted treatment. PSNs can also incorporate clinical features and are used to discover disease subtypes that predict treatment response and survival outcomes.

    **Concept Tested:** Patient Similarity Network and Patient Stratification

---

#### 5. What does the modularity score $Q$ measure in community detection?

<div class="upper-alpha" markdown>
1. The total number of communities found in the network
2. The average path length between nodes in different communities
3. The fraction of edges that fall within communities minus the expected fraction if edges were distributed randomly, quantifying the quality of a community partition
4. The number of hub nodes in each community
</div>

??? question "Show Answer"
    The correct answer is **C**. The modularity score $Q$ compares the fraction of edges within detected communities to the fraction expected under a random null model (typically the configuration model preserving degree distribution). $Q$ ranges from -0.5 to 1, with values above 0.3 generally indicating meaningful community structure. Higher $Q$ values indicate stronger within-community connectivity relative to random expectation. Both the Louvain and Leiden algorithms seek to maximize this score.

    **Concept Tested:** Modularity Score

---

#### 6. Why does protein abundance not always correlate with mRNA levels, and what implication does this have for multi-omics integration?

<div class="upper-alpha" markdown>
1. Proteins and mRNAs are measured in different units, making comparison impossible
2. Post-transcriptional regulation, protein stability, and degradation rates create a complex mapping; therefore inter-layer edges between transcriptomics and proteomics layers must be weighted by observed correlation
3. mRNA is measured in the nucleus while protein is measured in the cytoplasm, and these compartments never communicate
4. Protein abundance always exceeds mRNA abundance, so the two measurements are redundant
</div>

??? question "Show Answer"
    The correct answer is **B**. Multiple regulatory mechanisms operate between transcription and functional protein: post-transcriptional regulation (miRNAs, RNA-binding proteins), translational efficiency, protein folding, post-translational modifications, and protein degradation rates all affect the mRNA-to-protein mapping. This means that transcript-level changes do not always predict protein-level changes. In a unified omics graph, inter-layer edges connecting transcripts to proteins should be weighted by the observed correlation for each gene, reflecting the strength of this relationship.

    **Concept Tested:** Transcriptomics Layer and Proteomics Layer

---

#### 7. What is a force-directed layout algorithm used for in graph visualization?

<div class="upper-alpha" markdown>
1. Computing the shortest path between two nodes
2. Positioning nodes in 2D or 3D space by simulating physical forces — repulsion between all nodes and attraction along edges — to produce visually interpretable network layouts
3. Measuring the centrality of each node in the network
4. Detecting communities by grouping nodes based on edge density
</div>

??? question "Show Answer"
    The correct answer is **B**. Force-directed layout algorithms simulate a physical system where all nodes repel each other (like charged particles) and connected nodes attract each other (like springs along edges). The simulation iterates until it reaches equilibrium, producing a layout where closely connected nodes cluster together and unconnected nodes are pushed apart. Tools like Cytoscape, vis-network, and Gephi use force-directed layouts to make network structure visually apparent, though large networks may require additional layout strategies.

    **Concept Tested:** Force-Directed Layout and Graph Visualization

---

#### 8. What are network-based biomarkers, and how do they differ from single-gene biomarkers?

<div class="upper-alpha" markdown>
1. Network-based biomarkers are identified solely from protein structure databases
2. Network-based biomarkers are sets of functionally related genes identified through network analysis that collectively predict disease outcomes more robustly than individual genes
3. Network-based biomarkers use only metabolomics data while single-gene biomarkers use genomics
4. Network-based biomarkers always require graph neural networks for their discovery
</div>

??? question "Show Answer"
    The correct answer is **B**. Network-based biomarkers are gene modules or subnetwork signatures identified through graph analysis (community detection, network propagation) that collectively predict clinical outcomes. Unlike single-gene biomarkers, which are often not reproducible across cohorts due to biological variability and measurement noise, network-based biomarkers aggregate signal across functionally related genes, making them more robust and stable. They also provide mechanistic insight because the identified module maps to a coherent biological pathway.

    **Concept Tested:** Network-Based Biomarkers

---

#### 9. What is spectral clustering and what graph concept does it rely on?

<div class="upper-alpha" markdown>
1. Clustering based on the absorption spectrum of proteins measured by spectroscopy
2. A clustering method that uses the eigenvalues and eigenvectors of the graph Laplacian matrix to partition nodes into groups
3. A method that clusters nodes by their degree centrality
4. A visualization technique that assigns colors based on node type
</div>

??? question "Show Answer"
    The correct answer is **B**. Spectral clustering constructs the graph Laplacian matrix $L = D - A$ (where $D$ is the degree matrix and $A$ is the adjacency matrix), computes its eigenvalues and eigenvectors, and uses the eigenvectors corresponding to the smallest non-zero eigenvalues to embed nodes into a low-dimensional space. Standard clustering algorithms (like k-means) are then applied in this spectral embedding space. Spectral clustering can detect non-convex clusters that other methods miss and has theoretical connections to graph cuts.

    **Concept Tested:** Spectral Clustering

---

#### 10. In a unified omics graph, what are inter-layer edges and what biological information do they capture?

<div class="upper-alpha" markdown>
1. Edges that connect the graph to external databases via REST APIs
2. Edges that connect nodes across different omics layers, capturing biological mappings such as gene-to-transcript, transcript-to-protein, and protein-to-metabolite relationships
3. Edges within a single omics layer that have been verified by multiple experiments
4. Edges that represent patient-to-patient similarity across clinical features
</div>

??? question "Show Answer"
    The correct answer is **B**. Inter-layer edges connect nodes from different omics layers in the unified graph, capturing the biological relationships that link molecular levels. Gene-to-transcript edges reflect transcription (one-to-many from genome annotation), transcript-to-protein edges reflect translation (from UniProt cross-references), and protein-to-metabolite edges reflect enzymatic catalysis (from KEGG or Reactome). These edges are what make multi-omics integration more than simple concatenation — they enable tracing of causal chains across molecular layers.

    **Concept Tested:** Multi-Omics Integration
