# Bioinformatics Intelligent Textbook

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/bioinformatics/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fbioinformatics-blue?logo=github)](https://github.com/dmccreary/bioinformatics)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![vis-network](https://img.shields.io/badge/vis--network-1DA1F2?logo=javascript&logoColor=white)](https://visjs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/bioinformatics/](https://dmccreary.github.io/bioinformatics/)

## Overview

This is an interactive, AI-generated intelligent textbook on **Bioinformatics** with a distinctive emphasis on **graph-based representations of biological data**. Built using MkDocs with the Material theme, it incorporates learning graphs, concept dependencies, interactive MicroSims, quizzes, and AI-assisted content generation.

The textbook is designed for upper-division undergraduates, graduate students, and working professionals seeking to expand their bioinformatics skill set. It covers the full arc from foundational molecular biology and sequence analysis through structural biology, systems biology, and modern graph-powered approaches to drug discovery, precision medicine, and multi-omics integration.

What makes this textbook unique is its focus on how biological relationships — protein interactions, metabolic pathways, gene regulatory networks, evolutionary trees, and knowledge graphs — are naturally modeled as graphs, and how graph algorithms and databases unlock insights that tabular or sequence-only approaches miss. Over 55 interactive MicroSims let students explore these concepts hands-on, from force-directed PPI networks to epidemic contact graphs to sequence alignment visualizations.

## Site Metrics

| Metric | Count |
|--------|------:|
| Concepts in Learning Graph | 480 |
| Chapters | 16 |
| Markdown Files | 138 |
| Total Words | 188,966 |
| Interactive MicroSims | 60 |
| Glossary Terms | 480 |
| FAQ Questions | 97 |
| Quiz Questions | 160 |
| Images | 70 |

## Chapter Overview

1. Foundations of Molecular Biology
2. Biological Databases
3. Bioinformatics Data Formats
4. Graph Theory Fundamentals
5. Graph Databases and Queries
6. Sequence Alignment
7. Phylogenetics
8. Structural Bioinformatics
9. Protein Interaction Networks
10. Genome Assembly
11. Transcriptomics
12. Metabolic Pathways
13. Signaling and Disease
14. Knowledge Graphs
15. Multi-Omics Integration
16. Python Tools and Capstone

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/bioinformatics.git
cd bioinformatics
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs
pip install mkdocs-material
```

### Build and Serve Locally

Build the site:

```bash
mkdocs build
```

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to [http://localhost:8000](http://localhost:8000)

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

## Repository Structure

```
bioinformatics/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 16 chapter directories
│   │   ├── 01-foundations-molecular-biology/
│   │   │   ├── index.md          # Chapter content
│   │   │   ├── quiz.md           # Chapter quiz
│   │   │   └── references.md     # Chapter references
│   │   └── ...
│   ├── sims/                      # 60 interactive MicroSims
│   │   ├── epidemic-contact-graph/
│   │   │   ├── main.html         # Standalone simulation
│   │   │   ├── index.md          # Documentation page
│   │   │   └── metadata.json     # Educational metadata
│   │   └── ...
│   ├── learning-graph/            # Learning graph data and analysis
│   │   ├── learning-graph.csv    # 480 concept dependencies
│   │   ├── learning-graph.json   # vis-network format
│   │   └── quality-metrics.md    # Quality analysis
│   ├── css/                       # Custom styles
│   │   ├── extra.css             # Layout and iframe styles
│   │   └── mascot.css            # Olli the Octopus admonitions
│   ├── img/mascot/                # Olli mascot images (7 poses)
│   ├── glossary.md                # 480 terms
│   ├── faq.md                     # 97 frequently asked questions
│   └── course-description.md     # Authoritative course description
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## Interactive MicroSims

The textbook includes 60 interactive simulations built with **p5.js** and **vis-network** covering topics such as:

- **Network Visualizations** — PPI networks, gene regulatory networks, metabolic pathways, epidemic contact graphs
- **Algorithm Explorations** — BFS vs DFS traversal, de Bruijn graph construction, dynamic programming alignment
- **Biological Structures** — Protein structure hierarchy, cell anatomy, central dogma information flow
- **Data Pipeline Diagrams** — RNA-Seq pipelines, FASTQ quality control, AlphaFold prediction
- **Knowledge Graphs** — Drug-target-disease graphs, biomedical KG anatomy, PPI schema visualization

Each MicroSim runs standalone in the browser with no server required.

## Learning Mascot: Olli the Octopus

Olli is a friendly teal octopus who guides students through the textbook with encouraging tips, key insights, and warnings about common misconceptions. Olli's catchphrase: *"Let's connect the dots!"*

## Reporting Issues

Found a bug, typo, or have a suggestion? Please report it:

[GitHub Issues](https://github.com/dmccreary/bioinformatics/issues)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

## Acknowledgements

- **[MkDocs](https://www.mkdocs.org/)** — Static site generator for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** — Beautiful, responsive theme
- **[p5.js](https://p5js.org/)** — Creative coding library for interactive simulations
- **[vis-network](https://visjs.org/)** — Network visualization library for force-directed graphs
- **[Claude AI](https://claude.ai)** by Anthropic — AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** — Free hosting for open source projects

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)
