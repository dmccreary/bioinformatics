# MicroSim Generation Prompts

!!! prompt
    run the /microsim-utils program that creates JSON files for all #### Diagram elements in the chapters and put the JSON files in the @docs/microsims/TODO directory. 

## Results

Bash(python /Users/dan/.claude/skills/microsim-utils/scripts/create-microsim-todo-json-files.py --project-dir
      /Users/dan/Documents/ws/bioinformatics)
  ⎿  Project root: /Users/dan/Documents/ws/bioinformatics
     Chapters scanned: 16
     Total diagram specs found: 51
     … +3 lines (ctrl+o to expand)

  Read 1 file (ctrl+o to expand)

⏺ Done. The script scanned all 16 chapters and extracted 51 diagram specifications into individual JSON files in
  docs/sims/TODO/.

  ┌─────────────────────────┬─────────────────┐
  │         Metric          │      Value      │
  ├─────────────────────────┼─────────────────┤
  │ Chapters scanned        │ 16              │
  ├─────────────────────────┼─────────────────┤
  │ Diagram specs found     │ 51              │
  ├─────────────────────────┼─────────────────┤
  │ Already implemented     │ 0               │
  ├─────────────────────────┼─────────────────┤
  │ TODO JSON files created │ 51              │
  ├─────────────────────────┼─────────────────┤
  │ Output directory        │ docs/sims/TODO/ │
  └─────────────────────────┴─────────────────┘

  Each JSON file contains the sim-id, library, Bloom level, learning objective, chapter source, and full
  specification — ready to be picked up by the MicroSim generator skills.

  !!! prompts
    Using the data in the @docs/microsims/TODO/*.json, use the /microsim-generators skill
    to generate all the MicroSims for chapter 1