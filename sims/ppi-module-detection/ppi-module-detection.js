// PPI Module Detection
// Network with ~20 nodes, dropdown for algorithm selection
// MCODE, MCL, Clique Percolation highlight different module groupings
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let algoSelect, resetBtn;
let selectedAlgo = 'MCODE';
let hoveredNode = -1;

// PPI Network: 20 nodes
const nodes = [
    { id: 0, name: 'TP53',   x: 0.40, y: 0.30 },
    { id: 1, name: 'MDM2',   x: 0.30, y: 0.20 },
    { id: 2, name: 'BRCA1',  x: 0.50, y: 0.18 },
    { id: 3, name: 'ATM',    x: 0.22, y: 0.32 },
    { id: 4, name: 'CHEK2',  x: 0.35, y: 0.42 },
    { id: 5, name: 'RB1',    x: 0.48, y: 0.45 },
    { id: 6, name: 'CDK2',   x: 0.62, y: 0.30 },
    { id: 7, name: 'CCND1',  x: 0.72, y: 0.38 },
    { id: 8, name: 'E2F1',   x: 0.58, y: 0.50 },
    { id: 9, name: 'MYC',    x: 0.42, y: 0.58 },
    { id: 10, name: 'AKT1',  x: 0.18, y: 0.52 },
    { id: 11, name: 'PTEN',  x: 0.12, y: 0.65 },
    { id: 12, name: 'PIK3CA',x: 0.25, y: 0.68 },
    { id: 13, name: 'EGFR',  x: 0.35, y: 0.78 },
    { id: 14, name: 'ERBB2', x: 0.50, y: 0.75 },
    { id: 15, name: 'SRC',   x: 0.62, y: 0.68 },
    { id: 16, name: 'RAF1',  x: 0.75, y: 0.58 },
    { id: 17, name: 'BRAF',  x: 0.82, y: 0.48 },
    { id: 18, name: 'MAP2K1',x: 0.85, y: 0.65 },
    { id: 19, name: 'ERK2',  x: 0.75, y: 0.75 }
];

const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],
    [1,3],[1,4],
    [2,3],[2,6],
    [3,4],[3,10],
    [4,5],[4,10],
    [5,6],[5,8],[5,9],
    [6,7],[6,8],
    [7,8],[7,17],
    [8,9],
    [9,14],
    [10,11],[10,12],
    [11,12],
    [12,13],
    [13,14],[13,15],
    [14,15],
    [15,16],[15,19],
    [16,17],[16,18],
    [17,18],
    [18,19]
];

// Module assignments per algorithm
const moduleColors = ['#1565C0', '#C62828', '#2E7D32', '#E65100', '#6A1B9A'];

const modules = {
    'MCODE': {
        desc: 'MCODE finds densely connected regions by vertex weighting and local neighborhood search. It starts from the highest-weight node and expands outward while density remains above a threshold.',
        assignments: [0,0,0,0,0,0,1,1,1,0, 2,2,2,3,3,3,4,4,4,4]
    },
    'MCL': {
        desc: 'Markov Clustering (MCL) simulates random walks on the network. It alternately expands (matrix squaring) and inflates (element-wise power + renormalization) the adjacency matrix until convergence reveals cluster structure.',
        assignments: [0,0,0,0,0,1,1,1,1,1, 2,2,2,3,3,3,4,4,4,4]
    },
    'Clique Percolation': {
        desc: 'Clique Percolation (CPM, k=3) finds overlapping modules by rolling k-cliques through the network. Two k-cliques are adjacent if they share k-1 nodes. A module is a maximal union of adjacent k-cliques.',
        assignments: [0,0,0,0,0,0,1,1,1,2, 3,3,3,2,2,2,4,4,4,4]
    }
};

let adj = {};
for (let n of nodes) adj[n.id] = [];
for (let [u,v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    algoSelect = createSelect();
    algoSelect.position(10, drawHeight + 12);
    algoSelect.option('MCODE');
    algoSelect.option('MCL');
    algoSelect.option('Clique Percolation');
    algoSelect.selected('MCODE');
    algoSelect.changed(() => { selectedAlgo = algoSelect.value(); });

    describe('PPI module detection comparison with MCODE, MCL, and Clique Percolation algorithms', LABEL);
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
    textSize(15);
    textStyle(BOLD);
    text('PPI Module Detection', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let mod = modules[selectedAlgo];

    // Network area
    let netX = margin;
    let netY = 28;
    let netW = canvasWidth * 0.62;
    let netH = drawHeight - 50;

    // Side panel
    let panelX = netX + netW + 8;
    let panelW = canvasWidth - panelX - margin;
    let panelY = 28;

    // Draw module backgrounds (convex hull approximation)
    let moduleGroups = {};
    for (let i = 0; i < nodes.length; i++) {
        let m = mod.assignments[i];
        if (!moduleGroups[m]) moduleGroups[m] = [];
        moduleGroups[m].push(i);
    }

    for (let [m, nodeIds] of Object.entries(moduleGroups)) {
        if (nodeIds.length < 2) continue;
        let col = color(moduleColors[m % moduleColors.length]);
        fill(red(col), green(col), blue(col), 30);
        stroke(red(col), green(col), blue(col), 80);
        strokeWeight(1.5);

        // Draw enclosing ellipse
        let sumX = 0, sumY = 0;
        for (let id of nodeIds) {
            sumX += netX + nodes[id].x * netW;
            sumY += netY + nodes[id].y * netH;
        }
        let cx = sumX / nodeIds.length;
        let cy = sumY / nodeIds.length;
        let maxR = 0;
        for (let id of nodeIds) {
            let d = dist(netX + nodes[id].x * netW, netY + nodes[id].y * netH, cx, cy);
            if (d > maxR) maxR = d;
        }
        ellipse(cx, cy, (maxR + 30) * 2, (maxR + 25) * 2);
    }

    // Draw edges
    for (let [u, v] of edges) {
        let sameModule = mod.assignments[u] === mod.assignments[v];
        let mc = mod.assignments[u];
        stroke(sameModule ? moduleColors[mc % moduleColors.length] : '#ccc');
        strokeWeight(sameModule ? 2 : 0.8);
        line(netX + nodes[u].x * netW, netY + nodes[u].y * netH,
             netX + nodes[v].x * netW, netY + nodes[v].y * netH);
    }

    // Draw nodes
    hoveredNode = -1;
    for (let n of nodes) {
        let nx = netX + n.x * netW;
        let ny = netY + n.y * netH;
        let mc = mod.assignments[n.id];
        let deg = adj[n.id].length;
        let sz = map(deg, 1, 8, 14, 24);

        // Check hover
        if (dist(mouseX, mouseY, nx, ny) < sz / 2 + 4) {
            hoveredNode = n.id;
        }

        let isHov = hoveredNode === n.id;
        fill(moduleColors[mc % moduleColors.length]);
        stroke(isHov ? '#333' : '#fff');
        strokeWeight(isHov ? 3 : 1.5);
        circle(nx, ny, sz + (isHov ? 4 : 0));

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(7);
        textStyle(BOLD);
        text(n.name, nx, ny);
        textStyle(NORMAL);
    }

    // Hover tooltip
    if (hoveredNode >= 0) {
        let n = nodes[hoveredNode];
        let nx = netX + n.x * netW;
        let ny = netY + n.y * netH;
        let mc = mod.assignments[hoveredNode];
        let tipText = n.name + ' | Module ' + (mc + 1) + ' | Degree: ' + adj[n.id].length;

        fill(0, 0, 0, 200);
        noStroke();
        let tw = textWidth(tipText) + 16;
        rect(nx - tw / 2, ny - 28, tw, 18, 4);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(9);
        text(tipText, nx, ny - 19);
    }

    // Side panel
    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(panelX, panelY, panelW, netH, 6);

    // Algorithm name
    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text(selectedAlgo, panelX + 8, panelY + 8);
    textStyle(NORMAL);

    // Description
    fill('#555');
    textSize(9);
    drawWrappedText(mod.desc, panelX + 8, panelY + 26, panelW - 16, 13);

    // Module statistics
    let statsY = panelY + 120;
    fill('#333');
    textSize(11);
    textStyle(BOLD);
    text('Modules Found:', panelX + 8, statsY);
    textStyle(NORMAL);

    let sy = statsY + 18;
    for (let [m, nodeIds] of Object.entries(moduleGroups)) {
        fill(moduleColors[m % moduleColors.length]);
        noStroke();
        circle(panelX + 16, sy + 5, 10);
        fill('#333');
        textSize(9);
        textAlign(LEFT, TOP);
        text('Module ' + (parseInt(m) + 1) + ': ' + nodeIds.length + ' proteins', panelX + 26, sy);

        // List proteins
        fill('#777');
        textSize(7);
        let names = nodeIds.map(id => nodes[id].name).join(', ');
        drawWrappedText(names, panelX + 26, sy + 13, panelW - 40, 10);
        sy += 38;
    }

    // Network stats
    sy += 10;
    fill('#333');
    textSize(10);
    textStyle(BOLD);
    text('Network Stats:', panelX + 8, sy);
    textStyle(NORMAL);
    fill('#555');
    textSize(9);
    text('Nodes: ' + nodes.length, panelX + 8, sy + 16);
    text('Edges: ' + edges.length, panelX + 8, sy + 28);
    let avgDeg = (edges.length * 2 / nodes.length).toFixed(1);
    text('Avg degree: ' + avgDeg, panelX + 8, sy + 40);

    // Algorithm label
    fill('#888');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Algorithm:', 10 + algoSelect.width + 20, drawHeight + 22);
}

function drawWrappedText(txt, x, y, maxW, lineH) {
    textAlign(LEFT, TOP);
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

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
