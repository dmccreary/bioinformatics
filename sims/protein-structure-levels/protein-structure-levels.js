// Protein Structure Hierarchy - Interactive Four-Level Display
// Bloom Level: Remember (L1) - Identify and describe
// Click any panel to expand and see details
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 35;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 14;

// Panel data
let panels = [];
let expandedPanel = -1; // -1 = none expanded
let resetButton;

const LEVELS = [
  {
    name: "Primary",
    short: "Linear amino acid sequence",
    color: [76, 175, 80],      // green
    dataFormat: "FASTA",
    forces: "Peptide bonds (covalent)",
    description: "The primary structure is the linear sequence of amino acids in a polypeptide chain, written from N-terminus to C-terminus. Each amino acid is linked to the next by a peptide bond. The sequence is encoded by the gene and determines all higher levels of structure.",
    aminoAcids: ["M","A","V","L","I","K","D","E","F","W","Y","P"]
  },
  {
    name: "Secondary",
    short: "Alpha helices & beta sheets",
    color: [33, 150, 243],     // blue
    dataFormat: "DSSP / PDB",
    forces: "Backbone hydrogen bonds",
    description: "Secondary structure refers to local folding patterns stabilized by hydrogen bonds between backbone NH and C=O groups. The two main types are the alpha helix (a right-handed coil) and the beta sheet (parallel or antiparallel strands connected by H-bonds).",
    elements: ["α-helix", "β-sheet"]
  },
  {
    name: "Tertiary",
    short: "3D fold of one chain",
    color: [255, 152, 0],      // orange
    dataFormat: "PDB / mmCIF",
    forces: "Hydrophobic interactions, disulfide bonds, ionic bonds, van der Waals",
    description: "Tertiary structure is the overall three-dimensional shape of a single polypeptide chain. It is stabilized by interactions between amino acid side chains (R groups), including hydrophobic packing in the protein core, disulfide bridges between cysteine residues, salt bridges, and van der Waals contacts."
  },
  {
    name: "Quaternary",
    short: "Multi-subunit complex",
    color: [156, 39, 176],     // purple
    dataFormat: "PDB (biological assembly)",
    forces: "Same as tertiary + subunit interfaces",
    description: "Quaternary structure describes the arrangement of two or more polypeptide subunits into a functional protein complex. Hemoglobin (α₂β₂ tetramer) is a classic example. Not all proteins have quaternary structure — only those composed of multiple chains."
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  resetButton = createButton('Show All');
  resetButton.position(10, drawHeight + 7);
  resetButton.mousePressed(() => { expandedPanel = -1; });

  describe('Interactive display of four protein structure levels: primary, secondary, tertiary, quaternary. Click to expand.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#1a1a1a');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  textStyle(BOLD);
  text('Protein Structure Hierarchy', canvasWidth / 2, 10);
  textStyle(NORMAL);

  if (expandedPanel === -1) {
    drawAllPanels();
  } else {
    drawExpandedPanel(expandedPanel);
  }

  // Control label
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text(expandedPanel === -1 ? 'Click a panel to expand' : 'Click "Show All" to return', 90, drawHeight + 18);
}

function drawAllPanels() {
  let panelW = (canvasWidth - margin * 5) / 4;
  let panelH = drawHeight - 80;
  let topY = 45;

  for (let i = 0; i < 4; i++) {
    let px = margin + i * (panelW + margin);
    let py = topY;
    let lvl = LEVELS[i];

    // Panel background
    fill(lvl.color[0], lvl.color[1], lvl.color[2], 30);
    stroke(lvl.color[0], lvl.color[1], lvl.color[2]);
    strokeWeight(2);
    rect(px, py, panelW, panelH, 8);

    // Level label
    fill(lvl.color[0], lvl.color[1], lvl.color[2]);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(16);
    textStyle(BOLD);
    text(lvl.name, px + panelW / 2, py + 10);
    textStyle(NORMAL);

    // Visual
    push();
    drawLevelVisual(i, px, py + 35, panelW, panelH - 80);
    pop();

    // Short description
    fill('#333');
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text(lvl.short, px + panelW / 2, py + panelH - 10);
  }
}

function drawLevelVisual(level, px, py, pw, ph) {
  let cx = px + pw / 2;
  let cy = py + ph / 2;

  if (level === 0) {
    // Primary: chain of colored circles
    let acids = LEVELS[0].aminoAcids;
    let rows = 3;
    let cols = 4;
    let spacing = min(pw / (cols + 1), ph / (rows + 1));
    let startX = px + (pw - (cols - 1) * spacing) / 2;
    let startY = py + (ph - (rows - 1) * spacing) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let idx = r * cols + c;
        if (idx >= acids.length) break;
        let ax = startX + c * spacing;
        let ay = startY + r * spacing;

        // Connection line
        if (idx > 0) {
          let prevX = startX + ((idx - 1) % cols) * spacing;
          let prevY = startY + Math.floor((idx - 1) / cols) * spacing;
          stroke(150);
          strokeWeight(2);
          line(prevX, prevY, ax, ay);
        }

        fill(76, 175, 80, 180);
        noStroke();
        circle(ax, ay, spacing * 0.6);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(acids[idx], ax, ay);
        textStyle(NORMAL);
      }
    }
  } else if (level === 1) {
    // Secondary: helix + sheet
    // Alpha helix
    noFill();
    stroke(33, 150, 243);
    strokeWeight(3);
    let helixX = px + pw * 0.3;
    beginShape();
    for (let t = 0; t < ph * 0.7; t += 2) {
      let hx = helixX + sin(t * 0.15) * pw * 0.15;
      vertex(hx, py + 15 + t);
    }
    endShape();

    // H-bond dashes on helix
    stroke(33, 150, 243, 100);
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    for (let t = 20; t < ph * 0.6; t += 30) {
      let hx1 = helixX + sin(t * 0.15) * pw * 0.15;
      let hx2 = helixX + sin((t + 15) * 0.15) * pw * 0.15;
      line(hx1, py + 15 + t, hx2, py + 30 + t);
    }
    drawingContext.setLineDash([]);

    // Beta sheet arrows
    let sheetX = px + pw * 0.7;
    for (let s = 0; s < 3; s++) {
      let sx = sheetX + (s - 1) * 15;
      stroke(33, 150, 243);
      strokeWeight(2);
      line(sx, py + 20, sx, py + ph * 0.65);
      // Arrow
      fill(33, 150, 243);
      triangle(sx - 5, py + ph * 0.65, sx + 5, py + ph * 0.65, sx, py + ph * 0.7);
    }

    // Labels
    noStroke();
    fill(33, 100, 200);
    textAlign(CENTER, TOP);
    textSize(10);
    text('α-helix', helixX, py + ph * 0.78);
    text('β-sheet', sheetX, py + ph * 0.78);
  } else if (level === 2) {
    // Tertiary: compact blob shape
    fill(255, 152, 0, 60);
    stroke(255, 152, 0);
    strokeWeight(2);

    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.3) {
      let r = min(pw, ph) * 0.3 + sin(a * 3) * 15 + cos(a * 5) * 10;
      vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    endShape(CLOSE);

    // Hydrophobic core
    fill(255, 152, 0, 40);
    noStroke();
    ellipse(cx, cy, min(pw, ph) * 0.25, min(pw, ph) * 0.2);
    textSize(9);
    fill(180, 100, 0);
    textAlign(CENTER, CENTER);
    text('hydrophobic\ncore', cx, cy);

    // S-S bridge
    stroke(255, 100, 0);
    strokeWeight(2);
    drawingContext.setLineDash([4, 4]);
    line(cx - 30, cy - 25, cx + 20, cy + 30);
    drawingContext.setLineDash([]);
    noStroke();
    fill(200, 80, 0);
    textSize(8);
    text('S-S', cx - 5, cy + 5);
  } else {
    // Quaternary: multiple subunits
    let subunitR = min(pw, ph) * 0.22;
    let offsets = [
      [-subunitR * 0.6, -subunitR * 0.5],
      [subunitR * 0.6, -subunitR * 0.5],
      [-subunitR * 0.6, subunitR * 0.5],
      [subunitR * 0.6, subunitR * 0.5]
    ];
    let labels = ['α₁', 'β₁', 'α₂', 'β₂'];
    let cols = [[200, 50, 200], [120, 50, 200], [200, 50, 200], [120, 50, 200]];

    for (let i = 0; i < 4; i++) {
      fill(cols[i][0], cols[i][1], cols[i][2], 60);
      stroke(cols[i][0], cols[i][1], cols[i][2]);
      strokeWeight(2);
      ellipse(cx + offsets[i][0], cy + offsets[i][1], subunitR, subunitR * 0.9);

      fill(cols[i][0], cols[i][1], cols[i][2]);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(labels[i], cx + offsets[i][0], cy + offsets[i][1]);
      textStyle(NORMAL);
    }
  }
}

function drawExpandedPanel(idx) {
  let lvl = LEVELS[idx];
  let px = margin;
  let py = 45;
  let pw = canvasWidth - margin * 2;
  let ph = drawHeight - 60;

  // Background
  fill(lvl.color[0], lvl.color[1], lvl.color[2], 20);
  stroke(lvl.color[0], lvl.color[1], lvl.color[2]);
  strokeWeight(2);
  rect(px, py, pw, ph, 8);

  // Visual on left third
  push();
  drawLevelVisual(idx, px + 10, py + 30, pw * 0.3, ph - 60);
  pop();

  // Text on right two-thirds
  let textX = px + pw * 0.38;
  let textW = pw * 0.58;

  fill(lvl.color[0], lvl.color[1], lvl.color[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(20);
  textStyle(BOLD);
  text(lvl.name + ' Structure', textX, py + 15);
  textStyle(NORMAL);

  fill('#333');
  textSize(13);
  let ty = py + 45;
  text(lvl.description, textX, ty, textW, ph * 0.45);

  ty += 120;
  textSize(14);
  textStyle(BOLD);
  fill(lvl.color[0], lvl.color[1], lvl.color[2]);
  text('Stabilizing Forces:', textX, ty);
  textStyle(NORMAL);
  fill('#333');
  textSize(13);
  text(lvl.forces, textX, ty + 20, textW, 40);

  ty += 65;
  textStyle(BOLD);
  fill(lvl.color[0], lvl.color[1], lvl.color[2]);
  textSize(14);
  text('Bioinformatics Format:', textX, ty);
  textStyle(NORMAL);
  fill('#333');
  textSize(13);
  text(lvl.dataFormat, textX, ty + 20);
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0) return;

  if (expandedPanel !== -1) {
    return; // use button to go back
  }

  // Detect panel click
  let panelW = (canvasWidth - margin * 5) / 4;
  for (let i = 0; i < 4; i++) {
    let px = margin + i * (panelW + margin);
    if (mouseX >= px && mouseX <= px + panelW && mouseY >= 45 && mouseY <= drawHeight - 35) {
      expandedPanel = i;
      break;
    }
  }
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
