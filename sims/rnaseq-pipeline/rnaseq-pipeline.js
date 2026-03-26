// RNA-seq Pipeline - Animated Flowchart
// RNA Extraction → Library Prep → Sequencing → QC/Trim → Alignment → Quantification → DE Analysis
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

let stepBtn, resetBtn, playBtn;
let currentStage = -1;
let playing = false;
let lastStepTime = 0;

const stages = [
    {
        label: 'RNA\nExtraction',
        color: '#C62828',
        desc: 'Total RNA is isolated from cells or tissue using TRIzol or column-based kits. RNA integrity is assessed with an Agilent Bioanalyzer (RIN score > 7 preferred). Poly(A) selection or rRNA depletion enriches mRNA.'
    },
    {
        label: 'Library\nPreparation',
        color: '#6A1B9A',
        desc: 'mRNA is fragmented, reverse-transcribed to cDNA, and sequencing adapters are ligated. Size selection targets 200-500 bp inserts. PCR amplification (10-15 cycles) adds barcodes for multiplexing.'
    },
    {
        label: 'Sequencing',
        color: '#1565C0',
        desc: 'cDNA libraries are sequenced on Illumina platforms (typically 50-150 bp reads). Paired-end sequencing improves mapping. A typical experiment generates 20-50 million reads per sample.'
    },
    {
        label: 'QC &\nTrimming',
        color: '#00838F',
        desc: 'FastQC assesses read quality. Trimmomatic or fastp removes adapters and low-quality bases. Reads < 36 bp after trimming are discarded. MultiQC aggregates reports across samples.'
    },
    {
        label: 'Read\nAlignment',
        color: '#2E7D32',
        desc: 'Reads are aligned to a reference genome using splice-aware aligners like HISAT2 or STAR. These tools handle exon-exon junctions. Typically 70-90% of reads map successfully.'
    },
    {
        label: 'Gene\nQuantification',
        color: '#E65100',
        desc: 'featureCounts or HTSeq counts reads mapping to each gene. Alternatively, pseudo-aligners like Salmon or Kallisto estimate transcript-level abundance (TPM) without full alignment.'
    },
    {
        label: 'Differential\nExpression',
        color: '#AD1457',
        desc: 'DESeq2 or edgeR identifies genes with significant expression changes between conditions. They model count data using negative binomial distributions. Results include log2 fold change, p-value, and adjusted p-value (FDR).'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    stepBtn = createButton('Next Step');
    stepBtn.position(10, drawHeight + 12);
    stepBtn.mousePressed(() => {
        if (currentStage < stages.length - 1) currentStage++;
    });

    playBtn = createButton('Play');
    playBtn.position(100, drawHeight + 12);
    playBtn.mousePressed(() => {
        playing = !playing;
        playBtn.html(playing ? 'Pause' : 'Play');
    });

    resetBtn = createButton('Reset');
    resetBtn.position(165, drawHeight + 12);
    resetBtn.mousePressed(() => {
        currentStage = -1;
        playing = false;
        playBtn.html('Play');
    });

    describe('RNA-seq analysis pipeline animated flowchart with step-through stages', LABEL);
}

function draw() {
    updateCanvasSize();

    if (playing && millis() - lastStepTime > 1200) {
        if (currentStage < stages.length - 1) {
            currentStage++;
            lastStepTime = millis();
        } else {
            playing = false;
            playBtn.html('Play');
        }
    }

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
    text('RNA-seq Analysis Pipeline', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let boxW = 110;
    let boxH = 42;
    let startY = 32;
    let spacingY = 56;
    let flowX = canvasWidth * 0.28;

    // Category labels
    let categories = [
        { start: 0, end: 2, label: 'Wet Lab', color: '#FFE0B2' },
        { start: 3, end: 6, label: 'Computational', color: '#E3F2FD' }
    ];

    for (let cat of categories) {
        let catY = startY + cat.start * spacingY - 8;
        let catH = (cat.end - cat.start + 1) * spacingY + boxH - spacingY + 16;
        fill(cat.color);
        noStroke();
        rect(flowX - boxW / 2 - 14, catY, boxW + 28, catH, 8);
        fill('#888');
        textSize(8);
        textAlign(CENTER, TOP);
        push();
        translate(flowX - boxW / 2 - 8, catY + catH / 2);
        rotate(-HALF_PI);
        text(cat.label, 0, 0);
        pop();
    }

    // Draw stages
    for (let i = 0; i < stages.length; i++) {
        let s = stages[i];
        let bx = flowX - boxW / 2;
        let by = startY + i * spacingY;
        let active = i <= currentStage;
        let isCurrent = i === currentStage;

        // Arrow
        if (i > 0) {
            let arrowY = by - spacingY + boxH;
            stroke(active ? s.color : '#ccc');
            strokeWeight(active ? 2.5 : 1.5);
            line(flowX, arrowY, flowX, by - 4);
            fill(active ? s.color : '#ccc');
            noStroke();
            triangle(flowX - 5, by - 6, flowX + 5, by - 6, flowX, by);
        }

        // Glow
        if (isCurrent) {
            noStroke();
            let c = color(s.color);
            fill(red(c), green(c), blue(c), 40);
            rect(bx - 4, by - 4, boxW + 8, boxH + 8, 10);
        }

        fill(active ? s.color : '#ddd');
        stroke(active ? lerpColor(color(s.color), color(0), 0.3) : '#bbb');
        strokeWeight(isCurrent ? 3 : 1.5);
        rect(bx, by, boxW, boxH, 8);

        fill(active ? 255 : '#999');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(s.label, flowX, by + boxH / 2);
        textStyle(NORMAL);

        // Step number
        fill(active ? 'rgba(255,255,255,0.7)' : '#bbb');
        textSize(8);
        textAlign(LEFT, TOP);
        text((i + 1), bx + 4, by + 3);
    }

    // Info panel
    let infoX = canvasWidth * 0.56;
    let infoW = canvasWidth * 0.40;
    let infoY = 40;
    let infoH = drawHeight - 60;

    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    rect(infoX, infoY, infoW, infoH, 8);

    if (currentStage >= 0) {
        let s = stages[currentStage];
        fill(s.color);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(12);
        textStyle(BOLD);
        text(s.label.replace('\n', ' '), infoX + 10, infoY + 10);
        textStyle(NORMAL);

        fill('#333');
        textSize(10);
        drawWrappedText(s.desc, infoX + 10, infoY + 32, infoW - 20, 14);

        // Draw stage icon
        drawStageIcon(currentStage, infoX + infoW / 2, infoY + infoH - 80, s.color);
    } else {
        fill('#888');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Click "Next Step" to\nwalk through the\nRNA-seq pipeline', infoX + infoW / 2, infoY + infoH / 2);
    }

    // Counter
    fill('#666');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Stage: ' + (currentStage + 1) + ' / ' + stages.length, 240, drawHeight + 22);
}

function drawStageIcon(stage, cx, cy, col) {
    push();
    translate(cx, cy);

    if (stage === 0) {
        // RNA helix
        stroke(col);
        strokeWeight(2);
        noFill();
        for (let i = 0; i < 15; i++) {
            let t = i / 15;
            let x = sin(t * TWO_PI * 2) * 20;
            let y = (t - 0.5) * 50;
            fill(col);
            noStroke();
            circle(x, y, 4);
        }
    } else if (stage === 1) {
        // Fragmented DNA bars
        let frags = [[-25, -15, 20], [-5, -15, 15], [15, -15, 18],
                     [-20, 0, 22], [8, 0, 16], [-15, 15, 18], [10, 15, 20]];
        for (let [fx, fy, fw] of frags) {
            fill(col);
            noStroke();
            rect(fx, fy, fw, 8, 2);
        }
    } else if (stage === 2) {
        // Sequencer dots
        let bases = 'ACGT';
        let baseColors = ['#2E7D32', '#1565C0', '#E65100', '#C62828'];
        textSize(8);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 6; c++) {
                let bi = Math.floor(Math.random() * 4);
                fill(baseColors[bi]);
                noStroke();
                circle(-25 + c * 10, -15 + r * 10, 7);
            }
        }
    } else if (stage === 3) {
        // Quality score bars
        for (let i = 0; i < 10; i++) {
            let h = 5 + Math.random() * 30;
            let good = h > 20;
            fill(good ? '#4CAF50' : '#FF5722');
            noStroke();
            rect(-30 + i * 7, 15 - h, 5, h);
        }
        stroke('#888');
        strokeWeight(0.5);
        drawingContext.setLineDash([3, 3]);
        line(-30, 15 - 20, 40, 15 - 20);
        drawingContext.setLineDash([]);
    } else if (stage === 4) {
        // Read alignment to reference
        fill('#888');
        noStroke();
        rect(-35, -20, 70, 6, 2);
        fill('#333');
        textSize(6);
        textAlign(CENTER, CENTER);
        text('Reference', 0, -17);

        let reads = [[-25, -5, 30], [-10, 5, 25], [5, 15, 28], [-20, 25, 22]];
        for (let [rx, ry, rw] of reads) {
            fill(col);
            noStroke();
            rect(rx, ry, rw, 5, 2);
        }
    } else if (stage === 5) {
        // Count matrix
        textSize(7);
        textStyle(BOLD);
        fill('#333');
        textAlign(CENTER, CENTER);
        let genes = ['GeneA', 'GeneB', 'GeneC'];
        let samples = ['S1', 'S2'];
        for (let i = 0; i < genes.length; i++) {
            fill('#555');
            textAlign(RIGHT, CENTER);
            text(genes[i], -10, -12 + i * 14);
            for (let j = 0; j < samples.length; j++) {
                let val = Math.floor(Math.random() * 900 + 100);
                fill(col);
                textAlign(CENTER, CENTER);
                text(val, 12 + j * 28, -12 + i * 14);
            }
        }
        fill('#888');
        textAlign(CENTER, CENTER);
        text('S1', 12, -26);
        text('S2', 40, -26);
    } else if (stage === 6) {
        // Volcano plot mini
        for (let i = 0; i < 30; i++) {
            let x = (Math.random() - 0.5) * 60;
            let y = Math.random() * -40;
            let sig = Math.abs(x) > 15 && y < -20;
            fill(sig ? '#C62828' : '#B0BEC5');
            noStroke();
            circle(x, y + 20, 4);
        }
        stroke('#888');
        strokeWeight(0.5);
        drawingContext.setLineDash([3, 3]);
        line(-30, 0, 30, 0);
        line(0, -25, 0, 25);
        drawingContext.setLineDash([]);
    }

    textStyle(NORMAL);
    pop();
}

function drawWrappedText(txt, x, y, maxW, lineH) {
    textAlign(LEFT, TOP);
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
