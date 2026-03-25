# Bioinformatics Intelligent Textbook

## Learning Mascot: Olli the Octopus

### Character Overview

- **Name**: Olli
- **Species**: Octopus
- **Personality**: Curious, encouraging, methodical, slightly playful
- **Catchphrase**: "Let's connect the dots!"
- **Visual**: A friendly teal octopus with large kind eyes, small round glasses, and eight arms that suggest network connections

### Voice Characteristics

- Uses clear, encouraging language appropriate for college-level students
- Occasionally uses graph/network puns ("Let's connect the dots!", "Follow the edges!")
- Refers to students as "explorers" or "investigators"
- Signature phrases: "Let's connect the dots!", "What's the link?", "Follow the edges!"

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Section completion | mascot-celebration | End of major sections |
| Difficult content | mascot-encourage | Where students may struggle |

### Admonition Syntax

```markdown
!!! mascot-welcome "Welcome! Let's Connect the Dots!"

    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img">
    Welcome text here...
```

### Do's and Don'ts

**Do:**

- Use Olli to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Olli more than 5-6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Olli's personality or speech patterns

---

## Build Process

Use `mkdocs build` to check the `mkdocs.yml` file is valid.

Use `mkdocs gh-deploy` to publish the website to GitHub pages.

Assume the user is running `mkdocs serve` in a separate shell.

## Configuration (`mkdocs.yml`)

Key settings:
- Theme: MkDocs Material, primary color `green`
- No `navigation.tabs` — this book uses side navigation only (never add `navigation.tabs`)
- Math: MathJax via external CDN + `docs/js/mathjax-config.js`
- Social plugin enabled (requires Cairo system library)
- `watch: [docs, mkdocs.yml]` for live reload

## Learning Graph Data (`docs/learning-graph/`)

Two canonical data files drive the interactive graph viewer:
- `learning-graph.csv` — edges as `from,to` concept pairs
- `learning-graph.json` — vis-network format with `nodes`, `edges`, and `metadata` elements

Supporting analysis pages (Python scripts in same directory): `analyze-graph.py`, `csv-to-json.py`, `taxonomy-distribution.py`, `add-taxonomy.py`, `validate-learning-graph.py`.

## Token Efficiency: Prefer Serial Over Parallel Processing

These skills target teachers on the **Claude Pro plan**, which has a **five-hour
budget of only ~200K tokens**. Teachers are **not sensitive to run times** — a task
that takes 3 minutes instead of 1 minute is fine, but a task that burns 84K tokens
instead of 48K means they can do fewer tasks before hitting their ceiling.

Always default to serial processing (one Task agent) unless the user explicitly
requests speed or parallel execution. Each parallel Task agent costs ~12K tokens
in startup overhead (system prompt + tool descriptions). Four parallel agents waste
~36K tokens on overhead alone — that's 18% of a Pro user's entire five-hour budget
spent on nothing but agent startups.

Before launching parallel agents, ask: "Does the user need this faster, or cheaper?"
The answer for teachers is almost always cheaper.

---

## Content Layer (`docs/`)

- `docs/index.md` — Home page
- `docs/course-description.md` — The authoritative source document; all learning graph concepts derive from it
- `docs/learning-graph/` — Learning graph data and analysis pages
- `docs/img/mascot/` — 7 Olli PNG files (transparent background, ≤100 KB each)
- `docs/css/extra.css` — Layout, iframe, and `.prompt` admonition copy-button styles
- `docs/css/mascot.css` — All 7 mascot admonition color styles + `.mascot-admonition-img` float rule
- `docs/js/extra.js` — Copy-button logic for `.admonition.prompt` blocks
- `docs/js/mathjax-config.js` — MathJax configuration (equations use MathJax, not KaTeX)

### CSS Architecture

Two CSS files are loaded in order:
1. `extra.css` — structural styles (logo sizing, iframes, `.prompt` admonition copy button)
2. `mascot.css` — all 7 mascot admonition variants + shared image float rules

**Mascot CSS pattern:**
- Each admonition type gets its own `border-color` + `background-color` block
- A single global rule `[class*="mascot-"] > .admonition-title::before { display: none }` removes all icons
- `.mascot-admonition-img` uses `float: left; margin: 0 1em 0.5em 0` to place the image left of text
- `--mascot-size: 90px` controls image size in admonitions

### Mascot Images

7 PNG files at `docs/img/mascot/`:
`neutral.png`, `welcome.png`, `thinking.png`, `tip.png`, `warning.png`, `celebration.png`, `encouraging.png`

- Format: PNG with transparent background
- Target: 512×512 px generated, displayed at 90×90 px via CSS variable
- Generation prompts: `docs/img/mascot/image-prompts.md`

### Mascot Admonition Syntax Reference

```markdown
!!! mascot-neutral "A Note from Olli"
    General notes, sidebars, or any context without a specific tone.

!!! mascot-welcome "Olli Welcomes You!"
    Welcome text here. Always include "Let's connect the dots!" in the welcome.

!!! mascot-thinking "Key Insight"
    A critical conceptual connection or big-picture observation.

!!! mascot-tip "Olli's Tip"
    A study strategy, memory trick, or problem-solving shortcut.

!!! mascot-warning "Common Mistake"
    A frequent misconception or error students make.

!!! mascot-celebration "Excellent Work!"
    Acknowledgment of completing a difficult section or mastering a concept.

!!! mascot-encourage "You've Got This!"
    Encouragement before or during a challenging section.
```

To include Olli's image inside an admonition body:

```markdown
!!! mascot-welcome "Olli Welcomes You!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Olli welcomes you">
    Welcome text here...
```

Image paths are relative to the rendered page depth — use `../../img/mascot/` from pages two levels deep (e.g., `docs/chapters/01-foundations-molecular-biology/`), or `../img/mascot/` from one level deep.

---

## Equations and Chemical Notation

### Critical Rule: Never Use Backslash Delimiters in Markdown

**NEVER write `\(...\)` or `\[...\]` directly in any `.md` file.** Python-Markdown can corrupt backslash sequences before MathJax ever sees them, silently breaking equations.

**Always use `$` and `$$` in markdown content files. No exceptions.**

### How the Pipeline Works

```
Markdown source     pymdownx.arithmatex      MathJax renders
──────────────      ───────────────────      ───────────────
$...$          →    \(...\)              →    inline equation
$$...$$        →    \[...\]             →    block equation
```

The arithmatex extension (configured with `generic: true` in `mkdocs.yml`) intercepts dollar-sign delimiters and converts them to backslash form *internally* before handing off to MathJax. The backslash delimiters in `mathjax-config.js` are what MathJax receives — they are never written by hand.

### Inline Equations

Wrap in single `$`:

```markdown
The alignment score is $S(a, b) = \sum_{i=1}^{n} s(a_i, b_i)$.

E-value: $E = Kmn \cdot e^{-\lambda S}$
```

### Block (Display) Equations

Wrap in `$$` on its own lines:

```markdown
$$
S(a, b) = \sum_{i=1}^{n} s(a_i, b_i) - \text{gap penalties}
$$

$$
P(x | \theta) = \prod_{i=1}^{n} P(x_i | \theta)
$$
```

### Chemical Equations — Use `\ce{}`

Chemical notation uses the `mhchem` package via `$\ce{...}$`. This is the **only** correct way to write chemical formulas and reactions.

```markdown
Water: $\ce{H2O}$

DNA backbone linkage:
$$\ce{nucleotide + nucleotide -> dinucleotide + H2O}$$

ATP hydrolysis: $\ce{ATP + H2O -> ADP + P_i}$
```

### Literal Dollar Signs (Currency)

**Known bug:** Dollar signs (`$`) inside admonitions are always interpreted as MathJax math delimiters. Neither `\$` nor `&#36;` workarounds are reliable inside admonition blocks. **Never place dollar amounts inside admonitions.** Spell out the amount instead (e.g., "two hundred dollars") or move the dollar figure to regular markdown outside the admonition.

In regular markdown (outside admonitions), `\$` works fine for literal dollar signs.

### What NOT to Write

```markdown
<!-- WRONG — backslash delimiters in markdown -->
\(p^2 + 2pq + q^2 = 1\)
\[E = mc^2\]

<!-- WRONG — plain text subscripts instead of math -->
H2O, CO2, ATP → ADP + Pi

<!-- CORRECT -->
$p^2 + 2pq + q^2 = 1$
$$E = mc^2$$
$\ce{H2O}$, $\ce{CO2}$, $\ce{ATP -> ADP + P_i}$
```

---

## Chapter Content Guidelines

### Diagrams in Chapters — Always Use MicroSim Iframes

Every multi-callout biological diagram in a chapter **must** be an interactive
MicroSim, not a static image or a `<details>` placeholder block.
**Never use `<details>` blocks for biological diagrams — use the MicroSim workflow.**

### Strongly Prefer `/interactive-infographic-overlay` for Biological Structures

When a diagram depicts **detailed biological structures with labeled parts** — cells, organelles, molecular complexes, anatomical cross-sections, pathway diagrams with discrete components — **always use the `/interactive-infographic-overlay` skill** instead of building a p5.js MicroSim from scratch. This skill generates:

- An annotation-free image prompt for a text-to-image LLM
- A `data.json` overlay file with callout positions, descriptions, and tips
- A `main.html` shell that references `shared-libs/diagram.js`
- An `index.md` page with iframe embed

The shared `diagram.js` library provides Explore mode (hover for info), Quiz mode (identify structures), and Edit mode (drag-to-calibrate markers) out of the box — no custom JavaScript needed.

**Use `/interactive-infographic-overlay` for:**

- Cell anatomy diagrams (prokaryotic, eukaryotic, organelle cross-sections)
- Protein and molecular structure diagrams with labeled regions
- Tissue or organ cross-sections with identified structures
- Pathway diagrams where discrete components need callout labels
- Any diagram where the primary interaction is "hover/click a structure to learn about it"

**Use p5.js MicroSims instead when:**

- The diagram requires dynamic animation or simulation (e.g., algorithm visualization)
- The user needs to manipulate parameters with sliders and see real-time changes
- The visualization is generated from data, not from a static background image
- The interaction pattern is fundamentally computational (sorting, traversal, calculation)

**Decision rule:**

| Content | Action |
|---------|--------|
| Cell anatomy, organelle diagrams | `/interactive-infographic-overlay` |
| Protein/molecular structure with labeled regions | `/interactive-infographic-overlay` |
| Pathway diagrams with labeled components | `/interactive-infographic-overlay` |
| Anatomical cross-sections | `/interactive-infographic-overlay` |
| Network diagrams (PPI, regulatory, signaling) | MicroSim — vis-network or p5.js |
| Algorithm visualizations (traversal, alignment) | MicroSim — p5.js |
| Parameter exploration (sliders, dynamic) | MicroSim — p5.js |
| Sequence alignment visualizations | MicroSim — p5.js |
| Phylogenetic trees with labeled clades | MicroSim — p5.js or vis-network |
| Graph algorithm visualizations | MicroSim — p5.js |
| Simple data tables or text comparisons | Markdown table — no sim needed |
| Conceptual relationships (2–4 items) | Prose or bullet list — no sim needed |

### Embedding a MicroSim in a Chapter

Chapter files live at `docs/chapters/<chapter-name>/index.md` (two levels deep from `docs/`),
so the relative path to any sim is `../../sims/<sim-name>/main.html`.

```markdown
## Protein Interaction Network

<iframe src="../../sims/ppi-network/main.html" height="730" width="100%" scrolling="no"></iframe>

*[View Fullscreen](../../sims/ppi-network/main.html)*

The diagram above shows the protein-protein interaction network.
Use **Explore mode** to learn about each node, or switch to **Quiz mode**
to test yourself.
```

Rules for iframe embeds in chapters:
- Never add a `style` attribute to the `<iframe>` element. Styles are governed by `docs/css/extra.css`
- Always include `scrolling="no"` to avoid scroll hijacking
- Height = image natural height (~900 px for landscape 4:3) + ~160 px infobox = **~730 px** for standard sims
- Add a `[View {NAME} MicroSim Fullscreen](...)` link immediately after the iframe
- Write 2–4 sentences of prose around the iframe — do not just drop the iframe with no context

### "Return to Lesson Plan" Link — Iframe-Aware Pattern

HTML-page MicroSims that grow vertically (form calculators, tables, step-through tools — anything that is **not** a fixed-height canvas) must include a "Return to Lesson Plan" link that is shown **only** when the page is opened fullscreen, and hidden when embedded inside an iframe.

Use this exact pattern at the bottom of `main.html`, after the main JS `<script>` tag:

```html
<div id="return-link" style="display:none; padding: 8px 16px;">
    <a href=".">← Return to Lesson Plan</a>
</div>
<script>
    // Show the link only when running fullscreen, not inside an iframe.
    if (window.self === window.top) {
        document.getElementById('return-link').style.display = 'block';
    }
</script>
```

### Updating the Site Navigation Menu

When finished creating a new MicroSim, add the new sim to `mkdocs.yml` nav under the MicroSims section.

### MicroSim File Naming Convention

The interactive HTML file in every MicroSim folder must be named `main.html` — never `index.html`. The MkDocs page file remains `index.md`.

### MicroSim Background Color

All interactive MicroSims must use `background: aliceblue` on the `<body>` element. This provides a consistent visual cue so students can immediately recognize an embedded MicroSim as an interactive element, distinct from static content.