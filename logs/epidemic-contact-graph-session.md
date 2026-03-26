# Epidemic Contact Graph MicroSim — Session Log

**Date:** 2026-03-26
**Requested by:** Adam Fowler
**Status:** Complete — User happy with final result

## Summary

Created a new vis-network MicroSim simulating SIR epidemic spread with contact tracing visualization. The initial implementation went smoothly but the debugging session for R0 display and layout issues was lengthy.

## Prompts and Actions

### 1. Initial Request
**User:** "I just got a request from my friend Adam Fowler to do a new microsim on the subject of 'visualising epidemic contact graphs, and contacts over time' — can you please add a new microsim using vis-network that shows this? I should have nodes for individuals and have a Start/Pause button on the left side with sliders for key parameters of the simulation."

**Action:** Created `docs/sims/epidemic-contact-graph/` with `main.html`, `index.md`, `metadata.json`. SIR model with vis-network ForceAtlas2 layout, Start/Pause, Reset, and sliders for population, contacts/day, infection probability, recovery days, and speed. Added to `mkdocs.yml` nav.

### 2. Jerky Animation Fix
**User:** "the display is too 'jerkey' — the entire network is hard to see when it moves for each step. How about we just place the individuals at the start, but not change the placement of the nodes as the simulation runs?"

**Action:** Added `network.on('stabilizationIterationsDone', ...)` to disable physics after initial layout. Nodes stay fixed during simulation.

### 3. README Generation
**User:** "run the README.md generator skill"

**Action:** Generated comprehensive README.md with badges, metrics, chapter listing, repo structure, getting started, etc. Committed and pushed.

### 4. Refactor to External Files
**User:** "please refactor the CSS and the JavaScript elements into style.css and script.js"

**Action:** Extracted all CSS to `style.css`, all JavaScript to `script.js`. Simplified `main.html` to markup only with external references.

### 5. Remove "Simulation" Label
**User:** "remove the label 'Simulation' from the left side panel. It is not needed and it pushes the legend below the visible area of the iframe"

**Action:** Removed `<h3>Simulation</h3>` from controls panel.

### 6. R0 Always Unset (Long Debug Session)
**User:** "The 'R0 (est)' is always unset"

**Action (attempt 1):** Changed R0 calculation from `(totalInfections - initialInfected) / initialInfected` to per-person secondary infection tracking with `secondaryInfections` object. Still showed '—'.

**Action (attempt 2):** Changed to use `Object.keys(secondaryInfections).reduce(...)`. Still showed '—'.

**Action (attempt 3):** Simplified to plain counter `totalInfected` with `totalInfected / counts.R`. Changed default from '—' to '0.0'. Still showed 0.0.

**Action (attempt 4):** Changed from `.textContent` to `.innerText`. Added cache-busting query string. Still 0.0.

**Action (attempt 5):** Asked user to check browser console.

**Root Cause Found:** `Uncaught TypeError: Cannot set properties of null (setting 'textContent') at updateStats (script.js:212)`. vis-network **destroys all child elements** inside its container div when it initializes. The `#day-display` and `#timeline-bar` divs were children of `#network-container`, so vis-network deleted them from the DOM. This caused `document.getElementById('day-display')` to return null, which threw an error that stopped `updateStats()` execution before reaching the R0 line. The other stats (Day, S, I, R) appeared to update because they were in the sidebar, not inside the network container.

**Fix:** Moved `#day-display` and `#timeline-bar` outside `#network-container`, wrapped in a parent div alongside the network container.

### 7. Remove Zoom/Pan, Fix R0 Value
**User:** "please remove the zoom and pan buttons since the graph is fixed. The R0 (est) does change, but only to 1.0"

**Action:** Set `navigationButtons: false`, `zoomView: false`, `dragView: false`. Fixed R0 calculation — the formula `totalInfected / recovered` gives ~1.0 because late-stage infected people find no susceptible contacts (herd immunity). Changed to track `spread` count per person and average only among early cases (days 0–3) to reflect true R0 before susceptible depletion.

### 8. Layout Adjustments
**User:** "move the control panel on the left up 20"
**Action:** Removed top padding on controls panel.

**User:** "There is still a large space above the controls panel on the left. Please make the controls panel go to the top of the drawing canvas"
**Action:** Moved title and version from above the wrapper to inside the right-side network column, so controls panel starts at the very top.

**User:** "the bar at the bottom that shows the distribution of person status is covering the individual circles"
**Action:** Moved timeline bar from absolute-positioned overlay inside the network area to a normal flow element below the wrapper. Changed from `position: absolute` to block layout.

**User:** "there is still a blank space above the network graph below the title and the graph overlaps the timeline bar"
**Action:** Made title and version absolute-positioned overlays on the network area (no vertical space consumed). Network container fills full height. Added `network.fit()` after stabilization to keep nodes within bounds.

**User:** "perfect!"

## Final File Structure

```
docs/sims/epidemic-contact-graph/
├── main.html        — Clean HTML markup
├── style.css        — All CSS styles
├── script.js        — All JavaScript logic
├── index.md         — MkDocs lesson plan page
└── metadata.json    — Educational metadata
```

## Lessons Learned

### 1. vis-network Destroys Container Children
**Critical:** vis-network replaces the entire innerHTML of its container element during initialization. Never place overlay elements (day counters, status bars, etc.) as children of the network container div. Place them as siblings in a parent wrapper instead. This caused a lengthy debug session because the error was silent — `getElementById` returned null, the TypeError stopped execution mid-function, but earlier DOM updates in the same function had already succeeded, making it appear that only the R0 line was broken.

### 2. R0 Calculation in SIR Simulations
A naive `totalInfections / totalRecovered` gives ~1.0 in any epidemic that runs to completion because every person in the chain averages one downstream infection. The epidemiologically meaningful R0 must be calculated from **early cases only** (before herd immunity reduces the susceptible pool). Track per-person `spread` counts and average only among people infected in the first few days.

### 3. Cache Busting is Not Always the Problem
Multiple attempts to add `?v=N` cache busters were wasted effort. The real issue was a JavaScript runtime error. When debugging, always check the browser console first before assuming caching.

### 4. Version Numbers Aid Debugging
Adding a visible version number to the MicroSim UI immediately confirms whether the latest code is running, eliminating cache questions entirely. Should be standard practice during development.

### 5. Overlay Elements in Network Visualizations
Absolute-positioned overlays (title, day counter) work better than block-level elements above the network because they don't consume vertical space. This maximizes the area available for the graph and avoids layout gaps.
