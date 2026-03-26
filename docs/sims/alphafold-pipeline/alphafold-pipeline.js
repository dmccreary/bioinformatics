// AlphaFold Prediction Pipeline - Animated Flowchart
// Step through stages: Sequence → MSA → Evoformer → Structure Module → 3D Model → Refinement → Final
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let stepBtn, resetBtn, playBtn;
let currentStage = -1;
let playing = false;
let lastStepTime = 0;

const stages = [
    {
        label: 'Amino Acid\nSequence',
        color: '#4A90D9',
        icon: 'seq',
        desc: 'The input protein sequence in FASTA format. AlphaFold takes the primary amino acid sequence as its starting point — typically 50 to 2500 residues long.'
    },
    {
        label: 'Multiple Sequence\nAlignment (MSA)',
        color: '#27AE60',
        icon: 'msa',
        desc: 'Homologous sequences are found using JackHMMER and HHblits. The MSA captures evolutionary covariation — residues that mutate together often interact in 3D space.'
    },
    {
        label: 'Evoformer\nNetwork',
        color: '#E67E22',
        icon: 'evo',
        desc: 'The Evoformer is a deep transformer that processes MSA and pair representations through 48 blocks. It learns residue-residue relationships and refines evolutionary signals into structural features.'
    },
    {
        label: 'Structure\nModule',
        color: '#8E44AD',
        icon: 'struct',
        desc: 'The Structure Module converts abstract representations into 3D coordinates. It uses an Invariant Point Attention (IPA) mechanism to predict backbone frames for each residue.'
    },
    {
        label: '3D Model\nGeneration',
        color: '#D35400',
        icon: '3d',
        desc: 'Initial 3D coordinates are generated for all atoms. The model predicts both backbone (N, Cα, C, O) and side-chain atom positions, producing a full atomic model.'
    },
    {
        label: 'Amber\nRefinement',
        color: '#C0392B',
        icon: 'refine',
        desc: 'The predicted structure is refined using the Amber molecular dynamics force field. This relaxes steric clashes and improves local geometry (bond lengths, angles, dihedrals).'
    },
    {
        label: 'Final Structure\n+ pLDDT',
        color: '#2C3E50',
        icon: 'final',
        desc: 'The final structure includes per-residue confidence scores (pLDDT, 0–100). Scores >90 indicate high confidence; 70–90 are good; <50 suggest disordered regions.'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    stepBtn = createButton('Next Step');
    stepBtn.position(10, drawHeight + 12);
    stepBtn.mousePressed(() => {
        if (currentStage < stages.length - 1) currentStage++;
    });

    playBtn = createButton('Play');
    playBtn.position(100, drawHeight + 12);
    playBtn.mousePressed(() => {
        playing = !playing;
        playBtn.html(playing ? 'Pause' : 'Play');
    });

    resetBtn = createButton('Reset');
    resetBtn.position(165, drawHeight + 12);
    resetBtn.mousePressed(() => {
        currentStage = -1;
        playing = false;
        playBtn.html('Play');
    });

    describe('AlphaFold prediction pipeline animated flowchart with step-through stages', LABEL);
}

function draw() {
    updateCanvasSize();

    // Auto-advance
    if (playing && millis() - lastStepTime > 1200) {
        if (currentStage < stages.length - 1) {
            currentStage++;
            lastStepTime = millis();
        } else {
            playing = false;
            playBtn.html('Play');
        }
    }

    // Background
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
    text('AlphaFold Prediction Pipeline', canvasWidth / 2, 6);
    textStyle(NORMAL);

    let boxW = 130;
    let boxH = 44;
    let startY = 36;
    let spacingY = 52;
    let flowX = canvasWidth * 0.3;

    // Draw stages
    for (let i = 0; i < stages.length; i++) {
        let s = stages[i];
        let bx = flowX - boxW / 2;
        let by = startY + i * spacingY;
        let active = i <= currentStage;
        let isCurrent = i === currentStage;

        // Arrow from previous
        if (i > 0) {
            let arrowY = by - spacingY + boxH;
            let midY = by;
            stroke(active ? s.color : '#ccc');
            strokeWeight(active ? 2.5 : 1.5);
            line(flowX, arrowY, flowX, midY - 4);
            // Arrowhead
            fill(active ? s.color : '#ccc');
            noStroke();
            triangle(flowX - 5, midY - 6, flowX + 5, midY - 6, flowX, midY);
        }

        // Box
        if (isCurrent) {
            // Glow effect
            noStroke();
            fill(red(color(s.color)), green(color(s.color)), blue(color(s.color)), 40);
            rect(bx - 4, by - 4, boxW + 8, boxH + 8, 10);
        }

        fill(active ? s.color : '#ddd');
        stroke(active ? color(red(color(s.color)) * 0.7, green(color(s.color)) * 0.7, blue(color(s.color)) * 0.7) : '#bbb');
        strokeWeight(isCurrent ? 3 : 1.5);
        rect(bx, by, boxW, boxH, 8);

        // Label
        fill(active ? 255 : '#999');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        textStyle(BOLD);
        text(s.label, flowX, by + boxH / 2);
        textStyle(NORMAL);

        // Step number
        fill(active ? 'rgba(255,255,255,0.7)' : '#bbb');
        textSize(9);
        textAlign(LEFT, TOP);
        text((i + 1), bx + 5, by + 4);
    }

    // Info panel
    let infoX = canvasWidth * 0.58;
    let infoW = canvasWidth * 0.38;
    let infoY = 50;
    let infoH = drawHeight - 80;

    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(infoX, infoY, infoW, infoH, 8);

    if (currentStage >= 0) {
        let s = stages[currentStage];
        fill(s.color);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(13);
        textStyle(BOLD);
        let titleText = s.label.replace('\n', ' ');
        text(titleText, infoX + 10, infoY + 12);
        textStyle(NORMAL);

        fill('#333');
        textSize(11);
        textAlign(LEFT, TOP);
        drawWrappedText(s.desc, infoX + 10, infoY + 35, infoW - 20, 15);

        // Draw stage icon
        drawStageIcon(s.icon, infoX + infoW / 2, infoY + infoH - 80, s.color);
    } else {
        fill('#888');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(13);
        text('Click "Next Step" to\nwalk through the\nAlphaFold pipeline', infoX + infoW / 2, infoY + infoH / 2);
    }

    // Stage counter
    fill('#666');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Stage: ' + (currentStage + 1) + ' / ' + stages.length, 250, drawHeight + 22);
}

function drawWrappedText(txt, x, y, maxW, lineH) {
    let words = txt.split(' ');
    let line = '';
    let cy = y;
    for (let w of words) {
        let test = line + w + ' ';
        if (textWidth(test) > maxW && line.length > 0) {
            text(line.trim(), x, cy);
            line = w + ' ';
            cy += lineH;
        } else {
            line = test;
        }
    }
    if (line.trim().length > 0) text(line.trim(), x, cy);
}

function drawStageIcon(icon, cx, cy, col) {
    push();
    translate(cx, cy);

    if (icon === 'seq') {
        // Sequence letters
        fill(col);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(14);
        textStyle(BOLD);
        let seq = 'MKWVTF';
        for (let i = 0; i < seq.length; i++) {
            let x = (i - 2.5) * 16;
            fill(255);
            stroke(col);
            strokeWeight(1.5);
            rect(x - 8, -10, 15, 20, 3);
            fill(col);
            noStroke();
            text(seq[i], x, 0);
        }
    } else if (icon === 'msa') {
        // Multiple rows of sequences
        textSize(8);
        textStyle(BOLD);
        let rows = ['MKWVTF', 'MKWATF', 'MKYVTF', 'Mkwvtf'];
        for (let r = 0; r < rows.length; r++) {
            for (let c = 0; c < rows[r].length; c++) {
                let x = (c - 2.5) * 12;
                let y = (r - 1.5) * 14;
                let match = rows[r][c] === rows[0][c];
                fill(match ? col : '#E74C3C');
                noStroke();
                textAlign(CENTER, CENTER);
                text(rows[r][c], x, y);
            }
        }
    } else if (icon === 'evo') {
        // Neural network layers
        for (let layer = 0; layer < 3; layer++) {
            let lx = (layer - 1) * 35;
            let nNodes = layer === 1 ? 4 : 3;
            for (let n = 0; n < nNodes; n++) {
                let ny = (n - (nNodes - 1) / 2) * 16;
                fill(col);
                noStroke();
                circle(lx, ny, 8);
                // connections to next layer
                if (layer < 2) {
                    let nextN = layer === 0 ? 4 : 3;
                    for (let nn = 0; nn < nextN; nn++) {
                        let nny = (nn - (nextN - 1) / 2) * 16;
                        stroke(col + '66');
                        strokeWeight(0.5);
                        line(lx + 4, ny, lx + 35 - 4, nny);
                    }
                }
            }
        }
    } else if (icon === 'struct') {
        // Backbone trace
        noFill();
        stroke(col);
        strokeWeight(2);
        beginShape();
        vertex(-30, 10);
        vertex(-15, -15);
        vertex(0, 5);
        vertex(15, -10);
        vertex(30, 15);
        endShape();
        // Residue dots
        fill(col);
        noStroke();
        circle(-30, 10, 6);
        circle(-15, -15, 6);
        circle(0, 5, 6);
        circle(15, -10, 6);
        circle(30, 15, 6);
    } else if (icon === '3d') {
        // Simple 3D shape suggestion
        noFill();
        stroke(col);
        strokeWeight(2);
        // Helix suggestion
        for (let i = 0; i < 20; i++) {
            let t = i / 20 * TWO_PI * 2;
            let x = cos(t) * 25;
            let y = i * 2 - 20;
            let sz = map(cos(t), -1, 1, 2, 6);
            fill(col);
            noStroke();
            circle(x, y, sz);
        }
    } else if (icon === 'refine') {
        // Energy minimization arrows
        stroke(col);
        strokeWeight(1.5);
        noFill();
        for (let i = 0; i < 5; i++) {
            let a = (i / 5) * TWO_PI;
            let ox = cos(a) * 20;
            let oy = sin(a) * 15;
            line(ox * 1.3, oy * 1.3, ox * 0.7, oy * 0.7);
            // arrowhead toward center
            fill(col);
            let ax = ox * 0.7;
            let ay = oy * 0.7;
            circle(ax, ay, 4);
            noFill();
        }
    } else if (icon === 'final') {
        // Confidence-colored structure
        let colors = ['#0053D6', '#65CBF3', '#FFDB13', '#FF7D45'];
        let labels = ['>90', '70-90', '50-70', '<50'];
        for (let i = 0; i < 4; i++) {
            fill(colors[i]);
            noStroke();
            rect(-35 + i * 20, -8, 16, 16, 3);
            fill('#555');
            textSize(7);
            textAlign(CENTER, TOP);
            text(labels[i], -35 + i * 20 + 8, 12);
        }
    }

    textStyle(NORMAL);
    pop();
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
