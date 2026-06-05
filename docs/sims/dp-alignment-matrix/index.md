---
title: Dynamic Programming Matrix Visualization
description: Interactive step-through visualization of Needleman-Wunsch (global) and Smith-Waterman (local) sequence alignment with adjustable scoring parameters and traceback highlighting.
image: /sims/dp-alignment-matrix/dp-alignment-matrix.png
og:image: /sims/dp-alignment-matrix/dp-alignment-matrix.png
twitter:image: /sims/dp-alignment-matrix/dp-alignment-matrix.png
social:
   cards: false
quality_score: 3
---

# Dynamic Programming Matrix Visualization

<iframe src="main.html" height="730" width="100%" scrolling="no"></iframe>

[Run the Dynamic Programming Matrix Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim provides an interactive, step-by-step walkthrough of the two foundational sequence alignment algorithms in bioinformatics: **Needleman-Wunsch** (global alignment) and **Smith-Waterman** (local alignment). Students can enter any two sequences, adjust scoring parameters, and watch the dynamic programming matrix fill cell by cell, followed by traceback to reveal the optimal alignment.

### Two Alignment Modes

- **Global (Needleman-Wunsch)** — Aligns the entire length of both sequences end to end. The first row and column are initialized with cumulative gap penalties. Traceback starts from the bottom-right cell.
- **Local (Smith-Waterman)** — Finds the highest-scoring local subsequence alignment. Negative scores are replaced with zero. Traceback starts from the cell with the maximum score and stops at zero.

### Scoring Parameters

- **Match score** — Points awarded when two bases are identical (default: +1)
- **Mismatch score** — Penalty for aligning two different bases (default: -1)
- **Gap score** — Penalty for inserting a gap in either sequence (default: -2)

### Visual Encoding

- **Yellow cells** — The cell currently being computed
- **Green cells** — Cells on the optimal traceback path
- **Blue header cells** — Sequence bases along the top and left
- **Arrows** in cells show which predecessor cell contributed the score (diagonal = match/mismatch, left = gap in sequence 1, up = gap in sequence 2)
- The final **aligned sequences** are displayed at the bottom with matches, mismatches, and gaps clearly indicated

## How to Use

1. **Seq 1 / Seq 2 inputs** — Enter the two sequences to align (use A, T, G, C)
2. **Global / Local toggle** — Switch between Needleman-Wunsch and Smith-Waterman
3. **Match / Mismatch / Gap sliders** — Adjust scoring parameters and see how they affect the optimal alignment
4. **Step button** — Fill one cell at a time, watching the algorithm progress left to right, top to bottom
5. **Reset button** — Clear the matrix and start over with current parameters

### Suggested Experiments

- Align `AGTC` with `AATC` using default parameters. Step through and predict each cell's score before it fills.
- Switch between Global and Local mode for the same sequences — notice how the first row/column initialization differs.
- Set the gap penalty to 0 and observe how the alignment changes — gaps become free and the algorithm inserts many of them.
- Try aligning `ATCGATCG` with `GATCGA` — a longer example where the traceback path becomes more interesting.
- Compare a high mismatch penalty (-3) vs. low (-1): how does this affect whether the algorithm prefers gaps or mismatches?

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/dp-alignment-matrix/main.html"
        height="730"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
20-25 minutes

### Prerequisites

- Basic understanding of DNA sequences (A, T, G, C)
- Concept of sequence similarity and why alignment matters
- Introduction to dynamic programming as a problem-solving strategy

### Activities

1. **Exploration** (5 min): Enter `AGTC` and `AATC`. Use Step to fill the matrix cell by cell. At each step, verify the score by checking the three possible predecessors (diagonal, left, up) and confirming the maximum was chosen.
2. **Global vs. Local** (5 min): Keep the same sequences but switch to Local mode. How does the initialization change? Step through and note where zeros appear. When would you use local alignment instead of global?
3. **Parameter Sensitivity** (5 min): Return to Global mode with `ATCG` and `AACG`. Set match=2, mismatch=-1, gap=-1 and fill the matrix. Then change to match=1, mismatch=-3, gap=-1 and compare. How do the parameters change which alignment is optimal?
4. **Longer Sequences** (5 min): Enter `ACGTACGT` and `CGTACG`. Fill and trace. Identify regions of high similarity and where gaps were inserted.
5. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. In the Needleman-Wunsch algorithm, why is the first row initialized with cumulative gap penalties instead of zeros?
2. What is the key difference between how Smith-Waterman handles negative scores compared to Needleman-Wunsch?
3. If you increase the gap penalty (make it more negative), what happens to the number of gaps in the optimal alignment?
4. BLAST uses a local alignment approach similar to Smith-Waterman. Why is local alignment more appropriate than global alignment for database searches?
5. Two sequences are 80% identical over their full length. Would global or local alignment give a higher score? Why?

## References

1. [Needleman-Wunsch algorithm — Wikipedia](https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm)
2. [Smith-Waterman algorithm — Wikipedia](https://en.wikipedia.org/wiki/Smith%E2%80%93Waterman_algorithm)
3. [Sequence alignment — Wikipedia](https://en.wikipedia.org/wiki/Sequence_alignment)
4. [Dynamic programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)
5. [Substitution matrix — Wikipedia](https://en.wikipedia.org/wiki/Substitution_matrix)
