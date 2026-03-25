// FASTQ Quality Control Pipeline - vis-network flowchart
// Directed graph showing QC pipeline steps with decision nodes
// MicroSim template version 2026.02

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    // Node categories and colors
    const catColors = {
        input:     { background: '#4A90D9', border: '#2C5F9E', font: '#FFFFFF' },
        qc:        { background: '#27AE60', border: '#1E8449', font: '#FFFFFF' },
        trimming:  { background: '#E67E22', border: '#BA6418', font: '#FFFFFF' },
        decision:  { background: '#F5F5F5', border: '#888888', font: '#333333' },
        output:    { background: '#4A90D9', border: '#2C5F9E', font: '#FFFFFF' },
        reporting: { background: '#8E44AD', border: '#6C3483', font: '#FFFFFF' }
    };

    // Node definitions
    const nodeData = [
        { id: 1, label: 'Raw FASTQ\nFiles', cat: 'input', shape: 'box',
          desc: 'Raw sequencing reads in FASTQ format. Each read has a sequence and per-base quality scores (Phred+33). These files come directly from the sequencer and may contain adapter contamination, low-quality bases, and PCR duplicates.' },
        { id: 2, label: 'FastQC\nAssessment', cat: 'qc', shape: 'box',
          desc: 'FastQC generates quality reports including per-base quality scores, GC content distribution, sequence duplication levels, adapter content, and overrepresented sequences. This initial assessment identifies which QC steps are needed.' },
        { id: 3, label: 'Quality\nOK?', cat: 'decision', shape: 'diamond',
          desc: 'Decision point: If FastQC shows good quality across all metrics (high per-base quality, no adapter contamination, normal GC distribution), reads may proceed directly. Otherwise, trimming steps are needed.' },
        { id: 4, label: 'Adapter\nTrimming', cat: 'trimming', shape: 'box',
          desc: 'Tools like Trimmomatic or Cutadapt remove adapter sequences ligated during library preparation. Adapters at read ends cause false mismatches during alignment. Common adapters: Illumina TruSeq, Nextera.' },
        { id: 5, label: 'Quality\nTrimming', cat: 'trimming', shape: 'box',
          desc: 'Low-quality bases (typically Phred < 20) are trimmed from read ends using a sliding window approach. Trimmomatic SLIDINGWINDOW:4:20 checks 4-base windows and cuts when average quality drops below 20.' },
        { id: 6, label: 'Length\nFiltering', cat: 'trimming', shape: 'box',
          desc: 'After trimming, very short reads (typically < 36 bp) are discarded because they cannot be mapped uniquely to the reference genome. MINLEN parameter controls the minimum acceptable read length.' },
        { id: 7, label: 'Reads\nPass?', cat: 'decision', shape: 'diamond',
          desc: 'Decision point: Reads that are too short after trimming or have overall low quality are discarded. Surviving reads proceed to the clean output. Typically 85-95% of reads survive QC in a good library.' },
        { id: 8, label: 'Clean FASTQ\nFiles', cat: 'output', shape: 'box',
          desc: 'Quality-controlled reads ready for downstream analysis: alignment to a reference genome (BWA, HISAT2), de novo assembly (SPAdes), or other analyses. These reads have adapters removed, low-quality bases trimmed, and meet minimum length requirements.' },
        { id: 9, label: 'MultiQC\nReport', cat: 'reporting', shape: 'box',
          desc: 'MultiQC aggregates quality metrics from FastQC and trimming logs across all samples into a single interactive HTML report. This enables quick comparison of QC metrics across an entire sequencing run.' },
        { id: 10, label: 'Discarded\nReads', cat: 'decision', shape: 'box',
          desc: 'Reads that fail quality filters are removed from the dataset. A high discard rate (>20%) may indicate problems with library preparation or sequencing and warrants investigation.' }
    ];

    // Fixed positions for a top-to-bottom flowchart layout
    const positions = {
        1:  { x: 0,   y: -250 },
        2:  { x: 0,   y: -150 },
        3:  { x: 0,   y: -50  },
        4:  { x: 0,   y: 50   },
        5:  { x: 0,   y: 150  },
        6:  { x: 0,   y: 250  },
        7:  { x: 0,   y: 350  },
        8:  { x: -120, y: 460  },
        9:  { x: -120, y: 560  },
        10: { x: 150,  y: 350  }
    };

    const nodes = new vis.DataSet(nodeData.map(d => ({
        id: d.id,
        label: d.label,
        x: positions[d.id].x,
        y: positions[d.id].y,
        shape: d.shape,
        color: { background: catColors[d.cat].background, border: catColors[d.cat].border },
        font: { color: catColors[d.cat].font, size: 13, face: 'Arial', multi: true },
        margin: 10,
        borderWidth: 2,
        shadow: true,
        fixed: true,
        description: d.desc,
        category: d.cat,
        size: d.shape === 'diamond' ? 25 : undefined
    })));

    // Edge definitions
    const edgeData = [
        { from: 1, to: 2,  label: '' },
        { from: 2, to: 3,  label: '' },
        { from: 3, to: 4,  label: 'Fail', color: '#E74C3C' },
        { from: 3, to: 8,  label: 'Pass', color: '#27AE60' },
        { from: 4, to: 5,  label: '' },
        { from: 5, to: 6,  label: '' },
        { from: 6, to: 7,  label: '' },
        { from: 7, to: 8,  label: 'Pass', color: '#27AE60' },
        { from: 7, to: 10, label: 'Fail', color: '#E74C3C' },
        { from: 8, to: 9,  label: '' },
        { from: 2, to: 9,  label: 'logs', color: '#8E44AD' }
    ];

    const edges = new vis.DataSet(edgeData.map((e, i) => ({
        id: i,
        from: e.from,
        to: e.to,
        arrows: 'to',
        label: e.label,
        font: { size: 11, color: e.color || '#666', strokeWidth: 2, strokeColor: '#fff' },
        color: { color: e.color || '#888', highlight: '#333' },
        width: 2,
        smooth: { type: 'cubicBezier', roundness: 0.3 }
    })));

    // Build layout
    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:500px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:12px; box-shadow:0 1px 4px rgba(0,0,0,0.15);">
                <strong>Pipeline Steps</strong><br>
                <span style="display:inline-block;width:12px;height:12px;background:${catColors.input.background};border-radius:2px;margin:2px 4px -1px 0;"></span>Input / Output<br>
                <span style="display:inline-block;width:12px;height:12px;background:${catColors.qc.background};border-radius:2px;margin:2px 4px -1px 0;"></span>QC Assessment<br>
                <span style="display:inline-block;width:12px;height:12px;background:${catColors.trimming.background};border-radius:2px;margin:2px 4px -1px 0;"></span>Trimming / Filtering<br>
                <span style="display:inline-block;width:12px;height:12px;background:${catColors.reporting.background};border-radius:2px;margin:2px 4px -1px 0;"></span>Reporting<br>
                <span style="display:inline-block;width:12px;height:12px;background:${catColors.decision.background};border:1px solid #888;border-radius:2px;margin:2px 4px -1px 0;"></span>Decision
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click any pipeline step to learn what it does and why it matters.
            </div>
        </div>
    `;

    const container = document.getElementById('network');
    const infoPanel = document.getElementById('info-panel');
    const inIframe = isInIframe();

    const options = {
        layout: { randomSeed: 2 },
        physics: { enabled: false },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            dragView: !inIframe,
            zoomView: !inIframe,
            dragNodes: false,
            navigationButtons: true
        },
        edges: {
            selectionWidth: 2
        }
    };

    const network = new vis.Network(container, { nodes, edges }, options);

    // Click handler
    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            const catLabel = nd.category.charAt(0).toUpperCase() + nd.category.slice(1);
            infoPanel.innerHTML = `<strong>${nd.label.replace(/\n/g, ' ')}</strong> <span style="color:${catColors[nd.category].background};">(${catLabel})</span><br>${nd.description}`;

            // Highlight path
            const connEdges = network.getConnectedEdges(nodeId);
            const connNodes = network.getConnectedNodes(nodeId);

            nodes.update(nodes.get().map(n => ({
                id: n.id,
                opacity: (n.id === nodeId || connNodes.includes(n.id)) ? 1.0 : 0.2
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connEdges.includes(e.id) ? { color: '#333' } : { color: 'rgba(180,180,180,0.2)' },
                width: connEdges.includes(e.id) ? 3 : 0.5
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click any pipeline step to learn what it does and why it matters.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edgeData.map((e, i) => ({
            id: i,
            color: { color: e.color || '#888', highlight: '#333' },
            width: 2
        })));
    }

    network.on('hoverNode', function () { container.style.cursor = 'pointer'; });
    network.on('blurNode', function () { container.style.cursor = 'default'; });
});
