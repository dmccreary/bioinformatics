---
title: Rooted and Unrooted Phylogenetic Trees
description: Interactive display of three phylogenetic tree representations (cladogram, phylogram, unrooted) for the same set of taxa, with selectable datasets for mammals, bacteria, and plants.
image: /sims/phylogenetic-tree-types/phylogenetic-tree-types.png
og:image: /sims/phylogenetic-tree-types/phylogenetic-tree-types.png
twitter:image: /sims/phylogenetic-tree-types/phylogenetic-tree-types.png
social:
   cards: false
quality_score: 3
---

# Rooted and Unrooted Phylogenetic Trees

<iframe src="main.html" height="590" width="100%" scrolling="no"></iframe>

[Run the Rooted and Unrooted Phylogenetic Trees MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim displays the **same evolutionary relationships** in three different phylogenetic tree formats, side by side. Students can switch between three taxonomic datasets (Mammals, Bacteria, Plants) to see how the same tree topology looks in each representation.

### Three Tree Representations

- **Cladogram** (left) — Shows only the branching pattern (topology) with equal branch lengths. The focus is on *who is related to whom*, not on how much change occurred. All taxa are aligned at the right edge.
- **Phylogram** (center) — Branch lengths are proportional to the amount of evolutionary change (e.g., nucleotide substitutions per site). Longer branches indicate more divergence from the ancestor.
- **Unrooted tree** (right) — Shows the same relationships without designating an ancestor (root). This is the raw output of many tree-building algorithms. An outgroup is needed to determine where the root should be placed.

### Example Datasets

- **Mammals** — Human, Chimp, Gorilla, Mouse, Dog, Opossum (outgroup)
- **Bacteria** — E. coli, Salmonella, B. subtilis, S. aureus, M. tuberculosis, Archaea sp. (outgroup)
- **Plants** — Rice, Wheat, Maize, Arabidopsis, Tomato, Pine (outgroup)

## How to Use

1. **Dataset dropdown** — Switch between Mammals, Bacteria, and Plants to see different taxonomic examples
2. **Compare representations** — The same tree is shown in all three formats. Notice that the topology (branching order) is identical, but the visual emphasis differs.
3. **Read branch lengths** — In the phylogram, compare branch lengths between closely related taxa (short branches) and distantly related taxa (long branches to the outgroup).

### Suggested Exploration

- Start with Mammals: Human and Chimp have very short branches in the phylogram (recently diverged), while Opossum has a very long branch (diverged ~180 million years ago)
- Switch to Bacteria and notice that the branch lengths are much more variable — reflecting the vast evolutionary distances between bacterial phyla
- Compare the cladogram and phylogram for Plants — Rice, Wheat, and Maize (all grasses) cluster tightly in the phylogram but appear equally spaced in the cladogram

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/phylogenetic-tree-types/main.html"
        height="590"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Basic understanding of evolution and common ancestry
- Concept of DNA sequence divergence over evolutionary time
- Familiarity with taxonomic classification

### Activities

1. **Exploration** (5 min): With the Mammals dataset, compare all three representations. Identify Human's closest relative in each view. Does the answer change depending on the representation? It shouldn't — the topology is the same.
2. **Branch Length Interpretation** (5 min): In the phylogram, which mammal has the longest branch? What does this mean biologically? Why might Opossum (a marsupial) have a longer branch than Mouse (a placental mammal)?
3. **Rooting Exercise** (5 min): Look at the unrooted tree. If you did not know which taxon was the outgroup, could you determine the root? Discuss why outgroup selection matters for interpreting evolutionary relationships.
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What information does a phylogram convey that a cladogram does not?
2. Why can't you determine the direction of evolution (which taxon is ancestral) from an unrooted tree?
3. In the Mammals phylogram, Human and Chimp have similar branch lengths from their common ancestor. What does this imply about their rates of molecular evolution?
4. You are building a phylogenetic tree of fish species and include a shark as an outgroup. Why is outgroup selection important for rooting the tree?

## References

1. [Phylogenetic tree — Wikipedia](https://en.wikipedia.org/wiki/Phylogenetic_tree)
2. [Cladogram — Wikipedia](https://en.wikipedia.org/wiki/Cladogram)
3. [Outgroup (cladistics) — Wikipedia](https://en.wikipedia.org/wiki/Outgroup_(cladistics))
4. [Molecular phylogenetics — Wikipedia](https://en.wikipedia.org/wiki/Molecular_phylogenetics)
5. [Phylogenetics — Wikipedia](https://en.wikipedia.org/wiki/Phylogenetics)
