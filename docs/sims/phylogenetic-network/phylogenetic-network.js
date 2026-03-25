// Phylogenetic Network with Reticulation Events - vis-network
// Tree edges in teal, reticulation edges in orange
// Toggle checkbox to show/hide reticulation edges
// MicroSim template version 2026.02

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    // 8 taxa as leaf nodes, internal nodes for tree topology
    // Tree: (((A,B),C),((D,E),(F,(G,H))))
    const nodeData = [
        // Leaf taxa
        { id: 'A', label: 'Taxon A', x: -300, y: 250, type: 'leaf',
          desc: 'Leaf taxon A — sister to taxon B. Diverged from their common ancestor through speciation.' },
        { id: 'B', label: 'Taxon B', x: -200, y: 250, type: 'leaf',
          desc: 'Leaf taxon B — sister to taxon A. Together they form a clade with taxon C.' },
        { id: 'C', label: 'Taxon C', x: -100, y: 250, type: 'leaf',
          desc: 'Leaf taxon C — outgroup to the (A,B) clade. Involved in a reticulation event with taxon F.' },
        { id: 'D', label: 'Taxon D', x: 0,    y: 250, type: 'leaf',
          desc: 'Leaf taxon D — sister to taxon E in the right subtree.' },
        { id: 'E', label: 'Taxon E', x: 100,  y: 250, type: 'leaf',
          desc: 'Leaf taxon E — sister to taxon D. A possible HGT recipient from taxon B.' },
        { id: 'F', label: 'Taxon F', x: 200,  y: 250, type: 'leaf',
          desc: 'Leaf taxon F — sister to the (G,H) clade. Involved in a hybridization event with lineage leading to taxon C.' },
        { id: 'G', label: 'Taxon G', x: 270,  y: 250, type: 'leaf',
          desc: 'Leaf taxon G — sister to taxon H in the rightmost clade.' },
        { id: 'H', label: 'Taxon H', x: 340,  y: 250, type: 'leaf',
          desc: 'Leaf taxon H — sister to taxon G.' },
        // Internal nodes
        { id: 'AB',   label: '',  x: -250, y: 150, type: 'internal',
          desc: 'Speciation node: ancestor of taxa A and B.' },
        { id: 'ABC',  label: '',  x: -175, y: 70,  type: 'internal',
          desc: 'Speciation node: ancestor of taxa A, B, and C.' },
        { id: 'DE',   label: '',  x: 50,   y: 150, type: 'internal',
          desc: 'Speciation node: ancestor of taxa D and E.' },
        { id: 'GH',   label: '',  x: 305,  y: 150, type: 'internal',
          desc: 'Speciation node: ancestor of taxa G and H.' },
        { id: 'FGH',  label: '',  x: 250,  y: 80,  type: 'internal',
          desc: 'Speciation node: ancestor of taxa F, G, and H.' },
        { id: 'DEFGH', label: '', x: 150,  y: 10,  type: 'internal',
          desc: 'Speciation node: ancestor of the right subtree (D through H).' },
        { id: 'ROOT', label: 'Root', x: 0,  y: -70, type: 'root',
          desc: 'Root of the phylogenetic network. The most recent common ancestor of all 8 taxa.' }
    ];

    // Tree edges (teal)
    const treeEdges = [
        { from: 'AB', to: 'A' },
        { from: 'AB', to: 'B' },
        { from: 'ABC', to: 'AB' },
        { from: 'ABC', to: 'C' },
        { from: 'DE', to: 'D' },
        { from: 'DE', to: 'E' },
        { from: 'GH', to: 'G' },
        { from: 'GH', to: 'H' },
        { from: 'FGH', to: 'F' },
        { from: 'FGH', to: 'GH' },
        { from: 'DEFGH', to: 'DE' },
        { from: 'DEFGH', to: 'FGH' },
        { from: 'ROOT', to: 'ABC' },
        { from: 'ROOT', to: 'DEFGH' }
    ];

    // Reticulation edges (HGT/hybridization, orange)
    const reticulationEdges = [
        { from: 'C', to: 'F', id: 'ret1',
          desc: 'Hybridization event: gene flow between the lineage of taxon C and taxon F, creating conflicting phylogenetic signal.' },
        { from: 'B', to: 'E', id: 'ret2',
          desc: 'Horizontal gene transfer: genetic material transferred from the lineage of taxon B to taxon E, making some gene trees discordant with the species tree.' }
    ];

    // Build vis nodes
    const nodes = new vis.DataSet(nodeData.map(d => ({
        id: d.id,
        label: d.label,
        x: d.x,
        // Slight y-offset on some nodes to avoid perfectly horizontal edges
        y: d.y + (d.id === 'E' ? 5 : 0),
        shape: d.type === 'leaf' ? 'dot' : (d.type === 'root' ? 'diamond' : 'dot'),
        color: d.type === 'leaf'
            ? { background: '#00897B', border: '#00695C' }
            : { background: '#78909C', border: '#546E7A' },
        font: { color: d.type === 'leaf' ? '#00695C' : '#546E7A', size: d.type === 'leaf' ? 13 : 9, face: 'Arial' },
        size: d.type === 'leaf' ? 14 : (d.type === 'root' ? 16 : 6),
        borderWidth: 2,
        shadow: d.type === 'leaf',
        fixed: true,
        description: d.desc,
        nodeType: d.type
    })));

    // Build tree edges
    let allEdges = [];
    treeEdges.forEach((e, i) => {
        allEdges.push({
            id: 'tree_' + i,
            from: e.from,
            to: e.to,
            color: { color: '#00897B', highlight: '#00695C' },
            width: 2.5,
            smooth: false,
            isReticulation: false
        });
    });

    // Build reticulation edges
    reticulationEdges.forEach((e, i) => {
        allEdges.push({
            id: 'ret_' + i,
            from: e.from,
            to: e.to,
            color: { color: '#E65100', highlight: '#BF360C' },
            width: 2.5,
            dashes: [8, 4],
            arrows: { to: { enabled: true, scaleFactor: 0.8 } },
            smooth: { type: 'curvedCW', roundness: 0.3 },
            isReticulation: true,
            hidden: false,
            label: i === 0 ? 'Hybridization' : 'HGT',
            font: { size: 10, color: '#E65100', strokeWidth: 2, strokeColor: '#fff' },
            description: e.desc
        });
    });

    const edges = new vis.DataSet(allEdges);

    // Layout
    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:430px;"></div>
            <div id="controls" style="margin:4px 12px; display:flex; align-items:center; gap:15px;">
                <label style="font-size:13px; cursor:pointer;">
                    <input type="checkbox" id="ret-toggle" checked>
                    <strong>Show reticulation edges</strong> (HGT / hybridization)
                </label>
            </div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Edge Types</strong><br>
                <span style="display:inline-block;width:20px;height:3px;background:#00897B;margin:4px 4px -1px 0;"></span>Tree (speciation)<br>
                <span style="display:inline-block;width:20px;height:0;border-top:3px dashed #E65100;margin:4px 4px -1px 0;"></span>Reticulation (HGT)
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                A phylogenetic network extends trees with reticulation edges that represent HGT or hybridization. Toggle the checkbox to compare the tree with and without reticulation events.
            </div>
        </div>
    `;

    const container = document.getElementById('network');
    const infoPanel = document.getElementById('info-panel');
    const retToggle = document.getElementById('ret-toggle');
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

    // Toggle reticulation edges
    retToggle.addEventListener('change', function () {
        let show = retToggle.checked;
        let retEdgeIds = allEdges.filter(e => e.isReticulation).map(e => e.id);
        edges.update(retEdgeIds.map(id => ({ id: id, hidden: !show })));
    });

    // Click handler
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            infoPanel.innerHTML = `<strong>${nd.label || nodeId}</strong><br>${nd.description}`;
        } else if (params.edges.length > 0) {
            const edgeId = params.edges[0];
            const ed = edges.get(edgeId);
            if (ed.description) {
                infoPanel.innerHTML = `<strong>${ed.label || 'Tree edge'}</strong><br>${ed.description}`;
            }
        } else {
            infoPanel.innerHTML = 'A phylogenetic network extends trees with reticulation edges that represent HGT or hybridization. Toggle the checkbox to compare the tree with and without reticulation events.';
        }
    });

    network.on('hoverNode', function () { container.style.cursor = 'pointer'; });
    network.on('blurNode', function () { container.style.cursor = 'default'; });
});
