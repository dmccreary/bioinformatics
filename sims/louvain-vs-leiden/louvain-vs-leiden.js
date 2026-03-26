// Louvain vs Leiden — p5.js MicroSim
// Side-by-side comparison. Left: Louvain with disconnected community (red highlight).
// Right: Leiden with refinement fixing it. Buttons step through algorithm phases.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;

// Graph: 20 nodes, 3 communities
const graphNodes = [];
const graphEdges = [];

// Community 1 (0-6): dense cluster, top-left
const c1Nodes = [
    { id: 0, x: 0.12, y: 0.20 }, { id: 1, x: 0.22, y: 0.15 },
    { id: 2, x: 0.18, y: 0.30 }, { id: 3, x: 0.28, y: 0.28 },
    { id: 4, x: 0.08, y: 0.35 }, { id: 5, x: 0.25, y: 0.40 },
    { id: 6, x: 0.15, y: 0.45 }
];

// Community 2 (7-12): will show disconnection in Louvain
const c2Nodes = [
    { id: 7, x: 0.55, y: 0.15 }, { id: 8, x: 0.65, y: 0.20 },
    { id: 9, x: 0.55, y: 0.35 }, { id: 10, x: 0.68, y: 0.33 },
    { id: 11, x: 0.78, y: 0.18 }, { id: 12, x: 0.82, y: 0.35 }
];

// Community 3 (13-19): bottom
const c3Nodes = [
    { id: 13, x: 0.30, y: 0.65 }, { id: 14, x: 0.42, y: 0.60 },
    { id: 15, x: 0.55, y: 0.62 }, { id: 16, x: 0.38, y: 0.75 },
    { id: 17, x: 0.50, y: 0.78 }, { id: 18, x: 0.65, y: 0.72 },
    { id: 19, x: 0.72, y: 0.60 }
];

c1Nodes.concat(c2Nodes, c3Nodes).forEach(n => graphNodes.push(n));

// Community 1 internal edges (dense)
const c1Edges = [[0,1],[0,2],[1,2],[1,3],[2,3],[2,4],[3,5],[4,6],[5,6],[4,2],[0,4]];
// Community 2 internal edges — note 7-8 and 11-12 form two sub-clusters
// connected only through 9-10 (a bridge that Louvain may aggregate incorrectly)
const c2Edges = [[7,8],[7,9],[8,10],[9,10],[11,12],[10,12],[11,10]];
// Community 3 internal edges
const c3Edges = [[13,14],[14,15],[13,16],[14,16],[15,17],[16,17],[15,18],[17,18],[15,19],[18,19]];
// Inter-community edges (sparse)
const interEdges = [[3,7],[5,13],[6,16],[10,15],[12,19]];

c1Edges.concat(c2Edges, c3Edges, interEdges).forEach(e => graphEdges.push(e));

// Louvain communities (with known flaw: c2 sub-cluster disconnected within community)
const louvainComm = {};
c1Nodes.forEach(n => louvainComm[n.id] = 0);
// Louvain incorrectly merges 7,8 into community 0 and keeps 9-12 as community 1
[7, 8].forEach(id => louvainComm[id] = 0);
[9, 10, 11, 12].forEach(id => louvainComm[id] = 1);
c3Nodes.forEach(n => louvainComm[n.id] = 2);

// Leiden communities (correct: full c2 stays together)
const leidenComm = {};
c1Nodes.forEach(n => leidenComm[n.id] = 0);
c2Nodes.forEach(n => leidenComm[n.id] = 1);
c3Nodes.forEach(n => leidenComm[n.id] = 2);

const commColors = ['#2980B9', '#E67E22', '#27AE60'];
const commNames = ['Community 1', 'Community 2', 'Community 3'];

let phaseBtn, resetBtn;
let currentPhase = 0;
const phases = [
    { name: 'Initial Graph', desc: 'All nodes uncolored. Both algorithms start with each node in its own community.' },
    { name: 'Local Moving', desc: 'Louvain: greedily move nodes to neighbor community that maximizes modularity. Leiden: same, but random node order.' },
    { name: 'Community Result', desc: 'Louvain: nodes 7,8 merged into blue community (disconnected from rest). Leiden: community 2 stays connected (orange).' },
    { name: 'Leiden Refinement', desc: 'Leiden adds a refinement phase that checks each community is internally connected. Disconnected sub-communities are split and re-assigned.' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    phaseBtn = createButton('Next Phase');
    phaseBtn.position(margin, drawHeight + 10);
    phaseBtn.mousePressed(() => {
        if (currentPhase < phases.length - 1) currentPhase++;
    });

    resetBtn = createButton('Reset');
    resetBtn.position(margin + 100, drawHeight + 10);
    resetBtn.mousePressed(() => { currentPhase = 0; });

    textFont('Arial');
    describe('Side-by-side comparison of Louvain and Leiden community detection algorithms', LABEL);
}

function draw() {
    updateCanvasSize();
    background('aliceblue');

    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    let halfW = (canvasWidth - 3 * margin) / 2;
    let graphY = 60;
    let graphH = drawHeight - graphY - 100;

    // Title
    fill('#1a1a1a');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text('Louvain vs Leiden Community Detection', canvasWidth / 2, 4);
    textStyle(NORMAL);

    // Phase info
    textSize(11);
    fill('#555');
    text('Phase ' + (currentPhase + 1) + ': ' + phases[currentPhase].name, canvasWidth / 2, 22);

    // Panel headers
    textSize(12);
    textStyle(BOLD);
    fill('#C0392B');
    text('Louvain', margin + halfW / 2, 42);
    fill('#27AE60');
    text('Leiden', margin * 2 + halfW + halfW / 2, 42);
    textStyle(NORMAL);

    // Draw left panel (Louvain)
    drawGraphPanel(margin, graphY, halfW, graphH, 'louvain');

    // Draw right panel (Leiden)
    drawGraphPanel(margin * 2 + halfW, graphY, halfW, graphH, 'leiden');

    // Description
    fill('#333');
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(NORMAL);
    let descY = graphY + graphH + 10;
    text(phases[currentPhase].desc, margin, descY, canvasWidth - 2 * margin, 50);

    // Highlight the problem in Louvain at phase 2+
    if (currentPhase >= 2) {
        fill('#C0392B');
        textAlign(LEFT, TOP);
        textSize(9);
        textStyle(BOLD);
        text('⚠ Louvain flaw: nodes 7,8 merged into blue community but disconnected from it!',
            margin, descY + 52, halfW + margin, 30);
        textStyle(NORMAL);

        if (currentPhase >= 3) {
            fill('#27AE60');
            text('✓ Leiden refinement keeps all communities internally connected.',
                margin * 2 + halfW, descY + 52, halfW, 30);
        }
    }

    // Phase label
    fill('#666');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Phase ' + (currentPhase + 1) + '/' + phases.length, canvasWidth / 2 + 80, drawHeight + 22);
}

function drawGraphPanel(px, py, pw, ph, algorithm) {
    // Background
    fill(255, 255, 255, 180);
    stroke('#ccc');
    strokeWeight(1);
    rect(px, py, pw, ph, 6);

    let comm = algorithm === 'louvain' ? louvainComm : leidenComm;

    // Draw edges
    for (let [u, v] of graphEdges) {
        let x1 = px + graphNodes[u].x * pw;
        let y1 = py + graphNodes[u].y * ph;
        let x2 = px + graphNodes[v].x * pw;
        let y2 = py + graphNodes[v].y * ph;

        let isInter = (currentPhase >= 2) && (comm[u] !== comm[v]);

        if (currentPhase >= 2) {
            stroke(isInter ? '#ddd' : '#888');
            strokeWeight(isInter ? 0.8 : 1.5);
        } else {
            stroke('#B0BEC5');
            strokeWeight(1);
        }
        line(x1, y1, x2, y2);
    }

    // Highlight disconnection in Louvain phase 2+
    if (algorithm === 'louvain' && currentPhase >= 2) {
        // Draw red circle around disconnected nodes 7,8
        noFill();
        stroke('#E74C3C');
        strokeWeight(2);
        setLineDash([4, 3]);
        let cx = px + (graphNodes[7].x + graphNodes[8].x) / 2 * pw;
        let cy = py + (graphNodes[7].y + graphNodes[8].y) / 2 * ph;
        ellipse(cx, cy, 70, 50);
        setLineDash([]);

        // Label
        fill('#E74C3C');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        textStyle(BOLD);
        text('disconnected!', cx, cy - 30);
        textStyle(NORMAL);
    }

    // Draw nodes
    for (let n of graphNodes) {
        let nx = px + n.x * pw;
        let ny = py + n.y * ph;

        if (currentPhase >= 2) {
            let c = comm[n.id];
            fill(commColors[c]);
            stroke(lerpColor(color(commColors[c]), color(0), 0.3));
            strokeWeight(1.5);
        } else if (currentPhase === 1) {
            // Partial coloring during local moving
            let progress = (frameCount % 120) / 120;
            let c = comm[n.id];
            if (n.id / graphNodes.length < progress) {
                fill(commColors[c]);
                stroke(lerpColor(color(commColors[c]), color(0), 0.3));
            } else {
                fill('#BDC3C7');
                stroke('#95A5A6');
            }
            strokeWeight(1.5);
        } else {
            fill('#BDC3C7');
            stroke('#95A5A6');
            strokeWeight(1.5);
        }

        circle(nx, ny, 16);

        // Label
        fill('#FFF');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(8);
        text(n.id, nx, ny);
    }
}

function setLineDash(list) {
    drawingContext.setLineDash(list);
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
