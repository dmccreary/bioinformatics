---
title: Drug-Drug Interaction Network
description: Interactive vis-network showing drug-drug interactions colored by therapeutic class, with edges colored by severity (severe, moderate, mild) and click-to-explore interaction details.
image: /sims/drug-drug-interaction-network/drug-drug-interaction-network.png
og:image: /sims/drug-drug-interaction-network/drug-drug-interaction-network.png
twitter:image: /sims/drug-drug-interaction-network/drug-drug-interaction-network.png
social:
   cards: false
quality_score: 3
---

# Drug-Drug Interaction Network

<iframe src="main.html" height="540" width="100%" scrolling="no"></iframe>

[Run the Drug-Drug Interaction Network MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim visualizes a **drug-drug interaction (DDI) network** where each node is a drug, colored by therapeutic class, and each edge represents a known interaction between two drugs. Edge colors indicate **interaction severity**: red for severe, orange for moderate, and yellow for mild.

### Visual Encoding

- **Node colors** — Drugs are grouped by therapeutic class (e.g., cardiovascular, oncology, CNS, anti-infective)
- **Red edges** — Severe interactions (contraindicated or potentially life-threatening)
- **Orange edges** — Moderate interactions (may require dose adjustment or monitoring)
- **Yellow edges** — Mild interactions (clinically minor)
- **Click** any drug to highlight all its interactions and see details

### Why This Matters

Drug-drug interactions are a major cause of adverse drug events, especially in patients taking multiple medications (polypharmacy). Network analysis helps pharmacologists identify:

- Drugs with many severe interactions (high-risk nodes)
- Drug pairs that should never be co-prescribed
- Safer therapeutic alternatives within the same drug class

## How to Use

1. **Click** any drug node to highlight its interactions and see severity details
2. **Hover** for drug name and therapeutic class
3. **Drag and zoom** to explore the network
4. **Look for red edges** — these represent the most dangerous drug combinations

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/drug-drug-interaction-network/main.html"
        height="540"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
15-20 minutes

### Prerequisites

- Basic understanding of pharmacology (drugs and their targets)
- Concept of adverse drug reactions
- Familiarity with network visualization

### Activities

1. **Exploration** (5 min): Find the drug with the most severe (red) interactions. Why might some drugs have more interactions than others?
2. **Severity Analysis** (5 min): Click several drugs and categorize their interactions by severity. Are severe interactions more common between drugs of the same or different therapeutic classes?
3. **Discussion** (5 min): A patient is prescribed 5 medications. How would you use this network to assess their polypharmacy risk? What strategies could reduce the risk?
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What factors make a drug-drug interaction "severe" versus "mild"?
2. Why are drugs with many interactions (hub nodes) particularly important in clinical decision support?
3. How could a DDI network be integrated into electronic health records to prevent adverse events?
4. What is polypharmacy, and why does the risk of DDIs increase with the number of co-prescribed medications?

## References

1. [Drug interaction — Wikipedia](https://en.wikipedia.org/wiki/Drug_interaction)
2. [Polypharmacy — Wikipedia](https://en.wikipedia.org/wiki/Polypharmacy)
3. [Adverse drug reaction — Wikipedia](https://en.wikipedia.org/wiki/Adverse_drug_reaction)
4. [Pharmacovigilance — Wikipedia](https://en.wikipedia.org/wiki/Pharmacovigilance)
