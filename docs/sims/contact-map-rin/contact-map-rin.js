// Contact Map and Residue Interaction Network
// Left: symmetric heatmap grid; Right: circular network layout
// Click residue in either panel to highlight in both
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let selectedResidue = -1;
let resetBtn;

// 20 residues with simulated 3D distances
const N = 20;
const residueNames = [
    'M1','K2','W3','V4','T5','F6','I7','S8','L9','L10',
    'F11','S12','S13','A14','Y15','S16','R17','G18','V19','F20'
];

// Generate a plausible contact map (symmetric distance matrix)
let distMatrix = [];
let contacts = []; // pairs within threshold

function generateDistances() {
    distMatrix = [];
    contacts = [];
    // Simulate 3D positions along a folded chain
    let positions = [];
    let x = 0, y = 0, z = 0;
    for (let i = 0; i < N; i++) {
        x += Math.cos(i * 0.8) * 3 + Math.sin(i * 0.3) * 2;
        y += Math.sin(i * 0.6) * 3 + Math.cos(i * 0.5) * 1.5;
        z += Math.cos(i * 1.2) * 2;
        positions.push({ x, y, z });
    }

    for (let i = 0; i < N; i++) {
        distMatrix[i] = [];
        for (let j = 0; j < N; j++) {
            let dx = positions[i].x - positions[j].x;
            let dy = positions[i].y - positions[j].y;
            let dz = positions[i].z - positions[j].z;
            distMatrix[i][j] = Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
    }

    // Contacts: distance < 8 Angstroms (excluding |i-j| <= 1)
    for (let i = 0; i < N; i++) {
        for (let j = i + 2; j < N; j++) {
            if (distMatrix[i][j] < 8) {
                contacts.push([i, j]);
            }
        }
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    resetBtn = createButton('Reset Selection');
    resetBtn.position(10, drawHeight + 8);
    resetBtn.mousePressed(() => { selectedResidue = -1; });

    generateDistances();
    describe('Dual panel protein contact map and residue interaction network with click highlighting', LABEL);
}

function draw() {
    updateCanvasSize();

    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);
    noStroke();
    
    // Title
    fill('#1a1a1a');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(15);
    textStyle(BOLD);
    text('Contact Map & Residue Interaction Network', canvasWidth / 2, 4);
    textStyle(ITALIC);
    fill('#666');
    textSize(11);
    text('Click a cell in the matrix or a node in the network to highlight', canvasWidth / 2, 22);
    textStyle(NORMAL);

    let halfW = canvasWidth / 2;

    // Divider
    stroke('#ccc');
    strokeWeight(1);
    line(halfW, 24, halfW, drawHeight - 10);

    // Panel labels (top of each panel)
    fill('#666');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text('Contact Map (distance heatmap)', halfW / 2, 38);
    text('Residue Interaction Network', halfW + halfW / 2, 38);
    textStyle(NORMAL);

    // Left panel: Contact Map Heatmap
    drawContactMap(margin, 58, halfW - margin * 2, drawHeight - 70);

    // Right panel: Circular Network
    drawNetwork(halfW + margin, 58, halfW - margin * 2, drawHeight - 70);
}

function drawContactMap(px, py, pw, ph) {
    let gridSize = Math.min(pw, ph - 30);
    let cellSize = gridSize / N;
    let gx = px + (pw - gridSize) / 2;
    let gy = py + 20;

    // Subtitle
    fill('#555');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Distance (Angstroms)', px + pw / 2, py);

    // Max distance for color mapping
    let maxDist = 0;
    for (let i = 0; i < N; i++)
        for (let j = 0; j < N; j++)
            if (distMatrix[i][j] > maxDist) maxDist = distMatrix[i][j];

    // Draw cells
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            let d = distMatrix[i][j];
            let t = d / maxDist;
            // Close = dark blue, far = white
            let c;
            if (d < 8) {
                c = lerpColor(color('#0D47A1'), color('#42A5F5'), t * 3);
            } else {
                c = lerpColor(color('#90CAF9'), color('#F5F5F5'), (t - 0.3) / 0.7);
            }

            // Highlight row/col of selected residue
            let highlighted = (selectedResidue === i || selectedResidue === j);
            if (highlighted && selectedResidue >= 0) {
                c = lerpColor(c, color('#FFD54F'), 0.4);
            }

            fill(c);
            if (selectedResidue >= 0 && i === selectedResidue && j === selectedResidue) {
                stroke('#E65100');
                strokeWeight(2);
            } else {
                noStroke();
            }
            rect(gx + j * cellSize, gy + i * cellSize, cellSize, cellSize);
        }
    }

    // Grid border
    noFill();
    stroke('#999');
    strokeWeight(1);
    rect(gx, gy, gridSize, gridSize);

    // Residue labels (every other one for space)
    fill('#555');
    noStroke();
    textSize(Math.min(7, cellSize * 0.9));
    textAlign(RIGHT, CENTER);
    for (let i = 0; i < N; i += 2) {
        text(residueNames[i], gx - 2, gy + i * cellSize + cellSize / 2);
    }
    textAlign(CENTER, TOP);
    for (let j = 0; j < N; j += 2) {
        push();
        translate(gx + j * cellSize + cellSize / 2, gy + gridSize + 2);
        rotate(HALF_PI * 0.7);
        textAlign(LEFT, CENTER);
        text(residueNames[j], 0, 0);
        pop();
    }

    // Store grid bounds for click detection
    this._cmBounds = { gx, gy, gridSize, cellSize };
}

function drawNetwork(px, py, pw, ph) {
    let cx = px + pw / 2;
    let cy = py + ph / 2;
    let r = Math.min(pw, ph) * 0.37;

    // Node positions (circular layout)
    let nodePos = [];
    for (let i = 0; i < N; i++) {
        let angle = (TWO_PI * i / N) - HALF_PI;
        nodePos.push({
            x: cx + cos(angle) * r,
            y: cy + sin(angle) * r
        });
    }

    // Draw edges (contacts)
    for (let [i, j] of contacts) {
        let highlighted = (selectedResidue === i || selectedResidue === j);
        if (highlighted && selectedResidue >= 0) {
            stroke('#E65100');
            strokeWeight(2);
        } else {
            let d = distMatrix[i][j];
            let alpha = map(d, 0, 8, 200, 50);
            stroke(100, 100, 200, alpha);
            strokeWeight(map(d, 0, 8, 2.5, 0.5));
        }
        line(nodePos[i].x, nodePos[i].y, nodePos[j].x, nodePos[j].y);
    }

    // Draw nodes
    for (let i = 0; i < N; i++) {
        let isSel = i === selectedResidue;
        // Count contacts for this residue
        let deg = 0;
        for (let [a, b] of contacts) {
            if (a === i || b === i) deg++;
        }
        let nodeSize = map(deg, 0, 8, 10, 22);

        if (isSel) {
            fill('#E65100');
            stroke('#BF360C');
            strokeWeight(3);
            nodeSize += 4;
        } else if (selectedResidue >= 0) {
            // Check if connected to selected
            let connected = contacts.some(([a, b]) =>
                (a === selectedResidue && b === i) || (b === selectedResidue && a === i));
            if (connected) {
                fill('#FF8F00');
                stroke('#E65100');
                strokeWeight(2);
            } else {
                fill('#B0BEC5');
                stroke('#78909C');
                strokeWeight(1);
            }
        } else {
            fill('#1565C0');
            stroke('#0D47A1');
            strokeWeight(1.5);
        }
        circle(nodePos[i].x, nodePos[i].y, nodeSize);

        // Label
        let labelR = r + 14;
        let angle = (TWO_PI * i / N) - HALF_PI;
        let lx = cx + cos(angle) * labelR;
        let ly = cy + sin(angle) * labelR;
        fill(isSel ? '#E65100' : '#333');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(7);
        text(residueNames[i], lx, ly);
    }

    // Store network bounds
    this._netNodePos = nodePos;
}

function mousePressed() {
    if (mouseY > drawHeight) return;

    let halfW = canvasWidth / 2;

    // Check contact map click
    if (this._cmBounds) {
        let { gx, gy, gridSize, cellSize } = this._cmBounds;
        if (mouseX >= gx && mouseX <= gx + gridSize && mouseY >= gy && mouseY <= gy + gridSize) {
            let col = Math.floor((mouseX - gx) / cellSize);
            let row = Math.floor((mouseY - gy) / cellSize);
            if (row >= 0 && row < N && col >= 0 && col < N) {
                selectedResidue = (selectedResidue === row) ? -1 : row;
                return;
            }
        }
    }

    // Check network click
    if (this._netNodePos) {
        for (let i = 0; i < N; i++) {
            let np = this._netNodePos[i];
            let d = dist(mouseX, mouseY, np.x, np.y);
            if (d < 12) {
                selectedResidue = (selectedResidue === i) ? -1 : i;
                return;
            }
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
