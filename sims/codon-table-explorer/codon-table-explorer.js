// Codon Table Explorer - Translate mRNA to amino acids
// Bloom Level: Apply (L3) - Use the codon table to translate sequences
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 390;
let controlHeight = 65;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 14;

let inputField;
let translateBtn;
let randomBtn;
let showFramesCheckbox;

let mrnSequence = '';
let codons = [];
let aminoAcids = [];
let hoveredCodon = -1;
let showFrames = false;

// Standard genetic code
const CODON_TABLE = {
  'UUU':'F','UUC':'F','UUA':'L','UUG':'L','CUU':'L','CUC':'L','CUA':'L','CUG':'L',
  'AUU':'I','AUC':'I','AUA':'I','AUG':'M','GUU':'V','GUC':'V','GUA':'V','GUG':'V',
  'UCU':'S','UCC':'S','UCA':'S','UCG':'S','CCU':'P','CCC':'P','CCA':'P','CCG':'P',
  'ACU':'T','ACC':'T','ACA':'T','ACG':'T','GCU':'A','GCC':'A','GCA':'A','GCG':'A',
  'UAU':'Y','UAC':'Y','UAA':'*','UAG':'*','CAU':'H','CAC':'H','CAA':'Q','CAG':'Q',
  'AAU':'N','AAC':'N','AAA':'K','AAG':'K','GAU':'D','GAC':'D','GAA':'E','GAG':'E',
  'UGU':'C','UGC':'C','UGA':'*','UGG':'W','CGU':'R','CGC':'R','CGA':'R','CGG':'R',
  'AGU':'S','AGC':'S','AGA':'R','AGG':'R','GGU':'G','GGC':'G','GGA':'G','GGG':'G'
};

// Amino acid properties for coloring
const AA_PROPS = {
  'F':'hydrophobic','L':'hydrophobic','I':'hydrophobic','M':'hydrophobic','V':'hydrophobic',
  'P':'special','A':'hydrophobic','W':'hydrophobic','G':'special',
  'S':'polar','T':'polar','C':'special','Y':'polar','N':'polar','Q':'polar',
  'D':'negative','E':'negative','K':'positive','R':'positive','H':'positive',
  '*':'stop'
};

const PROP_COLORS = {
  'hydrophobic': [66, 133, 244],
  'polar': [52, 168, 83],
  'positive': [234, 67, 53],
  'negative': [251, 188, 4],
  'special': [171, 71, 188],
  'stop': [120, 120, 120]
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  inputField = createInput('AUGGCUAAAGAUUUUUGA');
  inputField.position(10, drawHeight + 7);
  inputField.size(280);
  inputField.attribute('placeholder', 'Enter mRNA (A,U,G,C)');

  translateBtn = createButton('Translate');
  translateBtn.position(300, drawHeight + 7);
  translateBtn.mousePressed(doTranslate);

  randomBtn = createButton('Random');
  randomBtn.position(375, drawHeight + 7);
  randomBtn.mousePressed(generateRandom);

  showFramesCheckbox = createCheckbox('Show Reading Frames', false);
  showFramesCheckbox.position(10, drawHeight + 37);
  showFramesCheckbox.changed(() => { showFrames = showFramesCheckbox.checked(); });

  doTranslate();

  describe('Codon table explorer: type an mRNA sequence and translate it to amino acids', LABEL);
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
  text('Codon Table Explorer', canvasWidth / 2, 8);
  textStyle(NORMAL);

  y = 38;

  // Draw mRNA sequence with codon grouping
  if (mrnSequence.length > 0) {
    drawSequenceRow('mRNA:', mrnSequence, y);
    y += 55;
    drawCodonGrouping(y);
    y += 55;
    drawAminoAcidChain(y);
    y += 70;
  }

  // Color legend
  drawLegend(y);

  if (showFrames && mrnSequence.length >= 3) {
    drawReadingFrames(y + 50);
  }

  // Hover detection for codons
  detectHover();
}

function drawSequenceRow(label, seq, y) {
  fill('#555');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text(label, margin, y);
  textStyle(NORMAL);

  let startX = margin + 50;
  let charW = min(18, (canvasWidth - startX - margin) / max(seq.length, 1));

  for (let i = 0; i < seq.length; i++) {
    let base = seq[i];
    let cx = startX + i * charW;

    // Color by base
    if (base === 'A') fill(76, 175, 80);
    else if (base === 'U') fill(244, 67, 54);
    else if (base === 'G') fill(255, 193, 7);
    else if (base === 'C') fill(33, 150, 243);
    else fill(150);

    noStroke();
    rect(cx, y + 15, charW - 1, 22, 3);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(base, cx + charW / 2 - 0.5, y + 26);
    textStyle(NORMAL);
  }
}

function drawCodonGrouping(y) {
  fill('#555');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Codons:', margin, y);
  textStyle(NORMAL);

  let startX = margin + 50;
  let codonW = min(54, (canvasWidth - startX - margin) / max(codons.length, 1));

  for (let i = 0; i < codons.length; i++) {
    let cx = startX + i * codonW;
    let isHovered = (i === hoveredCodon);
    let aa = aminoAcids[i];
    let prop = AA_PROPS[aa] || 'special';
    let col = PROP_COLORS[prop];

    // Background
    fill(col[0], col[1], col[2], isHovered ? 80 : 30);
    stroke(col[0], col[1], col[2]);
    strokeWeight(isHovered ? 2 : 1);
    rect(cx, y + 15, codonW - 3, 28, 4);

    // Codon text
    fill('#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(codons[i], cx + codonW / 2 - 1.5, y + 29);
    textStyle(NORMAL);
  }
}

function drawAminoAcidChain(y) {
  fill('#555');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Protein:', margin, y);
  textStyle(NORMAL);

  let startX = margin + 50;
  let aaW = min(54, (canvasWidth - startX - margin) / max(aminoAcids.length, 1));

  for (let i = 0; i < aminoAcids.length; i++) {
    let cx = startX + i * aaW;
    let aa = aminoAcids[i];
    let prop = AA_PROPS[aa] || 'special';
    let col = PROP_COLORS[prop];
    let isHovered = (i === hoveredCodon);

    // Circle
    fill(col[0], col[1], col[2], isHovered ? 220 : 160);
    noStroke();
    let circR = min(aaW - 6, 36);
    circle(cx + aaW / 2 - 1.5, y + 28, circR);

    // AA letter
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(aa === '*' ? 'STOP' : aa, cx + aaW / 2 - 1.5, y + 28);
    textStyle(NORMAL);

    // Connection line
    if (i > 0 && aa !== '*' && aminoAcids[i - 1] !== '*') {
      stroke(180);
      strokeWeight(2);
      line(cx - 3, y + 28, cx + aaW / 2 - 1.5 - circR / 2, y + 28);
    }
  }
}

function drawLegend(y) {
  let labels = ['Hydrophobic', 'Polar', 'Positive', 'Negative', 'Special', 'Stop'];
  let keys = ['hydrophobic', 'polar', 'positive', 'negative', 'special', 'stop'];
  let lx = margin;

  fill('#555');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);

  for (let i = 0; i < labels.length; i++) {
    let col = PROP_COLORS[keys[i]];
    fill(col[0], col[1], col[2]);
    noStroke();
    circle(lx + 6, y + 8, 12);
    fill('#333');
    textAlign(LEFT, CENTER);
    text(labels[i], lx + 15, y + 8);
    lx += textWidth(labels[i]) + 28;
  }
}

function drawReadingFrames(y) {
  fill('#555');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Reading Frames:', margin, y);
  textStyle(NORMAL);

  for (let frame = 0; frame < 3; frame++) {
    let fy = y + 20 + frame * 30;
    fill('#777');
    textSize(11);
    textAlign(LEFT, CENTER);
    noStroke();
    text('Frame +' + (frame + 1) + ':', margin, fy + 10);

    let startX = margin + 70;
    let seq = mrnSequence.substring(frame);
    let frameCodons = [];
    for (let i = 0; i + 2 < seq.length; i += 3) {
      frameCodons.push(seq.substring(i, i + 3));
    }

    let cw = min(40, (canvasWidth - startX - margin) / max(frameCodons.length, 1));
    for (let j = 0; j < frameCodons.length; j++) {
      let aa = CODON_TABLE[frameCodons[j]] || '?';
      let isStart = (frameCodons[j] === 'AUG');
      let isStop = (aa === '*');

      if (isStart) fill(76, 175, 80, 50);
      else if (isStop) fill(244, 67, 54, 50);
      else fill(240);

      stroke(isStart ? color(76, 175, 80) : isStop ? color(244, 67, 54) : color(200));
      strokeWeight(1);
      rect(startX + j * cw, fy, cw - 2, 22, 3);

      fill(isStart ? color(0, 100, 0) : isStop ? color(180, 0, 0) : color(80));
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(10);
      text(aa, startX + j * cw + cw / 2 - 1, fy + 11);
    }
  }
}

function doTranslate() {
  let raw = inputField.value().toUpperCase().replace(/T/g, 'U').replace(/[^AUGC]/g, '');
  inputField.value(raw); // show cleaned sequence as feedback
  mrnSequence = raw;

  codons = [];
  aminoAcids = [];
  for (let i = 0; i + 2 < mrnSequence.length; i += 3) {
    let codon = mrnSequence.substring(i, i + 3);
    codons.push(codon);
    let aa = CODON_TABLE[codon] || '?';
    aminoAcids.push(aa);
    if (aa === '*') break; // stop at stop codon
  }
}

function generateRandom() {
  let bases = 'AUGC';
  let seq = 'AUG'; // start with start codon
  let len = floor(random(5, 9)) * 3; // multiple of 3
  for (let i = 3; i < len - 3; i++) {
    seq += bases[floor(random(4))];
  }
  // Add a stop codon
  let stops = ['UAA', 'UAG', 'UGA'];
  seq += stops[floor(random(3))];

  inputField.value(seq);
  doTranslate();
}

function detectHover() {
  hoveredCodon = -1;
  if (codons.length === 0) return;
  let startX = margin + 50;
  let codonW = min(54, (canvasWidth - startX - margin) / max(codons.length, 1));

  for (let i = 0; i < codons.length; i++) {
    let cx = startX + i * codonW;
    if (mouseX >= cx && mouseX <= cx + codonW - 3 && mouseY >= 80 && mouseY <= 250) {
      hoveredCodon = i;
      break;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  inputField.size(min(200, canvasWidth - 200));
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
