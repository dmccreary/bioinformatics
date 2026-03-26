// Flux Balance Analysis Formulation — p5.js MicroSim
// Small metabolic network with stoichiometric matrix S displayed alongside.
// Sliders adjust exchange reaction bounds. Step through LP formulation.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;

// Network definition: 4 internal metabolites, 6 reactions
// Metabolites: A (nutrient), B, C, D (biomass precursor)
// Reactions: v1: →A (uptake), v2: A→B, v3: A→C, v4: B→D, v5: C→D, v6: D→ (biomass)
const metNames = ['A', 'B', 'C', 'D'];
const rxnNames = ['v1: →A', 'v2: A→B', 'v3: A→C', 'v4: B→D', 'v5: C→D', 'v6: D→'];
const rxnShort = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6'];

// Stoichiometric matrix S (4 metabolites × 6 reactions)
const S = [
    [ 1, -1, -1,  0,  0,  0],  // A
    [ 0,  1,  0, -1,  0,  0],  // B
    [ 0,  0,  1,  0, -1,  0],  // C
    [ 0,  0,  0,  1,  1, -1]   // D
];

// Objective: maximise v6 (biomass)
const objectiveIdx = 5;

// Node positions for network drawing (normalised 0-1)
const nodePos = {
    'A': { x: 0.15, y: 0.5 },
    'B': { x: 0.45, y: 0.25 },
    'C': { x: 0.45, y: 0.75 },
    'D': { x: 0.75, y: 0.5 }
};

// Edges for network
const netEdges = [
    { from: null, to: 'A', rxn: 0 },   // uptake
    { from: 'A', to: 'B', rxn: 1 },
    { from: 'A', to: 'C', rxn: 2 },
    { from: 'B', to: 'D', rxn: 3 },
    { from: 'C', to: 'D', rxn: 4 },
    { from: 'D', to: null, rxn: 5 }     // biomass
];

let uptakeSlider, v2LbSlider;
let stepBtn, resetBtn;
let currentStep = 0;
const totalSteps = 5;

const stepTitles = [
    'Step 1: Metabolic Network',
    'Step 2: Stoichiometric Matrix S',
    'Step 3: Steady-State Constraint (S·v = 0)',
    'Step 4: Flux Bounds',
    'Step 5: Objective → Maximise Biomass (v6)'
];

const stepDescs = [
    'A small metabolic network with 4 metabolites (A-D) and 6 reactions. Nutrient A is taken up, converted through B and C, to produce biomass precursor D.',
    'The stoichiometric matrix S encodes the network topology. Each row is a metabolite, each column a reaction. Positive = produced, negative = consumed.',
    'At steady state, metabolite concentrations do not change over time: S · v = 0. This gives one equation per metabolite constraining the flux vector v.',
    'Each flux has lower and upper bounds: lb ≤ vᵢ ≤ ub. Exchange reactions (uptake) have adjustable bounds. Internal reactions: 0 ≤ vᵢ ≤ 1000.',
    'The LP objective maximises v6 (biomass flux): max c^T · v where c = [0,0,0,0,0,1]. Subject to S·v=0 and bounds. Optimal v6 equals the uptake bound.'
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    uptakeSlider = createSlider(0, 20, 10, 1);
    uptakeSlider.position(margin, drawHeight + 6);
    uptakeSlider.style('width', '120px');

    stepBtn = createButton('Next Step');
    stepBtn.position(280, drawHeight + 6);
    stepBtn.mousePressed(() => { currentStep = (currentStep + 1) % totalSteps; });

    resetBtn = createButton('Reset');
    resetBtn.position(360, drawHeight + 6);
    resetBtn.mousePressed(() => { currentStep = 0; });

    textFont('Arial');
    describe('Flux Balance Analysis formulation walkthrough with stoichiometric matrix and LP steps', LABEL);
}

function draw() {
    updateCanvasSize();

    background('aliceblue');
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    let uptake = uptakeSlider.value();

    // Solve simple FBA analytically: max v6 s.t. S·v=0, 0≤v1≤uptake
    // Solution: v1=uptake, v2+v3=uptake, v4=v2, v5=v3, v6=v4+v5=uptake
    // Split evenly: v2=v3=uptake/2, v4=v5=uptake/2, v6=uptake
    let fluxes = [uptake, uptake / 2, uptake / 2, uptake / 2, uptake / 2, uptake];

    // Title
    fill('#1a1a1a');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text(stepTitles[currentStep], canvasWidth / 2, 6);
    textStyle(NORMAL);
    textSize(11);
    fill('#555');
    text('Step ' + (currentStep + 1) + ' of ' + totalSteps, canvasWidth / 2, 24);

    // Slider label
    fill('#333');
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Uptake bound (v1): ' + uptake, margin + 126, drawHeight + 18);

    // Draw network (always visible on left)
    let netX = margin;
    let netY = 44;
    let netW = canvasWidth * 0.4;
    let netH = 200;

    drawNetwork(netX, netY, netW, netH, fluxes);

    // Right panel depends on step
    let panelX = netX + netW + 16;
    let panelY = netY;
    let panelW = canvasWidth - panelX - margin;

    if (currentStep >= 1) {
        drawMatrix(panelX, panelY, panelW);
    }

    // Lower section
    let lowerY = netY + netH + 20;

    if (currentStep >= 2) {
        drawConstraint(margin, lowerY, canvasWidth - 2 * margin);
        lowerY += 60;
    }

    if (currentStep >= 3) {
        drawBounds(margin, lowerY, canvasWidth - 2 * margin, uptake);
        lowerY += 80;
    }

    if (currentStep >= 4) {
        drawObjective(margin, lowerY, canvasWidth - 2 * margin, fluxes);
    }

    // Description
    fill('#444');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(NORMAL);
    let descY = drawHeight - 50;
    text(stepDescs[currentStep], margin, descY, canvasWidth - 2 * margin, 46);
}

function drawNetwork(x, y, w, h, fluxes) {
    // Background
    fill(255, 255, 255, 180);
    stroke('#ccc');
    strokeWeight(1);
    rect(x, y, w, h, 6);

    // Draw edges with flux widths
    for (let e of netEdges) {
        let x1, y1, x2, y2;
        if (e.from === null) {
            x2 = x + nodePos[e.to].x * w;
            y2 = y + nodePos[e.to].y * h;
            x1 = x2 - 40;
            y1 = y2;
        } else if (e.to === null) {
            x1 = x + nodePos[e.from].x * w;
            y1 = y + nodePos[e.from].y * h;
            x2 = x1 + 40;
            y2 = y1;
        } else {
            x1 = x + nodePos[e.from].x * w;
            y1 = y + nodePos[e.from].y * h;
            x2 = x + nodePos[e.to].x * w;
            y2 = y + nodePos[e.to].y * h;
        }

        let fw = map(fluxes[e.rxn], 0, 20, 1, 6);
        stroke('#2980B9');
        strokeWeight(fw);
        line(x1, y1, x2, y2);

        // Arrow head
        let angle = atan2(y2 - y1, x2 - x1);
        let ax = x2 - cos(angle) * 14;
        let ay = y2 - sin(angle) * 14;
        fill('#2980B9');
        noStroke();
        push();
        translate(ax, ay);
        rotate(angle);
        triangle(0, -4, 14, 0, 0, 4);
        pop();

        // Flux label
        let mx = (x1 + x2) / 2;
        let my = (y1 + y2) / 2 - 8;
        fill('#E67E22');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        textStyle(BOLD);
        text(rxnShort[e.rxn] + '=' + fluxes[e.rxn].toFixed(1), mx, my);
        textStyle(NORMAL);
    }

    // Draw nodes
    for (let [name, pos] of Object.entries(nodePos)) {
        let nx = x + pos.x * w;
        let ny = y + pos.y * h;
        fill('#1ABC9C');
        stroke('#16A085');
        strokeWeight(2);
        circle(nx, ny, 28);
        fill('#FFF');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(BOLD);
        text(name, nx, ny);
        textStyle(NORMAL);
    }
}

function drawMatrix(x, y, w) {
    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Stoichiometric Matrix S', x, y);
    textStyle(NORMAL);

    let cellW = 28;
    let cellH = 20;
    let startY = y + 18;

    // Column headers
    textSize(9);
    fill('#2980B9');
    textAlign(CENTER, TOP);
    for (let j = 0; j < rxnShort.length; j++) {
        text(rxnShort[j], x + 30 + j * cellW + cellW / 2, startY);
    }
    startY += 16;

    // Rows
    for (let i = 0; i < metNames.length; i++) {
        fill('#1ABC9C');
        textAlign(RIGHT, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(metNames[i], x + 26, startY + i * cellH + cellH / 2);
        textStyle(NORMAL);

        for (let j = 0; j < S[i].length; j++) {
            let cx = x + 30 + j * cellW;
            let cy = startY + i * cellH;

            // Cell background
            if (S[i][j] > 0) fill(39, 174, 96, 40);
            else if (S[i][j] < 0) fill(231, 76, 60, 40);
            else fill(240);
            stroke('#ddd');
            strokeWeight(0.5);
            rect(cx, cy, cellW, cellH);

            // Value
            fill(S[i][j] === 0 ? '#aaa' : '#333');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(10);
            text(S[i][j] >= 0 ? ' ' + S[i][j] : S[i][j], cx + cellW / 2, cy + cellH / 2);
        }
    }
}

function drawConstraint(x, y, w) {
    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Steady-State Constraint:', x, y);
    textStyle(NORMAL);
    textSize(12);
    fill('#8E44AD');
    text('S · v = 0', x + 160, y);

    textSize(10);
    fill('#555');
    text('One equation per metabolite. No accumulation at steady state.', x, y + 18);

    // Show equations
    let eqY = y + 36;
    textSize(9);
    fill('#444');
    for (let i = 0; i < metNames.length; i++) {
        let eq = metNames[i] + ': ';
        let terms = [];
        for (let j = 0; j < S[i].length; j++) {
            if (S[i][j] !== 0) {
                let sign = S[i][j] > 0 ? '+' : '';
                terms.push(sign + S[i][j] + '·' + rxnShort[j]);
            }
        }
        eq += terms.join(' ') + ' = 0';
        text(eq, x + 10, eqY);
        eqY += 13;
    }
}

function drawBounds(x, y, w, uptake) {
    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Flux Bounds:', x, y);
    textStyle(NORMAL);

    let by = y + 18;
    textSize(10);
    for (let i = 0; i < rxnShort.length; i++) {
        let lb = 0;
        let ub = i === 0 ? uptake : 1000;
        fill(i === 0 ? '#E67E22' : '#555');
        textStyle(i === 0 ? BOLD : NORMAL);
        text(rxnShort[i] + ':  ' + lb + ' ≤ ' + rxnShort[i] + ' ≤ ' + ub +
             (i === 0 ? '  ← adjustable' : ''), x + 10, by);
        by += 14;
    }
    textStyle(NORMAL);
}

function drawObjective(x, y, w, fluxes) {
    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Objective Function:', x, y);

    textSize(12);
    fill('#C0392B');
    text('maximise  c^T · v  =  v6  (biomass flux)', x + 130, y);

    textStyle(NORMAL);
    textSize(10);
    fill('#555');
    text('c = [0, 0, 0, 0, 0, 1]', x + 10, y + 20);

    // Optimal solution
    fill('#27AE60');
    textStyle(BOLD);
    textSize(11);
    text('Optimal v6 = ' + fluxes[5].toFixed(1), x + 10, y + 38);
    textStyle(NORMAL);

    // Flux vector
    textSize(10);
    fill('#333');
    let fvStr = 'v* = [' + fluxes.map(f => f.toFixed(1)).join(', ') + ']';
    text(fvStr, x + 140, y + 38);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
