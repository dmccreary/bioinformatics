// Molecular Docking Graph
// Left: 2D ligand in binding pocket with interaction lines
// Right: graph representation (nodes=atoms/residues, edges=interactions)
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let selectedNode = -1;
let resetBtn;

// Protein residues around binding pocket
const residues = [
    { id: 0, name: 'ASP49', x: 0.15, y: 0.25, type: 'charged' },
    { id: 1, name: 'SER52', x: 0.10, y: 0.50, type: 'polar' },
    { id: 2, name: 'LEU78', x: 0.20, y: 0.72, type: 'hydrophobic' },
    { id: 3, name: 'PHE91', x: 0.42, y: 0.82, type: 'hydrophobic' },
    { id: 4, name: 'ARG120', x: 0.70, y: 0.78, type: 'charged' },
    { id: 5, name: 'THR143', x: 0.82, y: 0.55, type: 'polar' },
    { id: 6, name: 'TYR155', x: 0.78, y: 0.28, type: 'polar' },
    { id: 7, name: 'VAL168', x: 0.55, y: 0.18, type: 'hydrophobic' }
];

// Ligand atoms
const ligandAtoms = [
    { id: 8, name: 'N1', x: 0.38, y: 0.35, element: 'N' },
    { id: 9, name: 'C2', x: 0.48, y: 0.42, element: 'C' },
    { id: 10, name: 'O3', x: 0.55, y: 0.35, element: 'O' },
    { id: 11, name: 'C4', x: 0.45, y: 0.55, element: 'C' },
    { id: 12, name: 'O5', x: 0.35, y: 0.58, element: 'O' },
    { id: 13, name: 'C6', x: 0.58, y: 0.60, element: 'C' }
];

// Ligand bonds (internal)
const ligandBonds = [
    [8, 9], [9, 10], [9, 11], [11, 12], [11, 13]
];

// Interactions between ligand atoms and residues
const interactions = [
    { from: 8, to: 0, type: 'hbond', label: 'H-bond (2.8A)' },
    { from: 12, to: 1, type: 'hbond', label: 'H-bond (3.1A)' },
    { from: 10, to: 6, type: 'hbond', label: 'H-bond (2.9A)' },
    { from: 9, to: 7, type: 'hydrophobic', label: 'Hydrophobic' },
    { from: 11, to: 2, type: 'hydrophobic', label: 'Hydrophobic' },
    { from: 13, to: 3, type: 'hydrophobic', label: 'Hydrophobic' },
    { from: 10, to: 5, type: 'hbond', label: 'H-bond (3.0A)' },
    { from: 13, to: 4, type: 'ionic', label: 'Ionic (3.5A)' }
];

const interactionColors = {
    hbond: '#2196F3',
    hydrophobic: '#4CAF50',
    ionic: '#F44336'
};

const interactionDash = {
    hbond: [6, 4],
    hydrophobic: [2, 2],
    ionic: [8, 3]
};

const allNodes = [...residues, ...ligandAtoms];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    resetBtn = createButton('Reset Selection');
    resetBtn.position(10, drawHeight + 8);
    resetBtn.mousePressed(() => { selectedNode = -1; });

    describe('Molecular docking visualization with binding pocket and interaction graph', LABEL);
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
    text('Molecular Docking Interactions', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let halfW = canvasWidth / 2;

    // Divider
    stroke('#ccc');
    strokeWeight(1);
    line(halfW, 24, halfW, drawHeight - 10);

    // Left: Binding pocket
    drawBindingPocket(margin, 30, halfW - margin * 2, drawHeight - 60);

    // Right: Graph
    drawInteractionGraph(halfW + margin, 30, halfW - margin * 2, drawHeight - 60);

    // Legend
    drawLegend(margin, drawHeight - 26);

    // Panel labels
    fill('#666');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('Binding Pocket View', halfW / 2, 22);
    text('Interaction Graph', halfW + halfW / 2, 22);
}

function drawBindingPocket(px, py, pw, ph) {
    // Pocket background (ellipse)
    fill(240, 240, 250);
    stroke('#B0BEC5');
    strokeWeight(2);
    ellipse(px + pw / 2, py + ph / 2, pw * 0.85, ph * 0.85);

    // Pocket label
    fill('#B0BEC5');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    text('Binding Pocket', px + pw / 2, py + ph / 2 + ph * 0.38);

    // Draw interaction lines first
    for (let inter of interactions) {
        let fromNode = allNodes.find(n => n.id === inter.from);
        let toNode = allNodes.find(n => n.id === inter.to);
        let x1 = px + fromNode.x * pw;
        let y1 = py + fromNode.y * ph;
        let x2 = px + toNode.x * pw;
        let y2 = py + toNode.y * ph;

        let isHighlighted = selectedNode === inter.from || selectedNode === inter.to;
        let col = interactionColors[inter.type];

        stroke(col);
        strokeWeight(isHighlighted ? 3 : 1.5);
        drawingContext.setLineDash(interactionDash[inter.type]);
        line(x1, y1, x2, y2);
        drawingContext.setLineDash([]);
    }

    // Ligand bonds
    for (let [a, b] of ligandBonds) {
        let na = ligandAtoms.find(n => n.id === a);
        let nb = ligandAtoms.find(n => n.id === b);
        stroke('#555');
        strokeWeight(2);
        line(px + na.x * pw, py + na.y * ph, px + nb.x * pw, py + nb.y * ph);
    }

    // Draw residues
    for (let r of residues) {
        let rx = px + r.x * pw;
        let ry = py + r.y * ph;
        let isSel = selectedNode === r.id;
        let sz = isSel ? 28 : 22;

        // Background
        fill(isSel ? '#FFF3E0' : '#E8EAF6');
        stroke(isSel ? '#E65100' : '#5C6BC0');
        strokeWeight(isSel ? 2.5 : 1.5);
        rect(rx - sz / 2, ry - sz / 3, sz, sz * 0.66, 4);

        fill(isSel ? '#E65100' : '#283593');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(7);
        textStyle(BOLD);
        text(r.name, rx, ry);
        textStyle(NORMAL);
    }

    // Draw ligand atoms
    for (let la of ligandAtoms) {
        let lx = px + la.x * pw;
        let ly = py + la.y * ph;
        let isSel = selectedNode === la.id;
        let sz = isSel ? 18 : 14;

        let elemColor = la.element === 'N' ? '#1565C0' :
                        la.element === 'O' ? '#C62828' : '#424242';

        fill(isSel ? '#FFF8E1' : elemColor);
        stroke(isSel ? '#E65100' : '#222');
        strokeWeight(isSel ? 2.5 : 1.5);
        circle(lx, ly, sz);

        fill(isSel ? '#E65100' : 255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        textStyle(BOLD);
        text(la.element, lx, ly);
        textStyle(NORMAL);
    }
}

function drawInteractionGraph(px, py, pw, ph) {
    let cx = px + pw / 2;
    let cy = py + ph / 2;

    // Layout: residues in outer ring, ligand atoms in inner ring
    let outerR = Math.min(pw, ph) * 0.40;
    let innerR = Math.min(pw, ph) * 0.18;

    let nodePos = {};

    for (let i = 0; i < residues.length; i++) {
        let angle = (TWO_PI * i / residues.length) - HALF_PI;
        nodePos[residues[i].id] = {
            x: cx + cos(angle) * outerR,
            y: cy + sin(angle) * outerR
        };
    }

    for (let i = 0; i < ligandAtoms.length; i++) {
        let angle = (TWO_PI * i / ligandAtoms.length) - HALF_PI;
        nodePos[ligandAtoms[i].id] = {
            x: cx + cos(angle) * innerR,
            y: cy + sin(angle) * innerR
        };
    }

    // Ring labels
    fill('#B0BEC5');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(8);
    text('Protein', cx, cy - outerR - 10);
    text('Ligand', cx, cy - innerR - 8);

    // Draw interaction edges
    for (let inter of interactions) {
        let p1 = nodePos[inter.from];
        let p2 = nodePos[inter.to];
        let isHighlighted = selectedNode === inter.from || selectedNode === inter.to;
        let col = interactionColors[inter.type];

        stroke(col);
        strokeWeight(isHighlighted ? 3 : 1.5);
        drawingContext.setLineDash(interactionDash[inter.type]);
        line(p1.x, p1.y, p2.x, p2.y);
        drawingContext.setLineDash([]);

        // Edge label if highlighted
        if (isHighlighted) {
            let mx = (p1.x + p2.x) / 2;
            let my = (p1.y + p2.y) / 2;
            fill(col);
            noStroke();
            textSize(7);
            text(inter.label, mx, my - 6);
        }
    }

    // Ligand internal bonds
    for (let [a, b] of ligandBonds) {
        let p1 = nodePos[a];
        let p2 = nodePos[b];
        stroke('#888');
        strokeWeight(1.5);
        line(p1.x, p1.y, p2.x, p2.y);
    }

    // Draw residue nodes
    for (let r of residues) {
        let p = nodePos[r.id];
        let isSel = selectedNode === r.id;
        let sz = isSel ? 26 : 20;

        fill(isSel ? '#E65100' : '#5C6BC0');
        stroke(isSel ? '#BF360C' : '#303F9F');
        strokeWeight(isSel ? 2.5 : 1.5);
        rect(p.x - sz / 2, p.y - sz / 3, sz, sz * 0.66, 4);

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(6);
        textStyle(BOLD);
        text(r.name, p.x, p.y);
        textStyle(NORMAL);
    }

    // Draw ligand atom nodes
    for (let la of ligandAtoms) {
        let p = nodePos[la.id];
        let isSel = selectedNode === la.id;
        let sz = isSel ? 18 : 14;
        let elemColor = la.element === 'N' ? '#1565C0' :
                        la.element === 'O' ? '#C62828' : '#424242';

        fill(isSel ? '#E65100' : elemColor);
        stroke(isSel ? '#BF360C' : '#222');
        strokeWeight(isSel ? 2.5 : 1.5);
        circle(p.x, p.y, sz);

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        textStyle(BOLD);
        text(la.element, p.x, p.y);
        textStyle(NORMAL);
    }

    // Store positions for clicking
    this._graphNodePos = nodePos;
}

function drawLegend(lx, ly) {
    let items = [
        { label: 'H-bond', color: interactionColors.hbond, dash: interactionDash.hbond },
        { label: 'Hydrophobic', color: interactionColors.hydrophobic, dash: interactionDash.hydrophobic },
        { label: 'Ionic', color: interactionColors.ionic, dash: interactionDash.ionic }
    ];

    let x = lx;
    for (let item of items) {
        stroke(item.color);
        strokeWeight(2);
        drawingContext.setLineDash(item.dash);
        line(x, ly + 6, x + 20, ly + 6);
        drawingContext.setLineDash([]);

        fill('#555');
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(9);
        text(item.label, x + 24, ly + 6);
        x += textWidth(item.label) + 38;
    }
}

function mousePressed() {
    if (mouseY > drawHeight) return;

    let halfW = canvasWidth / 2;

    // Check left panel (binding pocket)
    if (mouseX < halfW) {
        let pw = halfW - margin * 2;
        let ph = drawHeight - 60;
        for (let n of allNodes) {
            let nx = margin + n.x * pw;
            let ny = 30 + n.y * ph;
            if (dist(mouseX, mouseY, nx, ny) < 14) {
                selectedNode = (selectedNode === n.id) ? -1 : n.id;
                return;
            }
        }
    }

    // Check right panel (graph)
    if (this._graphNodePos) {
        for (let n of allNodes) {
            let p = this._graphNodePos[n.id];
            if (p && dist(mouseX, mouseY, p.x, p.y) < 14) {
                selectedNode = (selectedNode === n.id) ? -1 : n.id;
                return;
            }
        }
    }

    selectedNode = -1;
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
