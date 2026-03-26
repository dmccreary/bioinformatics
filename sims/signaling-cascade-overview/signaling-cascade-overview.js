// Signaling Cascade Overview — vis-network MicroSim
// Directed graph: Receptor → Adaptor → RAF → MEK → ERK → TFs
// Feedback loops as curved edges. Colored by cellular compartment.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const compartmentColors = {
        membrane:    { bg: '#2980B9', border: '#1F618D' },
        cytoplasm:   { bg: '#E67E22', border: '#D35400' },
        nucleus:     { bg: '#8E44AD', border: '#6C3483' }
    };

    const nodeData = [
        // Membrane
        { id: 'egf',   label: 'EGF\n(ligand)',      comp: 'membrane',  level: 0, desc: 'Epidermal Growth Factor — extracellular ligand that binds and activates EGFR.' },
        { id: 'egfr',  label: 'EGFR\n(receptor)',    comp: 'membrane',  level: 0, desc: 'Receptor tyrosine kinase. Ligand binding triggers dimerisation and autophosphorylation.' },
        { id: 'grb2',  label: 'GRB2\n(adaptor)',     comp: 'membrane',  level: 1, desc: 'Growth factor receptor-bound protein 2. SH2 domain binds phospho-EGFR; SH3 binds SOS.' },
        { id: 'sos',   label: 'SOS\n(GEF)',          comp: 'membrane',  level: 1, desc: 'Son of Sevenless — guanine nucleotide exchange factor that activates RAS.' },
        { id: 'ras',   label: 'RAS',                 comp: 'membrane',  level: 2, desc: 'Small GTPase anchored to membrane. Active (GTP-bound) form recruits RAF.' },
        // Cytoplasm — kinase cascade
        { id: 'raf',   label: 'RAF\n(MAPKKK)',       comp: 'cytoplasm', level: 3, desc: 'Serine/threonine kinase. First kinase in the MAPK cascade. Phosphorylates MEK.' },
        { id: 'mek',   label: 'MEK\n(MAPKK)',        comp: 'cytoplasm', level: 4, desc: 'Dual-specificity kinase. Phosphorylates ERK on both threonine and tyrosine.' },
        { id: 'erk',   label: 'ERK\n(MAPK)',         comp: 'cytoplasm', level: 5, desc: 'Extracellular signal-regulated kinase. Phosphorylates >150 substrates. Translocates to nucleus.' },
        // Nucleus
        { id: 'elk1',  label: 'ELK1\n(TF)',          comp: 'nucleus',   level: 6, desc: 'ETS-domain transcription factor. Phosphorylated by ERK, activates c-FOS expression.' },
        { id: 'myc',   label: 'MYC\n(TF)',           comp: 'nucleus',   level: 6, desc: 'Proto-oncogene transcription factor. Drives cell proliferation genes.' },
        { id: 'fos',   label: 'c-FOS\n(TF)',         comp: 'nucleus',   level: 6, desc: 'Component of AP-1 transcription factor complex. Promotes cell cycle entry.' },
        // Negative regulators
        { id: 'dusp',  label: 'DUSP\n(phosphatase)', comp: 'cytoplasm', level: 5, desc: 'Dual-specificity phosphatase. Dephosphorylates ERK — negative feedback loop.' },
        { id: 'sprty', label: 'Sprouty',             comp: 'cytoplasm', level: 3, desc: 'Sprouty protein. Inhibits RAS-RAF interaction — negative feedback induced by ERK.' }
    ];

    // Edges: main cascade + feedback
    const edgeData = [
        // Main forward cascade
        { from: 'egf',  to: 'egfr',  label: 'binds',           fb: false },
        { from: 'egfr', to: 'grb2',  label: 'recruits',        fb: false },
        { from: 'grb2', to: 'sos',   label: 'activates',       fb: false },
        { from: 'sos',  to: 'ras',   label: 'GTP loading',     fb: false },
        { from: 'ras',  to: 'raf',   label: 'recruits',        fb: false },
        { from: 'raf',  to: 'mek',   label: 'phosphorylates',  fb: false },
        { from: 'mek',  to: 'erk',   label: 'phosphorylates',  fb: false },
        { from: 'erk',  to: 'elk1',  label: 'phosphorylates',  fb: false },
        { from: 'erk',  to: 'myc',   label: 'stabilises',      fb: false },
        { from: 'erk',  to: 'fos',   label: 'activates',       fb: false },
        // Negative feedback loops
        { from: 'erk',   to: 'dusp',  label: 'induces',         fb: true },
        { from: 'dusp',  to: 'erk',   label: 'inhibits',        fb: true },
        { from: 'erk',   to: 'sprty', label: 'induces',         fb: true },
        { from: 'sprty', to: 'ras',   label: 'inhibits',        fb: true }
    ];

    // Fixed positions (top-to-bottom layout)
    const levelY = { 0: 60, 1: 120, 2: 180, 3: 240, 4: 300, 5: 360, 6: 430 };
    const fixedPositions = {};
    // Assign x by spreading nodes at each level
    const levelNodes = {};
    nodeData.forEach(n => {
        if (!levelNodes[n.level]) levelNodes[n.level] = [];
        levelNodes[n.level].push(n.id);
    });

    for (let [lev, ids] of Object.entries(levelNodes)) {
        let count = ids.length;
        ids.forEach((id, i) => {
            fixedPositions[id] = {
                x: (i - (count - 1) / 2) * 140,
                y: levelY[lev] + (id === 'dusp' ? 0 : 0) + (id === 'sprty' ? 0 : 0)
            };
        });
    }
    // Offset feedback nodes
    fixedPositions['dusp'].x = 220;
    fixedPositions['sprty'].x = -200;

    const nodes = new vis.DataSet(nodeData.map(n => ({
        id: n.id, label: n.label,
        x: fixedPositions[n.id].x, y: fixedPositions[n.id].y,
        shape: 'box',
        color: { background: compartmentColors[n.comp].bg, border: compartmentColors[n.comp].border },
        font: { color: '#FFF', size: 11, face: 'Arial', multi: true },
        borderWidth: 2, shadow: true, margin: 6,
        compartment: n.comp, description: n.desc
    })));

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        label: e.label,
        arrows: 'to',
        dashes: e.fb,
        color: { color: e.fb ? '#E74C3C' : '#555', highlight: '#333' },
        width: e.fb ? 2 : 1.8,
        font: { size: 9, color: e.fb ? '#C0392B' : '#666', strokeWidth: 2, strokeColor: '#FFF' },
        smooth: e.fb ? { type: 'curvedCCW', roundness: 0.3 } : { type: 'cubicBezier', roundness: 0.1 }
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:490px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:12px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>RAS-MAPK Signaling</strong><br>
                <span style="display:inline-block;width:12px;height:12px;background:#2980B9;border-radius:2px;margin:2px 4px -2px 0;"></span>Membrane<br>
                <span style="display:inline-block;width:12px;height:12px;background:#E67E22;border-radius:2px;margin:2px 4px -2px 0;"></span>Cytoplasm<br>
                <span style="display:inline-block;width:12px;height:12px;background:#8E44AD;border-radius:2px;margin:2px 4px -2px 0;"></span>Nucleus<br>
                <span style="color:#E74C3C;font-size:11px;">- - - Negative feedback</span>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a node to learn about its role in the RAS-MAPK signaling cascade.
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
            const conn = network.getConnectedNodes(nodeId);
            const connE = network.getConnectedEdges(nodeId);
            const compLabel = nd.compartment.charAt(0).toUpperCase() + nd.compartment.slice(1);

            infoPanel.innerHTML = `<strong>${nd.label.replace(/\n/g, ' ')}</strong>
                <span style="color:${compartmentColors[nd.compartment].bg};">(${compLabel})</span><br>
                ${nd.description}`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.15
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id)
                    ? { color: edgeData[e.id].fb ? '#E74C3C' : '#333' }
                    : { color: 'rgba(180,180,180,0.12)' },
                width: connE.includes(e.id) ? 3 : 0.4
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a node to learn about its role in the RAS-MAPK signaling cascade.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map((e, i) => ({
            id: e.id,
            color: { color: edgeData[e.id].fb ? '#E74C3C' : '#555', highlight: '#333' },
            width: edgeData[e.id].fb ? 2 : 1.8
        })));
    }

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
