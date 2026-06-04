// Central Dogma Information Flow - Step-Through
// Bloom Level: Understand (L2) - Explain the flow DNA → RNA → Protein
// Step-through with Next/Previous buttons
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 35;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let currentStep = 0;
let prevBtn, nextBtn;
let flowNodes = []; // cached node positions for click detection

const STEPS = [
  {
    title: "DNA in the Nucleus",
    desc: "The process begins with double-stranded DNA stored in the nucleus. A specific gene region contains the instructions for making a protein. The promoter sequence upstream signals where transcription should begin.",
    dataType: "Genome databases (FASTA, GenBank)",
    highlight: "dna"
  },
  {
    title: "Transcription Begins",
    desc: "RNA polymerase binds to the promoter and unwinds the double helix. It reads the template strand 3'→5' and synthesizes a complementary mRNA strand 5'→3'. In eukaryotes, this occurs inside the nucleus.",
    dataType: "Measured by RNA-seq",
    highlight: "transcription"
  },
  {
    title: "mRNA Processing",
    desc: "In eukaryotes, the primary transcript (pre-mRNA) is processed: a 5' cap is added, a poly-A tail is attached at the 3' end, and introns are spliced out. The mature mRNA is then exported through nuclear pores to the cytoplasm.",
    dataType: "Splice variants in GFF3/GTF",
    highlight: "processing"
  },
  {
    title: "Translation at the Ribosome",
    desc: "Ribosomes bind the mRNA and read it codon by codon (5'→3'). Transfer RNAs (tRNAs) deliver amino acids matching each codon's anticodon. Peptide bonds link the amino acids into a growing polypeptide chain.",
    dataType: "Proteomics (mass spectrometry)",
    highlight: "translation"
  },
  {
    title: "Folded Protein",
    desc: "The completed polypeptide folds into its three-dimensional structure, guided by its amino acid sequence. Chaperone proteins may assist. The functional protein carries out its biological role — as an enzyme, structural component, or signaling molecule.",
    dataType: "Structure in PDB format",
    highlight: "protein"
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  prevBtn = createButton('← Previous');
  prevBtn.position(10, drawHeight + 7);
  prevBtn.mousePressed(() => { if (currentStep > 0) currentStep--; });

  nextBtn = createButton('Next →');
  nextBtn.position(110, drawHeight + 7);
  nextBtn.mousePressed(() => { if (currentStep < STEPS.length - 1) currentStep++; });

  describe('Step-through diagram of the central dogma: DNA to RNA to Protein', LABEL);
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
  textSize(20);
  textStyle(BOLD);
  text('Central Dogma: Information Flow', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Step indicator
  fill('#888');
  textSize(12);
  text('Step ' + (currentStep + 1) + ' of ' + STEPS.length, canvasWidth / 2, 32);

  // Draw the flow diagram
  drawFlowDiagram();

  // Draw info panel
  drawInfoPanel();

  // Control area label
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Step ' + (currentStep + 1) + '/' + STEPS.length + ': ' + STEPS[currentStep].title, 210, drawHeight + 18);
}

function drawFlowDiagram() {
  let step = STEPS[currentStep];
  let nodeW = canvasWidth * 0.13;
  let nodeH = 45;
  let y = 65;
  let spacing = (canvasWidth - margin * 2 - nodeW * 5) / 4;

  let nodes = [
    { label: 'DNA', x: margin, col: [76, 175, 80], step: 0 },
    { label: 'Transcription', x: margin + nodeW + spacing, col: [255, 152, 0], step: 1 },
    { label: 'mRNA', x: margin + (nodeW + spacing) * 2, col: [33, 150, 243], step: 2 },
    { label: 'Translation', x: margin + (nodeW + spacing) * 3, col: [255, 87, 34], step: 3 },
    { label: 'Protein', x: margin + (nodeW + spacing) * 4, col: [156, 39, 176], step: 4 }
  ];

  // Cache geometry for click/hover detection
  flowNodes = nodes.map(n => ({ x: n.x, y: y, w: nodeW, h: nodeH, step: n.step }));

  // Draw arrows
  for (let i = 0; i < nodes.length - 1; i++) {
    let fromX = nodes[i].x + nodeW;
    let toX = nodes[i + 1].x;
    let ay = y + nodeH / 2;

    let active = (currentStep >= i + 1);
    stroke(active ? 80 : 200);
    strokeWeight(active ? 3 : 1);
    line(fromX + 2, ay, toX - 8, ay);
    // Arrowhead
    fill(active ? 80 : 200);
    noStroke();
    triangle(toX - 2, ay, toX - 10, ay - 5, toX - 10, ay + 5);
  }

  // Draw nodes
  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];
    let active = (currentStep >= n.step);
    let current = (currentStep === n.step);

    fill(n.col[0], n.col[1], n.col[2], active ? (current ? 200 : 120) : 30);
    stroke(n.col[0], n.col[1], n.col[2]);
    strokeWeight(current ? 3 : 1);
    rect(n.x, y, nodeW, nodeH, 8);

    fill(active ? 255 : 180);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(n.label, n.x + nodeW / 2, y + nodeH / 2);
    textStyle(NORMAL);
  }

  // Draw stage visual below the flow
  drawStageVisual(currentStep, 130);
}

function drawStageVisual(step, y) {
  let cx = canvasWidth / 2;
  let visW = canvasWidth * 0.7;
  let visH = 120;
  let left = cx - visW / 2;

  if (step === 0) {
    // DNA double helix
    stroke(76, 175, 80);
    strokeWeight(3);
    noFill();
    for (let t = 0; t < visW; t += 2) {
      let y1 = y + visH / 2 + sin(t * 0.06) * 30;
      let y2 = y + visH / 2 - sin(t * 0.06) * 30;
      point(left + t, y1);
      point(left + t, y2);
    }
    // Base pair rungs
    stroke(76, 175, 80, 80);
    strokeWeight(1);
    for (let t = 10; t < visW; t += 25) {
      let y1 = y + visH / 2 + sin(t * 0.06) * 30;
      let y2 = y + visH / 2 - sin(t * 0.06) * 30;
      line(left + t, y1, left + t, y2);
    }
    // Label
    noStroke();
    fill(0, 100, 0);
    textAlign(CENTER, TOP);
    textSize(11);
    text('Promoter', left + 30, y + visH / 2 + 35);
    stroke(0, 100, 0);
    strokeWeight(2);
    line(left + 10, y + visH / 2 + 33, left + 50, y + visH / 2 + 33);
  } else if (step === 1) {
    // Transcription bubble
    // Template strand
    stroke(76, 175, 80);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let t = 0; t < visW; t += 2) {
      let yy = y + visH * 0.3;
      if (t > visW * 0.3 && t < visW * 0.7) yy += 15;
      vertex(left + t, yy);
    }
    endShape();
    // New mRNA
    stroke(33, 150, 243);
    beginShape();
    for (let t = visW * 0.35; t < visW * 0.65; t += 2) {
      vertex(left + t, y + visH * 0.55);
    }
    endShape();
    // RNA pol
    fill(255, 152, 0);
    noStroke();
    ellipse(left + visW * 0.65, y + visH * 0.45, 30, 25);
    fill(255);
    textSize(8);
    textAlign(CENTER, CENTER);
    text('RNAP', left + visW * 0.65, y + visH * 0.45);
    // Direction arrow
    fill(255, 152, 0);
    noStroke();
    triangle(left + visW * 0.68, y + visH * 0.45, left + visW * 0.72, y + visH * 0.42, left + visW * 0.72, y + visH * 0.48);
  } else if (step === 2) {
    // mRNA with cap and tail
    stroke(33, 150, 243);
    strokeWeight(3);
    noFill();
    line(left + 40, y + visH / 2, left + visW - 40, y + visH / 2);
    // 5' cap
    fill(255, 193, 7);
    noStroke();
    circle(left + 40, y + visH / 2, 20);
    fill(0);
    textSize(8);
    textAlign(CENTER, CENTER);
    text("5'cap", left + 40, y + visH / 2);
    // Poly-A tail
    fill(234, 67, 53);
    noStroke();
    for (let i = 0; i < 5; i++) {
      circle(left + visW - 40 + i * 10, y + visH / 2, 8);
    }
    noStroke();
    fill(0);
    textSize(9);
    text("AAAAA", left + visW - 20, y + visH / 2 + 15);
    // Exons
    fill(33, 150, 243, 100);
    noStroke();
    rect(left + 60, y + visH / 2 - 10, 80, 20, 4);
    rect(left + 180, y + visH / 2 - 10, 60, 20, 4);
    rect(left + 280, y + visH / 2 - 10, 70, 20, 4);
    fill(33, 100, 200);
    textSize(9);
    textAlign(CENTER, CENTER);
    text('Exon 1', left + 100, y + visH / 2);
    text('Exon 2', left + 210, y + visH / 2);
    text('Exon 3', left + 315, y + visH / 2);
  } else if (step === 3) {
    // Ribosome on mRNA
    stroke(33, 150, 243);
    strokeWeight(2);
    line(left + 20, y + visH * 0.6, left + visW - 20, y + visH * 0.6);
    // Ribosome
    fill(255, 87, 34, 150);
    noStroke();
    ellipse(cx, y + visH * 0.5, 60, 40);
    ellipse(cx, y + visH * 0.7, 70, 35);
    fill(255);
    textSize(9);
    textAlign(CENTER, CENTER);
    text('Small', cx, y + visH * 0.5);
    text('Large', cx, y + visH * 0.7);
    // tRNA
    fill(52, 168, 83, 150);
    noStroke();
    let tRNAx = cx + 15;
    beginShape();
    vertex(tRNAx, y + visH * 0.35);
    vertex(tRNAx - 10, y + visH * 0.45);
    vertex(tRNAx + 10, y + visH * 0.45);
    endShape(CLOSE);
    fill(0);
    textSize(8);
    text('tRNA', tRNAx, y + visH * 0.3);
    // Growing peptide
    for (let i = 0; i < 4; i++) {
      fill(156, 39, 176, 150 + i * 25);
      noStroke();
      circle(cx - 50 + i * 18, y + visH * 0.3, 14);
    }
  } else if (step === 4) {
    // Folded protein
    fill(156, 39, 176, 80);
    stroke(156, 39, 176);
    strokeWeight(2);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.2) {
      let r = 45 + sin(a * 3) * 12 + cos(a * 5) * 8;
      vertex(cx + cos(a) * r, y + visH / 2 + sin(a) * r * 0.8);
    }
    endShape(CLOSE);
    // Internal structure hints
    noFill();
    stroke(156, 39, 176, 100);
    strokeWeight(1);
    for (let i = 0; i < 3; i++) {
      let ax = cx + random(-20, 20);
      let ay = y + visH / 2 + random(-15, 15);
      arc(ax, ay, 20, 15, random(TWO_PI), random(TWO_PI));
    }
    fill(100, 0, 100);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Functional\nProtein', cx, y + visH / 2);
  }
}

function drawInfoPanel() {
  let step = STEPS[currentStep];
  let panelY = 270;
  let panelH = drawHeight - panelY - 10;

  fill(255, 255, 255, 220);
  stroke(200);
  strokeWeight(1);
  rect(margin, panelY, canvasWidth - margin * 2, panelH, 8);

  let tx = margin + 12;
  let tw = canvasWidth - margin * 2 - 24;

  fill('#1a1a1a');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  textStyle(BOLD);
  text(step.title, tx, panelY + 10);
  textStyle(NORMAL);

  fill('#444');
  textSize(12);
  text(step.desc, tx, panelY + 32, tw, panelH - 60);

  // Data type badge
  fill(33, 150, 243, 30);
  stroke(33, 150, 243);
  strokeWeight(1);
  let badgeY = panelY + panelH - 28;
  let badgeW = textWidth('Data: ' + step.dataType) + 16;
  rect(tx, badgeY, badgeW, 22, 4);
  fill(33, 100, 200);
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Data: ' + step.dataType, tx + 8, badgeY + 11);
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

function mousePressed() {
  for (let n of flowNodes) {
    if (mouseX >= n.x && mouseX <= n.x + n.w && mouseY >= n.y && mouseY <= n.y + n.h) {
      currentStep = n.step;
      return;
    }
  }
}

function mouseMoved() {
  let overNode = false;
  for (let n of flowNodes) {
    if (mouseX >= n.x && mouseX <= n.x + n.w && mouseY >= n.y && mouseY <= n.y + n.h) {
      overNode = true;
      break;
    }
  }
  cursor(overNode ? HAND : ARROW);
}
