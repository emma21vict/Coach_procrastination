export class PortfolioView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(history) {
        const totalRecords = history ? history.length : 0;
        const totalXP = history ? history.reduce((sum, r) => sum + r.xpEarned, 0) : 0;
        
        let dateCounts = {};
        if (history) {
            history.forEach(r => {
                dateCounts[r.date] = (dateCounts[r.date] || 0) + 1;
            });
        }
        
        let timelineHTML = '';
        const today = new Date();
        for(let i=6; i>=0; i--) {
            let d = new Date(today);
            d.setDate(today.getDate() - i);
            let dStr = d.toLocaleDateString('fr-CA');
            let hasActivity = dateCounts[dStr] > 0;
            timelineHTML += `<div style="display:inline-block; width:20px; height:20px; margin:2px; border-radius:3px; background-color: ${hasActivity ? '#00f2fe' : '#2a5268'};" title="${dStr}: ${dateCounts[dStr] || 0} tâches"></div>`;
        }

        this.container.innerHTML = `
            <h2>🎓 Portfolio & Mémoire</h2>
            <div class="stats">
                <h3>Activité (7 derniers jours)</h3>
                <div style="margin-top: 10px; display:flex; justify-content:center;">
                    ${timelineHTML}
                </div>
            </div>
            
            <div class="stats" style="margin-top:15px;">
                <h3>Tes Acquis</h3>
                <ul style="list-style:none; padding:0; margin:0; color:#ccc;">
                    <li>🎯 Sessions terminées : <strong>${totalRecords}</strong></li>
                    <li>⭐ Expérience Totale : <strong>${totalXP} XP</strong></li>
                    <li>🏆 Certifications : <em>À venir</em></li>
                    <li>💻 Projets GitHub : <em>À venir</em></li>
                </ul>
            </div>
        `;
    }
}
