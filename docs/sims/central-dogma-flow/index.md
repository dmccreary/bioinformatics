---
title: Central Dogma Information Flow
description: Interactive step-through diagram showing the five stages of information flow from DNA to protein, with illustrations and data type annotations at each step.
image: /sims/central-dogma-flow/central-dogma-flow.png
og:image: /sims/central-dogma-flow/central-dogma-flow.png
twitter:image: /sims/central-dogma-flow/central-dogma-flow.png
social:
   cards: false
quality_score: 3
---

# Central Dogma Information Flow

<iframe src="main.html" height="510" width="100%" scrolling="no"></iframe>

[Run the Central Dogma Information Flow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides a guided, step-by-step walkthrough of the **central dogma of molecular biology** — the flow of genetic information from DNA to RNA to Protein. Students advance through five stages using Previous/Next buttons, with each step highlighting the active stage in the flow diagram, displaying an illustrative visualization, and explaining what happens at that stage.

### Five Stages

1. **DNA in the Nucleus** — The double-stranded DNA molecule stores genetic instructions. A promoter region marks where transcription begins.
2. **Transcription Begins** — RNA polymerase binds the promoter, unwinds the double helix, and synthesizes a complementary mRNA strand.
3. **mRNA Processing** — In eukaryotes, the pre-mRNA receives a 5' cap, a poly-A tail, and has its introns spliced out before export to the cytoplasm.
4. **Translation at the Ribosome** — Ribosomes read mRNA codons while tRNAs deliver matching amino acids, building a polypeptide chain.
5. **Folded Protein** — The polypeptide folds into its three-dimensional functional structure, assisted by chaperone proteins.

### Visual Encoding

- **Colored boxes** across the top represent the five stages, connected by arrows
- The **currently active stage** is highlighted with a bold border and full opacity
- **Completed stages** show at medium opacity; **future stages** are faded
- A **stage-specific illustration** shows the molecular process (helix, transcription bubble, processed mRNA, ribosome, or folded protein)
- An **info panel** displays the title, description, and associated bioinformatics data type for each step

### Bioinformatics Data Types

Each step is annotated with the type of data bioinformaticians work with at that level:

- DNA → Genome databases (FASTA, GenBank)
- Transcription → Measured by RNA-seq
- mRNA → Splice variants in GFF3/GTF
- Translation → Proteomics (mass spectrometry)
- Protein → Structure in PDB format

## How to Use

1. **Previous / Next buttons** — Step through the five stages of the central dogma
2. **Observe the flow diagram** — Watch how each stage lights up in sequence, showing the directionality of information flow
3. **Read the info panel** — Each step includes a biological explanation and the bioinformatics data type associated with that stage
4. **Study the illustration** — The central visualization changes to show the molecular structures and processes at each stage

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/central-dogma-flow/main.html"
        height="510"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
10-15 minutes

### Prerequisites

- Basic understanding of cells and the nucleus
- Familiarity with DNA as the molecule of heredity
- Introduction to the concept of genes

### Activities

1. **Exploration** (4 min): Step through all five stages. At each step, read the description and note which bioinformatics data type corresponds to that stage. Pay attention to how the illustration changes.
2. **Guided Practice** (4 min): Go back to Step 2 (Transcription). Identify which enzyme performs transcription, what direction it reads the template strand, and what direction the new mRNA is synthesized. Then advance to Step 3 and list the three processing modifications made to eukaryotic pre-mRNA.
3. **Concept Mapping** (4 min): On paper, draw the five stages as a linear flow chart. At each stage, write the key enzyme or structure involved and the data format a bioinformatician would use to study it.
4. **Assessment** (3 min): Answer the reflection questions below without looking back at the MicroSim.

### Assessment

1. What are the three main stages of the central dogma, and what molecule is produced at each stage?
2. Why does eukaryotic mRNA require processing before translation, and what are the three modifications?
3. Match each central dogma stage to its bioinformatics data type: FASTA, RNA-seq, PDB, mass spectrometry, GFF3.
4. Where in the cell does transcription occur in eukaryotes? Where does translation occur? Why is this spatial separation important?

## References

1. [Central dogma of molecular biology — Wikipedia](https://en.wikipedia.org/wiki/Central_dogma_of_molecular_biology)
2. [Transcription (biology) — Wikipedia](https://en.wikipedia.org/wiki/Transcription_(biology))
3. [Translation (biology) — Wikipedia](https://en.wikipedia.org/wiki/Translation_(biology))
4. [Post-transcriptional modification — Wikipedia](https://en.wikipedia.org/wiki/Post-transcriptional_modification)
5. [Protein folding — Wikipedia](https://en.wikipedia.org/wiki/Protein_folding)
