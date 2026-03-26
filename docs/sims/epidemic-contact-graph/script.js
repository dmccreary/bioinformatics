// Epidemic Contact Graph - SIR simulation with vis-network
// MicroSim version 2026.03

// --- Environment detection ---
function isInIframe() {
    try { return window.self !== window.top; }
    catch (e) { return true; }
}
const enableMouseInteraction = !isInIframe();

// --- Show return link in fullscreen only ---
if (window.self === window.top) {
    document.getElementById('return-link').style.display = 'block';
}

// --- State ---
let nodes, edges, network;
let people = [];
let day = 0;
let running = false;
let timer = null;
let edgeIdCounter = 0;

// --- Slider references ---
const popSlider = document.getElementById('population-slider');
const contactsSlider = document.getElementById('contacts-slider');
const infectionSlider = document.getElementById('infection-slider');
const recoverySlider = document.getElementById('recovery-slider');
const speedSlider = document.getElementById('speed-slider');

const popVal = document.getElementById('population-val');
const contactsVal = document.getElementById('contacts-val');
const infectionVal = document.getElementById('infection-val');
const recoveryVal = document.getElementById('recovery-val');
const speedVal = document.getElementById('speed-val');

popSlider.addEventListener('input', () => { popVal.textContent = popSlider.value; });
contactsSlider.addEventListener('input', () => { contactsVal.textContent = contactsSlider.value; });
infectionSlider.addEventListener('input', () => { infectionVal.textContent = infectionSlider.value; });
recoverySlider.addEventListener('input', () => { recoveryVal.textContent = recoverySlider.value; });
speedSlider.addEventListener('input', () => {
    speedVal.textContent = speedSlider.value;
    if (running) { clearInterval(timer); timer = setInterval(stepDay, parseInt(speedSlider.value)); }
});

// --- SIR colors ---
const STATE_COLORS = {
    S: { background: '#2196F3', border: '#1565C0' },
    I: { background: '#F44336', border: '#C62828' },
    R: { background: '#4CAF50', border: '#2E7D32' }
};

function initSim() {
    stop();
    day = 0;
    edgeIdCounter = 0;

    const n = parseInt(popSlider.value);
    people = [];
    for (let i = 0; i < n; i++) {
        people.push({ id: i, state: 'S', infectedDay: -1, label: 'P' + i, spread: 0 });
    }

    // Patient zero
    const p0 = Math.floor(Math.random() * n);
    people[p0].state = 'I';
    people[p0].infectedDay = 0;

    // Build vis datasets
    nodes = new vis.DataSet(people.map(p => ({
        id: p.id,
        label: p.label,
        color: STATE_COLORS[p.state],
        borderWidth: p.state === 'I' ? 3 : 1.5,
        size: p.state === 'I' ? 18 : 12,
        font: { size: 9, color: '#333', strokeWidth: 2, strokeColor: '#fff' }
    })));

    edges = new vis.DataSet();

    const container = document.getElementById('network-container');
    const data = { nodes: nodes, edges: edges };
    const options = {
        physics: {
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                gravitationalConstant: -30,
                centralGravity: 0.01,
                springLength: 100,
                springConstant: 0.04,
                damping: 0.4
            },
            stabilization: { iterations: 150, updateInterval: 25 }
        },
        interaction: {
            hover: true,
            tooltipDelay: 100,
            zoomView: false,
            dragView: false,
            navigationButtons: false
        },
        nodes: { shape: 'dot' },
        edges: { smooth: false }
    };

    if (network) network.destroy();
    network = new vis.Network(container, data, options);

    // Freeze node positions after initial layout stabilizes, then fit with padding
    network.on('stabilizationIterationsDone', function() {
        network.setOptions({ physics: { enabled: false } });
        network.fit({ animation: false, maxZoomLevel: 1.2 });
    });

    network.on('hoverNode', function(params) {
        const p = people[params.node];
        const stateNames = { S: 'Susceptible', I: 'Infected', R: 'Recovered' };
        const info = stateNames[p.state];
        const extra = p.state === 'I' ? ' (day ' + p.infectedDay + ')' :
                      p.state === 'R' ? ' (recovered)' : '';
        network.canvas.body.container.title = p.label + ': ' + info + extra;
    });

    updateStats();
}

function stepDay() {
    day++;
    const contactsPerDay = parseInt(contactsSlider.value);
    const infectionProb = parseFloat(infectionSlider.value);
    const recoveryDays = parseInt(recoverySlider.value);
    const n = people.length;

    // Recovery check
    for (const p of people) {
        if (p.state === 'I' && (day - p.infectedDay) >= recoveryDays) {
            p.state = 'R';
            nodes.update({
                id: p.id,
                color: STATE_COLORS.R,
                borderWidth: 1.5,
                size: 12
            });
        }
    }

    // Generate contacts for this day
    const infected = people.filter(p => p.state === 'I');
    if (infected.length === 0) {
        stop();
        return;
    }

    for (const inf of infected) {
        const numContacts = Math.min(contactsPerDay, n - 1);
        const contacted = new Set();
        let attempts = 0;
        while (contacted.size < numContacts && attempts < numContacts * 3) {
            const target = Math.floor(Math.random() * n);
            if (target !== inf.id) contacted.add(target);
            attempts++;
        }

        for (const targetId of contacted) {
            const target = people[targetId];
            let transmitted = false;

            if (target.state === 'S' && Math.random() < infectionProb) {
                target.state = 'I';
                target.infectedDay = day;
                inf.spread++;
                transmitted = true;
                nodes.update({
                    id: target.id,
                    color: STATE_COLORS.I,
                    borderWidth: 3,
                    size: 18
                });
            }

            edges.add({
                id: edgeIdCounter++,
                from: inf.id,
                to: targetId,
                color: { color: transmitted ? '#F44336' : '#ddd' },
                width: transmitted ? 2.5 : 0.8,
                arrows: transmitted ? { to: { enabled: true, scaleFactor: 0.5 } } : '',
                dashes: !transmitted,
                title: 'Day ' + day + (transmitted ? ' (transmission)' : ' (contact)')
            });
        }
    }

    const susceptible = people.filter(p => p.state === 'S');
    if (infected.length === 0 && susceptible.length === 0) {
        stop();
    }

    updateStats();
}

function updateStats() {
    const counts = { S: 0, I: 0, R: 0 };
    for (const p of people) counts[p.state]++;
    const n = people.length;

    document.getElementById('stat-day').textContent = day;
    document.getElementById('stat-s').textContent = counts.S;
    document.getElementById('stat-i').textContent = counts.I;
    document.getElementById('stat-r').textContent = counts.R;
    document.getElementById('day-display').textContent = 'Day ' + day;

    // R0 estimate: average secondary infections among early cases (first 3 days)
    // Early cases reflect true R0 before herd immunity reduces spread
    var r0el = document.getElementById('stat-r0');
    var earlyCases = people.filter(function(p) {
        return (p.state === 'I' || p.state === 'R') && p.infectedDay <= 3;
    });
    if (earlyCases.length > 0) {
        var totalSpread = earlyCases.reduce(function(sum, p) { return sum + p.spread; }, 0);
        r0el.innerText = (totalSpread / earlyCases.length).toFixed(1);
    } else {
        r0el.innerText = '0.0';
    }

    const sP = (counts.S / n * 100).toFixed(1);
    const iP = (counts.I / n * 100).toFixed(1);
    const rP = (counts.R / n * 100).toFixed(1);
    document.getElementById('tl-s').style.width = sP + '%';
    document.getElementById('tl-i').style.width = iP + '%';
    document.getElementById('tl-r').style.width = rP + '%';
}

function toggleRun() {
    if (running) {
        stop();
    } else {
        running = true;
        document.getElementById('start-btn').textContent = 'Pause';
        timer = setInterval(stepDay, parseInt(speedSlider.value));
    }
}

function stop() {
    running = false;
    document.getElementById('start-btn').textContent = 'Start';
    if (timer) { clearInterval(timer); timer = null; }
}

// --- Button handlers ---
document.getElementById('start-btn').addEventListener('click', toggleRun);
document.getElementById('reset-btn').addEventListener('click', initSim);

// Disable population slider while running
popSlider.addEventListener('mousedown', function(e) {
    if (running) e.preventDefault();
});

// --- Initialize ---
initSim();
