// Variation Graph
// Directed graph showing reference path, SNP, insertion, deletion paths
// Toggle to show/hide read paths
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let showReads = false;
let readToggle, resetBtn;

// Graph nodes (sequence segments of a small genomic region)
// Reference: ATG -> GCC -> TAA -> CGT -> GAT
const graphNodesData = [
    { id: 'start', label: 'START', x: 0.06, y: 0.40, type: 'anchor' },
    { id: 'n1', label: 'ATG', x: 0.20, y: 0.40, type: 'ref' },
    { id: 'n2', label: 'GCC', x: 0.38, y: 0.40, type: 'ref' },
    { id: 'n2snp', label: 'GTC', x: 0.38, y: 0.22, type: 'snp' },     // SNP: C→T
    { id: 'n3', label: 'TAA', x: 0.56, y: 0.40, type: 'ref' },
    { id: 'n3ins', label: 'CGA', x: 0.56, y: 0.62, type: 'ins' },     // Insertion
    { id: 'n4', label: 'CGT', x: 0.74, y: 0.40, type: 'ref' },
    { id: 'n5', label: 'GAT', x: 0.88, y: 0.40, type: 'ref' },
    { id: 'end', label: 'END', x: 0.96, y: 0.40, type: 'anchor' }
];

// Edges with types
const graphEdgesData = [
    // Reference path
    { from: 'start', to: 'n1', type: 'ref' },
    { from: 'n1', to: 'n2', type: 'ref' },
    { from: 'n2', to: 'n3', type: 'ref' },
    { from: 'n3', to: 'n4', type: 'ref' },
    { from: 'n4', to: 'n5', type: 'ref' },
    { from: 'n5', to: 'end', type: 'ref' },

    // SNP variant: n1 → n2snp → n3 (alternative to n2)
    { from: 'n1', to: 'n2snp', type: 'snp' },
    { from: 'n2snp', to: 'n3', type: 'snp' },

    // Insertion: n3 → n3ins → n4
    { from: 'n3', to: 'n3ins', type: 'ins' },
    { from: 'n3ins', to: 'n4', type: 'ins' },

    // Deletion: n2 → n4 (skip n3)
    { from: 'n2', to: 'n4', type: 'del' }
];

// Read paths (sequences of node IDs)
const readPaths = [
    { id: 'Read 1', path: ['start','n1','n2','n3','n4','n5','end'], type: 'ref', desc: 'Matches reference' },
    { id: 'Read 2', path: ['start','n1','n2snp','n3','n4','n5','end'], type: 'snp', desc: 'Carries SNP (C→T)' },
    { id: 'Read 3', path: ['start','n1','n2','n3','n3ins','n4','n5','end'], type: 'ins', desc: 'Has insertion (CGA)' },
    { id: 'Read 4', path: ['start','n1','n2','n4','n5','end'], type: 'del', desc: 'Has deletion (skips TAA)' },
    { id: 'Read 5', path: ['start','n1','n2snp','n3','n3ins','n4','n5','end'], type: 'multi', desc: 'SNP + insertion' }
];

const typeColors = {
    ref: '#00897B',
    snp: '#E65100',
    ins: '#6A1B9A',
    del: '#C62828',
    anchor: '#546E7A',
    multi: '#1565C0'
};

let activeRead = -1;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    readToggle = createCheckbox('Show Read Paths', false);
    readToggle.position(10, drawHeight + 8);
    readToggle.changed(() => {
        showReads = readToggle.checked();
        if (!showReads) activeRead = -1;
    });

    resetBtn = createButton('Reset');
    resetBtn.position(160, drawHeight + 8);
    resetBtn.mousePressed(() => {
        showReads = false;
        readToggle.checked(false);
        activeRead = -1;
    });

    describe('Variation graph showing reference, SNP, insertion, and deletion paths in a genomic region', LABEL);
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
    text('Variation Graph', canvasWidth / 2, 4);
    textStyle(NORMAL);

    // Graph area
    let gx = margin;
    let gy = 50;
    let gw = canvasWidth - margin * 2;
    let gh = 200;

    // Draw edges
    for (let e of graphEdgesData) {
        let fromNode = graphNodesData.find(n => n.id === e.from);
        let toNode = graphNodesData.find(n => n.id === e.to);
        let x1 = gx + fromNode.x * gw;
        let y1 = gy + fromNode.y * gh;
        let x2 = gx + toNode.x * gw;
        let y2 = gy + toNode.y * gh;

        let col = typeColors[e.type];
        let highlighted = activeRead >= 0 && isEdgeInRead(e, readPaths[activeRead]);

        stroke(highlighted ? '#333' : col);
        strokeWeight(highlighted ? 4 : (e.type === 'ref' ? 3 : 2));

        if (e.type === 'del') {
            // Deletion: draw curved line above
            noFill();
            let midY = Math.min(y1, y2) - 30;
            bezier(x1, y1, x1 + (x2 - x1) * 0.3, midY, x1 + (x2 - x1) * 0.7, midY, x2, y2);
        } else {
            line(x1, y1, x2, y2);
        }

        // Arrow
        drawArrow(x1, y1, x2, y2, col, e.type === 'del');
    }

    // Draw nodes
    let nodeR = 32;
    for (let n of graphNodesData) {
        let nx = gx + n.x * gw;
        let ny = gy + n.y * gh;

        let col = typeColors[n.type];
        let isActive = activeRead >= 0 && readPaths[activeRead].path.includes(n.id);

        if (n.type === 'anchor') {
            fill('#ECEFF1');
            stroke('#78909C');
            strokeWeight(1.5);
            circle(nx, ny, 20);
            fill('#546E7A');
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(7);
            textStyle(BOLD);
            text(n.label, nx, ny);
            textStyle(NORMAL);
        } else {
            fill(isActive ? lerpColor(color(col), color(255), 0.2) : col);
            stroke(isActive ? '#333' : lerpColor(color(col), color(0), 0.3));
            strokeWeight(isActive ? 3 : 2);
            rect(nx - nodeR / 2, ny - 14, nodeR, 28, 6);

            fill(255);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(12);
            textStyle(BOLD);
            text(n.label, nx, ny);
            textStyle(NORMAL);
        }
    }

    // Path type labels
    let labelY = gy + gh + 20;
    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Path Types:', margin, labelY);
    textStyle(NORMAL);

    let pathTypes = [
        { label: 'Reference', color: typeColors.ref, dash: false },
        { label: 'SNP (C\u2192T)', color: typeColors.snp, dash: false },
        { label: 'Insertion', color: typeColors.ins, dash: false },
        { label: 'Deletion (skip)', color: typeColors.del, dash: false }
    ];

    let lx = margin;
    let ly = labelY + 18;
    for (let pt of pathTypes) {
        stroke(pt.color);
        strokeWeight(3);
        line(lx, ly + 5, lx + 20, ly + 5);
        fill('#333');
        noStroke();
        textSize(9);
        textAlign(LEFT, CENTER);
        text(pt.label, lx + 24, ly + 5);
        lx += textWidth(pt.label) + 36;
    }

    // Read paths section
    if (showReads) {
        let readY = ly + 25;
        fill('#333');
        noStroke();
        textAlign(LEFT, TOP);
        textSize(11);
        textStyle(BOLD);
        text('Read Alignments (click to highlight):', margin, readY);
        textStyle(NORMAL);

        readY += 18;
        for (let i = 0; i < readPaths.length; i++) {
            let rp = readPaths[i];
            let isActive = activeRead === i;
            let ry = readY + i * 40;

            // Read label
            fill(isActive ? '#E65100' : '#333');
            textSize(10);
            textStyle(BOLD);
            textAlign(LEFT, TOP);
            text(rp.id + ': ' + rp.desc, margin, ry);
            textStyle(NORMAL);

            // Draw read path as connected boxes
            let rpx = margin;
            let rpy = ry + 14;
            for (let j = 0; j < rp.path.length; j++) {
                let nodeData = graphNodesData.find(n => n.id === rp.path[j]);
                let col = typeColors[nodeData.type];
                let boxW = nodeData.type === 'anchor' ? 24 : 28;

                fill(isActive ? col : lerpColor(color(col), color('#E0E0E0'), 0.5));
                stroke(isActive ? lerpColor(color(col), color(0), 0.3) : '#bbb');
                strokeWeight(1);
                rect(rpx, rpy, boxW, 16, 3);

                fill(isActive ? 255 : '#666');
                noStroke();
                textAlign(CENTER, CENTER);
                textSize(7);
                text(nodeData.label, rpx + boxW / 2, rpy + 8);

                // Arrow to next
                if (j < rp.path.length - 1) {
                    fill(isActive ? '#333' : '#bbb');
                    triangle(rpx + boxW + 2, rpy + 5, rpx + boxW + 2, rpy + 11, rpx + boxW + 7, rpy + 8);
                }

                rpx += boxW + 9;
            }
        }
    }

    // Read select label
    fill('#888');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(9);
    text('Toggle reads to see how different variants align to the graph', 240, drawHeight + 18);
}

function drawArrow(x1, y1, x2, y2, col, curved) {
    let t = 0.8;
    let ax, ay;
    if (curved) {
        let midY = Math.min(y1, y2) - 30;
        ax = bezierPoint(x1, x1 + (x2 - x1) * 0.3, x1 + (x2 - x1) * 0.7, x2, t);
        ay = bezierPoint(y1, midY, midY, y2, t);
    } else {
        ax = lerp(x1, x2, t);
        ay = lerp(y1, y2, t);
    }
    let angle = atan2(y2 - ay, x2 - ax);
    fill(col);
    noStroke();
    push();
    translate(ax, ay);
    rotate(angle);
    triangle(-6, -3, -6, 3, 0, 0);
    pop();
}

function isEdgeInRead(edge, readPath) {
    let path = readPath.path;
    for (let i = 0; i < path.length - 1; i++) {
        if (path[i] === edge.from && path[i + 1] === edge.to) return true;
    }
    return false;
}

function mousePressed() {
    if (!showReads || mouseY > drawHeight) return;

    // Check if clicking on a read path line
    let labelBaseY = 50 + 200 + 20 + 18 + 25 + 18;
    for (let i = 0; i < readPaths.length; i++) {
        let ry = labelBaseY + i * 40;
        if (mouseY >= ry && mouseY <= ry + 34 && mouseX >= margin && mouseX < canvasWidth - margin) {
            activeRead = (activeRead === i) ? -1 : i;
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
