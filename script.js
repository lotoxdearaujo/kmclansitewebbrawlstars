const config = {
    km1: { goal: 1000000, color: '#ff00ea' },
    km2: { goal: 500000, color: '#ff3c3c' },
    km3: { goal: 250000, color: '#00d4ff' }
};

const players = [
    { name: "E❌️|Lotox", currentTr: 64953, goalTr: 70000, clan: "km1", url: "https://brawlytix.com/profile/9PJYLRPPG" },
    { name: "zdfay", currentTr: 46063, goalTr: 50000, clan: "km2", url: "https://brawlytix.com/profile/8UL2RUQ82" },
    { name: "trix-_-", currentTr: 33374, goalTr: 50000, clan: "km2", url: "https://brawlytix.com/profile/288GRGV90L" },
    { name: "Nathan93230.", currentTr: 29558, goalTr: 50000, clan: "km2", url: "https://brawlytix.com/profile/8Q2GC8092" },
    { name: "oula", currentTr: 29454, goalTr: 50000, clan: "km2", url: "https://brawlytix.com/profile/22J8UR9VG" },
    { name: "Nael FR", currentTr: 10761, goalTr: 20000, clan: "km3", url: "https://brawlytix.com/profile/PJURCJ2RL" },
    { name: "E❌| LotoxV3", currentTr: 1393, goalTr: 20000, clan: "km3", url: "https://brawlytix.com/profile/9YJULUQPY" },
    { name: "KM | Lotox", currentTr: 2121, goalTr: 50000, clan: "km2", url: "https://brawlytix.com/profile/QLCCRQ8JG" }
];

function updateUI() {
    const lists = { km1: document.getElementById('list-km1'), km2: document.getElementById('list-km2'), km3: document.getElementById('list-km3') };
    const ticker = document.getElementById('full-leaderboard');
    let globalTotal = 0;
    let clanTotals = { km1: 0, km2: 0, km3: 0 };

    Object.values(lists).forEach(el => el.innerHTML = "");
    ticker.innerHTML = "";

    const sorted = [...players].sort((a, b) => b.currentTr - a.currentTr);

    // TICKER (Doublé pour effet infini)
    sorted.concat(sorted).forEach((p, i) => {
        const rank = (i % sorted.length) + 1;
        const mini = document.createElement('a');
        mini.href = p.url; mini.target = "_blank";
        mini.className = "player-link";
        mini.style.minWidth = "180px"; mini.style.margin = "0 10px";
        mini.innerHTML = `
            <span class="rank-badge ${rank <= 3 ? 'top-' + rank : ''}">#${rank}</span>
            <strong>${p.name}</strong><br><span style="color:#facc15">${p.currentTr.toLocaleString()} 🏆</span>
        `;
        ticker.appendChild(mini);
    });

    // LISTES PAR CLAN
    players.forEach(p => {
        globalTotal += p.currentTr;
        clanTotals[p.clan] += p.currentTr;
        const pPercent = Math.min((p.currentTr / p.goalTr) * 100, 100);

        const card = document.createElement('a');
        card.href = p.url; card.target = "_blank";
        card.className = "player-link";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-weight:700;">
                <span>${p.name}</span> <span style="color:#facc15">${p.currentTr.toLocaleString()} 🏆</span>
            </div>
            <div class="player-bar-container"><div class="player-bar" style="width:${pPercent}%; background:var(--${p.clan}-color);"></div></div>
            <div style="font-size:0.7rem; color:#94a3b8; text-align:right;">Objectif: ${p.goalTr.toLocaleString()}</div>
        `;
        lists[p.clan].appendChild(card);
    });

    // MAJ PUISSANCE GLOBALE
    document.getElementById('global-trophies').innerText = globalTotal.toLocaleString();
    document.getElementById('global-bar').style.width = Math.min((globalTotal / 450000) * 100, 100) + "%";

    // MAJ STATS CLANS
    Object.keys(config).forEach(c => {
        const percent = Math.min((clanTotals[c] / config[c].goal) * 100, 100);
        document.getElementById(`bar-${c}`).style.width = percent + "%";
        document.getElementById(`stats-${c}`).innerHTML = `TOTAL: <strong>${clanTotals[c].toLocaleString()}</strong> / ${config[c].goal.toLocaleString()} 🏆`;
    });
}
document.addEventListener('DOMContentLoaded', updateUI);
