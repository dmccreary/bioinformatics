// De Bruijn Graph Construction
// Input DNA sequence, slider for k, decompose into k-mers, draw graph
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let seqInput, kSlider, resetBtn, buildBtn;
let currentSeq = 'ATGGCGTGCA';
let currentK = 4;
let graphNodes = [];
let graphEdges = [];
let nodePositions = {};
let kmerList = [];

function buildGraph() {
    currentSeq = seqInput.value().toUpperCase().replace(/[^ACGT]/g, '');
    if (currentSeq.length < 2) currentSeq = 'ATGGCGTGCA';
    seqInput.value(currentSeq);
    currentK = kSlider.value();

    // Extract k-mers
    kmerList = [];
    for (let i = 0; i <= currentSeq.length - currentK; i++) {
        kmerList.push(currentSeq.substring(i, i + currentK));
    }

    // Build de Bruijn graph: nodes are (k-1)-mers, edges are k-mers
    let nodeSet = new Set();
    graphEdges = [];

    for (let kmer of kmerList) {
        let prefix = kmer.substring(0, currentK - 1);
        let suffix = kmer.substring(1, currentK);
        nodeSet.add(prefix);
        nodeSet.add(suffix);
        graphEdges.push({ from: prefix, to: suffix, label: kmer });
    }

    graphNodes = Array.from(nodeSet);

    // Layout nodes in a circle
    nodePositions = {};
    let n = graphNodes.length;
    for (let i = 0; i < n; i++) {
        let angle = (TWO_PI * i / n) - HALF_PI;
        nodePositions[graphNodes[i]] = {
            x: 0.5 + cos(angle) * 0.36,
            y: 0.5 + sin(angle) * 0.36
        };
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    seqInput = createInput('ATGGCGTGCA');
    seqInput.position(10, drawHeight + 8);
    seqInput.size(120);
    seqInput.attribute('placeholder', 'DNA sequence');

    kSlider = createSlider(3, 7, 4, 1);
    kSlider.position(145, drawHeight + 10);
    kSlider.size(70);

    buildBtn = createButton('Build');
    buildBtn.position(225, drawHeight + 8);
    buildBtn.mousePressed(buildGraph);

    resetBtn = createButton('Reset');
    resetBtn.position(280, drawHeight + 8);
    resetBtn.mousePressed(() => {
        seqInput.value('ATGGCGTGCA');
        kSlider.value(4);
        buildGraph();
    });

    buildGraph();
    describe('De Bruijn graph construction from DNA k-mers with adjustable k parameter', LABEL);
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
    text('De Bruijn Graph Construction', canvasWidth / 2, 4);
    textStyle(NORMAL);

    // Sequence display
    let seqY = 26;
    fill('#555');
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Sequence: ', margin, seqY);
    textStyle(NORMAL);

    // Draw colored sequence
    let sx = margin + textWidth('Sequence: ');
    textSize(12);
    textStyle(BOLD);
    let baseColors = { 'A': '#2E7D32', 'T': '#C62828', 'G': '#1565C0', 'C': '#E65100' };
    for (let i = 0; i < currentSeq.length; i++) {
        fill(baseColors[currentSeq[i]] || '#333');
        text(currentSeq[i], sx, seqY);
        sx += textWidth(currentSeq[i]) + 1;
    }
    textStyle(NORMAL);

    // K-mer decomposition
    let kmerY = seqY + 20;
    fill('#555');
    textSize(9);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('k=' + currentK + ' | k-mers (' + kmerList.length + '):', margin, kmerY);
    textStyle(NORMAL);

    // Show k-mers in a row
    let kx = margin;
    let ky = kmerY + 14;
    textSize(9);
    for (let i = 0; i < kmerList.length; i++) {
        let km = kmerList[i];
        let w = textWidth(km) + 8;
        if (kx + w > canvasWidth - margin) {
            kx = margin;
            ky += 16;
        }
        fill('#E3F2FD');
        stroke('#90CAF9');
        strokeWeight(1);
        rect(kx, ky, w, 14, 3);
        fill('#1565C0');
        noStroke();
        textAlign(CENTER, CENTER);
        text(km, kx + w / 2, ky + 7);
        kx += w + 4;
    }

    // Prefix/suffix explanation
    let expY = ky + 24;
    fill('#888');
    textAlign(LEFT, TOP);
    textSize(8);
    text('Nodes = (k-1)-mers (prefixes & suffixes) | Edges = k-mers connecting prefix → suffix', margin, expY);

    // Graph area
    let graphY = expY + 16;
    let graphH = drawHeight - graphY - 6;
    let graphW = canvasWidth - margin * 2;

    // Draw edges (with arrows)
    for (let e of graphEdges) {
        let p1 = nodePositions[e.from];
        let p2 = nodePositions[e.to];
        if (!p1 || !p2) continue;

        let x1 = margin + p1.x * graphW;
        let y1 = graphY + p1.y * graphH;
        let x2 = margin + p2.x * graphW;
        let y2 = graphY + p2.y * graphH;

        // Self-loop
        if (e.from === e.to) {
            noFill();
            stroke('#78909C');
            strokeWeight(1.5);
            let r = 20;
            arc(x1, y1 - r, r * 2, r * 2, PI * 0.8, PI * 2.2);
            // Label
            fill('#E65100');
            noStroke();
            textAlign(CENTER, BOTTOM);
            textSize(7);
            text(e.label, x1, y1 - r * 2 - 2);
            continue;
        }

        // Check for parallel edges (same from/to)
        let parallel = graphEdges.filter(e2 => e2.from === e.from && e2.to === e.to);
        let idx = parallel.indexOf(e);
        let offset = (idx - (parallel.length - 1) / 2) * 8;

        // Offset perpendicular to edge direction
        let dx = x2 - x1, dy = y2 - y1;
        let len = Math.sqrt(dx * dx + dy * dy);
        let nx = -dy / len * offset;
        let ny = dx / len * offset;

        let mx = (x1 + x2) / 2 + nx;
        let my = (y1 + y2) / 2 + ny;

        // Draw curved edge
        noFill();
        stroke('#78909C');
        strokeWeight(1.5);
        bezier(x1, y1, mx, my, mx, my, x2, y2);

        // Arrow at endpoint
        let t = 0.85;
        let ax = bezierPoint(x1, mx, mx, x2, t);
        let ay = bezierPoint(y1, my, my, y2, t);
        let bx = bezierPoint(x1, mx, mx, x2, t + 0.05);
        let by = bezierPoint(y1, my, my, y2, t + 0.05);
        let angle = atan2(by - ay, bx - ax);

        fill('#78909C');
        noStroke();
        push();
        translate(bx, by);
        rotate(angle);
        triangle(-8, -4, -8, 4, 0, 0);
        pop();

        // Edge label
        fill('#E65100');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(7);
        textStyle(BOLD);
        text(e.label, mx, my - 8);
        textStyle(NORMAL);
    }

    // Draw nodes
    let nodeR = Math.min(28, graphW / graphNodes.length * 0.6);
    for (let nodeName of graphNodes) {
        let p = nodePositions[nodeName];
        if (!p) continue;
        let nx = margin + p.x * graphW;
        let ny = graphY + p.y * graphH;

        // Count in/out degree
        let inDeg = graphEdges.filter(e => e.to === nodeName).length;
        let outDeg = graphEdges.filter(e => e.from === nodeName).length;

        fill('#1565C0');
        stroke('#0D47A1');
        strokeWeight(2);
        circle(nx, ny, nodeR);

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(Math.min(9, nodeR * 0.35));
        textStyle(BOLD);
        text(nodeName, nx, ny);
        textStyle(NORMAL);

        // Degree annotation
        fill('#888');
        textSize(6);
        text('in:' + inDeg + ' out:' + outDeg, nx, ny + nodeR / 2 + 8);
    }

    // Stats
    fill('#555');
    noStroke();
    textAlign(LEFT, BOTTOM);
    textSize(9);
    text('Nodes: ' + graphNodes.length + ' | Edges: ' + graphEdges.length, margin, drawHeight - 4);

    // K slider label
    fill('#666');
    textAlign(LEFT, CENTER);
    textSize(10);
    text('k=' + kSlider.value(), 145 + 75, drawHeight + 18);

    // Second row instructions
    fill('#999');
    textSize(8);
    textAlign(LEFT, TOP);
    text('Enter DNA sequence and adjust k, then click Build', 10, drawHeight + 34);
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
