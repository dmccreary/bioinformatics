// Four Omics Layers — vis-network MicroSim
// Four horizontal tiers: genomics (blue, bottom), transcriptomics (green),
// proteomics (orange), metabolomics (red, top). Intra- and inter-layer edges.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const layerColors = {
        genomics:        { bg: '#2980B9', border: '#1F618D' },
        transcriptomics: { bg: '#27AE60', border: '#1E8449' },
        proteomics:      { bg: '#E67E22', border: '#D35400' },
        metabolomics:    { bg: '#E74C3C', border: '#C0392B' }
    };

    const layerY = { genomics: 350, transcriptomics: 230, proteomics: 110, metabolomics: -10 };

    const nodeData = [
        // Genomics layer (bottom)
        { id: 'g_BRCA1',  label: 'BRCA1\ngene',   layer: 'genomics',        xOff: -200, desc: 'BRCA1 gene locus on chr17. Encodes tumor suppressor protein.' },
        { id: 'g_TP53',   label: 'TP53\ngene',     layer: 'genomics',        xOff: -60,  desc: 'TP53 gene. Most frequently mutated gene in human cancers.' },
        { id: 'g_EGFR',   label: 'EGFR\ngene',     layer: 'genomics',        xOff: 80,   desc: 'EGFR gene on chr7. Encodes receptor tyrosine kinase.' },
        { id: 'g_MYC',    label: 'MYC\ngene',      layer: 'genomics',        xOff: 200,  desc: 'MYC proto-oncogene. Master transcriptional regulator.' },
        // Transcriptomics layer
        { id: 't_BRCA1',  label: 'BRCA1\nmRNA',    layer: 'transcriptomics', xOff: -200, desc: 'BRCA1 transcript. Expression reduced in many breast cancers.' },
        { id: 't_TP53',   label: 'TP53\nmRNA',     layer: 'transcriptomics', xOff: -60,  desc: 'TP53 mRNA. Post-transcriptionally regulated by MDM2.' },
        { id: 't_EGFR',   label: 'EGFR\nmRNA',     layer: 'transcriptomics', xOff: 80,   desc: 'EGFR transcript. Overexpressed in NSCLC and glioblastoma.' },
        { id: 't_MYC',    label: 'MYC\nmRNA',      layer: 'transcriptomics', xOff: 200,  desc: 'MYC mRNA. Very short half-life (~30 min). Tightly regulated.' },
        { id: 't_miR21',  label: 'miR-21',         layer: 'transcriptomics', xOff: -130, desc: 'Oncogenic microRNA. Suppresses PTEN and other tumor suppressors.' },
        // Proteomics layer
        { id: 'p_BRCA1',  label: 'BRCA1\nprotein', layer: 'proteomics',      xOff: -200, desc: 'BRCA1 protein. Forms BRCA1-PALB2-BRCA2 complex for HR repair.' },
        { id: 'p_p53',    label: 'p53\nprotein',   layer: 'proteomics',      xOff: -60,  desc: 'p53 protein. Tetrameric transcription factor. Activates p21, BAX.' },
        { id: 'p_EGFR',   label: 'EGFR\nprotein',  layer: 'proteomics',      xOff: 80,   desc: 'EGFR receptor. Dimerises on ligand binding; activates RAS-MAPK.' },
        { id: 'p_MYC',    label: 'MYC\nprotein',   layer: 'proteomics',      xOff: 200,  desc: 'MYC transcription factor. Partners with MAX for DNA binding.' },
        { id: 'p_AKT',    label: 'AKT\nprotein',   layer: 'proteomics',      xOff: -130, desc: 'AKT kinase. Central node in PI3K-AKT survival signaling.' },
        // Metabolomics layer (top)
        { id: 'm_glut',   label: 'Glutamine',      layer: 'metabolomics',    xOff: -180, desc: 'Glutamine. Major carbon/nitrogen source for proliferating cells.' },
        { id: 'm_lact',   label: 'Lactate',        layer: 'metabolomics',    xOff: -40,  desc: 'Lactate. Warburg effect product. Exported by cancer cells.' },
        { id: 'm_glc',    label: 'Glucose',         layer: 'metabolomics',    xOff: 100,  desc: 'Glucose. Primary energy substrate. Uptake increased in cancer.' },
        { id: 'm_atp',    label: 'ATP',             layer: 'metabolomics',    xOff: 220,  desc: 'ATP. Energy currency linking all metabolic processes.' }
    ];

    // Intra-layer edges
    const intraEdges = [
        // Genomics: co-amplification / co-deletion
        { from: 'g_TP53', to: 'g_BRCA1', label: 'co-altered' },
        { from: 'g_EGFR', to: 'g_MYC',   label: 'co-amplified' },
        // Transcriptomics: co-expression / regulation
        { from: 't_TP53',  to: 't_BRCA1', label: 'co-expressed' },
        { from: 't_miR21', to: 't_TP53',  label: 'suppresses' },
        { from: 't_MYC',   to: 't_EGFR',  label: 'co-expressed' },
        // Proteomics: PPI
        { from: 'p_BRCA1', to: 'p_p53',  label: 'interacts' },
        { from: 'p_EGFR',  to: 'p_AKT',  label: 'activates' },
        { from: 'p_MYC',   to: 'p_p53',  label: 'interacts' },
        // Metabolomics
        { from: 'm_glc',  to: 'm_lact',  label: 'glycolysis' },
        { from: 'm_glc',  to: 'm_atp',   label: 'produces' },
        { from: 'm_glut', to: 'm_atp',   label: 'anaplerosis' }
    ];

    // Inter-layer edges (cross-omics)
    const interEdges = [
        { from: 'g_BRCA1', to: 't_BRCA1', label: 'transcription' },
        { from: 'g_TP53',  to: 't_TP53',  label: 'transcription' },
        { from: 'g_EGFR',  to: 't_EGFR',  label: 'transcription' },
        { from: 'g_MYC',   to: 't_MYC',   label: 'transcription' },
        { from: 't_BRCA1', to: 'p_BRCA1', label: 'translation' },
        { from: 't_TP53',  to: 'p_p53',   label: 'translation' },
        { from: 't_EGFR',  to: 'p_EGFR',  label: 'translation' },
        { from: 't_MYC',   to: 'p_MYC',   label: 'translation' },
        { from: 'p_MYC',   to: 'm_glut',  label: 'upregulates' },
        { from: 'p_EGFR',  to: 'm_glc',   label: 'stimulates uptake' },
        { from: 'p_AKT',   to: 'm_glc',   label: 'promotes uptake' }
    ];

    const nodes = new vis.DataSet(nodeData.map(n => ({
        id: n.id, label: n.label,
        x: n.xOff, y: layerY[n.layer],
        shape: 'box',
        color: { background: layerColors[n.layer].bg, border: layerColors[n.layer].border },
        font: { color: '#FFF', size: 10, face: 'Arial', multi: true },
        borderWidth: 2, shadow: true, margin: 6,
        layerType: n.layer, description: n.desc
    })));

    let allEdges = [];
    intraEdges.forEach((e, i) => {
        allEdges.push({
            id: 'intra_' + i, from: e.from, to: e.to,
            label: e.label,
            color: { color: '#666', highlight: '#333' },
            width: 1.5,
            font: { size: 8, color: '#555', strokeWidth: 2, strokeColor: '#FFF' },
            smooth: { type: 'continuous' },
            edgeType: 'intra'
        });
    });
    interEdges.forEach((e, i) => {
        allEdges.push({
            id: 'inter_' + i, from: e.from, to: e.to,
            label: e.label,
            arrows: 'to',
            dashes: [5, 4],
            color: { color: '#999', highlight: '#333' },
            width: 1.2,
            font: { size: 7, color: '#888', strokeWidth: 2, strokeColor: '#FFF' },
            smooth: { type: 'cubicBezier', roundness: 0.1 },
            edgeType: 'inter'
        });
    });

    const edges = new vis.DataSet(allEdges);

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:470px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Omics Layers</strong><br>
                <span style="display:inline-block;width:10px;height:10px;background:#E74C3C;border-radius:2px;margin:2px 4px -1px 0;"></span>Metabolomics (top)<br>
                <span style="display:inline-block;width:10px;height:10px;background:#E67E22;border-radius:2px;margin:2px 4px -1px 0;"></span>Proteomics<br>
                <span style="display:inline-block;width:10px;height:10px;background:#27AE60;border-radius:2px;margin:2px 4px -1px 0;"></span>Transcriptomics<br>
                <span style="display:inline-block;width:10px;height:10px;background:#2980B9;border-radius:2px;margin:2px 4px -1px 0;"></span>Genomics (bottom)<br>
                <span style="font-size:10px;color:#666;">━ intra-layer &nbsp; ╌ inter-layer</span>
            </div>
            <div id="controls" style="padding:4px 12px;">
                <button id="btn-all">All Layers</button>
                <button id="btn-genomics">Genomics</button>
                <button id="btn-transcriptomics">Transcriptomics</button>
                <button id="btn-proteomics">Proteomics</button>
                <button id="btn-metabolomics">Metabolomics</button>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a node or use buttons to highlight an omics layer. Dashed edges connect layers.
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

    function highlightLayer(layer) {
        if (layer === 'all') {
            nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: { color: e.edgeType === 'intra' ? '#666' : '#999' },
                width: e.edgeType === 'intra' ? 1.5 : 1.2
            })));
            infoPanel.innerHTML = 'All four omics layers shown. Click a node for details.';
            return;
        }

        nodes.update(nodes.get().map(n => ({
            id: n.id, opacity: n.layerType === layer ? 1.0 : 0.15
        })));

        edges.update(edges.get().map(e => {
            let srcLayer = nodes.get(e.from).layerType;
            let tgtLayer = nodes.get(e.to).layerType;
            let show = srcLayer === layer || tgtLayer === layer;
            return {
                id: e.id,
                color: show ? { color: e.edgeType === 'intra' ? '#555' : '#888' } : { color: 'rgba(180,180,180,0.08)' },
                width: show ? 2 : 0.2
            };
        }));

        let layerLabel = layer.charAt(0).toUpperCase() + layer.slice(1);
        infoPanel.innerHTML = `<strong>${layerLabel}</strong> layer highlighted. Showing intra-layer and cross-layer connections.`;
    }

    ['all', 'genomics', 'transcriptomics', 'proteomics', 'metabolomics'].forEach(l => {
        document.getElementById('btn-' + l).addEventListener('click', () => highlightLayer(l));
    });

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            const item = nodeData.find(n => n.id === nodeId);
            const conn = network.getConnectedNodes(nodeId);
            const connE = network.getConnectedEdges(nodeId);

            infoPanel.innerHTML = `<strong>${nd.label.replace(/\n/g, ' ')}</strong>
                <span style="color:${layerColors[nd.layerType].bg};">(${nd.layerType})</span><br>${item.desc}`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.15
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id) ? { color: '#333' } : { color: 'rgba(180,180,180,0.08)' },
                width: connE.includes(e.id) ? 2.5 : 0.2
            })));
        }
    });

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
