// Node2Vec Biased Random Walk — p5.js MicroSim
// Graph with ~12 nodes. Animated walker moves step by step.
// Show candidate neighbors with probabilities labeled 1/p, 1, or 1/q.
// Sliders for p and q. Step button. Trail shows walk history.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

// Graph definition: 12 nodes with fixed positions
const graphNodes = [
    { id: 0, label: 'A', x: 0.15, y: 0.25 },
    { id: 1, label: 'B', x: 0.30, y: 0.12 },
    { id: 2, label: 'C', x: 0.45, y: 0.25 },
    { id: 3, label: 'D', x: 0.15, y: 0.50 },
    { id: 4, label: 'E', x: 0.30, y: 0.40 },
    { id: 5, label: 'F', x: 0.45, y: 0.50 },
    { id: 6, label: 'G', x: 0.60, y: 0.15 },
    { id: 7, label: 'H', x: 0.70, y: 0.35 },
    { id: 8, label: 'I', x: 0.60, y: 0.55 },
    { id: 9, label: 'J', x: 0.85, y: 0.20 },
    { id: 10, label: 'K', x: 0.85, y: 0.50 },
    { id: 11, label: 'L', x: 0.50, y: 0.70 }
];

const graphEdges = [
    [0,1],[0,3],[0,4],[1,2],[1,4],[2,4],[2,5],[2,6],
    [3,4],[3,11],[4,5],[5,8],[5,11],[6,7],[6,9],
    [7,8],[7,9],[7,10],[8,10],[8,11],[9,10]
];

// Build adjacency
let adj = {};
graphNodes.forEach(n => adj[n.id] = []);
graphEdges.forEach(([u, v]) => {
    adj[u].push(v);
    adj[v].push(u);
});

let pSlider, qSlider, stepBtn, resetBtn, autoBtn;
let walkPath = [0]; // start at node 0
let previousNode = -1;
let candidateProbs = [];
let autoPlay = false;
let autoTimer = 0;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Controls row 1
    let cy1 = drawHeight + 6;
    pSlider = createSlider(0.25, 4, 1, 0.25);
    pSlider.position(margin, cy1);
    pSlider.style('width', '80px');

    qSlider = createSlider(0.25, 4, 1, 0.25);
    qSlider.position(margin + 150, cy1);
    qSlider.style('width', '80px');

    stepBtn = createButton('Step');
    stepBtn.position(margin + 310, cy1);
    stepBtn.mousePressed(doStep);

    autoBtn = createButton('Auto');
    autoBtn.position(margin + 360, cy1);
    autoBtn.mousePressed(() => { autoPlay = !autoPlay; });

    resetBtn = createButton('Reset');
    resetBtn.position(margin + 410, cy1);
    resetBtn.mousePressed(() => {
        walkPath = [0];
        previousNode = -1;
        candidateProbs = [];
        autoPlay = false;
    });

    computeCandidates();
    textFont('Arial');
    describe('Node2Vec biased random walk visualization with adjustable p and q parameters', LABEL);
}

function doStep() {
    if (candidateProbs.length === 0) return;

    // Weighted random selection
    let totalWeight = candidateProbs.reduce((s, c) => s + c.weight, 0);
    let r = random(totalWeight);
    let cumul = 0;
    let chosen = candidateProbs[0].id;
    for (let c of candidateProbs) {
        cumul += c.weight;
        if (r <= cumul) { chosen = c.id; break; }
    }

    previousNode = walkPath[walkPath.length - 1];
    walkPath.push(chosen);
    if (walkPath.length > 20) walkPath.shift(); // keep trail manageable

    computeCandidates();
}

function computeCandidates() {
    let current = walkPath[walkPath.length - 1];
    let prev = walkPath.length >= 2 ? walkPath[walkPath.length - 2] : -1;
    let p = pSlider.value();
    let q = qSlider.value();

    candidateProbs = [];
    let neighbors = adj[current];

    for (let nb of neighbors) {
        let alpha;
        if (prev < 0) {
            alpha = 1; // first step: uniform
        } else if (nb === prev) {
            alpha = 1 / p; // return to previous
        } else if (adj[prev].includes(nb)) {
            alpha = 1; // neighbor of previous (BFS-like)
        } else {
            alpha = 1 / q; // move away (DFS-like)
        }
        candidateProbs.push({ id: nb, weight: alpha, type: nb === prev ? '1/p' : (prev >= 0 && adj[prev].includes(nb) ? '1' : '1/q') });
    }
}

function draw() {
    updateCanvasSize();
    background('aliceblue');

    // Control area
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Auto-play
    if (autoPlay) {
        autoTimer++;
        if (autoTimer % 30 === 0) doStep();
    }

    let p = pSlider.value();
    let q = qSlider.value();

    // Title
    fill('#1a1a1a');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text('Node2Vec Biased Random Walk', canvasWidth / 2, 4);
    textStyle(NORMAL);

    // Slider labels
    fill('#333');
    textAlign(LEFT, CENTER);
    textSize(10);
    text('p = ' + p.toFixed(2), margin + 84, drawHeight + 16);
    text('q = ' + q.toFixed(2), margin + 234, drawHeight + 16);

    // Parameter description
    textSize(9);
    fill('#666');
    textAlign(LEFT, TOP);
    text('p controls return (low p → backtrack).  q controls exploration (low q → DFS, high q → BFS).', margin, drawHeight + 34);

    // Graph area
    let gx = margin;
    let gy = 26;
    let gw = canvasWidth * 0.62;
    let gh = drawHeight - 36;

    // Draw edges
    stroke('#B0BEC5');
    strokeWeight(1.2);
    for (let [u, v] of graphEdges) {
        let x1 = gx + graphNodes[u].x * gw;
        let y1 = gy + graphNodes[u].y * gh;
        let x2 = gx + graphNodes[v].x * gw;
        let y2 = gy + graphNodes[v].y * gh;
        line(x1, y1, x2, y2);
    }

    // Draw walk trail
    if (walkPath.length >= 2) {
        for (let i = 0; i < walkPath.length - 1; i++) {
            let u = walkPath[i];
            let v = walkPath[i + 1];
            let alpha = map(i, 0, walkPath.length - 1, 60, 220);
            stroke(231, 76, 60, alpha);
            strokeWeight(map(i, 0, walkPath.length - 1, 1.5, 4));
            let x1 = gx + graphNodes[u].x * gw;
            let y1 = gy + graphNodes[u].y * gh;
            let x2 = gx + graphNodes[v].x * gw;
            let y2 = gy + graphNodes[v].y * gh;
            line(x1, y1, x2, y2);

            // Arrow
            if (i === walkPath.length - 2) {
                let angle = atan2(y2 - y1, x2 - x1);
                let ax = x2 - cos(angle) * 14;
                let ay = y2 - sin(angle) * 14;
                fill(231, 76, 60);
                noStroke();
                push();
                translate(ax, ay);
                rotate(angle);
                triangle(0, -4, 12, 0, 0, 4);
                pop();
            }
        }
    }

    // Draw candidate edges with probability labels
    let current = walkPath[walkPath.length - 1];
    for (let c of candidateProbs) {
        let x1 = gx + graphNodes[current].x * gw;
        let y1 = gy + graphNodes[current].y * gh;
        let x2 = gx + graphNodes[c.id].x * gw;
        let y2 = gy + graphNodes[c.id].y * gh;

        // Highlight candidate edge
        stroke(46, 204, 113, 150);
        strokeWeight(2.5);
        setLineDash([5, 4]);
        line(x1, y1, x2, y2);
        setLineDash([]);

        // Probability label at midpoint
        let mx = (x1 + x2) / 2;
        let my = (y1 + y2) / 2;
        fill(39, 174, 96);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        // Background
        let tw = textWidth(c.type) + 8;
        fill(255, 255, 255, 200);
        rect(mx - tw / 2, my - 8, tw, 16, 3);
        fill(39, 174, 96);
        text(c.type, mx, my);
        textStyle(NORMAL);
    }

    // Draw nodes
    for (let n of graphNodes) {
        let nx = gx + n.x * gw;
        let ny = gy + n.y * gh;
        let isCurrent = n.id === current;
        let isInWalk = walkPath.includes(n.id);
        let isCandidate = candidateProbs.some(c => c.id === n.id);

        let sz = isCurrent ? 30 : 22;

        if (isCurrent) {
            fill('#E74C3C');
            stroke('#C0392B');
            strokeWeight(3);
        } else if (isCandidate) {
            fill('#2ECC71');
            stroke('#27AE60');
            strokeWeight(2);
        } else if (isInWalk) {
            fill('#E67E22');
            stroke('#D35400');
            strokeWeight(2);
        } else {
            fill('#3498DB');
            stroke('#2980B9');
            strokeWeight(1.5);
        }
        circle(nx, ny, sz);

        // Label
        fill('#FFF');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(isCurrent ? 12 : 10);
        textStyle(BOLD);
        text(n.label, nx, ny);
        textStyle(NORMAL);
    }

    // Side panel: walk history and stats
    let panelX = gx + gw + 12;
    let panelW = canvasWidth - panelX - margin;
    let panelY = gy;

    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(panelX, panelY, panelW, gh, 6);

    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Walk History', panelX + 8, panelY + 8);
    textStyle(NORMAL);

    // Walk sequence
    textSize(10);
    fill('#555');
    let seq = walkPath.map(id => graphNodes[id].label).join(' → ');
    text(seq, panelX + 8, panelY + 28, panelW - 16, 80);

    // Current stats
    let sy = panelY + 120;
    textStyle(BOLD);
    fill('#E74C3C');
    textSize(11);
    text('Current: ' + graphNodes[current].label, panelX + 8, sy);
    sy += 18;

    fill('#333');
    textSize(10);
    text('Steps: ' + (walkPath.length - 1), panelX + 8, sy);
    sy += 18;
    text('p = ' + p.toFixed(2), panelX + 8, sy);
    sy += 14;
    text('q = ' + q.toFixed(2), panelX + 8, sy);
    textStyle(NORMAL);

    sy += 24;
    fill('#27AE60');
    textStyle(BOLD);
    textSize(10);
    text('Candidates:', panelX + 8, sy);
    textStyle(NORMAL);
    sy += 16;

    let totalW = candidateProbs.reduce((s, c) => s + c.weight, 0);
    fill('#555');
    textSize(9);
    for (let c of candidateProbs) {
        let prob = (c.weight / totalW * 100).toFixed(1);
        text(graphNodes[c.id].label + ': ' + c.type + ' (' + prob + '%)', panelX + 12, sy);
        sy += 14;
    }

    // Legend
    sy += 16;
    fill('#333');
    textStyle(BOLD);
    textSize(10);
    text('Legend', panelX + 8, sy);
    textStyle(NORMAL);
    sy += 16;

    let legends = [
        ['#E74C3C', 'Current node'],
        ['#2ECC71', 'Candidate'],
        ['#E67E22', 'Visited'],
        ['#3498DB', 'Unvisited']
    ];
    textSize(9);
    for (let [col, lab] of legends) {
        fill(col);
        noStroke();
        circle(panelX + 14, sy + 4, 8);
        fill('#555');
        textAlign(LEFT, CENTER);
        text(lab, panelX + 22, sy + 4);
        sy += 14;
    }

    // Explanation box at bottom of graph area
    let expY = gy + gh + 4;
    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(9);
    textStyle(NORMAL);
    text('1/p: return to previous  |  1: neighbor of previous (BFS)  |  1/q: move away (DFS)', gx, expY);
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
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
