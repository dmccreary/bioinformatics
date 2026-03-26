// PPI Network Overview
// Force-directed network, ~25 nodes, hubs highlighted, hover for info
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let resetBtn;
let hoveredNode = -1;

// 25-node PPI network
const ppiNodes = [
    { id: 0, name: 'TP53' },
    { id: 1, name: 'MDM2' },
    { id: 2, name: 'BRCA1' },
    { id: 3, name: 'ATM' },
    { id: 4, name: 'CHEK2' },
    { id: 5, name: 'RB1' },
    { id: 6, name: 'CDK2' },
    { id: 7, name: 'CCND1' },
    { id: 8, name: 'E2F1' },
    { id: 9, name: 'MYC' },
    { id: 10, name: 'AKT1' },
    { id: 11, name: 'PTEN' },
    { id: 12, name: 'PIK3CA' },
    { id: 13, name: 'EGFR' },
    { id: 14, name: 'ERBB2' },
    { id: 15, name: 'SRC' },
    { id: 16, name: 'RAF1' },
    { id: 17, name: 'BRAF' },
    { id: 18, name: 'MAP2K1' },
    { id: 19, name: 'MAPK1' },
    { id: 20, name: 'JUN' },
    { id: 21, name: 'FOS' },
    { id: 22, name: 'STAT3' },
    { id: 23, name: 'JAK2' },
    { id: 24, name: 'GRB2' }
];

const ppiEdges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,9],
    [1,3],[1,4],
    [2,3],[2,6],
    [3,4],[3,10],
    [4,5],
    [5,6],[5,8],[5,9],
    [6,7],[6,8],[6,24],
    [7,8],
    [8,9],[8,20],
    [9,20],[9,21],
    [10,11],[10,12],[10,24],
    [11,12],
    [12,13],[12,24],
    [13,14],[13,15],[13,24],
    [14,15],
    [15,16],[15,22],
    [16,17],[16,18],
    [17,18],
    [18,19],
    [19,20],[19,21],
    [20,21],
    [22,23],
    [23,24]
];

// Adjacency
let adj = {};
for (let n of ppiNodes) adj[n.id] = [];
for (let [u,v] of ppiEdges) {
    adj[u].push(v);
    adj[v].push(u);
}

// Compute node degrees
let degrees = {};
for (let n of ppiNodes) degrees[n.id] = adj[n.id].length;

// Compute betweenness (simplified: BFS-based)
let betweenness = {};
function computeBetweenness() {
    for (let n of ppiNodes) betweenness[n.id] = 0;
    for (let s of ppiNodes) {
        let stack = [];
        let pred = {};
        let sigma = {};
        let dist2 = {};
        let delta = {};
        for (let n of ppiNodes) {
            pred[n.id] = [];
            sigma[n.id] = 0;
            dist2[n.id] = -1;
            delta[n.id] = 0;
        }
        sigma[s.id] = 1;
        dist2[s.id] = 0;
        let queue = [s.id];
        while (queue.length > 0) {
            let v = queue.shift();
            stack.push(v);
            for (let w of adj[v]) {
                if (dist2[w] < 0) {
                    queue.push(w);
                    dist2[w] = dist2[v] + 1;
                }
                if (dist2[w] === dist2[v] + 1) {
                    sigma[w] += sigma[v];
                    pred[w].push(v);
                }
            }
        }
        while (stack.length > 0) {
            let w = stack.pop();
            for (let v of pred[w]) {
                delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
            }
            if (w !== s.id) betweenness[w] += delta[w];
        }
    }
    // Normalize
    let maxB = Math.max(1, ...Object.values(betweenness));
    for (let n of ppiNodes) betweenness[n.id] /= maxB;
}

// Force-directed layout positions
let positions = [];
let velocities = [];
let layoutDone = false;
let layoutIter = 0;

function initLayout() {
    positions = [];
    velocities = [];
    for (let i = 0; i < ppiNodes.length; i++) {
        positions.push({
            x: 0.3 + Math.random() * 0.4,
            y: 0.3 + Math.random() * 0.4
        });
        velocities.push({ x: 0, y: 0 });
    }
    layoutDone = false;
    layoutIter = 0;
}

function stepLayout() {
    let k = 0.08; // ideal spring length
    let repulsion = 0.002;
    let attraction = 0.05;
    let damping = 0.85;
    let dt = 0.3;

    for (let i = 0; i < ppiNodes.length; i++) {
        let fx = 0, fy = 0;
        // Repulsion from all other nodes
        for (let j = 0; j < ppiNodes.length; j++) {
            if (i === j) continue;
            let dx = positions[i].x - positions[j].x;
            let dy = positions[i].y - positions[j].y;
            let d = Math.sqrt(dx * dx + dy * dy) + 0.001;
            let force = repulsion / (d * d);
            fx += (dx / d) * force;
            fy += (dy / d) * force;
        }
        // Attraction along edges
        for (let nb of adj[i]) {
            let dx = positions[nb].x - positions[i].x;
            let dy = positions[nb].y - positions[i].y;
            let d = Math.sqrt(dx * dx + dy * dy);
            let force = (d - k) * attraction;
            fx += (dx / d) * force;
            fy += (dy / d) * force;
        }
        // Center gravity
        fx += (0.5 - positions[i].x) * 0.01;
        fy += (0.5 - positions[i].y) * 0.01;

        velocities[i].x = (velocities[i].x + fx * dt) * damping;
        velocities[i].y = (velocities[i].y + fy * dt) * damping;
    }

    let totalMovement = 0;
    for (let i = 0; i < ppiNodes.length; i++) {
        positions[i].x += velocities[i].x;
        positions[i].y += velocities[i].y;
        // Clamp
        positions[i].x = Math.max(0.08, Math.min(0.92, positions[i].x));
        positions[i].y = Math.max(0.08, Math.min(0.92, positions[i].y));
        totalMovement += Math.abs(velocities[i].x) + Math.abs(velocities[i].y);
    }

    layoutIter++;
    if (totalMovement < 0.001 || layoutIter > 300) layoutDone = true;
}

// Compute clustering coefficient
function clusteringCoeff(nodeId) {
    let nb = adj[nodeId];
    if (nb.length < 2) return 0;
    let links = 0;
    for (let i = 0; i < nb.length; i++) {
        for (let j = i + 1; j < nb.length; j++) {
            if (adj[nb[i]].includes(nb[j])) links++;
        }
    }
    return (2 * links) / (nb.length * (nb.length - 1));
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    resetBtn = createButton('Re-layout');
    resetBtn.position(10, drawHeight + 8);
    resetBtn.mousePressed(initLayout);

    computeBetweenness();
    initLayout();

    describe('Force-directed PPI network with hub highlighting and network statistics', LABEL);
}

function draw() {
    updateCanvasSize();

    // Run layout steps
    if (!layoutDone) {
        for (let i = 0; i < 5; i++) stepLayout();
    }

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
    text('PPI Network Overview', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let netW = canvasWidth * 0.68;
    let netH = drawHeight - 40;
    let netX = margin;
    let netY = 26;

    // Sidebar
    let panelX = netX + netW + 8;
    let panelW = canvasWidth - panelX - margin;

    // Draw edges
    for (let [u, v] of ppiEdges) {
        let x1 = netX + positions[u].x * netW;
        let y1 = netY + positions[u].y * netH;
        let x2 = netX + positions[v].x * netW;
        let y2 = netY + positions[v].y * netH;

        let hov = hoveredNode >= 0 && (u === hoveredNode || v === hoveredNode);
        stroke(hov ? '#333' : '#B0BEC5');
        strokeWeight(hov ? 2 : 1);
        line(x1, y1, x2, y2);
    }

    // Draw nodes
    hoveredNode = -1;
    let maxDeg = Math.max(...Object.values(degrees));
    for (let n of ppiNodes) {
        let nx = netX + positions[n.id].x * netW;
        let ny = netY + positions[n.id].y * netH;
        let deg = degrees[n.id];
        let isHub = deg > 4;
        let sz = map(deg, 1, maxDeg, 12, 28);

        if (dist(mouseX, mouseY, nx, ny) < sz / 2 + 5) {
            hoveredNode = n.id;
        }
    }

    for (let n of ppiNodes) {
        let nx = netX + positions[n.id].x * netW;
        let ny = netY + positions[n.id].y * netH;
        let deg = degrees[n.id];
        let isHub = deg > 4;
        let sz = map(deg, 1, maxDeg, 12, 28);
        let isHov = hoveredNode === n.id;
        let isNeighbor = hoveredNode >= 0 && adj[hoveredNode].includes(n.id);

        if (isHov) {
            fill('#E65100');
            stroke('#BF360C');
            strokeWeight(3);
            sz += 4;
        } else if (isNeighbor) {
            fill('#FF8F00');
            stroke('#E65100');
            strokeWeight(2);
        } else if (isHub) {
            fill('#C62828');
            stroke('#B71C1C');
            strokeWeight(2);
        } else {
            fill('#1565C0');
            stroke('#0D47A1');
            strokeWeight(1.5);
        }
        circle(nx, ny, sz);

        // Label
        fill(isHov || isHub ? '#333' : '#555');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(7);
        textStyle(BOLD);
        text(n.name, nx, ny - sz / 2 - 7);
        textStyle(NORMAL);
    }

    // Hover tooltip
    if (hoveredNode >= 0) {
        let n = ppiNodes[hoveredNode];
        let nx = netX + positions[hoveredNode].x * netW;
        let ny = netY + positions[hoveredNode].y * netH;
        let cc = clusteringCoeff(hoveredNode).toFixed(2);
        let bw = betweenness[hoveredNode].toFixed(2);
        let tipLines = [
            n.name,
            'Degree: ' + degrees[n.id],
            'Betweenness: ' + bw,
            'Clustering: ' + cc
        ];

        let tw = 120;
        let th = tipLines.length * 14 + 8;
        let tx = nx + 10;
        let ty = ny - th - 5;
        if (tx + tw > canvasWidth) tx = nx - tw - 10;
        if (ty < 0) ty = ny + 15;

        fill(0, 0, 0, 210);
        noStroke();
        rect(tx, ty, tw, th, 4);
        fill(255);
        textAlign(LEFT, TOP);
        textSize(9);
        for (let i = 0; i < tipLines.length; i++) {
            if (i === 0) textStyle(BOLD);
            else textStyle(NORMAL);
            text(tipLines[i], tx + 6, ty + 4 + i * 14);
        }
        textStyle(NORMAL);
    }

    // Sidebar stats
    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(panelX, netY, panelW, netH, 6);

    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Network Stats', panelX + 8, netY + 8);
    textStyle(NORMAL);

    let sy = netY + 28;
    let stats = [
        ['Nodes', ppiNodes.length],
        ['Edges', ppiEdges.length],
        ['Avg Degree', (ppiEdges.length * 2 / ppiNodes.length).toFixed(1)],
        ['Max Degree', maxDeg],
        ['Density', (2 * ppiEdges.length / (ppiNodes.length * (ppiNodes.length - 1))).toFixed(3)]
    ];

    // Global clustering coefficient
    let totalCC = 0;
    for (let n of ppiNodes) totalCC += clusteringCoeff(n.id);
    totalCC /= ppiNodes.length;
    stats.push(['Avg Clustering', totalCC.toFixed(3)]);

    fill('#555');
    textSize(9);
    for (let [label, val] of stats) {
        textStyle(BOLD);
        text(label + ':', panelX + 8, sy);
        textStyle(NORMAL);
        text(String(val), panelX + 8, sy + 12);
        sy += 28;
    }

    // Hub proteins list
    sy += 10;
    fill('#C62828');
    textStyle(BOLD);
    textSize(10);
    text('Hub Proteins (deg>4):', panelX + 8, sy);
    textStyle(NORMAL);
    sy += 16;
    fill('#555');
    textSize(9);
    for (let n of ppiNodes) {
        if (degrees[n.id] > 4) {
            text(n.name + ' (' + degrees[n.id] + ')', panelX + 8, sy);
            sy += 14;
        }
    }

    // Legend
    sy += 14;
    fill('#1565C0');
    noStroke();
    circle(panelX + 14, sy + 2, 10);
    fill('#555');
    textSize(8);
    textAlign(LEFT, CENTER);
    text('Regular node', panelX + 24, sy + 2);

    sy += 16;
    fill('#C62828');
    circle(panelX + 14, sy + 2, 12);
    fill('#555');
    text('Hub (degree > 4)', panelX + 24, sy + 2);
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
