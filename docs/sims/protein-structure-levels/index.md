---
title: Protein Structure Hierarchy
description: Interactive four-panel display of the four levels of protein structure (primary, secondary, tertiary, quaternary) with clickable panels showing structural details, stabilizing forces, and data formats.
image: /sims/protein-structure-levels/protein-structure-levels.png
og:image: /sims/protein-structure-levels/protein-structure-levels.png
twitter:image: /sims/protein-structure-levels/protein-structure-levels.png
social:
   cards: false
quality_score: 3
---

# Protein Structure Hierarchy

<iframe src="main.html" height="560" width="100%" scrolling="no"></iframe>

[Run the Protein Structure Hierarchy MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim presents the **four levels of protein structure** as interactive, expandable panels. Clicking any panel reveals a detailed description with a visual representation, the stabilizing forces at that level, and the bioinformatics data format used to represent it.

### The Four Levels

- **Primary** (green) — The linear amino acid sequence from N-terminus to C-terminus, encoded by the gene and linked by peptide bonds. Stored in FASTA format.
- **Secondary** (blue) — Local folding patterns (alpha helices and beta sheets) stabilized by backbone hydrogen bonds between NH and C=O groups. Annotated in DSSP / PDB format.
- **Tertiary** (orange) — The complete 3D fold of a single polypeptide chain, stabilized by side-chain interactions including hydrophobic packing, disulfide bonds, ionic bonds, and van der Waals forces. Stored in PDB / mmCIF format.
- **Quaternary** (purple) — The arrangement of multiple polypeptide subunits into a functional complex (e.g., hemoglobin's alpha-2-beta-2 tetramer). Not all proteins have quaternary structure. Stored in PDB biological assembly format.

### Why This Matters for Bioinformatics

Protein structure prediction is one of bioinformatics' grand challenges. Understanding the hierarchy helps students appreciate:

- Why sequence (primary) determines structure (AlphaFold predicts 3D from sequence)
- How different data formats capture different structural levels
- Why structure-function relationships depend on all four levels

## How to Use

1. **Click any panel** to expand it and see the detailed description, stabilizing forces, and data format
2. **Click the expanded panel** or use the **Reset** button to return to the four-panel overview
3. **Read the visual** — each panel includes a schematic of that structural level (amino acid chain, helix/sheet, 3D fold, multi-subunit complex)

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/protein-structure-levels/main.html"
        height="560"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
10-15 minutes

### Prerequisites

- Knowledge of amino acids as the building blocks of proteins
- Understanding that genes encode protein sequences
- Basic concept of molecular bonds (covalent, hydrogen, ionic)

### Activities

1. **Exploration** (4 min): Click each panel in order from Primary to Quaternary. For each level, note: (a) what stabilizing forces hold it together, (b) what data format represents it, (c) how it differs from the previous level.
2. **Guided Practice** (4 min): A missense mutation changes one amino acid in a protein. Which structural level is directly affected? How might this change propagate to affect secondary, tertiary, or quaternary structure? Discuss using the panel descriptions.
3. **Discussion** (4 min): AlphaFold takes primary structure as input and predicts tertiary structure. Why is this considered a major breakthrough? What information about quaternary structure might it miss?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. List the four levels of protein structure and the dominant stabilizing force at each level.
2. Why does primary structure determine all higher levels of structure?
3. A protein has a cysteine-to-serine mutation. Which level of structure is most likely affected, and why? (Hint: think about disulfide bonds.)
4. Hemoglobin is an alpha-2-beta-2 tetramer. Which structural level describes this arrangement?

## References

1. [Protein structure — Wikipedia](https://en.wikipedia.org/wiki/Protein_structure)
2. [Alpha helix — Wikipedia](https://en.wikipedia.org/wiki/Alpha_helix)
3. [Beta sheet — Wikipedia](https://en.wikipedia.org/wiki/Beta_sheet)
4. [Quaternary structure — Wikipedia](https://en.wikipedia.org/wiki/Protein_quaternary_structure)
5. [Protein Data Bank — Wikipedia](https://en.wikipedia.org/wiki/Protein_Data_Bank)
