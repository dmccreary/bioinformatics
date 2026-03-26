---
title: Sequence Similarity Network
description: Interactive vis-network showing ~20 proteins colored by family, with edges representing BLAST hits and an E-value threshold slider to control edge visibility.
image: /sims/sequence-similarity-network/sequence-similarity-network.png
og:image: /sims/sequence-similarity-network/sequence-similarity-network.png
twitter:image: /sims/sequence-similarity-network/sequence-similarity-network.png
social:
   cards: false
quality_score: 3
---

# Sequence Similarity Network

<iframe src="main.html" height="500" width="100%" scrolling="no"></iframe>

[Run the Sequence Similarity Network MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes a **sequence similarity network (SSN)** — a graph where proteins are nodes and edges connect proteins with significant sequence similarity as determined by BLAST. An **E-value threshold slider** controls which edges are displayed, letting students explore how stringency affects network structure.

### Visual Encoding

- **Node colors** — Proteins are colored by protein family (e.g., kinases, proteases, transcription factors)
- **Edges** — Connect proteins with BLAST E-values below the current threshold
- **E-value slider** — Adjusts the significance threshold. Low E-values (strict) show only highly similar pairs; high E-values (permissive) reveal more distant relationships.

### Why Sequence Similarity Networks?

SSNs are an alternative to phylogenetic trees for visualizing relationships among large protein families:
- They scale to thousands of sequences (trees become unreadable at this scale)
- They naturally reveal protein family boundaries as disconnected clusters
- They can show relationships between distantly related families that share structural or functional features

## How to Use

1. **E-value threshold slider** — Adjust to control which BLAST hits are shown as edges
2. **Hover** over nodes for protein names and family assignments
3. **Observe clusters** — At strict thresholds, clusters correspond to protein families
4. **Relax the threshold** — Watch how families merge as distant similarities become visible

### Suggested Experiments

- Start with a very strict threshold (low E-value) — each protein family should appear as a separate cluster
- Gradually relax the threshold — watch when clusters begin to merge. The E-value at which two families merge indicates how distantly related they are
- At very permissive thresholds, most proteins may connect into a single giant component — this illustrates the "twilight zone" of sequence similarity

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/sequence-similarity-network/main.html"
        height="500"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of BLAST and sequence similarity
- Concept of E-values as significance measures
- Familiarity with protein families

### Activities

1. **Exploration** (5 min): Find the strictest threshold where all same-colored proteins are still connected. This is the optimal threshold for separating families.
2. **Family Boundaries** (5 min): Relax the threshold until two families merge. What E-value does this happen at? What does this tell you about the evolutionary relationship between these families?
3. **Discussion** (5 min): How does an SSN compare to a phylogenetic tree for analyzing protein family relationships? What can SSNs show that trees cannot, and vice versa?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What does an edge in a sequence similarity network represent?
2. How does the E-value threshold affect the number of clusters in the network?
3. Why might two proteins from different families still be connected in an SSN?
4. What advantage do SSNs have over phylogenetic trees for very large protein families?

## References

1. [Sequence similarity — Wikipedia](https://en.wikipedia.org/wiki/Sequence_homology)
2. [BLAST (biotechnology) — Wikipedia](https://en.wikipedia.org/wiki/BLAST_(biotechnology))
3. [E-value — Wikipedia](https://en.wikipedia.org/wiki/E-value)
4. [Protein family — Wikipedia](https://en.wikipedia.org/wiki/Protein_family)
