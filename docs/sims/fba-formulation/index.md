---
title: Flux Balance Analysis Formulation
description: Interactive p5.js MicroSim showing a small metabolic network with its stoichiometric matrix, adjustable exchange reaction bounds, and step-through of the linear programming formulation.
image: /sims/fba-formulation/fba-formulation.png
og:image: /sims/fba-formulation/fba-formulation.png
twitter:image: /sims/fba-formulation/fba-formulation.png
social:
   cards: false
quality_score: 3
---

# Flux Balance Analysis Formulation

<iframe src="main.html" height="660" width="100%" scrolling="no"></iframe>

[Run the Flux Balance Analysis Formulation MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This MicroSim demonstrates **Flux Balance Analysis (FBA)** — the mathematical framework for predicting metabolic fluxes in genome-scale metabolic models. Students see a small metabolic network alongside its **stoichiometric matrix S**, adjust exchange reaction bounds with sliders, and step through the linear programming formulation.

### Key Concepts

- **Stoichiometric matrix (S)** — Rows are metabolites, columns are reactions. Each entry is the stoichiometric coefficient (negative for substrates, positive for products).
- **Steady-state constraint** — $S \cdot v = 0$, where $v$ is the flux vector. At steady state, the net production and consumption of each internal metabolite must balance.
- **Flux bounds** — Each reaction has upper and lower bounds on its flux (determined by enzyme capacity, thermodynamics, or experimental measurements).
- **Objective function** — Typically maximizing biomass production or ATP yield.
- **Linear programming** — FBA solves for the flux distribution that maximizes the objective while satisfying stoichiometric and bound constraints.

## How to Use

1. **Exchange reaction sliders** — Adjust the upper and lower bounds on nutrient uptake and product secretion rates
2. **Step through the LP formulation** — See how the objective function, constraints, and bounds are assembled
3. **Observe the metabolic network** — See how the network diagram maps to the stoichiometric matrix

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/fba-formulation/main.html"
        height="660"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
College introductory bioinformatics

### Duration
20-25 minutes

### Prerequisites

- Understanding of metabolic reactions and stoichiometry
- Basic concept of steady-state in biological systems
- Familiarity with linear equations and constraints

### Activities

1. **Exploration** (5 min): Examine the metabolic network and its stoichiometric matrix. Verify that each column of S corresponds to a reaction in the network, with correct signs for substrates and products.
2. **Bound Manipulation** (5 min): Adjust the glucose uptake bound. What happens to the feasible flux space? What does it mean biologically when you restrict nutrient uptake?
3. **LP Formulation** (5 min): Step through the formulation. Identify the objective function, the equality constraints (S*v = 0), and the inequality constraints (bounds).
4. **Discussion** (5 min): FBA predicts optimal flux distributions but assumes cells maximize growth. When might this assumption be wrong?
5. **Assessment** (5 min): Answer the reflection questions below.

### Assessment

1. What does the steady-state constraint $S \cdot v = 0$ mean biologically?
2. Why are exchange reactions important in FBA, and what do their bounds represent?
3. If you set glucose uptake to zero, what would FBA predict for biomass production?
4. What are the limitations of FBA compared to kinetic modeling?

## References

1. [Flux balance analysis — Wikipedia](https://en.wikipedia.org/wiki/Flux_balance_analysis)
2. [Stoichiometry — Wikipedia](https://en.wikipedia.org/wiki/Stoichiometry)
3. [Linear programming — Wikipedia](https://en.wikipedia.org/wiki/Linear_programming)
4. [Metabolic network modelling — Wikipedia](https://en.wikipedia.org/wiki/Metabolic_network_modelling)
