// Gene Tree vs Species Tree Discordance
// Species tree as translucent tubes, gene lineages inside
// Checkbox toggles HGT event
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let hgtCheckbox;
let showHGT = false;

// Species tree: 4 species with a ((A,B),(C,D)) topology
// Layout: tips at bottom, root at top
// Using x fractions and y levels

const species = [
    { id: 'A', label: 'Species A', color: [66, 133, 244] },
    { id: 'B', label: 'Species B', color: [234, 67, 53] },
    { id: 'C', label: 'Species C', color: [52, 168, 83] },
    { id: 'D', label: 'Species D', color: [251, 188, 4] }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    hgtCheckbox = createCheckbox(' Show HGT event', false);
    hgtCheckbox.position(10, drawHeight + 10);
    hgtCheckbox.changed(() => { showHGT = hgtCheckbox.checked(); });

    describe('Species tree with gene lineages inside translucent tubes, optional HGT event toggle', LABEL);
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
    text('Gene Tree inside Species Tree', canvasWidth / 2, 6);
    textStyle(NORMAL);

    let treeTop = 45;
    let treeBottom = drawHeight - 50;
    let treeH = treeBottom - treeTop;
    let tubeW = canvasWidth * 0.07; // half-width of species tube

    // Species tree coordinates
    // Tips at bottom, internal nodes going up
    let tipY = treeBottom;
    let abNodeY = treeTop + treeH * 0.55; // (A,B) ancestor
    let cdNodeY = treeTop + treeH * 0.50; // (C,D) ancestor
    let rootY = treeTop + treeH * 0.10;   // root

    // X positions
    let aX = canvasWidth * 0.15;
    let bX = canvasWidth * 0.35;
    let cX = canvasWidth * 0.60;
    let dX = canvasWidth * 0.85;
    let abX = (aX + bX) / 2;
    let cdX = (cX + dX) / 2;
    let rootX = (abX + cdX) / 2;

    // Draw species tree tubes (translucent)
    drawTube(aX, tipY, aX, abNodeY, tubeW, species[0].color, 50);
    drawTube(bX, tipY, bX, abNodeY, tubeW, species[1].color, 50);
    drawTube(cX, tipY, cX, cdNodeY, tubeW, species[2].color, 50);
    drawTube(dX, tipY, dX, cdNodeY, tubeW, species[3].color, 50);

    // Horizontal connectors at internal nodes
    drawTube(aX, abNodeY, bX, abNodeY, tubeW, [150, 150, 200], 35);
    drawTube(cX, cdNodeY, dX, cdNodeY, tubeW, [150, 200, 150], 35);

    // Ancestral branches up to root
    drawTube(abX, abNodeY, abX, rootY, tubeW, [150, 150, 200], 40);
    drawTube(cdX, cdNodeY, cdX, rootY, tubeW, [150, 200, 150], 40);

    // Root horizontal connector
    drawTube(abX, rootY, cdX, rootY, tubeW, [180, 180, 180], 30);

    // Gene lineages (colored lines inside the tubes)
    // Gene from species A (blue)
    strokeWeight(3);
    stroke(66, 133, 244);
    noFill();
    let gAx = aX - tubeW * 0.3;
    beginShape();
    vertex(gAx, tipY);
    vertex(gAx, abNodeY);
    vertex(abX - tubeW * 0.3, abNodeY);
    vertex(abX - tubeW * 0.3, rootY);
    vertex(rootX - tubeW * 0.3, rootY);
    endShape();

    // Gene from species B (red)
    stroke(234, 67, 53);
    let gBx = bX + tubeW * 0.3;
    beginShape();
    vertex(gBx, tipY);
    vertex(gBx, abNodeY);
    vertex(abX + tubeW * 0.3, abNodeY);
    vertex(abX + tubeW * 0.3, rootY);
    vertex(rootX - tubeW * 0.1, rootY);
    endShape();

    // Gene from species C (green)
    stroke(52, 168, 83);
    let gCx = cX - tubeW * 0.3;
    beginShape();
    vertex(gCx, tipY);
    vertex(gCx, cdNodeY);
    vertex(cdX - tubeW * 0.3, cdNodeY);
    vertex(cdX - tubeW * 0.3, rootY);
    vertex(rootX + tubeW * 0.1, rootY);
    endShape();

    // Gene from species D (yellow)
    stroke(251, 188, 4);
    let gDx = dX + tubeW * 0.3;
    beginShape();
    vertex(gDx, tipY);
    vertex(gDx, cdNodeY);
    vertex(cdX + tubeW * 0.3, cdNodeY);
    vertex(cdX + tubeW * 0.3, rootY);
    vertex(rootX + tubeW * 0.3, rootY);
    endShape();

    // HGT event: gene transfer from species B lineage to species C lineage
    if (showHGT) {
        let hgtY = abNodeY + (tipY - abNodeY) * 0.4;
        stroke(255, 120, 0);
        strokeWeight(3);
        // Dashed-style: draw segments
        let segLen = 8;
        let gap = 5;
        let fromX = bX + tubeW * 0.3;
        let toX = cX - tubeW * 0.3;
        let totalDist = toX - fromX;
        let segs = floor(totalDist / (segLen + gap));
        for (let s = 0; s < segs; s++) {
            let sx = fromX + s * (segLen + gap);
            line(sx, hgtY, sx + segLen, hgtY);
        }

        // Arrow head
        fill(255, 120, 0);
        noStroke();
        triangle(toX, hgtY, toX - 10, hgtY - 5, toX - 10, hgtY + 5);

        // Label
        fill(255, 120, 0);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textSize(11);
        textStyle(BOLD);
        text('HGT', (fromX + toX) / 2, hgtY - 6);
        textStyle(NORMAL);
    }

    // Species labels at bottom
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    textStyle(BOLD);
    for (let i = 0; i < species.length; i++) {
        let sx = [aX, bX, cX, dX][i];
        fill(species[i].color[0], species[i].color[1], species[i].color[2]);
        text(species[i].label, sx, tipY + 5);
    }
    textStyle(NORMAL);

    // Time axis
    fill('#888');
    textSize(10);
    textAlign(RIGHT, CENTER);
    text('Past', margin - 2, rootY);
    text('Present', margin - 2, tipY);
    stroke(180);
    strokeWeight(1);
    line(margin + 2, rootY + 5, margin + 2, tipY - 5);
    // Arrow
    fill(180);
    noStroke();
    triangle(margin + 2, tipY - 5, margin - 2, tipY - 12, margin + 6, tipY - 12);

    // Legend
    let legY = treeTop;
    let legX = canvasWidth - 140;
    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(1);
    rect(legX - 5, legY, 135, showHGT ? 60 : 45, 6);

    fill('#555');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Legend', legX + 2, legY + 4);
    textStyle(NORMAL);
    textSize(9);

    // Tube indicator
    fill(150, 150, 200, 80);
    stroke(150, 150, 200);
    strokeWeight(1);
    rect(legX + 2, legY + 18, 20, 8, 2);
    fill('#555');
    noStroke();
    text('Species lineage', legX + 26, legY + 17);

    // Gene line indicator
    stroke(66, 133, 244);
    strokeWeight(2);
    line(legX + 2, legY + 34, legX + 22, legY + 34);
    fill('#555');
    noStroke();
    text('Gene lineage', legX + 26, legY + 30);

    if (showHGT) {
        stroke(255, 120, 0);
        strokeWeight(2);
        line(legX + 2, legY + 48, legX + 22, legY + 48);
        fill('#555');
        noStroke();
        text('HGT transfer', legX + 26, legY + 44);
    }
}

function drawTube(x1, y1, x2, y2, hw, col, alpha) {
    fill(col[0], col[1], col[2], alpha);
    stroke(col[0], col[1], col[2], alpha + 30);
    strokeWeight(1);

    if (abs(y1 - y2) < 2) {
        // Horizontal tube
        let minX = min(x1, x2) - hw;
        let maxX = max(x1, x2) + hw;
        let ty = min(y1, y2) - hw;
        rect(minX, ty, maxX - minX, hw * 2, 4);
    } else {
        // Vertical tube
        let tx = min(x1, x2) - hw;
        let ty = min(y1, y2);
        let th = abs(y2 - y1);
        rect(tx, ty, hw * 2, th, 4);
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
