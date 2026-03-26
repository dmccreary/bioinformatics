---
title: Disease Module in the Human Interactome
description: Interactive vis-network showing a human interactome subset with two overlapping disease modules (asthma and diabetes), toggle controls, and network proximity scoring.
image: /sims/disease-module-interactome/disease-module-interactome.png
og:image: /sims/disease-module-interactome/disease-module-interactome.png
twitter:image: /sims/disease-module-interactome/disease-module-interactome.png
social:
   cards: false
quality_score: 3
---

# Disease Module in the Human Interactome

<iframe src="main.html" height="530" width="100%" scrolling="no"></iframe>

[Run the Disease Module in the Human Interactome MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes the **disease module hypothesis** — the idea that genes associated with the same disease tend to cluster together in the human protein-protein interaction network (interactome). Two disease modules (asthma in blue and diabetes in red) are highlighted within a ~30-protein interactome subset, with overlap proteins shown in purple.

### The Disease Module Hypothesis

Proposed by Barabasi and colleagues, this hypothesis states that:

- Disease genes are not randomly scattered across the interactome — they form localized **modules**
- The closer two disease modules are in the network, the more likely the diseases share biological mechanisms and comorbidity
- **Overlap proteins** (in both modules) suggest shared molecular mechanisms between diseases

### Visual Encoding

- **Blue nodes** — Proteins associated with asthma
- **Red nodes** — Proteins associated with diabetes
- **Purple nodes** — Overlap proteins associated with both diseases
- **Gray nodes** — Background interactome proteins (not disease-associated)
- **Network proximity score** — A metric quantifying how close the two disease modules are

## How to Use

1. **Toggle disease modules** — Show or hide each disease module to see its proteins highlighted in the interactome
2. **Hover** over nodes to see protein names and disease associations
3. **Identify overlap** — Find purple nodes that belong to both disease modules
4. **Drag and zoom** to explore the network layout
5. **Read the proximity score** — Low proximity indicates the modules are close (diseases may share mechanisms); high proximity indicates distant modules

### Suggested Exploration

- Toggle only asthma ON — observe how its associated proteins cluster together rather than scattering randomly
- Toggle both ON — find the purple overlap proteins and consider what shared biology they might represent
- Look at the network distance between the two modules — are they adjacent or separated by many hops?

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/disease-module-interactome/main.html"
        height="530"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Understanding of protein-protein interaction networks
- Basic knowledge of complex diseases and genetic risk factors
- Familiarity with network metrics (degree, distance)

### Activities

1. **Exploration** (5 min): Toggle each disease module on separately. Does each module form a connected cluster, or are its proteins scattered? What does this observation support?
2. **Overlap Analysis** (5 min): Toggle both modules on. Identify all overlap proteins (purple). Research one of these proteins — is it known to play a role in both diseases?
3. **Discussion** (5 min): The network proximity between two disease modules can predict disease comorbidity. If asthma and diabetes modules are close, what might this suggest about patients who have both conditions?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What is the disease module hypothesis, and what evidence supports it?
2. Why do overlap proteins between disease modules suggest shared molecular mechanisms?
3. How could network proximity between disease modules be used to predict drug repurposing opportunities?
4. If a newly discovered disease gene is adjacent to an existing disease module in the interactome, what would you predict about its function?

## References

1. [Disease module — Wikipedia](https://en.wikipedia.org/wiki/Disease_module)
2. [Interactome — Wikipedia](https://en.wikipedia.org/wiki/Interactome)
3. [Network medicine — Wikipedia](https://en.wikipedia.org/wiki/Network_medicine)
4. [Comorbidity — Wikipedia](https://en.wikipedia.org/wiki/Comorbidity)
5. [Albert-Laszlo Barabasi — Wikipedia](https://en.wikipedia.org/wiki/Albert-L%C3%A1szl%C3%B3_Barab%C3%A1si)
