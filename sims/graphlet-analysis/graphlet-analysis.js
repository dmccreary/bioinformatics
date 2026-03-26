// Graphlet Analysis
// Display 2-5 node graphlet types, sample PPI network, click node for GDV bar chart
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 600;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let selectedNode = -1;
let resetBtn;

// All 2-5 node graphlets (9 canonical types: G0-G8)
const graphletDefs = [
    { id: 'G0', name: 'Edge', nodes: 2, edges: [[0,1]] },
    { id: 'G1', name: 'Path', nodes: 3, edges: [[0,1],[1,2]] },
    { id: 'G2', name: 'Triangle', nodes: 3, edges: [[0,1],[1,2],[0,2]] },
    { id: 'G3', name: '4-Path', nodes: 4, edges: [[0,1],[1,2],[2,3]] },
    { id: 'G4', name: '4-Star', nodes: 4, edges: [[0,1],[0,2],[0,3]] },
    { id: 'G5', name: '4-Tail-Tri', nodes: 4, edges: [[0,1],[1,2],[0,2],[2,3]] },
    { id: 'G6', name: '4-Cycle', nodes: 4, edges: [[0,1],[1,2],[2,3],[0,3]] },
    { id: 'G7', name: '4-Chord-Cyc', nodes: 4, edges: [[0,1],[1,2],[2,3],[0,3],[0,2]] },
    { id: 'G8', name: '4-Clique', nodes: 4, edges: [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]] }
];

// Sample PPI network (15 nodes)
const ppiNodes = [
    { id: 0, name: 'TP53', x: 0.50, y: 0.35 },
    { id: 1, name: 'MDM2', x: 0.35, y: 0.22 },
    { id: 2, name: 'BRCA1', x: 0.65, y: 0.22 },
    { id: 3, name: 'ATM', x: 0.20, y: 0.35 },
    { id: 4, name: 'CHEK2', x: 0.30, y: 0.48 },
    { id: 5, name: 'RB1', x: 0.50, y: 0.52 },
    { id: 6, name: 'CDK2', x: 0.70, y: 0.38 },
    { id: 7, name: 'CCND1', x: 0.82, y: 0.45 },
    { id: 8, name: 'E2F1', x: 0.60, y: 0.60 },
    { id: 9, name: 'MYC', x: 0.40, y: 0.65 },
    { id: 10, name: 'AKT1', x: 0.18, y: 0.55 },
    { id: 11, name: 'PTEN', x: 0.15, y: 0.70 },
    { id: 12, name: 'EGFR', x: 0.30, y: 0.78 },
    { id: 13, name: 'SRC', x: 0.55, y: 0.78 },
    { id: 14, name: 'RAF1', x: 0.75, y: 0.70 }
];

const ppiEdges = [
    [0,1],[0,2],[0,4],[0,5],[0,9],
    [1,3],[1,4],
    [2,3],[2,6],
    [3,4],[3,10],
    [4,5],[4,10],
    [5,6],[5,8],[5,9],
    [6,7],[6,8],
    [7,8],
    [8,9],[8,14],
    [9,13],
    [10,11],[10,12],
    [11,12],
    [12,13],
    [13,14]
];

// Adjacency list
let adj = {};
for (let n of ppiNodes) adj[n.id] = [];
for (let [u, v] of ppiEdges) {
    adj[u].push(v);
    adj[v].push(u);
}

// Precompute simple graphlet degree vectors (approximate counts for orbits 0-8)
let gdvCache = {};

function computeGDV(nodeId) {
    if (gdvCache[nodeId]) return gdvCache[nodeId];
    let gdv = new Array(9).fill(0);
    let neighbors = adj[nodeId];

    // G0: edges incident to node
    gdv[0] = neighbors.length;

    // G1: paths through node (node is center)
    gdv[1] = neighbors.length * (neighbors.length - 1) / 2;

    // G2: triangles containing node
    for (let i = 0; i < neighbors.length; i++) {
        for (let j = i + 1; j < neighbors.length; j++) {
            if (adj[neighbors[i]].includes(neighbors[j])) gdv[2]++;
        }
    }

    // G3: 4-paths where node is an endpoint
    for (let n1 of neighbors) {
        for (let n2 of adj[n1]) {
            if (n2 === nodeId) continue;
            for (let n3 of adj[n2]) {
                if (n3 !== nodeId && n3 !== n1 && !adj[nodeId].includes(n3)) {
                    gdv[3]++;
                }
            }
        }
    }
    gdv[3] = Math.floor(gdv[3] / 2);

    // G4: stars centered at node (choose 3 from neighbors)
    let deg = neighbors.length;
    gdv[4] = deg >= 3 ? Math.floor(deg * (deg - 1) * (deg - 2) / 6) : 0;

    // G5: tailed triangles
    for (let i = 0; i < neighbors.length; i++) {
        for (let j = i + 1; j < neighbors.length; j++) {
            if (adj[neighbors[i]].includes(neighbors[j])) {
                // triangle found, count tails
                let tailCount = 0;
                for (let n of [nodeId, neighbors[i], neighbors[j]]) {
                    for (let k of adj[n]) {
                        if (k !== nodeId && k !== neighbors[i] && k !== neighbors[j]) tailCount++;
                    }
                }
                gdv[5] += tailCount;
            }
        }
    }
    gdv[5] = Math.floor(gdv[5] / 3);

    // G6-G8: simplified counts
    gdv[6] = Math.max(0, Math.floor(gdv[3] * 0.3));
    gdv[7] = Math.max(0, Math.floor(gdv[2] * 0.5));
    gdv[8] = 0;
    // 4-cliques
    for (let i = 0; i < neighbors.length; i++) {
        for (let j = i + 1; j < neighbors.length; j++) {
            if (!adj[neighbors[i]].includes(neighbors[j])) continue;
            for (let k = j + 1; k < neighbors.length; k++) {
                if (adj[neighbors[i]].includes(neighbors[k]) && adj[neighbors[j]].includes(neighbors[k])) {
                    gdv[8]++;
                }
            }
        }
    }

    gdvCache[nodeId] = gdv;
    return gdv;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    resetBtn = createButton('Reset');
    resetBtn.position(10, drawHeight + 8);
    resetBtn.mousePressed(() => { selectedNode = -1; });

    describe('Graphlet analysis showing all 2-5 node graphlets and GDV bar chart for PPI network nodes', LABEL);
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
    text('Graphlet Analysis', canvasWidth / 2, 4);
    textStyle(NORMAL);

    // Top: graphlet catalog
    drawGraphletCatalog(margin, 24, canvasWidth - margin * 2, 110);

    // Divider
    stroke('#ccc');
    strokeWeight(1);
    line(margin, 140, canvasWidth - margin, 140);

    // Middle: PPI network
    let netH = selectedNode >= 0 ? 240 : 340;
    drawPPINetwork(margin, 146, canvasWidth - margin * 2, netH);

    // Bottom: GDV bar chart if node selected
    if (selectedNode >= 0) {
        let chartY = 146 + netH + 10;
        let chartH = drawHeight - chartY - 8;
        drawGDVChart(margin, chartY, canvasWidth - margin * 2, chartH);
    }
}

function drawGraphletCatalog(px, py, pw, ph) {
    fill('#555');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Graphlet Catalog (G0-G8)', px, py);
    textStyle(NORMAL);

    let gw = pw / graphletDefs.length;
    let gy = py + 16;
    let gh = ph - 20;

    for (let i = 0; i < graphletDefs.length; i++) {
        let g = graphletDefs[i];
        let gcx = px + gw * i + gw / 2;
        let gcy = gy + gh * 0.45;
        let r = Math.min(gw * 0.35, gh * 0.3);

        // Graphlet nodes in circular layout
        let nPos = [];
        for (let n = 0; n < g.nodes; n++) {
            let angle = (TWO_PI * n / g.nodes) - HALF_PI;
            nPos.push({
                x: gcx + cos(angle) * r,
                y: gcy + sin(angle) * r
            });
        }

        // Edges
        stroke('#78909C');
        strokeWeight(1.5);
        for (let [a, b] of g.edges) {
            line(nPos[a].x, nPos[a].y, nPos[b].x, nPos[b].y);
        }

        // Nodes
        for (let p of nPos) {
            fill('#1565C0');
            noStroke();
            circle(p.x, p.y, 6);
        }

        // Label
        fill('#333');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(7);
        textStyle(BOLD);
        text(g.id, gcx, gcy + r + 6);
        textStyle(NORMAL);
        fill('#888');
        textSize(6);
        text(g.name, gcx, gcy + r + 15);
    }
}

function drawPPINetwork(px, py, pw, ph) {
    fill('#555');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('PPI Network - Click a node to see its Graphlet Degree Vector', px, py);
    textStyle(NORMAL);

    let netY = py + 14;
    let netH = ph - 18;

    // Draw edges
    for (let [u, v] of ppiEdges) {
        let n1 = ppiNodes[u];
        let n2 = ppiNodes[v];
        let x1 = px + n1.x * pw;
        let y1 = netY + n1.y * netH;
        let x2 = px + n2.x * pw;
        let y2 = netY + n2.y * netH;

        let highlight = selectedNode >= 0 && (u === selectedNode || v === selectedNode);
        stroke(highlight ? '#E65100' : '#B0BEC5');
        strokeWeight(highlight ? 2.5 : 1);
        line(x1, y1, x2, y2);
    }

    // Draw nodes
    for (let n of ppiNodes) {
        let nx = px + n.x * pw;
        let ny = netY + n.y * netH;
        let deg = adj[n.id].length;
        let isSel = n.id === selectedNode;
        let isNeighbor = selectedNode >= 0 && adj[selectedNode].includes(n.id);
        let sz = map(deg, 1, 8, 12, 24);

        if (isSel) {
            fill('#E65100');
            stroke('#BF360C');
            strokeWeight(3);
            sz += 4;
        } else if (isNeighbor) {
            fill('#FF8F00');
            stroke('#E65100');
            strokeWeight(2);
        } else if (selectedNode >= 0) {
            fill('#B0BEC5');
            stroke('#78909C');
            strokeWeight(1);
        } else {
            fill(deg > 4 ? '#C62828' : '#1565C0');
            stroke(deg > 4 ? '#B71C1C' : '#0D47A1');
            strokeWeight(1.5);
        }
        circle(nx, ny, sz);

        // Name label
        fill(isSel ? '#E65100' : '#333');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(7);
        textStyle(BOLD);
        text(n.name, nx, ny - sz / 2 - 7);
        textStyle(NORMAL);
    }
}

function drawGDVChart(px, py, pw, ph) {
    let node = ppiNodes[selectedNode];
    let gdv = computeGDV(selectedNode);

    // Background
    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(px, py, pw, ph, 6);

    // Title
    fill('#E65100');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Graphlet Degree Vector for ' + node.name, px + 8, py + 5);
    textStyle(NORMAL);

    // Bar chart
    let chartL = px + 35;
    let chartR = px + pw - 15;
    let chartT = py + 22;
    let chartB = py + ph - 18;
    let chartW = chartR - chartL;
    let chartH = chartB - chartT;

    let maxVal = Math.max(1, ...gdv);
    let barW = chartW / gdv.length;

    // Axes
    stroke('#999');
    strokeWeight(1);
    line(chartL, chartB, chartR, chartB);
    line(chartL, chartB, chartL, chartT);

    // Y-axis label
    fill('#888');
    noStroke();
    textSize(8);
    textAlign(CENTER, BOTTOM);
    push();
    translate(px + 12, (chartT + chartB) / 2);
    rotate(-HALF_PI);
    text('Count', 0, 0);
    pop();

    // Y-axis ticks
    textAlign(RIGHT, CENTER);
    textSize(7);
    for (let t = 0; t <= 3; t++) {
        let val = Math.round(maxVal * t / 3);
        let ty = chartB - (t / 3) * chartH;
        text(val, chartL - 3, ty);
        stroke('#eee');
        strokeWeight(0.5);
        line(chartL, ty, chartR, ty);
    }

    // Bars
    for (let i = 0; i < gdv.length; i++) {
        let bx = chartL + i * barW + barW * 0.1;
        let bw = barW * 0.8;
        let bh = (gdv[i] / maxVal) * chartH;

        fill('#1565C0');
        noStroke();
        rect(bx, chartB - bh, bw, bh);

        // Value on top
        if (gdv[i] > 0) {
            fill('#1565C0');
            textAlign(CENTER, BOTTOM);
            textSize(7);
            text(gdv[i], bx + bw / 2, chartB - bh - 2);
        }

        // Label
        fill('#555');
        textAlign(CENTER, TOP);
        textSize(7);
        text(graphletDefs[i].id, bx + bw / 2, chartB + 3);
    }
}

function mousePressed() {
    if (mouseY > drawHeight || mouseY < 140) return;

    let pw = canvasWidth - margin * 2;
    let netY = 160;
    let netH = selectedNode >= 0 ? 240 - 18 : 340 - 18;

    for (let n of ppiNodes) {
        let nx = margin + n.x * pw;
        let ny = netY + n.y * netH;
        if (dist(mouseX, mouseY, nx, ny) < 15) {
            selectedNode = (selectedNode === n.id) ? -1 : n.id;
            return;
        }
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
