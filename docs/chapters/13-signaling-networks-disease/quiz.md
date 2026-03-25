# Quiz: Signaling Networks and Disease Modules

Test your understanding of cell signaling as directed graphs, network medicine, disease modules, drug repurposing, and cancer genomics.

---

#### 1. What is a disease module in the context of network medicine?

<div class="upper-alpha" markdown>
1. A software tool for diagnosing diseases based on patient symptoms
2. A connected subgraph within the human interactome where disease-associated genes cluster together, reflecting dysfunction of coherent molecular pathways
3. A laboratory protocol for testing drug candidates against disease targets
4. A database entry describing a single disease and its symptoms
</div>

??? question "Show Answer"
    The correct answer is **B**. A disease module is a connected subgraph within the human protein interaction network where genes associated with a particular disease tend to cluster. This clustering was formalized by Barabasi and colleagues, who showed that disease-associated proteins are significantly closer to each other in the interactome than expected by chance. Disease modules reflect the biological reality that diseases arise from dysfunction of interconnected molecular pathways, not isolated gene failures.

    **Concept Tested:** Disease Module

---

#### 2. What is the "guilt by association" principle used for in network biology?

<div class="upper-alpha" markdown>
1. Determining which researcher published incorrect data
2. Predicting that a protein of unknown function is likely involved in a disease pathway if it interacts with several known disease proteins
3. Identifying proteins that are toxic based on their chemical structure
4. Measuring the expression level of genes adjacent to disease genes on a chromosome
</div>

??? question "Show Answer"
    The correct answer is **B**. The guilt-by-association principle states that if a protein of unknown function interacts with multiple known disease-associated proteins in the interactome, it is likely involved in the same disease pathway. This principle underlies disease gene prioritization methods that use network context to rank candidate genes from GWAS loci. More sophisticated implementations use random walks with restart, network propagation, or graph neural networks rather than simple neighbor counting.

    **Concept Tested:** Guilt by Association

---

#### 3. How does drug repurposing through knowledge graphs work?

<div class="upper-alpha" markdown>
1. By synthesizing new chemical compounds that resemble existing drugs
2. By traversing drug-target-disease graphs to find existing drugs whose targets overlap with or are proximal to disease modules in the interactome
3. By increasing the dosage of existing drugs until new therapeutic effects appear
4. By combining two or more existing drugs to create new formulations
</div>

??? question "Show Answer"
    The correct answer is **B**. Drug repurposing via knowledge graphs exploits the network relationships between drugs, their protein targets, and diseases. If a drug's targets are close to (or overlap with) a disease module in the interactome, the drug may have therapeutic potential for that disease even if it was originally approved for a different indication. This approach uses network proximity measures and path-finding algorithms on drug-target-disease graphs to systematically identify repurposing candidates.

    **Concept Tested:** Drug Repurposing and Graph Model for Repurposing

---

#### 4. What distinguishes an oncogene from a tumor suppressor gene in cancer biology?

<div class="upper-alpha" markdown>
1. Oncogenes are found only in viruses while tumor suppressors are found in human cells
2. Oncogenes promote cell growth when abnormally activated (gain-of-function), while tumor suppressors normally restrain growth and contribute to cancer when inactivated (loss-of-function)
3. Oncogenes cause cancer through single mutations while tumor suppressors require environmental triggers
4. Tumor suppressors are always located on the X chromosome while oncogenes are on autosomes
</div>

??? question "Show Answer"
    The correct answer is **B**. Oncogenes are mutated forms of normal cellular genes (proto-oncogenes) that promote cell proliferation when abnormally activated through gain-of-function mutations, amplifications, or translocations. Tumor suppressor genes normally restrain cell growth, and cancer develops when both copies are inactivated (loss-of-function) following Knudson's two-hit hypothesis. Examples include RAS (oncogene) and TP53 (tumor suppressor). In cancer network analysis, both types are key nodes whose mutation disrupts signaling pathways.

    **Concept Tested:** Oncogene and Tumor Suppressor Gene

---

#### 5. What is network proximity used to measure in network medicine?

<div class="upper-alpha" markdown>
1. The physical distance between two proteins inside a cell measured in nanometers
2. The shortest path distance between two sets of genes in the interactome, used to assess whether drug targets are close to disease genes
3. The similarity between two DNA sequences based on alignment scores
4. The number of publications linking two genes in the biomedical literature
</div>

??? question "Show Answer"
    The correct answer is **B**. Network proximity quantifies the closeness between two sets of genes (e.g., drug targets and disease genes) in the interactome by computing average shortest path distances. A significantly negative z-score (compared to random gene sets) indicates that the sets are closer than expected by chance, suggesting a biological relationship. This metric is used to predict drug-disease associations, assess comorbidity patterns, and prioritize drug repurposing candidates.

    **Concept Tested:** Network Proximity

---

#### 6. What biological function does a negative feedback loop serve in a signaling network?

<div class="upper-alpha" markdown>
1. It amplifies the signal indefinitely to ensure a strong cellular response
2. It dampens the signal and restores the system to its resting state, providing homeostasis
3. It creates a permanent memory of the signaling event
4. It blocks all signaling from the receptor
</div>

??? question "Show Answer"
    The correct answer is **B**. A negative feedback loop is a directed cycle in the signaling graph where a downstream component inhibits an upstream component. For example, the phosphatase SHP-1 dephosphorylates an activated receptor, reducing signal strength. Negative feedback provides signal attenuation and homeostasis, preventing runaway activation. Without negative feedback, a single growth factor molecule could drive continuous cell division. Positive feedback (not negative) creates bistable switches and memory (A and C are incorrect).

    **Concept Tested:** Feedback Loop

---

#### 7. What is the coherent feed-forward loop motif, and what function does it serve in signaling networks?

<div class="upper-alpha" markdown>
1. A motif where three nodes inhibit each other in a cycle, creating oscillations
2. A three-node motif where node A activates B and C, and B also activates C, serving as a persistence detector that filters out transient noise
3. A random connection pattern with no functional significance
4. A motif found only in metabolic networks, not signaling networks
</div>

??? question "Show Answer"
    The correct answer is **B**. In a coherent type 1 feed-forward loop, node A regulates B (activation), B regulates C (activation), and A also directly activates C. This means C is activated only when A provides a sustained signal, because both the direct path (A to C) and indirect path (A to B to C) must deliver their inputs. This acts as a persistence detector, filtering out transient noise — C does not respond to brief fluctuations in A's activity. This motif is statistically enriched in both transcriptional and signaling networks.

    **Concept Tested:** Feed-Forward Loop

---

#### 8. What is pharmacogenomics and how does it relate to precision medicine?

<div class="upper-alpha" markdown>
1. The study of how drugs affect the genome by causing mutations
2. The study of how genetic variation affects an individual's response to drugs, enabling personalized treatment decisions based on genotype
3. The process of manufacturing drugs from genetically modified organisms
4. A database of pharmaceutical company names and their product portfolios
</div>

??? question "Show Answer"
    The correct answer is **B**. Pharmacogenomics studies how an individual's genetic variation influences drug metabolism, efficacy, and adverse effects. For example, variants in CYP2D6 affect metabolism of many common drugs, and HLA genotype predicts severe drug hypersensitivity reactions. Pharmacogenomics is a key component of precision medicine, where treatment decisions are tailored to each patient's molecular profile rather than using a one-size-fits-all approach.

    **Concept Tested:** Pharmacogenomics and Precision Medicine

---

#### 9. How can comorbidity networks help understand disease relationships?

<div class="upper-alpha" markdown>
1. By measuring the cost of treating multiple diseases simultaneously
2. By connecting diseases that share genetic risk factors or overlapping disease modules in the interactome, revealing common molecular mechanisms
3. By tracking which hospitals treat the most patients with multiple conditions
4. By counting the number of medications prescribed for each disease
</div>

??? question "Show Answer"
    The correct answer is **B**. Comorbidity networks connect diseases that co-occur in patients more frequently than expected by chance. When these clinical observations are mapped onto the molecular interactome, comorbid diseases often share overlapping disease modules — their disease-associated genes are proximal or shared in the network. This provides molecular explanations for clinical comorbidity patterns and can reveal shared pathogenic mechanisms that suggest common therapeutic strategies.

    **Concept Tested:** Comorbidity Network

---

#### 10. What makes cancer driver genes different from passenger mutations in cancer genomics?

<div class="upper-alpha" markdown>
1. Driver genes are always inherited while passenger mutations are always somatic
2. Driver genes confer a selective growth advantage to cancer cells and are causally implicated in tumor development, while passenger mutations are neutral bystanders acquired during tumor evolution
3. Passenger mutations are more common in oncogenes while driver genes are more common in tumor suppressors
4. Driver genes can only be detected by whole-genome sequencing while passenger mutations require RNA-seq
</div>

??? question "Show Answer"
    The correct answer is **B**. Cancer driver genes carry mutations that confer a selective growth advantage to cancer cells, contributing causally to tumor initiation, progression, or metastasis. Passenger mutations are neutral or near-neutral mutations that accumulate during the rapid cell division of tumor cells but do not contribute to cancer development. Distinguishing drivers from passengers is a central challenge in cancer genomics, addressed by methods that assess mutation recurrence, network centrality, and functional impact.

    **Concept Tested:** Cancer Driver Genes
