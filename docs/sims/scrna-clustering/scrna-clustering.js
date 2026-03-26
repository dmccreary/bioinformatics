// scRNA-seq Clustering
// UMAP-style 2D scatter of ~200 simulated cells, 5 clusters
// Toggle between Cluster view and Trajectory view
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let viewSelect, regenerateBtn;
let currentView = 'Cluster';
let hoveredCell = -1;

const clusterColors = ['#1565C0', '#C62828', '#2E7D32', '#E65100', '#6A1B9A'];
const cellTypes = [
    'T Cells',
    'B Cells',
    'Monocytes',
    'NK Cells',
    'Dendritic Cells'
];

let cells = [];

function generateCells() {
    cells = [];
    // 5 cluster centers in UMAP space
    let centers = [
        { x: 0.25, y: 0.30 },
        { x: 0.70, y: 0.25 },
        { x: 0.20, y: 0.72 },
        { x: 0.75, y: 0.68 },
        { x: 0.50, y: 0.50 }
    ];
    let sizes = [50, 45, 40, 35, 30]; // cells per cluster

    for (let c = 0; c < 5; c++) {
        for (let i = 0; i < sizes[c]; i++) {
            // Random position around center with Gaussian-like spread
            let angle = Math.random() * TWO_PI;
            let r = (Math.random() + Math.random() + Math.random()) / 3 * 0.12;
            cells.push({
                x: centers[c].x + Math.cos(angle) * r,
                y: centers[c].y + Math.sin(angle) * r,
                cluster: c,
                // Pseudotime: distance along a trajectory curve
                pseudotime: 0
            });
        }
    }

    // Compute pseudotime based on a trajectory: cluster 4 → 0 → 1 and 4 → 2 → 3
    let trajectoryOrder = [4, 0, 1, 2, 3];
    for (let cell of cells) {
        let idx = trajectoryOrder.indexOf(cell.cluster);
        let baseTime = idx * 0.2;
        cell.pseudotime = baseTime + (Math.random() * 0.15);
    }
}

// Trajectory curves (Bezier control points)
const trajectories = [
    { from: 4, to: 0, points: [
        { x: 0.50, y: 0.50 }, { x: 0.38, y: 0.42 }, { x: 0.25, y: 0.30 }
    ]},
    { from: 0, to: 1, points: [
        { x: 0.25, y: 0.30 }, { x: 0.45, y: 0.25 }, { x: 0.70, y: 0.25 }
    ]},
    { from: 4, to: 2, points: [
        { x: 0.50, y: 0.50 }, { x: 0.35, y: 0.60 }, { x: 0.20, y: 0.72 }
    ]},
    { from: 2, to: 3, points: [
        { x: 0.20, y: 0.72 }, { x: 0.48, y: 0.72 }, { x: 0.75, y: 0.68 }
    ]}
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    viewSelect = createSelect();
    viewSelect.position(10, drawHeight + 12);
    viewSelect.option('Cluster');
    viewSelect.option('Trajectory');
    viewSelect.selected('Cluster');
    viewSelect.changed(() => { currentView = viewSelect.value(); });

    regenerateBtn = createButton('Regenerate');
    regenerateBtn.position(120, drawHeight + 12);
    regenerateBtn.mousePressed(generateCells);

    generateCells();
    describe('scRNA-seq UMAP clustering visualization with cluster and trajectory views', LABEL);
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
    text('scRNA-seq Cell Clustering', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let plotX = margin + 30;
    let plotY = 30;
    let plotW = canvasWidth - margin * 2 - 140;
    let plotH = drawHeight - 80;

    // Axes
    stroke('#ccc');
    strokeWeight(1);
    line(plotX, plotY + plotH, plotX + plotW, plotY + plotH);
    line(plotX, plotY, plotX, plotY + plotH);

    // Axis labels
    fill('#888');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('UMAP 1', plotX + plotW / 2, plotY + plotH + 6);
    push();
    translate(plotX - 18, plotY + plotH / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('UMAP 2', 0, 0);
    pop();

    // Draw trajectory curves if in trajectory view
    if (currentView === 'Trajectory') {
        for (let traj of trajectories) {
            let pts = traj.points;
            noFill();
            stroke('#333');
            strokeWeight(2.5);
            beginShape();
            for (let i = 0; i <= 20; i++) {
                let t = i / 20;
                let px, py;
                if (pts.length === 3) {
                    px = (1-t)*(1-t)*pts[0].x + 2*(1-t)*t*pts[1].x + t*t*pts[2].x;
                    py = (1-t)*(1-t)*pts[0].y + 2*(1-t)*t*pts[1].y + t*t*pts[2].y;
                }
                vertex(plotX + px * plotW, plotY + py * plotH);
            }
            endShape();

            // Arrow at end
            let t = 0.9;
            let ax = (1-t)*(1-t)*pts[0].x + 2*(1-t)*t*pts[1].x + t*t*pts[2].x;
            let ay = (1-t)*(1-t)*pts[0].y + 2*(1-t)*t*pts[1].y + t*t*pts[2].y;
            let bx = pts[2].x, by = pts[2].y;
            let angle = atan2((by - ay) * plotH, (bx - ax) * plotW);
            fill('#333');
            noStroke();
            push();
            translate(plotX + bx * plotW, plotY + by * plotH);
            rotate(angle);
            triangle(-10, -5, -10, 5, 0, 0);
            pop();
        }
    }

    // Draw cells
    hoveredCell = -1;
    for (let i = 0; i < cells.length; i++) {
        let c = cells[i];
        let cx = plotX + c.x * plotW;
        let cy = plotY + c.y * plotH;

        if (dist(mouseX, mouseY, cx, cy) < 6) hoveredCell = i;
    }

    for (let i = 0; i < cells.length; i++) {
        let c = cells[i];
        let cx = plotX + c.x * plotW;
        let cy = plotY + c.y * plotH;
        let isHov = hoveredCell === i;

        let cellColor;
        if (currentView === 'Trajectory') {
            // Color by pseudotime
            cellColor = lerpColor(color('#FFEB3B'), color('#1A237E'), c.pseudotime);
        } else {
            cellColor = color(clusterColors[c.cluster]);
        }

        fill(cellColor);
        stroke(isHov ? '#333' : 'rgba(255,255,255,0.6)');
        strokeWeight(isHov ? 2 : 0.5);
        circle(cx, cy, isHov ? 10 : 6);
    }

    // Hover tooltip
    if (hoveredCell >= 0) {
        let c = cells[hoveredCell];
        let cx = plotX + c.x * plotW;
        let cy = plotY + c.y * plotH;
        let tipText = cellTypes[c.cluster] + ' | Cluster ' + (c.cluster + 1);
        if (currentView === 'Trajectory') {
            tipText += ' | Pseudotime: ' + c.pseudotime.toFixed(2);
        }

        fill(0, 0, 0, 210);
        noStroke();
        let tw = textWidth(tipText) + 16;
        rect(cx - tw / 2, cy - 24, tw, 18, 4);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(9);
        text(tipText, cx, cy - 15);
    }

    // Legend panel
    let legX = plotX + plotW + 20;
    let legY = plotY + 10;
    let legW = canvasWidth - legX - margin;

    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(legX, legY, legW, plotH - 20, 6);

    if (currentView === 'Cluster') {
        fill('#333');
        noStroke();
        textAlign(LEFT, TOP);
        textSize(11);
        textStyle(BOLD);
        text('Cell Types', legX + 8, legY + 8);
        textStyle(NORMAL);

        let ly = legY + 28;
        for (let i = 0; i < 5; i++) {
            fill(clusterColors[i]);
            noStroke();
            circle(legX + 14, ly + 4, 10);
            fill('#333');
            textSize(9);
            textAlign(LEFT, CENTER);
            text(cellTypes[i], legX + 24, ly + 4);

            // Count
            let count = cells.filter(c => c.cluster === i).length;
            fill('#888');
            textSize(8);
            text('n=' + count, legX + 24, ly + 16);
            ly += 32;
        }

        // Stats
        ly += 10;
        fill('#333');
        textSize(10);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        text('Summary', legX + 8, ly);
        textStyle(NORMAL);
        ly += 16;
        fill('#555');
        textSize(8);
        text('Total cells: ' + cells.length, legX + 8, ly);
        ly += 14;
        text('Clusters: 5', legX + 8, ly);
        ly += 14;
        text('Method: Leiden', legX + 8, ly);
        ly += 14;
        text('Reduction: UMAP', legX + 8, ly);
    } else {
        // Trajectory legend
        fill('#333');
        noStroke();
        textAlign(LEFT, TOP);
        textSize(11);
        textStyle(BOLD);
        text('Trajectory', legX + 8, legY + 8);
        textStyle(NORMAL);

        // Pseudotime color bar
        let barX = legX + 8;
        let barY = legY + 30;
        let barW = legW - 16;
        let barH = 12;
        for (let i = 0; i < barW; i++) {
            let t = i / barW;
            stroke(lerpColor(color('#FFEB3B'), color('#1A237E'), t));
            line(barX + i, barY, barX + i, barY + barH);
        }
        noStroke();
        fill('#888');
        textSize(7);
        textAlign(LEFT, TOP);
        text('Early', barX, barY + barH + 3);
        textAlign(RIGHT, TOP);
        text('Late', barX + barW, barY + barH + 3);
        textAlign(CENTER, TOP);
        text('Pseudotime', barX + barW / 2, barY + barH + 3);

        // Lineage description
        let ly = barY + barH + 22;
        fill('#333');
        textSize(9);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        text('Lineages:', legX + 8, ly);
        textStyle(NORMAL);
        ly += 16;
        fill('#555');
        textSize(8);
        let lineages = [
            'DC → T Cell → B Cell',
            'DC → Monocyte → NK Cell'
        ];
        for (let l of lineages) {
            text(l, legX + 8, ly);
            ly += 14;
        }

        ly += 10;
        fill('#333');
        textSize(9);
        textStyle(BOLD);
        text('Methods:', legX + 8, ly);
        textStyle(NORMAL);
        ly += 14;
        fill('#555');
        textSize(8);
        text('Slingshot / Monocle3', legX + 8, ly);
    }

    // View label
    fill('#666');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('View:', 10 + viewSelect.width + 18, drawHeight + 22);
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
