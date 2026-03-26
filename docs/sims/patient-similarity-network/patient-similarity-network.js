// Patient Similarity Network — p5.js MicroSim
// Three stages: 1) data matrix, 2) similarity heatmap, 3) force-directed network.
// Button steps through stages.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

let stageBtn, resetBtn;
let currentStage = 0;

// 12 patients, 6 features
const nPatients = 12;
const nFeatures = 6;
const patientNames = ['P01','P02','P03','P04','P05','P06','P07','P08','P09','P10','P11','P12'];
const featureNames = ['Gene1','Gene2','Gene3','Metab1','Metab2','Protein1'];

// Data matrix (normalised values 0-1) — designed so 3 clusters emerge
// Cluster A (P01-P04): high Gene1,Gene2, low Gene3
// Cluster B (P05-P08): high Gene3,Metab1
// Cluster C (P09-P12): high Metab2,Protein1
const dataMatrix = [
    [0.9, 0.8, 0.1, 0.3, 0.2, 0.1], // P01 - cluster A
    [0.85,0.75,0.15,0.25,0.18,0.12], // P02
    [0.82,0.9, 0.2, 0.2, 0.15,0.08], // P03
    [0.88,0.78,0.12,0.35,0.22,0.15], // P04
    [0.2, 0.15,0.85,0.9, 0.3, 0.1],  // P05 - cluster B
    [0.18,0.2, 0.9, 0.82,0.25,0.15], // P06
    [0.25,0.1, 0.78,0.88,0.35,0.08], // P07
    [0.15,0.22,0.82,0.85,0.28,0.12], // P08
    [0.1, 0.15,0.2, 0.15,0.9, 0.85], // P09 - cluster C
    [0.12,0.1, 0.18,0.2, 0.85,0.9],  // P10
    [0.08,0.2, 0.15,0.1, 0.88,0.82], // P11
    [0.15,0.18,0.22,0.18,0.82,0.88]  // P12
];

// Compute similarity matrix (cosine similarity)
let simMatrix = [];
function computeSimilarity() {
    simMatrix = [];
    for (let i = 0; i < nPatients; i++) {
        simMatrix[i] = [];
        for (let j = 0; j < nPatients; j++) {
            let dot = 0, magA = 0, magB = 0;
            for (let f = 0; f < nFeatures; f++) {
                dot += dataMatrix[i][f] * dataMatrix[j][f];
                magA += dataMatrix[i][f] * dataMatrix[i][f];
                magB += dataMatrix[j][f] * dataMatrix[j][f];
            }
            simMatrix[i][j] = dot / (Math.sqrt(magA) * Math.sqrt(magB));
        }
    }
}

// Cluster assignments (known)
const clusters = [0,0,0,0,1,1,1,1,2,2,2,2];
const clusterColors = ['#2980B9', '#E67E22', '#27AE60'];
const clusterNames = ['Cluster A', 'Cluster B', 'Cluster C'];

// Network positions (force-directed precomputed)
let netPositions = [];
let netVelocities = [];
let layoutDone = false;
let layoutIter = 0;

function initNetwork() {
    netPositions = [];
    netVelocities = [];
    for (let i = 0; i < nPatients; i++) {
        let angle = (clusters[i] * TWO_PI / 3) + random(-0.3, 0.3);
        let r = 0.15 + random(0.05);
        netPositions.push({
            x: 0.5 + cos(angle) * r,
            y: 0.5 + sin(angle) * r
        });
        netVelocities.push({ x: 0, y: 0 });
    }
    layoutDone = false;
    layoutIter = 0;
}

function stepNetworkLayout() {
    let repulsion = 0.003;
    let attraction = 0.05;
    let damping = 0.85;
    let threshold = 0.7; // similarity threshold for edges

    for (let i = 0; i < nPatients; i++) {
        let fx = 0, fy = 0;
        for (let j = 0; j < nPatients; j++) {
            if (i === j) continue;
            let dx = netPositions[i].x - netPositions[j].x;
            let dy = netPositions[i].y - netPositions[j].y;
            let d = Math.sqrt(dx * dx + dy * dy) + 0.001;
            // Repulsion
            let fr = repulsion / (d * d);
            fx += (dx / d) * fr;
            fy += (dy / d) * fr;
            // Attraction for similar nodes
            if (simMatrix[i][j] > threshold) {
                let fa = (d - 0.08) * attraction * simMatrix[i][j];
                fx -= (dx / d) * fa;
                fy -= (dy / d) * fa;
            }
        }
        // Center gravity
        fx += (0.5 - netPositions[i].x) * 0.01;
        fy += (0.5 - netPositions[i].y) * 0.01;

        netVelocities[i].x = (netVelocities[i].x + fx * 0.3) * damping;
        netVelocities[i].y = (netVelocities[i].y + fy * 0.3) * damping;
    }

    let totalMov = 0;
    for (let i = 0; i < nPatients; i++) {
        netPositions[i].x += netVelocities[i].x;
        netPositions[i].y += netVelocities[i].y;
        netPositions[i].x = constrain(netPositions[i].x, 0.1, 0.9);
        netPositions[i].y = constrain(netPositions[i].y, 0.1, 0.9);
        totalMov += abs(netVelocities[i].x) + abs(netVelocities[i].y);
    }
    layoutIter++;
    if (totalMov < 0.001 || layoutIter > 300) layoutDone = true;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    computeSimilarity();
    initNetwork();

    stageBtn = createButton('Next Stage');
    stageBtn.position(margin, drawHeight + 10);
    stageBtn.mousePressed(() => {
        currentStage = (currentStage + 1) % 3;
        if (currentStage === 2) initNetwork();
    });

    resetBtn = createButton('Reset');
    resetBtn.position(margin + 100, drawHeight + 10);
    resetBtn.mousePressed(() => {
        currentStage = 0;
        initNetwork();
    });

    textFont('Arial');
    describe('Patient similarity network construction from data matrix through heatmap to force-directed graph', LABEL);
}

function draw() {
    updateCanvasSize();
    background('aliceblue');

    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('#1a1a1a');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    let stageTitles = ['Stage 1: Patient Data Matrix', 'Stage 2: Similarity Heatmap', 'Stage 3: Patient Similarity Network'];
    text(stageTitles[currentStage], canvasWidth / 2, 4);
    textStyle(NORMAL);

    let areaY = 28;
    let areaH = drawHeight - areaY - 80;

    if (currentStage === 0) {
        drawDataMatrix(margin, areaY, canvasWidth - 2 * margin, areaH);
    } else if (currentStage === 1) {
        drawHeatmap(margin, areaY, canvasWidth - 2 * margin, areaH);
    } else {
        if (!layoutDone) {
            for (let i = 0; i < 5; i++) stepNetworkLayout();
        }
        drawNetwork(margin, areaY, canvasWidth - 2 * margin, areaH);
    }

    // Description
    let descriptions = [
        'Each row is a patient, each column a molecular feature. Values are normalised expression/abundance levels. Three groups of patients have distinct molecular profiles.',
        'Cosine similarity between all patient pairs. High similarity (yellow) within clusters, low (dark blue) between clusters. This matrix reveals the block-diagonal structure.',
        'Patients connected if similarity > 0.7. Force-directed layout pushes dissimilar patients apart. Three clusters emerge naturally. Colored by cluster assignment.'
    ];
    fill('#444');
    textAlign(LEFT, TOP);
    textSize(10);
    text(descriptions[currentStage], margin, drawHeight - 70, canvasWidth - 2 * margin, 60);

    // Stage indicator
    fill('#666');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Stage ' + (currentStage + 1) + ' of 3', canvasWidth / 2 + 80, drawHeight + 22);
}

function drawDataMatrix(x, y, w, h) {
    let cellW = Math.min(40, (w - 60) / nFeatures);
    let cellH = Math.min(28, (h - 30) / nPatients);
    let startX = x + 40;
    let startY = y + 24;

    // Column headers
    textSize(8);
    fill('#555');
    textAlign(CENTER, BOTTOM);
    for (let f = 0; f < nFeatures; f++) {
        push();
        translate(startX + f * cellW + cellW / 2, startY - 4);
        rotate(-PI / 6);
        text(featureNames[f], 0, 0);
        pop();
    }

    for (let i = 0; i < nPatients; i++) {
        // Row label
        fill(clusterColors[clusters[i]]);
        textAlign(RIGHT, CENTER);
        textSize(9);
        text(patientNames[i], startX - 4, startY + i * cellH + cellH / 2);

        for (let f = 0; f < nFeatures; f++) {
            let val = dataMatrix[i][f];
            fill(lerpColor(color('#1a237e'), color('#ffeb3b'), val));
            stroke('#fff');
            strokeWeight(0.5);
            rect(startX + f * cellW, startY + i * cellH, cellW, cellH);

            fill(val > 0.5 ? '#000' : '#FFF');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(8);
            text(val.toFixed(2), startX + f * cellW + cellW / 2, startY + i * cellH + cellH / 2);
        }
    }

    // Color scale
    let scaleX = startX + nFeatures * cellW + 20;
    let scaleH = nPatients * cellH;
    for (let sy = 0; sy < scaleH; sy++) {
        let v = 1 - sy / scaleH;
        stroke(lerpColor(color('#1a237e'), color('#ffeb3b'), v));
        line(scaleX, startY + sy, scaleX + 12, startY + sy);
    }
    fill('#555');
    noStroke();
    textSize(8);
    textAlign(LEFT, TOP);
    text('1.0', scaleX + 16, startY - 2);
    textAlign(LEFT, BOTTOM);
    text('0.0', scaleX + 16, startY + scaleH + 2);
}

function drawHeatmap(x, y, w, h) {
    let cellSize = Math.min(28, (Math.min(w, h) - 40) / nPatients);
    let startX = x + 40;
    let startY = y + 40;

    // Headers
    textSize(8);
    fill('#555');
    for (let i = 0; i < nPatients; i++) {
        // Top header
        textAlign(CENTER, BOTTOM);
        push();
        translate(startX + i * cellSize + cellSize / 2, startY - 4);
        rotate(-PI / 4);
        text(patientNames[i], 0, 0);
        pop();

        // Left header
        fill(clusterColors[clusters[i]]);
        textAlign(RIGHT, CENTER);
        text(patientNames[i], startX - 4, startY + i * cellSize + cellSize / 2);
        fill('#555');
    }

    // Heatmap cells
    for (let i = 0; i < nPatients; i++) {
        for (let j = 0; j < nPatients; j++) {
            let sim = simMatrix[i][j];
            fill(lerpColor(color('#1a237e'), color('#ffeb3b'), sim));
            stroke('#fff');
            strokeWeight(0.5);
            rect(startX + j * cellSize, startY + i * cellSize, cellSize, cellSize);

            if (cellSize >= 22) {
                fill(sim > 0.6 ? '#000' : '#FFF');
                noStroke();
                textAlign(CENTER, CENTER);
                textSize(7);
                text(sim.toFixed(2), startX + j * cellSize + cellSize / 2, startY + i * cellSize + cellSize / 2);
            }
        }
    }

    // Cluster brackets
    let bracketPairs = [[0, 3, 'A'], [4, 7, 'B'], [8, 11, 'C']];
    for (let [s, e, lbl] of bracketPairs) {
        let by1 = startY + s * cellSize;
        let by2 = startY + (e + 1) * cellSize;
        stroke(clusterColors[s === 0 ? 0 : s === 4 ? 1 : 2]);
        strokeWeight(2);
        noFill();
        let bx = startX + nPatients * cellSize + 6;
        line(bx, by1, bx + 6, by1);
        line(bx + 6, by1, bx + 6, by2);
        line(bx, by2, bx + 6, by2);
        noStroke();
        fill(clusterColors[s === 0 ? 0 : s === 4 ? 1 : 2]);
        textAlign(LEFT, CENTER);
        textSize(9);
        text(lbl, bx + 10, (by1 + by2) / 2);
    }
}

function drawNetwork(x, y, w, h) {
    let threshold = 0.7;

    // Background
    fill(255, 255, 255, 100);
    stroke('#ddd');
    strokeWeight(1);
    rect(x, y, w, h, 6);

    // Draw edges
    for (let i = 0; i < nPatients; i++) {
        for (let j = i + 1; j < nPatients; j++) {
            if (simMatrix[i][j] > threshold) {
                let x1 = x + netPositions[i].x * w;
                let y1 = y + netPositions[i].y * h;
                let x2 = x + netPositions[j].x * w;
                let y2 = y + netPositions[j].y * h;
                let alpha = map(simMatrix[i][j], threshold, 1, 40, 200);
                let weight = map(simMatrix[i][j], threshold, 1, 0.5, 3);
                stroke(150, 150, 150, alpha);
                strokeWeight(weight);
                line(x1, y1, x2, y2);
            }
        }
    }

    // Draw nodes
    for (let i = 0; i < nPatients; i++) {
        let nx = x + netPositions[i].x * w;
        let ny = y + netPositions[i].y * h;

        fill(clusterColors[clusters[i]]);
        stroke(lerpColor(color(clusterColors[clusters[i]]), color(0), 0.3));
        strokeWeight(2);
        circle(nx, ny, 24);

        fill('#FFF');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        textStyle(BOLD);
        text(patientNames[i], nx, ny);
        textStyle(NORMAL);
    }

    // Legend
    let lx = x + w - 110;
    let ly = y + 10;
    fill(255, 255, 255, 220);
    stroke('#ddd');
    strokeWeight(1);
    rect(lx, ly, 100, 70, 4);

    textSize(9);
    textStyle(BOLD);
    fill('#333');
    textAlign(LEFT, TOP);
    text('Clusters', lx + 8, ly + 6);
    textStyle(NORMAL);

    for (let c = 0; c < 3; c++) {
        fill(clusterColors[c]);
        noStroke();
        circle(lx + 14, ly + 24 + c * 15, 8);
        fill('#555');
        textAlign(LEFT, CENTER);
        textSize(8);
        text(clusterNames[c], lx + 22, ly + 24 + c * 15);
    }
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
