---
title: Volcano Plot for Differential Expression
description: Interactive volcano plot of simulated differential gene expression data with adjustable fold-change and p-value thresholds, hover-to-identify gene details, and color-coded significance categories.
image: /sims/volcano-plot/volcano-plot.png
og:image: /sims/volcano-plot/volcano-plot.png
twitter:image: /sims/volcano-plot/volcano-plot.png
social:
   cards: false
quality_score: 3
---

# Volcano Plot for Differential Expression

<iframe src="main.html" height="542" width="100%" scrolling="no"></iframe>

[Run the Volcano Plot for Differential Expression MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim displays a **volcano plot** — the standard visualization for differential gene expression analysis. It plots 100 simulated genes with their **log2 fold change** on the x-axis and **-log10 adjusted p-value** on the y-axis, creating the characteristic volcano shape. Students can adjust significance thresholds and hover over individual genes to explore the data.

### What Is a Volcano Plot?

A volcano plot combines two key metrics from a differential expression experiment:

- **Log2 fold change (x-axis)** — How much a gene's expression changed between two conditions (e.g., tumor vs. normal). Positive values indicate upregulation; negative values indicate downregulation.
- **-log10 p-value (y-axis)** — Statistical significance of the change. Higher values (further from the x-axis) indicate more statistically significant differences.

Genes in the upper-left and upper-right corners are both statistically significant and biologically meaningful — these are the most interesting candidates for further study.

### Visual Encoding

- **Red points** — Significantly upregulated genes (above p-value threshold and right of fold-change threshold)
- **Blue points** — Significantly downregulated genes (above p-value threshold and left of negative fold-change threshold)
- **Gray points** — Genes that do not meet both significance criteria
- **Vertical dashed lines** — Fold-change thresholds
- **Horizontal dashed line** — P-value significance threshold
- **Gene labels** appear on hover, showing the gene name, fold change, and p-value

### Simulated Data

The 100 genes are drawn from well-known cancer-related genes (TP53, BRCA1, MYC, EGFR, etc.) with simulated expression changes. Approximately 15% are strongly upregulated, 15% strongly downregulated, 20% are borderline, and 50% show no significant change — reflecting typical real-world distributions.

## How to Use

1. **Fold-change threshold slider** — Adjust the minimum absolute log2 fold change required for significance (vertical dashed lines move)
2. **P-value threshold slider** — Adjust the -log10 p-value cutoff (horizontal dashed line moves)
3. **Hover** over any gene point to see its name, fold change value, and p-value
4. **Regenerate button** — Create a new set of 100 simulated genes with different random expression values

### Suggested Experiments

- Start with default thresholds and count the red (up) and blue (down) significant genes
- Increase the fold-change threshold to 2.0 — watch how many genes lose significance. These were statistically significant but had small effect sizes.
- Increase the p-value threshold to 3.0 (-log10 scale, meaning p < 0.001) — now only the most statistically robust genes remain
- Click Regenerate several times and notice how the distribution varies — this illustrates why statistical thresholds matter

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/volcano-plot/main.html"
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

- Understanding of gene expression and how it is measured (RNA-seq)
- Basic statistics: p-values and what statistical significance means
- Concept of fold change as a ratio of expression levels between conditions

### Activities

1. **Exploration** (5 min): With default thresholds, hover over genes in each region (red, blue, gray). For 3 genes in each category, record the gene name, fold change, and p-value. What distinguishes significant from non-significant genes?
2. **Threshold Tuning** (5 min): Set a very permissive threshold (FC > 0.5, p < 0.1) and count significant genes. Then set a very strict threshold (FC > 2.0, p < 0.001). How does threshold choice affect the number of candidate genes? Discuss the trade-off between sensitivity and specificity.
3. **Biological Interpretation** (5 min): Regenerate the data and find the gene with the highest fold change. Is it also the most statistically significant? Find the gene with the highest -log10 p-value. Is it also the most biologically changed? Discuss why both metrics are needed.
4. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. Why does a volcano plot use log2 fold change rather than raw fold change on the x-axis?
2. A gene has a log2 fold change of 3.0 but a p-value of 0.08. Would you consider this gene differentially expressed? Why or why not?
3. Why do volcano plots typically show a "volcano" shape — few points in the upper corners and many near the origin?
4. In a drug treatment experiment, you see 200 significantly upregulated genes and 5 significantly downregulated genes. What might this asymmetry suggest about the drug's mechanism?

## References

1. [Volcano plot (statistics) — Wikipedia](https://en.wikipedia.org/wiki/Volcano_plot_(statistics))
2. [RNA-Seq — Wikipedia](https://en.wikipedia.org/wiki/RNA-Seq)
3. [Gene expression — Wikipedia](https://en.wikipedia.org/wiki/Gene_expression)
4. [Statistical significance — Wikipedia](https://en.wikipedia.org/wiki/Statistical_significance)
5. [Fold change — Wikipedia](https://en.wikipedia.org/wiki/Fold_change)
