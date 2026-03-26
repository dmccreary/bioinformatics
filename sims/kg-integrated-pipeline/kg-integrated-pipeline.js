// KG Integrated Pipeline — vis-network MicroSim
// Flowchart: Ontologies+DBs → KG Construction → branches to Graph Embeddings,
// GNNs, Link Prediction. Each leads to Applications. Color by method type.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const methodColors = {
        data:       { bg: '#2980B9', border: '#1F618D' },
        construct:  { bg: '#27AE60', border: '#1E8449' },
        embedding:  { bg: '#E67E22', border: '#D35400' },
        gnn:        { bg: '#8E44AD', border: '#6C3483' },
        prediction: { bg: '#E74C3C', border: '#C0392B' },
        application:{ bg: '#1ABC9C', border: '#16A085' }
    };

    const nodeData = [
        // Data sources
        { id: 'ontologies', label: 'Ontologies\n(GO, DO, HPO)',  method: 'data', desc: 'Structured vocabularies providing hierarchical term relationships and standardised entity classification.' },
        { id: 'databases',  label: 'Databases\n(UniProt, KEGG)', method: 'data', desc: 'Curated biological databases providing experimentally validated entity annotations and cross-references.' },
        { id: 'literature', label: 'Literature\n(PubMed)',       method: 'data', desc: 'Biomedical text corpus. Text mining extracts relations not yet in curated databases.' },
        // KG Construction
        { id: 'kg_build',   label: 'KG\nConstruction',     method: 'construct', desc: 'Integration of heterogeneous data sources into a unified knowledge graph with typed nodes and edges.' },
        { id: 'kg_enrich',  label: 'KG\nEnrichment',       method: 'construct', desc: 'Add computed features: node degrees, path-based features, semantic similarity scores between entities.' },
        // Graph Embeddings branch
        { id: 'node2vec',   label: 'Node2Vec',             method: 'embedding', desc: 'Learns node embeddings via biased random walks. Parameters p (return) and q (in-out) control walk strategy.' },
        { id: 'transe',     label: 'TransE',               method: 'embedding', desc: 'Translational embedding: h + r ≈ t. Embeds entities and relations in same vector space. Simple but effective.' },
        { id: 'rotate',     label: 'RotatE',               method: 'embedding', desc: 'Rotation-based KG embedding: t = h ∘ r in complex space. Models symmetric, antisymmetric, and compositional relations.' },
        // GNN branch
        { id: 'gcn',        label: 'GCN',                  method: 'gnn', desc: 'Graph Convolutional Network. Aggregates neighbor features via spectral convolution. Semi-supervised node classification.' },
        { id: 'gat',        label: 'GAT',                  method: 'gnn', desc: 'Graph Attention Network. Learns attention weights for neighbor aggregation. Different neighbors contribute differently.' },
        { id: 'rgcn',       label: 'R-GCN',                method: 'gnn', desc: 'Relational GCN. Separate weight matrices per edge type. Designed for heterogeneous knowledge graphs.' },
        // Link Prediction
        { id: 'linkpred',   label: 'Link\nPrediction',     method: 'prediction', desc: 'Predict missing edges in the KG. Score candidate (h, r, t) triples. Evaluation: MRR, Hits@k metrics.' },
        { id: 'nodecls',    label: 'Node\nClassification',  method: 'prediction', desc: 'Predict node properties (e.g., gene function, disease category) from graph structure and features.' },
        // Applications
        { id: 'drug_repurpose', label: 'Drug\nRepurposing',     method: 'application', desc: 'Predict new drug-disease associations by finding short paths or high-scoring links in the KG.' },
        { id: 'gene_disease',   label: 'Gene-Disease\nPrioritisation', method: 'application', desc: 'Rank candidate disease genes using network proximity, embeddings, or GNN scores.' },
        { id: 'side_effect',    label: 'Side Effect\nPrediction', method: 'application', desc: 'Predict adverse drug reactions from drug-target-pathway connectivity in the KG.' }
    ];

    const edgeData = [
        // Data → Construction
        { from: 'ontologies', to: 'kg_build' },
        { from: 'databases',  to: 'kg_build' },
        { from: 'literature', to: 'kg_build' },
        { from: 'kg_build',   to: 'kg_enrich' },
        // Construction → Embeddings
        { from: 'kg_enrich', to: 'node2vec' },
        { from: 'kg_enrich', to: 'transe' },
        { from: 'kg_enrich', to: 'rotate' },
        // Construction → GNNs
        { from: 'kg_enrich', to: 'gcn' },
        { from: 'kg_enrich', to: 'gat' },
        { from: 'kg_enrich', to: 'rgcn' },
        // Embeddings → Prediction
        { from: 'node2vec', to: 'linkpred' },
        { from: 'transe',   to: 'linkpred' },
        { from: 'rotate',   to: 'linkpred' },
        { from: 'node2vec', to: 'nodecls' },
        // GNNs → Prediction
        { from: 'gcn',  to: 'nodecls' },
        { from: 'gat',  to: 'nodecls' },
        { from: 'rgcn', to: 'linkpred' },
        { from: 'rgcn', to: 'nodecls' },
        // Prediction → Applications
        { from: 'linkpred', to: 'drug_repurpose' },
        { from: 'linkpred', to: 'side_effect' },
        { from: 'nodecls',  to: 'gene_disease' },
        { from: 'linkpred', to: 'gene_disease' }
    ];

    // Fixed positions (left-to-right, 6 columns)
    const colX = {
        data: -350, construct: -180, embedding: -10,
        gnn: -10, prediction: 180, application: 370
    };
    const positions = {};
    // Group by method
    const methodNodes = {};
    nodeData.forEach(n => {
        if (!methodNodes[n.method]) methodNodes[n.method] = [];
        methodNodes[n.method].push(n.id);
    });

    // Manual y offsets for clarity
    const yOffsets = {
        'ontologies': -80, 'databases': 0, 'literature': 80,
        'kg_build': -30, 'kg_enrich': 40,
        'node2vec': -130, 'transe': -70, 'rotate': -10,
        'gcn': 50, 'gat': 110, 'rgcn': 170,
        'linkpred': -50, 'nodecls': 70,
        'drug_repurpose': -90, 'gene_disease': 0, 'side_effect': 90
    };

    nodeData.forEach(n => {
        positions[n.id] = { x: colX[n.method], y: yOffsets[n.id] || 0 };
    });

    const nodes = new vis.DataSet(nodeData.map(n => ({
        id: n.id, label: n.label,
        x: positions[n.id].x, y: positions[n.id].y,
        shape: 'box',
        color: { background: methodColors[n.method].bg, border: methodColors[n.method].border },
        font: { color: '#FFF', size: 10, face: 'Arial', multi: true },
        borderWidth: 2, shadow: true, margin: 6,
        methodType: n.method, description: n.desc
    })));

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        arrows: 'to',
        color: { color: '#888', highlight: '#333' },
        width: 1.5,
        smooth: { type: 'cubicBezier', roundness: 0.15 }
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:470px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Method Types</strong><br>
                ${Object.entries(methodColors).map(([m, c]) =>
                    `<span style="display:inline-block;width:10px;height:10px;background:${c.bg};border-radius:2px;margin:2px 4px -1px 0;"></span>${m}<br>`
                ).join('')}
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a component to learn how data flows from sources through ML methods to biomedical applications.
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
                <span style="color:${methodColors[nd.methodType].bg};">(${nd.methodType})</span><br>${item.desc}`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.15
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id) ? { color: '#333' } : { color: 'rgba(180,180,180,0.1)' },
                width: connE.includes(e.id) ? 3 : 0.3
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a component to learn how data flows from sources through ML methods to biomedical applications.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map(e => ({
            id: e.id, color: { color: '#888', highlight: '#333' }, width: 1.5
        })));
    }

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
