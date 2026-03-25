# Quiz: Protein-Protein Interaction Networks

Test your understanding of PPI detection methods, network topology, hubs and modules, and graph-based analysis of protein interactions.

---

#### 1. What is the fundamental difference between yeast two-hybrid (Y2H) and affinity purification mass spectrometry (AP-MS) for detecting protein interactions?

<div class="upper-alpha" markdown>
1. Y2H works only in human cells while AP-MS works only in bacteria
2. Y2H detects direct binary interactions between two proteins while AP-MS identifies membership in protein complexes, which may include indirect contacts
3. AP-MS can only detect interactions between enzymes while Y2H detects all protein types
4. Y2H requires three-dimensional structures while AP-MS requires only sequence data
</div>

??? question "Show Answer"
    The correct answer is **B**. Yeast two-hybrid detects direct binary physical contacts between two proteins (bait and prey) through reconstitution of a transcription factor. AP-MS identifies all proteins that co-purify with a tagged bait protein, revealing complex composition but leaving ambiguity about which contacts are direct versus bridged through intermediate proteins. This distinction has important implications for network construction and edge interpretation.

    **Concept Tested:** Yeast Two-Hybrid, Affinity Purification MS, and Binary vs Complex PPIs

---

#### 2. What is the centrality-lethality hypothesis in PPI networks?

<div class="upper-alpha" markdown>
1. Proteins in the center of the cell are more likely to be lethal when mutated
2. Hub proteins with many interaction partners tend to be essential for organism survival, so their deletion is more likely to be lethal
3. Lethal mutations always occur in proteins with the highest betweenness centrality
4. The lethality of a protein is determined solely by its expression level
</div>

??? question "Show Answer"
    The correct answer is **B**. The centrality-lethality hypothesis states that highly connected hub proteins in PPI networks tend to be essential genes whose deletion is lethal to the organism. This was demonstrated in yeast, where deleting high-degree proteins is significantly more likely to be lethal than deleting peripheral proteins with few interactions. This finding connects network topology to biological function and has implications for drug target selection.

    **Concept Tested:** Network Hubs and Essential Proteins

---

#### 3. What distinguishes "date hubs" from "party hubs" in protein interaction networks?

<div class="upper-alpha" markdown>
1. Date hubs were discovered earlier in the timeline of PPI research
2. Party hubs interact with all their partners simultaneously (in the same complex), while date hubs interact with different partners at different times or locations
3. Date hubs have higher degree than party hubs
4. Party hubs are found only in yeast while date hubs are found in all organisms
</div>

??? question "Show Answer"
    The correct answer is **B**. Party hubs interact with most of their partners simultaneously, typically as core members of stable protein complexes. Date hubs interact with different partners at different times, in different cellular locations, or under different conditions, serving as dynamic connectors between functional modules. This distinction highlights that static PPI networks are simplifications of dynamic biological reality, and understanding when and where interactions occur adds important biological context.

    **Concept Tested:** Date Hubs vs Party Hubs

---

#### 4. Why do PPI confidence scores matter for network topology analysis?

<div class="upper-alpha" markdown>
1. Higher confidence scores make the network visualization more aesthetically pleasing
2. Confidence scores determine the color of nodes in the network
3. The confidence threshold used to filter edges dramatically changes network properties like degree distribution, hub identification, and module detection
4. Confidence scores are only relevant for computational predictions, not experimental data
</div>

??? question "Show Answer"
    The correct answer is **C**. The choice of confidence score threshold acts as edge filtering on a weighted graph and fundamentally alters network topology. At low thresholds, the network is dense with many false positives. At high thresholds, the network is sparse and reliable but may miss real interactions. Hub identification, degree distributions, clustering coefficients, and module detection all change with the cutoff. Researchers must always report which threshold was used for reproducibility.

    **Concept Tested:** PPI Confidence Scoring

---

#### 5. What is a network module in the context of PPI networks, and what does it typically represent biologically?

<div class="upper-alpha" markdown>
1. A software module for visualizing networks
2. A densely connected subgraph within the network that typically corresponds to a functional unit such as a protein complex or signaling pathway
3. A single protein with more than 100 interaction partners
4. An isolated node with no connections in the network
</div>

??? question "Show Answer"
    The correct answer is **B**. Network modules are densely connected subgraphs where proteins within the module interact more frequently with each other than with proteins outside the module. They typically correspond to biological functional units such as protein complexes (e.g., the proteasome, the ribosome), signaling pathways, or metabolic sub-networks. Module detection algorithms like MCODE, MCL, and community detection methods are used to identify these functional units computationally.

    **Concept Tested:** Network Modules

---

#### 6. How does cross-linking mass spectrometry (XL-MS) improve upon standard AP-MS?

<div class="upper-alpha" markdown>
1. XL-MS is cheaper and faster than AP-MS
2. XL-MS provides distance constraints between specific residues, confirming direct contacts and revealing spatial arrangements within complexes
3. XL-MS can detect interactions in living organisms while AP-MS requires cell lysis
4. XL-MS identifies only membrane-bound proteins
</div>

??? question "Show Answer"
    The correct answer is **B**. Cross-linking mass spectrometry uses bifunctional reagents to covalently connect residues within a defined distance threshold (typically 20-30 angstroms). After digestion, cross-linked peptide pairs are identified by MS, providing direct evidence for binary contacts between specific residues. This resolves the spoke-versus-matrix ambiguity of standard AP-MS by confirming which proteins within a complex are in direct physical proximity and providing structural information about subunit arrangement.

    **Concept Tested:** Cross-Linking Mass Spec

---

#### 7. What characteristic topological properties do PPI networks typically exhibit?

<div class="upper-alpha" markdown>
1. Uniform degree distribution, long average path lengths, and low clustering
2. Scale-free degree distribution, small-world property, and modular organization
3. Complete graph structure where every protein interacts with every other protein
4. Regular lattice structure with fixed numbers of interactions per protein
</div>

??? question "Show Answer"
    The correct answer is **B**. PPI networks characteristically exhibit a scale-free degree distribution (power law $P(k) \sim k^{-\gamma}$ with few highly connected hubs and many low-degree nodes), the small-world property (short average path lengths of 4-5 hops and high clustering coefficients), and modular organization (densely connected subgraphs corresponding to functional units). These properties distinguish biological networks from random graphs and have implications for robustness, vulnerability, and drug targeting.

    **Concept Tested:** Graph Model for PPIs

---

#### 8. What is network alignment in the context of PPI networks?

<div class="upper-alpha" markdown>
1. Arranging proteins in alphabetical order within the network
2. Identifying corresponding proteins and conserved interaction patterns between PPI networks of different species
3. Aligning the DNA sequences of all proteins in the network
4. Adjusting the visual layout of a network diagram for clarity
</div>

??? question "Show Answer"
    The correct answer is **B**. Network alignment identifies corresponding proteins (based on sequence similarity) and conserved interaction patterns between the PPI networks of two or more species. Conserved interactions are more likely to be functionally important because they have been maintained across evolution. Network alignment can transfer functional annotations from well-studied organisms to less-characterized ones and reveal evolutionary principles of network organization.

    **Concept Tested:** Network Alignment and Network Comparison

---

#### 9. What is the "interactome" of an organism?

<div class="upper-alpha" markdown>
1. The complete set of genes in an organism's genome
2. The complete set of metabolic reactions in an organism
3. The complete set of protein-protein interactions in an organism
4. The complete set of RNA transcripts in a cell
</div>

??? question "Show Answer"
    The correct answer is **C**. The interactome is the complete set of protein-protein interactions in an organism. The human interactome is estimated to contain roughly 20,000 proteins and between 130,000 and 650,000 binary interactions, though current experimental maps cover only a fraction of this space. Model organisms like yeast have the most thoroughly characterized interactomes. The genome (A) refers to all DNA, the metabolome involves metabolic reactions (B), and the transcriptome involves RNA (D).

    **Concept Tested:** Interactome

---

#### 10. How do host-pathogen PPI networks contribute to understanding infectious disease?

<div class="upper-alpha" markdown>
1. They measure the mutation rate of pathogen genomes
2. They map the physical interactions between pathogen proteins and host cell proteins, revealing which host processes are targeted during infection
3. They sequence the pathogen's DNA to classify it taxonomically
4. They count the number of immune cells responding to infection
</div>

??? question "Show Answer"
    The correct answer is **B**. Host-pathogen PPI networks map the physical interactions between proteins encoded by the pathogen (the viral interactome, for example) and proteins of the host organism. These interactions reveal which host cellular processes and pathways the pathogen hijacks or disrupts during infection. Understanding these interaction interfaces can identify therapeutic targets for disrupting pathogen entry, replication, or immune evasion.

    **Concept Tested:** Host-Pathogen PPIs
