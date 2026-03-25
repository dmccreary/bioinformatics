---
title: Structural Bioinformatics and Molecular Interactions
description: Protein structure, AlphaFold, contact maps as graphs, molecular docking, drug-likeness, and molecular fingerprints
generated_by: claude skill chapter-content-generator
date: 2026-03-25 00:00:00
version: 0.05
---

# Structural Bioinformatics and Molecular Interactions

## Summary

Examines protein structure levels from primary to quaternary, folding prediction methods including AlphaFold, contact maps as graphs, residue interaction networks, molecular docking, drug-likeness properties, and molecular fingerprints.

## Concepts Covered

This chapter covers the following 35 concepts from the learning graph:

1. Primary Structure
2. Secondary Structure
3. Alpha Helix
4. Beta Sheet
5. Tertiary Structure
6. Quaternary Structure
7. Protein Folding
8. Protein Folding Problem
9. Homology Modeling
10. Threading
11. Ab Initio Prediction
12. AlphaFold
13. AlphaFold Database
14. Protein Contact Map
15. Contact Map as Graph
16. Residue Interaction Network
17. Graph Model for Contacts
18. Structural Alignment
19. RMSD
20. Protein Domain
21. Domain Classification
22. SCOP Database
23. Pfam Database
24. Protein Surface Analysis
25. Binding Site Prediction
26. Molecular Docking
27. Ligand-Protein Interaction
28. Drug-Likeness
29. ADMET Properties
30. Protein-Ligand Graph
31. Molecular Fingerprints
32. Chemical Similarity
33. Structure-Activity Relation
34. Protein Function Inference
35. Structural Genomics

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Molecular Biology](../01-foundations-molecular-biology/index.md)
- [Chapter 4: Graph Theory Fundamentals](../04-graph-theory-fundamentals/index.md)
- [Chapter 6: Sequence Alignment and Homology](../06-sequence-alignment-homology/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    Proteins are the molecular machines of life, and their three-dimensional shapes determine everything they do — from catalyzing reactions to recognizing pathogens. In this chapter we will trace the hierarchy of protein structure, discover how AlphaFold revolutionized structure prediction, and see that a protein's architecture can be represented as a graph of interacting residues. We will also explore how graph-based thinking powers molecular docking and drug discovery. Let's connect the dots!

## The Hierarchy of Protein Structure

Understanding how proteins work requires understanding how they are built. Biochemists describe protein architecture at four levels, each building on the one below. This hierarchy — from a linear chain of amino acids to massive multi-subunit complexes — is one of the most important organizing frameworks in all of biology.

### Primary Structure

The **primary structure** of a protein is its amino acid sequence: the ordered list of residues linked by peptide bonds from the amino terminus (N-terminus) to the carboxyl terminus (C-terminus). A typical human protein contains 300–500 residues drawn from the 20 standard amino acids. The primary structure is encoded directly by the gene's coding sequence and can be read from a FASTA file, making it the most accessible structural level computationally.

Primary structure determines all higher levels of structure. A single amino acid substitution — as in the glutamic acid to valine change at position 6 of beta-globin that causes sickle cell disease — can alter folding, stability, and function. Sequence alignment methods from Chapter 6 operate at this level, comparing primary structures to infer homology.

### Secondary Structure

**Secondary structure** refers to local, regular folding patterns stabilized by hydrogen bonds between backbone atoms. The two most common elements are the **alpha helix** and the **beta sheet**.

| Element | Geometry | Hydrogen Bond Pattern | Residues per Turn |
|---|---|---|---|
| **Alpha helix** | Right-handed spiral | C=O of residue $i$ to N-H of residue $i+4$ | 3.6 |
| **Beta sheet** | Extended strands side by side | Between adjacent strands (parallel or antiparallel) | — |

In an **alpha helix**, the polypeptide backbone coils into a tight spiral with 3.6 residues per turn, and hydrogen bonds form between the carbonyl oxygen of residue $i$ and the amide nitrogen of residue $i+4$. Alpha helices are common in transmembrane proteins and coiled-coil motifs.

A **beta sheet** consists of two or more extended polypeptide segments (beta strands) arranged side by side, connected by hydrogen bonds between the strands. Strands can run in the same direction (parallel) or opposite directions (antiparallel). Beta sheets form the rigid core of many enzymes and structural proteins such as silk fibroin.

Loops and turns connect helices and sheets, creating the overall topology of the protein chain. Secondary structure can be predicted from sequence with approximately 80% accuracy using methods such as PSIPRED, and it is routinely assigned from three-dimensional coordinates using the DSSP algorithm.

#### Diagram: Protein Structure Hierarchy

<iframe src="../../sims/protein-structure-hierarchy/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Protein Structure Hierarchy MicroSim Fullscreen](../../sims/protein-structure-hierarchy/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: protein-structure-hierarchy
Library: p5.js
Status: Specified

An interactive visualization showing the four levels of protein structure. Students can toggle between views of a primary amino acid sequence, secondary structure elements (alpha helices as ribbons and beta sheets as arrows), a tertiary fold shown as a 3D ribbon diagram, and a quaternary assembly of subunits. A color legend indicates different secondary structure elements. Clicking on a residue highlights its hydrogen bonding partners.
</details>

### Tertiary Structure

**Tertiary structure** describes the complete three-dimensional arrangement of all atoms in a single polypeptide chain. It arises from interactions among side chains that may be far apart in the primary sequence but close together in space: hydrophobic packing in the protein core, disulfide bonds between cysteine residues, salt bridges between charged residues, and hydrogen bonds between polar side chains.

Tertiary structure defines the protein's overall shape — whether it is a compact globular enzyme, an elongated fibrous protein, or an intrinsically disordered chain. It also creates the active site geometry that determines catalytic activity and the surface features that mediate binding to other molecules.

### Quaternary Structure

Many functional proteins consist of two or more polypeptide chains (subunits) that assemble into a complex. **Quaternary structure** describes the spatial arrangement and stoichiometry of these subunits. Hemoglobin, for example, is a tetramer of two alpha and two beta globin subunits ($\alpha_2\beta_2$). The interfaces between subunits are stabilized by the same noncovalent forces that drive tertiary folding, and allosteric regulation often depends on conformational changes transmitted across subunit interfaces.

From a graph perspective, quaternary structure can be modeled as a graph in which each subunit is a node and each inter-subunit interface is an edge weighted by buried surface area or binding free energy.

## Protein Folding and the Folding Problem

**Protein folding** is the physical process by which a polypeptide chain attains its functional three-dimensional structure. The process is driven by the thermodynamic imperative to minimize free energy: hydrophobic residues collapse into the interior, hydrogen bonds form between backbone and side chain atoms, and the chain settles into a conformation that represents the global free energy minimum — at least in principle.

The **protein folding problem** asks: given only the amino acid sequence, can we predict the three-dimensional structure? This problem has challenged researchers for over 50 years. Cyrus Levinthal pointed out in 1969 that a polypeptide chain has so many conformational degrees of freedom that a random search of all possible conformations would take longer than the age of the universe — yet real proteins fold in milliseconds to seconds. This contradiction, known as Levinthal's paradox, implies that folding follows directed pathways through the energy landscape rather than a random search.

!!! mascot-thinking "What's the Link?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Think of the protein folding problem as a graph search: each possible conformation is a node, and conformational changes connect neighboring nodes. The protein must find the lowest-energy node in this astronomically large graph — without visiting every node. Nature solves this by funneling the search through an energy landscape shaped like a rough funnel, where most paths lead downhill toward the native state.

## Predicting Protein Structure

Three classical computational approaches tackle the folding problem, each exploiting different kinds of information.

### Homology Modeling

**Homology modeling** (also called comparative modeling) predicts the structure of a target protein by using the experimentally determined structure of a homologous protein as a template. The method relies on the observation that proteins with similar sequences (typically above 30% identity) adopt similar folds. The pipeline involves four steps: identifying a suitable template by sequence search, aligning the target to the template, building a three-dimensional model based on the template coordinates, and refining the model to resolve steric clashes and optimize geometry.

Homology modeling is the most accurate prediction method when a close template is available, routinely achieving models within 1–2 angstroms of the true structure for targets with greater than 50% sequence identity to the template.

### Threading (Fold Recognition)

When no homologous template with detectable sequence similarity exists, **threading** (fold recognition) methods attempt to fit the target sequence onto each fold in a library of known structures. A scoring function evaluates the compatibility of the target sequence with each fold based on residue environment preferences, pairwise contact potentials, and secondary structure agreement. The fold that receives the best score is selected as the predicted structure.

### Ab Initio Prediction

**Ab initio prediction** (also called *de novo* prediction) attempts to predict structure from sequence alone, without any template. These methods sample the conformational space using physical energy functions or fragment assembly, building structures from short fragments of known proteins and assembling them using Monte Carlo or molecular dynamics simulations. The Rosetta software suite pioneered this approach, assembling three-to-nine-residue fragments from a structure database into full-length models.

| Method | Input Required | Best Accuracy | Speed |
|---|---|---|---|
| Homology modeling | Template structure with >30% identity | 1–2 A RMSD | Fast (minutes) |
| Threading | Library of known folds | 2–4 A RMSD | Moderate (hours) |
| Ab initio | Sequence only | Variable | Slow (days–weeks) |

### AlphaFold and the Deep Learning Revolution

In 2020, DeepMind's **AlphaFold** system achieved a dramatic breakthrough at the CASP14 competition, predicting protein structures with accuracy rivaling experimental methods. AlphaFold uses a deep learning architecture that combines multiple sequence alignments with a novel attention-based neural network (the Evoformer) to reason about the spatial relationships among residue pairs. The network directly predicts three-dimensional atomic coordinates and provides a per-residue confidence score (pLDDT).

AlphaFold's key innovation is its representation of residue-residue relationships as a two-dimensional matrix that the network iteratively refines — essentially learning a predicted contact map that is then converted to three-dimensional coordinates. This is a direct connection to the graph-based thinking at the heart of this course: AlphaFold operates on a dense graph of pairwise residue relationships.

The **AlphaFold Database**, maintained by the European Bioinformatics Institute (EBI) in partnership with DeepMind, provides predicted structures for over 200 million proteins — nearly every known protein sequence. This resource has transformed structural biology, enabling researchers to explore protein structure even for organisms with no experimental structures available. Entries include per-residue confidence scores, allowing users to assess which regions of the prediction are reliable.

#### Diagram: AlphaFold Prediction Pipeline

<iframe src="../../sims/alphafold-pipeline/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View AlphaFold Pipeline MicroSim Fullscreen](../../sims/alphafold-pipeline/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: alphafold-pipeline
Library: p5.js
Status: Specified

An animated flowchart showing the AlphaFold prediction pipeline. Starting from an amino acid sequence, the visualization shows multiple sequence alignment generation, the Evoformer attention mechanism processing pairwise residue features, iterative refinement of the distance matrix (shown as a heatmap grid), and the final 3D structure output. Students can click on each stage to see a detailed explanation. Confidence scores are color-coded from blue (high) to orange (low).
</details>

## Contact Maps and Residue Interaction Networks

One of the most powerful ways to connect protein structure to graph theory is through contact maps and interaction networks. These representations strip away the complexity of three-dimensional coordinates and replace it with the elegant simplicity of a graph.

### Protein Contact Map

A **protein contact map** is a symmetric binary matrix $C$ where entry $C_{ij} = 1$ if residues $i$ and $j$ are within a distance threshold (typically 8 angstroms between $C_\beta$ atoms) and $C_{ij} = 0$ otherwise. Contact maps capture the essential topology of a protein fold: alpha helices appear as thick bands along the diagonal, beta sheets as off-diagonal streaks (parallel sheets as diagonal streaks, antiparallel sheets as perpendicular streaks), and long-range contacts as scattered points far from the diagonal.

### Contact Map as Graph

A **contact map as graph** interpretation is straightforward: each residue becomes a node, and each contact becomes an edge. This **graph model for contacts** produces an undirected graph $G = (V, E)$ where $|V| = n$ (the number of residues) and $|E|$ equals the number of contacts. Edge weights can encode distance, interaction energy, or contact frequency in a molecular dynamics ensemble.

This graph representation enables the application of standard graph algorithms to protein structure analysis. For example, shortest path calculations between residues reveal communication pathways through the protein, and graph clustering algorithms identify structural modules that correspond to domains or functional units.

!!! mascot-thinking "What's the Link?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    A protein contact map is really an adjacency matrix! Every tool from Chapter 4 — degree distribution, clustering coefficient, betweenness centrality, community detection — can be applied directly to a protein's contact graph. Residues with high betweenness centrality often sit at the interfaces between structural domains, acting as critical hubs for signal transmission through the protein.

### Residue Interaction Network

A **residue interaction network** (RIN) extends the contact map concept by incorporating different types of interactions as edge attributes. Rather than a simple binary contact, each edge in a RIN can represent hydrogen bonds, salt bridges, hydrophobic contacts, van der Waals interactions, or pi-stacking interactions. This produces a multi-edge or weighted graph that captures the physicochemical nature of the interactions stabilizing the protein fold.

RIN analysis has revealed that protein structures share properties with small-world networks: most residue pairs can be connected by short paths through the contact graph, and the network has high clustering coefficients. Hub residues — those with many contacts — tend to be conserved across evolution, because their removal would destabilize the fold.

| Network Property | Typical Value | Biological Significance |
|---|---|---|
| Average degree | 7–10 | Close packing in protein interior |
| Clustering coefficient | 0.4–0.6 | Local structural regularity |
| Average path length | 4–8 residues | Efficient communication across structure |
| Degree distribution | Truncated power-law | Few highly connected hub residues |

#### Diagram: Contact Map and Residue Interaction Network

<iframe src="../../sims/contact-map-rin/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Contact Map and RIN MicroSim Fullscreen](../../sims/contact-map-rin/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: contact-map-rin
Library: p5.js
Status: Specified

A dual-panel interactive visualization. The left panel shows a protein contact map as a symmetric heatmap grid where contacts are colored by distance. The right panel shows the corresponding residue interaction network as a force-directed graph layout. Hovering over a cell in the contact map highlights the corresponding edge in the network, and vice versa. Students can adjust the distance threshold using a slider to see how the network density changes. Secondary structure elements are color-coded in both views.
</details>

## Structural Alignment and Comparison

Comparing protein structures is essential for understanding evolutionary relationships and functional mechanisms. While sequence alignment (Chapter 6) compares one-dimensional strings, **structural alignment** compares three-dimensional coordinate sets.

### Structural Alignment Methods

A structural alignment method takes two protein structures as input and produces an optimal superposition — a rotation and translation that best overlays corresponding residues. The most widely used algorithms include DALI (distance alignment matrix method), TM-align (template modeling alignment), and CE (combinatorial extension). These methods identify structurally equivalent residue pairs even when sequence similarity is undetectable, revealing remote evolutionary relationships.

### RMSD: Measuring Structural Similarity

The **root-mean-square deviation (RMSD)** is the standard metric for quantifying the difference between two superimposed structures. Given two sets of $n$ corresponding atomic positions, RMSD is calculated as:

$$\text{RMSD} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} \| \mathbf{r}_i^A - \mathbf{r}_i^B \|^2}$$

where $\mathbf{r}_i^A$ and $\mathbf{r}_i^B$ are the position vectors of atom $i$ in structures $A$ and $B$ after optimal superposition. An RMSD of 0 indicates identical structures; values below 2 angstroms generally indicate the same fold; values above 5 angstroms suggest substantially different conformations.

RMSD has limitations: it is sensitive to outlier regions (a few poorly aligned residues can inflate the value) and does not distinguish between global and local structural differences. The TM-score, which normalizes by protein length and downweights distant pairs, addresses some of these limitations.

## Protein Domains and Classification

### Protein Domains

A **protein domain** is a compact, independently folding unit within a protein. Many proteins are modular, consisting of two or more domains connected by flexible linkers. Domains are the fundamental units of protein evolution: they can be duplicated, shuffled between genes, and combined in new arrangements to create proteins with novel functions. A single domain typically ranges from 50 to 300 residues.

### Domain Classification

**Domain classification** organizes the universe of known protein structures into a hierarchy based on fold topology, evolutionary relationships, and functional properties. Two major classification databases serve the structural biology community.

The **SCOP database** (Structural Classification of Proteins) organizes domains into a hierarchy of class, fold, superfamily, and family. Classes are defined by secondary structure content (all-alpha, all-beta, alpha/beta, alpha+beta), folds by the spatial arrangement of secondary structure elements, superfamilies by probable evolutionary relationships, and families by clear sequence homology.

The **Pfam database** classifies protein sequences into families based on multiple sequence alignments and hidden Markov models. Each Pfam entry represents a conserved domain or functional region, and sequences are classified by comparison to the Pfam HMM library. Pfam bridges sequence and structure: most Pfam families have one or more representative structures, allowing structural information to be transferred to uncharacterized sequences.

!!! mascot-tip "Follow the Edges!"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    When you encounter an uncharacterized protein, start with a Pfam domain search. Identifying the domains tells you which folds to expect, which functions are likely, and which template structures to use for homology modeling. Domain architecture — the ordered arrangement of domains in a protein — is itself a kind of graph: a path graph where each node is a domain and edges represent the polypeptide connections between them.

## Protein Surface Analysis and Binding

### Protein Surface Analysis

**Protein surface analysis** examines the shape, electrostatic potential, and chemical properties of the solvent-accessible surface of a protein. The surface is where biology happens: enzymes bind substrates, receptors recognize ligands, and antibodies grip antigens. Computational tools such as MSMS and PyMOL calculate molecular surfaces, map electrostatic potential using the Poisson-Boltzmann equation, and identify surface clefts and pockets.

### Binding Site Prediction

**Binding site prediction** methods identify regions on the protein surface that are likely to bind ligands, substrates, or other proteins. Geometry-based approaches search for concave pockets of appropriate size and shape. Energy-based methods evaluate the favorability of placing small probe molecules at surface positions. Machine learning methods combine sequence conservation, surface geometry, and physicochemical properties to score potential binding sites. Tools such as fpocket and SiteMap are widely used for this task.

## Molecular Docking and Drug Discovery

### Molecular Docking

**Molecular docking** is a computational method that predicts the preferred orientation and binding affinity of a small molecule (ligand) when it binds to a protein target. The docking process involves two components: a search algorithm that explores the conformational and orientational space of the ligand within the binding site, and a scoring function that evaluates each pose.

Docking is central to structure-based drug design. In virtual screening, millions of candidate compounds are docked against a target protein, and the top-scoring compounds are selected for experimental testing. This computational funnel dramatically reduces the cost and time of drug discovery.

### Ligand-Protein Interaction

A **ligand-protein interaction** encompasses all the noncovalent forces between a bound small molecule and its protein target: hydrogen bonds, hydrophobic contacts, pi-stacking, cation-pi interactions, and water-mediated bridges. The sum of these interactions determines binding affinity, which is typically quantified as the dissociation constant $K_d$ or the inhibition constant $K_i$.

### Protein-Ligand Graph

A **protein-ligand graph** represents the interactions between a ligand and its binding site as a bipartite graph. Ligand atoms and protein residues form two sets of nodes, and edges represent specific interactions (hydrogen bonds, hydrophobic contacts, etc.). This graph representation enables systematic comparison of binding modes across different ligands, identification of key interacting residues, and machine learning approaches to binding affinity prediction.

Graph neural networks (GNNs) have emerged as a powerful tool for predicting binding affinity from protein-ligand graphs. By learning from thousands of experimentally determined protein-ligand complexes, GNNs can predict binding strength for novel compounds, accelerating the drug discovery pipeline.

#### Diagram: Molecular Docking and Protein-Ligand Graph

<iframe src="../../sims/molecular-docking-graph/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Molecular Docking Graph MicroSim Fullscreen](../../sims/molecular-docking-graph/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: molecular-docking-graph
Library: p5.js
Status: Specified

An interactive visualization with two panels. The left panel shows a simplified 2D representation of a ligand docked into a protein binding pocket, with interaction lines drawn between ligand atoms and protein residues. The right panel shows the corresponding protein-ligand graph as a bipartite network, with ligand atoms on one side and protein residues on the other. Students can select different ligands from a dropdown to see how the interaction graph changes. Edge colors indicate interaction type: green for hydrogen bonds, gray for hydrophobic, purple for pi-stacking.
</details>

## Drug-Likeness and Chemical Properties

### Drug-Likeness and Lipinski's Rule of Five

**Drug-likeness** is a qualitative concept that describes whether a compound has physicochemical properties consistent with being an orally active drug. The most widely used guideline is Lipinski's Rule of Five, which states that poor absorption or permeation is more likely when:

- Molecular weight is greater than 500 Da
- LogP (octanol-water partition coefficient) is greater than 5
- Number of hydrogen bond donors is greater than 5
- Number of hydrogen bond acceptors is greater than 10

The rule takes its name from the observation that all threshold values are multiples of five. It serves as a rapid filter in early drug discovery, and compounds that violate two or more rules are flagged for further evaluation, though notable exceptions exist (e.g., many antibiotics and natural products violate Lipinski's rules).

### ADMET Properties

**ADMET properties** — Absorption, Distribution, Metabolism, Excretion, and Toxicity — describe how a drug candidate behaves in the human body. Computational ADMET prediction has become a critical component of modern drug discovery, allowing researchers to filter out compounds with poor pharmacokinetic profiles before committing to expensive synthesis and testing.

- **Absorption**: Can the compound cross intestinal membranes? (Related to lipophilicity and molecular size)
- **Distribution**: Where does it go in the body? (Related to plasma protein binding and blood-brain barrier permeability)
- **Metabolism**: How is it broken down? (Primarily by cytochrome P450 enzymes in the liver)
- **Excretion**: How quickly is it eliminated? (Determines dosing frequency)
- **Toxicity**: Does it cause harmful effects? (Includes mutagenicity, cardiotoxicity, hepatotoxicity)

## Molecular Fingerprints and Chemical Similarity

### Molecular Fingerprints

**Molecular fingerprints** are binary or count vectors that encode the structural features of a molecule. Each bit position (or count) corresponds to a specific substructure, functional group, or topological path. Common fingerprint types include:

- **MACCS keys**: 166 predefined structural fragments
- **ECFP (Extended Connectivity Fingerprints)**: Circular fingerprints generated by iteratively hashing atom neighborhoods; also known as Morgan fingerprints
- **Topological fingerprints**: Encode all paths up to a given length through the molecular graph

Fingerprints transform molecules into fixed-length vectors that are efficient to store and compare, enabling rapid similarity searching across databases of millions of compounds.

### Chemical Similarity and the Tanimoto Coefficient

**Chemical similarity** quantifies how structurally related two molecules are. The most widely used metric for comparing binary fingerprints is the Tanimoto coefficient (also called the Jaccard index):

$$T(A, B) = \frac{|A \cap B|}{|A \cup B|} = \frac{c}{a + b - c}$$

where $a$ is the number of bits set in fingerprint $A$, $b$ is the number of bits set in fingerprint $B$, and $c$ is the number of bits set in both. The Tanimoto coefficient ranges from 0 (no shared features) to 1 (identical fingerprints). A threshold of $T \geq 0.85$ is commonly used to define "similar" molecules, based on the empirical observation that molecules with high Tanimoto similarity tend to share biological activity.

### Structure-Activity Relationship

The **structure-activity relationship** (SAR) describes how systematic changes in the chemical structure of a molecule affect its biological activity. SAR analysis is the foundation of medicinal chemistry: by synthesizing and testing series of related compounds, chemists identify which structural features are essential for activity (the pharmacophore), which can be modified to improve potency, and which affect selectivity and pharmacokinetic properties.

Graph-based SAR methods represent molecules as molecular graphs (atoms as nodes, bonds as edges) and use subgraph matching, graph kernels, or graph neural networks to learn the mapping from molecular structure to biological activity. This is a direct application of the graph framework developed throughout this course.

!!! mascot-thinking "What's the Link?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    A molecule is itself a graph! Atoms are nodes, covalent bonds are edges, and the molecular graph captures the complete topology of the molecule. Molecular fingerprints are really graph features — encoding paths, subtrees, and neighborhoods in the molecular graph. When we compare fingerprints using the Tanimoto coefficient, we are measuring the overlap of graph-derived features between two molecules.

## Protein Function Inference and Structural Genomics

### Protein Function Inference

**Protein function inference** from structure exploits the principle that structure is more conserved than sequence across evolution. Two proteins may have diverged beyond detectable sequence similarity yet retain nearly identical folds and functions. Structural alignment against databases of annotated structures (using tools like DALI or VAST) can reveal functional relationships invisible to sequence comparison alone.

Function can also be inferred from the residue interaction network: conserved patterns of contacts often correspond to functional sites, and the graph topology of the active site region is frequently preserved across an enzyme family even when the surrounding structure varies.

### Structural Genomics

**Structural genomics** is the large-scale, systematic determination of protein structures, with the goal of providing at least one experimentally determined structure for every protein fold in nature. Structural genomics initiatives — including the Protein Structure Initiative (PSI) in the United States and RIKEN in Japan — used high-throughput crystallography and NMR to determine thousands of structures, prioritizing proteins that represent novel folds or that serve as useful templates for homology modeling.

The advent of AlphaFold has shifted the structural genomics landscape. With predicted structures available for essentially every known protein, the emphasis has moved from coverage to accuracy: validating predictions experimentally, characterizing protein dynamics that static predictions cannot capture, and determining the structures of protein complexes and assemblies.

!!! mascot-warning "Watch Out, Explorers!"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    AlphaFold predictions are powerful but not infallible. Regions with low pLDDT scores (below 70) may be intrinsically disordered or poorly predicted. Ligand binding, post-translational modifications, and quaternary assembly can all alter the structure from what AlphaFold predicts for the isolated monomer. Always check the confidence scores and validate predictions against experimental data when possible.

## Putting It All Together: From Sequence to Drug

The concepts in this chapter form a pipeline that connects sequence to function to drug discovery. Given a newly identified protein target, a researcher might:

1. **Predict structure**: Use AlphaFold or homology modeling to obtain a three-dimensional model
2. **Analyze the contact network**: Build a residue interaction network to identify structural domains, hub residues, and potential allosteric sites
3. **Classify domains**: Search SCOP and Pfam to identify the protein's domain architecture and infer function
4. **Identify binding sites**: Use surface analysis and pocket detection to locate druggable binding sites
5. **Virtual screening**: Dock libraries of drug-like compounds (filtered by Lipinski's rules and ADMET predictions) into the binding site
6. **Evaluate hits**: Represent top-scoring compounds as protein-ligand graphs, compare molecular fingerprints, and analyze structure-activity relationships to prioritize compounds for experimental testing

At every stage, graphs provide the organizing framework: residue interaction networks for structural analysis, protein-ligand graphs for docking evaluation, and molecular graphs for fingerprint generation and SAR analysis. This chapter demonstrates that structural bioinformatics is, at its core, applied graph theory.

!!! mascot-celebration "Great Work, Explorers!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You have navigated the full journey from amino acid sequence to three-dimensional structure to drug discovery — and you have seen that graphs are woven through every step. Contact maps are adjacency matrices, residue interaction networks reveal the architecture of proteins, protein-ligand graphs capture the molecular logic of drug binding, and molecular fingerprints encode graph-derived features of small molecules. Keep following the edges — next we will zoom out from individual proteins to the vast networks of protein-protein interactions that govern cellular behavior!

## Key Takeaways

1. **Protein structure is hierarchical**: Primary structure (sequence) determines secondary (helices, sheets), tertiary (3D fold), and quaternary (multi-subunit assembly) structure.

2. **The protein folding problem** asks whether three-dimensional structure can be predicted from sequence alone. Classical approaches — homology modeling, threading, and ab initio prediction — have been largely surpassed by AlphaFold, which uses deep learning on residue pair representations.

3. **AlphaFold and its database** have made predicted structures available for over 200 million proteins, transforming structural biology from a data-scarce to a data-rich discipline.

4. **Contact maps are adjacency matrices**: A protein contact map translates directly into a graph where residues are nodes and spatial contacts are edges, enabling the application of all graph algorithms from Chapter 4.

5. **Residue interaction networks** exhibit small-world properties, and hub residues with high centrality tend to be functionally important and evolutionarily conserved.

6. **Structural alignment and RMSD** quantify the similarity between three-dimensional structures, revealing evolutionary relationships that sequence comparison alone may miss.

7. **Protein domains** are the evolutionary and structural building blocks of proteins. SCOP and Pfam classify domains by fold and function, respectively.

8. **Molecular docking** predicts how ligands bind to protein targets, and protein-ligand graphs provide a graph-based representation of binding interactions suitable for machine learning.

9. **Drug-likeness** is assessed using Lipinski's Rule of Five and ADMET property predictions, which filter compound libraries before expensive experimental testing.

10. **Molecular fingerprints and the Tanimoto coefficient** enable rapid chemical similarity searching by encoding molecular graph features as binary vectors and measuring their overlap.

[See Annotated References](./references.md)
