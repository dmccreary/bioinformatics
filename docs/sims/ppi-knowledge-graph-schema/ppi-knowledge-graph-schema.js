// PPI Knowledge Graph Schema - vis-network
// Node types: Protein, Gene, Disease, Drug, Pathway, Organism
// Edge types show relationship labels
// MicroSim template version 2026.02

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    // Node type definitions with shapes and colors
    const nodeTypes = {
        Protein:  { shape: 'dot',      color: '#4A90D9', border: '#2C5F9E', size: 35 },
        Gene:     { shape: 'diamond',  color: '#27AE60', border: '#1E8449', size: 25 },
        Disease:  { shape: 'triangle', color: '#E74C3C', border: '#C0392B', size: 25 },
        Drug:     { shape: 'box',      color: '#F1C40F', border: '#D4AC0D', size: 20 },
        Pathway:  { shape: 'hexagon',  color: '#8E44AD', border: '#6C3483', size: 25 },
        Organism: { shape: 'ellipse',  color: '#95A5A6', border: '#7F8C8D', size: 25 }
    };

    // Schema nodes (representative instances)
    const nodeData = [
        { id: 1, label: 'TP53\n(Protein)',   type: 'Protein',
          desc: 'Protein nodes represent individual proteins identified by UniProt accession. Properties include sequence length, molecular weight, subcellular location, and functional annotations from Gene Ontology.' },
        { id: 2, label: 'BRCA1\n(Protein)',   type: 'Protein',
          desc: 'Proteins interact with each other physically (co-immunoprecipitation, yeast two-hybrid) or functionally (co-expression, genetic interaction). Interaction confidence is scored 0-1.' },
        { id: 3, label: 'TP53\n(Gene)',       type: 'Gene',
          desc: 'Gene nodes store genomic coordinates, chromosome, strand, and Ensembl gene ID. Each gene encodes one or more protein isoforms through alternative splicing.' },
        { id: 4, label: 'BRCA1\n(Gene)',      type: 'Gene',
          desc: 'Gene nodes link to their encoded proteins via ENCODED_BY relationships and to diseases via ASSOCIATED_WITH relationships from GWAS and OMIM.' },
        { id: 5, label: 'Breast\nCancer',     type: 'Disease',
          desc: 'Disease nodes use Disease Ontology IDs (DOID). Properties include ICD-10 codes, prevalence, and associated phenotypes from HPO.' },
        { id: 6, label: 'Lung\nCancer',       type: 'Disease',
          desc: 'Disease-gene associations come from ClinVar, OMIM, and GWAS Catalog with evidence levels (pathogenic, likely pathogenic, risk factor).' },
        { id: 7, label: 'Tamoxifen\n(Drug)',  type: 'Drug',
          desc: 'Drug nodes carry DrugBank IDs, chemical structure (SMILES), mechanism of action, and FDA approval status. Drug-protein edges indicate binding targets.' },
        { id: 8, label: 'Olaparib\n(Drug)',   type: 'Drug',
          desc: 'Drugs connect to proteins they target (TARGETS) and diseases they treat (TREATS). This enables drug repurposing discovery through graph traversal.' },
        { id: 9, label: 'p53\nSignaling',     type: 'Pathway',
          desc: 'Pathway nodes reference KEGG or Reactome pathway IDs. A protein PARTICIPATES_IN a pathway. Pathway analysis finds enriched pathways in gene sets.' },
        { id: 10, label: 'DNA\nRepair',       type: 'Pathway',
          desc: 'Pathway membership connects proteins to their biological context. Shared pathway membership is evidence of functional relatedness.' },
        { id: 11, label: 'H. sapiens\n(Organism)', type: 'Organism',
          desc: 'Organism nodes use NCBI Taxonomy IDs. Proteins and genes BELONG_TO an organism. Cross-species edges enable ortholog-based inference.' },
        { id: 12, label: 'M. musculus\n(Organism)', type: 'Organism',
          desc: 'Model organism data enables transfer of functional annotations. Mouse phenotype data from MGI helps predict human disease associations.' }
    ];

    // Fixed positions for a schema layout
    const positions = {
        1:  { x: -80,  y: -100 },  // TP53 protein
        2:  { x: 80,   y: -100 },  // BRCA1 protein
        3:  { x: -200, y: 0 },     // TP53 gene
        4:  { x: 200,  y: 0 },     // BRCA1 gene
        5:  { x: -200, y: 150 },   // Breast cancer
        6:  { x: 200,  y: 150 },   // Lung cancer
        7:  { x: -300, y: -100 },  // Tamoxifen
        8:  { x: 300,  y: -100 },  // Olaparib
        9:  { x: -80,  y: -250 },  // p53 signaling
        10: { x: 80,   y: -250 },  // DNA repair
        11: { x: 0,    y: 260 },   // Human
        12: { x: 0,    y: 340 }    // Mouse
    };

    const nodes = new vis.DataSet(nodeData.map(d => {
        let t = nodeTypes[d.type];
        return {
            id: d.id,
            label: d.label,
            shape: t.shape,
            color: { background: t.color, border: t.border },
            font: { color: d.type === 'Drug' ? '#333' : '#fff', size: 12, face: 'Arial', multi: true },
            size: t.size,
            borderWidth: 2,
            shadow: true,
            x: positions[d.id].x,
            y: positions[d.id].y,
            fixed: true,
            description: d.desc,
            nodeType: d.type
        };
    }));

    // Edge definitions with relationship types
    const edgeData = [
        { from: 1, to: 2, label: 'INTERACTS_WITH', color: '#4A90D9', desc: 'Physical or functional protein-protein interaction' },
        { from: 1, to: 3, label: 'ENCODED_BY',     color: '#27AE60', desc: 'Protein is encoded by this gene' },
        { from: 2, to: 4, label: 'ENCODED_BY',     color: '#27AE60', desc: 'Protein is encoded by this gene' },
        { from: 3, to: 5, label: 'ASSOCIATED_WITH', color: '#E74C3C', desc: 'Gene-disease association from GWAS or OMIM' },
        { from: 4, to: 5, label: 'ASSOCIATED_WITH', color: '#E74C3C', desc: 'Gene-disease association from GWAS or OMIM' },
        { from: 3, to: 6, label: 'ASSOCIATED_WITH', color: '#E74C3C', desc: 'Gene-disease association from GWAS or OMIM' },
        { from: 7, to: 5, label: 'TREATS',          color: '#F1C40F', desc: 'Drug indicated for this disease' },
        { from: 8, to: 5, label: 'TREATS',          color: '#F1C40F', desc: 'Drug indicated for this disease' },
        { from: 7, to: 1, label: 'TARGETS',         color: '#E67E22', desc: 'Drug binds to and modulates this protein' },
        { from: 8, to: 2, label: 'TARGETS',         color: '#E67E22', desc: 'Drug binds to and modulates this protein' },
        { from: 1, to: 9, label: 'PARTICIPATES_IN', color: '#8E44AD', desc: 'Protein is a member of this pathway' },
        { from: 2, to: 10, label: 'PARTICIPATES_IN', color: '#8E44AD', desc: 'Protein is a member of this pathway' },
        { from: 1, to: 10, label: 'PARTICIPATES_IN', color: '#8E44AD', desc: 'Protein is a member of this pathway' },
        { from: 3, to: 11, label: 'BELONGS_TO',     color: '#95A5A6', desc: 'Gene belongs to this organism\'s genome' },
        // Slight y-offset for near-horizontal edge
        { from: 4, to: 11, label: 'BELONGS_TO',     color: '#95A5A6', desc: 'Gene belongs to this organism\'s genome' }
    ];

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        label: e.label,
        arrows: 'to',
        font: { size: 9, color: '#555', strokeWidth: 2, strokeColor: '#fff', align: 'middle' },
        color: { color: e.color, highlight: '#333' },
        width: 2,
        smooth: { type: 'curvedCW', roundness: 0.15 },
        description: e.desc
    })));

    // Build layout
    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:480px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Node Types</strong><br>
                ${Object.entries(nodeTypes).map(([name, t]) =>
                    `<span style="display:inline-block;width:12px;height:12px;background:${t.color};border:1px solid ${t.border};border-radius:${t.shape === 'dot' ? '50%' : '2px'};margin:2px 4px -1px 0;"></span>${name}<br>`
                ).join('')}
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a node to see its description. This schema shows entity types and relationships in a biomedical knowledge graph.
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
            const typeInfo = nodeTypes[nd.nodeType];
            infoPanel.innerHTML = `<strong>${nd.label.replace(/\n/g, ' ')}</strong> <span style="color:${typeInfo.color};">[${nd.nodeType}]</span><br>${nd.description}`;

            const connNodes = network.getConnectedNodes(nodeId);
            const connEdges = network.getConnectedEdges(nodeId);

            nodes.update(nodes.get().map(n => ({
                id: n.id,
                opacity: (n.id === nodeId || connNodes.includes(n.id)) ? 1.0 : 0.15
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connEdges.includes(e.id) ? { color: '#333' } : { color: 'rgba(180,180,180,0.15)' },
                width: connEdges.includes(e.id) ? 3 : 0.5,
                font: { ...e.font, color: connEdges.includes(e.id) ? '#333' : 'rgba(100,100,100,0.15)' }
            })));
        } else if (params.edges.length > 0) {
            const edgeId = params.edges[0];
            const ed = edges.get(edgeId);
            const origData = edgeData[edgeId];
            infoPanel.innerHTML = `<strong>${origData.label}</strong><br>${origData.desc}`;
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a node to see its description. This schema shows entity types and relationships in a biomedical knowledge graph.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edgeData.map((e, i) => ({
            id: i,
            color: { color: e.color, highlight: '#333' },
            width: 2,
            font: { size: 9, color: '#555', strokeWidth: 2, strokeColor: '#fff', align: 'middle' }
        })));
    }

    network.on('hoverNode', function () { container.style.cursor = 'pointer'; });
    network.on('blurNode', function () { container.style.cursor = 'default'; });
});
