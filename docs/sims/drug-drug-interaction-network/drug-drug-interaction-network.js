// Drug-Drug Interaction Network — vis-network MicroSim
// Drug nodes colored by therapeutic class. Edges colored by severity:
// red=severe, orange=moderate, yellow=mild. Click drug to see interactions.

function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}

document.addEventListener('DOMContentLoaded', function () {
    const main = document.querySelector('main');

    const classColors = {
        anticoagulant:  { bg: '#E74C3C', border: '#C0392B' },
        antiplatelet:   { bg: '#E67E22', border: '#D35400' },
        antidiabetic:   { bg: '#2980B9', border: '#1F618D' },
        cardiovascular: { bg: '#27AE60', border: '#1E8449' },
        analgesic:      { bg: '#8E44AD', border: '#6C3483' },
        antibiotic:     { bg: '#1ABC9C', border: '#16A085' },
        psychiatric:    { bg: '#F39C12', border: '#D68910' }
    };

    const severityColors = {
        severe:   '#E74C3C',
        moderate: '#E67E22',
        mild:     '#F1C40F'
    };

    const drugs = [
        { id: 'warfarin',     label: 'Warfarin',      cls: 'anticoagulant',  desc: 'Vitamin K antagonist anticoagulant. Narrow therapeutic index — many DDIs.' },
        { id: 'heparin',      label: 'Heparin',       cls: 'anticoagulant',  desc: 'Indirect thrombin inhibitor. Used for acute anticoagulation.' },
        { id: 'aspirin',      label: 'Aspirin',       cls: 'antiplatelet',   desc: 'COX inhibitor. Antiplatelet and anti-inflammatory.' },
        { id: 'clopidogrel',  label: 'Clopidogrel',   cls: 'antiplatelet',   desc: 'P2Y12 receptor antagonist. Prodrug activated by CYP2C19.' },
        { id: 'metformin',    label: 'Metformin',     cls: 'antidiabetic',   desc: 'Biguanide. First-line T2D therapy. AMPK activator.' },
        { id: 'insulin',      label: 'Insulin',       cls: 'antidiabetic',   desc: 'Peptide hormone. Subcutaneous injection for glucose control.' },
        { id: 'lisinopril',   label: 'Lisinopril',    cls: 'cardiovascular', desc: 'ACE inhibitor. Antihypertensive, cardioprotective.' },
        { id: 'atorvastatin', label: 'Atorvastatin',  cls: 'cardiovascular', desc: 'HMG-CoA reductase inhibitor (statin). Lowers LDL cholesterol.' },
        { id: 'amlodipine',   label: 'Amlodipine',    cls: 'cardiovascular', desc: 'Calcium channel blocker. Antihypertensive, antianginal.' },
        { id: 'ibuprofen',    label: 'Ibuprofen',     cls: 'analgesic',      desc: 'NSAID. COX-1/2 inhibitor. Anti-inflammatory, analgesic.' },
        { id: 'acetaminophen',label: 'Acetaminophen', cls: 'analgesic',      desc: 'Analgesic/antipyretic. Metabolised by CYP2E1; hepatotoxic in overdose.' },
        { id: 'ciprofloxacin',label: 'Ciprofloxacin', cls: 'antibiotic',     desc: 'Fluoroquinolone antibiotic. Inhibits CYP1A2; many DDIs.' },
        { id: 'amoxicillin',  label: 'Amoxicillin',   cls: 'antibiotic',     desc: 'Beta-lactam antibiotic. Generally well tolerated, few DDIs.' },
        { id: 'fluoxetine',   label: 'Fluoxetine',    cls: 'psychiatric',    desc: 'SSRI antidepressant. Potent CYP2D6 inhibitor.' },
        { id: 'diazepam',     label: 'Diazepam',      cls: 'psychiatric',    desc: 'Benzodiazepine. CNS depressant. Metabolised by CYP3A4.' }
    ];

    const interactions = [
        // Severe
        { from: 'warfarin', to: 'aspirin',      sev: 'severe',   desc: 'Greatly increased bleeding risk. Anticoagulant + antiplatelet synergy.' },
        { from: 'warfarin', to: 'ibuprofen',    sev: 'severe',   desc: 'NSAIDs increase warfarin effect and GI bleeding risk.' },
        { from: 'warfarin', to: 'ciprofloxacin',sev: 'severe',   desc: 'Ciprofloxacin inhibits CYP1A2 warfarin metabolism, raising INR.' },
        { from: 'warfarin', to: 'fluoxetine',   sev: 'severe',   desc: 'Fluoxetine inhibits CYP2C9, increasing warfarin levels.' },
        { from: 'heparin',  to: 'aspirin',      sev: 'severe',   desc: 'Dual anticoagulant/antiplatelet — high bleed risk.' },
        { from: 'metformin', to: 'insulin',     sev: 'severe',   desc: 'Additive hypoglycaemia risk. Requires careful dose adjustment.' },
        // Moderate
        { from: 'aspirin',     to: 'ibuprofen',     sev: 'moderate', desc: 'Ibuprofen may block aspirin antiplatelet effect (competitive COX-1 binding).' },
        { from: 'aspirin',     to: 'clopidogrel',   sev: 'moderate', desc: 'Dual antiplatelet therapy. Increased bleeding but used clinically (DAPT).' },
        { from: 'clopidogrel', to: 'fluoxetine',    sev: 'moderate', desc: 'Fluoxetine (CYP2C19 inhibitor) reduces clopidogrel activation.' },
        { from: 'atorvastatin',to: 'amlodipine',    sev: 'moderate', desc: 'Amlodipine inhibits CYP3A4, raising statin levels. Myopathy risk.' },
        { from: 'atorvastatin',to: 'ciprofloxacin', sev: 'moderate', desc: 'CYP3A4 inhibition raises statin exposure. Monitor for myopathy.' },
        { from: 'lisinopril',  to: 'ibuprofen',     sev: 'moderate', desc: 'NSAIDs reduce ACE inhibitor efficacy and increase renal risk.' },
        { from: 'diazepam',    to: 'fluoxetine',    sev: 'moderate', desc: 'Fluoxetine inhibits CYP3A4 diazepam metabolism. Increased sedation.' },
        { from: 'warfarin',    to: 'acetaminophen', sev: 'moderate', desc: 'High-dose acetaminophen may potentiate warfarin anticoagulant effect.' },
        // Mild
        { from: 'metformin',    to: 'lisinopril',    sev: 'mild', desc: 'ACE inhibitors may slightly increase insulin sensitivity. Monitor.' },
        { from: 'amoxicillin',  to: 'warfarin',      sev: 'mild', desc: 'Minor increase in INR reported. Monitor warfarin levels.' },
        { from: 'acetaminophen',to: 'ibuprofen',     sev: 'mild', desc: 'Generally safe combination for pain. Different mechanisms.' },
        { from: 'amlodipine',   to: 'lisinopril',    sev: 'mild', desc: 'Commonly co-prescribed. Additive hypotension possible.' }
    ];

    const nodes = new vis.DataSet(drugs.map(d => ({
        id: d.id, label: d.label,
        shape: 'dot', size: 16,
        color: { background: classColors[d.cls].bg, border: classColors[d.cls].border },
        font: { color: '#333', size: 11, face: 'Arial' },
        borderWidth: 2, shadow: true,
        drugClass: d.cls, description: d.desc
    })));

    const edges = new vis.DataSet(interactions.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        color: { color: severityColors[e.sev], highlight: '#333' },
        width: e.sev === 'severe' ? 3 : (e.sev === 'moderate' ? 2 : 1.2),
        smooth: { type: 'continuous' },
        severity: e.sev, interactionDesc: e.desc
    })));

    main.innerHTML = `
        <div style="position:relative; background:aliceblue;">
            <div id="network" style="width:100%; height:460px;"></div>
            <div id="legend" style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.92); padding:8px 12px; border-radius:6px; font-size:11px; box-shadow:0 1px 4px rgba(0,0,0,0.15); max-width:150px;">
                <strong>Drug Classes</strong><br>
                ${Object.entries(classColors).map(([cls, c]) =>
                    `<span style="display:inline-block;width:10px;height:10px;background:${c.bg};border-radius:50%;margin:2px 4px -1px 0;"></span>${cls}<br>`
                ).join('')}
                <strong style="margin-top:4px;display:block;">Severity</strong>
                <span style="color:${severityColors.severe};">━━</span> Severe<br>
                <span style="color:${severityColors.moderate};">━━</span> Moderate<br>
                <span style="color:${severityColors.mild};">━━</span> Mild
            </div>
            <div id="info-panel" style="margin:0 12px; padding:10px 14px; min-height:36px; background:#fff; border:1px solid #ddd; border-radius:6px; font-size:14px; line-height:1.5;">
                Click a drug to see its interactions. Edge color indicates severity.
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
                centralGravity: 0.01,
                springLength: 120,
                springConstant: 0.05,
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

    network.on('click', function (params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nd = nodes.get(nodeId);
            const drug = drugs.find(d => d.id === nodeId);
            const connE = network.getConnectedEdges(nodeId);
            const conn = network.getConnectedNodes(nodeId);

            // Build interaction list
            let intList = connE.map(eid => {
                let e = edges.get(eid);
                let inter = interactions[eid];
                let otherNode = e.from === nodeId ? e.to : e.from;
                return `<span style="color:${severityColors[inter.sev]};">●</span> <strong>${otherNode}</strong> (${inter.sev}): ${inter.desc}`;
            }).join('<br>');

            infoPanel.innerHTML = `<strong>${drug.label}</strong> <span style="color:${classColors[drug.cls].bg};">(${drug.cls})</span><br>${drug.desc}<br><br>${intList}`;

            nodes.update(nodes.get().map(n => ({
                id: n.id, opacity: (n.id === nodeId || conn.includes(n.id)) ? 1.0 : 0.12
            })));
            edges.update(edges.get().map(e => ({
                id: e.id,
                color: connE.includes(e.id)
                    ? { color: severityColors[interactions[e.id].sev] }
                    : { color: 'rgba(180,180,180,0.1)' },
                width: connE.includes(e.id) ? (interactions[e.id].sev === 'severe' ? 4 : 2.5) : 0.3
            })));
        } else {
            resetHighlight();
        }
    });

    function resetHighlight() {
        infoPanel.innerHTML = 'Click a drug to see its interactions. Edge color indicates severity.';
        nodes.update(nodes.get().map(n => ({ id: n.id, opacity: 1.0 })));
        edges.update(edges.get().map((e, i) => ({
            id: e.id,
            color: { color: severityColors[interactions[e.id].sev], highlight: '#333' },
            width: interactions[e.id].sev === 'severe' ? 3 : (interactions[e.id].sev === 'moderate' ? 2 : 1.2)
        })));
    }

    network.on('hoverNode', () => { container.style.cursor = 'pointer'; });
    network.on('blurNode', () => { container.style.cursor = 'default'; });
});
