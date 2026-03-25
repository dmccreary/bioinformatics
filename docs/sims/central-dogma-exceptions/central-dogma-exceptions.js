// Central Dogma and Its Exceptions - Interactive Diagram
// Bloom Level: Understand (L2) - Explain standard flow and classify exceptions
// Click nodes or edges to see details
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 35;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let showExceptions = false;
let toggleBtn;
let selectedArrow = -1;
let selectedNode = -1;

const NODES = [
  {
    id: 'dna', label: 'DNA', x: 0.2, y: 0.25, col: [76, 175, 80], r: 45,
    desc: 'Deoxyribonucleic acid (DNA) is the double-stranded molecule that stores genetic information. Its four nucleotide bases (A, T, G, C) encode instructions for building proteins and regulating cellular processes.',
    example: 'Human genome: ~3.2 billion base pairs'
  },
  {
    id: 'rna', label: 'RNA', x: 0.5, y: 0.25, col: [33, 150, 243], r: 45,
    desc: 'Ribonucleic acid (RNA) is a single-stranded molecule that serves as an intermediary between DNA and protein. Key types include mRNA (messenger), tRNA (transfer), and rRNA (ribosomal).',
    example: 'mRNA, tRNA, rRNA, miRNA, lncRNA'
  },
  {
    id: 'protein', label: 'Protein', x: 0.8, y: 0.25, col: [156, 39, 176], r: 45,
    desc: 'Proteins are polymers of amino acids that perform most cellular functions: catalysis (enzymes), structure (collagen), signaling (hormones), transport (hemoglobin), and defense (antibodies).',
    example: 'Enzymes, antibodies, hemoglobin'
  }
];

const STANDARD_ARROWS = [
  {
    from: 'dna', to: 'dna', label: 'Replication',
    desc: 'DNA polymerase copies the entire genome before cell division. Each strand serves as a template, producing two identical double-stranded DNA molecules.',
    example: 'Every cell division in your body',
    type: 'self'
  },
  {
    from: 'dna', to: 'rna', label: 'Transcription',
    desc: 'RNA polymerase reads the DNA template strand and synthesizes a complementary mRNA. In eukaryotes, the pre-mRNA is processed (capped, polyadenylated, spliced) before export.',
    example: 'Measured by RNA-seq',
    type: 'standard'
  },
  {
    from: 'rna', to: 'protein', label: 'Translation',
    desc: 'Ribosomes decode mRNA codons into amino acids using tRNAs as adaptors. The polypeptide chain folds into a functional protein.',
    example: 'Detected by proteomics',
    type: 'standard'
  }
];

const EXCEPTION_ARROWS = [
  {
    from: 'rna', to: 'dna', label: 'Reverse Transcription',
    desc: 'Reverse transcriptase (found in retroviruses like HIV) synthesizes DNA from an RNA template. This enzyme is also used in the lab for RT-PCR and RNA-seq library preparation.',
    example: 'HIV, retrotransposons, RT-PCR',
    col: [234, 67, 53],
    type: 'exception'
  },
  {
    from: 'rna', to: 'rna', label: 'RNA Replication',
    desc: 'RNA-dependent RNA polymerase (RdRp) copies RNA from an RNA template. Found in RNA viruses like influenza, SARS-CoV-2, and hepatitis C. Bypasses DNA entirely.',
    example: 'SARS-CoV-2, influenza',
    col: [255, 152, 0],
    type: 'self-exception'
  },
  {
    from: 'protein', to: 'protein', label: 'Prion Propagation',
    desc: 'Misfolded prion proteins (PrPSc) template conformational change in normal prion proteins (PrPC). Information flows at the protein level without nucleic acids.',
    example: 'Mad cow disease, Creutzfeldt-Jakob',
    col: [171, 71, 188],
    type: 'self-exception'
  },
  {
    from: 'rna', to: 'none', label: 'Functional ncRNA',
    desc: 'Many RNA molecules are functional end products that are never translated: tRNA, rRNA, miRNA, lncRNA, snRNA. The central dogma step "RNA → Protein" is skipped.',
    example: 'miRNA gene silencing, ribosomal RNA',
    col: [0, 150, 136],
    type: 'ncrna'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  toggleBtn = createButton('Show Exceptions');
  toggleBtn.position(10, drawHeight + 7);
  toggleBtn.mousePressed(() => {
    showExceptions = !showExceptions;
    toggleBtn.html(showExceptions ? 'Standard Only' : 'Show Exceptions');
    selectedArrow = -1;
    selectedNode = -1;
  });

  describe('Central dogma diagram with standard pathways and exceptions. Click nodes or edges for details.', LABEL);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1a1a1a');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text('Central Dogma' + (showExceptions ? ' & Exceptions' : ''), canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Draw molecules
  for (let i = 0; i < NODES.length; i++) {
    let m = NODES[i];
    let mx = m.x * canvasWidth;
    let my = m.y * drawHeight;
    let isSelected = (selectedNode === i);

    fill(m.col[0], m.col[1], m.col[2], isSelected ? 80 : 40);
    stroke(isSelected ? color(0) : color(m.col[0], m.col[1], m.col[2]));
    strokeWeight(isSelected ? 3 : 2);
    circle(mx, my, m.r * 2);

    fill(m.col[0], m.col[1], m.col[2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(m.label, mx, my);
    textStyle(NORMAL);
  }

  // Draw standard arrows
  drawStandardArrows();

  // Draw exception arrows
  if (showExceptions) {
    drawExceptionArrows();
  }

  // Info panel
  drawInfoPanel();

  // Control label
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Click a node or edge for details', 150, drawHeight + 18);
}

function drawStandardArrows() {
  for (let i = 0; i < STANDARD_ARROWS.length; i++) {
    let a = STANDARD_ARROWS[i];
    let isSelected = (selectedArrow === i);

    if (a.type === 'self') {
      // DNA replication - curved arrow above DNA
      let mx = NODES[0].x * canvasWidth;
      let my = NODES[0].y * drawHeight;
      noFill();
      stroke(isSelected ? color(0) : color(76, 175, 80));
      strokeWeight(isSelected ? 3 : 2);
      arc(mx, my - 50, 50, 40, PI * 0.2, PI * 0.8);
      // Arrowhead
      let ax = mx + 22;
      let ay = my - 55;
      fill(isSelected ? color(0) : color(76, 175, 80));
      noStroke();
      triangle(ax, ay - 3, ax + 6, ay + 4, ax - 4, ay + 4);
      // Label
      textAlign(CENTER, BOTTOM);
      textSize(10);
      text(a.label, mx, my - 72);
    } else {
      // Standard straight arrows
      let fromM = NODES.find(m => m.id === a.from);
      let toM = NODES.find(m => m.id === a.to);
      let fx = fromM.x * canvasWidth + fromM.r + 5;
      let fy = fromM.y * drawHeight;
      let tx = toM.x * canvasWidth - toM.r - 5;
      let ty = toM.y * drawHeight;

      stroke(isSelected ? color(0) : color(100));
      strokeWeight(isSelected ? 3 : 2);
      line(fx, fy, tx - 8, ty);

      fill(isSelected ? color(0) : color(100));
      noStroke();
      triangle(tx, ty, tx - 10, ty - 5, tx - 10, ty + 5);

      // Label
      fill(isSelected ? color(0) : color(80));
      textAlign(CENTER, BOTTOM);
      textSize(11);
      textStyle(BOLD);
      text(a.label, (fx + tx) / 2, fy - 8);
      textStyle(NORMAL);
    }
  }
}

function drawExceptionArrows() {
  for (let i = 0; i < EXCEPTION_ARROWS.length; i++) {
    let a = EXCEPTION_ARROWS[i];
    let idx = STANDARD_ARROWS.length + i;
    let isSelected = (selectedArrow === idx);
    let col = color(a.col[0], a.col[1], a.col[2]);

    if (a.type === 'exception') {
      // RNA → DNA (reverse, below)
      let fromM = NODES.find(m => m.id === a.from);
      let toM = NODES.find(m => m.id === a.to);
      let fx = fromM.x * canvasWidth - fromM.r;
      let fy = fromM.y * drawHeight + 20;
      let tx = toM.x * canvasWidth + toM.r;
      let ty = toM.y * drawHeight + 20;

      stroke(isSelected ? color(0) : col);
      strokeWeight(isSelected ? 3 : 2);
      drawingContext.setLineDash([6, 4]);
      line(fx, fy, tx + 8, ty);
      drawingContext.setLineDash([]);

      fill(isSelected ? color(0) : col);
      noStroke();
      triangle(tx, ty, tx + 10, ty - 5, tx + 10, ty + 5);

      fill(a.col[0], a.col[1], a.col[2]);
      textAlign(CENTER, TOP);
      textSize(10);
      text(a.label, (fx + tx) / 2, fy + 5);
    } else if (a.type === 'self-exception') {
      let m = NODES.find(m => m.id === a.from);
      let mx = m.x * canvasWidth;
      let my = m.y * drawHeight;
      let arcY = a.from === 'rna' ? my + 55 : my + 55;

      noFill();
      stroke(isSelected ? color(0) : col);
      strokeWeight(isSelected ? 3 : 2);
      drawingContext.setLineDash([6, 4]);
      arc(mx, arcY, 50, 40, -PI * 0.8, -PI * 0.2);
      drawingContext.setLineDash([]);

      let ax = mx + 22;
      let ay = arcY + 5;
      fill(isSelected ? color(0) : col);
      noStroke();
      triangle(ax, ay + 3, ax + 6, ay - 4, ax - 4, ay - 4);

      fill(a.col[0], a.col[1], a.col[2]);
      textAlign(CENTER, TOP);
      textSize(10);
      text(a.label, mx, arcY + 23);
    } else if (a.type === 'ncrna') {
      // RNA → ∅ (arrow going down-right, ending with X)
      let fromM = NODES.find(m => m.id === a.from);
      let fx = fromM.x * canvasWidth + 10;
      let fy = fromM.y * drawHeight + fromM.r + 5;
      let tx = fx + 40;
      let ty = fy + 50;

      stroke(isSelected ? color(0) : col);
      strokeWeight(isSelected ? 3 : 2);
      drawingContext.setLineDash([6, 4]);
      line(fx, fy, tx, ty);
      drawingContext.setLineDash([]);

      // End mark (∅)
      noFill();
      stroke(isSelected ? color(0) : col);
      strokeWeight(2);
      circle(tx, ty, 16);
      line(tx - 5, ty + 5, tx + 5, ty - 5);

      fill(a.col[0], a.col[1], a.col[2]);
      noStroke();
      textAlign(LEFT, TOP);
      textSize(9);
      text('Functional\nncRNA', tx + 12, ty - 8);
    }
  }
}

function drawInfoPanel() {
  let panelY = drawHeight * 0.52;
  let panelH = drawHeight - panelY - 10;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(margin, panelY, canvasWidth - margin * 2, panelH, 8);

  if (selectedArrow < 0 && selectedNode < 0) {
    fill('#aaa');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text('Click a node or edge for details', canvasWidth / 2, panelY + panelH / 2);
    return;
  }

  let tx = margin + 12;
  let tw = canvasWidth - margin * 2 - 24;

  if (selectedNode >= 0) {
    // Display node info
    let m = NODES[selectedNode];
    fill(m.col[0], m.col[1], m.col[2]);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(15);
    textStyle(BOLD);
    text(m.label, tx, panelY + 10);
    textStyle(NORMAL);

    fill('#444');
    textSize(12);
    text(m.desc, tx, panelY + 32, tw, panelH - 65);

    fill(33, 150, 243, 30);
    stroke(33, 150, 243);
    strokeWeight(1);
    let badgeY = panelY + panelH - 28;
    let badgeText = 'Example: ' + m.example;
    let bw = textWidth(badgeText) + 16;
    rect(tx, badgeY, min(bw, tw), 22, 4);
    fill(33, 100, 200);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text(badgeText, tx + 8, badgeY + 11);
    return;
  }

  let allArrows = [...STANDARD_ARROWS, ...EXCEPTION_ARROWS];
  if (selectedArrow >= allArrows.length) return;
  let a = allArrows[selectedArrow];

  // Title
  let isException = selectedArrow >= STANDARD_ARROWS.length;
  if (isException) {
    let ea = EXCEPTION_ARROWS[selectedArrow - STANDARD_ARROWS.length];
    fill(ea.col[0], ea.col[1], ea.col[2]);
  } else {
    fill('#1a1a1a');
  }
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text(a.label + (isException ? ' (Exception)' : ''), tx, panelY + 10);
  textStyle(NORMAL);

  // Description
  fill('#444');
  textSize(12);
  text(a.desc, tx, panelY + 32, tw, panelH - 65);

  // Example badge
  fill(33, 150, 243, 30);
  stroke(33, 150, 243);
  strokeWeight(1);
  let badgeY = panelY + panelH - 28;
  let badgeText = 'Example: ' + a.example;
  let bw = textWidth(badgeText) + 16;
  rect(tx, badgeY, min(bw, tw), 22, 4);
  fill(33, 100, 200);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text(badgeText, tx + 8, badgeY + 11);
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0) return;

  // Check nodes first
  for (let i = 0; i < NODES.length; i++) {
    let m = NODES[i];
    let mx = m.x * canvasWidth;
    let my = m.y * drawHeight;
    if (dist(mouseX, mouseY, mx, my) < m.r) {
      selectedNode = i;
      selectedArrow = -1;
      return;
    }
  }

  // Check standard arrows
  for (let i = 0; i < STANDARD_ARROWS.length; i++) {
    if (isNearArrow(STANDARD_ARROWS[i], i)) {
      selectedArrow = i;
      selectedNode = -1;
      return;
    }
  }

  // Check exception arrows
  if (showExceptions) {
    for (let i = 0; i < EXCEPTION_ARROWS.length; i++) {
      if (isNearExceptionArrow(EXCEPTION_ARROWS[i], i)) {
        selectedArrow = STANDARD_ARROWS.length + i;
        selectedNode = -1;
        return;
      }
    }
  }
}

function isNearArrow(a, idx) {
  if (a.type === 'self') {
    let mx = NODES[0].x * canvasWidth;
    let my = NODES[0].y * drawHeight - 55;
    return dist(mouseX, mouseY, mx, my) < 35;
  }
  let fromM = NODES.find(m => m.id === a.from);
  let toM = NODES.find(m => m.id === a.to);
  let mx = ((fromM.x + toM.x) / 2) * canvasWidth;
  let my = fromM.y * drawHeight;
  return dist(mouseX, mouseY, mx, my) < 30;
}

function isNearExceptionArrow(a, idx) {
  if (a.type === 'exception') {
    let fromM = NODES.find(m => m.id === a.from);
    let toM = NODES.find(m => m.id === a.to);
    let mx = ((fromM.x + toM.x) / 2) * canvasWidth;
    let my = fromM.y * drawHeight + 20;
    return dist(mouseX, mouseY, mx, my) < 30;
  }
  if (a.type === 'self-exception') {
    let m = NODES.find(m => m.id === a.from);
    let mx = m.x * canvasWidth;
    let my = m.y * drawHeight + 55;
    return dist(mouseX, mouseY, mx, my) < 35;
  }
  if (a.type === 'ncrna') {
    let fromM = NODES.find(m => m.id === a.from);
    let fx = fromM.x * canvasWidth + 30;
    let fy = fromM.y * drawHeight + fromM.r + 30;
    return dist(mouseX, mouseY, fx, fy) < 35;
  }
  return false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
