// Bipartite Metabolic Sub-network (Glycolysis)
// Enzymes (ellipses, teal) on left, Metabolites (rectangles, orange) on right
// Hover highlights connected edges and partner nodes
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 720;
let controlHeight = 0;
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Enzymes (left column)
const enzymes = [
    { id: 'E1', label: 'Hexokinase',        desc: 'Transfers a phosphate group from ATP to glucose, forming glucose-6-phosphate (G6P) and ADP. This irreversible reaction traps glucose inside the cell and commits it to metabolism. Hexokinase is inhibited by its own product, G6P.' },
    { id: 'E2', label: 'PGI',               desc: 'Phosphoglucose isomerase catalyzes the reversible isomerization of glucose-6-phosphate (an aldose) to fructose-6-phosphate (a ketose). This rearrangement repositions the carbonyl group to prepare the molecule for the next phosphorylation step.' },
    { id: 'E3', label: 'PFK-1',             desc: 'Phosphofructokinase-1 is the most important regulatory enzyme in glycolysis. It phosphorylates fructose-6-phosphate to fructose-1,6-bisphosphate using ATP. This is the committed step — allosterically activated by AMP and inhibited by ATP and citrate.' },
    { id: 'E4', label: 'Aldolase',           desc: 'Cleaves the six-carbon fructose-1,6-bisphosphate into two three-carbon molecules: glyceraldehyde-3-phosphate (G3P) and dihydroxyacetone phosphate (DHAP). Only G3P continues directly; DHAP is converted to G3P by triose phosphate isomerase.' },
    { id: 'E5', label: 'GAPDH',             desc: 'Glyceraldehyde-3-phosphate dehydrogenase oxidizes G3P by transferring electrons to NAD+, producing NADH, and simultaneously attaches an inorganic phosphate to form the high-energy intermediate 1,3-bisphosphoglycerate. This is the only oxidation step in glycolysis.' },
    { id: 'E6', label: 'PGK',              desc: 'Phosphoglycerate kinase transfers the high-energy phosphate from 1,3-bisphosphoglycerate to ADP, producing ATP and 3-phosphoglycerate. This is the first substrate-level phosphorylation in glycolysis, directly generating ATP without the electron transport chain.' },
    { id: 'E7', label: 'PGM',              desc: 'Phosphoglycerate mutase shifts the phosphate group from carbon 3 to carbon 2, converting 3-phosphoglycerate to 2-phosphoglycerate. This intramolecular rearrangement prepares the molecule for dehydration by enolase in the next step.' },
    { id: 'E8', label: 'Enolase',          desc: 'Removes a water molecule from 2-phosphoglycerate, forming phosphoenolpyruvate (PEP). This dehydration reaction redistributes energy within the molecule, creating the high-energy enol phosphate bond that will drive ATP synthesis in the final step.' },
    { id: 'E9', label: 'Pyruvate\nKinase',  desc: 'Transfers the phosphate group from PEP to ADP, producing pyruvate and ATP. This is the second substrate-level phosphorylation in glycolysis. Pyruvate kinase is allosterically regulated — activated by fructose-1,6-bisphosphate and inhibited by ATP.' }
];

// Metabolites (right column)
const metabolites = [
    { id: 'M1', label: 'Glucose',        desc: 'A six-carbon monosaccharide (C6H12O6) and the primary fuel for glycolysis. Glucose enters the cell via membrane transporters (GLUTs) and is immediately phosphorylated to prevent it from leaving.' },
    { id: 'M2', label: 'G6P',            desc: 'Glucose-6-phosphate is glucose with a phosphate group on carbon 6. The negative charge traps it inside the cell. G6P sits at a metabolic branch point — it can enter glycolysis, the pentose phosphate pathway, or glycogen synthesis.' },
    { id: 'M3', label: 'F6P',            desc: 'Fructose-6-phosphate is the ketose isomer of G6P. Converting the aldose sugar to a ketose repositions the carbonyl group to carbon 2, enabling symmetric cleavage of the six-carbon chain in the aldolase step two reactions later.' },
    { id: 'M4', label: 'F1,6BP',         desc: 'Fructose-1,6-bisphosphate has phosphate groups on both carbons 1 and 6. This symmetric phosphorylation allows aldolase to split the molecule into two phosphorylated three-carbon fragments. Its formation is the committed step of glycolysis.' },
    { id: 'M5', label: 'G3P',            desc: 'Glyceraldehyde-3-phosphate is a three-carbon aldehyde with a phosphate on carbon 3. It is the only triose that continues directly through the payoff phase of glycolysis. Each glucose produces two molecules of G3P, so all downstream yields are doubled.' },
    { id: 'M6', label: '1,3BPG',         desc: '1,3-Bisphosphoglycerate carries a high-energy acyl-phosphate bond on carbon 1 (formed by oxidation of the aldehyde). This bond stores enough energy to drive substrate-level phosphorylation of ADP to ATP in the next step.' },
    { id: 'M7', label: '3-PG',           desc: '3-Phosphoglycerate is produced after the high-energy phosphate of 1,3BPG is transferred to ADP. The remaining phosphate on carbon 3 is a low-energy ester bond that must be rearranged before more energy can be extracted.' },
    { id: 'M8', label: '2-PG',           desc: '2-Phosphoglycerate differs from 3-PG only in the position of the phosphate group, now on carbon 2. This subtle shift sets up the dehydration reaction by enolase, which will create the high-energy enol phosphate bond in PEP.' },
    { id: 'M9', label: 'PEP',            desc: 'Phosphoenolpyruvate has the highest phosphoryl-transfer potential of any glycolytic intermediate. The enol phosphate bond stores energy because hydrolysis releases the enol form, which spontaneously tautomerizes to the more stable keto form (pyruvate).' },
    { id: 'M10', label: 'Pyruvate',      desc: 'The three-carbon end product of glycolysis. Under aerobic conditions pyruvate enters the mitochondria for the TCA cycle. Under anaerobic conditions it is reduced to lactate (in animals) or ethanol (in yeast) to regenerate NAD+ for continued glycolysis.' }
];

// Edges: enzyme -> metabolites it connects (substrate, product)
const connections = [
    { enzyme: 'E1', metabolite: 'M1', role: 'substrate' },
    { enzyme: 'E1', metabolite: 'M2', role: 'product' },
    { enzyme: 'E2', metabolite: 'M2', role: 'substrate' },
    { enzyme: 'E2', metabolite: 'M3', role: 'product' },
    { enzyme: 'E3', metabolite: 'M3', role: 'substrate' },
    { enzyme: 'E3', metabolite: 'M4', role: 'product' },
    { enzyme: 'E4', metabolite: 'M4', role: 'substrate' },
    { enzyme: 'E4', metabolite: 'M5', role: 'product' },
    { enzyme: 'E5', metabolite: 'M5', role: 'substrate' },
    { enzyme: 'E5', metabolite: 'M6', role: 'product' },
    { enzyme: 'E6', metabolite: 'M6', role: 'substrate' },
    { enzyme: 'E6', metabolite: 'M7', role: 'product' },
    { enzyme: 'E7', metabolite: 'M7', role: 'substrate' },
    { enzyme: 'E7', metabolite: 'M8', role: 'product' },
    { enzyme: 'E8', metabolite: 'M8', role: 'substrate' },
    { enzyme: 'E8', metabolite: 'M9', role: 'product' },
    { enzyme: 'E9', metabolite: 'M9', role: 'substrate' },
    { enzyme: 'E9', metabolite: 'M10', role: 'product' }
];

let hoveredNode = null;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    describe('Bipartite graph of glycolysis enzymes and metabolites with hover highlighting', LABEL);
}

function draw() {
    updateCanvasSize();

    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Title
    fill('#1a1a1a');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Glycolysis: Bipartite Network', canvasWidth / 2, 8);
    textStyle(NORMAL);

    // Column headers
    textSize(13);
    fill('#00897B');
    textStyle(BOLD);
    text('Enzymes', canvasWidth * 0.25, 34);
    fill('#E65100');
    text('Metabolites', canvasWidth * 0.75, 34);
    textStyle(NORMAL);

    let topY = 58;
    let usableH = drawHeight - topY - 60;

    // Calculate positions
    let ePositions = {};
    let mPositions = {};
    let eColX = canvasWidth * 0.25;
    let mColX = canvasWidth * 0.75;
    let eSpacing = usableH / (enzymes.length);
    let mSpacing = usableH / (metabolites.length);

    for (let i = 0; i < enzymes.length; i++) {
        ePositions[enzymes[i].id] = { x: eColX, y: topY + eSpacing * (i + 0.5) };
    }
    for (let i = 0; i < metabolites.length; i++) {
        mPositions[metabolites[i].id] = { x: mColX, y: topY + mSpacing * (i + 0.5) };
    }

    // Detect hover
    hoveredNode = null;
    let nodeR = min(22, canvasWidth * 0.04);
    let sqSize = nodeR * 1.6;

    for (let e of enzymes) {
        let p = ePositions[e.id];
        // Ellipse hit test
        let dx = (mouseX - p.x) / (nodeR * 1.6 + 5);
        let dy = (mouseY - p.y) / (nodeR + 5);
        if (dx * dx + dy * dy < 1) hoveredNode = e.id;
    }
    for (let m of metabolites) {
        let p = mPositions[m.id];
        if (abs(mouseX - p.x) < sqSize * 0.8 + 5 && abs(mouseY - p.y) < sqSize / 2 + 5) hoveredNode = m.id;
    }

    // Get connected nodes for highlighting
    let connectedNodes = new Set();
    let connectedEdges = new Set();
    if (hoveredNode) {
        connectedNodes.add(hoveredNode);
        for (let i = 0; i < connections.length; i++) {
            let c = connections[i];
            if (c.enzyme === hoveredNode || c.metabolite === hoveredNode) {
                connectedNodes.add(c.enzyme);
                connectedNodes.add(c.metabolite);
                connectedEdges.add(i);
            }
        }
    }

    // Shape dimensions
    let ellipseW = nodeR * 3.2;  // 30% wider than tall
    let ellipseH = nodeR * 2;
    let rectW = sqSize * 1.6;   // 30% wider than tall
    let rectH = sqSize;

    // Draw edges with directional arrows
    let arrowSize = 9;
    for (let i = 0; i < connections.length; i++) {
        let c = connections[i];
        let ep = ePositions[c.enzyme];
        let mp = mPositions[c.metabolite];
        let isHighlighted = connectedEdges.has(i);
        let isDimmed = hoveredNode && !isHighlighted;

        let edgeColor;
        if (isDimmed) {
            edgeColor = color(220);
            stroke(220);
            strokeWeight(1);
        } else if (isHighlighted) {
            edgeColor = color(c.role === 'substrate' ? '#00897B' : '#E65100');
            stroke(edgeColor);
            strokeWeight(3);
        } else {
            edgeColor = color(180);
            stroke(180);
            strokeWeight(1.5);
        }

        // Determine direction: substrate flows toward enzyme, product flows away
        let x1, y1, x2, y2;
        if (c.role === 'substrate') {
            // Metabolite → Enzyme
            x1 = mp.x - rectW / 2;  y1 = mp.y;
            x2 = ep.x + ellipseW / 2; y2 = ep.y;
        } else {
            // Enzyme → Metabolite
            x1 = ep.x + ellipseW / 2; y1 = ep.y;
            x2 = mp.x - rectW / 2;  y2 = mp.y;
        }
        line(x1, y1, x2, y2);

        // Arrowhead at destination
        let angle = atan2(y2 - y1, x2 - x1);
        fill(edgeColor || 180);
        noStroke();
        push();
        translate(x2, y2);
        rotate(angle);
        triangle(0, 0, -arrowSize * 1.4, -arrowSize * 0.5, -arrowSize * 1.4, arrowSize * 0.5);
        pop();
    }

    // Draw enzyme nodes (ellipses, teal)
    for (let e of enzymes) {
        let p = ePositions[e.id];
        let isConn = connectedNodes.has(e.id);
        let isDimmed = hoveredNode && !isConn;

        if (isDimmed) {
            fill(220);
            stroke(200);
        } else {
            fill(isConn ? '#00897B' : '#80CBC4');
            stroke('#00695C');
        }
        strokeWeight(isConn ? 2.5 : 1.5);
        ellipse(p.x, p.y, ellipseW, ellipseH);

        fill(isDimmed ? 180 : (isConn ? 255 : 30));
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(e.label, p.x, p.y);
        textStyle(NORMAL);
    }

    // Draw metabolite nodes (rectangles, orange)
    for (let m of metabolites) {
        let p = mPositions[m.id];
        let isConn = connectedNodes.has(m.id);
        let isDimmed = hoveredNode && !isConn;

        if (isDimmed) {
            fill(220);
            stroke(200);
        } else {
            fill(isConn ? '#E65100' : '#FFB74D');
            stroke('#BF360C');
        }
        strokeWeight(isConn ? 2.5 : 1.5);
        rectMode(CENTER);
        rect(p.x, p.y, rectW, rectH, 4);
        rectMode(CORNER);

        fill(isDimmed ? 180 : (isConn ? 255 : 30));
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        textStyle(BOLD);
        text(m.label, p.x, p.y);
        textStyle(NORMAL);
    }

    // Info panel at bottom
    let panelH = 60;
    let panelY = drawHeight - panelH - 8;
    let textW = canvasWidth - margin * 2 - 20;
    if (hoveredNode) {
        let info = enzymes.find(e => e.id === hoveredNode) || metabolites.find(m => m.id === hoveredNode);
        if (info) {
            fill(255, 255, 255, 230);
            stroke(200);
            strokeWeight(1);
            rect(margin, panelY, canvasWidth - margin * 2, panelH, 6);

            fill('#1a1a1a');
            noStroke();
            textAlign(LEFT, TOP);
            textSize(12);
            textStyle(BOLD);
            text(info.label.replace('\n', ' '), margin + 10, panelY + 6);
            textStyle(NORMAL);
            fill('#555');
            textSize(11);
            textLeading(15);
            text(info.desc, margin + 10, panelY + 24, textW, panelH - 30);
        }
    } else {
        fill(255, 255, 255, 180);
        stroke(200);
        strokeWeight(1);
        rect(margin, panelY, canvasWidth - margin * 2, panelH, 6);
        fill('#888');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Hover over an enzyme or metabolite to see connections', canvasWidth / 2, panelY + panelH / 2);
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
