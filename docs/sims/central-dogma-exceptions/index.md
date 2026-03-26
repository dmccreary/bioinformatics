---
title: Central Dogma and Its Exceptions
description: Interactive diagram showing the standard central dogma pathways (replication, transcription, translation) and four exceptions including reverse transcription, RNA replication, prion propagation, and functional non-coding RNA.
image: /sims/central-dogma-exceptions/central-dogma-exceptions.png
og:image: /sims/central-dogma-exceptions/central-dogma-exceptions.png
twitter:image: /sims/central-dogma-exceptions/central-dogma-exceptions.png
social:
   cards: false
quality_score: 3
---

# Central Dogma and Its Exceptions

<iframe src="main.html" height="422" width="100%" scrolling="no"></iframe>

[Run the Central Dogma and Its Exceptions MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim presents the **central dogma of molecular biology** as an interactive node-and-arrow diagram. Students can view the three standard information flows (replication, transcription, translation) and then toggle on four important **exceptions** that violate or extend the original framework.

### Standard Pathways

- **Replication** (DNA → DNA) — DNA polymerase copies the genome before cell division
- **Transcription** (DNA → RNA) — RNA polymerase synthesizes mRNA from a DNA template
- **Translation** (RNA → Protein) — Ribosomes decode mRNA codons into amino acid chains

### Exception Pathways

- **Reverse Transcription** (RNA → DNA) — Reverse transcriptase synthesizes DNA from an RNA template, used by retroviruses like HIV and in laboratory techniques like RT-PCR
- **RNA Replication** (RNA → RNA) — RNA-dependent RNA polymerase copies RNA without a DNA intermediate, found in RNA viruses like SARS-CoV-2 and influenza
- **Prion Propagation** (Protein → Protein) — Misfolded prion proteins template conformational changes in normal proteins, transmitting information at the protein level without nucleic acids
- **Functional Non-coding RNA** (RNA → ∅) — Many RNA molecules (tRNA, rRNA, miRNA, lncRNA) are functional end products that are never translated into protein

### Visual Encoding

- **Solid arrows** represent standard central dogma pathways
- **Dashed arrows** represent exceptions (shown in distinct colors)
- **Green, Blue, Purple circles** represent DNA, RNA, and Protein respectively
- Click any **node or arrow** to see detailed descriptions and real-world examples in the info panel

## How to Use

1. **Click nodes** — Click on the DNA, RNA, or Protein circles to read about each molecule type and see examples
2. **Click arrows** — Click on any arrow (standard or exception) to learn about that information transfer pathway
3. **Show Exceptions button** — Toggle between the standard-only view and the full view with all four exception pathways
4. **Read the info panel** — The bottom panel shows the description and a real-world example for whatever you clicked

### Suggested Exploration

- Start with the standard view and click each arrow to understand replication, transcription, and translation
- Toggle on exceptions and explore each dashed arrow
- Notice that prion propagation is the only pathway that transfers information without nucleic acids
- Consider why reverse transcription is essential for HIV's life cycle and for RNA-seq laboratory workflows

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/central-dogma-exceptions/main.html"
        height="422"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of DNA, RNA, and protein as biological molecules
- Basic knowledge of replication, transcription, and translation
- Awareness that viruses exist and use host cellular machinery

### Activities

1. **Exploration** (5 min): With exceptions hidden, click each standard arrow and node. For each pathway, note the enzyme involved and an example of when it occurs.
2. **Exception Discovery** (5 min): Toggle on exceptions. Click each dashed arrow and record: (a) which organism or context uses this pathway, (b) why it matters for bioinformatics or medicine.
3. **Discussion** (5 min): Francis Crick originally stated that information cannot flow from protein back to nucleic acid. Do prions violate this claim? Why or why not? (Hint: consider what "information" means in the context of sequence vs. conformation.)
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. List the three standard information flows in the central dogma and the enzyme responsible for each.
2. How does reverse transcription challenge the original central dogma, and why is this pathway important for both virology and laboratory techniques?
3. RNA viruses like SARS-CoV-2 use RNA-dependent RNA polymerase. Why don't human cells normally have this enzyme, and what makes it a good drug target?
4. Give two examples of functional non-coding RNAs and explain their biological roles.
5. In what sense do prions represent information transfer without nucleic acids?

## References

1. [Central dogma of molecular biology — Wikipedia](https://en.wikipedia.org/wiki/Central_dogma_of_molecular_biology)
2. [Reverse transcriptase — Wikipedia](https://en.wikipedia.org/wiki/Reverse_transcriptase)
3. [RNA-dependent RNA polymerase — Wikipedia](https://en.wikipedia.org/wiki/RNA-dependent_RNA_polymerase)
4. [Prion — Wikipedia](https://en.wikipedia.org/wiki/Prion)
5. [Non-coding RNA — Wikipedia](https://en.wikipedia.org/wiki/Non-coding_RNA)
