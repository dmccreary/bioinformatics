# PPI Force-Directed Graph Session Log

**Date:** 2026-03-25
**Status:** Complete - User happy with result

## Summary

Rebuilt the PPI Network Overview MicroSim from a buggy p5.js implementation to a clean vis-network version with proper force-directed layout.

## Problems with Original p5.js Version (`docs/sims/ppi-network-overview/`)

1. **Blank canvas on load** — Division-by-zero bug in force layout attraction calculation. When two nodes started at the same random position, `d` became 0, producing NaN that propagated to all node positions.
2. **Overlapping nodes in corners** — Hard clamping (0.08–0.92) caused nodes pushed past boundaries to stack at identical coordinates. Attempted soft boundary repulsion and increased repulsion strength, but the custom force-directed algorithm still produced overlapping nodes.
3. **Hidden edges** — The sidebar white rect was drawn after edges, covering lines that passed through the sidebar area.
4. **Overlapping labels** — Added label collision avoidance with relaxation passes, but this was a symptom of the underlying layout problems.

## Solution: vis-network Reimplementation (`docs/sims/ppi-network-overview-vis/`)

Created a new MicroSim using the vis-network library's built-in ForceAtlas2 solver, which eliminated all layout issues immediately.

### Key Features
- 25 cancer-related protein nodes with same data as original
- Node size scaled by degree, red for hubs (degree > 4), blue for regular
- Sidebar with network stats (nodes, edges, avg degree, max degree, density, avg clustering) — label:value pairs on same line for compact layout
- Hover info showing per-node degree, betweenness centrality, clustering coefficient
- Hub protein list sorted by degree
- Legend with colored dots
- Regenerate button to randomize layout
- Title bar at top
- Built-in vis-network navigation buttons (+, −, fit, pan arrows)

### Scroll Hijacking Prevention
- `zoomView: false` and `dragView: false` when inside iframe (detected via `isInIframe()`)
- Mouse zoom/pan re-enabled in fullscreen mode
- `navigationButtons: true` with vis-network CSS loaded for icon rendering

### Important: vis-network CSS Required
The built-in navigation button icons require the vis-network CSS file:
```html
<link rel="stylesheet" href="https://unpkg.com/vis-network/styles/vis-network.min.css">
```
Without this, `navigationButtons: true` creates invisible buttons.

## Files Created/Modified

- `docs/sims/ppi-network-overview-vis/main.html` — vis-network implementation
- `docs/sims/ppi-network-overview-vis/index.md` — Detailed lesson plan page
- `docs/sims/ppi-network-overview-vis/metadata.json` — Educational metadata
- `mkdocs.yml` — Added nav entry

## Lesson Learned

The p5.js force-directed layout implementation had fundamental issues that were difficult to fix incrementally. Switching to vis-network's mature ForceAtlas2 solver produced a dramatically cleaner result with less code and built-in interactivity (drag nodes, zoom, pan).
