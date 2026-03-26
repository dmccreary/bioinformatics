// Bipartite Metabolic Sub-network (Glycolysis)
// Enzymes (circles, teal) on left, Metabolites (squares, orange) on right
// Hover highlights connected edges and partner nodes
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 0;
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Enzymes (left column)
const enzymes = [
    { id: 'E1', label: 'Hexokinase',        desc: 'Phosphorylates glucose to glucose-6-phosphate using ATP' },
    { id: 'E2', label: 'PGI',               desc: 'Phosphoglucose isomerase: converts G6P to fructose-6-phosphate' },
    { id: 'E3', label: 'PFK-1',             desc: 'Phosphofructokinase-1: key regulatory step, phosphorylates F6P' },
    { id: 'E4', label: 'Aldolase',           desc: 'Cleaves fructose-1,6-bisphosphate into DHAP and G3P' },
    { id: 'E5', label: 'GAPDH',             desc: 'Glyceraldehyde-3-phosphate dehydrogenase: oxidizes G3P' },
    { id: 'E6', label: 'Pyruvate\nKinase',  desc: 'Final step: converts PEP to pyruvate, producing ATP' }
];

// Metabolites (right column)
const metabolites = [
    { id: 'M1', label: 'Glucose',        desc: 'Starting substrate, a 6-carbon sugar' },
    { id: 'M2', label: 'G6P',            desc: 'Glucose-6-phosphate' },
    { id: 'M3', label: 'F6P',            desc: 'Fructose-6-phosphate' },
    { id: 'M4', label: 'F1,6BP',         desc: 'Fructose-1,6-bisphosphate' },
    { id: 'M5', label: 'G3P',            desc: 'Glyceraldehyde-3-phosphate' },
    { id: 'M6', label: '1,3BPG',         desc: '1,3-Bisphosphoglycerate' },
    { id: 'M7', label: 'PEP',            desc: 'Phosphoenolpyruvate' },
    { id: 'M8', label: 'Pyruvate',       desc: 'End product of glycolysis, enters TCA cycle or fermentation' }
];

// Edges: enzyme -> metabolites it connects (substrate, product)
const connections = [
    { enzyme: 'E1', metabolite: 'M1', role: 'substrate' },
    { enzyme: 'E1', metabolite: 'M2', role: 'product' },
    { enzyme: 'E2', metabolite: 'M2', role: 'substrate' },
    { enzyme: 'E2', metabolite: 'M3', role: 'product' },
    { enzyme: 'E3', metabolite: 'M3', role: 'substrate' },
    { enzyme: 'E3', metabolite: 'M4', role: 'product' },
    { enzyme: 'E4', metabolite: 'M4', role: 'substrate' },
    { enzyme: 'E4', metabolite: 'M5', role: 'product' },
    { enzyme: 'E5', metabolite: 'M5', role: 'substrate' },
    { enzyme: 'E5', metabolite: 'M6', role: 'product' },
    { enzyme: 'E6', metabolite: 'M7', role: 'substrate' },
    { enzyme: 'E6', metabolite: 'M8', role: 'product' }
];

let hoveredNode = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    describe('Bipartite graph of glycolysis enzymes and metabolites with hover highlighting', LABEL);
}

function draw() {
    updateCanvasSize();

    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Title
    fill('#1a1a1a');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Glycolysis: Bipartite Network', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Column headers
    textSize(13);
    fill('#00897B');
    textStyle(BOLD);
    text('Enzymes', canvasWidth * 0.25, 34);
    fill('#E65100');
    text('Metabolites', canvasWidth * 0.75, 34);
    textStyle(NORMAL);

    let topY = 58;
    let usableH = drawHeight - topY - 60;

    // Calculate positions
    let ePositions = {};
    let mPositions = {};
    let eColX = canvasWidth * 0.25;
    let mColX = canvasWidth * 0.75;
    let eSpacing = usableH / (enzymes.length);
    let mSpacing = usableH / (metabolites.length);

    for (let i = 0; i < enzymes.length; i++) {
        ePositions[enzymes[i].id] = { x: eColX, y: topY + eSpacing * (i + 0.5) };
    }
    for (let i = 0; i < metabolites.length; i++) {
        mPositions[metabolites[i].id] = { x: mColX, y: topY + mSpacing * (i + 0.5) };
    }

    // Detect hover
    hoveredNode = null;
    let nodeR = min(22, canvasWidth * 0.04);
    let sqSize = nodeR * 1.6;

    for (let e of enzymes) {
        let p = ePositions[e.id];
        if (dist(mouseX, mouseY, p.x, p.y) < nodeR + 5) hoveredNode = e.id;
    }
    for (let m of metabolites) {
        let p = mPositions[m.id];
        if (abs(mouseX - p.x) < sqSize / 2 + 5 && abs(mouseY - p.y) < sqSize / 2 + 5) hoveredNode = m.id;
    }

    // Get connected nodes for highlighting
    let connectedNodes = new Set();
    let connectedEdges = new Set();
    if (hoveredNode) {
        connectedNodes.add(hoveredNode);
        for (let i = 0; i < connections.length; i++) {
            let c = connections[i];
            if (c.enzyme === hoveredNode || c.metabolite === hoveredNode) {
                connectedNodes.add(c.enzyme);
                connectedNodes.add(c.metabolite);
                connectedEdges.add(i);
            }
        }
    }

    // Draw edges
    for (let i = 0; i < connections.length; i++) {
        let c = connections[i];
        let ep = ePositions[c.enzyme];
        let mp = mPositions[c.metabolite];
        let isHighlighted = connectedEdges.has(i);
        let isDimmed = hoveredNode && !isHighlighted;

        if (isDimmed) {
            stroke(220);
            strokeWeight(1);
        } else if (isHighlighted) {
            stroke(c.role === 'substrate' ? '#00897B' : '#E65100');
            strokeWeight(3);
        } else {
            stroke(180);
            strokeWeight(1.5);
        }
        line(ep.x + nodeR, ep.y, mp.x - sqSize / 2, mp.y);
    }

    // Draw enzyme nodes (circles, teal)
    for (let e of enzymes) {
        let p = ePositions[e.id];
        let isConn = connectedNodes.has(e.id);
        let isDimmed = hoveredNode && !isConn;

        if (isDimmed) {
            fill(220);
            stroke(200);
        } else {
            fill(isConn ? '#00897B' : '#80CBC4');
            stroke('#00695C');
        }
        strokeWeight(isConn ? 2.5 : 1.5);
        circle(p.x, p.y, nodeR * 2);

        fill(isDimmed ? 180 : (isConn ? 255 : 30));
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(e.label, p.x, p.y);
        textStyle(NORMAL);
    }

    // Draw metabolite nodes (squares, orange)
    for (let m of metabolites) {
        let p = mPositions[m.id];
        let isConn = connectedNodes.has(m.id);
        let isDimmed = hoveredNode && !isConn;

        if (isDimmed) {
            fill(220);
            stroke(200);
        } else {
            fill(isConn ? '#E65100' : '#FFB74D');
            stroke('#BF360C');
        }
        strokeWeight(isConn ? 2.5 : 1.5);
        rectMode(CENTER);
        rect(p.x, p.y, sqSize, sqSize, 4);
        rectMode(CORNER);

        fill(isDimmed ? 180 : (isConn ? 255 : 30));
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(m.label, p.x, p.y);
        textStyle(NORMAL);
    }

    // Info panel at bottom
    if (hoveredNode) {
        let info = enzymes.find(e => e.id === hoveredNode) || metabolites.find(m => m.id === hoveredNode);
        if (info) {
            let panelY = drawHeight - 50;
            fill(255, 255, 255, 230);
            stroke(200);
            strokeWeight(1);
            rect(margin, panelY, canvasWidth - margin * 2, 42, 6);

            fill('#1a1a1a');
            noStroke();
            textAlign(LEFT, TOP);
            textSize(12);
            textStyle(BOLD);
            text(info.label.replace('\n', ' '), margin + 10, panelY + 5);
            textStyle(NORMAL);
            fill('#555');
            textSize(11);
            text(info.desc, margin + 10, panelY + 22, canvasWidth - margin * 2 - 20, 30);
        }
    } else {
        let panelY = drawHeight - 50;
        fill(255, 255, 255, 180);
        stroke(200);
        strokeWeight(1);
        rect(margin, panelY, canvasWidth - margin * 2, 42, 6);
        fill('#888');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Hover over an enzyme or metabolite to see connections', canvasWidth / 2, panelY + 21);
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
