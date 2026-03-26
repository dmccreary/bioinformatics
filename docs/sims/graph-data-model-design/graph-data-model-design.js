// Graph Data Model Design — vis-network MicroSim
// Iterative flowchart: Identify Entities → Define Relationships → Assign Properties →
// Validate Against Queries → Iterate. Cycle arrow back from Iterate to Identify.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const stageColors = {
        identify:   { bg: '#2980B9', border: '#1F618D' },
        define:     { bg: '#27AE60', border: '#1E8449' },
        assign:     { bg: '#E67E22', border: '#D35400' },
        validate:   { bg: '#8E44AD', border: '#6C3483' },
        iterate:    { bg: '#E74C3C', border: '#C0392B' }
    };

    const nodeData = [
        {
            id: 'identify', label: '1. Identify\nEntities',
            stage: 'identify',
            x: -200, y: -80,
            desc: 'Determine the key entity types in your domain: genes, proteins, diseases, drugs, pathways, etc. Each entity type becomes a node label in your graph model. Ask: "What are the nouns in my domain?"'
        },
        {
            id: 'define', label: '2. Define\nRelationships',
            stage: 'define',
            x: 0, y: -80,
            desc: 'Identify how entities connect: "targets", "associated_with", "part_of", "regulates". Each relationship becomes an edge type. Define directionality and cardinality (1:1, 1:N, N:M).'
        },
        {
            id: 'assign', label: '3. Assign\nProperties',
            stage: 'assign',
            x: 200, y: -80,
            desc: 'Add attributes to nodes and edges. Node properties: name, ID, species, confidence. Edge properties: score, evidence type, source database. Properties enable filtering and weighting.'
        },
        {
            id: 'validate', label: '4. Validate\nAgainst Queries',
            stage: 'validate',
            x: 200, y: 100,
            desc: 'Test your model against real queries: "Find all drugs targeting proteins in pathway X." If a query requires an awkward multi-hop traversal or cannot be expressed, the model needs refinement.'
        },
        {
            id: 'iterate', label: '5. Iterate\n& Refine',
            stage: 'iterate',
            x: -200, y: 100,
            desc: 'Refine the model based on validation results. Common changes: add new entity types, split or merge relationship types, promote edge properties to intermediate nodes. Models evolve over time.'
        }
    ];

    // Example sub-nodes shown when a stage is clicked
    const exampleData = {
        identify: [
            { id: 'ex_gene',    label: 'Gene',    x: -300, y: 20 },
            { id: 'ex_protein', label: 'Protein',  x: -200, y: 20 },
            { id: 'ex_disease', label: 'Disease',  x: -100, y: 20 }
        ],
        define: [
            { id: 'ex_targets',   label: 'targets',        x: -60, y: 20 },
            { id: 'ex_assoc',     label: 'associated_with', x: 60,  y: 20 }
        ],
        assign: [
            { id: 'ex_prop1', label: 'name: str',   x: 140, y: 20 },
            { id: 'ex_prop2', label: 'score: float', x: 260, y: 20 }
        ],
        validate: [
            { id: 'ex_q1', label: 'Query 1:\nFind drugs for\ndisease X', x: 120, y: 200 },
            { id: 'ex_q2', label: 'Query 2:\nGene → Pathway\n→ Disease',  x: 280, y: 200 }
        ],
        iterate: [
            { id: 'ex_add',   label: 'Add\nPathway node', x: -260, y: 200 },
            { id: 'ex_split', label: 'Split edge\ntype',   x: -140, y: 200 }
        ]
    };

    const edgeData = [
        { from: 'identify', to: 'define',   label: '' },
        { from: 'define',   to: 'assign',   label: '' },
        { from: 'assign',   to: 'validate', label: '' },
        { from: 'validate', to: 'iterate',  label: 'issues found' },
        { from: 'iterate',  to: 'identify', label: 'refine model', feedback: true }
    ];

    const nodes = new vis.DataSet(nodeData.map(n => ({
        id: n.id, label: n.label,
        x: n.x, y: n.y,
        shape: 'box',
        color: { background: stageColors[n.stage].bg, border: stageColors[n.stage].border },
        font: { color: '#FFF', size: 12, face: 'Arial', multi: true },
        borderWidth: 2, shadow: true, margin: 10,
        stageType: n.stage, description: n.desc,
        widthConstraint: { minimum: 100 }
    })));

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        label: e.label,
        arrows: 'to',
        dashes: e.feedback || false,
        color: { color: e.feedback ? '#E74C3C' : '#555', highlight: '#333' },
        width: 2.5,
        font: { size: 9, color: e.feedback ? '#C0392B' : '#666', strokeWidth: 2, strokeColor: '#FFF' },
        smooth: e.feedback
            ? { type: 'curvedCCW', roundness: 0.5 }
            : { type: 'cubicBezier', roundness: 0.15 }
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:440px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Design Cycle</strong><br>
                ${Object.entries(stageColors).map(([s, c]) =>
                    `<span style="display:inline-block;width:10px;height:10px;background:${c.bg};border-radius:2px;margin:2px 4px -1px 0;"></span>${s}<br>`
                ).join('')}
                <span style="color:#E74C3C;font-size:10px;">- - - iteration loop</span>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:50px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a stage to learn what happens at each step of graph data model design. The cycle arrow shows that modeling is iterative.
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

            if (!item) return; // clicked an example node

            // Build examples list
            let examples = exampleData[nodeId] || [];
            let exHtml = examples.length > 0
                ? '<br><em style="color:#666;">Examples: ' + examples.map(e => e.label.replace(/\n/g, ' ')).join(', ') + '</em>'
                : '';

            infoPanel.innerHTML = `<strong>Step: ${nd.label.replace(/\n/g, ' ')}</strong>
                <span style="color:${stageColors[nd.stageType].bg};">●</span><br>
                ${item.desc}${exHtml}`;

            // Highlight this stage
            nodes.update(nodes.get().map(n => ({
                id: n.id,
                borderWidth: n.id === nodeId ? 5 : 2,
                opacity: 1.0
            })));
        } else {
            infoPanel.innerHTML = 'Click a stage to learn what happens at each step of graph data model design. The cycle arrow shows that modeling is iterative.';
            nodes.update(nodes.get().map(n => ({
                id: n.id, borderWidth: 2, opacity: 1.0
            })));
        }
    });

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
