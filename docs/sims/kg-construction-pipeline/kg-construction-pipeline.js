// KG Construction Pipeline — vis-network MicroSim
// Left-to-right flowchart: Source DBs → Extraction → Schema Mapping →
// Entity Resolution → Integration → Unified KG. Step through stages.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const stageColors = {
        source:      { bg: '#2980B9', border: '#1F618D' },
        extraction:  { bg: '#27AE60', border: '#1E8449' },
        mapping:     { bg: '#E67E22', border: '#D35400' },
        resolution:  { bg: '#8E44AD', border: '#6C3483' },
        integration: { bg: '#E74C3C', border: '#C0392B' },
        output:      { bg: '#1ABC9C', border: '#16A085' }
    };

    const nodeData = [
        // Source databases (level 0)
        { id: 'uniprot', label: 'UniProt',   stage: 'source',      level: 0, desc: 'Comprehensive protein sequence and annotation database. Provides gene-protein mappings, GO annotations, and cross-references.' },
        { id: 'omim',    label: 'OMIM',      stage: 'source',      level: 0, desc: 'Online Mendelian Inheritance in Man. Gene-disease associations with clinical phenotype descriptions.' },
        { id: 'drugbank',label: 'DrugBank',  stage: 'source',      level: 0, desc: 'Drug encyclopedia with drug-target interactions, pharmacology, and chemical structures.' },
        { id: 'go',      label: 'Gene\nOntology', stage: 'source', level: 0, desc: 'Structured vocabulary of gene product functions: molecular function, biological process, cellular component.' },
        // Extraction (level 1)
        { id: 'parse',   label: 'Parse &\nExtract',  stage: 'extraction',  level: 1, desc: 'Read source formats (XML, TSV, OBO, SDF). Extract entities and relationships into structured records.' },
        { id: 'norm',    label: 'Normalise\nIDs',     stage: 'extraction',  level: 1, desc: 'Map database-specific identifiers to canonical forms (e.g., UniProt accessions, HGNC symbols, MeSH IDs).' },
        // Schema mapping (level 2)
        { id: 'schema',  label: 'Schema\nMapping',    stage: 'mapping',     level: 2, desc: 'Map heterogeneous source schemas to a unified ontology. Define node types (Gene, Drug, Disease) and edge types (targets, associated_with).' },
        { id: 'validate',label: 'Validate\nTypes',    stage: 'mapping',     level: 2, desc: 'Check that all entities conform to the target schema. Flag missing required properties or invalid edge type combinations.' },
        // Entity resolution (level 3)
        { id: 'dedup',   label: 'Entity\nResolution', stage: 'resolution',  level: 3, desc: 'Identify and merge records that refer to the same real-world entity across databases (e.g., gene synonyms, drug trade names).' },
        { id: 'xref',    label: 'Cross-\nReference',  stage: 'resolution',  level: 3, desc: 'Link entities across sources using shared identifiers (e.g., UniProt ↔ Ensembl ↔ NCBI Gene).' },
        // Integration (level 4)
        { id: 'merge',   label: 'Merge\nGraphs',      stage: 'integration', level: 4, desc: 'Combine resolved entities and edges from all sources into a single heterogeneous graph.' },
        { id: 'enrich',  label: 'Property\nEnrichment', stage: 'integration', level: 4, desc: 'Add computed properties: node centrality, confidence scores, provenance metadata.' },
        // Output (level 5)
        { id: 'kg',      label: 'Unified\nKnowledge\nGraph', stage: 'output', level: 5, desc: 'The final integrated biomedical knowledge graph. Queryable via SPARQL or graph database (Neo4j). Ready for downstream ML and analysis.' }
    ];

    const edgeData = [
        // Sources → Extraction
        { from: 'uniprot',  to: 'parse' },
        { from: 'omim',     to: 'parse' },
        { from: 'drugbank', to: 'parse' },
        { from: 'go',       to: 'parse' },
        { from: 'parse',    to: 'norm' },
        // Extraction → Mapping
        { from: 'norm',     to: 'schema' },
        { from: 'schema',   to: 'validate' },
        // Mapping → Resolution
        { from: 'validate', to: 'dedup' },
        { from: 'dedup',    to: 'xref' },
        // Resolution → Integration
        { from: 'xref',     to: 'merge' },
        { from: 'merge',    to: 'enrich' },
        // Integration → Output
        { from: 'enrich',   to: 'kg' }
    ];

    // Fixed positions for left-to-right layout
    const levelX = { 0: -300, 1: -150, 2: 0, 3: 150, 4: 300, 5: 450 };
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
                y: (i - (ids.length - 1) / 2) * 80
            };
        });
    }

    let currentStage = -1; // -1 = all visible

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
        color: { color: '#777', highlight: '#333' },
        width: 1.8,
        smooth: { type: 'cubicBezier', roundness: 0.1 }
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:440px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Pipeline Stages</strong><br>
                ${Object.entries(stageColors).map(([s, c]) =>
                    `<span style="display:inline-block;width:10px;height:10px;background:${c.bg};border-radius:2px;margin:2px 4px -1px 0;"></span>${s}<br>`
                ).join('')}
            </div>
            <div id="controls" style="padding:4px 12px;">
                <button id="btn-prev">← Prev</button>
                <button id="btn-next">Next →</button>
                <button id="btn-all">Show All</button>
                <span id="stage-label" style="margin-left:12px;font-size:12px;color:#555;"></span>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Step through the KG construction pipeline or click a node for details.
            </div>
        </div>
    `;

    const container = document.getElementById('network');
    const infoPanel = document.getElementById('info-panel');
    const stageLabel = document.getElementById('stage-label');
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

    const stageNames = ['source', 'extraction', 'mapping', 'resolution', 'integration', 'output'];
    const stageLabels = ['Source Databases', 'Extraction & Normalisation', 'Schema Mapping', 'Entity Resolution', 'Integration', 'Unified KG'];

    function highlightStage(stageIdx) {
        currentStage = stageIdx;
        if (stageIdx < 0) {
            stageLabel.textContent = 'All stages shown';
            nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
            edges.update(edges.get().map(e => ({
                id: e.id, color: { color: '#777' }, width: 1.8
            })));
            infoPanel.innerHTML = 'All pipeline stages visible. Click a node for details, or step through stages.';
            return;
        }

        let stageName = stageNames[stageIdx];
        stageLabel.textContent = 'Stage ' + (stageIdx + 1) + ': ' + stageLabels[stageIdx];

        // Highlight nodes up to and including current stage
        let visibleLevels = new Set();
        for (let i = 0; i <= stageIdx; i++) visibleLevels.add(i);

        nodes.update(nodes.get().map(n => ({
            id: n.id,
            opacity: visibleLevels.has(n.level) ? 1.0 : 0.15,
            borderWidth: n.level === stageIdx ? 4 : 2
        })));

        edges.update(edges.get().map(e => {
            let srcLevel = nodes.get(e.from).level;
            let tgtLevel = nodes.get(e.to).level;
            let visible = visibleLevels.has(srcLevel) && visibleLevels.has(tgtLevel);
            return {
                id: e.id,
                color: visible ? { color: '#555' } : { color: 'rgba(180,180,180,0.1)' },
                width: visible ? 2 : 0.3
            };
        }));

        // Show description of current stage nodes
        let stageNodes = nodeData.filter(n => n.level === stageIdx);
        let descs = stageNodes.map(n => `<strong>${n.label.replace(/\n/g, ' ')}</strong>: ${n.desc}`).join('<br>');
        infoPanel.innerHTML = descs;
    }

    document.getElementById('btn-next').addEventListener('click', () => {
        highlightStage(Math.min(currentStage + 1, stageNames.length - 1));
    });
    document.getElementById('btn-prev').addEventListener('click', () => {
        highlightStage(Math.max(currentStage - 1, 0));
    });
    document.getElementById('btn-all').addEventListener('click', () => {
        highlightStage(-1);
    });

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            const item = nodeData.find(n => n.id === nodeId);
            infoPanel.innerHTML = `<strong>${(nd.label || nd.id).replace(/\n/g, ' ')}</strong>
                <span style="color:${stageColors[nd.stageType].bg};">(${nd.stageType})</span><br>${item.desc}`;
        }
    });

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });

    // Start at first stage
    highlightStage(0);
});
