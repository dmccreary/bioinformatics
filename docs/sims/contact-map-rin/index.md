---
title: Contact Map and Residue Interaction Network
description: Interactive dual-panel display showing a protein contact map (symmetric heatmap) alongside a circular residue interaction network, with synchronized highlighting between panels.
image: /sims/contact-map-rin/contact-map-rin.png
og:image: /sims/contact-map-rin/contact-map-rin.png
twitter:image: /sims/contact-map-rin/contact-map-rin.png
social:
   cards: false
quality_score: 3
---

# Contact Map and Residue Interaction Network

<iframe src="main.html" height="522" width="100%" scrolling="no"></iframe>

[Run the Contact Map and Residue Interaction Network MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim shows two complementary views of **protein residue contacts**: a **contact map** (left, symmetric heatmap grid) and a **residue interaction network** (right, circular layout). Clicking a residue in either panel highlights it in both, showing how the same structural information is represented in different formats.

### Contact Map (Left Panel)

A contact map is a symmetric matrix where:

- Each axis represents the protein's amino acid sequence (residue 1 to N)
- A filled cell at position (i, j) indicates that residues i and j are within a distance threshold (typically 8 Angstroms) in the 3D structure
- The **diagonal** always shows contacts (each residue is close to itself)
- **Off-diagonal contacts** between residues far apart in sequence indicate 3D folding — these long-range contacts are the most informative

### Residue Interaction Network (Right Panel)

The same contacts visualized as a circular graph:

- Residues are arranged in sequence order around a circle
- Edges connect residues that are in spatial contact
- **Short arcs** (nearby residues) represent local interactions (secondary structure)
- **Long chords** (distant residues) represent tertiary contacts (3D folding)

## How to Use

1. **Click** a residue in either the contact map or the circular network — the corresponding residue and its contacts are highlighted in both panels
2. **Compare representations** — The same contact appears as a filled cell in the heatmap and as an edge in the network
3. **Look for patterns** — Secondary structures (helices, sheets) create characteristic diagonal bands in the contact map

### Suggested Exploration

- Click a residue near the N-terminus (low number). Its contacts in the contact map form a column/row — count how many long-range contacts it makes.
- Look for diagonal bands parallel to the main diagonal — these indicate alpha helices (contacts between residues i and i+4)
- Find a long chord in the circular network — this represents a 3D contact between sequence-distant residues, created by protein folding

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/contact-map-rin/main.html"
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

- Understanding of protein primary structure (amino acid sequence)
- Basic knowledge of secondary and tertiary structure
- Concept of spatial distance between residues in a folded protein

### Activities

1. **Exploration** (5 min): Examine the contact map. What patterns do you see along and near the diagonal? Click several residues and observe their contacts in both panels.
2. **Secondary Structure** (5 min): Look for diagonal bands offset from the main diagonal. These indicate regular secondary structures. Bands at offset +4 suggest alpha helices (hydrogen bonds between residues i and i+4). Can you identify any?
3. **Long-Range Contacts** (5 min): In the circular network, find the 3 longest chords. These are contacts between residues far apart in sequence. What does this tell you about how the protein folds?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What does a filled cell at position (5, 25) in a contact map mean?
2. Why is the contact map symmetric (filled at both (i,j) and (j,i))?
3. Why are long-range contacts more informative for understanding protein folding than short-range contacts?
4. AlphaFold predicts contact maps as an intermediate step. Why is a predicted contact map useful for predicting 3D structure?

## References

1. [Contact map — Wikipedia](https://en.wikipedia.org/wiki/Contact_map)
2. [Protein contact map — Wikipedia](https://en.wikipedia.org/wiki/Protein_contact_map)
3. [Protein structure — Wikipedia](https://en.wikipedia.org/wiki/Protein_structure)
4. [Residue interaction network — Wikipedia](https://en.wikipedia.org/wiki/Protein_residue_interaction_network)
