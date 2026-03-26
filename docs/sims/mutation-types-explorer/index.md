---
title: Mutation Types and Their Effects on Protein Sequence
description: Interactive tool for applying different mutation types (SNPs, insertions, deletions) to a DNA sequence and visualizing how each mutation affects the resulting protein.
image: /sims/mutation-types-explorer/mutation-types-explorer.png
og:image: /sims/mutation-types-explorer/mutation-types-explorer.png
twitter:image: /sims/mutation-types-explorer/mutation-types-explorer.png
social:
   cards: false
quality_score: 3
---

# Mutation Types and Their Effects on Protein Sequence

<iframe src="main.html" height="522" width="100%" scrolling="no"></iframe>

[Run the Mutation Types and Their Effects on Protein Sequence MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim lets students apply different types of **DNA mutations** to a reference sequence and immediately see how each mutation affects the encoded protein. The side-by-side comparison of the original and mutated sequences makes the relationship between genotype and phenotype concrete and visual.

### Mutation Types

- **SNP — Synonymous** — A single nucleotide change that does not alter the amino acid (due to codon degeneracy). The protein is unchanged.
- **SNP — Missense** — A single nucleotide change that substitutes one amino acid for another. The protein has a different residue at that position.
- **SNP — Nonsense** — A single nucleotide change that creates a premature stop codon, truncating the protein.
- **1-bp Insertion** — A single base is inserted, shifting the reading frame of all downstream codons (frameshift mutation).
- **1-bp Deletion** — A single base is removed, causing a frameshift in the opposite direction.
- **3-bp Deletion** — Three consecutive bases are removed, deleting one amino acid without shifting the reading frame (in-frame deletion).

### Visual Encoding

- **Reference sequence** is shown on top with bases color-coded: A (green), T (red), G (yellow), C (blue)
- **Mutated sequence** is shown below with changed bases highlighted
- **Codons** are grouped and translated to amino acids for both sequences
- **Changed amino acids** are visually highlighted so students can see exactly where the protein differs

## How to Use

1. **Mutation type dropdown** — Select the type of mutation to apply (SNP synonymous, missense, nonsense, insertion, deletion)
2. **Position slider** — Choose where in the DNA sequence the mutation occurs (0-indexed)
3. **Apply Mutation button** — Apply the selected mutation at the chosen position
4. **Reset button** — Return to the original reference sequence

### Suggested Experiments

- Apply a **synonymous SNP** and verify that the protein sequence is identical despite the DNA change. This demonstrates codon degeneracy.
- Apply a **missense SNP** at the same position and compare — now a single amino acid differs.
- Apply a **1-bp insertion** early in the sequence and observe how every downstream codon and amino acid changes — this is the devastating effect of a frameshift.
- Apply a **3-bp deletion** and notice that only one amino acid is removed while the rest of the protein remains intact — this is an in-frame deletion.
- Compare a **nonsense SNP** to a frameshift — both can truncate the protein, but by different mechanisms.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/mutation-types-explorer/main.html"
        height="522"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of DNA base pairing and the genetic code
- Knowledge of codons and how mRNA is translated into protein
- Basic concept of mutations as changes to DNA sequence

### Activities

1. **Exploration** (5 min): Apply each of the six mutation types one at a time. For each, note: (a) how many DNA bases changed, (b) how many amino acids changed, (c) whether the protein length changed.
2. **Guided Practice** (5 min): Apply a 1-bp insertion at position 3 (early in the sequence) and then at position 15 (near the end). Compare the extent of protein damage in each case. Why does the position of a frameshift mutation matter?
3. **Comparative Analysis** (5 min): Apply a synonymous SNP, a missense SNP, and a nonsense SNP all at position 6. Rank these from least to most damaging and explain your reasoning.
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. Why can a single nucleotide change sometimes have no effect on the protein (synonymous) while other times it is catastrophic (nonsense)?
2. Explain why a 1-bp insertion is generally more damaging than a single-base substitution.
3. Why is a 3-bp deletion (in-frame) usually less damaging than a 1-bp deletion (frameshift)?
4. Sickle cell disease is caused by a single missense mutation in the hemoglobin gene. Use this MicroSim to explain how one amino acid change can alter protein function.

## References

1. [Mutation — Wikipedia](https://en.wikipedia.org/wiki/Mutation)
2. [Point mutation — Wikipedia](https://en.wikipedia.org/wiki/Point_mutation)
3. [Frameshift mutation — Wikipedia](https://en.wikipedia.org/wiki/Frameshift_mutation)
4. [Nonsense mutation — Wikipedia](https://en.wikipedia.org/wiki/Nonsense_mutation)
5. [Genetic code degeneracy — Wikipedia](https://en.wikipedia.org/wiki/Codon_degeneracy)
