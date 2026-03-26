// Text Mining Pipeline — vis-network MicroSim
// Left-to-right flowchart: PubMed Abstract → NER → Relation Extraction →
// Triple Generation → KG Update. Color: input=blue, NLP=green, KG=purple.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const stageColors = {
        input:  { bg: '#2980B9', border: '#1F618D' },
        nlp:    { bg: '#27AE60', border: '#1E8449' },
        kg:     { bg: '#8E44AD', border: '#6C3483' }
    };

    const nodeData = [
        // Input (level 0)
        { id: 'pubmed',   label: 'PubMed\nAbstracts',    stage: 'input', level: 0,
          desc: 'Biomedical literature database with 35M+ abstracts. Input corpus for text mining. Queries via PubMed API (E-utilities) or bulk download.' },
        { id: 'preproc',  label: 'Text\nPreprocessing',  stage: 'input', level: 0,
          desc: 'Sentence splitting, tokenisation, and normalisation. Remove figure legends, references. Prepare clean text for NLP pipeline.' },
        // NLP (level 1-2)
        { id: 'ner',      label: 'Named Entity\nRecognition',  stage: 'nlp', level: 1,
          desc: 'Identify biomedical entities in text: genes/proteins (BRCA1), diseases (breast cancer), drugs (tamoxifen), chemicals. Tools: BioBERT, PubTator, scispaCy.' },
        { id: 'linking',  label: 'Entity\nLinking',      stage: 'nlp', level: 1,
          desc: 'Map recognised entity mentions to canonical database IDs (e.g., "p53" → TP53/UniProt:P04637). Disambiguation of gene name synonyms.' },
        { id: 'relext',   label: 'Relation\nExtraction',  stage: 'nlp', level: 2,
          desc: 'Detect semantic relationships between entity pairs: "Drug X inhibits Protein Y", "Gene A is associated with Disease B". Methods: dependency parsing, transformer models.' },
        { id: 'coref',    label: 'Coreference\nResolution', stage: 'nlp', level: 2,
          desc: 'Resolve pronouns and abbreviations to their referent entities. "It" → the protein mentioned earlier. Improves relation extraction recall.' },
        // KG (level 3-4)
        { id: 'triple',   label: 'Triple\nGeneration',    stage: 'kg', level: 3,
          desc: 'Convert extracted relations into (subject, predicate, object) triples. Example: (tamoxifen, inhibits, ESR1). Assign confidence scores.' },
        { id: 'filter',   label: 'Confidence\nFiltering', stage: 'kg', level: 3,
          desc: 'Filter triples by confidence threshold. Aggregate evidence across multiple abstracts. Higher co-occurrence count → higher confidence.' },
        { id: 'kgupdate', label: 'KG\nUpdate',           stage: 'kg', level: 4,
          desc: 'Insert validated triples into the knowledge graph. Add provenance (PMID, extraction date, confidence). Merge with existing edges or create new ones.' },
        { id: 'qa',       label: 'Quality\nAssessment',  stage: 'kg', level: 4,
          desc: 'Evaluate extraction quality: precision, recall against gold-standard corpus. Flag low-confidence additions for manual review.' }
    ];

    const edgeData = [
        { from: 'pubmed',  to: 'preproc' },
        { from: 'preproc', to: 'ner' },
        { from: 'ner',     to: 'linking' },
        { from: 'ner',     to: 'relext' },
        { from: 'linking', to: 'relext' },
        { from: 'relext',  to: 'coref' },
        { from: 'coref',   to: 'triple' },
        { from: 'relext',  to: 'triple' },
        { from: 'triple',  to: 'filter' },
        { from: 'filter',  to: 'kgupdate' },
        { from: 'kgupdate',to: 'qa' },
        // Feedback
        { from: 'qa',      to: 'filter', feedback: true }
    ];

    // Fixed positions for left-to-right flow
    const levelX = { 0: -280, 1: -100, 2: 80, 3: 260, 4: 420 };
    const positions = {};
    const levelNodes = {};
    nodeData.forEach(n => {
        if (!levelNodes[n.level]) levelNodes[n.level] = [];
        levelNodes[n.level].push(n.id);
    });
    for (let [lev, ids] of Object.entries(levelNodes)) {
        ids.forEach((id, i) => {
            positions[id] = {
                x: levelX[lev],
                y: (i - (ids.length - 1) / 2) * 90
            };
        });
    }

    const nodes = new vis.DataSet(nodeData.map(n => ({
        id: n.id, label: n.label,
        x: positions[n.id].x, y: positions[n.id].y,
        shape: 'box',
        color: { background: stageColors[n.stage].bg, border: stageColors[n.stage].border },
        font: { color: '#FFF', size: 11, face: 'Arial', multi: true },
        borderWidth: 2, shadow: true, margin: 8,
        stageType: n.stage, level: n.level, description: n.desc
    })));

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        arrows: 'to',
        dashes: e.feedback || false,
        color: { color: e.feedback ? '#E74C3C' : '#666', highlight: '#333' },
        width: 1.8,
        font: e.feedback ? { size: 8, color: '#C0392B', label: 'refine' } : {},
        label: e.feedback ? 'refine' : '',
        smooth: e.feedback ? { type: 'curvedCCW', roundness: 0.4 } : { type: 'cubicBezier', roundness: 0.1 }
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:440px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Pipeline Stages</strong><br>
                <span style="display:inline-block;width:10px;height:10px;background:#2980B9;border-radius:2px;margin:2px 4px -1px 0;"></span>Input<br>
                <span style="display:inline-block;width:10px;height:10px;background:#27AE60;border-radius:2px;margin:2px 4px -1px 0;"></span>NLP Processing<br>
                <span style="display:inline-block;width:10px;height:10px;background:#8E44AD;border-radius:2px;margin:2px 4px -1px 0;"></span>KG Construction<br>
                <span style="color:#E74C3C;font-size:10px;">- - - feedback</span>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a stage to see its description. The pipeline extracts biomedical knowledge from literature into a knowledge graph.
            </div>
        </div>
    `;

    const container = document.getElementById('network');
    const infoPanel = document.getElementById('info-panel');
    const enableMouse = !isInIframe();

    const options = {
        layout: { randomSeed: 42 },
        physics: { enabled: false },
        interaction: {
            hover: true, tooltipDelay: 200,
            dragView: enableMouse, zoomView: enableMouse,
            dragNodes: false, navigationButtons: true
        },
        edges: { selectionWidth: 2 }
    };

    const network = new vis.Network(container, { nodes, edges }, options);

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            const item = nodeData.find(n => n.id === nodeId);
            const conn = network.getConnectedNodes(nodeId);
            const connE = network.getConnectedEdges(nodeId);

            infoPanel.innerHTML = `<strong>${nd.label.replace(/\n/g, ' ')}</strong>
                <span style="color:${stageColors[nd.stageType].bg};">(${nd.stageType})</span><br>${item.desc}`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.15
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id)
                    ? { color: edgeData[e.id].feedback ? '#E74C3C' : '#333' }
                    : { color: 'rgba(180,180,180,0.1)' },
                width: connE.includes(e.id) ? 3 : 0.3
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a stage to see its description. The pipeline extracts biomedical knowledge from literature into a knowledge graph.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map((e, i) => ({
            id: e.id,
            color: { color: edgeData[e.id].feedback ? '#E74C3C' : '#666', highlight: '#333' },
            width: 1.8
        })));
    }

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
