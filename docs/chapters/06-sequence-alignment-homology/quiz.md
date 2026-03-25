# Quiz: Sequence Alignment and Homology

Test your understanding of pairwise and multiple sequence alignment, BLAST, scoring matrices, hidden Markov models, and sequence similarity networks.

---

#### 1. What is the key difference between the Needleman-Wunsch and Smith-Waterman alignment algorithms?

<div class="upper-alpha" markdown>
1. Needleman-Wunsch uses scoring matrices while Smith-Waterman does not
2. Needleman-Wunsch performs global (end-to-end) alignment while Smith-Waterman finds the best local (subsequence) alignment
3. Smith-Waterman is faster than Needleman-Wunsch because it skips the traceback step
4. Needleman-Wunsch can only align DNA while Smith-Waterman works for proteins
</div>

??? question "Show Answer"
    The correct answer is **B**. Needleman-Wunsch finds the optimal global alignment of two complete sequences from end to end. Smith-Waterman finds the highest-scoring local alignment by adding a zero option to the recurrence (allowing alignment restarts) and initiating traceback from the highest-scoring cell rather than the bottom-right corner. Both use dynamic programming with $O(mn)$ time complexity and both use scoring matrices.

    **Concept Tested:** Global Alignment and Local Alignment

---

#### 2. In BLAST, what does the E-value represent?

<div class="upper-alpha" markdown>
1. The percentage of identical residues between query and target sequences
2. The energy of the molecular interaction between the two aligned proteins
3. The expected number of alignments with an equal or better score that would occur by chance in a database of the given size
4. The evolutionary distance between two homologous sequences
</div>

??? question "Show Answer"
    The correct answer is **C**. The E-value estimates the number of alignments with a score at least as good as the observed score that would be expected by chance when searching a database of a given size. It is calculated as $E = K \cdot m \cdot n \cdot e^{-\lambda S}$. An E-value of $10^{-5}$ means such a match would occur by chance only once in 100,000 random searches. E-values below $10^{-3}$ are generally considered significant.

    **Concept Tested:** BLAST E-Value

---

#### 3. What is the advantage of the affine gap penalty model over the linear gap penalty model?

<div class="upper-alpha" markdown>
1. Affine gap penalties are computationally cheaper to calculate
2. Affine gap penalties separate the cost of opening a gap from extending it, favoring fewer longer gaps over many short ones, which better reflects biological indel patterns
3. Affine gap penalties eliminate the need for a scoring matrix
4. Affine gap penalties only apply to DNA sequences, not proteins
</div>

??? question "Show Answer"
    The correct answer is **B**. The affine gap penalty model uses a large penalty for opening a gap ($d_{\text{open}}$) and a smaller penalty for extending it ($d_{\text{extend}}$), expressed as $P(g) = d_{\text{open}} + (g-1) \cdot d_{\text{extend}}$. This reflects the biological observation that once an indel event begins, extending it is more likely than starting a new one. The result is biologically more realistic alignments with fewer, longer gaps rather than many scattered short gaps.

    **Concept Tested:** Affine Gap Penalty

---

#### 4. What distinguishes orthologs from paralogs?

<div class="upper-alpha" markdown>
1. Orthologs have higher sequence identity than paralogs
2. Orthologs diverged through speciation events while paralogs diverged through gene duplication events
3. Paralogs are found only in prokaryotes while orthologs are found in eukaryotes
4. Orthologs always have identical functions while paralogs never do
</div>

??? question "Show Answer"
    The correct answer is **B**. Orthologs are genes in different species that diverged through a speciation event and typically retain the same function. Paralogs are genes that diverged through a gene duplication event, after which one or both copies may acquire new functions (neofunctionalization) or divide the ancestral function (subfunctionalization). The distinction is critical for functional annotation because transferring function from an ortholog is much more reliable than from a paralog.

    **Concept Tested:** Orthologs and Paralogs

---

#### 5. Why is BLAST much faster than Smith-Waterman for database searches, and what does it sacrifice?

<div class="upper-alpha" markdown>
1. BLAST uses a lookup table approach and heuristic extensions rather than full dynamic programming, sacrificing a small amount of sensitivity for enormous speed gains
2. BLAST aligns only the first 100 residues of each sequence, sacrificing coverage for speed
3. BLAST uses a simpler scoring matrix, sacrificing accuracy for computational efficiency
4. BLAST runs on specialized hardware (GPUs) while Smith-Waterman is CPU-only
</div>

??? question "Show Answer"
    The correct answer is **A**. BLAST uses a three-stage heuristic approach: seeding (finding short word matches), extension (expanding hits in both directions), and statistical evaluation. This avoids the full $O(mn)$ dynamic programming computation for every database sequence. BLAST sacrifices a small amount of sensitivity — it may miss some weak matches that Smith-Waterman would find — but gains orders of magnitude in speed, making searches of billions of residues practical.

    **Concept Tested:** BLAST Heuristics

---

#### 6. What is the purpose of a scoring matrix like BLOSUM62 in sequence alignment?

<div class="upper-alpha" markdown>
1. It determines the maximum length of sequences that can be aligned
2. It assigns numerical scores to every pair of residues based on observed evolutionary substitution frequencies
3. It converts DNA sequences to protein sequences during alignment
4. It calculates the three-dimensional structure of the aligned proteins
</div>

??? question "Show Answer"
    The correct answer is **B**. Scoring matrices like BLOSUM62 assign a numerical score to every possible pair of amino acids based on how frequently those substitutions are observed in evolutionarily related protein sequences. For example, BLOSUM62 gives tryptophan-tryptophan (W,W) a score of +11 because conserved tryptophan is strong evidence of shared ancestry, while tryptophan-glycine (W,G) scores -3 because this substitution is rarely observed. The matrix encodes an evolutionary substitution model.

    **Concept Tested:** Scoring Matrices and BLOSUM Matrix

---

#### 7. In a sequence similarity network, what do nodes and edges represent?

<div class="upper-alpha" markdown>
1. Nodes represent amino acids and edges represent peptide bonds
2. Nodes represent databases and edges represent cross-references
3. Nodes represent protein sequences and edges connect sequences whose alignment score exceeds a chosen threshold
4. Nodes represent alignment algorithms and edges represent input-output relationships
</div>

??? question "Show Answer"
    The correct answer is **C**. In a sequence similarity network (SSN), each node represents a protein or gene sequence, and each edge connects two sequences whose pairwise alignment score exceeds a chosen threshold (often an E-value cutoff). Edges may be weighted by sequence identity, bit score, or negative log E-value. At stringent thresholds, the network breaks into tight clusters corresponding to protein families. Relaxing the threshold merges clusters, revealing superfamily relationships.

    **Concept Tested:** Sequence Similarity Network

---

#### 8. What are the three types of states in a profile HMM?

<div class="upper-alpha" markdown>
1. Start states, end states, and transition states
2. Match states, insert states, and delete states
3. Forward states, backward states, and Viterbi states
4. Global states, local states, and hybrid states
</div>

??? question "Show Answer"
    The correct answer is **B**. A profile HMM contains three types of states for each column of a multiple sequence alignment: match states (emit residues according to observed frequencies), insert states (emit residues to model insertions relative to the consensus), and delete states (silent states that produce no output, modeling gaps). The transitions between these states capture patterns of insertions and deletions, making profile HMMs more sensitive than simple sequence profiles for detecting remote homologs.

    **Concept Tested:** Profile HMM

---

#### 9. How does PSI-BLAST improve upon standard BLAST for detecting remote homologs?

<div class="upper-alpha" markdown>
1. PSI-BLAST uses a larger word size for faster seeding
2. PSI-BLAST constructs a position-specific scoring matrix from initial hits and iteratively searches with the refined profile
3. PSI-BLAST eliminates the need for gap penalties
4. PSI-BLAST only searches curated databases like Swiss-Prot
</div>

??? question "Show Answer"
    The correct answer is **B**. PSI-BLAST (Position-Specific Iterated BLAST) performs an initial standard BLAST search, then constructs a position-specific scoring matrix (PSSM) from the significant hits. This profile captures position-specific residue preferences and is used as the query for subsequent rounds. Each iteration can recruit additional distant homologs, refining the profile further. This iterative approach makes PSI-BLAST particularly powerful for detecting proteins with very low sequence identity that standard BLAST would miss.

    **Concept Tested:** PSI-BLAST

---

#### 10. Why is the statement "these sequences share 40% homology" scientifically incorrect?

<div class="upper-alpha" markdown>
1. Homology cannot be measured above 30%
2. The correct unit is "40% alignment" rather than "40% homology"
3. Homology is a qualitative all-or-nothing assertion about shared ancestry, not a quantitative percentage; the correct term is "40% sequence identity"
4. Homology only applies to DNA sequences, not protein sequences
</div>

??? question "Show Answer"
    The correct answer is **C**. Homology is a qualitative statement about evolutionary history: two sequences are either homologous (sharing a common ancestor) or they are not. It is not a matter of degree. What varies quantitatively is sequence identity (percentage of identical aligned residues) or sequence similarity (including biochemically conservative substitutions). The correct phrasing is "these sequences share 40% sequence identity" or "these sequences are homologous with 40% identity."

    **Concept Tested:** Sequence Homology and Sequence Identity
