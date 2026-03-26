---
title: AlphaFold Prediction Pipeline
description: Animated step-through flowchart of the AlphaFold protein structure prediction pipeline from amino acid sequence through MSA, Evoformer, structure module, to final 3D model.
image: /sims/alphafold-pipeline/alphafold-pipeline.png
og:image: /sims/alphafold-pipeline/alphafold-pipeline.png
twitter:image: /sims/alphafold-pipeline/alphafold-pipeline.png
social:
   cards: false
quality_score: 3
---

# AlphaFold Prediction Pipeline

<iframe src="main.html" height="450" width="100%" scrolling="no"></iframe>

[Run the AlphaFold Prediction Pipeline MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim walks through the **AlphaFold protein structure prediction pipeline** as an animated flowchart. Students step through each stage to understand how DeepMind's AlphaFold2 system predicts 3D protein structure from amino acid sequence alone.

### Pipeline Stages

1. **Amino Acid Sequence** — The input: a protein's primary structure in FASTA format
2. **Multiple Sequence Alignment (MSA)** — Homologous sequences are retrieved and aligned, revealing co-evolutionary patterns that encode structural constraints
3. **Evoformer** — A deep neural network processes the MSA and pairwise features through attention layers, learning residue-residue relationships
4. **Structure Module** — Converts the Evoformer output into 3D atomic coordinates using an iterative refinement process
5. **3D Model** — The predicted structure with per-residue confidence scores (pLDDT)
6. **Refinement** — Energy minimization and side-chain optimization to produce the final structure
7. **Final Predicted Structure** — The output in PDB format, ready for analysis

### Why This Matters

AlphaFold2 solved the protein structure prediction problem in 2020, a 50-year grand challenge in biology. Understanding its pipeline helps students appreciate how machine learning transforms bioinformatics, and why the AlphaFold Protein Structure Database now contains over 200 million predicted structures.

## How to Use

1. **Next / Previous buttons** — Step through the pipeline stages one at a time
2. **Read the descriptions** — Each stage includes an explanation of what happens and why it matters
3. **Follow the flow** — Watch how information transforms from 1D sequence to 3D structure across the pipeline

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/alphafold-pipeline/main.html"
        height="450"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of protein primary and tertiary structure
- Familiarity with sequence alignment concepts
- Basic awareness of machine learning / neural networks

### Activities

1. **Exploration** (5 min): Step through all stages. At each stage, note what the input is, what processing occurs, and what the output is.
2. **Guided Practice** (5 min): Go back to the MSA stage. Why are homologous sequences important for structure prediction? What information does co-evolution provide that a single sequence cannot?
3. **Discussion** (5 min): Before AlphaFold, experimental methods (X-ray crystallography, cryo-EM, NMR) were the only way to determine protein structure. What are the advantages and limitations of computational prediction vs. experimental determination?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is the input to AlphaFold, and what is the output?
2. Why is the multiple sequence alignment step critical for prediction accuracy?
3. What does the pLDDT confidence score tell you about a predicted structure, and how should you interpret low-confidence regions?
4. How has AlphaFold changed the landscape of structural biology and drug discovery?

## References

1. [AlphaFold — Wikipedia](https://en.wikipedia.org/wiki/AlphaFold)
2. [Protein structure prediction — Wikipedia](https://en.wikipedia.org/wiki/Protein_structure_prediction)
3. [Multiple sequence alignment — Wikipedia](https://en.wikipedia.org/wiki/Multiple_sequence_alignment)
4. [AlphaFold Protein Structure Database — Wikipedia](https://en.wikipedia.org/wiki/AlphaFold_Protein_Structure_Database)
