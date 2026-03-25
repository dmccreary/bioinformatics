// BFS vs DFS Traversal Comparison
// Side-by-side animation on the same graph
// BFS uses queue (blue), DFS uses stack (red)
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let stepBtn, playBtn, resetBtn, speedSlider;
let playing = false;
let lastStepTime = 0;

// Graph definition: 8 nodes with adjacency
const graphNodes = [
    { id: 0, label: 'A', rx: 0.5, ry: 0.12 },
    { id: 1, label: 'B', rx: 0.25, ry: 0.32 },
    { id: 2, label: 'C', rx: 0.75, ry: 0.32 },
    { id: 3, label: 'D', rx: 0.12, ry: 0.55 },
    { id: 4, label: 'E', rx: 0.42, ry: 0.55 },
    { id: 5, label: 'F', rx: 0.58, ry: 0.55 },
    { id: 6, label: 'G', rx: 0.88, ry: 0.55 },
    { id: 7, label: 'H', rx: 0.5, ry: 0.78 }
];

const graphEdges = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5], [2, 6],
    [4, 7], [5, 7]
];

// Adjacency list
let adj = {};
for (let n of graphNodes) adj[n.id] = [];
for (let [u, v] of graphEdges) {
    adj[u].push(v);
    adj[v].push(u);
}
// Sort neighbors for deterministic traversal
for (let k in adj) adj[k].sort((a, b) => a - b);

// BFS state
let bfsVisited = [];
let bfsQueue = [];
let bfsOrder = {};
let bfsDone = false;

// DFS state
let dfsVisited = [];
let dfsStack = [];
let dfsOrder = {};
let dfsDone = false;

let stepCount = 0;

function initTraversals() {
    bfsVisited = [];
    bfsQueue = [0];
    bfsOrder = {};
    bfsDone = false;

    dfsVisited = [];
    dfsStack = [0];
    dfsOrder = {};
    dfsDone = false;

    stepCount = 0;
    playing = false;
    if (playBtn) playBtn.html('Play');
}

function stepBFS() {
    if (bfsDone || bfsQueue.length === 0) { bfsDone = true; return; }
    let current = bfsQueue.shift();
    if (bfsVisited.includes(current)) {
        stepBFS(); // skip already visited, try next
        return;
    }
    bfsVisited.push(current);
    bfsOrder[current] = bfsVisited.length;
    for (let nb of adj[current]) {
        if (!bfsVisited.includes(nb) && !bfsQueue.includes(nb)) {
            bfsQueue.push(nb);
        }
    }
}

function stepDFS() {
    if (dfsDone || dfsStack.length === 0) { dfsDone = true; return; }
    let current = dfsStack.pop();
    if (dfsVisited.includes(current)) {
        stepDFS(); // skip already visited, try next
        return;
    }
    dfsVisited.push(current);
    dfsOrder[current] = dfsVisited.length;
    // Push neighbors in reverse so smallest is on top
    let neighbors = [...adj[current]].reverse();
    for (let nb of neighbors) {
        if (!dfsVisited.includes(nb)) {
            dfsStack.push(nb);
        }
    }
}

function doStep() {
    stepBFS();
    stepDFS();
    stepCount++;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    stepBtn = createButton('Step');
    stepBtn.position(10, drawHeight + 12);
    stepBtn.mousePressed(() => {
        if (!bfsDone || !dfsDone) doStep();
    });

    playBtn = createButton('Play');
    playBtn.position(70, drawHeight + 12);
    playBtn.mousePressed(() => {
        playing = !playing;
        playBtn.html(playing ? 'Pause' : 'Play');
    });

    resetBtn = createButton('Reset');
    resetBtn.position(135, drawHeight + 12);
    resetBtn.mousePressed(() => {
        initTraversals();
    });

    speedSlider = createSlider(200, 1500, 700, 50);
    speedSlider.position(260, drawHeight + 15);
    speedSlider.size(canvasWidth - 280 - margin);

    initTraversals();
    describe('Side-by-side BFS and DFS traversal animation on the same graph', LABEL);
}

function draw() {
    updateCanvasSize();

    // Auto-step
    if (playing && millis() - lastStepTime > speedSlider.value()) {
        if (!bfsDone || !dfsDone) {
            doStep();
            lastStepTime = millis();
        } else {
            playing = false;
            playBtn.html('Play');
        }
    }

    // Background
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
    textSize(18);
    textStyle(BOLD);
    text('BFS vs DFS Traversal', canvasWidth / 2, 6);
    textStyle(NORMAL);

    let halfW = canvasWidth / 2;
    let panelTop = 30;
    let panelH = drawHeight - panelTop - 60;

    // Divider line
    stroke(200);
    strokeWeight(1);
    line(halfW, panelTop, halfW, panelTop + panelH + 40);

    // BFS panel (left)
    drawPanel(margin, panelTop, halfW - margin * 1.5, panelH,
              'BFS (Queue)', '#2979FF', bfsVisited, bfsOrder, bfsQueue, 'Queue');

    // DFS panel (right)
    drawPanel(halfW + margin * 0.5, panelTop, halfW - margin * 1.5, panelH,
              'DFS (Stack)', '#D32F2F', dfsVisited, dfsOrder, dfsStack, 'Stack');

    // Speed label
    fill('#555');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text('Speed: ' + speedSlider.value() + 'ms', 200, drawHeight + 25);
}

function drawPanel(px, py, pw, ph, title, col, visited, order, frontier, frontierLabel) {
    // Panel title
    fill(col);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text(title, px + pw / 2, py);
    textStyle(NORMAL);

    let graphTop = py + 22;
    let graphH = ph - 50;
    let nodeR = min(20, pw * 0.08);

    // Draw edges
    for (let [u, v] of graphEdges) {
        let nu = graphNodes[u];
        let nv = graphNodes[v];
        let x1 = px + nu.rx * pw;
        let y1 = graphTop + nu.ry * graphH;
        let x2 = px + nv.rx * pw;
        let y2 = graphTop + nv.ry * graphH;

        let bothVisited = visited.includes(u) && visited.includes(v);
        stroke(bothVisited ? col : '#ccc');
        strokeWeight(bothVisited ? 2.5 : 1);
        line(x1, y1, x2, y2);
    }

    // Draw nodes
    for (let n of graphNodes) {
        let nx = px + n.rx * pw;
        let ny = graphTop + n.ry * graphH;
        let isVisited = visited.includes(n.id);
        let isFrontier = frontier.includes(n.id) && !isVisited;

        if (isVisited) {
            fill(col);
            stroke(col);
            strokeWeight(2);
        } else if (isFrontier) {
            fill(255, 255, 200);
            stroke(col);
            strokeWeight(2);
        } else {
            fill(240);
            stroke(180);
            strokeWeight(1);
        }
        circle(nx, ny, nodeR * 2);

        // Label
        fill(isVisited ? 255 : 60);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(n.label, nx, ny);
        textStyle(NORMAL);

        // Visit order number
        if (order[n.id] !== undefined) {
            fill(255);
            noStroke();
            textSize(9);
            textAlign(CENTER, CENTER);
            text(order[n.id], nx + nodeR + 6, ny - nodeR - 2);
        }
    }

    // Frontier display
    let fY = graphTop + graphH + 10;
    fill('#555');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    textStyle(BOLD);
    text(frontierLabel + ':', px + 4, fY);
    textStyle(NORMAL);

    let fStr = '[' + frontier.map(id => graphNodes[id].label).join(', ') + ']';
    fill(col);
    textSize(11);
    text(fStr, px + 50, fY);

    // Visited display
    fill('#555');
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Visited:', px + 4, fY + 16);
    textStyle(NORMAL);
    fill(col);
    text(visited.map(id => graphNodes[id].label).join(' -> '), px + 50, fY + 16);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    speedSlider.size(canvasWidth - 280 - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}
