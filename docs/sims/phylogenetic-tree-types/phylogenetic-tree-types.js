// Phylogenetic Tree Types: Cladogram, Phylogram, Unrooted
// Three panels showing same 6 taxa in different tree styles
// Select dropdown for different example datasets
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 10;

let datasetSelect;

// Datasets: each has 6 taxa with branch lengths and a tree topology
// Tree topology: ((A,B),(C,(D,(E,F)))) with outgroup = F
const datasets = {
    'Mammals': {
        taxa: ['Human', 'Chimp', 'Gorilla', 'Mouse', 'Dog', 'Opossum'],
        outgroup: 5,
        // Branch lengths from root to each taxon path
        branches: [0.03, 0.04, 0.07, 0.25, 0.20, 0.85],
        // Internal node branch lengths
        internalBranches: [0.02, 0.05, 0.10, 0.30, 0.65]
    },
    'Bacteria': {
        taxa: ['E. coli', 'Salmonella', 'B. subtilis', 'S. aureus', 'M. tuberculosis', 'Archaea sp.'],
        outgroup: 5,
        branches: [0.05, 0.06, 0.30, 0.35, 0.50, 0.90],
        internalBranches: [0.03, 0.15, 0.25, 0.40, 0.70]
    },
    'Plants': {
        taxa: ['Rice', 'Wheat', 'Maize', 'Arabidopsis', 'Tomato', 'Pine'],
        outgroup: 5,
        branches: [0.08, 0.09, 0.12, 0.35, 0.38, 0.80],
        internalBranches: [0.05, 0.10, 0.20, 0.35, 0.60]
    }
};

let currentDataset = 'Mammals';

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    datasetSelect = createSelect();
    datasetSelect.position(10, drawHeight + 10);
    datasetSelect.option('Mammals');
    datasetSelect.option('Bacteria');
    datasetSelect.option('Plants');
    datasetSelect.selected('Mammals');
    datasetSelect.changed(() => { currentDataset = datasetSelect.value(); });

    describe('Three phylogenetic tree representations: cladogram, phylogram, and unrooted tree for 6 taxa', LABEL);
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
    text('Phylogenetic Tree Representations', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let ds = datasets[currentDataset];
    let pw = (canvasWidth - margin * 4) / 3;
    let topY = 28;
    let panelH = drawHeight - topY - 15;

    // Dividers
    stroke(210);
    strokeWeight(1);
    line(margin + pw + margin * 0.5, topY, margin + pw + margin * 0.5, topY + panelH);
    line(margin * 2.5 + pw * 2, topY, margin * 2.5 + pw * 2, topY + panelH);

    // Three panels
    drawCladogram(margin, topY, pw, panelH, ds);
    drawPhylogram(margin * 2 + pw, topY, pw, panelH, ds);
    drawUnrooted(margin * 3 + pw * 2, topY, pw, panelH, ds);

    // Dataset label
    fill('#555');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Dataset: ' + currentDataset, 120, drawHeight + 20);
}

function drawCladogram(px, py, pw, ph, ds) {
    // Title
    fill('#2979FF');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Cladogram', px + pw / 2, py);
    textStyle(NORMAL);
    fill('#888');
    textSize(9);
    text('(equal branches)', px + pw / 2, py + 15);

    let treeTop = py + 32;
    let treeH = ph - 50;
    let treeW = pw - 20;
    let startX = px + 10;

    // Tree topology: ((T0,T1),(T2,(T3,(T4,T5))))
    // Equal spacing for cladogram
    let taxa = ds.taxa;
    let n = taxa.length;
    let ySpacing = treeH / (n + 1);

    // Leaf y positions
    let leafY = [];
    for (let i = 0; i < n; i++) {
        leafY[i] = treeTop + ySpacing * (i + 1);
    }

    // Internal node positions (x = depth level, y = midpoint of children)
    // Depth levels equally spaced for cladogram
    let depthStep = treeW / 5;

    let nodeX = {};
    let nodeY = {};

    // Leaves at right
    for (let i = 0; i < n; i++) {
        nodeX['T' + i] = startX + treeW;
        nodeY['T' + i] = leafY[i];
    }

    // Internal: (T0,T1) = N01
    nodeX['N01'] = startX + treeW - depthStep;
    nodeY['N01'] = (leafY[0] + leafY[1]) / 2;

    // Internal: (T4,T5) = N45
    nodeX['N45'] = startX + treeW - depthStep;
    nodeY['N45'] = (leafY[4] + leafY[5]) / 2;

    // Internal: (T3, N45) = N345
    nodeX['N345'] = startX + treeW - depthStep * 2;
    nodeY['N345'] = (leafY[3] + nodeY['N45']) / 2;

    // Internal: (T2, N345) = N2345
    nodeX['N2345'] = startX + treeW - depthStep * 3;
    nodeY['N2345'] = (leafY[2] + nodeY['N345']) / 2;

    // Root: (N01, N2345)
    nodeX['ROOT'] = startX;
    nodeY['ROOT'] = (nodeY['N01'] + nodeY['N2345']) / 2;

    // Draw edges (L-shaped: horizontal then vertical)
    stroke('#2979FF');
    strokeWeight(2);

    drawLEdge(nodeX['ROOT'], nodeY['ROOT'], nodeX['N01'], nodeY['N01']);
    drawLEdge(nodeX['ROOT'], nodeY['ROOT'], nodeX['N2345'], nodeY['N2345']);
    drawLEdge(nodeX['N01'], nodeY['N01'], nodeX['T0'], nodeY['T0']);
    drawLEdge(nodeX['N01'], nodeY['N01'], nodeX['T1'], nodeY['T1']);
    drawLEdge(nodeX['N2345'], nodeY['N2345'], nodeX['T2'], nodeY['T2']);
    drawLEdge(nodeX['N2345'], nodeY['N2345'], nodeX['N345'], nodeY['N345']);
    drawLEdge(nodeX['N345'], nodeY['N345'], nodeX['T3'], nodeY['T3']);
    drawLEdge(nodeX['N345'], nodeY['N345'], nodeX['N45'], nodeY['N45']);
    drawLEdge(nodeX['N45'], nodeY['N45'], nodeX['T4'], nodeY['T4']);
    drawLEdge(nodeX['N45'], nodeY['N45'], nodeX['T5'], nodeY['T5']);

    // Draw leaf labels
    for (let i = 0; i < n; i++) {
        let isOutgroup = (i === ds.outgroup);
        fill(isOutgroup ? '#E65100' : '#333');
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(9);
        textStyle(isOutgroup ? BOLD : NORMAL);
        text(taxa[i] + (isOutgroup ? ' *' : ''), nodeX['T' + i] + 4, nodeY['T' + i]);
    }
}

function drawPhylogram(px, py, pw, ph, ds) {
    fill('#D32F2F');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Phylogram', px + pw / 2, py);
    textStyle(NORMAL);
    fill('#888');
    textSize(9);
    text('(proportional branches)', px + pw / 2, py + 15);

    let treeTop = py + 32;
    let treeH = ph - 50;
    let treeW = pw - 35;
    let startX = px + 10;
    let taxa = ds.taxa;
    let n = taxa.length;
    let ySpacing = treeH / (n + 1);

    let leafY = [];
    for (let i = 0; i < n; i++) {
        leafY[i] = treeTop + ySpacing * (i + 1);
    }

    // Use branch lengths for x positions
    let bl = ds.internalBranches;
    let maxBL = ds.branches[ds.outgroup]; // outgroup has longest path

    function blToX(branchLen) {
        return startX + (branchLen / maxBL) * treeW;
    }

    let nodeX = {};
    let nodeY = {};

    // Leaves
    for (let i = 0; i < n; i++) {
        nodeX['T' + i] = blToX(ds.branches[i]);
        nodeY['T' + i] = leafY[i];
    }

    // Internal nodes at their evolutionary distances
    nodeX['N01'] = blToX(bl[0]);
    nodeY['N01'] = (leafY[0] + leafY[1]) / 2;

    nodeX['N45'] = blToX(bl[3]);
    nodeY['N45'] = (leafY[4] + leafY[5]) / 2;

    nodeX['N345'] = blToX(bl[2]);
    nodeY['N345'] = (leafY[3] + nodeY['N45']) / 2;

    nodeX['N2345'] = blToX(bl[1]);
    nodeY['N2345'] = (leafY[2] + nodeY['N345']) / 2;

    nodeX['ROOT'] = startX;
    nodeY['ROOT'] = (nodeY['N01'] + nodeY['N2345']) / 2;

    stroke('#D32F2F');
    strokeWeight(2);

    drawLEdge(nodeX['ROOT'], nodeY['ROOT'], nodeX['N01'], nodeY['N01']);
    drawLEdge(nodeX['ROOT'], nodeY['ROOT'], nodeX['N2345'], nodeY['N2345']);
    drawLEdge(nodeX['N01'], nodeY['N01'], nodeX['T0'], nodeY['T0']);
    drawLEdge(nodeX['N01'], nodeY['N01'], nodeX['T1'], nodeY['T1']);
    drawLEdge(nodeX['N2345'], nodeY['N2345'], nodeX['T2'], nodeY['T2']);
    drawLEdge(nodeX['N2345'], nodeY['N2345'], nodeX['N345'], nodeY['N345']);
    drawLEdge(nodeX['N345'], nodeY['N345'], nodeX['T3'], nodeY['T3']);
    drawLEdge(nodeX['N345'], nodeY['N345'], nodeX['N45'], nodeY['N45']);
    drawLEdge(nodeX['N45'], nodeY['N45'], nodeX['T4'], nodeY['T4']);
    drawLEdge(nodeX['N45'], nodeY['N45'], nodeX['T5'], nodeY['T5']);

    // Leaf labels
    for (let i = 0; i < n; i++) {
        let isOutgroup = (i === ds.outgroup);
        fill(isOutgroup ? '#E65100' : '#333');
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(9);
        textStyle(isOutgroup ? BOLD : NORMAL);
        text(taxa[i] + (isOutgroup ? ' *' : ''), startX + treeW + 4, nodeY['T' + i]);
    }

    // Scale bar
    let scaleLen = treeW * 0.3;
    let scaleVal = (0.3 * maxBL).toFixed(2);
    let scaleY = treeTop + treeH + 5;
    stroke('#D32F2F');
    strokeWeight(1.5);
    line(startX, scaleY, startX + scaleLen, scaleY);
    line(startX, scaleY - 3, startX, scaleY + 3);
    line(startX + scaleLen, scaleY - 3, startX + scaleLen, scaleY + 3);
    fill('#D32F2F');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(8);
    text(scaleVal + ' subs/site', startX + scaleLen / 2, scaleY + 4);
}

function drawUnrooted(px, py, pw, ph, ds) {
    fill('#388E3C');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Unrooted', px + pw / 2, py);
    textStyle(NORMAL);
    fill('#888');
    textSize(9);
    text('(no assumed root)', px + pw / 2, py + 15);

    let cx = px + pw / 2;
    let cy = py + ph / 2 + 5;
    let r = min(pw, ph) * 0.35;
    let taxa = ds.taxa;
    let n = taxa.length;

    // Place taxa around a circle, but use a star-tree layout
    // with internal branching structure
    let angles = [];
    for (let i = 0; i < n; i++) {
        angles[i] = (TWO_PI * i) / n - HALF_PI;
    }

    // Central point
    let centerX = cx;
    let centerY = cy;

    // Internal nodes positioned between center and leaves
    // Simplified: radial layout with proportional branch lengths
    let maxBL = max(...ds.branches);

    // Draw edges from center to internal nodes, then to leaves
    stroke('#388E3C');
    strokeWeight(2);

    // Internal structure: center splits into two groups
    let leftAngle = (angles[0] + angles[2]) / 2;
    let rightAngle = (angles[3] + angles[5]) / 2;

    let leftIntX = centerX + cos(leftAngle) * r * 0.25;
    let leftIntY = centerY + sin(leftAngle) * r * 0.25;
    let rightIntX = centerX + cos(rightAngle) * r * 0.25;
    let rightIntY = centerY + sin(rightAngle) * r * 0.25;

    // Center to internal
    line(centerX, centerY, leftIntX, leftIntY);
    line(centerX, centerY, rightIntX, rightIntY);

    // Sub-internal nodes
    let n01Angle = (angles[0] + angles[1]) / 2;
    let n01X = leftIntX + cos(n01Angle) * r * 0.2;
    let n01Y = leftIntY + sin(n01Angle) * r * 0.2;

    line(leftIntX, leftIntY, n01X, n01Y);
    line(leftIntX, leftIntY, cx + cos(angles[2]) * r * 0.85, cy + sin(angles[2]) * r * 0.85); // to T2

    // n01 to T0, T1
    let leafPositions = [];
    for (let i = 0; i < n; i++) {
        let lr = r * (0.6 + (ds.branches[i] / maxBL) * 0.35);
        leafPositions[i] = {
            x: cx + cos(angles[i]) * lr,
            y: cy + sin(angles[i]) * lr
        };
    }

    line(n01X, n01Y, leafPositions[0].x, leafPositions[0].y);
    line(n01X, n01Y, leafPositions[1].x, leafPositions[1].y);

    // Right subtree internal nodes
    let n45Angle = (angles[4] + angles[5]) / 2;
    let n45X = rightIntX + cos(n45Angle) * r * 0.2;
    let n45Y = rightIntY + sin(n45Angle) * r * 0.2;

    let n345Angle = (angles[3] + n45Angle) / 2;
    let n345X = rightIntX + cos(n345Angle) * r * 0.12;
    let n345Y = rightIntY + sin(n345Angle) * r * 0.12;

    line(rightIntX, rightIntY, n345X, n345Y);
    line(n345X, n345Y, leafPositions[3].x, leafPositions[3].y);
    line(n345X, n345Y, n45X, n45Y);
    line(n45X, n45Y, leafPositions[4].x, leafPositions[4].y);
    line(n45X, n45Y, leafPositions[5].x, leafPositions[5].y);

    // Draw leaf nodes and labels
    for (let i = 0; i < n; i++) {
        let isOutgroup = (i === ds.outgroup);
        let lp = leafPositions[i];

        fill(isOutgroup ? '#E65100' : '#388E3C');
        noStroke();
        circle(lp.x, lp.y, 8);

        // Label offset
        let labelAngle = angles[i];
        let labelR = 14;
        let lx = lp.x + cos(labelAngle) * labelR;
        let ly = lp.y + sin(labelAngle) * labelR;

        fill(isOutgroup ? '#E65100' : '#333');
        textAlign(CENTER, CENTER);
        textSize(9);
        textStyle(isOutgroup ? BOLD : NORMAL);
        text(taxa[i] + (isOutgroup ? ' *' : ''), lx, ly);
    }

    // Internal node dots
    noStroke();
    fill('#388E3C');
    circle(centerX, centerY, 5);
    circle(leftIntX, leftIntY, 5);
    circle(rightIntX, rightIntY, 5);
    circle(n01X, n01Y, 5);
    circle(n45X, n45Y, 5);
    circle(n345X, n345Y, 5);
}

function drawLEdge(x1, y1, x2, y2) {
    // L-shaped edge: horizontal from parent, then vertical to child
    line(x1, y1, x1, y2); // vertical at parent x
    line(x1, y2, x2, y2); // horizontal to child
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
