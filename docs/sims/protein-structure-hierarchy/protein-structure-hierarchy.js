// Protein Structure Hierarchy
// Four panels: Primary, Secondary, Tertiary, Quaternary
// Toggle buttons to show one level at a time with description
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let currentLevel = 0;
let btnPrimary, btnSecondary, btnTertiary, btnQuaternary;

const levels = [
    {
        name: 'Primary Structure',
        color: '#1565C0',
        desc: 'The linear sequence of amino acids in a polypeptide chain, read from N-terminus to C-terminus. This sequence is encoded by the gene and determines all higher-order structures. Even a single amino acid change can alter protein function (e.g., sickle cell hemoglobin: Glu→Val at position 6).'
    },
    {
        name: 'Secondary Structure',
        color: '#2E7D32',
        desc: 'Local folding patterns stabilized by hydrogen bonds between backbone atoms. Alpha helices are right-handed coils (3.6 residues per turn). Beta sheets are extended strands connected by H-bonds, forming parallel or antiparallel arrangements. Turns and loops connect these elements.'
    },
    {
        name: 'Tertiary Structure',
        color: '#E65100',
        desc: 'The complete 3D fold of a single polypeptide chain. Stabilized by hydrophobic core packing, disulfide bonds, salt bridges, and hydrogen bonds between side chains. Distinct structural domains often correspond to functional units. This is the level predicted by AlphaFold.'
    },
    {
        name: 'Quaternary Structure',
        color: '#6A1B9A',
        desc: 'The arrangement of multiple polypeptide subunits into a functional complex. Hemoglobin is a tetramer (2 alpha + 2 beta subunits). Quaternary structure enables cooperativity, allosteric regulation, and assembly of molecular machines like the ribosome.'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    btnPrimary = createButton('Primary');
    btnPrimary.position(10, drawHeight + 12);
    btnPrimary.mousePressed(() => { currentLevel = 0; });

    btnSecondary = createButton('Secondary');
    btnSecondary.position(85, drawHeight + 12);
    btnSecondary.mousePressed(() => { currentLevel = 1; });

    btnTertiary = createButton('Tertiary');
    btnTertiary.position(175, drawHeight + 12);
    btnTertiary.mousePressed(() => { currentLevel = 2; });

    btnQuaternary = createButton('Quaternary');
    btnQuaternary.position(255, drawHeight + 12);
    btnQuaternary.mousePressed(() => { currentLevel = 3; });

    describe('Protein structure hierarchy showing four levels of organization', LABEL);
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
    text('Protein Structure Hierarchy', canvasWidth / 2, 6);
    textStyle(NORMAL);

    let lev = levels[currentLevel];

    // Level indicator tabs at top
    let tabW = (canvasWidth - margin * 2) / 4;
    for (let i = 0; i < 4; i++) {
        let tx = margin + i * tabW;
        let ty = 28;
        let active = i === currentLevel;
        fill(active ? levels[i].color : '#E0E0E0');
        stroke(active ? levels[i].color : '#BDBDBD');
        strokeWeight(active ? 2 : 1);
        rect(tx, ty, tabW - 2, 22, 4, 4, 0, 0);
        fill(active ? 255 : '#666');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(active ? BOLD : NORMAL);
        text(levels[i].name.split(' ')[0], tx + tabW / 2 - 1, ty + 11);
        textStyle(NORMAL);
    }

    // Visualization area
    let vizY = 58;
    let vizH = 300;

    // Draw visualization
    if (currentLevel === 0) drawPrimary(margin, vizY, canvasWidth - margin * 2, vizH, lev.color);
    else if (currentLevel === 1) drawSecondary(margin, vizY, canvasWidth - margin * 2, vizH, lev.color);
    else if (currentLevel === 2) drawTertiary(margin, vizY, canvasWidth - margin * 2, vizH, lev.color);
    else drawQuaternary(margin, vizY, canvasWidth - margin * 2, vizH, lev.color);

    // Description panel
    let descY = vizY + vizH + 10;
    let descH = drawHeight - descY - 8;
    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(margin, descY, canvasWidth - margin * 2, descH, 6);

    fill(lev.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text(lev.name, margin + 10, descY + 8);
    textStyle(NORMAL);

    fill('#333');
    textSize(11);
    drawWrappedText(lev.desc, margin + 10, descY + 26, canvasWidth - margin * 2 - 20, 14);

    // Level number
    fill('#999');
    textAlign(RIGHT, CENTER);
    textSize(10);
    text('Level ' + (currentLevel + 1) + ' of 4', canvasWidth - margin - 10, drawHeight + 25);
}

function drawPrimary(px, py, pw, ph, col) {
    let seq = 'MKWVTFISLLFSSAYSRGVFRRDTHKSEIAHRFKDLGEEHFKGLVLIAFSQYL';
    let cx = px + pw / 2;
    let cy = py + ph / 2;

    // Draw as a chain of beads
    let perRow = Math.min(26, Math.floor(pw / 22));
    let rows = Math.ceil(seq.length / perRow);
    let beadSize = Math.min(20, (pw - 20) / perRow);
    let startY = cy - (rows * (beadSize + 6)) / 2;

    // Amino acid color groups
    let aaColors = {
        'hydrophobic': '#42A5F5', // A, V, I, L, M, F, W, P
        'polar': '#66BB6A',       // S, T, Y, N, Q, C
        'positive': '#EF5350',    // K, R, H
        'negative': '#FFA726',    // D, E
        'special': '#AB47BC'      // G
    };

    function aaCategory(aa) {
        if ('AVILMFWP'.includes(aa)) return 'hydrophobic';
        if ('STYNQC'.includes(aa)) return 'polar';
        if ('KRH'.includes(aa)) return 'positive';
        if ('DE'.includes(aa)) return 'negative';
        return 'special';
    }

    // N-terminus label
    fill(col);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('N-', px + 6, startY + beadSize / 2);
    textStyle(NORMAL);

    for (let i = 0; i < seq.length; i++) {
        let row = Math.floor(i / perRow);
        let colIdx = i % perRow;
        let bx = px + 14 + colIdx * (beadSize + 3);
        let by = startY + row * (beadSize + 8);

        // Bond line
        if (i > 0 && colIdx > 0) {
            stroke('#999');
            strokeWeight(1.5);
            line(bx - 2, by + beadSize / 2, bx - beadSize - 1, by + beadSize / 2);
        }

        let cat = aaCategory(seq[i]);
        fill(aaColors[cat]);
        stroke(col);
        strokeWeight(1);
        circle(bx + beadSize / 2, by + beadSize / 2, beadSize);

        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(Math.min(10, beadSize * 0.55));
        textStyle(BOLD);
        text(seq[i], bx + beadSize / 2, by + beadSize / 2);
        textStyle(NORMAL);

        // Position number every 10
        if ((i + 1) % 10 === 0) {
            fill('#888');
            textSize(7);
            textAlign(CENTER, TOP);
            text(i + 1, bx + beadSize / 2, by + beadSize + 1);
        }
    }

    // C-terminus label
    let lastRow = Math.floor((seq.length - 1) / perRow);
    let lastCol = (seq.length - 1) % perRow;
    fill(col);
    textSize(10);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text('-C', px + 14 + (lastCol + 1) * (beadSize + 3) + 2, startY + lastRow * (beadSize + 8) + beadSize / 2);
    textStyle(NORMAL);

    // Legend
    let legY = py + ph - 28;
    let legX = px + 10;
    textSize(8);
    textAlign(LEFT, CENTER);
    let cats = [['Hydrophobic', '#42A5F5'], ['Polar', '#66BB6A'], ['Positive', '#EF5350'], ['Negative', '#FFA726'], ['Special', '#AB47BC']];
    for (let [label, c] of cats) {
        fill(c);
        noStroke();
        circle(legX + 5, legY, 8);
        fill('#555');
        text(label, legX + 12, legY);
        legX += textWidth(label) + 22;
    }
}

function drawSecondary(px, py, pw, ph, col) {
    let cx = px + pw / 2;
    let cy = py + ph / 2;

    // Alpha helix on the left
    let helixX = px + pw * 0.25;
    let helixTop = py + 30;
    let helixH = ph - 60;

    fill(col);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Alpha Helix', helixX, py + 10);
    textStyle(NORMAL);

    // Draw helix as ribbon
    noFill();
    stroke(col);
    strokeWeight(3);
    let helixW = 30;
    for (let i = 0; i < 60; i++) {
        let t = i / 60;
        let y = helixTop + t * helixH;
        let x = helixX + sin(t * TWO_PI * 4) * helixW;
        let x2 = helixX + sin((i + 1) / 60 * TWO_PI * 4) * helixW;
        let y2 = helixTop + (i + 1) / 60 * helixH;

        // Ribbon effect
        let frontSide = cos(t * TWO_PI * 4) > 0;
        stroke(frontSide ? col : color(red(color(col)), green(color(col)), blue(color(col)), 120));
        strokeWeight(frontSide ? 4 : 2);
        line(x, y, x2, y2);
    }

    // H-bond indicators
    stroke('#FF8A65');
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    for (let i = 0; i < 5; i++) {
        let y = helixTop + 20 + i * (helixH - 40) / 4;
        line(helixX - 8, y, helixX + 8, y + 20);
    }
    drawingContext.setLineDash([]);

    fill('#FF8A65');
    noStroke();
    textSize(8);
    text('H-bonds', helixX, helixTop + helixH + 2);

    // Beta sheet on the right
    let sheetX = px + pw * 0.7;
    let sheetTop = py + 30;

    fill('#2E7D32');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Beta Sheet', sheetX, py + 10);
    textStyle(NORMAL);

    // Draw beta strands as arrows
    let strandW = 35;
    let strandGap = 28;
    let numStrands = 4;
    let strandH = helixH - 20;

    for (let s = 0; s < numStrands; s++) {
        let sx = sheetX - (numStrands * strandGap) / 2 + s * strandGap;
        let direction = s % 2 === 0 ? 1 : -1; // antiparallel
        let topY = sheetTop + 15;
        let botY = topY + strandH;

        // Arrow body
        stroke(col);
        strokeWeight(2.5);
        fill(lerpColor(color('#A5D6A7'), color('#388E3C'), s / numStrands));
        beginShape();
        if (direction === 1) {
            // Down arrow
            vertex(sx - 8, topY);
            vertex(sx - 8, botY - 15);
            vertex(sx - 14, botY - 15);
            vertex(sx, botY);
            vertex(sx + 14, botY - 15);
            vertex(sx + 8, botY - 15);
            vertex(sx + 8, topY);
        } else {
            // Up arrow
            vertex(sx - 8, botY);
            vertex(sx - 8, topY + 15);
            vertex(sx - 14, topY + 15);
            vertex(sx, topY);
            vertex(sx + 14, topY + 15);
            vertex(sx + 8, topY + 15);
            vertex(sx + 8, botY);
        }
        endShape(CLOSE);

        // H-bonds between strands
        if (s < numStrands - 1) {
            stroke('#FF8A65');
            strokeWeight(1);
            drawingContext.setLineDash([3, 3]);
            for (let h = 0; h < 5; h++) {
                let hy = topY + 30 + h * (strandH - 50) / 4;
                line(sx + 10, hy, sx + strandGap - 10, hy);
            }
            drawingContext.setLineDash([]);
        }
    }

    fill('#FF8A65');
    noStroke();
    textSize(8);
    textAlign(CENTER, TOP);
    text('H-bonds', sheetX, sheetTop + strandH + 20);
}

function drawTertiary(px, py, pw, ph, col) {
    let cx = px + pw / 2;
    let cy = py + ph / 2;

    fill(col);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Folded Polypeptide Chain', cx, py + 8);
    textStyle(NORMAL);

    // Draw a folded protein backbone with colored domains
    let domains = [
        { name: 'Domain 1', color: '#1565C0', points: [] },
        { name: 'Domain 2', color: '#C62828', points: [] },
        { name: 'Domain 3', color: '#2E7D32', points: [] }
    ];

    // Generate backbone path
    let nPoints = 80;
    let allPts = [];
    for (let i = 0; i < nPoints; i++) {
        let t = i / nPoints;
        let x = cx + sin(t * TWO_PI * 2.5 + 1) * (pw * 0.3) + cos(t * TWO_PI * 1.3) * (pw * 0.1);
        let y = cy + cos(t * TWO_PI * 2 + 0.5) * (ph * 0.28) + sin(t * TWO_PI * 1.7) * (ph * 0.1);
        allPts.push({ x, y });

        let domIdx = Math.floor(t * 3);
        if (domIdx >= 3) domIdx = 2;
        domains[domIdx].points.push({ x, y });
    }

    // Draw backbone segments colored by domain
    for (let d = 0; d < domains.length; d++) {
        let pts = domains[d].points;
        stroke(domains[d].color);
        strokeWeight(4);
        noFill();
        for (let i = 0; i < pts.length - 1; i++) {
            line(pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);
        }
    }

    // Draw disulfide bonds
    stroke('#FFD600');
    strokeWeight(2);
    drawingContext.setLineDash([4, 4]);
    // A few cross-links
    if (allPts.length > 60) {
        line(allPts[10].x, allPts[10].y, allPts[55].x, allPts[55].y);
        line(allPts[25].x, allPts[25].y, allPts[70].x, allPts[70].y);
    }
    drawingContext.setLineDash([]);

    // N and C terminus
    fill('#333');
    noStroke();
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('N', allPts[0].x - 12, allPts[0].y);
    text('C', allPts[allPts.length - 1].x + 12, allPts[allPts.length - 1].y);
    textStyle(NORMAL);

    // Domain labels
    let legY = py + ph - 20;
    let legX = px + 20;
    textSize(9);
    textAlign(LEFT, CENTER);
    for (let d of domains) {
        fill(d.color);
        noStroke();
        rect(legX, legY - 5, 12, 10, 2);
        fill('#555');
        text(d.name, legX + 16, legY);
        legX += 80;
    }

    // Disulfide label
    stroke('#FFD600');
    strokeWeight(2);
    drawingContext.setLineDash([4, 4]);
    line(legX, legY, legX + 15, legY);
    drawingContext.setLineDash([]);
    fill('#555');
    noStroke();
    text('S-S bond', legX + 20, legY);
}

function drawQuaternary(px, py, pw, ph, col) {
    let cx = px + pw / 2;
    let cy = py + ph / 2 - 10;

    fill(col);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Hemoglobin Tetramer (2\u03B1 + 2\u03B2)', cx, py + 8);
    textStyle(NORMAL);

    let subunits = [
        { name: '\u03B11', color: '#1565C0', dx: -0.22, dy: -0.22, sz: 0.30 },
        { name: '\u03B12', color: '#42A5F5', dx: 0.22, dy: -0.22, sz: 0.30 },
        { name: '\u03B21', color: '#C62828', dx: -0.22, dy: 0.22, sz: 0.28 },
        { name: '\u03B22', color: '#EF5350', dx: 0.22, dy: 0.22, sz: 0.28 }
    ];

    let maxR = Math.min(pw, ph) * 0.38;

    // Interface lines
    stroke('#9E9E9E');
    strokeWeight(1);
    drawingContext.setLineDash([5, 5]);
    line(cx - maxR * 0.5, cy, cx + maxR * 0.5, cy);
    line(cx, cy - maxR * 0.5, cx, cy + maxR * 0.5);
    drawingContext.setLineDash([]);

    // Draw subunits as blob shapes
    for (let su of subunits) {
        let sx = cx + su.dx * maxR * 1.3;
        let sy = cy + su.dy * maxR * 1.3;
        let sz = su.sz * maxR * 2;

        // Blob shape
        fill(su.color + '33');
        stroke(su.color);
        strokeWeight(2.5);
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.1) {
            let r = sz / 2 + sin(a * 3) * sz * 0.08 + cos(a * 5) * sz * 0.04;
            vertex(sx + cos(a) * r, sy + sin(a) * r);
        }
        endShape(CLOSE);

        // Heme group (small red circle inside)
        fill('#FF1744');
        noStroke();
        circle(sx, sy + 5, sz * 0.2);
        fill('#FFCDD2');
        textSize(7);
        textAlign(CENTER, CENTER);
        text('Fe', sx, sy + 5);

        // Subunit label
        fill(su.color);
        noStroke();
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(su.name, sx, sy - sz * 0.25);
        textStyle(NORMAL);
    }

    // Interface labels
    fill('#777');
    noStroke();
    textSize(8);
    textAlign(CENTER, CENTER);
    text('\u03B11\u03B22 interface', cx, cy - 6);
    text('\u03B11\u03B21 interface', cx - maxR * 0.35, cy);

    // Legend
    let legY = py + ph - 18;
    textSize(9);
    textAlign(LEFT, CENTER);
    let items = [
        ['\u03B1 subunits (141 aa)', '#1565C0'],
        ['\u03B2 subunits (146 aa)', '#C62828'],
        ['Heme group + Fe', '#FF1744']
    ];
    let legX = px + 20;
    for (let [label, c] of items) {
        fill(c);
        noStroke();
        circle(legX + 5, legY, 8);
        fill('#555');
        text(label, legX + 12, legY);
        legX += textWidth(label) + 24;
    }
}

function drawWrappedText(txt, x, y, maxW, lineH) {
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
