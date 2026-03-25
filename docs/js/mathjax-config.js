// MathJax configuration for Bioinformatics
// Enables standard math notation AND mhchem for chemical equations (\ce{})
//
// ── Delimiter rules for markdown authors ──────────────────────────────────────
//
//   Inline math:   $...$           e.g.  $E = mc^2$
//   Block math:    $$...$$         e.g.  $$\Delta G = \Delta H - T\Delta S$$
//   Chemistry:     $\ce{...}$      e.g.  $\ce{6CO2 + 6H2O -> C6H12O6 + 6O2}$
//
//   NEVER write \(...\) or \[...\] in .md files — Python-Markdown may corrupt
//   backslash sequences before MathJax ever sees them.
//   Always use $ and $$ in content files. No exceptions.

window.MathJax = {
  loader: {
    load: ['[tex]/mhchem']
  },
  tex: {
    packages: {'[+]': ['mhchem']},
    inlineMath:  [['\\(', '\\)'], ['$', '$']],
    displayMath: [['\\[', '\\]'], ['$$', '$$']]
  }
};