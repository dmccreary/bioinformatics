# Quiz: Structural Bioinformatics and Molecular Interactions

Test your understanding of protein structure, structure prediction, contact maps, molecular docking, and drug discovery concepts.

---

#### 1. What is a protein contact map, and how does it relate to graph theory?

<div class="upper-alpha" markdown>
1. A physical map of where proteins are located in the cell, represented as a geographic network
2. A two-dimensional matrix showing which residue pairs are within a distance threshold, which can be interpreted as an adjacency matrix of a residue interaction graph
3. A list of all hydrogen bonds in a protein, stored as a sequence alignment
4. A three-dimensional rendering of the protein surface used for visualization only
</div>

??? question "Show Answer"
    The correct answer is **B**. A protein contact map is a symmetric matrix where entry $(i,j)$ indicates whether residues $i$ and $j$ are within a spatial distance threshold (typically 8 angstroms between C-alpha atoms). This matrix is directly interpretable as an adjacency matrix of a residue interaction network, where nodes are residues and edges represent spatial proximity. Graph metrics like centrality and clustering coefficient applied to this network reveal structurally important residues.

    **Concept Tested:** Protein Contact Map and Contact Map as Graph

---

#### 2. How did AlphaFold revolutionize protein structure prediction?

<div class="upper-alpha" markdown>
1. By solving the protein folding problem using only molecular dynamics simulations
2. By using deep learning to predict three-dimensional structures from amino acid sequences with near-experimental accuracy
3. By replacing X-ray crystallography as the primary method for determining protein structures
4. By eliminating the need for multiple sequence alignments in structure prediction
</div>

??? question "Show Answer"
    The correct answer is **B**. AlphaFold, developed by DeepMind, used deep learning neural networks to predict protein structures from amino acid sequences with accuracy approaching that of experimental methods. At CASP14 in 2020, AlphaFold achieved median GDT scores above 90 for most targets. The AlphaFold Database has since provided predicted structures for over 200 million proteins. AlphaFold does use MSA information (D is incorrect) and complements rather than replaces experimental methods (C is incorrect).

    **Concept Tested:** AlphaFold

---

#### 3. What is the key difference between homology modeling and threading for protein structure prediction?

<div class="upper-alpha" markdown>
1. Homology modeling uses a template with detectable sequence similarity, while threading fits the target onto known folds without requiring sequence homology
2. Threading is more accurate than homology modeling in all cases
3. Homology modeling works only for small proteins while threading works for large complexes
4. Threading requires experimental data while homology modeling is purely computational
</div>

??? question "Show Answer"
    The correct answer is **A**. Homology modeling uses the experimentally determined structure of a homologous protein (typically above 30% sequence identity) as a template to build a model of the target. Threading (fold recognition) is used when no homolog with detectable sequence similarity exists; it evaluates the compatibility of the target sequence with each fold in a library of known structures using scoring functions based on residue environments and contact potentials. Homology modeling is more accurate when a close template exists.

    **Concept Tested:** Homology Modeling and Threading

---

#### 4. What does RMSD measure in the context of structural alignment?

<div class="upper-alpha" markdown>
1. The percentage of identical residues between two protein sequences
2. The root mean square deviation of corresponding atomic positions between two superimposed structures, quantifying structural similarity
3. The number of secondary structure elements in a protein
4. The binding affinity between a protein and its ligand
</div>

??? question "Show Answer"
    The correct answer is **B**. RMSD (Root Mean Square Deviation) quantifies the structural similarity between two superimposed protein structures by calculating the average distance between corresponding atoms (typically C-alpha carbons). An RMSD of 0 indicates identical structures, while values below 2 angstroms generally indicate very similar structures. RMSD is the standard metric for evaluating structure prediction accuracy and comparing related protein conformations.

    **Concept Tested:** RMSD

---

#### 5. What is molecular docking used for in drug discovery?

<div class="upper-alpha" markdown>
1. Sequencing the DNA that encodes drug target proteins
2. Predicting the preferred orientation and binding affinity of a small molecule (ligand) within a protein's binding site
3. Manufacturing pharmaceutical compounds at industrial scale
4. Aligning multiple drug molecules to find consensus structures
</div>

??? question "Show Answer"
    The correct answer is **B**. Molecular docking computationally predicts how a small molecule (ligand) binds to a protein target by sampling possible orientations and conformations within the binding site and scoring each pose using energy functions. It estimates both the binding geometry and the binding affinity, making it essential for virtual screening in drug discovery. Docking can evaluate millions of candidate compounds computationally before expensive experimental testing.

    **Concept Tested:** Molecular Docking

---

#### 6. What is Lipinski's Rule of Five used to assess?

<div class="upper-alpha" markdown>
1. The toxicity of a compound in clinical trials
2. The number of protein targets a drug can bind
3. The drug-likeness of a compound based on molecular properties that predict oral bioavailability
4. The number of steps required to synthesize a molecule in the laboratory
</div>

??? question "Show Answer"
    The correct answer is **C**. Lipinski's Rule of Five provides guidelines for predicting whether a compound is likely to be orally bioavailable based on four molecular properties: molecular weight (not greater than 500 Da), LogP (not greater than 5), hydrogen bond donors (not more than 5), and hydrogen bond acceptors (not more than 10). Compounds violating two or more rules are less likely to succeed as oral drugs. This is a key component of drug-likeness assessment in early drug discovery.

    **Concept Tested:** Drug-Likeness

---

#### 7. How do molecular fingerprints represent chemical structures for computational comparison?

<div class="upper-alpha" markdown>
1. As three-dimensional atomic coordinate files similar to PDB format
2. As bit vectors encoding the presence or absence of specific substructural features, enabling rapid similarity searches
3. As amino acid sequences translated from the compound's molecular formula
4. As phylogenetic trees showing the evolutionary history of the compound
</div>

??? question "Show Answer"
    The correct answer is **B**. Molecular fingerprints encode chemical structures as fixed-length bit vectors where each bit represents the presence (1) or absence (0) of a specific substructural feature, functional group, or path pattern. Similarity between two molecules is computed using metrics like the Tanimoto coefficient on their fingerprint vectors. This representation enables rapid virtual screening of millions of compounds and is fundamental to chemical similarity searching and structure-activity relationship analysis.

    **Concept Tested:** Molecular Fingerprints

---

#### 8. What forces primarily drive protein folding into the native three-dimensional structure?

<div class="upper-alpha" markdown>
1. Covalent bonds between all amino acid side chains
2. External mechanical pressure from the cellular environment
3. Hydrophobic collapse of nonpolar residues into the interior, supplemented by hydrogen bonds, salt bridges, and van der Waals forces
4. Magnetic interactions between charged amino acids
</div>

??? question "Show Answer"
    The correct answer is **C**. Protein folding is driven by the thermodynamic imperative to minimize free energy. Hydrophobic residues collapse into the protein interior away from water, forming a hydrophobic core. This is supplemented by hydrogen bonds between backbone and side chain atoms, salt bridges between charged residues, disulfide bonds between cysteine residues, and van der Waals forces. Together these noncovalent interactions stabilize the native conformation.

    **Concept Tested:** Protein Folding

---

#### 9. What is a protein domain and why is it important for structural classification?

<div class="upper-alpha" markdown>
1. A protein domain is a single amino acid with unique chemical properties
2. A protein domain is an independently folding structural and functional unit within a protein that recurs in different proteins
3. A protein domain is the entire quaternary complex of a multi-subunit protein
4. A protein domain is a gap in the protein sequence where no structure is defined
</div>

??? question "Show Answer"
    The correct answer is **B**. A protein domain is a compact, independently folding structural unit that typically has its own hydrophobic core and can function autonomously. Domains are the building blocks of protein architecture — they recur in different proteins in various combinations, and many proteins contain multiple domains with different functions. Databases like SCOP, CATH, and Pfam classify proteins by their domain compositions, and domain recognition is central to protein function prediction.

    **Concept Tested:** Protein Domain and Domain Classification

---

#### 10. In a residue interaction network derived from a protein structure, what typically constitutes a node and an edge?

<div class="upper-alpha" markdown>
1. Nodes are entire protein chains and edges represent quaternary interactions
2. Nodes are water molecules and edges represent solvent-protein contacts
3. Nodes are individual amino acid residues and edges connect residue pairs that are in spatial contact
4. Nodes are secondary structure elements and edges represent sequence order
</div>

??? question "Show Answer"
    The correct answer is **C**. In a residue interaction network, each node represents an individual amino acid residue, and edges connect pairs of residues that are within a spatial distance threshold (typically 8 angstroms between C-alpha atoms or based on side chain contacts). This graph representation allows application of network analysis metrics to identify structurally important residues: high-degree nodes are often in the protein core, and high-betweenness residues may mediate communication between domains.

    **Concept Tested:** Residue Interaction Network
