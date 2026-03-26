// Network Model Comparison: ER Random, BA Scale-Free, WS Small-World
// Three panels with degree distribution bar charts below each
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 10;

let generateBtn;
let erSlider, baSlider, wsSlider;
let N = 30; // nodes per network

// Graph data for each model
let erGraph, baGraph, wsGraph;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    generateBtn = createButton('Generate');
    generateBtn.position(10, drawHeight + 8);
    generateBtn.mousePressed(generateAll);

    // ER probability slider
    erSlider = createSlider(0.05, 0.4, 0.12, 0.01);

    // BA m parameter slider
    baSlider = createSlider(1, 5, 2, 1);

    // WS rewiring probability slider
    wsSlider = createSlider(0.0, 0.5, 0.1, 0.02);

    erSlider.input(generateER_graph);
    baSlider.input(generateBA_graph);
    wsSlider.input(generateWS_graph);

    positionSliders();

    generateAll();
    describe('Three network models side by side: Erdos-Renyi, Barabasi-Albert, Watts-Strogatz with degree distributions', LABEL);
}

function generateAll() {
    generateER_graph();
    generateBA_graph();
    generateWS_graph();
}

function generateER_graph() {
    erGraph = generateER(N, erSlider.value());
    layoutCircular(erGraph);
}

function generateBA_graph() {
    baGraph = generateBA(N, baSlider.value());
    layoutCircular(baGraph);
}

function generateWS_graph() {
    wsGraph = generateWS(N, 4, wsSlider.value());
    layoutCircular(wsGraph);
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
    text('Network Model Comparison', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let pw = (canvasWidth - margin * 4) / 3;
    let networkH = 250;
    let chartH = 120;
    let topY = 24;

    // Three panels
    let panels = [
        { graph: erGraph, title: 'Erdos-Renyi', subtitle: 'p=' + erSlider.value().toFixed(2), col: '#2979FF', x: margin },
        { graph: baGraph, title: 'Barabasi-Albert', subtitle: 'm=' + baSlider.value(), col: '#D32F2F', x: margin * 2 + pw },
        { graph: wsGraph, title: 'Watts-Strogatz', subtitle: 'p=' + wsSlider.value().toFixed(2), col: '#388E3C', x: margin * 3 + pw * 2 }
    ];

    for (let p of panels) {
        drawNetworkPanel(p.x, topY, pw, networkH, p.graph, p.title, p.subtitle, p.col);
        drawDegreeChart(p.x, topY + networkH + 10, pw, chartH, p.graph, p.col);
    }

    // Divider lines
    stroke(210);
    strokeWeight(1);
    for (let i = 1; i < 3; i++) {
        let dx = margin + pw * i + margin * i - margin * 0.5;
        line(dx, topY, dx, topY + networkH + chartH + 20);
    }

    // Slider labels
    let btnW = 75;
    let sliderArea = canvasWidth - btnW - margin;
    let sliderW = sliderArea / 3;
    let labelPad = 35;

    fill('#555');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text('ER p:', btnW + margin, drawHeight + 18);
    text('BA m:', btnW + margin + sliderW, drawHeight + 18);
    text('WS p:', btnW + margin + sliderW * 2, drawHeight + 18);

    // Second row labels
    textSize(11);
    fill('#888');
    text('ER: ' + erSlider.value().toFixed(2), btnW + margin + labelPad, drawHeight + 38);
    text('BA: ' + baSlider.value(), btnW + margin + sliderW + labelPad, drawHeight + 38);
    text('WS: ' + wsSlider.value().toFixed(2), btnW + margin + sliderW * 2 + labelPad, drawHeight + 38);
}

function drawNetworkPanel(px, py, pw, ph, graph, title, subtitle, col) {
    // Title
    fill(col);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text(title, px + pw / 2, py);
    textStyle(NORMAL);
    fill('#888');
    textSize(10);
    text(subtitle, px + pw / 2, py + 15);

    let cx = px + pw / 2;
    let cy = py + ph / 2 + 10;
    let r = min(pw, ph) * 0.38;

    // Draw edges
    for (let e of graph.edges) {
        let n1 = graph.nodes[e[0]];
        let n2 = graph.nodes[e[1]];
        let x1 = cx + n1.x * r;
        let y1 = cy + n1.y * r;
        let x2 = cx + n2.x * r;
        let y2 = cy + n2.y * r;
        stroke(200);
        strokeWeight(0.5);
        line(x1, y1, x2, y2);
    }

    // Draw nodes
    let maxDeg = max(1, ...graph.degrees);
    for (let i = 0; i < graph.nodes.length; i++) {
        let n = graph.nodes[i];
        let nx = cx + n.x * r;
        let ny = cy + n.y * r;
        let sz = map(graph.degrees[i], 0, maxDeg, 4, 12);

        fill(col);
        noStroke();
        circle(nx, ny, sz);
    }
}

function drawDegreeChart(px, py, pw, ph, graph, col) {
    // Compute degree distribution
    let degCount = {};
    for (let d of graph.degrees) {
        degCount[d] = (degCount[d] || 0) + 1;
    }
    let maxDeg = max(1, ...graph.degrees);
    let maxCount = max(1, ...Object.values(degCount));

    // Chart area
    let chartL = px + 25;
    let chartR = px + pw - 5;
    let chartT = py + 5;
    let chartB = py + ph - 15;
    let chartW = chartR - chartL;
    let chartH = chartB - chartT;

    // Axes
    stroke(180);
    strokeWeight(1);
    line(chartL, chartB, chartR, chartB);
    line(chartL, chartB, chartL, chartT);

    // Bars
    let barW = max(2, chartW / (maxDeg + 2));
    for (let d = 0; d <= maxDeg; d++) {
        let count = degCount[d] || 0;
        if (count === 0) continue;
        let bh = (count / maxCount) * chartH * 0.9;
        let bx = chartL + (d / (maxDeg + 1)) * chartW;

        fill(col);
        noStroke();
        rect(bx, chartB - bh, barW * 0.8, bh);
    }

    // Labels
    fill('#888');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(8);
    text('Degree', chartL + chartW / 2, chartB + 3);
    push();
    translate(px + 8, chartT + chartH / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('Count', 0, 0);
    pop();
}

// --- Graph generators ---

function generateER(n, p) {
    let nodes = [];
    let edges = [];
    let degrees = new Array(n).fill(0);

    for (let i = 0; i < n; i++) nodes.push({ x: 0, y: 0 });
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (random() < p) {
                edges.push([i, j]);
                degrees[i]++;
                degrees[j]++;
            }
        }
    }
    return { nodes, edges, degrees };
}

function generateBA(n, m) {
    let nodes = [];
    let edges = [];
    let degrees = new Array(n).fill(0);

    // Start with a clique of m+1 nodes
    let init = m + 1;
    for (let i = 0; i < n; i++) nodes.push({ x: 0, y: 0 });
    for (let i = 0; i < init; i++) {
        for (let j = i + 1; j < init; j++) {
            edges.push([i, j]);
            degrees[i]++;
            degrees[j]++;
        }
    }

    // Add remaining nodes with preferential attachment
    for (let i = init; i < n; i++) {
        let targets = new Set();
        let totalDeg = degrees.reduce((a, b) => a + b, 0);
        let attempts = 0;
        while (targets.size < m && attempts < 1000) {
            let r = random() * totalDeg;
            let cum = 0;
            for (let j = 0; j < i; j++) {
                cum += degrees[j];
                if (cum >= r) {
                    targets.add(j);
                    break;
                }
            }
            attempts++;
        }
        for (let t of targets) {
            edges.push([i, t]);
            degrees[i]++;
            degrees[t]++;
        }
    }
    return { nodes, edges, degrees };
}

function generateWS(n, k, beta) {
    let nodes = [];
    let edges = [];
    let degrees = new Array(n).fill(0);
    let edgeSet = new Set();

    for (let i = 0; i < n; i++) nodes.push({ x: 0, y: 0 });

    // Ring lattice
    for (let i = 0; i < n; i++) {
        for (let j = 1; j <= k / 2; j++) {
            let target = (i + j) % n;
            let key = min(i, target) + '-' + max(i, target);
            if (!edgeSet.has(key)) {
                edgeSet.add(key);
                edges.push([i, target]);
                degrees[i]++;
                degrees[target]++;
            }
        }
    }

    // Rewire with probability beta
    for (let i = 0; i < edges.length; i++) {
        if (random() < beta) {
            let u = edges[i][0];
            let oldV = edges[i][1];
            let newV;
            let attempts = 0;
            do {
                newV = floor(random(n));
                attempts++;
            } while ((newV === u || edgeSet.has(min(u, newV) + '-' + max(u, newV))) && attempts < 100);

            if (attempts < 100) {
                let oldKey = min(u, oldV) + '-' + max(u, oldV);
                edgeSet.delete(oldKey);
                degrees[oldV]--;
                edges[i][1] = newV;
                let newKey = min(u, newV) + '-' + max(u, newV);
                edgeSet.add(newKey);
                degrees[newV]++;
            }
        }
    }
    return { nodes, edges, degrees };
}

function layoutCircular(graph) {
    let n = graph.nodes.length;
    for (let i = 0; i < n; i++) {
        let angle = (TWO_PI * i) / n - HALF_PI;
        graph.nodes[i].x = cos(angle);
        graph.nodes[i].y = sin(angle);
    }
}

function positionSliders() {
    let btnW = 75;
    let sliderArea = canvasWidth - btnW - margin;
    let sliderW = sliderArea / 3;
    let labelPad = 35;
    let sliderSize = sliderW - labelPad - 5;

    erSlider.position(btnW + margin + labelPad, drawHeight + 8);
    erSlider.size(sliderSize);
    baSlider.position(btnW + margin + sliderW + labelPad, drawHeight + 8);
    baSlider.size(sliderSize);
    wsSlider.position(btnW + margin + sliderW * 2 + labelPad, drawHeight + 8);
    wsSlider.size(sliderSize);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    positionSliders();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
