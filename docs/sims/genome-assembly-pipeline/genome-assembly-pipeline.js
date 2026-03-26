// Genome Assembly Pipeline - Animated Flowchart
// Raw Reads → QC Filter → K-mer Count → De Bruijn Graph → Contigs → Scaffolding → Gap Filling → Assembly
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
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
        label: 'Raw Sequencing\nReads',
        color: '#4A90D9',
        desc: 'Millions of short DNA fragments (reads) from the sequencer, typically 150-300 bp for Illumina. These reads are the starting material and may contain errors, adapters, and contamination.'
    },
    {
        label: 'Quality Control\n& Filtering',
        color: '#27AE60',
        desc: 'Trim adapters, remove low-quality bases (Phred < 20), and discard short reads. Tools like Trimmomatic and FastQC ensure only high-quality data enters assembly. Typically 85-95% of reads survive.'
    },
    {
        label: 'K-mer\nCounting',
        color: '#E67E22',
        desc: 'Count all k-mers (subsequences of length k) in the reads using tools like Jellyfish. K-mer frequency histograms reveal genome size, heterozygosity, and error rate. Unique k-mers suggest sequencing errors.'
    },
    {
        label: 'De Bruijn\nGraph',
        color: '#8E44AD',
        desc: 'Build a de Bruijn graph where nodes are (k-1)-mers and edges are k-mers. Reads that share k-mers are implicitly overlapped. The graph compactly represents all overlap relationships in O(n) space.'
    },
    {
        label: 'Contig\nAssembly',
        color: '#C0392B',
        desc: 'Traverse unambiguous paths in the graph to produce contigs (contiguous sequences). Repeat regions, heterozygosity, and errors create branches (bubbles and tips) that fragment the assembly.'
    },
    {
        label: 'Scaffolding',
        color: '#2980B9',
        desc: 'Order and orient contigs using paired-end and mate-pair read information. If two ends of a read pair map to different contigs, those contigs are linked. Scaffold N50 is typically much larger than contig N50.'
    },
    {
        label: 'Gap\nFilling',
        color: '#16A085',
        desc: 'Fill gaps between scaffolded contigs using original reads or long reads. Tools like GapCloser align reads spanning gaps and extend contig ends. This improves assembly completeness and gene predictions.'
    },
    {
        label: 'Final\nAssembly',
        color: '#2C3E50',
        desc: 'The polished genome assembly, assessed by metrics like N50 (half the genome is in contigs this long or longer), BUSCO completeness (% of expected genes found), and total assembly size vs. estimated genome size.'
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

    describe('Genome assembly pipeline animated flowchart with step-through stages', LABEL);
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
    text('Genome Assembly Pipeline', canvasWidth / 2, 4);
    textStyle(NORMAL);

    let boxW = 120;
    let boxH = 40;
    let startY = 30;
    let spacingY = 48;
    let flowX = canvasWidth * 0.28;

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
        drawStageIcon(currentStage, infoX + infoW / 2, infoY + infoH - 80, s.color, infoW - 30);
    } else {
        fill('#888');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Click "Next Step" to\nwalk through the\nassembly pipeline', infoX + infoW / 2, infoY + infoH / 2);
    }

    // Counter
    fill('#666');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Stage: ' + (currentStage + 1) + ' / ' + stages.length, 240, drawHeight + 22);
}

function drawStageIcon(stage, cx, cy, col, maxW) {
    push();
    translate(cx, cy);
    let hw = maxW / 2;

    if (stage === 0) {
        // Short reads
        textSize(7);
        textStyle(BOLD);
        let reads = ['ATCGGTA', 'CGTAACG', 'TAACGTG', 'GCGTAAC'];
        for (let i = 0; i < reads.length; i++) {
            let y = (i - 1.5) * 14;
            fill('#E3F2FD');
            stroke('#90CAF9');
            strokeWeight(1);
            rect(-35, y - 6, 70, 12, 3);
            fill(col);
            noStroke();
            textAlign(CENTER, CENTER);
            text(reads[i], 0, y);
        }
    } else if (stage === 1) {
        // QC filter funnel
        fill(col);
        stroke(col);
        strokeWeight(2);
        beginShape();
        vertex(-30, -20);
        vertex(30, -20);
        vertex(10, 10);
        vertex(10, 25);
        vertex(-10, 25);
        vertex(-10, 10);
        endShape(CLOSE);
        fill(255);
        noStroke();
        textSize(8);
        textAlign(CENTER, CENTER);
        text('QC', 0, -5);
    } else if (stage === 2) {
        // K-mer histogram
        let heights = [2, 5, 12, 8, 4, 2, 1];
        let maxH = 12;
        let barW = 8;
        for (let i = 0; i < heights.length; i++) {
            let bx = (i - 3) * (barW + 2);
            let bh = (heights[i] / maxH) * 35;
            fill(col);
            noStroke();
            rect(bx, 15 - bh, barW, bh);
        }
        stroke(col);
        strokeWeight(1);
        line(-30, 15, 30, 15);
        line(-30, 15, -30, -25);
    } else if (stage === 3) {
        // De Bruijn graph snippet
        let gNodes = [[0, -15], [-25, 15], [25, 15]];
        stroke('#999');
        strokeWeight(1.5);
        for (let i = 0; i < gNodes.length; i++) {
            for (let j = i + 1; j < gNodes.length; j++) {
                line(gNodes[i][0], gNodes[i][1], gNodes[j][0], gNodes[j][1]);
            }
        }
        fill(col);
        noStroke();
        for (let [gx, gy] of gNodes) circle(gx, gy, 12);
    } else if (stage === 4) {
        // Contigs as colored bars
        let contigs = [55, 35, 45, 20, 30];
        let y = -25;
        for (let c of contigs) {
            fill(col);
            noStroke();
            rect(-c / 2, y, c, 8, 2);
            y += 12;
        }
    } else if (stage === 5) {
        // Scaffolded contigs with gaps
        let y = -15;
        fill(col);
        noStroke();
        rect(-40, y, 30, 8, 2);
        rect(0, y, 35, 8, 2);
        stroke(col);
        strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(-10, y + 4, 0, y + 4);
        drawingContext.setLineDash([]);
        y += 18;
        fill(col);
        noStroke();
        rect(-35, y, 40, 8, 2);
        rect(15, y, 25, 8, 2);
        stroke(col);
        strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(5, y + 4, 15, y + 4);
        drawingContext.setLineDash([]);
    } else if (stage === 6) {
        // Gap filling
        fill(col);
        noStroke();
        rect(-40, -5, 30, 10, 2);
        rect(10, -5, 30, 10, 2);
        fill('#FFD54F');
        rect(-10, -5, 20, 10, 2);
        fill('#333');
        textSize(7);
        textAlign(CENTER, CENTER);
        text('FILLED', 0, 0);
    } else if (stage === 7) {
        // Final assembly stats
        textSize(8);
        textStyle(BOLD);
        fill(col);
        noStroke();
        textAlign(CENTER, CENTER);
        let stats = ['N50: 5.2 Mb', 'Contigs: 342', 'BUSCO: 97.3%', 'Size: 3.1 Gb'];
        for (let i = 0; i < stats.length; i++) {
            text(stats[i], 0, (i - 1.5) * 14);
        }
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
