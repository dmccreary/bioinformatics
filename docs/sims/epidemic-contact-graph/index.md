---
title: Epidemic Contact Graph
description: Interactive SIR epidemic simulation showing contact tracing as a force-directed network graph with transmission chains over time.
social:
   cards: false
quality_score: 0
---

# Epidemic Contact Graph

<iframe src="main.html" height="570" width="100%" scrolling="no"></iframe>

[Run the Epidemic Contact Graph MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim simulates the spread of an infectious disease through a
population using an **SIR (Susceptible-Infected-Recovered) model** and
visualizes the contact network as it builds over time. Each node represents
an individual, and edges appear as contacts occur — making transmission
chains directly visible in the graph structure.

The simulation begins with a single **patient zero** (shown in red) and
progresses day by day. On each day, every infected individual contacts a
random subset of the population. Each contact with a susceptible person
has a probability of transmitting the disease. After a set number of days,
infected individuals recover and become immune.

### Visual Encoding

- **Blue nodes** — Susceptible individuals who have not yet been infected
- **Red nodes** (larger, bold border) — Currently infected individuals
- **Green nodes** — Recovered individuals who are now immune
- **Red solid arrows** — Contacts where transmission occurred, showing the direction of infection
- **Gray dashed lines** — Contacts that did not result in transmission

### Contact Graph Over Time

As the simulation runs, the network grows with new edges each day. This
reveals the **contact tracing graph** — the complete history of who
contacted whom and which contacts led to transmission. Hub nodes with
many outgoing red arrows are **super-spreaders** who infected multiple
others.

### Timeline Bar

The horizontal bar at the bottom shows the current proportion of the
population in each state (blue = susceptible, red = infected, green = recovered),
giving an at-a-glance view of epidemic progression.

## How to Use

1. **Start** — Click to begin the simulation; click again to pause
2. **Reset** — Stop the simulation and generate a fresh population
3. **Population** — Number of individuals in the network (10–60)
4. **Contacts/day** — How many random people each infected individual contacts per day
5. **Infection prob** — Probability that a contact between an infected and susceptible person results in transmission
6. **Recovery days** — Number of days until an infected individual recovers and becomes immune
7. **Speed** — Milliseconds between simulated days (lower = faster)

### Suggested Experiments

- **Low transmission:** Set infection probability to 0.1 and observe how the disease may die out
- **High contacts:** Increase contacts/day to 6–8 and watch super-spreader patterns emerge
- **Long recovery:** Set recovery days to 14+ and observe how longer infectious periods lead to larger outbreaks
- **Herd immunity:** Watch how recovered (green) nodes create barriers that protect remaining susceptible nodes

## Key Concepts Illustrated

### SIR Model

The SIR model divides a population into three compartments:
**Susceptible** (can be infected), **Infected** (can transmit), and
**Recovered** (immune). The basic reproduction number **R0** estimates
how many secondary infections each initial case produces.

### Contact Tracing

The graph structure directly shows the contact network — which
individuals were in contact and when. In real epidemiology, reconstructing
this graph is essential for identifying transmission chains and breaking
them through isolation and quarantine.

### Network Effects

The force-directed layout naturally clusters individuals who share many
contacts. Densely connected clusters experience rapid local spread, while
bridges between clusters enable the disease to reach new groups.

## Iframe Embed Code

```html
<iframe src="https://dmccreary.github.io/bioinformatics/sims/epidemic-contact-graph/main.html"
        height="570"
        width="100%"
        scrolling="no"></iframe>
```
