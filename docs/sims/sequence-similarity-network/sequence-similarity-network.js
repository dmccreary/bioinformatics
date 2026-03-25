// Sequence Similarity Network - vis-network
// ~20 protein nodes colored by family, edges = BLAST hits
// E-value threshold slider controls edge visibility
// MicroSim template version 2026.02

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    // Functional families
    const families = {
        'Kinase':       { color: '#4A90D9', border: '#2C5F9E' },
        'Protease':     { color: '#E74C3C', border: '#C0392B' },
        'Dehydrogenase': { color: '#27AE60', border: '#1E8449' },
        'Transporter':  { color: '#F39C12', border: '#D68910' }
    };

    // Protein nodes
    const proteinData = [
        { id: 1,  label: 'CDK2',    family: 'Kinase',       acc: 'P24941', func: 'Cyclin-dependent kinase 2, cell cycle G1/S transition' },
        { id: 2,  label: 'CDK4',    family: 'Kinase',       acc: 'P11802', func: 'Cyclin-dependent kinase 4, G1 phase progression' },
        { id: 3,  label: 'CDK6',    family: 'Kinase',       acc: 'Q00534', func: 'Cyclin-dependent kinase 6, G1 phase progression' },
        { id: 4,  label: 'MAPK1',   family: 'Kinase',       acc: 'P28482', func: 'MAP kinase 1 (ERK2), growth factor signaling' },
        { id: 5,  label: 'MAPK3',   family: 'Kinase',       acc: 'P27361', func: 'MAP kinase 3 (ERK1), cell proliferation signaling' },
        { id: 6,  label: 'MMP2',    family: 'Protease',     acc: 'P08253', func: 'Matrix metalloproteinase-2, extracellular matrix remodeling' },
        { id: 7,  label: 'MMP9',    family: 'Protease',     acc: 'P14780', func: 'Matrix metalloproteinase-9, collagen degradation' },
        { id: 8,  label: 'MMP14',   family: 'Protease',     acc: 'P50281', func: 'Membrane-type MMP, activates pro-MMP2' },
        { id: 9,  label: 'CASP3',   family: 'Protease',     acc: 'P42574', func: 'Caspase-3, executioner of apoptosis' },
        { id: 10, label: 'CASP7',   family: 'Protease',     acc: 'P55210', func: 'Caspase-7, apoptosis executioner' },
        { id: 11, label: 'CASP9',   family: 'Protease',     acc: 'P55211', func: 'Caspase-9, initiator of intrinsic apoptosis' },
        { id: 12, label: 'ALDH2',   family: 'Dehydrogenase', acc: 'P05091', func: 'Aldehyde dehydrogenase 2, acetaldehyde metabolism' },
        { id: 13, label: 'ALDH1A1', family: 'Dehydrogenase', acc: 'P00352', func: 'Retinal dehydrogenase 1, retinoic acid synthesis' },
        { id: 14, label: 'ADH1B',   family: 'Dehydrogenase', acc: 'P00325', func: 'Alcohol dehydrogenase 1B, ethanol oxidation' },
        { id: 15, label: 'GAPDH',   family: 'Dehydrogenase', acc: 'P04406', func: 'Glyceraldehyde-3-phosphate dehydrogenase, glycolysis' },
        { id: 16, label: 'LDH-A',   family: 'Dehydrogenase', acc: 'P00338', func: 'Lactate dehydrogenase A, anaerobic glycolysis' },
        { id: 17, label: 'SLC2A1',  family: 'Transporter',  acc: 'P11166', func: 'GLUT1 glucose transporter, basal glucose uptake' },
        { id: 18, label: 'SLC2A4',  family: 'Transporter',  acc: 'P14672', func: 'GLUT4, insulin-regulated glucose transporter' },
        { id: 19, label: 'ABCB1',   family: 'Transporter',  acc: 'P08183', func: 'P-glycoprotein, multidrug resistance efflux pump' },
        { id: 20, label: 'ABCG2',   family: 'Transporter',  acc: 'Q9UNQ0', func: 'Breast cancer resistance protein, drug efflux' }
    ];

    // BLAST-like edges with E-values (log10 scale for slider)
    // Within-family edges have better E-values; cross-family edges have weaker
    const blastEdges = [
        // Kinase cluster (tight)
        { from: 1, to: 2, evalue: 1e-45 },
        { from: 1, to: 3, evalue: 1e-42 },
        { from: 2, to: 3, evalue: 1e-50 },
        { from: 4, to: 5, evalue: 1e-48 },
        { from: 1, to: 4, evalue: 1e-20 },
        { from: 1, to: 5, evalue: 1e-18 },
        { from: 2, to: 5, evalue: 1e-15 },
        // MMP cluster
        { from: 6, to: 7, evalue: 1e-40 },
        { from: 6, to: 8, evalue: 1e-35 },
        { from: 7, to: 8, evalue: 1e-30 },
        // Caspase cluster
        { from: 9, to: 10, evalue: 1e-38 },
        { from: 9, to: 11, evalue: 1e-25 },
        { from: 10, to: 11, evalue: 1e-22 },
        // MMP-Caspase cross-link (weak)
        { from: 8, to: 9, evalue: 1e-8 },
        // Dehydrogenase cluster
        { from: 12, to: 13, evalue: 1e-42 },
        { from: 14, to: 15, evalue: 1e-12 },
        { from: 14, to: 16, evalue: 1e-10 },
        { from: 15, to: 16, evalue: 1e-15 },
        { from: 12, to: 14, evalue: 1e-18 },
        { from: 13, to: 14, evalue: 1e-16 },
        { from: 12, to: 15, evalue: 1e-8 },
        // Transporter cluster
        { from: 17, to: 18, evalue: 1e-45 },
        { from: 19, to: 20, evalue: 1e-30 },
        { from: 17, to: 19, evalue: 1e-8 },
        { from: 18, to: 20, evalue: 1e-7 },
        // Cross-family weak hits
        { from: 4, to: 14, evalue: 1e-6 },
        { from: 15, to: 16, evalue: 1e-15 },
        { from: 3, to: 19, evalue: 1e-5 }
    ];

    // Build nodes
    const nodes = new vis.DataSet(proteinData.map(p => {
        let f = families[p.family];
        return {
            id: p.id,
            label: p.label,
            color: { background: f.color, border: f.border },
            font: { color: '#fff', size: 12, face: 'Arial' },
            shape: 'dot',
            size: 18,
            borderWidth: 2,
            shadow: true,
            title: p.acc + ' | ' + p.func,
            family: p.family,
            accession: p.acc,
            func: p.func
        };
    }));

    // Build edges (all initially, we toggle visibility)
    const edges = new vis.DataSet(blastEdges.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        evalue: e.evalue,
        hidden: false,
        color: { color: '#bbb', highlight: '#333' },
        width: Math.max(0.5, 3 - Math.log10(e.evalue) / -15 * 3),
        smooth: { type: 'continuous' }
    })));

    // Layout
    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:420px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Protein Families</strong><br>
                ${Object.entries(families).map(([name, f]) =>
                    `<span style="display:inline-block;width:12px;height:12px;background:${f.color};border:1px solid ${f.border};border-radius:50%;margin:2px 4px -1px 0;"></span>${name}<br>`
                ).join('')}
            </div>
            <div style="margin:8px 12px; display:flex; align-items:center; gap:10px;">
                <label style="font-size:13px; white-space:nowrap;"><strong>E-value threshold:</strong></label>
                <input type="range" id="evalue-slider" min="-50" max="-5" value="-5" step="1" style="flex:1;">
                <span id="evalue-label" style="font-size:13px; min-width:60px;">1e-5</span>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Drag the E-value slider to tighten or relax the similarity threshold. Click a node to see protein details. At strict thresholds, only close homologs connect; relaxing reveals cross-family hits.
            </div>
        </div>
    `;

    const container = document.getElementById('network');
    const infoPanel = document.getElementById('info-panel');
    const slider = document.getElementById('evalue-slider');
    const sliderLabel = document.getElementById('evalue-label');
    const inIframe = isInIframe();

    const options = {
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -30,
                centralGravity: 0.008,
                springLength: 100,
                springConstant: 0.05,
                damping: 0.5
            },
            stabilization: { iterations: 200 }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            dragView: !inIframe,
            zoomView: !inIframe,
            dragNodes: true,
            navigationButtons: true
        },
        edges: { selectionWidth: 2 }
    };

    const network = new vis.Network(container, { nodes, edges }, options);

    // Slider handler
    function updateThreshold() {
        let logThreshold = parseInt(slider.value);
        let threshold = Math.pow(10, logThreshold);
        sliderLabel.textContent = '1e' + logThreshold;

        let edgeUpdates = blastEdges.map((e, i) => ({
            id: i,
            hidden: e.evalue > threshold
        }));
        edges.update(edgeUpdates);
    }

    slider.addEventListener('input', updateThreshold);
    updateThreshold();

    // Click handler
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            let fam = families[nd.family];
            infoPanel.innerHTML = `<strong>${nd.label}</strong> <span style="color:${fam.color};">[${nd.family}]</span><br>Accession: ${nd.accession}<br>${nd.func}`;
        } else {
            infoPanel.innerHTML = 'Drag the E-value slider to tighten or relax the similarity threshold. Click a node to see protein details.';
        }
    });

    network.on('hoverNode', function () { container.style.cursor = 'pointer'; });
    network.on('blurNode', function () { container.style.cursor = 'default'; });
});
