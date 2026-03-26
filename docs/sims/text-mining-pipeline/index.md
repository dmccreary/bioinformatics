---
title: Text Mining Pipeline for Knowledge Graph Population
description: Interactive vis-network flowchart showing how PubMed abstracts are processed through NER, relation extraction, triple generation, and KG update to populate a biomedical knowledge graph.
image: /sims/text-mining-pipeline/text-mining-pipeline.png
og:image: /sims/text-mining-pipeline/text-mining-pipeline.png
twitter:image: /sims/text-mining-pipeline/text-mining-pipeline.png
social:
   cards: false
quality_score: 3
---

# Text Mining Pipeline for Knowledge Graph Population

<iframe src="main.html" height="520" width="100%" scrolling="no"></iframe>

[Run the Text Mining Pipeline for Knowledge Graph Population MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim presents the **text mining pipeline** for extracting biomedical knowledge from scientific literature and populating a knowledge graph. The flowchart shows how unstructured text (PubMed abstracts) is transformed into structured knowledge (triples) through NLP processing.

### Pipeline Stages

1. **PubMed Abstracts** (blue) — Raw scientific text from the biomedical literature
2. **Named Entity Recognition (NER)** (green) — Identify biomedical entities (genes, diseases, drugs, proteins) in the text
3. **Relation Extraction** (green) — Determine relationships between identified entities (e.g., "drug X inhibits protein Y")
4. **Triple Generation** (green) — Convert extracted relationships into structured triples (subject, predicate, object)
5. **KG Update** (purple) — Add new triples to the knowledge graph, resolving entities and deduplicating

### Color Coding

- **Blue** — Input data (raw text)
- **Green** — NLP processing stages
- **Purple** — Knowledge graph output

## How to Use

1. **Click** each pipeline stage to see its description, example tools, and sample outputs
2. **Follow the transformation** — Watch how "BRCA1 is associated with breast cancer" becomes the triple (BRCA1, associated_with, breast_cancer)
3. **Consider challenges** — Ambiguity, negation, and abbreviations make each NLP stage difficult

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/text-mining-pipeline/main.html"
        height="520"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Basic understanding of natural language processing
- Concept of knowledge graphs and triples
- Familiarity with biomedical literature (PubMed)

### Activities

1. **Exploration** (5 min): Click each stage and note the key challenges and tools used.
2. **Manual NER** (5 min): Read this sentence: "Imatinib inhibits BCR-ABL and is used to treat chronic myeloid leukemia." Manually identify all entities and classify them (drug, protein, disease). Extract the relationships.
3. **Discussion** (5 min): Why is automated text mining necessary despite its imperfections? Consider that PubMed adds >1 million new articles per year.
4. **Assessment** (3 min): Answer the reflection questions below.

### Assessment

1. What is Named Entity Recognition, and why is it the first NLP step?
2. What is a triple, and how does it represent a relationship from text?
3. Why is entity resolution necessary when adding text-mined triples to an existing knowledge graph?
4. What are the main sources of error in biomedical text mining?

## References

1. [Text mining — Wikipedia](https://en.wikipedia.org/wiki/Text_mining)
2. [Named-entity recognition — Wikipedia](https://en.wikipedia.org/wiki/Named-entity_recognition)
3. [Relation extraction — Wikipedia](https://en.wikipedia.org/wiki/Relationship_extraction)
4. [PubMed — Wikipedia](https://en.wikipedia.org/wiki/PubMed)
