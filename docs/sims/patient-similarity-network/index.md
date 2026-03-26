---
title: Patient Similarity Network Construction
description: Interactive p5.js three-stage visualization showing how patient clinical data is transformed into a similarity matrix and then into a force-directed patient similarity network.
image: /sims/patient-similarity-network/patient-similarity-network.png
og:image: /sims/patient-similarity-network/patient-similarity-network.png
twitter:image: /sims/patient-similarity-network/patient-similarity-network.png
social:
   cards: false
quality_score: 3
---

# Patient Similarity Network Construction

<iframe src="main.html" height="542" width="100%" scrolling="no"></iframe>

[Run the Patient Similarity Network Construction MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates **patient similarity network (PSN) construction** in three stages: (1) a patient-feature data matrix, (2) a pairwise similarity heatmap, and (3) a force-directed network where similar patients cluster together.

### Three Stages

1. **Data Matrix** — Rows are patients, columns are clinical features (lab values, diagnoses, gene expression). This is the raw input data.
2. **Similarity Heatmap** — A symmetric matrix showing pairwise similarity scores between all patients. Computed using cosine similarity, correlation, or other distance metrics.
3. **Patient Network** — Patients become nodes, and edges connect patients above a similarity threshold. The force-directed layout clusters similar patients together, revealing natural subgroups.

### Why This Matters

Patient similarity networks are used in precision medicine to:
- Identify disease subtypes based on multi-dimensional clinical data
- Predict treatment response for a new patient based on similar patients' outcomes
- Discover patient subgroups that may benefit from targeted therapies

## How to Use

1. **Step button** — Advance through the three stages: data matrix → similarity heatmap → network
2. **Observe the transformation** — Watch how tabular data becomes a network through pairwise similarity computation
3. **Identify clusters** — In the network view, look for groups of tightly connected patients

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/patient-similarity-network/main.html"
        height="542"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of clinical data and patient records
- Concept of similarity/distance metrics
- Basic network visualization concepts

### Activities

1. **Exploration** (5 min): Step through all three stages. At each, describe what the data looks like and how it changed from the previous stage.
2. **Threshold Effects** (5 min): How would changing the similarity threshold affect the network? A high threshold creates fewer, stronger edges; a low threshold creates a dense network. Discuss the trade-off.
3. **Clinical Application** (5 min): A new patient arrives. How would you use this network to predict their likely diagnosis or treatment response?
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What are the three stages of patient similarity network construction?
2. Why is the similarity heatmap symmetric?
3. How could a patient similarity network help identify disease subtypes?
4. What clinical features might be included in the data matrix, and how does feature selection affect the resulting network?

## References

1. [Patient similarity — Wikipedia](https://en.wikipedia.org/wiki/Patient_similarity)
2. [Precision medicine — Wikipedia](https://en.wikipedia.org/wiki/Precision_medicine)
3. [Cosine similarity — Wikipedia](https://en.wikipedia.org/wiki/Cosine_similarity)
4. [Network medicine — Wikipedia](https://en.wikipedia.org/wiki/Network_medicine)
