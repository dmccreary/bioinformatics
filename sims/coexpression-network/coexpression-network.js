// Co-expression Network
// ~30 gene nodes in 4 modules, edge thickness = correlation, soft threshold slider
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let thresholdSlider, resetBtn;
let hoveredNode = -1;

const moduleColors = ['#1565C0', '#C62828', '#2E7D32', '#E65100'];
const moduleNames = ['Cell Cycle', 'Immune Response', 'Metabolism', 'Signaling'];

// 30 genes in 4 modules
const genes = [
    // Module 0: Cell Cycle (8 genes)
    { id: 0, name: 'CDK1', module: 0 },
    { id: 1, name: 'CCNB1', module: 0 },
    { id: 2, name: 'CCNA2', module: 0 },
    { id: 3, name: 'CDC20', module: 0 },
    { id: 4, name: 'BUB1', module: 0 },
    { id: 5, name: 'PLK1', module: 0 },
    { id: 6, name: 'AURKA', module: 0 },
    { id: 7, name: 'TOP2A', module: 0 },

    // Module 1: Immune Response (8 genes)
    { id: 8, name: 'CD8A', module: 1 },
    { id: 9, name: 'GZMB', module: 1 },
    { id: 10, name: 'IFNG', module: 1 },
    { id: 11, name: 'PRF1', module: 1 },
    { id: 12, name: 'CD3E', module: 1 },
    { id: 13, name: 'CXCL10', module: 1 },
    { id: 14, name: 'STAT1', module: 1 },
    { id: 15, name: 'IRF1', module: 1 },

    // Module 2: Metabolism (7 genes)
    { id: 16, name: 'ALDOB', module: 2 },
    { id: 17, name: 'PCK1', module: 2 },
    { id: 18, name: 'G6PC', module: 2 },
    { id: 19, name: 'FBP1', module: 2 },
    { id: 20, name: 'ACOX1', module: 2 },
    { id: 21, name: 'CPT1A', module: 2 },
    { id: 22, name: 'HMGCS2', module: 2 },

    // Module 3: Signaling (7 genes)
    { id: 23, name: 'EGFR', module: 3 },
    { id: 24, name: 'ERBB2', module: 3 },
    { id: 25, name: 'GRB2', module: 3 },
    { id: 26, name: 'SOS1', module: 3 },
    { id: 27, name: 'RAF1', module: 3 },
    { id: 28, name: 'MAP2K1', module: 3 },
    { id: 29, name: 'MAPK1', module: 3 }
];

// Generate correlation edges
let allEdges = [];

function generateEdges() {
    allEdges = [];
    // Within-module: high correlation (0.6-0.95)
    for (let i = 0; i < genes.length; i++) {
        for (let j = i + 1; j < genes.length; j++) {
            let sameModule = genes[i].module === genes[j].module;
            let corr;
            if (sameModule) {
                corr = 0.55 + Math.random() * 0.4; // 0.55-0.95
            } else {
                // Cross-module: occasional weak correlation
                if (Math.random() < 0.08) {
                    corr = 0.3 + Math.random() * 0.25; // 0.3-0.55
                } else {
                    continue;
                }
            }
            allEdges.push({ from: i, to: j, corr: parseFloat(corr.toFixed(2)) });
        }
    }
}

// Layout: cluster by module
let positions = [];
function computeLayout() {
    positions = [];
    let moduleCenters = [
        { x: 0.28, y: 0.28 },
        { x: 0.72, y: 0.28 },
        { x: 0.28, y: 0.72 },
        { x: 0.72, y: 0.72 }
    ];

    let moduleCounts = [0, 0, 0, 0];
    for (let g of genes) {
        let mc = moduleCenters[g.module];
        let count = moduleCounts[g.module];
        let total = genes.filter(gg => gg.module === g.module).length;
        let angle = (TWO_PI * count / total) - HALF_PI;
        let r = 0.12;
        positions[g.id] = {
            x: mc.x + Math.cos(angle) * r,
            y: mc.y + Math.sin(angle) * r
        };
        moduleCounts[g.module]++;
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    thresholdSlider = createSlider(0.3, 0.9, 0.5, 0.05);
    thresholdSlider.position(10, drawHeight + 12);
    thresholdSlider.size(150);

    resetBtn = createButton('Regenerate');
    resetBtn.position(240, drawHeight + 12);
    resetBtn.mousePressed(() => {
        generateEdges();
    });

    generateEdges();
    computeLayout();

    describe('Gene co-expression network with 4 modules and adjustable soft threshold', LABEL);
}

function draw() {
    updateCanvasSize();
    computeLayout(); // recompute with current canvas

    let threshold = thresholdSlider.value();

    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    fill('white');
    // draw the control region and a silver line around it for alignement
    rect(0, drawHeight, canvasWidth, controlHeight);
    noStroke();

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(15);
    textStyle(BOLD);
    text('Gene Co-expression Network', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let netX = margin;
    let netY = 24;
    let netW = canvasWidth - margin * 2;
    let netH = drawHeight - 80;

    // Filter edges by threshold
    let visibleEdges = allEdges.filter(e => e.corr >= threshold);

    // Draw module backgrounds
    let moduleCenters = [
        { x: 0.28, y: 0.28 },
        { x: 0.72, y: 0.28 },
        { x: 0.28, y: 0.72 },
        { x: 0.72, y: 0.72 }
    ];

    for (let m = 0; m < 4; m++) {
        let mc = moduleCenters[m];
        let cx = netX + mc.x * netW;
        let cy = netY + mc.y * netH;
        let c = color(moduleColors[m]);
        fill(red(c), green(c), blue(c), 20);
        stroke(red(c), green(c), blue(c), 60);
        strokeWeight(1);
        ellipse(cx, cy, netW * 0.42, netH * 0.42);

        // Module label
        fill(moduleColors[m]);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        textStyle(BOLD);
        text(moduleNames[m], cx, cy - netH * 0.19);
        textStyle(NORMAL);
    }

    // Draw edges
    for (let e of visibleEdges) {
        let p1 = positions[e.from];
        let p2 = positions[e.to];
        let x1 = netX + p1.x * netW;
        let y1 = netY + p1.y * netH;
        let x2 = netX + p2.x * netW;
        let y2 = netY + p2.y * netH;

        let sameModule = genes[e.from].module === genes[e.to].module;
        let hov = hoveredNode >= 0 && (e.from === hoveredNode || e.to === hoveredNode);

        let alpha = map(e.corr, 0.3, 1, 40, 200);
        let w = map(e.corr, 0.3, 1, 0.5, 4);

        if (hov) {
            stroke(0, 0, 0, 180);
            strokeWeight(w + 1);
        } else {
            let mc = moduleColors[genes[e.from].module];
            let c = color(sameModule ? mc : '#999');
            stroke(red(c), green(c), blue(c), alpha);
            strokeWeight(w);
        }
        line(x1, y1, x2, y2);
    }

    // Draw nodes
    hoveredNode = -1;
    for (let g of genes) {
        let p = positions[g.id];
        let nx = netX + p.x * netW;
        let ny = netY + p.y * netH;
        if (dist(mouseX, mouseY, nx, ny) < 12) hoveredNode = g.id;
    }

    for (let g of genes) {
        let p = positions[g.id];
        let nx = netX + p.x * netW;
        let ny = netY + p.y * netH;
        let mc = moduleColors[g.module];
        let isHov = hoveredNode === g.id;
        let isNeighbor = hoveredNode >= 0 && visibleEdges.some(e =>
            (e.from === hoveredNode && e.to === g.id) || (e.to === hoveredNode && e.from === g.id));

        let sz = isHov ? 18 : (isNeighbor ? 15 : 12);

        fill(isHov ? '#333' : (isNeighbor ? lerpColor(color(mc), color(255), 0.3) : mc));
        stroke(isHov ? '#000' : '#fff');
        strokeWeight(isHov ? 2.5 : 1);
        circle(nx, ny, sz);

        // Label
        fill(isHov ? '#E65100' : '#333');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(7);
        textStyle(BOLD);
        text(g.name, nx, ny - sz / 2 - 6);
        textStyle(NORMAL);
    }

    // Hover tooltip
    if (hoveredNode >= 0) {
        let g = genes[hoveredNode];
        let p = positions[g.id];
        let nx = netX + p.x * netW;
        let ny = netY + p.y * netH;
        let neighborCount = visibleEdges.filter(e => e.from === g.id || e.to === g.id).length;

        let tipText = g.name + ' | ' + moduleNames[g.module] + ' | Connections: ' + neighborCount;
        fill(0, 0, 0, 210);
        noStroke();
        let tw = textWidth(tipText) + 16;
        let tx = nx - tw / 2;
        if (tx < 0) tx = 4;
        if (tx + tw > canvasWidth) tx = canvasWidth - tw - 4;
        rect(tx, ny + 14, tw, 18, 4);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(9);
        text(tipText, tx + tw / 2, ny + 23);
    }

    // Stats bar
    let statsY = drawHeight - 50;
    fill(255, 255, 255, 220);
    noStroke();
    rect(margin, statsY, canvasWidth - margin * 2, 42, 6);

    fill('#333');
    textAlign(LEFT, TOP);
    textSize(9);
    textStyle(BOLD);
    text('Network Statistics', margin + 8, statsY + 4);
    textStyle(NORMAL);
    fill('#555');
    textSize(8);
    text('Genes: ' + genes.length + '  |  Visible edges: ' + visibleEdges.length +
         '  |  Threshold: ' + threshold.toFixed(2) +
         '  |  Avg correlation: ' + (visibleEdges.length > 0 ?
            (visibleEdges.reduce((a, e) => a + e.corr, 0) / visibleEdges.length).toFixed(2) : '---'),
         margin + 8, statsY + 18);

    // Module legend
    let legX = margin + 8;
    let legY = statsY + 30;
    for (let m = 0; m < 4; m++) {
        fill(moduleColors[m]);
        noStroke();
        circle(legX + 5, legY, 7);
        fill('#555');
        textSize(7);
        textAlign(LEFT, CENTER);
        text(moduleNames[m], legX + 12, legY);
        legX += textWidth(moduleNames[m]) + 24;
    }

    // Slider label
    fill('#666');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Threshold: ' + threshold.toFixed(2), 170, drawHeight + 22);
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
