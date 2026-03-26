// Disease Module Interactome — vis-network MicroSim
// Human interactome subset (~30 proteins). Two disease modules (asthma=blue, diabetes=red).
// Toggle modules on/off. Overlap proteins in purple. Network proximity score.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const moduleColors = {
        asthma:   { bg: '#2980B9', border: '#1F618D' },
        diabetes: { bg: '#E74C3C', border: '#C0392B' },
        overlap:  { bg: '#8E44AD', border: '#6C3483' },
        none:     { bg: '#BDC3C7', border: '#95A5A6' }
    };

    // Proteins with disease module membership
    const proteins = [
        // Asthma module
        { id: 'IL4',    modules: ['asthma'],              desc: 'Interleukin-4. Key cytokine driving Th2 differentiation and IgE class switching.' },
        { id: 'IL13',   modules: ['asthma'],              desc: 'Interleukin-13. Induces mucus hypersecretion and airway hyperresponsiveness.' },
        { id: 'IL5',    modules: ['asthma'],              desc: 'Interleukin-5. Primary eosinophil growth and survival factor.' },
        { id: 'TSLP',   modules: ['asthma'],              desc: 'Thymic stromal lymphopoietin. Epithelial alarmin activating dendritic cells.' },
        { id: 'IL33',   modules: ['asthma'],              desc: 'Interleukin-33. Alarmin released by epithelial damage, activates ILC2s.' },
        { id: 'GATA3',  modules: ['asthma'],              desc: 'Transcription factor. Master regulator of Th2 cell differentiation.' },
        { id: 'CCL11',  modules: ['asthma'],              desc: 'Eotaxin-1. Chemokine recruiting eosinophils to airways.' },
        // Diabetes module
        { id: 'INS',    modules: ['diabetes'],            desc: 'Insulin. Peptide hormone regulating glucose uptake by cells.' },
        { id: 'INSR',   modules: ['diabetes'],            desc: 'Insulin receptor. Tyrosine kinase activated by insulin binding.' },
        { id: 'IRS1',   modules: ['diabetes'],            desc: 'Insulin receptor substrate 1. Scaffold mediating insulin signaling.' },
        { id: 'GCK',    modules: ['diabetes'],            desc: 'Glucokinase. Rate-limiting enzyme for glucose metabolism in beta cells.' },
        { id: 'SLC2A4', modules: ['diabetes'],            desc: 'GLUT4. Insulin-responsive glucose transporter in muscle and adipose.' },
        { id: 'PPARG',  modules: ['diabetes'],            desc: 'PPARγ. Nuclear receptor regulating adipogenesis and insulin sensitivity.' },
        { id: 'HNF4A',  modules: ['diabetes'],            desc: 'Hepatocyte nuclear factor 4α. Transcription factor mutated in MODY1.' },
        // Overlap proteins
        { id: 'TNF',    modules: ['asthma', 'diabetes'],  desc: 'Tumor necrosis factor. Pro-inflammatory cytokine. Drives airway inflammation and insulin resistance.' },
        { id: 'IL6',    modules: ['asthma', 'diabetes'],  desc: 'Interleukin-6. Pleiotropic cytokine linking inflammation to metabolic dysfunction.' },
        { id: 'STAT3',  modules: ['asthma', 'diabetes'],  desc: 'Signal transducer. Mediates IL-6 signaling in both inflammation and glucose homeostasis.' },
        { id: 'JAK2',   modules: ['asthma', 'diabetes'],  desc: 'Janus kinase 2. Downstream of cytokine receptors. Target of anti-inflammatory drugs.' },
        // Interactome (neither module)
        { id: 'TP53',   modules: [],                       desc: 'Tumor suppressor p53. Hub protein not in either disease module.' },
        { id: 'AKT1',   modules: [],                       desc: 'Serine/threonine kinase. Central node in PI3K-AKT signaling.' },
        { id: 'PIK3CA', modules: [],                       desc: 'PI3K catalytic subunit alpha. Connects growth factor and metabolic signaling.' },
        { id: 'MAPK1',  modules: [],                       desc: 'ERK2. Major MAPK pathway effector.' },
        { id: 'SRC',    modules: [],                       desc: 'Proto-oncogene tyrosine kinase. Interacts broadly across pathways.' },
        { id: 'GRB2',   modules: [],                       desc: 'Adaptor protein connecting receptor tyrosine kinases to RAS.' },
        { id: 'EGFR',   modules: [],                       desc: 'EGF receptor. Growth factor signaling hub.' },
        { id: 'NFKB1',  modules: [],                       desc: 'NF-κB subunit. Master regulator of inflammatory gene expression.' },
        { id: 'RELA',   modules: [],                       desc: 'NF-κB p65 subunit. Partners with NFKB1 for transcriptional activation.' },
        { id: 'MYC',    modules: [],                       desc: 'Proto-oncogene. Transcription factor driving cell growth.' },
        { id: 'JUN',    modules: [],                       desc: 'Component of AP-1 transcription factor.' },
        { id: 'CREBBP', modules: [],                       desc: 'CBP. Transcriptional co-activator and histone acetyltransferase.' }
    ];

    // Edges (protein-protein interactions)
    const edgeList = [
        // Asthma internal
        ['IL4','IL13'],['IL4','GATA3'],['IL5','IL4'],['IL13','CCL11'],
        ['TSLP','IL33'],['TSLP','IL4'],['IL33','IL5'],['GATA3','IL5'],
        // Diabetes internal
        ['INS','INSR'],['INSR','IRS1'],['IRS1','SLC2A4'],['GCK','INS'],
        ['PPARG','SLC2A4'],['PPARG','HNF4A'],['HNF4A','GCK'],
        // Overlap connections
        ['TNF','IL6'],['TNF','NFKB1'],['IL6','STAT3'],['STAT3','JAK2'],
        ['JAK2','IL4'],['JAK2','INSR'],['TNF','IL4'],['TNF','INSR'],
        ['IL6','IL5'],['STAT3','GATA3'],['IL6','PPARG'],['STAT3','IRS1'],
        // Interactome backbone
        ['AKT1','PIK3CA'],['AKT1','INSR'],['AKT1','IRS1'],
        ['PIK3CA','EGFR'],['PIK3CA','GRB2'],
        ['MAPK1','SRC'],['MAPK1','GRB2'],['MAPK1','EGFR'],
        ['SRC','EGFR'],['SRC','JAK2'],
        ['GRB2','EGFR'],['GRB2','SRC'],
        ['NFKB1','RELA'],['NFKB1','TNF'],['RELA','STAT3'],
        ['TP53','AKT1'],['TP53','MYC'],['TP53','JUN'],['TP53','CREBBP'],
        ['MYC','JUN'],['JUN','CREBBP'],['CREBBP','STAT3']
    ];

    function getNodeColor(p, showAsthma, showDiabetes) {
        let isA = p.modules.includes('asthma') && showAsthma;
        let isD = p.modules.includes('diabetes') && showDiabetes;
        if (isA && isD) return moduleColors.overlap;
        if (isA) return moduleColors.asthma;
        if (isD) return moduleColors.diabetes;
        return moduleColors.none;
    }

    let showAsthma = true;
    let showDiabetes = true;

    function buildNodes() {
        return proteins.map(p => {
            let c = getNodeColor(p, showAsthma, showDiabetes);
            return {
                id: p.id, label: p.id,
                shape: 'dot', size: p.modules.length > 0 ? 14 : 10,
                color: { background: c.bg, border: c.border },
                font: { color: '#333', size: 10, face: 'Arial' },
                borderWidth: p.modules.length === 2 ? 3 : 1.5,
                shadow: p.modules.length > 0,
                description: p.desc, modules: p.modules
            };
        });
    }

    const nodes = new vis.DataSet(buildNodes());
    const edges = new vis.DataSet(edgeList.map((e, i) => ({
        id: i, from: e[0], to: e[1],
        color: { color: '#bbb', highlight: '#333' },
        width: 1.2, smooth: { type: 'continuous' }
    })));

    // Compute network proximity (shortest path between module pairs)
    function computeProximity() {
        let asthmaNodes = proteins.filter(p => p.modules.includes('asthma')).map(p => p.id);
        let diabetesNodes = proteins.filter(p => p.modules.includes('diabetes')).map(p => p.id);

        // BFS from each asthma node
        let adj = {};
        proteins.forEach(p => adj[p.id] = []);
        edgeList.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });

        let totalDist = 0;
        let pairs = 0;
        for (let a of asthmaNodes) {
            let dist = bfs(a, adj);
            for (let d of diabetesNodes) {
                if (dist[d] !== undefined) {
                    totalDist += dist[d];
                    pairs++;
                }
            }
        }
        return pairs > 0 ? (totalDist / pairs).toFixed(2) : '∞';
    }

    function bfs(start, adj) {
        let dist = {};
        dist[start] = 0;
        let queue = [start];
        while (queue.length > 0) {
            let v = queue.shift();
            for (let nb of (adj[v] || [])) {
                if (dist[nb] === undefined) {
                    dist[nb] = dist[v] + 1;
                    queue.push(nb);
                }
            }
        }
        return dist;
    }

    let proximity = computeProximity();
    let overlapCount = proteins.filter(p => p.modules.includes('asthma') && p.modules.includes('diabetes')).length;

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:450px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:12px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Disease Modules</strong><br>
                <span style="display:inline-block;width:12px;height:12px;background:#2980B9;border-radius:50%;margin:2px 4px -2px 0;"></span>Asthma<br>
                <span style="display:inline-block;width:12px;height:12px;background:#E74C3C;border-radius:50%;margin:2px 4px -2px 0;"></span>Diabetes<br>
                <span style="display:inline-block;width:12px;height:12px;background:#8E44AD;border-radius:50%;margin:2px 4px -2px 0;"></span>Overlap<br>
                <span style="display:inline-block;width:12px;height:12px;background:#BDC3C7;border-radius:50%;margin:2px 4px -2px 0;"></span>Interactome
            </div>
            <div id="controls" style="padding:4px 12px;">
                <label><input type="checkbox" id="chk-asthma" checked> Asthma module</label>&nbsp;&nbsp;
                <label><input type="checkbox" id="chk-diabetes" checked> Diabetes module</label>&nbsp;&nbsp;
                <span id="proximity-label" style="font-size:12px; color:#555;">Avg proximity: ${proximity} | Overlap: ${overlapCount} proteins</span>
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a protein to see its role. Toggle modules to compare disease neighbourhoods.
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
                gravitationalConstant: -40,
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

    // Toggle handlers
    function updateModules() {
        showAsthma = document.getElementById('chk-asthma').checked;
        showDiabetes = document.getElementById('chk-diabetes').checked;
        nodes.update(proteins.map(p => {
            let c = getNodeColor(p, showAsthma, showDiabetes);
            return {
                id: p.id,
                color: { background: c.bg, border: c.border },
                borderWidth: (p.modules.includes('asthma') && showAsthma && p.modules.includes('diabetes') && showDiabetes) ? 3 : 1.5
            };
        }));
    }

    document.getElementById('chk-asthma').addEventListener('change', updateModules);
    document.getElementById('chk-diabetes').addEventListener('change', updateModules);

    // Click
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            const prot = proteins.find(p => p.id === nodeId);
            const conn = network.getConnectedNodes(nodeId);
            const connE = network.getConnectedEdges(nodeId);
            let modStr = prot.modules.length > 0 ? prot.modules.join(', ') : 'none (interactome)';

            infoPanel.innerHTML = `<strong>${nodeId}</strong> <span style="color:#666;">(modules: ${modStr})</span><br>${prot.desc}<br><em style="color:#666;">Degree: ${conn.length}</em>`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.15
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id) ? { color: '#333' } : { color: 'rgba(180,180,180,0.1)' },
                width: connE.includes(e.id) ? 2.5 : 0.3
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a protein to see its role. Toggle modules to compare disease neighbourhoods.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map(e => ({
            id: e.id, color: { color: '#bbb', highlight: '#333' }, width: 1.2
        })));
    }

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
