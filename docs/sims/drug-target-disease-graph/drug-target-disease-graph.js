// Drug-Target-Disease Graph — vis-network MicroSim
// Heterogeneous KG: drugs (blue circles), protein targets (green diamonds), diseases (red squares).
// Edges: "binds", "associated_with", "treats". Click to highlight paths.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const typeStyles = {
        drug:    { shape: 'dot',     bg: '#2980B9', border: '#1F618D', font: '#FFF' },
        target:  { shape: 'diamond', bg: '#27AE60', border: '#1E8449', font: '#FFF' },
        disease: { shape: 'box',     bg: '#E74C3C', border: '#C0392B', font: '#FFF' }
    };

    const nodeData = [
        // Drugs
        { id: 'imatinib',    label: 'Imatinib',     type: 'drug',    desc: 'Tyrosine kinase inhibitor (Gleevec). First targeted cancer therapy.' },
        { id: 'metformin',   label: 'Metformin',    type: 'drug',    desc: 'Biguanide antidiabetic. Activates AMPK, reduces hepatic glucose output.' },
        { id: 'trastuzumab', label: 'Trastuzumab',  type: 'drug',    desc: 'Monoclonal antibody (Herceptin). Targets HER2+ breast cancer.' },
        { id: 'aspirin',     label: 'Aspirin',      type: 'drug',    desc: 'COX inhibitor. Anti-inflammatory, antiplatelet. Broad clinical use.' },
        { id: 'omalizumab',  label: 'Omalizumab',   type: 'drug',    desc: 'Anti-IgE monoclonal antibody. Used for severe allergic asthma.' },
        { id: 'infliximab',  label: 'Infliximab',   type: 'drug',    desc: 'Anti-TNF monoclonal antibody. Used for autoimmune diseases.' },
        // Targets
        { id: 'ABL1',   label: 'ABL1',    type: 'target', desc: 'Non-receptor tyrosine kinase. BCR-ABL fusion drives CML.' },
        { id: 'KIT',    label: 'KIT',     type: 'target', desc: 'Receptor tyrosine kinase. Mutated in GIST and mastocytosis.' },
        { id: 'ERBB2',  label: 'HER2',    type: 'target', desc: 'ERBB2 receptor tyrosine kinase. Amplified in ~20% of breast cancers.' },
        { id: 'AMPK',   label: 'AMPK',    type: 'target', desc: 'AMP-activated protein kinase. Master energy sensor.' },
        { id: 'COX1',   label: 'COX-1',   type: 'target', desc: 'Cyclooxygenase-1. Constitutive enzyme producing prostaglandins.' },
        { id: 'COX2',   label: 'COX-2',   type: 'target', desc: 'Cyclooxygenase-2. Induced during inflammation.' },
        { id: 'IGE',    label: 'IgE',     type: 'target', desc: 'Immunoglobulin E. Mediates allergic responses via mast cell degranulation.' },
        { id: 'TNF',    label: 'TNF',     type: 'target', desc: 'Tumor necrosis factor. Pro-inflammatory cytokine.' },
        // Diseases
        { id: 'cml',       label: 'CML',              type: 'disease', desc: 'Chronic myeloid leukaemia. Driven by BCR-ABL fusion oncoprotein.' },
        { id: 'gist',      label: 'GIST',             type: 'disease', desc: 'Gastrointestinal stromal tumor. KIT or PDGFRA mutations.' },
        { id: 'breast_ca', label: 'Breast Cancer\n(HER2+)', type: 'disease', desc: 'HER2-positive breast cancer. Aggressive subtype responsive to anti-HER2 therapy.' },
        { id: 't2d',       label: 'Type 2\nDiabetes',  type: 'disease', desc: 'Type 2 diabetes mellitus. Insulin resistance and beta-cell dysfunction.' },
        { id: 'ra',        label: 'Rheumatoid\nArthritis', type: 'disease', desc: 'Autoimmune joint inflammation driven by TNF and other cytokines.' },
        { id: 'asthma',    label: 'Asthma',           type: 'disease', desc: 'Chronic airway inflammation with IgE-mediated allergic component.' },
        { id: 'cvd',       label: 'CVD',              type: 'disease', desc: 'Cardiovascular disease. Aspirin reduces thrombotic risk.' }
    ];

    const edgeData = [
        // Drug → Target (binds)
        { from: 'imatinib',    to: 'ABL1',  rel: 'binds' },
        { from: 'imatinib',    to: 'KIT',   rel: 'binds' },
        { from: 'trastuzumab', to: 'ERBB2', rel: 'binds' },
        { from: 'metformin',   to: 'AMPK',  rel: 'binds' },
        { from: 'aspirin',     to: 'COX1',  rel: 'binds' },
        { from: 'aspirin',     to: 'COX2',  rel: 'binds' },
        { from: 'omalizumab',  to: 'IGE',   rel: 'binds' },
        { from: 'infliximab',  to: 'TNF',   rel: 'binds' },
        // Target → Disease (associated_with)
        { from: 'ABL1',  to: 'cml',       rel: 'associated_with' },
        { from: 'KIT',   to: 'gist',      rel: 'associated_with' },
        { from: 'ERBB2', to: 'breast_ca', rel: 'associated_with' },
        { from: 'AMPK',  to: 't2d',       rel: 'associated_with' },
        { from: 'COX1',  to: 'cvd',       rel: 'associated_with' },
        { from: 'COX2',  to: 'ra',        rel: 'associated_with' },
        { from: 'IGE',   to: 'asthma',    rel: 'associated_with' },
        { from: 'TNF',   to: 'ra',        rel: 'associated_with' },
        // Drug → Disease (treats)
        { from: 'imatinib',    to: 'cml',       rel: 'treats' },
        { from: 'imatinib',    to: 'gist',      rel: 'treats' },
        { from: 'trastuzumab', to: 'breast_ca', rel: 'treats' },
        { from: 'metformin',   to: 't2d',       rel: 'treats' },
        { from: 'aspirin',     to: 'cvd',       rel: 'treats' },
        { from: 'omalizumab',  to: 'asthma',    rel: 'treats' },
        { from: 'infliximab',  to: 'ra',        rel: 'treats' }
    ];

    const edgeColors = {
        binds:           { color: '#2980B9', label: 'binds' },
        associated_with: { color: '#27AE60', label: 'associated with' },
        treats:          { color: '#E67E22', label: 'treats' }
    };

    const nodes = new vis.DataSet(nodeData.map(n => {
        let s = typeStyles[n.type];
        return {
            id: n.id, label: n.label,
            shape: s.shape, size: n.type === 'drug' ? 16 : 14,
            color: { background: s.bg, border: s.border },
            font: { color: s.font, size: 11, face: 'Arial', multi: true },
            borderWidth: 2, shadow: true, margin: 6,
            nodeType: n.type, description: n.desc
        };
    }));

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        label: e.rel.replace('_', ' '),
        arrows: 'to',
        color: { color: edgeColors[e.rel].color, highlight: '#333' },
        width: 1.8,
        font: { size: 9, color: edgeColors[e.rel].color, strokeWidth: 2, strokeColor: '#FFF' },
        dashes: e.rel === 'treats' ? [6, 3] : false,
        smooth: e.rel === 'treats' ? { type: 'curvedCCW', roundness: 0.25 } : { type: 'continuous' },
        relType: e.rel
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:470px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:12px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Node Types</strong><br>
                <span style="display:inline-block;width:12px;height:12px;background:#2980B9;border-radius:50%;margin:2px 4px -2px 0;"></span>Drug<br>
                <span style="display:inline-block;width:12px;height:12px;background:#27AE60;transform:rotate(45deg);margin:2px 4px -2px 0;"></span>Target<br>
                <span style="display:inline-block;width:12px;height:12px;background:#E74C3C;border-radius:2px;margin:2px 4px -2px 0;"></span>Disease<br>
                <strong style="margin-top:4px;display:block;">Edge Types</strong>
                <span style="color:#2980B9;">━━</span> binds<br>
                <span style="color:#27AE60;">━━</span> associated with<br>
                <span style="color:#E67E22;">╌╌</span> treats
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a drug, target, or disease to highlight its connections and see details.
            </div>
        </div>
    `;

    const container = document.getElementById('network');
    const infoPanel = document.getElementById('info-panel');
    const enableMouse = !isInIframe();

    const options = {
        layout: { improvedLayout: true },
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -50,
                centralGravity: 0.01,
                springLength: 120,
                springConstant: 0.05,
                damping: 0.5
            },
            stabilization: { iterations: 250 }
        },
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
            const conn = network.getConnectedNodes(nodeId);
            const connE = network.getConnectedEdges(nodeId);
            const typeLabel = nd.nodeType.charAt(0).toUpperCase() + nd.nodeType.slice(1);

            infoPanel.innerHTML = `<strong>${nd.label.replace(/\n/g, ' ')}</strong> <span style="color:${typeStyles[nd.nodeType].bg};">(${typeLabel})</span><br>${nd.description}`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.12
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id)
                    ? { color: edgeColors[edgeData[e.id].rel].color }
                    : { color: 'rgba(180,180,180,0.1)' },
                width: connE.includes(e.id) ? 3 : 0.3
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a drug, target, or disease to highlight its connections and see details.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map((e, i) => ({
            id: e.id,
            color: { color: edgeColors[edgeData[e.id].rel].color, highlight: '#333' },
            width: 1.8
        })));
    }

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
