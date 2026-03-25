// Profile HMM Architecture - vis-network
// Match, Insert, Delete states with transitions
// MicroSim template version 2026.02

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const L = 5; // model length (M1-M5)
    const xSpacing = 120;
    const startX = -350;
    const matchY = 0;
    const insertY = -120;
    const deleteY = 120;

    // Sample emission probabilities for match states
    const emissions = [
        'A:0.70, C:0.10, G:0.10, T:0.10',
        'A:0.05, C:0.80, G:0.10, T:0.05',
        'A:0.15, C:0.15, G:0.60, T:0.10',
        'A:0.10, C:0.05, G:0.05, T:0.80',
        'A:0.60, C:0.20, G:0.10, T:0.10'
    ];

    let nodeData = [];
    let edgeData = [];

    // Begin state
    nodeData.push({
        id: 'B', label: 'Begin', x: startX - xSpacing, y: matchY,
        shape: 'box', color: { background: '#78909C', border: '#546E7A' },
        font: { color: '#fff', size: 13 }, size: 20, borderWidth: 2, shadow: true,
        fixed: true,
        description: 'Begin state: the entry point of the profile HMM. Transitions go to M1, I0, or D1.'
    });

    // End state
    nodeData.push({
        id: 'E', label: 'End', x: startX + (L + 1) * xSpacing, y: matchY,
        shape: 'box', color: { background: '#78909C', border: '#546E7A' },
        font: { color: '#fff', size: 13 }, size: 20, borderWidth: 2, shadow: true,
        fixed: true,
        description: 'End state: the exit point. Reached from the last match state M' + L + ', insert state I' + L + ', or delete state D' + L + '.'
    });

    // I0 (insert before first match)
    nodeData.push({
        id: 'I0', label: 'I0', x: startX - xSpacing, y: insertY,
        shape: 'diamond', color: { background: '#66BB6A', border: '#43A047' },
        font: { color: '#fff', size: 11 }, size: 18, borderWidth: 2, shadow: true,
        fixed: true,
        description: 'Insert state I0: models insertions before the first match position. Emits any residue with roughly equal probability. Has a self-loop for multiple insertions.'
    });

    // Match, Insert, Delete states for positions 1-L
    for (let k = 1; k <= L; k++) {
        let mx = startX + k * xSpacing;

        // Match state
        nodeData.push({
            id: 'M' + k, label: 'M' + k, x: mx, y: matchY,
            shape: 'dot', color: { background: '#00897B', border: '#00695C' },
            font: { color: '#fff', size: 13 }, size: 30, borderWidth: 2, shadow: true,
            fixed: true,
            description: 'Match state M' + k + ': represents column ' + k + ' of the multiple sequence alignment. Emission probabilities: ' + emissions[k - 1] + '. High probability for the consensus residue at this position.'
        });

        // Insert state
        nodeData.push({
            id: 'I' + k, label: 'I' + k, x: mx, y: insertY,
            shape: 'diamond', color: { background: '#66BB6A', border: '#43A047' },
            font: { color: '#fff', size: 11 }, size: 18, borderWidth: 2, shadow: true,
            fixed: true,
            description: 'Insert state I' + k + ': models insertions between alignment columns ' + k + ' and ' + (k + 1) + '. Emits residues with near-uniform probability. Self-loop allows multiple consecutive insertions.'
        });

        // Delete state (with slight y-offset to avoid perfectly horizontal edges)
        nodeData.push({
            id: 'D' + k, label: 'D' + k, x: mx, y: deleteY + (k % 2 === 0 ? 5 : -5),
            shape: 'triangleDown', color: { background: '#BDBDBD', border: '#9E9E9E' },
            font: { color: '#333', size: 11 }, size: 18, borderWidth: 2, shadow: true,
            fixed: true,
            description: 'Delete state D' + k + ': a silent state (no emission) that skips alignment column ' + k + '. Used when a sequence has a deletion relative to the consensus. Part of the "delete path" that shortcuts through the model.'
        });
    }

    // --- Transitions ---

    // Begin -> M1, I0, D1
    edgeData.push({ from: 'B', to: 'M1', label: '', color: '#00897B', width: 2.5 });
    edgeData.push({ from: 'B', to: 'I0', label: '', color: '#66BB6A', width: 1.5 });
    edgeData.push({ from: 'B', to: 'D1', label: '', color: '#BDBDBD', width: 1.5 });

    // I0 self-loop
    edgeData.push({ from: 'I0', to: 'I0', label: '', color: '#66BB6A', width: 1 });
    // I0 -> M1, D1
    edgeData.push({ from: 'I0', to: 'M1', label: '', color: '#66BB6A', width: 1 });

    for (let k = 1; k <= L; k++) {
        let nextM = k < L ? 'M' + (k + 1) : 'E';
        let nextD = k < L ? 'D' + (k + 1) : null;

        // Match transitions: Mk -> Mk+1, Ik, Dk+1
        edgeData.push({ from: 'M' + k, to: nextM, label: '', color: '#00897B', width: 2.5 });
        edgeData.push({ from: 'M' + k, to: 'I' + k, label: '', color: '#66BB6A', width: 1.5 });
        if (nextD) {
            edgeData.push({ from: 'M' + k, to: nextD, label: '', color: '#BDBDBD', width: 1.5 });
        }

        // Insert transitions: Ik -> Ik (self-loop), Mk+1
        edgeData.push({ from: 'I' + k, to: 'I' + k, label: '', color: '#66BB6A', width: 1 });
        edgeData.push({ from: 'I' + k, to: nextM, label: '', color: '#66BB6A', width: 1 });

        // Delete transitions: Dk -> Mk+1, Dk+1
        edgeData.push({ from: 'D' + k, to: nextM, label: '', color: '#BDBDBD', width: 1.5 });
        if (nextD) {
            edgeData.push({ from: 'D' + k, to: nextD, label: '', color: '#BDBDBD', width: 1 });
        }
    }

    // Build vis datasets
    const nodes = new vis.DataSet(nodeData);
    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        label: e.label,
        arrows: 'to',
        color: { color: e.color, highlight: '#333' },
        width: e.width,
        smooth: (e.from === e.to) ? { type: 'curvedCW', roundness: 0.6 } : { type: 'curvedCW', roundness: 0.12 },
        font: { size: 8, color: '#666' },
        selfReference: (e.from === e.to) ? { size: 25, angle: -Math.PI / 2 } : undefined
    })));

    // Layout
    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:400px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>State Types</strong><br>
                <span style="display:inline-block;width:12px;height:12px;background:#00897B;border-radius:50%;margin:2px 4px -1px 0;"></span>Match (emit consensus)<br>
                <span style="display:inline-block;width:12px;height:12px;background:#66BB6A;border-radius:2px;margin:2px 4px -1px 0;transform:rotate(45deg);"></span>Insert (emit any)<br>
                <span style="display:inline-block;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:10px solid #BDBDBD;margin:2px 4px -1px 0;"></span>Delete (silent)<br>
                <span style="display:inline-block;width:12px;height:12px;background:#78909C;border-radius:2px;margin:2px 4px -1px 0;"></span>Begin / End
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a match state (M1-M5) to see emission probabilities. Match states form the backbone; insert states handle insertions with self-loops; delete states skip columns silently.
            </div>
        </div>
    `;

    const container = document.getElementById('network');
    const infoPanel = document.getElementById('info-panel');
    const inIframe = isInIframe();

    const options = {
        physics: { enabled: false },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            dragView: !inIframe,
            zoomView: !inIframe,
            dragNodes: false,
            navigationButtons: true
        },
        edges: { selectionWidth: 2 }
    };

    const network = new vis.Network(container, { nodes, edges }, options);

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            infoPanel.innerHTML = `<strong>${nd.label}</strong><br>${nd.description}`;

            const connNodes = network.getConnectedNodes(nodeId);
            const connEdges = network.getConnectedEdges(nodeId);

            nodes.update(nodes.get().map(n => ({
                id: n.id,
                opacity: (n.id === nodeId || connNodes.includes(n.id)) ? 1.0 : 0.2
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connEdges.includes(e.id) ? { color: '#333' } : { color: 'rgba(180,180,180,0.15)' },
                width: connEdges.includes(e.id) ? 3 : 0.5
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a match state (M1-M5) to see emission probabilities. Match states form the backbone; insert states handle insertions with self-loops; delete states skip columns silently.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edgeData.map((e, i) => ({
            id: i,
            color: { color: e.color, highlight: '#333' },
            width: e.width
        })));
    }

    network.on('hoverNode', function () { container.style.cursor = 'pointer'; });
    network.on('blurNode', function () { container.style.cursor = 'default'; });
});
