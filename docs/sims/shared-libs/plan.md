# Interactive Diagram Architecture Plan

## Goal

Enable complex biological diagrams in this textbook to not just be static labeled images.
They should all become a self-contained interactive MicroSim by using
an overlay layer that catches hover and click events on regions over the diagram.
The overlay layer is controlled by centralized JavaScript libraries that
enable powerful features like Explore, Quiz and Edit modes and support
positive feedback for recognizing and naming structures within these diagrams.

Students switch between **Explore mode** (hover to learn) and **Quiz mode** (click to test) without leaving the page.  In the fullscreen mode and Edit button is enabled
that allows authors to change the regions using region and point editors.

In the quiz mode, a gold star is presented for each correct response.
At the end of a quiz, a celebration animation is generated.

---

## Core Principle

The AI-generated image contains **no embedded text labels**. All callout positions,
labels, descriptions, and quiz content are stored in a companion `data.json` file.
A single JavaScript component reads that file and renders the interactive overlay.

This separation of image from data means:
- Labels can be corrected or expanded without regenerating the image
- The same component code works for every diagram in the book
- Callout positions are percentage-based and scale to any screen size

---

## File Structure

Each interactive diagram lives in its own folder under `docs/sims/`:

```
docs/sims/
  animal-cell/
    index.html        ← self-contained MicroSim (iframe target)
    diagram.jpg       ← AI-generated image, NO text labels
    data.json         ← all callout data (positions, labels, descriptions)
  mitosis-diagram/
    index.html
    diagram.jpg
    data.json
  ...
```

The diagram is embedded in a chapter page as a standard MicroSim iframe:

```html
<iframe src="../../sims/animal-cell/index.html"
        width="100%" height="520" scrolling="no"></iframe>
```

---

## Data Model — `data.json`

```json
{
  "title": "Animal Cell",
  "orientation": "landscape",
  "callouts": [
    {
      "id": 1,
      "label": "Nucleus",
      "x": 48.0,
      "y": 44.0,
      "radius": 5.0,
      "description": "The control center of the cell. Contains DNA organized into chromosomes and directs all cellular activity through gene expression.",
      "ap_tip": "The nucleus is bounded by a double membrane (nuclear envelope) with pores — do not confuse with the nucleolus inside it."
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Unique callout number; displayed on the marker |
| `label` | string | Structure name shown in the infobox header |
| `x` | float | Horizontal center of the hotspot as % of image width |
| `y` | float | Vertical center of the hotspot as % of image height |
| `radius` | float | Clickable zone radius as % of image width |
| `description` | string | Full explanation shown in Explore mode infobox |
| `ap_tip` | string | college placement exam strategy or common misconception (optional) |

For multi-panel diagrams (e.g., mitosis), each callout also carries a `"panel"` integer
identifying which sub-panel it belongs to.

---

## Component Behavior

### Explore Mode

- Numbered circular markers are overlaid on the image at `(x%, y%)` positions
- On **hover** (desktop) or **tap** (mobile), the marker pulses and the infobox updates
- Infobox shows: structure name, description, and college placement tip (if present)
- Infobox placement:
  - **Landscape** images → infobox appears **below** the diagram
  - **Portrait** images → infobox appears **to the right** of the diagram

### Quiz Mode — Sub-mode A: "Find It" (priority build)

- Infobox area shows a prompt: *"Click on the [structure name]"*
- All markers show `?` instead of their number
- Student clicks a marker; immediate feedback appears (correct / incorrect)
- Correct answer advances to the next question automatically
- After all questions, a score summary is shown

### Quiz Mode — Sub-mode B: "Name It" (4-choice)

- One marker pulses / highlights on the diagram
- Infobox area shows 4 multiple-choice label options
- Student clicks the correct name
- Designed for touch/mobile where precise clicking is harder

### Quiz Mode — Sub-mode C: "Label Drop" (stretch goal)

- All markers visible but unlabeled
- A label bank appears in the infobox area
- Student drags labels onto the correct markers
- Score shown on completion

---

## Layout Templates

### Landscape

```
┌──────────────────────────────────────┐
│                                      │
│   diagram.jpg  with  [1] [2] markers │
│                                      │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  [ Explore ]  [ Quiz ]               │
│                                      │
│  Structure Name                      │
│  Description text...                 │
│  college placement Tip: ...                         │
└──────────────────────────────────────┘
```

### Portrait

```
┌────────────────────┬─────────────────┐
│                    │ [ Explore][Quiz]│
│  diagram.jpg       │                 │
│  with markers      │ Structure Name  │
│  [1] [2] [3]       │ Description...  │
│                    │ college placement Tip: ...     │
└────────────────────┴─────────────────┘
```

---

## Build Roadmap

| Step | Deliverable | Notes |
|------|-------------|-------|
| **1** | Pilot: `animal-cell` Explore mode, landscape | 6 callouts; validate concept |
| **2** | Portrait layout variant | CSS grid change only |
| **3** | Quiz Sub-mode A — "Find It" | Highest college placement exam value |
| **4** | Quiz Sub-mode B — "Name It" (4-choice) | Mobile-friendly |
| **5** | Score tracking + progress bar | UX polish |
| **6** | Panel-aware mode for multi-panel diagrams | Needed for mitosis |
| **7** | Quiz Sub-mode C — "Label Drop" drag-and-drop | Stretch goal |

---

## Design Constraints

- The MicroSim must work inside an MkDocs Material iframe with `scrolling="no"`
- No external JavaScript libraries beyond what is already in the page
- All assets (image, JS, JSON) must be local — no CDN calls from the iframe
- Marker size must be large enough for touch targets (minimum 44×44 px rendered size)
- The infobox must be readable at 320 px viewport width (mobile minimum)
- Color scheme must meet WCAG AA contrast on both white and the pale-blue cytoplasm background
