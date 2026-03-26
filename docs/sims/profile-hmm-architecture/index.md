---
title: Profile HMM Architecture
description: Interactive vis-network diagram showing the Match, Insert, and Delete states of a Profile Hidden Markov Model with transition probabilities for protein family sequence analysis.
image: /sims/profile-hmm-architecture/profile-hmm-architecture.png
og:image: /sims/profile-hmm-architecture/profile-hmm-architecture.png
twitter:image: /sims/profile-hmm-architecture/profile-hmm-architecture.png
social:
   cards: false
quality_score: 3
---

# Profile HMM Architecture

<iframe src="main.html" height="480" width="100%" scrolling="no"></iframe>

[Run the Profile HMM Architecture MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim displays the architecture of a **Profile Hidden Markov Model (Profile HMM)** — the probabilistic model used by tools like HMMER and Pfam to represent protein families. The diagram shows the three types of states (Match, Insert, Delete) and the transitions between them.

### State Types

- **Match states (M)** — Represent conserved positions in the multiple sequence alignment. Each match state emits an amino acid according to a position-specific probability distribution.
- **Insert states (I)** — Handle extra amino acids between conserved positions. Emit amino acids using a background distribution.
- **Delete states (D)** — Handle missing amino acids at conserved positions. Silent states (no emission).

### Transitions

- **M → M** — Move to the next conserved position (most common)
- **M → I** — Insert extra amino acids after this position
- **M → D** — Skip the next conserved position (deletion)
- **I → I** — Continue inserting (multiple insertions)
- **I → M** — Return to the next conserved position
- **D → M** — Resume matching at the next position
- **D → D** — Skip multiple consecutive positions

### Why This Matters

Profile HMMs are the gold standard for:
- Detecting remote homologs that sequence alignment would miss
- Classifying proteins into families (Pfam database)
- Building multiple sequence alignments of distantly related proteins

## How to Use

1. **Examine the state diagram** — Follow the transitions from Begin through Match/Insert/Delete states to End
2. **Click** states and transitions to see their descriptions and probability parameters
3. **Trace paths** — A typical protein traverses mostly Match states; insertions and deletions are rarer

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/profile-hmm-architecture/main.html"
        height="480"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of multiple sequence alignment
- Basic probability concepts
- Concept of protein families and domains

### Activities

1. **Exploration** (5 min): Identify all three state types and their transitions. Which transition is most common? Which is rarest?
2. **Path Tracing** (5 min): A protein has the pattern "conserved-conserved-insertion-conserved-deletion-conserved." Trace this path through the HMM states.
3. **Discussion** (5 min): Why are Profile HMMs better at detecting remote homologs than pairwise alignment? What information does the position-specific emission probability capture?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What are the three types of states in a Profile HMM, and what does each represent?
2. How does a Profile HMM handle insertions and deletions differently from a standard scoring matrix?
3. Why are Profile HMMs trained from multiple sequence alignments rather than single sequences?
4. What is the Pfam database, and how does it use Profile HMMs?

## References

1. [Hidden Markov model — Wikipedia](https://en.wikipedia.org/wiki/Hidden_Markov_model)
2. [HMMER — Wikipedia](https://en.wikipedia.org/wiki/HMMER)
3. [Pfam — Wikipedia](https://en.wikipedia.org/wiki/Pfam)
4. [Sequence alignment — Wikipedia](https://en.wikipedia.org/wiki/Sequence_alignment)
