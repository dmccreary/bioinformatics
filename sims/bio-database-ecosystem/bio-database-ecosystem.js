// Biological Database Ecosystem - vis-network MicroSim
// Shows major bioinformatics databases as nodes colored by category
// with cross-reference edges between them.

// Environment detection
function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    // Category colors
    const colors = {
        sequence:    { background: '#4A90D9', border: '#2C5F9E', font: '#FFFFFF' },
        structure:   { background: '#27AE60', border: '#1E8449', font: '#FFFFFF' },
        pathway:     { background: '#E67E22', border: '#BA6418', font: '#FFFFFF' },
        ontology:    { background: '#8E44AD', border: '#6C3483', font: '#FFFFFF' },
        disease:     { background: '#E74C3C', border: '#C0392B', font: '#FFFFFF' },
        integrative: { background: '#F1C40F', border: '#D4AC0D', font: '#333333' }
    };

    // Database nodes with categories and descriptions
    const dbInfo = [
        { id: 1,  label: 'NCBI',       cat: 'sequence',    desc: 'National Center for Biotechnology Information — portal for sequence databases, literature (PubMed), and genomics tools.' },
        { id: 2,  label: 'GenBank',     cat: 'sequence',    desc: 'NCBI\'s primary nucleotide sequence database with annotated DNA and RNA sequences from all organisms.' },
        { id: 3,  label: 'UniProt',     cat: 'sequence',    desc: 'Comprehensive protein sequence and functional annotation resource combining Swiss-Prot (curated) and TrEMBL (automated).' },
        { id: 4,  label: 'Swiss-Prot',  cat: 'sequence',    desc: 'Manually reviewed, high-quality protein sequence records within UniProt with expert annotations.' },
        { id: 5,  label: 'TrEMBL',      cat: 'sequence',    desc: 'Automatically annotated protein sequences in UniProt awaiting manual curation.' },
        { id: 6,  label: 'Ensembl',     cat: 'sequence',    desc: 'Genome browser and annotation system for vertebrate and model organism genomes with comparative genomics data.' },
        { id: 7,  label: 'PDB',         cat: 'structure',   desc: 'Protein Data Bank — archive of experimentally determined 3D structures of proteins, nucleic acids, and complexes.' },
        { id: 8,  label: 'KEGG',        cat: 'pathway',     desc: 'Kyoto Encyclopedia of Genes and Genomes — integrated resource for pathways, genomes, and biochemical reactions.' },
        { id: 9,  label: 'Reactome',    cat: 'pathway',     desc: 'Curated, peer-reviewed pathway database covering human biological processes and reactions.' },
        { id: 10, label: 'BioGRID',     cat: 'pathway',     desc: 'Repository of genetic and protein interaction data curated from the primary biomedical literature.' },
        { id: 11, label: 'STRING',      cat: 'pathway',     desc: 'Database of known and predicted protein-protein interactions combining experimental and computational evidence.' },
        { id: 12, label: 'IntAct',      cat: 'pathway',     desc: 'Open-source molecular interaction database maintained by EMBL-EBI with evidence-tagged interactions.' },
        { id: 13, label: 'Gene\nOntology', cat: 'ontology', desc: 'Structured vocabulary describing gene product functions across molecular function, biological process, and cellular component.' },
        { id: 14, label: 'Disease\nOntology', cat: 'ontology', desc: 'Standardized ontology of human diseases integrating medical vocabularies and cross-referencing disease databases.' },
        { id: 15, label: 'HPO',         cat: 'ontology',    desc: 'Human Phenotype Ontology — standardized vocabulary of phenotypic abnormalities for clinical genetics and rare disease.' },
        { id: 16, label: 'COSMIC',      cat: 'disease',     desc: 'Catalogue of Somatic Mutations in Cancer — comprehensive resource for somatic mutation data in human cancer.' },
        { id: 17, label: 'OMIM',        cat: 'disease',     desc: 'Online Mendelian Inheritance in Man — catalog of human genes and genetic disorders with literature links.' },
        { id: 18, label: 'Hetionet',    cat: 'integrative', desc: 'Integrative knowledge graph combining 47K+ nodes from 29 public databases for drug repurposing and biomedical discovery.' },
        { id: 19, label: 'BioCyc',      cat: 'integrative', desc: 'Collection of organism-specific pathway/genome databases generated from sequenced genomes with metabolic modeling.' }
    ];

    // Build nodes
    const nodes = new vis.DataSet(dbInfo.map(d => ({
        id: d.id,
        label: d.label,
        color: { background: colors[d.cat].background, border: colors[d.cat].border },
        font: { color: colors[d.cat].font, size: 13, face: 'Arial', multi: true },
        shape: 'box',
        margin: 8,
        borderWidth: 2,
        shadow: true,
        category: d.cat,
        description: d.desc
    })));

    // Cross-reference edges (known database links)
    const edgeData = [
        // NCBI hub
        { from: 1, to: 2 },   // NCBI ↔ GenBank
        { from: 1, to: 6 },   // NCBI ↔ Ensembl
        { from: 1, to: 17 },  // NCBI ↔ OMIM

        // UniProt hub
        { from: 3, to: 4 },   // UniProt ↔ Swiss-Prot
        { from: 3, to: 5 },   // UniProt ↔ TrEMBL
        { from: 3, to: 7 },   // UniProt ↔ PDB
        { from: 3, to: 13 },  // UniProt ↔ GO
        { from: 3, to: 2 },   // UniProt ↔ GenBank
        { from: 3, to: 8 },   // UniProt ↔ KEGG

        // Structure links
        { from: 7, to: 8 },   // PDB ↔ KEGG

        // Pathway/interaction links
        { from: 8, to: 9 },   // KEGG ↔ Reactome
        { from: 10, to: 11 }, // BioGRID ↔ STRING
        { from: 10, to: 12 }, // BioGRID ↔ IntAct
        { from: 11, to: 12 }, // STRING ↔ IntAct
        { from: 11, to: 3 },  // STRING ↔ UniProt
        { from: 9, to: 13 },  // Reactome ↔ GO

        // Ontology links
        { from: 13, to: 3 },  // GO ↔ UniProt (already covered above, skip duplicate)
        { from: 14, to: 17 }, // Disease Ontology ↔ OMIM
        { from: 15, to: 17 }, // HPO ↔ OMIM

        // Disease links
        { from: 16, to: 2 },  // COSMIC ↔ GenBank
        { from: 16, to: 3 },  // COSMIC ↔ UniProt
        { from: 17, to: 2 },  // OMIM ↔ GenBank

        // Integrative links (Hetionet connects to many)
        { from: 18, to: 3 },  // Hetionet ↔ UniProt
        { from: 18, to: 8 },  // Hetionet ↔ KEGG
        { from: 18, to: 13 }, // Hetionet ↔ GO
        { from: 18, to: 14 }, // Hetionet ↔ Disease Ontology
        { from: 18, to: 17 }, // Hetionet ↔ OMIM

        // BioCyc links
        { from: 19, to: 8 },  // BioCyc ↔ KEGG
        { from: 19, to: 3 },  // BioCyc ↔ UniProt
        { from: 19, to: 9 }   // BioCyc ↔ Reactome
    ];

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        color: { color: '#999999', highlight: '#333333' },
        width: 1.5,
        smooth: { type: 'continuous' }
    })));

    // Layout
    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:450px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:12px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Database Categories</strong><br>
                ${Object.entries(colors).map(([cat, c]) =>
                    `<span style="display:inline-block;width:12px;height:12px;background:${c.background};border:1px solid ${c.border};border-radius:2px;margin:2px 4px -1px 0;"></span>${cat.charAt(0).toUpperCase() + cat.slice(1)}<br>`
                ).join('')}
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a database node to see its description and highlight its connections.
            </div>
        </div>
    `;

    const container = document.getElementById('network');
    const infoPanel = document.getElementById('info-panel');
    const enableMouse = !isInIframe();

    const data = { nodes: nodes, edges: edges };
    const options = {
        layout: { improvedLayout: true },
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -40,
                centralGravity: 0.008,
                springLength: 120,
                springConstant: 0.06,
                damping: 0.5
            },
            stabilization: { iterations: 200 }
        },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            dragView: enableMouse,
            zoomView: enableMouse,
            dragNodes: false,
            navigationButtons: true
        },
        nodes: {
            shapeProperties: { borderRadius: 4 }
        },
        edges: {
            selectionWidth: 2
        }
    };

    const network = new vis.Network(container, data, options);

    // Click handler: highlight selected node and its neighbors
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nodeData = nodes.get(nodeId);
            const connectedNodes = network.getConnectedNodes(nodeId);
            const connectedEdges = network.getConnectedEdges(nodeId);
            const catLabel = nodeData.category.charAt(0).toUpperCase() + nodeData.category.slice(1);

            infoPanel.innerHTML = `<strong>${nodeData.label.replace('\n', ' ')}</strong> <span style="color:${colors[nodeData.category].background};">(${catLabel})</span><br>${nodeData.description}<br><em style="color:#666;">Connected to ${connectedNodes.length} other database${connectedNodes.length !== 1 ? 's' : ''}.</em>`;

            // Dim all, highlight selected + neighbors
            const allNodes = nodes.get();
            const updates = allNodes.map(n => {
                const isSelected = n.id === nodeId;
                const isNeighbor = connectedNodes.includes(n.id);
                return {
                    id: n.id,
                    opacity: (isSelected || isNeighbor) ? 1.0 : 0.2
                };
            });
            nodes.update(updates);

            const allEdges = edges.get();
            const edgeUpdates = allEdges.map(e => ({
                id: e.id,
                color: connectedEdges.includes(e.id)
                    ? { color: '#333333' }
                    : { color: 'rgba(180,180,180,0.2)' },
                width: connectedEdges.includes(e.id) ? 2.5 : 0.5
            }));
            edges.update(edgeUpdates);
        } else {
            // Click on empty space — reset
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a database node to see its description and highlight its connections.';
        const allNodes = nodes.get();
        nodes.update(allNodes.map(n => ({ id: n.id, opacity: 1.0 })));
        const allEdges = edges.get();
        edges.update(allEdges.map(e => ({
            id: e.id,
            color: { color: '#999999', highlight: '#333333' },
            width: 1.5
        })));
    }

    // Hover cursor
    network.on('hoverNode', function () { container.style.cursor = 'pointer'; });
    network.on('blurNode', function () { container.style.cursor = 'default'; });
});
