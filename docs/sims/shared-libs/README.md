# Classes of Diagram Architectures for Overlay MicroSims

The user has been very happy with the quality if detailed images created with
text-to-image models.  Our goal is to centralize these algorithms in
the @docs/sims/shared-libs directory.  A draft diagram.js file is
located there.

There are currently four different types of Diagram Overlay MicroSims.  All of these
use the pattern of using a text-to-image LLM to generate an image.  The
difference is how complex the overlay javascript must be.  In all
of these examples, the names and boundaries of each of the regions
are stored in a overlay.json overlay file within the MicroSim directory.
The diagram.js program fires the correct event for each region.
Adding the `edit=true` parameter allows the user to edit the regions.

Here are some examples:

1. **Type 1: Simple non-overlapping rectangles** - this is when the underlying image
has regular rectangles that the user will hover over an click on.  This
is ideal for vertical or horizontal panels or a regular array of regions (2x3, 3X2, 3X3 etc)
When the user hovers or clicks within a rectangle, an appropriate event occurs.
The edit mode allows the user to change the edges and corners of the rectangles.
2. **Type 2: Complex Polygons** - this is when the underlying image can not
be decomposed into non-overlapping rectangles.  In this example polygons with
three to many edges must be stored in the overlay.json overlay file.  The
diagram.js fires the correct event for each region the the user is hovering
over or clicking on.  The edit mode allows the user to move the existing
points in the polygon, remove an edge point or add a new edge point.
3. **Type 3: Callout Points to Edge Regions** - in this mode, different regions of
the image have points that also have lines to the edges of the diagram
where the labels of the points give the name of the point.  The user
can go into edit mode and move the points around the drawing and also
reorder the labels around the edges.  The user can place a checkbox
in the control region called "Show Numbers" that will toggle numbers
at the callout points.  The default is "Show Numbers" on.
4. **Type 4: Callout Points to Floating Labels** - in this mode,
the user can have a callout line to a label that is placed anywhere
in the diagram.  In the edit mode, the user can change the location
of the callout points and the location of the labels by dragging
them anywhere over the diagram.

Currently we only have Type 1 and Type 3 working.

## Layout Modes

The shared `diagram.js` supports three layout modes, set via `"layout"` in `data.json`:

1. **`side-panel`** (default) — Image left (65%), labels right (35%). Best for single-subject diagrams (e.g., animal cell, neuron).
2. **`top-bottom`** — Label strips above and below the image. Best for horizontal cross-sections (e.g., cell membrane). Each callout gets `"panel": "top"` or `"panel": "bottom"`.
3. **`dual-panel`** — Labels left (22%) | image center (56%) | labels right (22%). Best for comparison diagrams where structures belong to two groups (e.g., prokaryote vs. eukaryote). Each callout gets `"panel": "left"` or `"panel": "right"`.

All diagrams can also have a quiz mode which shows a gold star for each
correct answer and a celebration animation for completing a quiz.

## Diagram Title (Required)

Every diagram overlay `main.html` **must** include a visible title at the top center
of the page, above the Explore/Quiz controls:

```html
<h2 id="diagram-title">DNA Replication Fork</h2>
```

Style it with a small inline `<style>` block:

```css
#diagram-title {
  text-align: center;
  font-size: 1.4rem;
  margin: 4px 0 2px;
  color: #1a1a1a;
}
```

The title should be a short, descriptive name for the diagram — not the full MicroSim
title (omit "Explorer", "Interactive Diagram", etc.).

For **dual-panel** layouts where the two panels represent distinct biological subjects
(e.g., prokaryote vs. eukaryote), add `<h3>` region labels above each panel. Omit
region labels when the panels are just a spatial convenience for distributing callouts.

## Initial Marker Placement

When creating a new `data.json`, **never stack all callout markers at the same
coordinate** (e.g., `x: 50, y: 50`). Stacked markers are impossible to
distinguish or drag individually in edit mode.

Instead, spread initial `y` values evenly from top to bottom at `x = 50`:
- Range: y ≈ 7 to y ≈ 93
- Step: `86 / (N - 1)` where N is the number of callouts
- Example with 13 callouts: y = 7, 14, 21, 29, 36, 43, 50, 57, 64, 71, 79, 86, 93

This makes every marker individually visible and draggable on first load in
edit mode, before the image has been calibrated.