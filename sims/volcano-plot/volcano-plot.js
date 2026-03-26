// Volcano Plot for Differential Expression
// X: log2 fold change, Y: -log10 adjusted p-value
// ~100 simulated gene points, threshold sliders, hover for details
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
let controlHeight = 55;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let fcSlider, pSlider, regenerateBtn;
let hoveredGene = -1;
let genes = [];

// Gene name prefixes for realistic names
const geneNames = [
    'TP53','BRCA1','MYC','EGFR','VEGFA','TNF','IL6','STAT3','AKT1','PTEN',
    'KRAS','BRAF','CDK4','RB1','NOTCH1','WNT3A','SHH','FGF2','PDGFRA','KIT',
    'ABL1','JAK2','MAPK1','RAF1','SRC','FOS','JUN','MMP9','CASP3','BCL2',
    'BAX','CDKN2A','MDM2','ERBB2','PIK3CA','MTOR','NRAS','ALK','RET','MET',
    'FGFR1','IDH1','TERT','ARID1A','KMT2D','CREBBP','EP300','SMAD4','APC','CTNNB1',
    'NF1','NF2','TSC1','TSC2','VHL','WT1','PTCH1','SMO','GATA3','FOXA1',
    'ESR1','PGR','AR','BRCA2','PALB2','RAD51','ATM','CHEK2','MLH1','MSH2',
    'CDH1','CDH2','SNAI1','TWIST1','ZEB1','VIM','KRT19','EPCAM','CD44','ALDH1',
    'SOX2','OCT4','NANOG','KLF4','LGR5','BMI1','EZH2','DNMT1','HDAC1','SIRT1',
    'GAPDH','ACTB','TUBB','HSP90','HSPA1A','UBC','RPL13','RPS18','B2M','POLR2A'
];

function generateGenes() {
    genes = [];
    for (let i = 0; i < 100; i++) {
        // Most genes near center, some at extremes
        let fc, pval;
        let r = Math.random();
        if (r < 0.15) {
            // Strongly upregulated
            fc = 1.5 + Math.random() * 3;
            pval = Math.pow(10, -(2 + Math.random() * 6));
        } else if (r < 0.30) {
            // Strongly downregulated
            fc = -(1.5 + Math.random() * 3);
            pval = Math.pow(10, -(2 + Math.random() * 6));
        } else if (r < 0.50) {
            // Moderate change, borderline significance
            fc = (Math.random() - 0.5) * 4;
            pval = Math.pow(10, -(0.5 + Math.random() * 3));
        } else {
            // Non-significant
            fc = (Math.random() - 0.5) * 2;
            pval = Math.pow(10, -(Math.random() * 1.5));
        }

        genes.push({
            name: geneNames[i % geneNames.length],
            fc: parseFloat(fc.toFixed(2)),
            pval: pval,
            negLogP: -Math.log10(pval)
        });
    }
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    fcSlider = createSlider(0.5, 3.0, 1.0, 0.1);
    fcSlider.position(10, drawHeight + 8);
    fcSlider.size(100);

    pSlider = createSlider(1.0, 5.0, 1.3, 0.1);
    pSlider.position(10, drawHeight + 30);
    pSlider.size(100);

    regenerateBtn = createButton('Regenerate');
    regenerateBtn.position(300, drawHeight + 15);
    regenerateBtn.mousePressed(generateGenes);

    generateGenes();
    describe('Interactive volcano plot for differential gene expression with adjustable thresholds', LABEL);
}

function draw() {
    updateCanvasSize();

    let fcThreshold = fcSlider.value();
    let pThreshold = pSlider.value(); // -log10(p) threshold

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
    text('Volcano Plot', canvasWidth / 2, 4);
    textStyle(NORMAL);

    // Plot area
    let plotL = margin + 45;
    let plotR = canvasWidth - margin - 20;
    let plotT = 30;
    let plotB = drawHeight - 60;
    let plotW = plotR - plotL;
    let plotH = plotB - plotT;

    // Data ranges
    let maxFC = 5;
    let maxNegLogP = Math.max(8, ...genes.map(g => g.negLogP)) + 0.5;

    // Grid lines
    stroke('#eee');
    strokeWeight(0.5);
    for (let x = -4; x <= 4; x++) {
        let px = plotL + ((x + maxFC) / (2 * maxFC)) * plotW;
        line(px, plotT, px, plotB);
    }
    for (let y = 0; y <= 8; y += 2) {
        let py = plotB - (y / maxNegLogP) * plotH;
        line(plotL, py, plotR, py);
    }

    // Axes
    stroke('#555');
    strokeWeight(1.5);
    line(plotL, plotB, plotR, plotB);
    line(plotL, plotT, plotL, plotB);

    // Axis labels
    fill('#555');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(10);
    text('log2 Fold Change', (plotL + plotR) / 2, plotB + 22);

    push();
    translate(margin + 8, (plotT + plotB) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, BOTTOM);
    text('-log10(adj. p-value)', 0, 0);
    pop();

    // Axis tick labels
    textSize(8);
    textAlign(CENTER, TOP);
    for (let x = -4; x <= 4; x += 2) {
        let px = plotL + ((x + maxFC) / (2 * maxFC)) * plotW;
        text(x, px, plotB + 4);
    }
    textAlign(RIGHT, CENTER);
    for (let y = 0; y <= 8; y += 2) {
        let py = plotB - (y / maxNegLogP) * plotH;
        text(y, plotL - 4, py);
    }

    // Threshold lines (dashed)
    stroke('#888');
    strokeWeight(1);
    drawingContext.setLineDash([6, 4]);

    // FC thresholds
    let leftFC = plotL + ((-fcThreshold + maxFC) / (2 * maxFC)) * plotW;
    let rightFC = plotL + ((fcThreshold + maxFC) / (2 * maxFC)) * plotW;
    line(leftFC, plotT, leftFC, plotB);
    line(rightFC, plotT, rightFC, plotB);

    // P-value threshold
    let pLine = plotB - (pThreshold / maxNegLogP) * plotH;
    line(plotL, pLine, plotR, pLine);
    drawingContext.setLineDash([]);

    // Threshold labels
    fill('#888');
    noStroke();
    textSize(7);
    textAlign(CENTER, BOTTOM);
    text('FC=' + (-fcThreshold).toFixed(1), leftFC, plotT - 2);
    text('FC=' + fcThreshold.toFixed(1), rightFC, plotT - 2);
    textAlign(LEFT, CENTER);
    text('p=' + Math.pow(10, -pThreshold).toExponential(1), plotR + 3, pLine);

    // Draw genes
    hoveredGene = -1;
    for (let i = 0; i < genes.length; i++) {
        let g = genes[i];
        let gx = plotL + ((g.fc + maxFC) / (2 * maxFC)) * plotW;
        let gy = plotB - (g.negLogP / maxNegLogP) * plotH;

        // Clamp to plot area
        if (gx < plotL || gx > plotR || gy < plotT || gy > plotB) continue;

        if (dist(mouseX, mouseY, gx, gy) < 7) hoveredGene = i;

        // Classify
        let sigP = g.negLogP >= pThreshold;
        let sigFC = Math.abs(g.fc) >= fcThreshold;

        let dotColor;
        if (sigP && sigFC) {
            dotColor = g.fc > 0 ? '#C62828' : '#1565C0'; // Up=red, Down=blue
        } else if (sigFC) {
            dotColor = '#FF8F00'; // FC only
        } else {
            dotColor = '#B0BEC5'; // non-significant
        }

        let isHov = hoveredGene === i;
        fill(dotColor);
        stroke(isHov ? '#333' : 'rgba(255,255,255,0.5)');
        strokeWeight(isHov ? 2 : 0.5);
        circle(gx, gy, isHov ? 10 : 6);

        // Label top significant genes
        if (sigP && sigFC && g.negLogP > 4) {
            fill('#333');
            noStroke();
            textSize(7);
            textAlign(CENTER, BOTTOM);
            text(g.name, gx, gy - 5);
        }
    }

    // Hover tooltip
    if (hoveredGene >= 0) {
        let g = genes[hoveredGene];
        let gx = plotL + ((g.fc + maxFC) / (2 * maxFC)) * plotW;
        let gy = plotB - (g.negLogP / maxNegLogP) * plotH;

        let tipLines = [
            g.name,
            'log2FC: ' + g.fc.toFixed(2),
            'adj.p: ' + g.pval.toExponential(2),
            '-log10(p): ' + g.negLogP.toFixed(1)
        ];
        let tw = 120, th = tipLines.length * 13 + 8;
        let tx = gx + 10, ty = gy - th - 5;
        if (tx + tw > canvasWidth) tx = gx - tw - 10;
        if (ty < plotT) ty = gy + 10;

        fill(0, 0, 0, 210);
        noStroke();
        rect(tx, ty, tw, th, 4);
        fill(255);
        textAlign(LEFT, TOP);
        textSize(9);
        for (let i = 0; i < tipLines.length; i++) {
            textStyle(i === 0 ? BOLD : NORMAL);
            text(tipLines[i], tx + 6, ty + 4 + i * 13);
        }
        textStyle(NORMAL);
    }

    // Legend
    let legY = plotB + 36;
    let legX = plotL;
    textSize(8);
    textAlign(LEFT, CENTER);

    let legItems = [
        { label: 'Upregulated', color: '#C62828' },
        { label: 'Downregulated', color: '#1565C0' },
        { label: 'FC only', color: '#FF8F00' },
        { label: 'Non-significant', color: '#B0BEC5' }
    ];

    for (let item of legItems) {
        fill(item.color);
        noStroke();
        circle(legX + 4, legY, 7);
        fill('#555');
        text(item.label, legX + 12, legY);
        legX += textWidth(item.label) + 24;
    }

    // Counts
    let upCount = genes.filter(g => g.negLogP >= pThreshold && g.fc >= fcThreshold).length;
    let downCount = genes.filter(g => g.negLogP >= pThreshold && g.fc <= -fcThreshold).length;
    let nsCount = genes.length - upCount - downCount;

    fill('#333');
    textAlign(RIGHT, TOP);
    textSize(8);
    text('Up: ' + upCount + ' | Down: ' + downCount + ' | NS: ' + nsCount, plotR, plotT + 4);

    // Slider labels
    fill('#666');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(9);
    text('|FC| threshold: ' + fcThreshold.toFixed(1), 120, drawHeight + 16);
    text('-log10(p) threshold: ' + pThreshold.toFixed(1), 120, drawHeight + 38);
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
