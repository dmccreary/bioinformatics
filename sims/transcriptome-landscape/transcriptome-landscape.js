// Transcriptome Landscape
// Cell diagram: nucleus with DNA → RNA types, mRNA export, alternative splicing
// Buttons toggle visibility of RNA types
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let showMRNA = true, showMiRNA = true, showLncRNA = true, showRRNA = true;
let btnMRNA, btnMiRNA, btnLncRNA, btnRRNA;

const rnaTypes = {
    mRNA: {
        color: '#1565C0',
        label: 'mRNA',
        desc: 'Messenger RNA carries protein-coding information from DNA to ribosomes. Undergoes 5\' capping, splicing, and 3\' polyadenylation. Exported to cytoplasm for translation.'
    },
    miRNA: {
        color: '#C62828',
        label: 'miRNA',
        desc: 'MicroRNA (~22 nt) regulates gene expression by binding to complementary mRNA sequences, causing translational repression or mRNA degradation. Each miRNA can target hundreds of genes.'
    },
    lncRNA: {
        color: '#6A1B9A',
        label: 'lncRNA',
        desc: 'Long non-coding RNA (>200 nt) regulates gene expression through chromatin remodeling, transcriptional control, and post-transcriptional processing. Examples: XIST, HOTAIR, MALAT1.'
    },
    rRNA: {
        color: '#2E7D32',
        label: 'rRNA',
        desc: 'Ribosomal RNA forms the structural and catalytic core of ribosomes. Makes up ~80% of total cellular RNA. 28S, 18S, 5.8S, and 5S rRNA in eukaryotes.'
    }
};

let selectedRNA = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    btnMRNA = createButton('mRNA');
    btnMRNA.position(10, drawHeight + 10);
    btnMRNA.mousePressed(() => { showMRNA = !showMRNA; });

    btnMiRNA = createButton('miRNA');
    btnMiRNA.position(75, drawHeight + 10);
    btnMiRNA.mousePressed(() => { showMiRNA = !showMiRNA; });

    btnLncRNA = createButton('lncRNA');
    btnLncRNA.position(140, drawHeight + 10);
    btnLncRNA.mousePressed(() => { showLncRNA = !showLncRNA; });

    btnRRNA = createButton('rRNA');
    btnRRNA.position(210, drawHeight + 10);
    btnRRNA.mousePressed(() => { showRRNA = !showRRNA; });

    describe('Transcriptome landscape showing DNA to RNA types with alternative splicing and export', LABEL);
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
    text('Transcriptome Landscape', canvasWidth / 2, 4);
    textStyle(NORMAL);

    // Cell outline
    let cellX = margin + 10;
    let cellY = 30;
    let cellW = canvasWidth - margin * 2 - 20;
    let cellH = drawHeight - 120;

    fill('#FFF8E1');
    stroke('#FFB74D');
    strokeWeight(2);
    rect(cellX, cellY, cellW, cellH, 20);

    // Cell label
    fill('#FF8F00');
    noStroke();
    textAlign(RIGHT, TOP);
    textSize(9);
    text('Eukaryotic Cell', cellX + cellW - 8, cellY + 6);

    // Nucleus
    let nucX = cellX + cellW * 0.15;
    let nucY = cellY + cellH * 0.15;
    let nucW = cellW * 0.45;
    let nucH = cellH * 0.55;

    fill('#E3F2FD');
    stroke('#64B5F6');
    strokeWeight(2.5);
    ellipse(nucX + nucW / 2, nucY + nucH / 2, nucW, nucH);

    // Nuclear envelope label
    fill('#42A5F5');
    noStroke();
    textSize(8);
    textAlign(CENTER, TOP);
    text('Nucleus', nucX + nucW / 2, nucY + 4);

    // DNA double helix in nucleus
    let dnaX = nucX + nucW * 0.15;
    let dnaY = nucY + nucH * 0.25;
    let dnaW = nucW * 0.7;
    let dnaH = nucH * 0.2;

    stroke('#1A237E');
    strokeWeight(2);
    noFill();
    // Two strands
    for (let strand = 0; strand < 2; strand++) {
        beginShape();
        for (let i = 0; i <= 30; i++) {
            let t = i / 30;
            let x = dnaX + t * dnaW;
            let y = dnaY + dnaH / 2 + sin(t * TWO_PI * 3 + strand * PI) * dnaH * 0.4;
            vertex(x, y);
        }
        endShape();
    }

    fill('#1A237E');
    noStroke();
    textSize(9);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('DNA', dnaX + dnaW / 2, dnaY - 6);
    textStyle(NORMAL);

    // Transcription arrow
    let txnY = dnaY + dnaH + 10;
    fill('#555');
    noStroke();
    textSize(8);
    textAlign(CENTER, CENTER);
    text('Transcription', nucX + nucW * 0.5, txnY);
    // Arrow down
    stroke('#555');
    strokeWeight(1.5);
    let arrowX = nucX + nucW * 0.5;
    line(arrowX, txnY + 6, arrowX, txnY + 20);
    fill('#555');
    noStroke();
    triangle(arrowX - 4, txnY + 18, arrowX + 4, txnY + 18, arrowX, txnY + 24);

    // RNA types emerging from DNA
    let rnaStartY = txnY + 28;
    let visibleTypes = [];
    if (showMRNA) visibleTypes.push('mRNA');
    if (showMiRNA) visibleTypes.push('miRNA');
    if (showLncRNA) visibleTypes.push('lncRNA');
    if (showRRNA) visibleTypes.push('rRNA');

    let rnaSpacing = nucW / (visibleTypes.length + 1);

    for (let i = 0; i < visibleTypes.length; i++) {
        let rna = rnaTypes[visibleTypes[i]];
        let rx = nucX + rnaSpacing * (i + 1);
        let ry = rnaStartY;

        // RNA molecule representation
        fill(rna.color);
        noStroke();
        rect(rx - 12, ry, 24, 16, 4);
        fill(255);
        textSize(7);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(rna.label, rx, ry + 8);
        textStyle(NORMAL);
    }

    // Cytoplasm label
    let cytoX = cellX + cellW * 0.65;
    let cytoY = cellY + cellH * 0.15;
    fill('#FF8F00');
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    text('Cytoplasm', cytoX + cellW * 0.15, cytoY);

    // Nuclear pore
    let poreX = nucX + nucW * 0.85;
    let poreY = nucY + nucH * 0.5;
    fill('#FFB74D');
    stroke('#F57C00');
    strokeWeight(2);
    rect(poreX - 6, poreY - 10, 12, 20, 4);
    fill('#F57C00');
    noStroke();
    textSize(6);
    textAlign(CENTER, CENTER);
    text('NPC', poreX, poreY);

    // mRNA export to cytoplasm
    if (showMRNA) {
        let exportStartX = poreX + 10;
        let exportStartY = poreY;
        let exportEndX = cellX + cellW * 0.75;
        let exportEndY = cellY + cellH * 0.45;

        // Export arrow
        stroke(rnaTypes.mRNA.color);
        strokeWeight(2);
        drawingContext.setLineDash([5, 5]);
        line(exportStartX, exportStartY, exportEndX, exportEndY);
        drawingContext.setLineDash([]);

        // Arrow head
        let angle = atan2(exportEndY - exportStartY, exportEndX - exportStartX);
        fill(rnaTypes.mRNA.color);
        noStroke();
        push();
        translate(exportEndX, exportEndY);
        rotate(angle);
        triangle(-8, -4, -8, 4, 0, 0);
        pop();

        fill(rnaTypes.mRNA.color);
        noStroke();
        textSize(7);
        textAlign(CENTER, CENTER);
        text('mRNA Export', (exportStartX + exportEndX) / 2, (exportStartY + exportEndY) / 2 - 8);

        // Ribosome + translation in cytoplasm
        let ribX = exportEndX;
        let ribY = exportEndY + 10;

        // mRNA strand
        stroke(rnaTypes.mRNA.color);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let t = 0; t <= 1; t += 0.05) {
            vertex(ribX - 30 + t * 60, ribY + sin(t * PI * 3) * 4);
        }
        endShape();

        // Ribosome on mRNA
        fill('#78909C');
        stroke('#546E7A');
        strokeWeight(1.5);
        ellipse(ribX, ribY - 3, 20, 14);
        ellipse(ribX, ribY + 5, 24, 16);

        fill(255);
        noStroke();
        textSize(6);
        textAlign(CENTER, CENTER);
        text('Ribosome', ribX, ribY + 5);

        // Protein coming out
        fill('#FF8F00');
        noStroke();
        let protY = ribY + 20;
        for (let p = 0; p < 5; p++) {
            circle(ribX + p * 6 - 12, protY + sin(p * 0.8) * 3, 5);
        }
        fill('#FF8F00');
        textSize(6);
        textAlign(CENTER, TOP);
        text('Protein', ribX, protY + 8);
    }

    // Alternative splicing diagram (if mRNA visible)
    if (showMRNA) {
        let spliceX = nucX + 10;
        let spliceY = nucY + nucH * 0.68;
        let spliceW = nucW * 0.55;

        fill('#888');
        noStroke();
        textSize(7);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        text('Alternative Splicing:', spliceX, spliceY);
        textStyle(NORMAL);

        let exonY = spliceY + 14;
        // Pre-mRNA with exons
        let exons = [
            { x: 0, w: 0.15, label: 'E1', color: '#1565C0' },
            { x: 0.20, w: 0.12, label: 'E2', color: '#42A5F5' },
            { x: 0.37, w: 0.15, label: 'E3', color: '#1565C0' },
            { x: 0.57, w: 0.12, label: 'E4', color: '#42A5F5' },
            { x: 0.74, w: 0.15, label: 'E5', color: '#1565C0' }
        ];

        // Intron lines
        stroke('#B0BEC5');
        strokeWeight(1);
        line(spliceX, exonY + 5, spliceX + spliceW, exonY + 5);

        for (let ex of exons) {
            fill(ex.color);
            noStroke();
            rect(spliceX + ex.x * spliceW, exonY, ex.w * spliceW, 10, 2);
            fill(255);
            textSize(5);
            textAlign(CENTER, CENTER);
            text(ex.label, spliceX + (ex.x + ex.w / 2) * spliceW, exonY + 5);
        }

        // Splicing variants (two isoforms below)
        let isoY1 = exonY + 18;
        // Isoform 1: E1-E2-E3-E5 (skip E4)
        let iso1 = [exons[0], exons[1], exons[2], exons[4]];
        let ix = spliceX;
        stroke('#B0BEC5');
        strokeWeight(0.5);
        for (let i = 0; i < iso1.length; i++) {
            let ew = iso1[i].w * spliceW * 0.8;
            fill(iso1[i].color);
            noStroke();
            rect(ix, isoY1, ew, 7, 1);
            if (i < iso1.length - 1) {
                stroke('#B0BEC5');
                strokeWeight(0.5);
                line(ix + ew, isoY1 + 3.5, ix + ew + 3, isoY1 + 3.5);
            }
            ix += ew + 3;
        }
        fill('#888');
        noStroke();
        textSize(5);
        textAlign(LEFT, CENTER);
        text('Isoform A', ix + 4, isoY1 + 3.5);

        // Isoform 2: E1-E3-E4-E5 (skip E2)
        let isoY2 = isoY1 + 12;
        let iso2 = [exons[0], exons[2], exons[3], exons[4]];
        ix = spliceX;
        for (let i = 0; i < iso2.length; i++) {
            let ew = iso2[i].w * spliceW * 0.8;
            fill(iso2[i].color);
            noStroke();
            rect(ix, isoY2, ew, 7, 1);
            if (i < iso2.length - 1) {
                stroke('#B0BEC5');
                strokeWeight(0.5);
                line(ix + ew, isoY2 + 3.5, ix + ew + 3, isoY2 + 3.5);
            }
            ix += ew + 3;
        }
        fill('#888');
        noStroke();
        textSize(5);
        textAlign(LEFT, CENTER);
        text('Isoform B', ix + 4, isoY2 + 3.5);
    }

    // miRNA function in cytoplasm
    if (showMiRNA) {
        let miX = cellX + cellW * 0.55;
        let miY = cellY + cellH * 0.72;
        fill(rnaTypes.miRNA.color);
        noStroke();
        rect(miX - 14, miY, 28, 14, 4);
        fill(255);
        textSize(7);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text('miRNA', miX, miY + 7);
        textStyle(NORMAL);

        // Silencing arrow
        stroke(rnaTypes.miRNA.color);
        strokeWeight(1.5);
        line(miX + 16, miY + 7, miX + 35, miY + 7);
        fill(rnaTypes.miRNA.color);
        noStroke();
        textSize(6);
        textAlign(LEFT, CENTER);
        text('Gene silencing', miX + 38, miY + 7);
    }

    // lncRNA in nucleus
    if (showLncRNA) {
        let lnX = nucX + nucW * 0.65;
        let lnY = nucY + nucH * 0.75;
        fill(rnaTypes.lncRNA.color);
        noStroke();
        rect(lnX - 16, lnY, 32, 14, 4);
        fill(255);
        textSize(7);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text('lncRNA', lnX, lnY + 7);
        textStyle(NORMAL);

        fill(rnaTypes.lncRNA.color);
        noStroke();
        textSize(6);
        textAlign(LEFT, TOP);
        text('Chromatin\nremodeling', lnX + 20, lnY);
    }

    // rRNA in cytoplasm (ribosomes)
    if (showRRNA) {
        let rrX = cellX + cellW * 0.82;
        let rrY = cellY + cellH * 0.65;
        for (let i = 0; i < 3; i++) {
            let rx = rrX + (i % 2) * 18;
            let ry = rrY + Math.floor(i / 2) * 20;
            fill(rnaTypes.rRNA.color);
            stroke('#1B5E20');
            strokeWeight(1);
            ellipse(rx, ry, 14, 10);
            ellipse(rx, ry + 6, 16, 12);
        }
        fill(rnaTypes.rRNA.color);
        noStroke();
        textSize(6);
        textAlign(CENTER, TOP);
        text('Ribosomes\n(rRNA)', rrX + 9, rrY + 22);
    }

    // Info panel at bottom
    let infoY = cellY + cellH + 6;
    let infoH = drawHeight - infoY - 4;
    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(margin, infoY, canvasWidth - margin * 2, infoH, 6);

    // Show description for toggled types
    let visDescs = [];
    if (showMRNA) visDescs.push(rnaTypes.mRNA);
    if (showMiRNA) visDescs.push(rnaTypes.miRNA);
    if (showLncRNA) visDescs.push(rnaTypes.lncRNA);
    if (showRRNA) visDescs.push(rnaTypes.rRNA);

    if (visDescs.length > 0) {
        let descX = margin + 8;
        let descY2 = infoY + 5;
        for (let rd of visDescs) {
            fill(rd.color);
            noStroke();
            textSize(8);
            textStyle(BOLD);
            textAlign(LEFT, TOP);
            text(rd.label + ': ', descX, descY2);
            let lw = textWidth(rd.label + ': ');
            textStyle(NORMAL);
            fill('#555');
            textSize(7);
            // Truncate to fit
            let maxChars = Math.floor((canvasWidth - margin * 2 - lw - 16) / 3.5);
            let shortDesc = rd.desc.length > maxChars ? rd.desc.substring(0, maxChars) + '...' : rd.desc;
            text(shortDesc, descX + lw, descY2);
            descY2 += 12;
        }
    }

    // Button state indicators
    fill('#666');
    noStroke();
    textSize(9);
    textAlign(LEFT, CENTER);
    let stateX = 280;
    let stateY = drawHeight + 20;
    let states = [
        ['mRNA', showMRNA], ['miRNA', showMiRNA],
        ['lncRNA', showLncRNA], ['rRNA', showRRNA]
    ];
    text('Visible:', stateX, stateY);
    let sx = stateX + 44;
    for (let [name, vis] of states) {
        fill(vis ? '#4CAF50' : '#ccc');
        circle(sx, stateY, 6);
        sx += 12;
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
