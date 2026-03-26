---
title: Codon Table Explorer
description: Interactive mRNA translation tool where students type or generate mRNA sequences and watch them translated codon-by-codon into amino acids, color-coded by chemical property.
image: /sims/codon-table-explorer/codon-table-explorer.png
og:image: /sims/codon-table-explorer/codon-table-explorer.png
twitter:image: /sims/codon-table-explorer/codon-table-explorer.png
social:
   cards: false
quality_score: 3
---

# Codon Table Explorer

<iframe src="main.html" height="502" width="100%" scrolling="no"></iframe>

[Run the Codon Table Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim lets students **translate mRNA sequences into proteins** using the standard genetic code. Students can type any mRNA sequence (or generate a random one) and immediately see the sequence parsed into codons and decoded into amino acids. The amino acids are color-coded by their chemical properties, making patterns in the genetic code visible at a glance.

### Three Display Rows

- **mRNA row** — The input sequence displayed base by base, color-coded: A (green), U (red), G (yellow), C (blue)
- **Codons row** — The mRNA grouped into triplets, with each codon box colored by the property of its encoded amino acid
- **Protein row** — The resulting amino acid chain shown as colored circles connected by peptide bonds, with single-letter amino acid codes

### Amino Acid Color Coding

Amino acids are colored by their chemical properties, which determine how they contribute to protein structure:

- **Blue** — Hydrophobic (F, L, I, M, V, A, W): tend to fold into the protein interior
- **Green** — Polar (S, T, Y, N, Q): form hydrogen bonds on the protein surface
- **Red** — Positively charged (K, R, H): attract negatively charged molecules
- **Yellow** — Negatively charged (D, E): attract positively charged molecules
- **Purple** — Special (P, G, C): proline introduces kinks, glycine is ultra-flexible, cysteine forms disulfide bonds
- **Gray** — Stop codons (UAA, UAG, UGA): signal the end of translation

### Reading Frames

The optional **Show Reading Frames** checkbox displays all three forward reading frames simultaneously. Each frame starts at a different offset (0, 1, or 2 bases from the beginning), showing how the same mRNA sequence encodes entirely different proteins depending on where translation begins. Start codons (AUG) are highlighted in green and stop codons in red.

## How to Use

1. **Type an mRNA sequence** — Enter bases (A, U, G, C) in the text field. The sequence is automatically cleaned and translated.
2. **Translate button** — Click to parse and translate the current input sequence
3. **Random button** — Generate a random mRNA sequence that starts with AUG and ends with a stop codon
4. **Show Reading Frames checkbox** — Toggle display of all three forward reading frames to compare alternative translations
5. **Hover over codons** — Move your mouse over any codon to highlight both the codon and its corresponding amino acid

### Suggested Experiments

- Enter `AUGUUUUUUUUUUUUUGA` — a sequence encoding only phenylalanine (F). Notice how all codons are hydrophobic (blue).
- Try `AUGAAAGAUGAAAUGA` — a sequence with charged amino acids. Compare the color pattern.
- Toggle reading frames and observe how a single-base shift produces completely different amino acids.
- Find the shortest possible protein: `AUGUGAUAA` (Met-stop, but the stop prevents translation after the first amino acid).

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/codon-table-explorer/main.html"
        height="502"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of mRNA as a single-stranded molecule with bases A, U, G, C
- Knowledge that codons are three-base sequences that encode amino acids
- Familiarity with the concept of start codons (AUG) and stop codons

### Activities

1. **Exploration** (5 min): Use the Random button to generate several sequences. For each, note where translation starts (AUG) and where it stops. Observe the amino acid color patterns — are most amino acids hydrophobic, polar, or charged?
2. **Guided Practice** (5 min): Enter the sequence `AUGCGCAAAGAUUUCGCUUGA`. Before clicking Translate, predict how many amino acids the protein will have. Then translate and check. Identify each amino acid's chemical property by color.
3. **Reading Frame Analysis** (5 min): Enter a sequence of at least 30 bases. Enable Show Reading Frames and compare the three frames. Do all frames contain a start codon? How many stop codons appear in each frame? Which frame would produce the longest protein?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. Why does every protein-coding mRNA begin with the codon AUG, and what amino acid does it encode?
2. There are 64 possible codons but only 20 amino acids. What property of the genetic code does this reflect, and what are its implications for mutation tolerance?
3. How does a single-nucleotide insertion (frameshift mutation) affect the protein product? Use the reading frames display to illustrate your answer.
4. Why are hydrophobic amino acids typically found in the interior of folded proteins while polar and charged amino acids are on the surface?

## References

1. [Genetic code — Wikipedia](https://en.wikipedia.org/wiki/Genetic_code)
2. [Codon — Wikipedia](https://en.wikipedia.org/wiki/Codon)
3. [Reading frame — Wikipedia](https://en.wikipedia.org/wiki/Reading_frame)
4. [Amino acid — Wikipedia](https://en.wikipedia.org/wiki/Amino_acid)
5. [Degeneracy of the genetic code — Wikipedia](https://en.wikipedia.org/wiki/Codon_degeneracy)
