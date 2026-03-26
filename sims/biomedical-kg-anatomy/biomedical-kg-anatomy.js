// Biomedical KG Anatomy — vis-network MicroSim
// Heterogeneous graph: genes (blue), diseases (red), drugs (green),
// phenotypes (orange), GO terms (purple). Labeled edges. Click for details.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const typeStyles = {
        gene:      { bg: '#2980B9', border: '#1F618D', shape: 'dot',     font: '#FFF' },
        disease:   { bg: '#E74C3C', border: '#C0392B', shape: 'box',     font: '#FFF' },
        drug:      { bg: '#27AE60', border: '#1E8449', shape: 'dot',     font: '#FFF' },
        phenotype: { bg: '#E67E22', border: '#D35400', shape: 'triangle',font: '#FFF' },
        go_term:   { bg: '#8E44AD', border: '#6C3483', shape: 'diamond', font: '#FFF' }
    };

    const nodeData = [
        // Genes
        { id: 'BRCA1',  type: 'gene',    desc: 'BRCA1. Tumor suppressor involved in DNA double-strand break repair via homologous recombination.' },
        { id: 'TP53',   type: 'gene',    desc: 'TP53 (p53). "Guardian of the genome." Transcription factor activating cell cycle arrest and apoptosis.' },
        { id: 'EGFR',   type: 'gene',    desc: 'Epidermal growth factor receptor. Receptor tyrosine kinase driving cell proliferation.' },
        { id: 'BRAF',   type: 'gene',    desc: 'BRAF kinase. Component of RAS-MAPK signaling cascade. V600E mutation common in melanoma.' },
        { id: 'CFTR',   type: 'gene',    desc: 'Cystic fibrosis transmembrane conductance regulator. Chloride channel mutated in CF.' },
        { id: 'INS',    type: 'gene',    desc: 'Insulin gene. Encodes preproinsulin processed into mature insulin hormone.' },
        // Diseases
        { id: 'breast_ca',  label: 'Breast\nCancer',   type: 'disease', desc: 'Most common cancer in women. BRCA1/2 mutations confer high hereditary risk.' },
        { id: 'lung_ca',    label: 'Lung\nCancer',     type: 'disease', desc: 'Leading cause of cancer death. EGFR mutations targetable with TKIs.' },
        { id: 'melanoma',   label: 'Melanoma',         type: 'disease', desc: 'Aggressive skin cancer. BRAF V600E mutation in ~50% of cases.' },
        { id: 'cf',         label: 'Cystic\nFibrosis', type: 'disease', desc: 'Autosomal recessive disorder. Thick mucus in lungs and pancreas.' },
        { id: 't2d',        label: 'Type 2\nDiabetes', type: 'disease', desc: 'Metabolic disorder with insulin resistance and beta-cell failure.' },
        // Drugs
        { id: 'olaparib',   label: 'Olaparib',    type: 'drug',    desc: 'PARP inhibitor. Synthetic lethality in BRCA-deficient cancers.' },
        { id: 'erlotinib',  label: 'Erlotinib',   type: 'drug',    desc: 'EGFR tyrosine kinase inhibitor for EGFR-mutant lung cancer.' },
        { id: 'vemurafenib',label: 'Vemurafenib', type: 'drug',    desc: 'BRAF V600E inhibitor. First-line for BRAF-mutant melanoma.' },
        { id: 'ivacaftor',  label: 'Ivacaftor',   type: 'drug',    desc: 'CFTR potentiator. Improves chloride channel function in CF patients with G551D mutation.' },
        { id: 'metformin',  label: 'Metformin',   type: 'drug',    desc: 'First-line antidiabetic. AMPK activator reducing hepatic glucose output.' },
        // Phenotypes
        { id: 'tumor_growth',  label: 'Tumor\nGrowth',      type: 'phenotype', desc: 'Uncontrolled cell proliferation leading to tumor formation.' },
        { id: 'dna_repair',    label: 'DNA Repair\nDefect',  type: 'phenotype', desc: 'Impaired ability to fix DNA damage. Leads to genomic instability.' },
        { id: 'mucus',         label: 'Mucus\nAccumulation', type: 'phenotype', desc: 'Thick, sticky mucus obstructing airways and ducts.' },
        { id: 'hyperglycemia', label: 'Hyper-\nglycemia',    type: 'phenotype', desc: 'Elevated blood glucose from insulin resistance or deficiency.' },
        // GO terms
        { id: 'go_apoptosis',  label: 'GO:Apoptotic\nProcess',      type: 'go_term', desc: 'GO:0006915. Programmed cell death by caspase activation.' },
        { id: 'go_kinase',     label: 'GO:Protein\nKinase Activity', type: 'go_term', desc: 'GO:0004672. Catalytic transfer of phosphate from ATP to protein substrate.' },
        { id: 'go_transport',  label: 'GO:Ion\nTransport',           type: 'go_term', desc: 'GO:0006811. Directed movement of ions across membranes.' },
        { id: 'go_glucose',    label: 'GO:Glucose\nHomeostasis',     type: 'go_term', desc: 'GO:0042593. Processes maintaining blood glucose within normal range.' }
    ];

    const edgeData = [
        // Gene → Disease (associated_with)
        { from: 'BRCA1', to: 'breast_ca',  rel: 'associated_with' },
        { from: 'TP53',  to: 'breast_ca',  rel: 'associated_with' },
        { from: 'TP53',  to: 'lung_ca',    rel: 'associated_with' },
        { from: 'EGFR',  to: 'lung_ca',    rel: 'associated_with' },
        { from: 'BRAF',  to: 'melanoma',   rel: 'associated_with' },
        { from: 'CFTR',  to: 'cf',         rel: 'associated_with' },
        { from: 'INS',   to: 't2d',        rel: 'associated_with' },
        // Drug → Gene (targets)
        { from: 'olaparib',    to: 'BRCA1', rel: 'targets' },
        { from: 'erlotinib',   to: 'EGFR',  rel: 'targets' },
        { from: 'vemurafenib', to: 'BRAF',  rel: 'targets' },
        { from: 'ivacaftor',   to: 'CFTR',  rel: 'targets' },
        // Drug → Disease (treats)
        { from: 'olaparib',    to: 'breast_ca', rel: 'treats' },
        { from: 'erlotinib',   to: 'lung_ca',   rel: 'treats' },
        { from: 'vemurafenib', to: 'melanoma',  rel: 'treats' },
        { from: 'ivacaftor',   to: 'cf',        rel: 'treats' },
        { from: 'metformin',   to: 't2d',       rel: 'treats' },
        // Disease → Phenotype (has_phenotype)
        { from: 'breast_ca', to: 'tumor_growth', rel: 'has_phenotype' },
        { from: 'breast_ca', to: 'dna_repair',   rel: 'has_phenotype' },
        { from: 'lung_ca',   to: 'tumor_growth', rel: 'has_phenotype' },
        { from: 'melanoma',  to: 'tumor_growth', rel: 'has_phenotype' },
        { from: 'cf',        to: 'mucus',        rel: 'has_phenotype' },
        { from: 't2d',       to: 'hyperglycemia',rel: 'has_phenotype' },
        // Gene → GO (annotated_with)
        { from: 'TP53',  to: 'go_apoptosis', rel: 'annotated_with' },
        { from: 'BRCA1', to: 'go_apoptosis', rel: 'annotated_with' },
        { from: 'EGFR',  to: 'go_kinase',    rel: 'annotated_with' },
        { from: 'BRAF',  to: 'go_kinase',    rel: 'annotated_with' },
        { from: 'CFTR',  to: 'go_transport', rel: 'annotated_with' },
        { from: 'INS',   to: 'go_glucose',   rel: 'annotated_with' }
    ];

    const relColors = {
        associated_with: '#E74C3C',
        targets:         '#27AE60',
        treats:          '#2980B9',
        has_phenotype:   '#E67E22',
        annotated_with:  '#8E44AD'
    };

    const nodes = new vis.DataSet(nodeData.map(n => {
        let s = typeStyles[n.type];
        return {
            id: n.id, label: n.label || n.id,
            shape: s.shape, size: 15,
            color: { background: s.bg, border: s.border },
            font: { color: n.type === 'phenotype' || n.type === 'go_term' ? '#333' : s.font, size: 10, face: 'Arial', multi: true },
            borderWidth: 2, shadow: true, margin: 5,
            nodeType: n.type, description: n.desc
        };
    }));

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        label: e.rel.replace(/_/g, ' '),
        arrows: 'to',
        color: { color: relColors[e.rel], highlight: '#333' },
        width: 1.5,
        font: { size: 8, color: relColors[e.rel], strokeWidth: 2, strokeColor: '#FFF' },
        smooth: { type: 'continuous' },
        relType: e.rel
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:480px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Entity Types</strong><br>
                <span style="display:inline-block;width:10px;height:10px;background:#2980B9;border-radius:50%;margin:2px 4px -1px 0;"></span>Gene<br>
                <span style="display:inline-block;width:10px;height:10px;background:#E74C3C;border-radius:2px;margin:2px 4px -1px 0;"></span>Disease<br>
                <span style="display:inline-block;width:10px;height:10px;background:#27AE60;border-radius:50%;margin:2px 4px -1px 0;"></span>Drug<br>
                <span style="display:inline-block;width:10px;height:10px;background:#E67E22;margin:2px 4px -1px 0;"></span>Phenotype<br>
                <span style="display:inline-block;width:10px;height:10px;background:#8E44AD;margin:2px 4px -1px 0;"></span>GO Term<br>
                <strong style="display:block;margin-top:3px;">Edges</strong>
                <span style="color:#E74C3C;">—</span> associated_with<br>
                <span style="color:#27AE60;">—</span> targets<br>
                <span style="color:#2980B9;">—</span> treats<br>
                <span style="color:#E67E22;">—</span> has_phenotype<br>
                <span style="color:#8E44AD;">—</span> annotated_with
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click any entity to see its description and connections in the knowledge graph.
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
                centralGravity: 0.008,
                springLength: 120,
                springConstant: 0.05,
                damping: 0.5
            },
            stabilization: { iterations: 300 }
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
            const item = nodeData.find(n => n.id === nodeId);
            const conn = network.getConnectedNodes(nodeId);
            const connE = network.getConnectedEdges(nodeId);
            const typeLabel = nd.nodeType.replace('_', ' ');

            infoPanel.innerHTML = `<strong>${(nd.label || nd.id).replace(/\n/g, ' ')}</strong>
                <span style="color:${typeStyles[nd.nodeType].bg};">(${typeLabel})</span><br>
                ${item.desc}<br>
                <em style="color:#666;">Connections: ${conn.length}</em>`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.12
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id)
                    ? { color: relColors[edgeData[e.id].rel] }
                    : { color: 'rgba(180,180,180,0.08)' },
                width: connE.includes(e.id) ? 3 : 0.3
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click any entity to see its description and connections in the knowledge graph.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map((e, i) => ({
            id: e.id,
            color: { color: relColors[edgeData[e.id].rel], highlight: '#333' },
            width: 1.5
        })));
    }

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
