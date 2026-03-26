// Metabolomics Pipeline — p5.js MicroSim
// Pipeline flowchart: Sample → LC-MS/MS → Feature Extraction → Statistical Testing → Pathway Enrichment
// Step button advances through stages. Each stage has icon and description panel.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 14;

let stepBtn, resetBtn;
let currentStage = 0;

const stages = [
    {
        name: 'Sample Preparation',
        icon: 'flask',
        color: '#2980B9',
        desc: 'Biological samples (plasma, urine, tissue) are collected and processed. Metabolites are extracted using organic solvents (e.g., methanol/water). Quality control (QC) samples are prepared by pooling aliquots.',
        details: ['Collect biological samples', 'Protein precipitation', 'Metabolite extraction', 'QC sample pooling', 'Randomise run order']
    },
    {
        name: 'LC-MS/MS Analysis',
        icon: 'spectrum',
        color: '#8E44AD',
        desc: 'Liquid chromatography separates metabolites by polarity. Mass spectrometry detects ions by mass-to-charge ratio (m/z). MS/MS fragments ions for structural identification. Each sample yields thousands of features.',
        details: ['Chromatographic separation', 'Ionisation (ESI+/ESI−)', 'MS1 full scan', 'MS2 fragmentation', 'Raw data files (.mzML)']
    },
    {
        name: 'Feature Extraction',
        icon: 'peaks',
        color: '#E67E22',
        desc: 'Raw spectra are processed to detect peaks and align retention times across samples. Each feature is an m/z–RT pair with an intensity value. Software: XCMS, MZmine, MS-DIAL.',
        details: ['Peak detection', 'Retention time alignment', 'Gap filling', 'Adduct/isotope grouping', 'Feature table (m/z × samples)']
    },
    {
        name: 'Statistical Testing',
        icon: 'stats',
        color: '#27AE60',
        desc: 'Features are normalised, log-transformed, and compared between groups. Volcano plots show fold-change vs p-value. Multivariate methods (PCA, PLS-DA) reveal group separation. Multiple testing correction (FDR) applied.',
        details: ['Normalisation & scaling', 'PCA / PLS-DA', 'Univariate t-tests', 'Volcano plot (FC vs p)', 'FDR correction']
    },
    {
        name: 'Pathway Enrichment',
        icon: 'network',
        color: '#C0392B',
        desc: 'Significant metabolites are mapped to known pathways (KEGG, HMDB). Over-representation analysis (ORA) or pathway topology analysis identifies dysregulated pathways. Results guide biological interpretation.',
        details: ['Metabolite identification', 'Database matching (HMDB)', 'Pathway mapping (KEGG)', 'Over-representation analysis', 'Biological interpretation']
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    stepBtn = createButton('Next Stage');
    stepBtn.position(margin, drawHeight + 10);
    stepBtn.mousePressed(() => {
        if (currentStage < stages.length - 1) currentStage++;
    });

    resetBtn = createButton('Reset');
    resetBtn.position(margin + 100, drawHeight + 10);
    resetBtn.mousePressed(() => { currentStage = 0; });

    textFont('Arial');
    describe('Metabolomics data processing pipeline with five stages from sample to pathway enrichment', LABEL);
}

function draw() {
    updateCanvasSize();
    background('aliceblue');
    fill('white');
    noStroke();
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('#1a1a1a');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text('Metabolomics Data Pipeline', canvasWidth / 2, 6);
    textStyle(NORMAL);

    // Pipeline flow (top section)
    let flowY = 36;
    let flowH = 80;
    let stageW = (canvasWidth - 2 * margin - (stages.length - 1) * 8) / stages.length;

    for (let i = 0; i < stages.length; i++) {
        let sx = margin + i * (stageW + 8);
        let active = i <= currentStage;
        let current = i === currentStage;

        // Box
        fill(active ? stages[i].color : '#ccc');
        if (current) {
            stroke('#333');
            strokeWeight(2.5);
        } else {
            stroke(active ? stages[i].color : '#bbb');
            strokeWeight(1);
        }
        rect(sx, flowY, stageW, flowH, 8);

        // Stage number
        fill(active ? '#FFF' : '#999');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(10);
        text('Stage ' + (i + 1), sx + stageW / 2, flowY + 6);

        // Icon
        textSize(20);
        let iconChar = getIconChar(stages[i].icon);
        text(iconChar, sx + stageW / 2, flowY + 22);

        // Name
        textSize(9);
        textStyle(BOLD);
        text(stages[i].name, sx + stageW / 2, flowY + 50, stageW - 4, 30);
        textStyle(NORMAL);

        // Arrow between stages
        if (i < stages.length - 1) {
            let arrowX = sx + stageW + 1;
            let arrowY = flowY + flowH / 2;
            fill(i < currentStage ? '#333' : '#bbb');
            noStroke();
            triangle(arrowX, arrowY - 5, arrowX + 7, arrowY, arrowX, arrowY + 5);
        }
    }

    // Detail panel for current stage
    let panelY = flowY + flowH + 24;
    let panelH = drawHeight - panelY - 10;
    let st = stages[currentStage];

    fill('#FFF');
    stroke(st.color);
    strokeWeight(2);
    rect(margin, panelY, canvasWidth - 2 * margin, panelH, 8);

    // Stage header
    fill(st.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text(st.name, margin + 12, panelY + 10);
    textStyle(NORMAL);

    // Description
    fill('#333');
    textSize(11);
    text(st.desc, margin + 12, panelY + 32, canvasWidth - 2 * margin - 24, 70);

    // Steps list
    let listY = panelY + 110;
    fill(st.color);
    textSize(12);
    textStyle(BOLD);
    text('Key Steps:', margin + 12, listY);
    textStyle(NORMAL);
    listY += 20;

    fill('#444');
    textSize(11);
    for (let j = 0; j < st.details.length; j++) {
        let checkmark = j <= Math.floor(frameCount / 30) % (st.details.length + 2) ? '✓' : '○';
        text(checkmark + '  ' + st.details[j], margin + 18, listY);
        listY += 18;
    }

    // Draw mini-visualisation for current stage
    let vizX = canvasWidth / 2 + 20;
    let vizY = panelY + 120;
    let vizW = canvasWidth / 2 - margin - 30;
    let vizH = panelH - 130;
    if (vizW > 60 && vizH > 40) {
        drawStageViz(currentStage, vizX, vizY, vizW, vizH, st.color);
    }

    // Step indicator
    fill('#666');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Stage ' + (currentStage + 1) + ' of ' + stages.length, canvasWidth / 2 + 60, drawHeight + 20);
}

function getIconChar(icon) {
    switch (icon) {
        case 'flask':    return '⚗';
        case 'spectrum': return '📊';
        case 'peaks':    return '📈';
        case 'stats':    return '📉';
        case 'network':  return '🔬';
        default:         return '●';
    }
}

function drawStageViz(stage, x, y, w, h, col) {
    push();
    noFill();
    stroke('#eee');
    strokeWeight(1);
    rect(x, y, w, h, 4);

    switch (stage) {
        case 0: // Sample tubes
            for (let i = 0; i < 5; i++) {
                let tx = x + 10 + i * (w - 20) / 4;
                fill(col);
                stroke('#FFF');
                strokeWeight(1);
                rect(tx - 6, y + 10, 12, h - 30, 0, 0, 4, 4);
                fill('#FFF');
                noStroke();
                rect(tx - 6, y + 10, 12, 6);
                // Liquid level varies
                let lvl = map(sin(frameCount * 0.02 + i), -1, 1, 0.4, 0.8);
                fill(red(color(col)), green(color(col)), blue(color(col)), 120);
                noStroke();
                rect(tx - 5, y + 10 + (h - 30) * (1 - lvl), 10, (h - 30) * lvl - 1, 0, 0, 3, 3);
            }
            break;
        case 1: // Mass spectrum peaks
            stroke(col);
            strokeWeight(1.5);
            for (let i = 0; i < 15; i++) {
                let px = x + 5 + i * (w - 10) / 14;
                let ph = random(10, h - 15);
                if (i === 4 || i === 9) ph = h - 15; // tall peaks
                line(px, y + h - 5, px, y + h - 5 - ph * 0.6);
            }
            // Axis
            stroke('#999');
            strokeWeight(0.5);
            line(x + 3, y + h - 5, x + w - 3, y + h - 5);
            noStroke();
            fill('#999');
            textSize(8);
            textAlign(CENTER, TOP);
            text('m/z →', x + w / 2, y + h - 3);
            break;
        case 2: // Feature table grid
            let rows = 6, cols = 5;
            let cw = (w - 10) / cols;
            let ch = (h - 10) / rows;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    let val = noise(r * 0.5, c * 0.5, frameCount * 0.01);
                    fill(lerpColor(color(255), color(col), val));
                    stroke('#ddd');
                    strokeWeight(0.5);
                    rect(x + 5 + c * cw, y + 5 + r * ch, cw, ch);
                }
            }
            break;
        case 3: // Volcano plot
            fill('#eee');
            noStroke();
            rect(x + 2, y + 2, w - 4, h - 4, 3);
            for (let i = 0; i < 40; i++) {
                let px = x + 10 + random(w - 20);
                let py = y + 10 + random(h - 20);
                let fc = map(px, x, x + w, -3, 3);
                let pv = map(py, y, y + h, 4, 0);
                let sig = abs(fc) > 1 && pv > 1.3;
                fill(sig ? (fc > 0 ? '#E74C3C' : '#2980B9') : '#bbb');
                noStroke();
                circle(px, py, 5);
            }
            // Threshold lines
            stroke('#999');
            strokeWeight(0.5);
            setLineDash([3, 3]);
            let midX = x + w / 2;
            line(midX - w * 0.17, y + 2, midX - w * 0.17, y + h - 2);
            line(midX + w * 0.17, y + 2, midX + w * 0.17, y + h - 2);
            line(x + 2, y + h * 0.65, x + w - 2, y + h * 0.65);
            setLineDash([]);
            break;
        case 4: // Pathway network
            let nNodes = 8;
            for (let i = 0; i < nNodes; i++) {
                let a = TWO_PI * i / nNodes;
                let nx1 = x + w / 2 + cos(a) * (w / 3);
                let ny1 = y + h / 2 + sin(a) * (h / 3);
                for (let j = i + 1; j < nNodes; j++) {
                    if (random() > 0.5) {
                        let a2 = TWO_PI * j / nNodes;
                        let nx2 = x + w / 2 + cos(a2) * (w / 3);
                        let ny2 = y + h / 2 + sin(a2) * (h / 3);
                        stroke('#ccc');
                        strokeWeight(1);
                        line(nx1, ny1, nx2, ny2);
                    }
                }
            }
            for (let i = 0; i < nNodes; i++) {
                let a = TWO_PI * i / nNodes;
                let nx = x + w / 2 + cos(a) * (w / 3);
                let ny = y + h / 2 + sin(a) * (h / 3);
                fill(i < 3 ? '#E74C3C' : col);
                noStroke();
                circle(nx, ny, 12);
            }
            break;
    }
    pop();
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
