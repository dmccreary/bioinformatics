---
title: Metabolic Pathway Modeling
description: Metabolic networks as bipartite graphs, FBA, constraint-based modeling, genome-scale models, and metabolomics
generated_by: claude skill chapter-content-generator
date: 2026-03-25 00:00:00
version: 0.05
---

# Metabolic Pathway Modeling

## Summary

Explores metabolic networks as bipartite graphs, pathway databases (KEGG, Reactome, BioCyc), flux balance analysis, constraint-based modeling, genome-scale metabolic models, and graph-based metabolic network comparison.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Metabolic Network
2. Metabolite
3. Enzyme
4. Enzyme Kinetics
5. Metabolic Pathway
6. Bipartite Metabolic Graph
7. KEGG Pathways
8. Reactome Pathways
9. BioCyc Pathways
10. Flux Balance Analysis
11. Constraint-Based Modeling
12. Stoichiometric Matrix
13. Objective Function
14. Metabolic Flux
15. Graph Model for Metabolism
16. Genome-Scale Model
17. Essential Reaction
18. Minimal Growth Medium
19. Metabolic Engineering
20. Synthetic Biology
21. Pathway Enrichment
22. Metabolomics
23. Mass Spec for Metabolomics
24. Metabolic Network Compare
25. Metabolic Graph Alignment

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Molecular Biology](../01-foundations-molecular-biology/index.md)
- [Chapter 2: Biological Databases](../02-biological-databases/index.md)
- [Chapter 4: Graph Theory Fundamentals](../04-graph-theory-fundamentals/index.md)
- [Chapter 9: Protein-Protein Interaction Networks](../09-protein-interaction-networks/index.md)

---

!!! mascot-welcome "Welcome, Explorers! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    Metabolism is the chemistry of life -- thousands of reactions converting nutrients into energy, building blocks, and waste products. When we draw those reactions as a graph, stunning patterns emerge: hub metabolites that participate in hundreds of reactions, tightly clustered pathways that mirror textbook biochemistry, and conserved modules shared across the tree of life. In this chapter we will model metabolism as a **bipartite graph**, query major pathway databases, formulate **flux balance analysis** as a linear program, and build **genome-scale metabolic models** that predict cellular behavior from a list of genes. Let's connect the dots!

## Metabolic Networks: The Chemistry of Life as a Graph

A **metabolic network** is the complete set of biochemical reactions that occur within a cell or organism. Each reaction transforms one or more input **metabolites** (substrates) into one or more output metabolites (products), and most reactions are catalyzed by an **enzyme** -- a protein that accelerates the reaction without being consumed. Metabolism encompasses thousands of reactions organized into coherent sequences called **metabolic pathways**, such as glycolysis, the citric acid cycle, and fatty acid biosynthesis.

Why model metabolism as a graph? Because the connectivity between reactions carries information that isolated reaction equations cannot provide. A graph representation reveals which metabolites serve as branch points between pathways, which reactions are essential for survival, and how perturbations in one pathway propagate to others. For a course centered on graph analysis, metabolic networks offer one of the richest and most well-curated biological graph types available.

#### Diagram: Overview of a Metabolic Network

<iframe src="../../sims/metabolic-network-overview/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Metabolic Network Overview MicroSim Fullscreen](../../sims/metabolic-network-overview/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: metabolic-network-overview
Library: vis-network
Status: Specified

A network visualization showing metabolite nodes (circles) and reaction nodes (squares) connected by directed edges. Hub metabolites such as ATP, NADH, and pyruvate appear as large nodes with many connections. Pathway clusters (glycolysis, TCA cycle, pentose phosphate) are color-coded.
</details>

## Metabolites, Enzymes, and Enzyme Kinetics

A **metabolite** is any small molecule that participates in metabolism. Metabolites include sugars (glucose, fructose), amino acids, nucleotides, cofactors (ATP, NAD+, coenzyme A), and signaling molecules. Some metabolites, called *currency metabolites*, participate in so many reactions that they act as hubs in the network -- ATP alone appears in over 400 reactions in *Escherichia coli*.

An **enzyme** is a biological catalyst, almost always a protein, that lowers the activation energy of a specific reaction. Enzymes exhibit remarkable specificity: hexokinase phosphorylates glucose but ignores similar sugars, and DNA polymerase incorporates nucleotides but rejects amino acids. The Enzyme Commission (EC) numbering system classifies enzymes into six major classes based on the type of reaction they catalyze (oxidoreductases, transferases, hydrolases, lyases, isomerases, and ligases).

**Enzyme kinetics** describes how fast an enzyme converts substrate to product as a function of substrate concentration. The foundational model is the Michaelis-Menten equation:

$$v = \frac{V_{\max} [S]}{K_m + [S]}$$

where $v$ is the reaction rate, $V_{\max}$ is the maximum rate when the enzyme is fully saturated, $[S]$ is the substrate concentration, and $K_m$ is the Michaelis constant -- the substrate concentration at which the rate is half of $V_{\max}$. While kinetic parameters are valuable, they are experimentally expensive to measure for every reaction in a genome. This limitation motivates the constraint-based approaches we will encounter later in this chapter.

Why not simply simulate every reaction with differential equations? If we had $V_{\max}$ and $K_m$ values for every enzyme in a cell, we could write a system of ordinary differential equations and simulate metabolism dynamically. In practice, kinetic parameters are known for fewer than 10% of reactions in even the best-studied organisms. This "parameter gap" is why constraint-based modeling and flux balance analysis became the dominant paradigm for genome-scale metabolic modeling.

## The Bipartite Metabolic Graph

The central graph concept in this chapter is the **bipartite metabolic graph**. In a standard graph representation of metabolism, you might connect metabolites directly (glucose connects to glucose-6-phosphate through the hexokinase reaction). But this loses information about which reactions produce which metabolites and fails to capture the stoichiometry of each transformation.

A **bipartite graph** partitions nodes into two disjoint sets such that every edge connects a node in one set to a node in the other. For metabolism, the two sets are:

- **Metabolite nodes** -- representing chemical species (glucose, ATP, pyruvate)
- **Reaction nodes** -- representing biochemical transformations (hexokinase, phosphofructokinase)

Directed edges connect substrate metabolites to the reaction node that consumes them, and the reaction node to the product metabolites it produces. Edge weights encode **stoichiometric coefficients** -- the number of molecules consumed or produced. For example, the reaction catalyzed by hexokinase:

$$\text{Glucose} + \text{ATP} \xrightarrow{\text{Hexokinase}} \text{Glucose-6-phosphate} + \text{ADP}$$

is represented as four directed edges: Glucose $\to$ Hexokinase (weight 1), ATP $\to$ Hexokinase (weight 1), Hexokinase $\to$ Glucose-6-phosphate (weight 1), and Hexokinase $\to$ ADP (weight 1).

#### Diagram: Bipartite Metabolic Graph Structure

<iframe src="../../sims/bipartite-metabolic-graph/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Bipartite Metabolic Graph MicroSim Fullscreen](../../sims/bipartite-metabolic-graph/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: bipartite-metabolic-graph
Library: vis-network
Status: Specified

An interactive bipartite graph showing metabolite nodes (circles, teal) and reaction nodes (squares, orange). Directed edges show substrate-to-reaction and reaction-to-product connections with stoichiometric weights. The user can toggle between the bipartite view and a projected unipartite metabolite-only view.
</details>

This bipartite structure is the canonical **graph model for metabolism**. It maps naturally onto a graph database schema: metabolite nodes with properties like molecular formula, charge, and compartment; reaction nodes with properties like EC number, gene association, and reversibility; and directed edges labeled "substrate-of" or "product-of" carrying stoichiometric coefficients. This is exactly the data model used in Capstone Project 3 (Metabolic Model Comparison Across Organisms), where you will load genome-scale models for three related organisms into a graph database, compare pathway topology, and identify conserved and organism-specific modules.

From the bipartite graph, two useful projections can be derived. The **metabolite projection** connects two metabolites if they participate in a common reaction; this produces the familiar metabolic map seen on wall posters. The **reaction projection** connects two reactions if they share a metabolite; this reveals the dependencies between reactions that constrain metabolic flux.

## Pathway Databases: KEGG, Reactome, and BioCyc

Metabolic knowledge has been curated into several major databases. Understanding their strengths, data models, and access methods is essential for any metabolic network analysis.

**KEGG Pathways** (Kyoto Encyclopedia of Genes and Genomes) organizes metabolism into approximately 500 reference pathway maps that cover primary and secondary metabolism across all domains of life. KEGG assigns each reaction a unique R number and each compound a C number, then maps them onto hand-drawn pathway diagrams. Its REST API provides programmatic access to pathway membership, compound structures, and organism-specific pathway variants.

**Reactome Pathways** is an open-source, peer-reviewed database focused primarily on human biology but extending to model organisms through orthology. Reactome models reactions at a finer granular level than KEGG, explicitly representing molecular complexes, post-translational modifications, and subcellular compartmentalization. Its data model is a directed graph where events (reactions, pathways) are connected to physical entities (proteins, metabolites, complexes) by input, output, and catalyst edges.

**BioCyc Pathways** is a collection of over 20,000 organism-specific Pathway/Genome Databases (PGDBs). The flagship member, EcoCyc, is the most deeply curated metabolic database for *E. coli*. BioCyc distinguishes itself with computationally predicted pathways generated by the PathoLogic algorithm, which infers likely pathways from a genome annotation. This makes BioCyc especially useful for newly sequenced organisms.

| Feature | KEGG Pathways | Reactome Pathways | BioCyc Pathways |
|---------|--------------|-------------------|-----------------|
| Organism coverage | All domains of life (~7,000 organisms) | Human-centric, ~20 model organisms | ~20,000 organism-specific databases |
| Curation approach | Manual with computational extension | Manual, peer-reviewed | Manual (tier 1) + computational (PathoLogic) |
| Pathway granularity | Reference maps, moderate detail | Fine-grained, complex-level | Organism-specific, high detail |
| Data model | Flat maps with compound/reaction IDs | Event-based directed graph | Frame-based knowledge representation |
| Compartmentalization | Limited | Extensive (subcellular) | Extensive |
| API access | REST API (free for academic) | REST + GraphQL | Web services, BioCyc SmartTables |
| License | Free academic, paid commercial | Open source (CC0) | Free tier 1, subscription for full access |
| Unique strength | Broadest organism coverage, iconic maps | Deepest human pathway curation | Organism-specific computational prediction |

!!! mascot-tip "Tip: Choosing the Right Database"

    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Olli has a tip">
    If you are studying human disease metabolism, start with Reactome for its detailed curation and open license. For comparative genomics across many species, KEGG's breadth is unmatched. For a single microbial organism, check whether BioCyc has a curated PGDB -- if so, it will likely be the most accurate source.

## The Stoichiometric Matrix

To move from a qualitative graph to quantitative modeling, we encode the metabolic network as a **stoichiometric matrix** $S$. This matrix has $m$ rows (one per metabolite) and $n$ columns (one per reaction). Each entry $S_{ij}$ is the stoichiometric coefficient of metabolite $i$ in reaction $j$: negative if metabolite $i$ is consumed, positive if produced, and zero if uninvolved.

For a small network with metabolites $\{A, B, C\}$ and reactions $\{R_1: A \to B,\ R_2: B \to C,\ R_3: A \to C\}$:

$$S = \begin{bmatrix} -1 & 0 & -1 \\ 1 & -1 & 0 \\ 0 & 1 & 1 \end{bmatrix}$$

The stoichiometric matrix is the bridge between the bipartite graph and linear algebra. Each column of $S$ is the incidence vector for one reaction in the bipartite graph, and the sparsity pattern of $S$ mirrors the adjacency structure of the network. In genome-scale models, $S$ can have thousands of rows and columns, but it is highly sparse -- most enzymes touch only two to four metabolites.

## Flux Balance Analysis

**Flux balance analysis** (FBA) is the workhorse of **constraint-based modeling**. Rather than simulating dynamic concentrations over time (which requires kinetic parameters), FBA predicts the steady-state distribution of **metabolic flux** -- the rate of flow through each reaction -- by solving a linear program.

The key assumption is that the cell operates at metabolic steady state, meaning the concentration of each internal metabolite does not change over time:

$$S \cdot v = 0$$

where $v$ is the flux vector with one entry per reaction. Each flux is bounded by experimentally measured or estimated limits:

$$v_{\min,j} \leq v_j \leq v_{\max,j} \quad \text{for all reactions } j$$

Irreversible reactions have $v_{\min,j} = 0$. Reversible reactions can carry negative flux (reverse direction). Exchange reactions model the uptake or secretion of metabolites from the environment, and their bounds define the **minimal growth medium** -- the set of nutrients available to the cell.

FBA selects one flux distribution from the feasible space by optimizing an **objective function**. The most common objective is maximization of biomass production -- a synthetic reaction that drains precursor metabolites (amino acids, nucleotides, lipids, cofactors) in the ratios required to build new cell material:

$$\max\ c^T v \quad \text{subject to} \quad S \cdot v = 0,\quad v_{\min} \leq v \leq v_{\max}$$

where $c$ is a vector of objective coefficients, typically zero everywhere except for a 1 at the biomass reaction. This is a standard linear programming problem solvable in polynomial time.

#### Diagram: Flux Balance Analysis Formulation

<iframe src="../../sims/fba-formulation/main.html" width="100%" height="660" scrolling="no"></iframe>

*[View FBA Formulation MicroSim Fullscreen](../../sims/fba-formulation/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: fba-formulation
Library: p5.js
Status: Specified

An interactive diagram showing a small metabolic network (5-6 reactions) alongside its stoichiometric matrix $S$, flux vector $v$, and the LP formulation. Users can adjust exchange reaction bounds (nutrient uptake rates) with sliders and see how the optimal flux distribution changes. Flux values are displayed on the graph edges as proportional widths.
</details>

!!! mascot-thinking "Think About It: What Does the Objective Function Mean Biologically?"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    Maximizing biomass growth rate assumes that evolution has optimized cells for rapid growth -- a reasonable assumption for bacteria in nutrient-rich media. But what about cancer cells in a tumor, or yeast fermenting wine? Alternative objectives like maximizing ATP production, minimizing nutrient uptake, or maximizing a specific product yield can reveal different aspects of metabolic capability. The choice of objective function is a modeling decision, not a biological fact.

## Genome-Scale Metabolic Models

A **genome-scale model** (GEM, also known as a genome-scale metabolic reconstruction) attempts to include every metabolic reaction encoded in an organism's genome. Building a GEM is a multi-step process:

1. **Genome annotation** -- identify all protein-coding genes and assign EC numbers
2. **Reaction database lookup** -- map EC numbers to biochemical reactions using KEGG, Reactome, or BioCyc
3. **Draft reconstruction** -- assemble reactions into a network, adding transport reactions and exchange reactions
4. **Gap filling** -- identify dead-end metabolites (produced but never consumed, or vice versa) and add reactions to restore connectivity
5. **Biomass reaction definition** -- compose a biomass objective from measured or estimated cellular composition
6. **Model validation** -- compare predicted growth phenotypes against experimental data

The most widely used GEMs include iML1515 for *E. coli* (1,515 genes, 2,719 reactions, 1,192 metabolites), Recon3D for human metabolism (3,288 genes, 13,543 reactions), and Yeast8 for *Saccharomyces cerevisiae*. These models are distributed in SBML (Systems Biology Markup Language) format and can be loaded into tools like COBRApy (Python) or the COBRA Toolbox (MATLAB).

An **essential reaction** is one whose removal (setting its flux to zero) causes the predicted biomass flux to drop to zero -- the in silico equivalent of a lethal gene knockout. Predicting essential reactions is a key application of GEMs because essential genes are attractive drug targets in pathogens. The **minimal growth medium** can also be predicted by FBA: systematically remove nutrients from the exchange reactions and identify the smallest set that still supports growth.

## Graph Analysis of Metabolic Networks

Beyond FBA, the bipartite graph structure of metabolic networks enables purely topological analyses that reveal organizational principles.

**Degree distribution.** Metabolite nodes in metabolic networks follow an approximate power-law degree distribution: a few hub metabolites (water, ATP, NADH, CoA) participate in hundreds of reactions, while most metabolites appear in only one or two. This scale-free-like topology makes the network robust to random perturbations but vulnerable to targeted attack on hub nodes.

**Modularity and pathway clustering.** Community detection algorithms applied to metabolic graphs recover clusters that correspond well to textbook metabolic pathways. This validates both the algorithms and the biological organization of metabolism into semi-autonomous modules.

**Shortest path analysis.** The shortest path between two metabolites in the metabolite projection graph reveals the minimum number of reaction steps required to convert one compound to another. This metric is used in **metabolic engineering** and **synthetic biology** to design efficient biosynthetic routes for target compounds -- for example, engineering *E. coli* to produce artemisinic acid (an antimalarial precursor) by inserting a short pathway from mevalonate metabolism.

!!! mascot-warning "Watch Out: Currency Metabolites Distort Graph Distances"

    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Olli warns you">
    If you include ATP, water, and other currency metabolites in shortest path calculations, almost every metabolite pair appears to be only two or three steps apart -- because they all share a connection through these universal hubs. Best practice is to either remove currency metabolites from the graph before computing distances or weight edges by metabolite specificity (downweighting high-degree nodes).

## Metabolic Engineering and Synthetic Biology

**Metabolic engineering** applies genetic modifications to redirect metabolic flux toward a desired product. The bipartite graph model is central to this effort: engineers identify bottleneck reactions (low flux capacity), competing pathways (flux sinks that divert precursors), and heterologous pathways (reactions from other organisms that can be inserted to create new routes).

**Synthetic biology** extends metabolic engineering by designing entirely new pathways, regulatory circuits, and even minimal genomes. Graph-based design tools enumerate all possible routes between a source metabolite and a target product by searching the reaction graph of known biochemistry (databases like KEGG and MetaCyc). The shortest or highest-yield routes are then prioritized for experimental construction.

FBA plays a central role in both fields. Algorithms like OptKnock and OptForce use bilevel optimization to identify gene knockouts or overexpression targets that couple growth to product formation -- ensuring that the engineered organism cannot grow without also producing the target compound.

## Pathway Enrichment and Metabolomics

**Pathway enrichment** analysis tests whether a set of metabolites (or genes) is overrepresented in a particular metabolic pathway compared to what would be expected by chance. This is the metabolic analog of Gene Ontology enrichment analysis. Given a list of differentially abundant metabolites from an experiment, pathway enrichment identifies which biological processes are most affected.

**Metabolomics** is the large-scale study of metabolites in biological samples. Unlike genomics (which measures a static blueprint) or transcriptomics (which measures gene expression), metabolomics captures the downstream functional output of cellular activity. The metabolome is highly dynamic, changing on timescales of seconds to minutes.

**Mass spectrometry for metabolomics** (**mass spec for metabolomics**) is the dominant analytical platform. Liquid chromatography coupled with tandem mass spectrometry (LC-MS/MS) can detect and quantify thousands of metabolites in a single sample. The workflow involves:

1. **Sample preparation** -- extract metabolites from cells or tissue
2. **Chromatographic separation** -- separate metabolites by chemical properties (polarity, mass)
3. **Mass detection** -- measure mass-to-charge ratios ($m/z$) to identify compounds
4. **Feature extraction** -- group related signals into metabolite features
5. **Statistical analysis** -- identify differentially abundant metabolites between conditions
6. **Pathway mapping** -- map significant metabolites onto the metabolic network graph

The integration of metabolomics data with genome-scale models is a frontier area. Measured metabolite concentrations can constrain thermodynamic feasibility of reactions (a reaction cannot proceed if it would violate the second law of thermodynamics), and metabolic flux measurements from isotope tracing experiments can validate or refine FBA predictions.

#### Diagram: Metabolomics to Network Mapping Pipeline

<iframe src="../../sims/metabolomics-pipeline/main.html" width="100%" height="640" scrolling="no"></iframe>

*[View Metabolomics Pipeline MicroSim Fullscreen](../../sims/metabolomics-pipeline/main.html)*

<details>
<summary>Diagram Details</summary>

sim-id: metabolomics-pipeline
Library: p5.js
Status: Specified

A step-by-step pipeline diagram showing the flow from biological sample through LC-MS/MS, feature extraction, statistical testing, and pathway enrichment, ending with highlighted metabolites on a metabolic network graph. Each step is clickable to reveal details.
</details>

## Metabolic Network Comparison and Graph Alignment

Comparing metabolic networks across organisms reveals evolutionary conservation and adaptation. **Metabolic network comparison** asks: which pathways are shared between two organisms, which are unique to one, and how has the topology of shared pathways diverged?

The simplest approach is reaction-set comparison -- compute the Jaccard index between the reaction sets of two organisms. But this ignores topology. **Metabolic graph alignment** applies graph matching algorithms to find the best correspondence between nodes and edges in two metabolic bipartite graphs. This is computationally challenging (subgraph isomorphism is NP-complete in general), so practical algorithms use heuristics:

- **Seed-and-extend** -- begin with high-confidence node matches (e.g., reactions with identical EC numbers) and extend the alignment to neighboring nodes
- **Network clustering** -- decompose each network into pathway modules and align modules pairwise
- **Graph kernel methods** -- compute graph similarity without explicit alignment by comparing substructure distributions (random walks, graphlets)

These approaches are directly relevant to Capstone Project 3, where you will load genome-scale metabolic models for three related organisms into a graph database, compare pathway topology using Cypher or SPARQL queries, and identify conserved and organism-specific metabolic modules. The bipartite graph data model -- with metabolite nodes, reaction nodes, and an "organism" property on each reaction -- enables cross-species filtering in a single query.

!!! mascot-thinking "Think About It: Conservation Reveals Function"

    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Olli is thinking">
    If a metabolic pathway is conserved across bacteria, yeast, and humans despite a billion years of evolution, it almost certainly performs an essential function. Conversely, pathways found only in pathogens but not in the human host are promising drug targets -- disrupting them would kill the pathogen without harming the patient. Graph alignment helps identify both categories systematically.

## Putting It All Together: From Graph to Genome-Scale Prediction

The power of metabolic network modeling lies in the seamless connection between graph structure and quantitative prediction. Starting from a genome sequence, we can:

1. **Annotate** genes to identify enzymes (EC numbers)
2. **Build** a bipartite metabolic graph from pathway databases (KEGG, Reactome, BioCyc)
3. **Encode** the graph as a stoichiometric matrix $S$
4. **Constrain** reaction fluxes with experimental bounds
5. **Optimize** an objective function using FBA to predict growth rates, essential reactions, and metabolic capabilities
6. **Validate** predictions against metabolomics data (mass spectrometry) and experimental phenotypes
7. **Compare** networks across organisms using graph alignment to understand metabolic evolution

This pipeline transforms a static genome into a predictive model of cellular metabolism -- a remarkable achievement that underpins modern metabolic engineering, drug target identification, and our understanding of microbial ecology.

!!! mascot-celebration "Great Work, Explorers!"

    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Olli celebrates">
    You have navigated the full landscape of metabolic pathway modeling -- from individual enzymes to genome-scale models, from bipartite graphs to flux balance analysis, and from single-organism models to cross-species comparisons. These tools and concepts prepare you for Capstone Project 3, where you will build and compare metabolic models in a graph database. Follow the edges!

## Key Takeaways

1. A **metabolic network** represents the complete set of biochemical reactions in a cell, where **metabolites** are transformed by **enzymes** following rules described by **enzyme kinetics**.

2. The **bipartite metabolic graph** is the canonical **graph model for metabolism**: metabolite nodes and reaction nodes form two disjoint sets connected by directed, stoichiometrically weighted edges.

3. Three major **metabolic pathway** databases -- **KEGG Pathways**, **Reactome Pathways**, and **BioCyc Pathways** -- differ in organism coverage, curation approach, and data model but are complementary in practice.

4. The **stoichiometric matrix** $S$ encodes the bipartite graph as a matrix, enabling the formulation of **flux balance analysis** (FBA) as a linear program: maximize an **objective function** $c^Tv$ subject to steady-state constraints ($Sv = 0$) and flux bounds.

5. **Constraint-based modeling** avoids the need for kinetic parameters by reasoning about **metabolic flux** distributions that satisfy stoichiometric and capacity constraints.

6. **Genome-scale models** reconstruct entire metabolic networks from genome annotations and predict **essential reactions**, **minimal growth media**, and growth phenotypes.

7. Graph topology analysis of metabolic networks reveals scale-free-like degree distributions, modular pathway structure, and shortest-path distances relevant to **metabolic engineering** and **synthetic biology**.

8. **Pathway enrichment** connects experimental **metabolomics** results (often obtained via **mass spectrometry for metabolomics**) to biological pathways on the metabolic network graph.

9. **Metabolic network comparison** and **metabolic graph alignment** enable cross-species analysis of conserved and divergent metabolism, forming the basis for Capstone Project 3.

[See Annotated References](./references.md)
