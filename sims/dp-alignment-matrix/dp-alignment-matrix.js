// Dynamic Programming Alignment Matrix (Needleman-Wunsch / Smith-Waterman)
// Interactive step-through with traceback highlighting
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 580;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let seq1Input, seq2Input;
let matchSlider, mismatchSlider, gapSlider;
let stepBtn, resetBtn, alignToggle;
let alignMode = 'Global'; // Global or Local

let seq1 = 'AGTC';
let seq2 = 'AATC';
let matchScore = 1;
let mismatchScore = -1;
let gapScore = -2;

let dpMatrix = [];
let traceMatrix = [];
let fillStep = 0; // how many cells filled so far
let totalCells = 0;
let tracePath = [];
let showTrace = false;
let alignedSeq1 = '';
let alignedSeq2 = '';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    // Row 1: sequence inputs
    seq1Input = createInput('AGTC');
    seq1Input.position(70, drawHeight + 6);
    seq1Input.size(80);
    seq1Input.input(resetAlignment);

    seq2Input = createInput('AATC');
    seq2Input.position(210, drawHeight + 6);
    seq2Input.size(80);
    seq2Input.input(resetAlignment);

    alignToggle = createSelect();
    alignToggle.position(310, drawHeight + 6);
    alignToggle.option('Global');
    alignToggle.option('Local');
    alignToggle.selected('Global');
    alignToggle.changed(resetAlignment);

    // Row 2: score sliders
    matchSlider = createSlider(-2, 5, 1, 1);
    matchSlider.position(70, drawHeight + 32);
    matchSlider.size(60);
    matchSlider.input(resetAlignment);

    mismatchSlider = createSlider(-5, 0, -1, 1);
    mismatchSlider.position(190, drawHeight + 32);
    mismatchSlider.size(60);
    mismatchSlider.input(resetAlignment);

    gapSlider = createSlider(-5, 0, -2, 1);
    gapSlider.position(310, drawHeight + 32);
    gapSlider.size(60);
    gapSlider.input(resetAlignment);

    // Row 3: buttons
    stepBtn = createButton('Step');
    stepBtn.position(10, drawHeight + 56);
    stepBtn.mousePressed(doStep);

    resetBtn = createButton('Reset');
    resetBtn.position(65, drawHeight + 56);
    resetBtn.mousePressed(resetAlignment);

    resetAlignment();
    describe('Interactive Needleman-Wunsch and Smith-Waterman alignment matrix with step-through and traceback', LABEL);
}

function resetAlignment() {
    seq1 = seq1Input.value().toUpperCase().replace(/[^ACGT]/g, '');
    seq2 = seq2Input.value().toUpperCase().replace(/[^ACGT]/g, '');
    if (seq1.length === 0) seq1 = 'A';
    if (seq2.length === 0) seq2 = 'A';

    matchScore = matchSlider.value();
    mismatchScore = mismatchSlider.value();
    gapScore = gapSlider.value();
    alignMode = alignToggle.value();

    let rows = seq2.length + 1;
    let cols = seq1.length + 1;
    totalCells = rows * cols;

    // Initialize matrices
    dpMatrix = [];
    traceMatrix = [];
    for (let i = 0; i < rows; i++) {
        dpMatrix[i] = new Array(cols).fill(null);
        traceMatrix[i] = new Array(cols).fill(null);
    }

    // Fill first row and column
    dpMatrix[0][0] = 0;
    traceMatrix[0][0] = 'done';
    for (let j = 1; j < cols; j++) {
        dpMatrix[0][j] = alignMode === 'Global' ? gapScore * j : 0;
        traceMatrix[0][j] = alignMode === 'Global' ? 'left' : 'done';
    }
    for (let i = 1; i < rows; i++) {
        dpMatrix[i][0] = alignMode === 'Global' ? gapScore * i : 0;
        traceMatrix[i][0] = alignMode === 'Global' ? 'up' : 'done';
    }

    fillStep = cols + rows - 1; // first row + first col already filled
    tracePath = [];
    showTrace = false;
    alignedSeq1 = '';
    alignedSeq2 = '';
}

function doStep() {
    let rows = seq2.length + 1;
    let cols = seq1.length + 1;

    // Find next unfilled cell (row by row)
    let filled = false;
    for (let i = 1; i < rows && !filled; i++) {
        for (let j = 1; j < cols && !filled; j++) {
            if (dpMatrix[i][j] === null) {
                fillCell(i, j);
                fillStep++;
                filled = true;
            }
        }
    }

    // If all filled, compute traceback
    if (!filled && !showTrace) {
        computeTraceback();
        showTrace = true;
    }
}

function fillCell(i, j) {
    let s = (seq1[j - 1] === seq2[i - 1]) ? matchScore : mismatchScore;
    let diag = dpMatrix[i - 1][j - 1] + s;
    let up = dpMatrix[i - 1][j] + gapScore;
    let left = dpMatrix[i][j - 1] + gapScore;

    let best;
    if (alignMode === 'Local') {
        best = max(0, diag, up, left);
        if (best === 0) {
            dpMatrix[i][j] = 0;
            traceMatrix[i][j] = 'done';
            return;
        }
    } else {
        best = max(diag, up, left);
    }

    dpMatrix[i][j] = best;
    if (best === diag) traceMatrix[i][j] = 'diag';
    else if (best === up) traceMatrix[i][j] = 'up';
    else traceMatrix[i][j] = 'left';
}

function computeTraceback() {
    tracePath = [];
    let i, j;
    let rows = seq2.length + 1;
    let cols = seq1.length + 1;

    if (alignMode === 'Global') {
        i = rows - 1;
        j = cols - 1;
    } else {
        // Find max cell for local
        let maxVal = -Infinity;
        i = 0; j = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (dpMatrix[r][c] !== null && dpMatrix[r][c] > maxVal) {
                    maxVal = dpMatrix[r][c];
                    i = r; j = c;
                }
            }
        }
    }

    alignedSeq1 = '';
    alignedSeq2 = '';

    while (i > 0 || j > 0) {
        tracePath.push([i, j]);
        let dir = traceMatrix[i][j];
        if (dir === 'done' || dir === null) break;
        if (dir === 'diag') {
            alignedSeq1 = seq1[j - 1] + alignedSeq1;
            alignedSeq2 = seq2[i - 1] + alignedSeq2;
            i--; j--;
        } else if (dir === 'up') {
            alignedSeq1 = '-' + alignedSeq1;
            alignedSeq2 = seq2[i - 1] + alignedSeq2;
            i--;
        } else {
            alignedSeq1 = seq1[j - 1] + alignedSeq1;
            alignedSeq2 = '-' + alignedSeq2;
            j--;
        }
    }
    tracePath.push([i, j]);
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
    textSize(16);
    textStyle(BOLD);
    text(alignMode + ' Alignment (DP Matrix)', canvasWidth / 2, 6);
    textStyle(NORMAL);

    let rows = seq2.length + 1;
    let cols = seq1.length + 1;

    // Calculate cell size
    let matrixW = canvasWidth - margin * 2 - 40;
    let matrixH = drawHeight - 120;
    let cellW = min(45, matrixW / (cols + 1));
    let cellH = min(35, matrixH / (rows + 1));
    let startX = margin + 40;
    let startY = 50;

    // Tracepath set for quick lookup
    let traceSet = new Set();
    if (showTrace) {
        for (let p of tracePath) traceSet.add(p[0] + ',' + p[1]);
    }

    // Draw column headers (seq1)
    fill('#4A90D9');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(min(14, cellW * 0.5));
    textStyle(BOLD);
    text('-', startX + cellW * 0.5, startY - 12);
    for (let j = 0; j < seq1.length; j++) {
        text(seq1[j], startX + (j + 1.5) * cellW, startY - 12);
    }

    // Draw row headers (seq2)
    text('-', startX - 16, startY + cellH * 0.5);
    for (let i = 0; i < seq2.length; i++) {
        text(seq2[i], startX - 16, startY + (i + 1.5) * cellH);
    }
    textStyle(NORMAL);

    // Draw matrix cells
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cx = startX + j * cellW;
            let cy = startY + i * cellH;
            let val = dpMatrix[i][j];
            let isTrace = traceSet.has(i + ',' + j);

            // Cell background
            if (isTrace) {
                fill(255, 255, 150);
            } else if (val !== null) {
                fill(255);
            } else {
                fill(240);
            }
            stroke(200);
            strokeWeight(1);
            rect(cx, cy, cellW, cellH);

            // Cell value
            if (val !== null) {
                fill(isTrace ? '#1a1a1a' : '#555');
                noStroke();
                textAlign(CENTER, CENTER);
                textSize(min(12, cellW * 0.35));
                textStyle(isTrace ? BOLD : NORMAL);
                text(val, cx + cellW / 2, cy + cellH / 2);
                textStyle(NORMAL);
            }

            // Trace arrow indicator
            if (isTrace && showTrace && traceMatrix[i][j] && traceMatrix[i][j] !== 'done') {
                drawArrow(cx, cy, cellW, cellH, traceMatrix[i][j]);
            }
        }
    }

    // Alignment result
    if (showTrace) {
        let resultY = startY + rows * cellH + 15;

        fill('#1a1a1a');
        noStroke();
        textAlign(LEFT, TOP);
        textSize(13);
        textStyle(BOLD);
        text('Alignment Result:', margin, resultY);
        textStyle(NORMAL);

        // Draw aligned sequences with coloring
        let aY = resultY + 22;
        textSize(min(16, canvasWidth / (alignedSeq1.length + 5)));

        let charW = min(20, (canvasWidth - margin * 2 - 60) / max(alignedSeq1.length, 1));
        let aX = margin + 50;

        fill('#555');
        textSize(11);
        textAlign(RIGHT, CENTER);
        text('Seq 1:', aX - 5, aY + 8);
        text('Match:', aX - 5, aY + 26);
        text('Seq 2:', aX - 5, aY + 44);

        textAlign(CENTER, CENTER);
        textSize(min(14, charW * 0.7));
        textStyle(BOLD);
        for (let k = 0; k < alignedSeq1.length; k++) {
            let c1 = alignedSeq1[k];
            let c2 = alignedSeq2[k];
            let isMatch = c1 === c2 && c1 !== '-';
            let isMismatch = c1 !== c2 && c1 !== '-' && c2 !== '-';

            // Seq1
            fill(c1 === '-' ? '#ccc' : (isMatch ? '#27AE60' : (isMismatch ? '#E74C3C' : '#555')));
            text(c1, aX + k * charW, aY + 8);

            // Match indicator
            fill(isMatch ? '#27AE60' : '#ddd');
            text(isMatch ? '|' : (isMismatch ? 'x' : ' '), aX + k * charW, aY + 26);

            // Seq2
            fill(c2 === '-' ? '#ccc' : (isMatch ? '#27AE60' : (isMismatch ? '#E74C3C' : '#555')));
            text(c2, aX + k * charW, aY + 44);
        }
        textStyle(NORMAL);

        // Score
        let finalI = alignMode === 'Global' ? rows - 1 : tracePath[0][0];
        let finalJ = alignMode === 'Global' ? cols - 1 : tracePath[0][1];
        fill('#1a1a1a');
        textAlign(LEFT, TOP);
        textSize(12);
        textStyle(BOLD);
        text('Score: ' + dpMatrix[finalI][finalJ], margin, aY + 62);
        textStyle(NORMAL);
    }

    // Control labels
    fill('#555');
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(10);
    text('Seq 1:', 65, drawHeight + 16);
    text('Seq 2:', 205, drawHeight + 16);
    text('Match:' + matchSlider.value(), 65, drawHeight + 42);
    text('Mismatch:' + mismatchSlider.value(), 185, drawHeight + 42);
    text('Gap:' + gapSlider.value(), 305, drawHeight + 42);
}

function drawArrow(cx, cy, cw, ch, dir) {
    fill(200, 100, 0, 150);
    noStroke();
    let mx = cx + cw * 0.2;
    let my = cy + ch * 0.2;
    let sz = min(cw, ch) * 0.15;

    if (dir === 'diag') {
        triangle(mx, my, mx + sz, my, mx, my + sz);
    } else if (dir === 'up') {
        triangle(mx, my, mx - sz * 0.5, my + sz, mx + sz * 0.5, my + sz);
    } else if (dir === 'left') {
        triangle(mx, my, mx + sz, my - sz * 0.5, mx + sz, my + sz * 0.5);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
