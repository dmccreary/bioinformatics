// Metabolic Network Overview — vis-network MicroSim
// Hub metabolites (ATP, NADH, pyruvate) are large. Pathway clusters colored differently.
// Click to highlight a pathway.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const pathwayColors = {
        glycolysis:  { bg: '#2980B9', border: '#1F618D' },
        tca:         { bg: '#27AE60', border: '#1E8449' },
        ppp:         { bg: '#8E44AD', border: '#6C3483' },
        shared:      { bg: '#E74C3C', border: '#C0392B' }
    };
    const fontWhite = { color: '#FFF', size: 12, face: 'Arial' };

    // Metabolite definitions: id, label, pathway, hub flag, description
    const metabs = [
        // Glycolysis
        { id: 'glc',  label: 'Glucose',        pw: 'glycolysis', hub: false, desc: 'Six-carbon sugar; primary fuel source.' },
        { id: 'g6p',  label: 'G6P',            pw: 'glycolysis', hub: true,  desc: 'Glucose-6-phosphate — branch point for glycolysis and PPP.' },
        { id: 'f6p',  label: 'F6P',            pw: 'glycolysis', hub: false, desc: 'Fructose-6-phosphate.' },
        { id: 'fbp',  label: 'F1,6BP',         pw: 'glycolysis', hub: false, desc: 'Fructose-1,6-bisphosphate.' },
        { id: 'g3p',  label: 'G3P',            pw: 'glycolysis', hub: false, desc: 'Glyceraldehyde-3-phosphate.' },
        { id: 'pep',  label: 'PEP',            pw: 'glycolysis', hub: false, desc: 'Phosphoenolpyruvate — high-energy intermediate.' },
        { id: 'pyr',  label: 'Pyruvate',       pw: 'shared',     hub: true,  desc: 'Pyruvate — end product of glycolysis, enters TCA or fermentation.' },

        // TCA cycle
        { id: 'acoa', label: 'Acetyl-CoA',     pw: 'tca',        hub: true,  desc: 'Acetyl-CoA — feeds two carbons into the TCA cycle.' },
        { id: 'cit',  label: 'Citrate',        pw: 'tca',        hub: false, desc: 'Six-carbon TCA intermediate.' },
        { id: 'akg',  label: 'α-Ketoglutarate',pw: 'tca',        hub: true,  desc: 'Five-carbon TCA intermediate; connects to amino acid metabolism.' },
        { id: 'suc',  label: 'Succinate',      pw: 'tca',        hub: false, desc: 'Four-carbon TCA intermediate.' },
        { id: 'fum',  label: 'Fumarate',       pw: 'tca',        hub: false, desc: 'Four-carbon TCA intermediate.' },
        { id: 'mal',  label: 'Malate',         pw: 'tca',        hub: false, desc: 'Four-carbon TCA intermediate.' },
        { id: 'oaa',  label: 'Oxaloacetate',   pw: 'tca',        hub: true,  desc: 'Oxaloacetate — regenerated each TCA turn; also gluconeogenic.' },

        // Pentose phosphate pathway
        { id: 'r5p',  label: 'Ribose-5-P',     pw: 'ppp',        hub: false, desc: 'Ribose-5-phosphate — precursor for nucleotide synthesis.' },
        { id: '6pg',  label: '6-PG',           pw: 'ppp',        hub: false, desc: '6-Phosphogluconate — PPP oxidative branch.' },
        { id: 'x5p',  label: 'Xylulose-5-P',  pw: 'ppp',        hub: false, desc: 'Xylulose-5-phosphate — PPP non-oxidative branch.' },
        { id: 'e4p',  label: 'Erythrose-4-P',  pw: 'ppp',        hub: false, desc: 'Four-carbon sugar phosphate in non-oxidative PPP.' },

        // Shared cofactors (hubs)
        { id: 'atp',  label: 'ATP',            pw: 'shared',     hub: true,  desc: 'Adenosine triphosphate — universal energy currency.' },
        { id: 'nadh', label: 'NADH',           pw: 'shared',     hub: true,  desc: 'Reduced NAD — carries electrons to ETC.' },
        { id: 'nadph',label: 'NADPH',          pw: 'shared',     hub: true,  desc: 'Reduced NADP — reductive biosynthesis cofactor, produced by PPP.' },
        { id: 'co2',  label: 'CO₂',            pw: 'shared',     hub: false, desc: 'Carbon dioxide — released by decarboxylation reactions.' }
    ];

    const edgeList = [
        // Glycolysis
        { from: 'glc', to: 'g6p' }, { from: 'g6p', to: 'f6p' },
        { from: 'f6p', to: 'fbp' }, { from: 'fbp', to: 'g3p' },
        { from: 'g3p', to: 'pep' }, { from: 'pep', to: 'pyr' },
        // ATP production / consumption in glycolysis
        { from: 'atp', to: 'g6p' }, { from: 'atp', to: 'fbp' },
        { from: 'pep', to: 'atp' }, { from: 'g3p', to: 'atp' },
        { from: 'g3p', to: 'nadh' },
        // Pyruvate → Acetyl-CoA
        { from: 'pyr', to: 'acoa' }, { from: 'pyr', to: 'co2' },
        { from: 'pyr', to: 'nadh' },
        // TCA cycle
        { from: 'acoa', to: 'cit' }, { from: 'oaa', to: 'cit' },
        { from: 'cit', to: 'akg' }, { from: 'cit', to: 'co2' },
        { from: 'akg', to: 'suc' }, { from: 'akg', to: 'co2' },
        { from: 'akg', to: 'nadh' },
        { from: 'suc', to: 'fum' },
        { from: 'fum', to: 'mal' },
        { from: 'mal', to: 'oaa' }, { from: 'mal', to: 'nadh' },
        { from: 'suc', to: 'atp' },
        // PPP
        { from: 'g6p', to: '6pg' }, { from: 'g6p', to: 'nadph' },
        { from: '6pg', to: 'r5p' }, { from: '6pg', to: 'nadph' },
        { from: '6pg', to: 'co2' },
        { from: 'r5p', to: 'x5p' },
        { from: 'x5p', to: 'e4p' },
        { from: 'x5p', to: 'f6p' }, // non-oxidative feeds back
        { from: 'e4p', to: 'f6p' }
    ];

    // Build nodes
    const nodes = new vis.DataSet(metabs.map(m => ({
        id: m.id, label: m.label,
        shape: m.hub ? 'ellipse' : 'dot',
        size: m.hub ? 22 : 12,
        color: { background: pathwayColors[m.pw].bg, border: pathwayColors[m.pw].border },
        font: { ...fontWhite, size: m.hub ? 13 : 10 },
        borderWidth: m.hub ? 3 : 1.5,
        shadow: m.hub,
        pathway: m.pw, description: m.desc
    })));

    const edges = new vis.DataSet(edgeList.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        arrows: 'to',
        color: { color: '#999', highlight: '#333' },
        width: 1.5,
        smooth: { type: 'continuous' }
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:470px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:12px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Pathway Colors</strong><br>
                <span style="display:inline-block;width:12px;height:12px;background:#2980B9;border-radius:50%;margin:2px 4px -2px 0;"></span>Glycolysis<br>
                <span style="display:inline-block;width:12px;height:12px;background:#27AE60;border-radius:50%;margin:2px 4px -2px 0;"></span>TCA Cycle<br>
                <span style="display:inline-block;width:12px;height:12px;background:#8E44AD;border-radius:50%;margin:2px 4px -2px 0;"></span>Pentose Phosphate<br>
                <span style="display:inline-block;width:12px;height:12px;background:#E74C3C;border-radius:50%;margin:2px 4px -2px 0;"></span>Shared / Hub<br>
                <span style="font-size:11px;color:#666;">Large nodes = hub metabolites</span>
            </div>
            <div id="btn-bar" style="padding:4px 12px;">
                <button id="btn-all">All</button>
                <button id="btn-glyc">Glycolysis</button>
                <button id="btn-tca">TCA Cycle</button>
                <button id="btn-ppp">Pentose Phosphate</button>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a metabolite to see details, or use buttons to highlight a pathway.
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
                gravitationalConstant: -45,
                centralGravity: 0.008,
                springLength: 110,
                springConstant: 0.06,
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

    // Pathway highlight buttons
    function highlightPathway(pw) {
        nodes.update(nodes.get().map(n => ({
            id: n.id,
            opacity: (pw === 'all' || n.pathway === pw || n.pathway === 'shared') ? 1.0 : 0.12
        })));
        edges.update(edges.get().map(e => {
            const srcPw = nodes.get(e.from).pathway;
            const tgtPw = nodes.get(e.to).pathway;
            const show = pw === 'all' || srcPw === pw || tgtPw === pw || srcPw === 'shared' || tgtPw === 'shared';
            return {
                id: e.id,
                color: show ? { color: '#777' } : { color: 'rgba(180,180,180,0.1)' },
                width: show ? 1.5 : 0.3
            };
        }));
        if (pw !== 'all') {
            const labels = { glycolysis: 'Glycolysis', tca: 'TCA Cycle', ppp: 'Pentose Phosphate Pathway' };
            infoPanel.innerHTML = `<strong>${labels[pw]}</strong> pathway highlighted. Shared hub metabolites always shown.`;
        } else {
            infoPanel.innerHTML = 'All pathways shown. Click a metabolite for details.';
        }
    }

    document.getElementById('btn-all').addEventListener('click', () => highlightPathway('all'));
    document.getElementById('btn-glyc').addEventListener('click', () => highlightPathway('glycolysis'));
    document.getElementById('btn-tca').addEventListener('click', () => highlightPathway('tca'));
    document.getElementById('btn-ppp').addEventListener('click', () => highlightPathway('ppp'));

    // Node click
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            const conn = network.getConnectedNodes(nodeId);
            const connE = network.getConnectedEdges(nodeId);
            const pwLabel = { glycolysis: 'Glycolysis', tca: 'TCA Cycle', ppp: 'Pentose Phosphate', shared: 'Shared' }[nd.pathway];

            infoPanel.innerHTML = `<strong>${nd.label}</strong> <span style="color:${pathwayColors[nd.pathway].bg};">(${pwLabel})</span><br>${nd.description}<br><em style="color:#666;">Connected to ${conn.length} metabolite${conn.length !== 1 ? 's' : ''}.</em>`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.15
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id) ? { color: '#333' } : { color: 'rgba(180,180,180,0.12)' },
                width: connE.includes(e.id) ? 2.5 : 0.4
            })));
        } else {
            highlightPathway('all');
        }
    });

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
