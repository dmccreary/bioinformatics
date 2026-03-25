# Quiz: Phylogenetics and Evolutionary Graphs

Test your understanding of phylogenetic tree construction methods, evolutionary models, tree interpretation, and phylogenetic networks.

---

#### 1. What is the fundamental assumption of the UPGMA method that limits its accuracy?

<div class="upper-alpha" markdown>
1. It assumes all sequences have equal length
2. It assumes a molecular clock, meaning all lineages evolve at the same constant rate
3. It assumes no gaps exist in the sequence alignment
4. It assumes all taxa are from the same species
</div>

??? question "Show Answer"
    The correct answer is **B**. UPGMA assumes a molecular clock, meaning that all lineages evolve at the same constant rate. When this assumption holds, UPGMA produces correct ultrametric trees where all root-to-tip distances are equal. However, rate variation across lineages is common in real data, and when rates differ, UPGMA can produce incorrect tree topologies. The neighbor-joining method removes this assumption and is more widely used for this reason.

    **Concept Tested:** UPGMA Method and Molecular Clock

---

#### 2. How does the neighbor-joining method improve upon UPGMA for phylogenetic tree construction?

<div class="upper-alpha" markdown>
1. It uses protein structures instead of sequences
2. It removes the molecular clock assumption by identifying the pair whose joining minimizes total branch length
3. It requires fewer computational resources
4. It produces only unrooted trees and cannot estimate branch lengths
</div>

??? question "Show Answer"
    The correct answer is **B**. The neighbor-joining method does not assume a molecular clock. Instead of simply joining the closest pair of taxa (as UPGMA does), it uses a corrected distance matrix $Q$ to identify the pair whose joining minimizes the total branch length of the resulting tree. This correction accounts for rate variation across lineages, making neighbor-joining more accurate than UPGMA for most real biological datasets.

    **Concept Tested:** Neighbor-Joining Method

---

#### 3. What is a monophyletic group (clade) on a phylogenetic tree?

<div class="upper-alpha" markdown>
1. A group of organisms that share morphological features but not evolutionary history
2. A group consisting of an ancestor and all of its descendants, forming a complete subtree
3. A group of organisms from the same geographic region
4. A group defined by excluding certain descendants from an ancestral lineage
</div>

??? question "Show Answer"
    The correct answer is **B**. A monophyletic group (clade) consists of an ancestor and all of its descendants, forming a complete subtree rooted at an internal node. Monophyletic groups are the gold standard of biological classification. Option D describes a paraphyletic group, which includes an ancestor but excludes some descendants (e.g., traditional "reptiles" excluding birds). Detecting monophyly is a graph operation using lowest common ancestor algorithms on the tree.

    **Concept Tested:** Monophyletic Group

---

#### 4. Why are phylogenetic trees considered a special case of directed acyclic graphs (DAGs)?

<div class="upper-alpha" markdown>
1. Because phylogenetic trees allow cycles representing gene conversion events
2. Because rooted trees have edges directed from ancestor to descendant, cycles are impossible, and there is a single source node (the root)
3. Because phylogenetic trees can have multiple roots representing different origins of life
4. Because all nodes in a phylogenetic tree have the same number of descendants
</div>

??? question "Show Answer"
    The correct answer is **B**. Rooted phylogenetic trees are DAGs because each edge is implicitly directed from ancestor to descendant, cycles are impossible (a descendant cannot be its own ancestor), and there is a single source node (the root) from which all other nodes are reachable. Recognizing trees as DAGs connects phylogenetics to graph theory algorithms including topological sorting, tree traversal, and lowest common ancestor queries.

    **Concept Tested:** Trees as DAGs

---

#### 5. What is the purpose of bootstrap analysis in phylogenetics?

<div class="upper-alpha" markdown>
1. To speed up tree construction by reducing the number of sequences
2. To convert an unrooted tree into a rooted tree
3. To assess statistical support for branches by resampling alignment columns and checking how often each clade appears
4. To calculate the evolutionary distance between all pairs of taxa
</div>

??? question "Show Answer"
    The correct answer is **C**. Bootstrap analysis assesses the statistical confidence of each branch in a phylogenetic tree. It works by creating many pseudoreplicate datasets through random resampling of alignment columns with replacement, building a tree from each pseudoreplicate, and recording how frequently each clade appears across all replicates. A bootstrap value of 95% means that clade appeared in 95% of replicate trees, indicating strong support. Values below 70% are generally considered weak.

    **Concept Tested:** Bootstrap Analysis

---

#### 6. When does phylogenetic analysis require networks rather than trees?

<div class="upper-alpha" markdown>
1. When sequences are too short for meaningful alignment
2. When reticulate events such as horizontal gene transfer, recombination, or hybridization violate the strictly branching tree model
3. When the number of taxa exceeds 1,000
4. When using distance-based methods instead of likelihood methods
</div>

??? question "Show Answer"
    The correct answer is **B**. Phylogenetic networks are needed when evolution involves reticulate events that violate the assumption of strictly bifurcating descent. Horizontal gene transfer (common in bacteria), recombination, hybridization, and incomplete lineage sorting all create situations where different genomic regions have different evolutionary histories. Trees cannot represent these events, but phylogenetic networks can, using additional edges that connect non-adjacent branches.

    **Concept Tested:** Phylogenetic Networks and Reticulate Evolution

---

#### 7. What distinguishes a phylogram from a cladogram?

<div class="upper-alpha" markdown>
1. A phylogram includes extinct species while a cladogram does not
2. A cladogram uses molecular data while a phylogram uses morphological data
3. A phylogram draws branch lengths proportional to evolutionary change while a cladogram shows only the branching pattern
4. A cladogram can only display binary trees while a phylogram allows multifurcations
</div>

??? question "Show Answer"
    The correct answer is **C**. A phylogram displays branch lengths proportional to the amount of evolutionary change (e.g., substitutions per site), providing information about both topology and the tempo of evolution. A cladogram displays only the branching pattern with all branches drawn at equal length, used when only the topology matters. Both can be constructed from the same data; the difference is in how the information is displayed.

    **Concept Tested:** Cladogram and Phylogram

---

#### 8. What is an outgroup and why is it used in phylogenetic analysis?

<div class="upper-alpha" markdown>
1. A taxon known to be more distantly related to all study taxa, used to root the tree by defining the ancestral branch point
2. A duplicate sequence removed before tree construction to reduce redundancy
3. A group of taxa excluded from analysis due to poor sequence quality
4. The largest clade identified after tree construction
</div>

??? question "Show Answer"
    The correct answer is **A**. An outgroup is a taxon known to be more distantly related to all other taxa in the study than they are to each other. The branch connecting the outgroup to the rest of the tree (the ingroup) defines the root position, converting an unrooted tree into a rooted one. For example, when studying relationships among mammals, a reptile species might serve as the outgroup. Alternative rooting methods include midpoint rooting and molecular clock rooting.

    **Concept Tested:** Outgroup and Rooted vs Unrooted Trees

---

#### 9. What does the Robinson-Foulds distance measure?

<div class="upper-alpha" markdown>
1. The evolutionary distance between two sequences based on substitution rates
2. The physical distance between two genes on the same chromosome
3. The topological difference between two phylogenetic trees based on the number of bipartitions unique to each tree
4. The branch length difference between the longest and shortest paths in a single tree
</div>

??? question "Show Answer"
    The correct answer is **C**. The Robinson-Foulds distance is a metric for comparing two phylogenetic tree topologies. It counts the number of bipartitions (splits of the leaf set defined by removing an edge) that are present in one tree but not the other. A Robinson-Foulds distance of zero means the two trees have identical topologies. This metric is widely used to compare trees produced by different methods or from different genomic regions to assess congruence.

    **Concept Tested:** Robinson-Foulds Distance and Tree Topology Comparison

---

#### 10. What is the gene tree versus species tree conflict, and what causes it?

<div class="upper-alpha" markdown>
1. Gene trees are always more accurate than species trees
2. The conflict arises because different genes can have different evolutionary histories due to processes like incomplete lineage sorting, horizontal gene transfer, and gene duplication
3. Species trees can only be built from morphological data while gene trees use molecular data
4. Gene trees represent relationships within a single genome while species trees represent relationships between chromosomes
</div>

??? question "Show Answer"
    The correct answer is **B**. The gene tree versus species tree problem arises because different genes within the same set of organisms can have different evolutionary histories. Processes such as incomplete lineage sorting (ancestral polymorphisms sorting differently in descendant lineages), horizontal gene transfer, and gene duplication/loss cause individual gene trees to differ from the underlying species tree. Coalescent theory and multi-locus methods address this conflict by reconciling multiple gene trees into a single species tree estimate.

    **Concept Tested:** Gene Tree vs Species Tree
