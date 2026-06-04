# Bipartite Metabolic MicroSim Change Log

**Date:** 2026-03-26
**Files modified:**

- `docs/sims/bipartite-metabolic/bipartite-metabolic.js` (p5.js version)
- `docs/sims/bipartite-metabolic/index.md`
- `docs/sims/bipartite-metabolic-graph/bipartite-metabolic-graph.js` (vis-network version)

## Steps

### 1. Widen metabolite ellipses in vis-network version

The text "Hexokinase" was too wide to fit in the default ellipse.
Added label padding (`'  ' + label + '  '`) to metabolite nodes
to make them ~30% wider. Tried `widthConstraint: { minimum: 105 }`
first but it had no effect on vis-network ellipse shapes.
Label padding is the standard vis-network technique.

### 2. Swap shapes in vis-network version

- Metabolites changed from `ellipse` to `box` (wider rectangles)
- Reactions/enzymes changed from `box` to `ellipse` (with label padding)
- Updated legend swatches to match new shapes

### 3. Swap shapes in p5.js version

- Enzymes changed from `circle()` to `ellipse()` with `ellipseW = nodeR * 3.2`, `ellipseH = nodeR * 2`
- Metabolites changed from square `rect()` to wider rectangle with `rectW = sqSize * 1.6`, `rectH = sqSize`
- Updated hover hit detection for ellipse math and wider rectangle bounds
- Updated edge line endpoints to connect at new shape edges

### 4. Fix rendering bug — variable declaration order

The shape dimension variables `ellipseW` and `rectW` were used in the
edge-drawing loop but declared after it. Moved all shape dimension
declarations (`ellipseW`, `ellipseH`, `rectW`, `rectH`) above the
edge-drawing section.

### 5. Add directional arrows to edges

Added arrowheads to show substrate/product flow direction:

- Substrate edges: metabolite -> enzyme (arrow points at enzyme)
- Product edges: enzyme -> metabolite (arrow points at metabolite)
- Arrow color matches edge highlighting (teal for substrate, orange for product)
- Arrow size set to 9px

### 6. Add missing glycolysis enzymes and metabolites

The bottom three nodes (Pyruvate Kinase, PEP, Pyruvate) were
disconnected from the rest of the pathway. Three enzymes and two
metabolites were missing between 1,3BPG and PEP:

**Added enzymes:**

- E6 PGK (Phosphoglycerate kinase): 1,3BPG -> 3-PG
- E7 PGM (Phosphoglycerate mutase): 3-PG -> 2-PG
- E8 Enolase: 2-PG -> PEP

**Added metabolites:**

- M7 3-PG (3-Phosphoglycerate)
- M8 2-PG (2-Phosphoglycerate)

Renumbered existing PEP (M7->M9), Pyruvate (M8->M10),
and Pyruvate Kinase (E6->E9).

### 7. Expand info panel descriptions

- Expanded all 19 node descriptions (9 enzymes + 10 metabolites)
  from one-line summaries to 2-3 sentence biochemistry explanations
- Enlarged info panel from 42px to 60px height (user adjusted from 100px)
- Added `textLeading(15)` for readable line spacing
- Passed width and height bounds to `text()` for multi-line wrapping
- Canvas height increased from 520px to 720px to accommodate extra
  nodes and larger info panel
- Updated iframe height in index.md to match

## Lessons Learned

- `widthConstraint` does not affect vis-network `ellipse` shapes; use label padding instead
- Declare shape dimension variables before any code that references them
- When simplifying a pathway, verify that all steps are connected end-to-end
- p5.js `text(str, x, y, width, height)` enables automatic text wrapping
