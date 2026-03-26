// Mutation Types Explorer - See how mutations affect protein sequence
// Bloom Level: Analyze (L4) - Differentiate between mutation types
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 65;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let mutTypeSelect;
let posSlider;
let applyBtn, resetBtn;

// Reference sequence (18 nt = 6 codons)
const REF_DNA = 'ATGCGTAAAGATTTTGCA';
let mutDNA = '';
let mutApplied = false;
let mutType = 'SNP - Missense';
let mutPos = 3; // 0-indexed position

// Codon table (DNA codons)
const DNA_CODON = {
  'TTT':'F','TTC':'F','TTA':'L','TTG':'L','CTT':'L','CTC':'L','CTA':'L','CTG':'L',
  'ATT':'I','ATC':'I','ATA':'I','ATG':'M','GTT':'V','GTC':'V','GTA':'V','GTG':'V',
  'TCT':'S','TCC':'S','TCA':'S','TCG':'S','CCT':'P','CCC':'P','CCA':'P','CCG':'P',
  'ACT':'T','ACC':'T','ACA':'T','ACG':'T','GCT':'A','GCC':'A','GCA':'A','GCG':'A',
  'TAT':'Y','TAC':'Y','TAA':'*','TAG':'*','CAT':'H','CAC':'H','CAA':'Q','CAG':'Q',
  'AAT':'N','AAC':'N','AAA':'K','AAG':'K','GAT':'D','GAC':'D','GAA':'E','GAG':'E',
  'TGT':'C','TGC':'C','TGA':'*','TGG':'W','CGT':'R','CGC':'R','CGA':'R','CGG':'R',
  'AGT':'S','AGC':'S','AGA':'R','AGG':'R','GGT':'G','GGC':'G','GGA':'G','GGG':'G'
};

const BASE_COLORS = { 'A': [76,175,80], 'T': [244,67,54], 'G': [255,193,7], 'C': [33,150,243] };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  mutTypeSelect = createSelect();
  mutTypeSelect.position(10, drawHeight + 7);
  mutTypeSelect.option('SNP - Synonymous');
  mutTypeSelect.option('SNP - Missense');
  mutTypeSelect.option('SNP - Nonsense');
  mutTypeSelect.option('1-bp Insertion');
  mutTypeSelect.option('1-bp Deletion');
  mutTypeSelect.option('3-bp Deletion');
  mutTypeSelect.selected('SNP - Missense');

  applyBtn = createButton('Apply Mutation');
  applyBtn.position(180, drawHeight + 7);
  applyBtn.mousePressed(applyMutation);

  resetBtn = createButton('Reset');
  resetBtn.position(290, drawHeight + 7);
  resetBtn.mousePressed(doReset);

  posSlider = createSlider(0, REF_DNA.length - 1, 3, 1);
  posSlider.position(120, drawHeight + 37);
  posSlider.size(canvasWidth - 140 - margin);

  doReset();
  describe('Mutation types explorer: apply SNPs, insertions, and deletions to a DNA sequence and see the effect on protein', LABEL);
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
  text('Mutation Types Explorer', canvasWidth / 2, 8);
  textStyle(NORMAL);

  mutType = mutTypeSelect.value();
  mutPos = posSlider.value();

  let y = 35;

  // Reference DNA
  drawSequenceLabel('Reference DNA:', y);
  drawDNARow(REF_DNA, y + 18, -1, -1);
  y += 52;

  // Reference codons + AA
  drawSequenceLabel('Ref Codons → AA:', y);
  drawCodonRow(REF_DNA, y + 18, []);
  y += 58;

  if (mutApplied) {
    // Mutation indicator
    fill(234, 67, 53);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('▼ ' + mutType + ' at position ' + (mutPos + 1), margin, y);
    textStyle(NORMAL);
    y += 20;

    // Mutant DNA
    drawSequenceLabel('Mutant DNA:', y);
    let changedPositions = getChangedPositions();
    drawDNARow(mutDNA, y + 18, mutPos, changedPositions.length);
    y += 52;

    // Mutant codons + AA
    drawSequenceLabel('Mut Codons → AA:', y);
    let refAAs = translateDNA(REF_DNA);
    let mutAAs = translateDNA(mutDNA);
    let changedAAs = findChangedAAs(refAAs, mutAAs);
    drawCodonRow(mutDNA, y + 18, changedAAs);
    y += 58;

    // Diff summary
    drawDiffSummary(refAAs, mutAAs, y);
  } else {
    fill('#888');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Select a mutation type and position, then click "Apply Mutation"', canvasWidth / 2, y + 50);

    // Position indicator
    drawPositionIndicator(35 + 18, mutPos);
  }

  // Slider label
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Position: ' + (mutPos + 1), 10, drawHeight + 47);
}

function drawSequenceLabel(label, y) {
  fill('#555');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text(label, margin, y);
  textStyle(NORMAL);
}

function drawDNARow(seq, y, highlightStart, highlightLen) {
  let startX = margin;
  let charW = min(28, (canvasWidth - margin * 2) / max(seq.length, 1));

  for (let i = 0; i < seq.length; i++) {
    let base = seq[i];
    let col = BASE_COLORS[base] || [150, 150, 150];
    let isChanged = (highlightStart >= 0) && (i >= highlightStart && i < highlightStart + highlightLen);

    fill(col[0], col[1], col[2], isChanged ? 255 : 150);
    if (isChanged) {
      stroke(234, 67, 53);
      strokeWeight(2);
    } else {
      noStroke();
    }
    rect(startX + i * charW, y, charW - 1, 24, 3);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(base, startX + i * charW + charW / 2, y + 12);
    textStyle(NORMAL);

    // Position numbers
    if (i % 3 === 0) {
      fill('#aaa');
      textSize(8);
      text(i + 1, startX + i * charW + charW / 2, y - 7);
    }
  }
}

function drawPositionIndicator(y, pos) {
  let startX = margin;
  let charW = min(28, (canvasWidth - margin * 2) / max(REF_DNA.length, 1));
  let px = startX + pos * charW + charW / 2;

  stroke(234, 67, 53);
  strokeWeight(2);
  fill(234, 67, 53, 50);
  rect(startX + pos * charW - 1, y, charW + 1, 24, 3);

  fill(234, 67, 53);
  noStroke();
  triangle(px - 4, y - 2, px + 4, y - 2, px, y - 8);
}

function drawCodonRow(seq, y, changedAAs) {
  let startX = margin;
  let charW = min(28, (canvasWidth - margin * 2) / max(seq.length, 1));

  // Draw codon brackets
  for (let i = 0; i + 2 < seq.length; i += 3) {
    let codonIdx = i / 3;
    let cx = startX + i * charW;
    let cw = charW * 3;
    let codon = seq.substring(i, i + 3);
    let aa = DNA_CODON[codon] || '?';
    let isChanged = changedAAs.includes(codonIdx);

    // Codon bracket
    fill(isChanged ? color(234, 67, 53, 30) : color(230, 230, 230, 100));
    stroke(isChanged ? color(234, 67, 53) : color(180));
    strokeWeight(1);
    rect(cx, y, cw - 2, 22, 3);

    // Codon text
    fill(isChanged ? color(200, 0, 0) : color(80));
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(codon, cx + cw / 2 - 1, y + 7);

    // Amino acid
    let aaColor = aa === '*' ? color(120) : isChanged ? color(234, 67, 53) : color(66, 133, 244);
    fill(aaColor);
    textSize(13);
    textStyle(BOLD);
    text(aa === '*' ? 'STOP' : aa, cx + cw / 2 - 1, y + 28);
    textStyle(NORMAL);
  }
}

function drawDiffSummary(refAAs, mutAAs, y) {
  let panelX = margin;
  let panelW = canvasWidth - margin * 2;

  fill(255, 255, 255, 200);
  stroke(200);
  strokeWeight(1);
  rect(panelX, y, panelW, drawHeight - y - 5, 8);

  fill('#1a1a1a');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Effect Analysis:', panelX + 10, y + 8);
  textStyle(NORMAL);

  let ty = y + 28;
  textSize(12);

  // Ref protein
  fill('#555');
  text('Reference: ' + refAAs.join(' - '), panelX + 10, ty);
  ty += 20;
  text('Mutant:      ' + mutAAs.join(' - '), panelX + 10, ty);
  ty += 25;

  // Classification
  let classification = classifyMutation(refAAs, mutAAs);
  fill(classification.color);
  textStyle(BOLD);
  textSize(13);
  text('Classification: ' + classification.name, panelX + 10, ty);
  textStyle(NORMAL);
  ty += 20;
  fill('#555');
  textSize(11);
  text(classification.explanation, panelX + 10, ty, panelW - 20, 50);
}

function applyMutation() {
  let seq = REF_DNA.split('');
  let pos = mutPos;

  if (mutType === 'SNP - Missense') {
    let original = seq[pos];
    let alternatives = ['A','T','G','C'].filter(b => b !== original);
    // Pick one that changes the amino acid
    for (let alt of alternatives) {
      let test = [...seq]; test[pos] = alt;
      let origCodon = REF_DNA.substring(Math.floor(pos/3)*3, Math.floor(pos/3)*3+3);
      let newCodon = test.slice(Math.floor(pos/3)*3, Math.floor(pos/3)*3+3).join('');
      if (DNA_CODON[newCodon] !== DNA_CODON[origCodon] && DNA_CODON[newCodon] !== '*') {
        seq[pos] = alt;
        break;
      }
    }
    mutDNA = seq.join('');
  } else if (mutType === 'SNP - Synonymous') {
    let codonStart = Math.floor(pos/3)*3;
    let origCodon = REF_DNA.substring(codonStart, codonStart+3);
    let origAA = DNA_CODON[origCodon];
    // Find a different codon for the same AA
    let found = false;
    for (let b of ['A','T','G','C']) {
      if (b === seq[pos]) continue;
      let test = [...seq]; test[pos] = b;
      let newCodon = test.slice(codonStart, codonStart+3).join('');
      if (DNA_CODON[newCodon] === origAA) {
        seq[pos] = b;
        found = true;
        break;
      }
    }
    if (!found) seq[pos] = seq[pos]; // no change possible at this position
    mutDNA = seq.join('');
  } else if (mutType === 'SNP - Nonsense') {
    // Introduce a stop codon
    let codonStart = Math.floor(pos/3)*3;
    let stopCodons = ['TAA','TAG','TGA'];
    let stop = stopCodons[Math.floor(Math.random()*3)];
    seq[codonStart] = stop[0];
    seq[codonStart+1] = stop[1];
    seq[codonStart+2] = stop[2];
    mutDNA = seq.join('');
  } else if (mutType === '1-bp Insertion') {
    let bases = ['A','T','G','C'];
    let ins = bases[Math.floor(Math.random()*4)];
    mutDNA = REF_DNA.substring(0, pos) + ins + REF_DNA.substring(pos);
  } else if (mutType === '1-bp Deletion') {
    mutDNA = REF_DNA.substring(0, pos) + REF_DNA.substring(pos + 1);
  } else if (mutType === '3-bp Deletion') {
    mutDNA = REF_DNA.substring(0, pos) + REF_DNA.substring(pos + 3);
  }

  mutApplied = true;
}

function doReset() {
  mutDNA = REF_DNA;
  mutApplied = false;
}

function translateDNA(seq) {
  let aas = [];
  for (let i = 0; i + 2 < seq.length; i += 3) {
    let codon = seq.substring(i, i + 3);
    let aa = DNA_CODON[codon] || '?';
    aas.push(aa);
    if (aa === '*') break;
  }
  return aas;
}

function getChangedPositions() {
  let changed = [];
  let minLen = min(REF_DNA.length, mutDNA.length);
  for (let i = 0; i < minLen; i++) {
    if (REF_DNA[i] !== mutDNA[i]) changed.push(i);
  }
  return changed;
}

function findChangedAAs(refAAs, mutAAs) {
  let changed = [];
  let maxLen = max(refAAs.length, mutAAs.length);
  for (let i = 0; i < maxLen; i++) {
    if (i >= refAAs.length || i >= mutAAs.length || refAAs[i] !== mutAAs[i]) {
      changed.push(i);
    }
  }
  return changed;
}

function classifyMutation(refAAs, mutAAs) {
  if (mutType.startsWith('1-bp')) {
    // Frameshift
    return {
      name: 'Frameshift Mutation',
      color: color(234, 67, 54),
      explanation: 'The insertion or deletion shifts the reading frame, changing all downstream codons and amino acids. This typically produces a nonfunctional protein.'
    };
  }
  if (mutType === '3-bp Deletion') {
    return {
      name: 'In-Frame Deletion',
      color: color(255, 152, 0),
      explanation: 'Exactly one codon is removed, deleting one amino acid without shifting the reading frame. The rest of the protein is unchanged.'
    };
  }
  // SNPs
  let refStr = refAAs.join('');
  let mutStr = mutAAs.join('');
  if (refStr === mutStr) {
    return {
      name: 'Synonymous (Silent)',
      color: color(76, 175, 80),
      explanation: 'The nucleotide change does not alter the amino acid sequence due to codon degeneracy. The protein is identical.'
    };
  }
  if (mutAAs.includes('*') && mutAAs.indexOf('*') < refAAs.indexOf('*')) {
    return {
      name: 'Nonsense Mutation',
      color: color(234, 67, 54),
      explanation: 'A premature stop codon truncates the protein. The resulting shorter protein is usually nonfunctional.'
    };
  }
  return {
    name: 'Missense Mutation',
    color: color(255, 152, 0),
    explanation: 'One amino acid is replaced by a different one. The effect depends on whether the substitution is conservative (similar properties) or radical (different properties).'
  };
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  posSlider.size(canvasWidth - 140 - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
