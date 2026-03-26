// Bipartite Metabolic Graph — vis-network MicroSim
// Metabolite nodes (circles, teal) and reaction nodes (squares, orange).
// Directed edges show substrate → reaction → product. Click highlights connections.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    // Metabolite nodes (circles, teal)
    const metabolites = [
        { id: 'glc',  label: 'Glucose',           desc: 'Starting substrate of glycolysis. A six-carbon sugar (C₆H₁₂O₆).' },
        { id: 'g6p',  label: 'Glucose-6-P',       desc: 'Glucose phosphorylated at C6. Committed to glycolysis or pentose phosphate pathway.' },
        { id: 'f6p',  label: 'Fructose-6-P',      desc: 'Isomer of G6P. Intermediate before the key regulatory step.' },
        { id: 'fbp',  label: 'Fructose-1,6-BP',   desc: 'Fructose bisphosphate — product of the committed step catalysed by PFK-1.' },
        { id: 'g3p',  label: 'G3P',               desc: 'Glyceraldehyde-3-phosphate. Three-carbon intermediate.' },
        { id: 'dhap', label: 'DHAP',              desc: 'Dihydroxyacetone phosphate. Isomer of G3P, interconverted by TPI.' },
        { id: 'bpg',  label: '1,3-BPG',           desc: '1,3-Bisphosphoglycerate. High-energy intermediate that donates phosphate to ADP.' },
        { id: 'pg3',  label: '3-PG',              desc: '3-Phosphoglycerate. Product of substrate-level phosphorylation.' },
        { id: 'pg2',  label: '2-PG',              desc: '2-Phosphoglycerate. Formed by mutase rearrangement.' },
        { id: 'pep',  label: 'PEP',               desc: 'Phosphoenolpyruvate. Highest-energy phosphorylated compound in glycolysis.' },
        { id: 'pyr',  label: 'Pyruvate',          desc: 'End product of glycolysis. Enters TCA cycle or fermentation.' },
        { id: 'atp',  label: 'ATP',               desc: 'Adenosine triphosphate — the universal energy currency of the cell.' },
        { id: 'adp',  label: 'ADP',               desc: 'Adenosine diphosphate — substrate for ATP synthesis.' },
        { id: 'nad',  label: 'NAD⁺',              desc: 'Oxidised nicotinamide adenine dinucleotide — electron acceptor.' },
        { id: 'nadh', label: 'NADH',              desc: 'Reduced NAD — carries electrons to the electron transport chain.' }
    ];

    // Reaction nodes (squares, orange)
    const reactions = [
        { id: 'r1', label: 'Hexokinase',       desc: 'Phosphorylates glucose to G6P using ATP. First step of glycolysis.' },
        { id: 'r2', label: 'PGI',              desc: 'Phosphoglucose isomerase converts G6P ↔ F6P.' },
        { id: 'r3', label: 'PFK-1',            desc: 'Phosphofructokinase-1. Key regulatory (rate-limiting) step. Uses ATP.' },
        { id: 'r4', label: 'Aldolase',         desc: 'Cleaves F-1,6-BP into G3P and DHAP (two 3-carbon molecules).' },
        { id: 'r5', label: 'TPI',              desc: 'Triose phosphate isomerase interconverts DHAP ↔ G3P.' },
        { id: 'r6', label: 'GAPDH',            desc: 'Glyceraldehyde-3-P dehydrogenase. Oxidises G3P, reduces NAD⁺ → NADH.' },
        { id: 'r7', label: 'PGK',              desc: 'Phosphoglycerate kinase. Substrate-level phosphorylation: ADP → ATP.' },
        { id: 'r8', label: 'PGM',              desc: 'Phosphoglycerate mutase converts 3-PG → 2-PG.' },
        { id: 'r9', label: 'Enolase',          desc: 'Dehydrates 2-PG to PEP.' },
        { id: 'r10',label: 'Pyruvate\nKinase', desc: 'Substrate-level phosphorylation: PEP → Pyruvate, ADP → ATP.' }
    ];

    // Directed edges: substrate → reaction, reaction → product
    const edgeData = [
        // Hexokinase
        { from: 'glc', to: 'r1' }, { from: 'atp', to: 'r1' },
        { from: 'r1', to: 'g6p' }, { from: 'r1', to: 'adp' },
        // PGI
        { from: 'g6p', to: 'r2' }, { from: 'r2', to: 'f6p' },
        // PFK-1
        { from: 'f6p', to: 'r3' }, { from: 'atp', to: 'r3' },
        { from: 'r3', to: 'fbp' }, { from: 'r3', to: 'adp' },
        // Aldolase
        { from: 'fbp', to: 'r4' }, { from: 'r4', to: 'g3p' }, { from: 'r4', to: 'dhap' },
        // TPI
        { from: 'dhap', to: 'r5' }, { from: 'r5', to: 'g3p' },
        // GAPDH
        { from: 'g3p', to: 'r6' }, { from: 'nad', to: 'r6' },
        { from: 'r6', to: 'bpg' }, { from: 'r6', to: 'nadh' },
        // PGK
        { from: 'bpg', to: 'r7' }, { from: 'adp', to: 'r7' },
        { from: 'r7', to: 'pg3' }, { from: 'r7', to: 'atp' },
        // PGM
        { from: 'pg3', to: 'r8' }, { from: 'r8', to: 'pg2' },
        // Enolase
        { from: 'pg2', to: 'r9' }, { from: 'r9', to: 'pep' },
        // Pyruvate Kinase
        { from: 'pep', to: 'r10' }, { from: 'adp', to: 'r10' },
        { from: 'r10', to: 'pyr' }, { from: 'r10', to: 'atp' }
    ];

    // Build vis DataSets
    const nodeArray = [];
    metabolites.forEach(m => {
        nodeArray.push({
            id: m.id, label: m.label,
            shape: 'ellipse',
            color: { background: '#1ABC9C', border: '#16A085' },
            font: { color: '#FFFFFF', size: 11, face: 'Arial' },
            borderWidth: 2, shadow: true,
            description: m.desc, nodeType: 'metabolite'
        });
    });
    reactions.forEach(r => {
        nodeArray.push({
            id: r.id, label: r.label,
            shape: 'box',
            color: { background: '#E67E22', border: '#D35400' },
            font: { color: '#FFFFFF', size: 11, face: 'Arial', multi: true },
            borderWidth: 2, shadow: true,
            description: r.desc, nodeType: 'reaction'
        });
    });

    const nodes = new vis.DataSet(nodeArray);
    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        arrows: 'to',
        color: { color: '#777', highlight: '#333' },
        width: 1.5,
        smooth: { type: 'curvedCW', roundness: 0.15 }
    })));

    // DOM layout
    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:480px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:12px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Bipartite Metabolic Graph</strong><br>
                <span style="display:inline-block;width:12px;height:12px;background:#1ABC9C;border-radius:50%;margin:2px 4px -2px 0;"></span>Metabolite<br>
                <span style="display:inline-block;width:12px;height:12px;background:#E67E22;border-radius:2px;margin:2px 4px -2px 0;"></span>Reaction<br>
                <span style="font-size:11px;color:#666;">→ substrate / product flow</span>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a node to see its description and highlight its connections.
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
                springLength: 100,
                springConstant: 0.06,
                damping: 0.5
            },
            stabilization: { iterations: 250 }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            dragView: enableMouse,
            zoomView: enableMouse,
            dragNodes: false,
            navigationButtons: true
        },
        edges: { selectionWidth: 2 }
    };

    const network = new vis.Network(container, { nodes, edges }, options);

    // Click handler
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            const connNodes = network.getConnectedNodes(nodeId);
            const connEdges = network.getConnectedEdges(nodeId);
            const typeLabel = nd.nodeType === 'metabolite' ? 'Metabolite' : 'Enzyme / Reaction';
            const typeColor = nd.nodeType === 'metabolite' ? '#1ABC9C' : '#E67E22';

            infoPanel.innerHTML = `<strong>${nd.label.replace('\n', ' ')}</strong>
                <span style="color:${typeColor};">(${typeLabel})</span><br>
                ${nd.description}<br>
                <em style="color:#666;">Connected to ${connNodes.length} node${connNodes.length !== 1 ? 's' : ''}.</em>`;

            // Dim everything then highlight selection
            nodes.update(nodes.get().map(n => ({
                id: n.id,
                opacity: (n.id === nodeId || connNodes.includes(n.id)) ? 1.0 : 0.15
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connEdges.includes(e.id) ? { color: '#333' } : { color: 'rgba(180,180,180,0.15)' },
                width: connEdges.includes(e.id) ? 2.5 : 0.5
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a node to see its description and highlight its connections.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map(e => ({
            id: e.id,
            color: { color: '#777', highlight: '#333' },
            width: 1.5
        })));
    }

    network.on('hoverNode', function () { container.style.cursor = 'pointer'; });
    network.on('blurNode', function () { container.style.cursor = 'default'; });
});
