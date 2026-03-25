# Quiz: Metabolic Pathway Modeling

Test your understanding of metabolic networks as graphs, flux balance analysis, constraint-based modeling, genome-scale models, and pathway databases.

---

#### 1. Why is a bipartite graph the preferred representation for metabolic networks?

<div class="upper-alpha" markdown>
1. It forces all nodes to have the same degree, simplifying analysis
2. It separates metabolite nodes from reaction nodes, preserving stoichiometric relationships and preventing nonsensical metabolite-metabolite or reaction-reaction edges
3. It reduces the total number of edges compared to other graph types
4. It can only represent linear pathways, which simplifies computation
</div>

??? question "Show Answer"
    The correct answer is **B**. A bipartite metabolic graph partitions nodes into metabolites and reactions, with directed edges connecting substrates to reactions and reactions to products. This structure preserves stoichiometric information (edge weights indicate molecules consumed or produced) and prevents biologically meaningless direct connections between two metabolites or two reactions. The bipartite model naturally maps to graph database schemas and enables meaningful projections such as metabolite-only or reaction-only networks.

    **Concept Tested:** Bipartite Metabolic Graph

---

#### 2. What is flux balance analysis (FBA) and what does it optimize?

<div class="upper-alpha" markdown>
1. FBA measures enzyme kinetic parameters experimentally and simulates reactions with differential equations
2. FBA uses linear programming to find the steady-state flux distribution that maximizes a biological objective function, such as biomass production, subject to stoichiometric and capacity constraints
3. FBA aligns metabolic pathway maps from different organisms to find conserved reactions
4. FBA calculates the three-dimensional structure of metabolic enzymes
</div>

??? question "Show Answer"
    The correct answer is **B**. Flux balance analysis formulates metabolic modeling as a linear programming problem. It assumes steady state ($S \cdot v = 0$, where $S$ is the stoichiometric matrix and $v$ is the flux vector) and applies capacity constraints on individual reactions. An objective function (typically maximizing biomass production or ATP yield) is optimized to find the flux distribution across all reactions. FBA requires no kinetic parameters, making it applicable to genome-scale models.

    **Concept Tested:** Flux Balance Analysis

---

#### 3. What is the stoichiometric matrix and what role does it play in constraint-based modeling?

<div class="upper-alpha" markdown>
1. A matrix of enzyme kinetic constants used to simulate reaction dynamics
2. A matrix where rows represent metabolites and columns represent reactions, with entries indicating the stoichiometric coefficients of each metabolite in each reaction
3. A matrix of pairwise distances between all metabolites in the network
4. A matrix of gene expression values across different experimental conditions
</div>

??? question "Show Answer"
    The correct answer is **B**. The stoichiometric matrix $S$ has dimensions $m \times n$ (metabolites by reactions), where entry $S_{ij}$ gives the stoichiometric coefficient of metabolite $i$ in reaction $j$ (negative for substrates consumed, positive for products produced). The steady-state constraint $S \cdot v = 0$ ensures that production and consumption of each metabolite are balanced. This matrix is the mathematical foundation of constraint-based modeling and FBA.

    **Concept Tested:** Stoichiometric Matrix

---

#### 4. What is an essential reaction in the context of genome-scale metabolic models?

<div class="upper-alpha" markdown>
1. A reaction that produces the most ATP per mole of substrate
2. A reaction whose removal from the model eliminates the organism's ability to produce biomass, predicting lethality of the corresponding gene knockout
3. A reaction that occurs in all organisms across the tree of life
4. A reaction catalyzed by the most abundant enzyme in the cell
</div>

??? question "Show Answer"
    The correct answer is **B**. An essential reaction is one whose deletion (setting its flux to zero) in an FBA simulation causes biomass production to drop to zero, predicting that the organism cannot grow without it. Essential reactions correspond to essential genes whose knockout is lethal. In silico gene knockout screens using genome-scale models can predict essential genes with approximately 90% accuracy in well-studied organisms, guiding antibiotic target identification and metabolic engineering strategies.

    **Concept Tested:** Essential Reaction

---

#### 5. Why does the "parameter gap" make kinetic modeling impractical for genome-scale metabolic analysis?

<div class="upper-alpha" markdown>
1. Kinetic parameters are too small to measure accurately with current instruments
2. Kinetic parameters like $V_{\max}$ and $K_m$ are experimentally known for fewer than 10% of reactions in even the best-studied organisms, making full kinetic simulation impossible at genome scale
3. Kinetic models can only simulate a maximum of 10 reactions simultaneously
4. Kinetic parameters change too rapidly to be useful for computational modeling
</div>

??? question "Show Answer"
    The correct answer is **B**. While the Michaelis-Menten equation and other kinetic models can describe individual reaction rates, measuring $V_{\max}$ and $K_m$ for every enzyme in an organism is experimentally prohibitive. In the best-studied organisms, kinetic parameters are available for fewer than 10% of reactions. This parameter gap motivated the development of constraint-based approaches like FBA, which require only stoichiometry and reaction bounds rather than detailed kinetic parameters.

    **Concept Tested:** Enzyme Kinetics and Constraint-Based Modeling

---

#### 6. What is pathway enrichment analysis and when is it applied?

<div class="upper-alpha" markdown>
1. A method for adding new reactions to incomplete pathway databases
2. A statistical test to determine whether a set of differentially expressed genes is enriched for membership in a particular metabolic or signaling pathway
3. A technique for increasing the concentration of metabolites in a sample
4. A method for improving the resolution of metabolomics mass spectrometry data
</div>

??? question "Show Answer"
    The correct answer is **B**. Pathway enrichment analysis tests whether genes from a specific pathway appear more frequently in a list of interest (e.g., differentially expressed genes) than expected by chance. Common methods include over-representation analysis (ORA using Fisher's exact test) and gene set enrichment analysis (GSEA). Pathway databases like KEGG and Reactome provide the pathway-to-gene mappings used in these tests, connecting gene-level results to pathway-level biological interpretation.

    **Concept Tested:** Pathway Enrichment

---

#### 7. How does Reactome's data model differ from KEGG's approach to representing metabolic pathways?

<div class="upper-alpha" markdown>
1. Reactome uses flat reference maps while KEGG uses a directed graph model
2. KEGG covers only human pathways while Reactome covers all organisms
3. Reactome models reactions at a finer granular level as a directed graph with explicit complexes, modifications, and subcellular compartmentalization, while KEGG uses reference pathway maps
4. KEGG is open source while Reactome requires a commercial license
</div>

??? question "Show Answer"
    The correct answer is **C**. Reactome models reactions as an event-based directed graph where events are connected to physical entities (proteins, metabolites, complexes) by input, output, and catalyst edges, explicitly representing molecular complexes, post-translational modifications, and subcellular compartments. KEGG organizes metabolism into approximately 500 hand-drawn reference pathway maps with compound and reaction identifiers. Reactome is open source (CC0), while KEGG has mixed licensing.

    **Concept Tested:** Reactome Pathways and KEGG Pathways

---

#### 8. What is a genome-scale metabolic model (GEM)?

<div class="upper-alpha" markdown>
1. A physical three-dimensional model of an organism's metabolic enzymes
2. A comprehensive reconstruction of all known metabolic reactions in an organism, derived from genome annotation, enabling computational simulation of metabolism
3. A database of all genetic mutations that affect metabolism
4. A microscopy technique for visualizing metabolic processes in living cells
</div>

??? question "Show Answer"
    The correct answer is **B**. A genome-scale metabolic model (GEM) is a comprehensive mathematical reconstruction of all known metabolic reactions encoded in an organism's genome. GEMs are built by mapping genes to enzymes to reactions using genome annotations and pathway databases, then formulating the network as a stoichiometric matrix for constraint-based analysis. GEMs for *E. coli* contain over 2,000 reactions, and human GEMs exceed 13,000 reactions. They enable in silico prediction of growth phenotypes, gene essentiality, and metabolic engineering targets.

    **Concept Tested:** Genome-Scale Model

---

#### 9. What are currency metabolites, and why do they require special treatment in metabolic network analysis?

<div class="upper-alpha" markdown>
1. Currency metabolites are rare metabolites that appear in only one reaction
2. Currency metabolites like ATP, NADH, and water participate in hundreds of reactions and act as hubs, potentially creating misleading shortcuts if not handled carefully in path-based analyses
3. Currency metabolites are synthetic compounds used in drug manufacturing
4. Currency metabolites are metabolites whose concentrations are measured in monetary units
</div>

??? question "Show Answer"
    The correct answer is **B**. Currency metabolites such as ATP, NADH, $\ce{H2O}$, and CoA participate in hundreds of reactions, making them extremely high-degree hub nodes in metabolic networks. If included in shortest-path analyses, they create biologically meaningless shortcuts (e.g., connecting glycolysis to nucleotide biosynthesis through ATP in two steps). Analysts often remove or downweight currency metabolites when computing paths, or use the bipartite representation to mitigate their hub effect.

    **Concept Tested:** Metabolite and Graph Model for Metabolism

---

#### 10. What is metabolic network comparison used to investigate?

<div class="upper-alpha" markdown>
1. The speed at which different sequencing instruments process metabolomics data
2. Differences in protein folding rates between thermophilic and mesophilic organisms
3. Conserved and organism-specific metabolic capabilities by aligning pathway graphs across species
4. The cost-effectiveness of different pathway database subscriptions
</div>

??? question "Show Answer"
    The correct answer is **C**. Metabolic network comparison aligns the pathway graphs of different organisms to identify conserved metabolic core modules shared across species and organism-specific pathways reflecting unique ecological adaptations. This analysis reveals how metabolic capabilities have been gained and lost through evolution, informs metabolic engineering by identifying alternative routes present in other organisms, and supports drug target identification by finding pathogen-specific essential reactions absent in the host.

    **Concept Tested:** Metabolic Network Compare and Metabolic Graph Alignment
