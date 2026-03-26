// Graph Discovery Pipeline — vis-network MicroSim
// DAG: Data Acquisition → Data Wrangling → Graph Construction → Graph Analysis →
// Machine Learning → Visualization → Interpretation → Communication.
// Color by phase. Click for details.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const phaseColors = {
        data:       { bg: '#2980B9', border: '#1F618D' },
        wrangle:    { bg: '#1ABC9C', border: '#16A085' },
        construct:  { bg: '#27AE60', border: '#1E8449' },
        analysis:   { bg: '#E67E22', border: '#D35400' },
        ml:         { bg: '#E74C3C', border: '#C0392B' },
        viz:        { bg: '#8E44AD', border: '#6C3483' },
        interpret:  { bg: '#F39C12', border: '#D68910' },
        communicate:{ bg: '#34495E', border: '#2C3E50' }
    };

    const nodeData = [
        {
            id: 'acquire', label: 'Data\nAcquisition',
            phase: 'data', level: 0,
            desc: 'Gather raw data from public databases (UniProt, KEGG, STRING, PubMed), experimental results (RNA-seq, proteomics), and clinical records. Define data scope and inclusion criteria.'
        },
        {
            id: 'wrangle', label: 'Data\nWrangling',
            phase: 'wrangle', level: 1,
            desc: 'Clean, normalise, and integrate heterogeneous data sources. Handle missing values, batch effects, identifier mapping. Output: tidy tables and cross-reference maps.'
        },
        {
            id: 'construct', label: 'Graph\nConstruction',
            phase: 'construct', level: 2,
            desc: 'Build the graph: define node types and edge types, apply similarity thresholds, import to graph database (Neo4j) or in-memory representation (NetworkX, igraph).'
        },
        {
            id: 'analysis', label: 'Graph\nAnalysis',
            phase: 'analysis', level: 3,
            desc: 'Compute topological features: degree distribution, centrality measures, clustering coefficients, community detection (Louvain/Leiden), motif analysis, shortest paths.'
        },
        {
            id: 'ml', label: 'Machine\nLearning',
            phase: 'ml', level: 4,
            desc: 'Apply graph ML: node embeddings (Node2Vec), graph neural networks (GCN, GAT), link prediction, graph classification. Cross-validate and evaluate with standard metrics.'
        },
        {
            id: 'viz', label: 'Visualization',
            phase: 'viz', level: 5,
            desc: 'Create informative visual representations: network layouts (force-directed, hierarchical), heatmaps, dimensionality reduction (UMAP/t-SNE of embeddings), interactive dashboards.'
        },
        {
            id: 'interpret', label: 'Biological\nInterpretation',
            phase: 'interpret', level: 6,
            desc: 'Map computational findings back to biology: pathway enrichment of modules, literature validation of predicted links, functional annotation of clusters, expert review.'
        },
        {
            id: 'communicate', label: 'Communication\n& Publication',
            phase: 'communicate', level: 7,
            desc: 'Share findings: reproducible notebooks, figures for publication, interactive web apps. Follow FAIR principles. Deposit data and code in public repositories.'
        }
    ];

    // Sub-tasks for each stage
    const subTasks = {
        acquire:     ['API queries', 'File downloads', 'Scope definition', 'Ethical review'],
        wrangle:     ['ID mapping', 'Normalisation', 'Missing data', 'Batch correction'],
        construct:   ['Schema design', 'Edge weighting', 'Thresholding', 'Graph DB import'],
        analysis:    ['Centrality', 'Communities', 'Motifs', 'Path analysis'],
        ml:          ['Embeddings', 'GNNs', 'Link prediction', 'Evaluation'],
        viz:         ['Network plots', 'Heatmaps', 'UMAP', 'Dashboards'],
        interpret:   ['Enrichment', 'Literature', 'Expert review', 'Hypothesis'],
        communicate: ['Notebooks', 'Figures', 'Repository', 'Publication']
    };

    const edgeData = [
        { from: 'acquire',   to: 'wrangle' },
        { from: 'wrangle',   to: 'construct' },
        { from: 'construct', to: 'analysis' },
        { from: 'analysis',  to: 'ml' },
        { from: 'ml',        to: 'viz' },
        { from: 'viz',       to: 'interpret' },
        { from: 'interpret', to: 'communicate' },
        // Feedback edges
        { from: 'interpret', to: 'analysis',  feedback: true },
        { from: 'analysis',  to: 'construct', feedback: true }
    ];

    // Positions: diagonal left-to-right-ish
    const positions = {};
    nodeData.forEach(n => {
        positions[n.id] = {
            x: -280 + n.level * 85,
            y: -120 + (n.level % 2 === 0 ? -30 : 30) + (n.level > 5 ? 20 : 0)
        };
    });
    // Offset feedback targets slightly
    positions['acquire'].y = -60;
    positions['wrangle'].y = 40;
    positions['construct'].y = -60;
    positions['analysis'].y = 40;
    positions['ml'].y = -60;
    positions['viz'].y = 40;
    positions['interpret'].y = -60;
    positions['communicate'].y = 40;

    const nodes = new vis.DataSet(nodeData.map(n => ({
        id: n.id, label: n.label,
        x: positions[n.id].x, y: positions[n.id].y,
        shape: 'box',
        color: { background: phaseColors[n.phase].bg, border: phaseColors[n.phase].border },
        font: { color: '#FFF', size: 11, face: 'Arial', multi: true },
        borderWidth: 2, shadow: true, margin: 8,
        phaseType: n.phase, level: n.level, description: n.desc,
        widthConstraint: { minimum: 80 }
    })));

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        arrows: 'to',
        dashes: e.feedback || false,
        color: { color: e.feedback ? '#E74C3C' : '#555', highlight: '#333' },
        width: e.feedback ? 1.5 : 2.2,
        smooth: e.feedback
            ? { type: 'curvedCCW', roundness: 0.45 }
            : { type: 'cubicBezier', roundness: 0.15 }
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:390px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:6px 10px; border-radius:6px; font-size:10px; box-shadow:0 1px 4px rgba(0,0,0,0.15); max-width:140px;">
                <strong>Pipeline Phases</strong><br>
                ${Object.entries(phaseColors).map(([p, c]) =>
                    `<span style="display:inline-block;width:8px;height:8px;background:${c.bg};border-radius:2px;margin:1px 3px -1px 0;"></span>${p}<br>`
                ).join('')}
                <span style="color:#E74C3C;font-size:9px;">- - - feedback</span>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:60px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:13px; line-height:1.5;">
                Click a pipeline stage to see its description and key tasks. The graph discovery pipeline flows left-to-right with feedback loops.
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

            let tasks = subTasks[nodeId] || [];
            let taskHtml = tasks.length > 0
                ? '<br><strong>Key tasks:</strong> ' + tasks.join(' • ')
                : '';

            infoPanel.innerHTML = `<strong>${nd.label.replace(/\n/g, ' ')}</strong>
                <span style="color:${phaseColors[nd.phaseType].bg};">(Step ${nd.level + 1})</span><br>
                ${item.desc}${taskHtml}`;

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
        infoPanel.innerHTML = 'Click a pipeline stage to see its description and key tasks. The graph discovery pipeline flows left-to-right with feedback loops.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map((e, i) => ({
            id: e.id,
            color: { color: edgeData[e.id].feedback ? '#E74C3C' : '#555', highlight: '#333' },
            width: edgeData[e.id].feedback ? 1.5 : 2.2
        })));
    }

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
