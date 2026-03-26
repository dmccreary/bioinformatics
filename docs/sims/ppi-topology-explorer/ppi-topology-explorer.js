// PPI Topology Explorer
// Left: network colored by selectable metric; Right: histogram of metric
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let metricSelect;
let hoveredNode = -1;
let currentMetric = 'Degree';

// 20-node PPI network
const nodes = [
    { id: 0, name: 'TP53' },  { id: 1, name: 'MDM2' },
    { id: 2, name: 'BRCA1' }, { id: 3, name: 'ATM' },
    { id: 4, name: 'CHEK2' }, { id: 5, name: 'RB1' },
    { id: 6, name: 'CDK2' },  { id: 7, name: 'CCND1' },
    { id: 8, name: 'E2F1' },  { id: 9, name: 'MYC' },
    { id: 10, name: 'AKT1' }, { id: 11, name: 'PTEN' },
    { id: 12, name: 'PIK3CA' },{ id: 13, name: 'EGFR' },
    { id: 14, name: 'ERBB2' },{ id: 15, name: 'SRC' },
    { id: 16, name: 'RAF1' }, { id: 17, name: 'BRAF' },
    { id: 18, name: 'MAP2K1' },{ id: 19, name: 'GRB2' }
];

const edges = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,9],
    [1,3],[1,4],
    [2,3],[2,6],
    [3,4],[3,10],
    [4,5],
    [5,6],[5,8],[5,9],
    [6,7],[6,8],[6,19],
    [7,8],
    [8,9],
    [10,11],[10,12],[10,19],
    [11,12],
    [12,13],[12,19],
    [13,14],[13,15],
    [14,15],
    [15,16],
    [16,17],[16,18],
    [17,18],
    [18,19]
];

let adj = {};
for (let n of nodes) adj[n.id] = [];
for (let [u,v] of edges) { adj[u].push(v); adj[v].push(u); }

// Layout positions (circular with slight adjustments)
let positions = [];
function initPositions() {
    for (let i = 0; i < nodes.length; i++) {
        let angle = (TWO_PI * i / nodes.length) - HALF_PI;
        positions[i] = {
            x: 0.5 + cos(angle) * 0.38,
            y: 0.5 + sin(angle) * 0.38
        };
    }
}

// Metrics computation
let metrics = {};

function computeAllMetrics() {
    metrics['Degree'] = {};
    for (let n of nodes) metrics['Degree'][n.id] = adj[n.id].length;

    // Betweenness centrality
    metrics['Betweenness'] = {};
    for (let n of nodes) metrics['Betweenness'][n.id] = 0;
    for (let s of nodes) {
        let stack = [], pred = {}, sigma = {}, d = {}, delta = {};
        for (let n of nodes) { pred[n.id]=[]; sigma[n.id]=0; d[n.id]=-1; delta[n.id]=0; }
        sigma[s.id]=1; d[s.id]=0;
        let queue = [s.id];
        while (queue.length>0) {
            let v = queue.shift(); stack.push(v);
            for (let w of adj[v]) {
                if (d[w]<0) { queue.push(w); d[w]=d[v]+1; }
                if (d[w]===d[v]+1) { sigma[w]+=sigma[v]; pred[w].push(v); }
            }
        }
        while (stack.length>0) {
            let w = stack.pop();
            for (let v of pred[w]) delta[v]+=(sigma[v]/sigma[w])*(1+delta[w]);
            if (w!==s.id) metrics['Betweenness'][w]+=delta[w];
        }
    }
    // Normalize
    let maxB = Math.max(1,...Object.values(metrics['Betweenness']));
    for (let n of nodes) metrics['Betweenness'][n.id] = parseFloat((metrics['Betweenness'][n.id]/maxB).toFixed(3));

    // Closeness centrality
    metrics['Closeness'] = {};
    for (let s of nodes) {
        let d = {};
        for (let n of nodes) d[n.id] = -1;
        d[s.id] = 0;
        let queue = [s.id];
        while (queue.length>0) {
            let v = queue.shift();
            for (let w of adj[v]) {
                if (d[w]<0) { d[w]=d[v]+1; queue.push(w); }
            }
        }
        let total = 0, reachable = 0;
        for (let n of nodes) {
            if (d[n.id]>0) { total+=d[n.id]; reachable++; }
        }
        metrics['Closeness'][s.id] = reachable>0 ? parseFloat((reachable/total).toFixed(3)) : 0;
    }

    // Clustering coefficient
    metrics['Clustering'] = {};
    for (let n of nodes) {
        let nb = adj[n.id];
        if (nb.length<2) { metrics['Clustering'][n.id]=0; continue; }
        let links = 0;
        for (let i=0;i<nb.length;i++)
            for (let j=i+1;j<nb.length;j++)
                if (adj[nb[i]].includes(nb[j])) links++;
        metrics['Clustering'][n.id] = parseFloat((2*links/(nb.length*(nb.length-1))).toFixed(3));
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    metricSelect = createSelect();
    metricSelect.position(10, drawHeight + 14);
    metricSelect.option('Degree');
    metricSelect.option('Betweenness');
    metricSelect.option('Closeness');
    metricSelect.option('Clustering');
    metricSelect.selected('Degree');
    metricSelect.changed(() => { currentMetric = metricSelect.value(); });

    initPositions();
    computeAllMetrics();

    describe('PPI topology explorer with selectable centrality metrics and histogram', LABEL);
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
    text('PPI Topology Explorer', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let halfW = canvasWidth / 2;

    // Divider
    stroke('#ccc');
    strokeWeight(1);
    line(halfW, 24, halfW, drawHeight - 6);

    // Left: Network
    drawNetwork(margin, 26, halfW - margin * 2, drawHeight - 40);

    // Right: Histogram
    drawHistogram(halfW + margin, 26, halfW - margin * 2, drawHeight - 40);

    // Metric label
    fill('#666');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Color by:', 10 + metricSelect.width + 18, drawHeight + 24);
}

function drawNetwork(px, py, pw, ph) {
    fill('#555');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Network (' + currentMetric + ')', px + pw / 2, py);
    textStyle(NORMAL);

    let netY = py + 14;
    let netH = ph - 18;
    let met = metrics[currentMetric];
    let vals = Object.values(met);
    let minV = Math.min(...vals);
    let maxV = Math.max(...vals);

    // Draw edges
    for (let [u,v] of edges) {
        let x1 = px + positions[u].x * pw;
        let y1 = netY + positions[u].y * netH;
        let x2 = px + positions[v].x * pw;
        let y2 = netY + positions[v].y * netH;
        let hov = hoveredNode >= 0 && (u === hoveredNode || v === hoveredNode);
        stroke(hov ? '#555' : '#ccc');
        strokeWeight(hov ? 2 : 1);
        line(x1, y1, x2, y2);
    }

    // Draw nodes
    hoveredNode = -1;
    for (let n of nodes) {
        let nx = px + positions[n.id].x * pw;
        let ny = netY + positions[n.id].y * netH;
        if (dist(mouseX, mouseY, nx, ny) < 14) hoveredNode = n.id;
    }

    for (let n of nodes) {
        let nx = px + positions[n.id].x * pw;
        let ny = netY + positions[n.id].y * netH;
        let v = met[n.id];
        let t = maxV > minV ? (v - minV) / (maxV - minV) : 0.5;
        let nodeColor = lerpColor(color('#BBDEFB'), color('#B71C1C'), t);
        let sz = map(t, 0, 1, 14, 26);
        let isHov = hoveredNode === n.id;

        fill(nodeColor);
        stroke(isHov ? '#333' : '#fff');
        strokeWeight(isHov ? 3 : 1.5);
        circle(nx, ny, sz + (isHov ? 4 : 0));

        fill('#333');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(6);
        textStyle(BOLD);
        text(n.name, nx, ny - sz / 2 - 6);
        textStyle(NORMAL);
    }

    // Hover tooltip
    if (hoveredNode >= 0) {
        let n = nodes[hoveredNode];
        let nx = px + positions[hoveredNode].x * pw;
        let ny = netY + positions[hoveredNode].y * netH;
        let tipLines = [n.name];
        for (let m of ['Degree','Betweenness','Closeness','Clustering']) {
            tipLines.push(m + ': ' + metrics[m][n.id]);
        }
        let tw = 110, th = tipLines.length * 12 + 8;
        let tx = nx + 10, ty = ny - th - 5;
        if (tx + tw > px + pw) tx = nx - tw - 10;
        if (ty < py) ty = ny + 15;

        fill(0,0,0,210);
        noStroke();
        rect(tx, ty, tw, th, 4);
        fill(255);
        textAlign(LEFT, TOP);
        textSize(8);
        for (let i = 0; i < tipLines.length; i++) {
            textStyle(i===0 ? BOLD : NORMAL);
            text(tipLines[i], tx+5, ty+4+i*12);
        }
        textStyle(NORMAL);
    }

    // Color scale bar
    let barX = px + 4;
    let barY = py + ph - 18;
    let barW = pw - 8;
    for (let i = 0; i < barW; i++) {
        let t = i / barW;
        stroke(lerpColor(color('#BBDEFB'), color('#B71C1C'), t));
        line(barX + i, barY, barX + i, barY + 8);
    }
    fill('#888');
    noStroke();
    textSize(7);
    textAlign(LEFT, TOP);
    text(minV.toFixed(1), barX, barY + 10);
    textAlign(RIGHT, TOP);
    text(maxV.toFixed(1), barX + barW, barY + 10);
    textAlign(CENTER, TOP);
    text(currentMetric, barX + barW / 2, barY + 10);
}

function drawHistogram(px, py, pw, ph) {
    fill('#555');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    textStyle(BOLD);
    text(currentMetric + ' Distribution', px + pw / 2, py);
    textStyle(NORMAL);

    let met = metrics[currentMetric];
    let vals = nodes.map(n => met[n.id]);

    // Bin the values
    let minV = Math.min(...vals);
    let maxV = Math.max(...vals);
    let nBins = Math.min(10, Math.ceil(Math.sqrt(vals.length)));
    if (maxV === minV) { maxV = minV + 1; nBins = 1; }
    let binW = (maxV - minV) / nBins;
    let bins = new Array(nBins).fill(0);

    for (let v of vals) {
        let b = Math.floor((v - minV) / binW);
        if (b >= nBins) b = nBins - 1;
        bins[b]++;
    }

    let maxCount = Math.max(1, ...bins);

    // Chart area
    let chartL = px + 35;
    let chartR = px + pw - 10;
    let chartT = py + 30;
    let chartB = py + ph - 30;
    let chartW = chartR - chartL;
    let chartH = chartB - chartT;

    // Grid lines
    stroke('#eee');
    strokeWeight(0.5);
    for (let t = 1; t <= 4; t++) {
        let y = chartB - (t / 4) * chartH;
        line(chartL, y, chartR, y);
    }

    // Axes
    stroke('#999');
    strokeWeight(1);
    line(chartL, chartB, chartR, chartB);
    line(chartL, chartB, chartL, chartT);

    // Bars
    let bw = chartW / nBins;
    for (let i = 0; i < nBins; i++) {
        let bx = chartL + i * bw;
        let bh = (bins[i] / maxCount) * chartH;
        let t = i / Math.max(1, nBins - 1);
        fill(lerpColor(color('#BBDEFB'), color('#B71C1C'), t));
        noStroke();
        rect(bx + 1, chartB - bh, bw - 2, bh);

        // Count label
        if (bins[i] > 0) {
            fill('#333');
            textAlign(CENTER, BOTTOM);
            textSize(8);
            text(bins[i], bx + bw / 2, chartB - bh - 2);
        }

        // Bin label
        fill('#888');
        textAlign(CENTER, TOP);
        textSize(7);
        let binLabel = (minV + i * binW).toFixed(1);
        text(binLabel, bx + bw / 2, chartB + 3);
    }

    // Highlight bin for hovered node
    if (hoveredNode >= 0) {
        let v = met[hoveredNode];
        let b = Math.floor((v - minV) / binW);
        if (b >= nBins) b = nBins - 1;
        let bx = chartL + b * bw;
        let bh = (bins[b] / maxCount) * chartH;
        noFill();
        stroke('#E65100');
        strokeWeight(2.5);
        rect(bx, chartB - bh, bw, bh);

        // Value indicator
        fill('#E65100');
        noStroke();
        textSize(9);
        textAlign(CENTER, BOTTOM);
        text(nodes[hoveredNode].name + ': ' + v, bx + bw / 2, chartB - bh - 14);
    }

    // Axis labels
    fill('#888');
    noStroke();
    textSize(8);
    textAlign(CENTER, TOP);
    text(currentMetric, (chartL + chartR) / 2, chartB + 15);

    push();
    translate(px + 10, (chartT + chartB) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('Count', 0, 0);
    pop();

    // Y-axis ticks
    textAlign(RIGHT, CENTER);
    textSize(7);
    fill('#888');
    for (let t = 0; t <= 4; t++) {
        let val = Math.round(maxCount * t / 4);
        let ty = chartB - (t / 4) * chartH;
        text(val, chartL - 3, ty);
    }

    // Summary stats
    let mean = vals.reduce((a,b)=>a+b,0) / vals.length;
    let sorted = [...vals].sort((a,b)=>a-b);
    let median = sorted[Math.floor(sorted.length/2)];

    let sy = chartB + 28;
    fill('#555');
    textSize(8);
    textAlign(LEFT, TOP);
    text('Mean: ' + mean.toFixed(2) + '  Median: ' + median.toFixed(2) + '  Range: [' + minV.toFixed(1) + ', ' + maxV.toFixed(1) + ']', px + 10, sy);
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
