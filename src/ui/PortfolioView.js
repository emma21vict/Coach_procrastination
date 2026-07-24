export class PortfolioView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(state) {
        const report = state.monthlyReport;
        let reportHtml = "";
        
        if (report) {
            reportHtml = `
                <div style="background: #152b36; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 5px solid #00f2fe;">
                    <h3>📖 Le Livre de Bord (Mois ${report.month}/${report.year})</h3>
                    <p style="font-size:16px; margin-top:10px; line-height:1.5;">${report.summary}</p>
                    <ul style="margin-top:10px; margin-left: 20px; color:#88a7b7;">
                        <li>Heures de vol : ${report.totalHours} h</li>
                        <li>Jours actifs : ${report.daysActive}</li>
                        <li>Qualité moyenne : ${report.avgQuality} / 5</li>
                        <li>Preuves collectées : ${report.proofsGenerated}</li>
                    </ul>
                </div>
            `;
        }

        let proofsHtml = "";
        if (state.learningGraph) {
            state.learningGraph.forEach(node => {
                if (node.proofs && node.proofs.length > 0) {
                    proofsHtml += `<h4 style="margin-top:10px;">${node.title}</h4>`;
                    node.proofs.forEach(p => {
                        proofsHtml += `
                        <div style="background: #0f2027; padding: 10px; border-radius: 5px; margin-bottom: 5px;">
                            <span style="color:#ff9800; font-weight:bold;">[${p.type}]</span> 
                            ${p.description || "Sans description"}
                            ${p.url ? `<a href="${p.url}" target="_blank" style="color:#00f2fe; margin-left:10px;">Voir la preuve</a>` : ''}
                            <div style="color:#88a7b7; font-size:12px; margin-top:5px;">Date: ${p.date} | Source: ${p.source}</div>
                        </div>`;
                    });
                }
            });
        }
        
        if (!proofsHtml) proofsHtml = "<p>Aucune preuve de compétence enregistrée pour le moment.</p>";

        this.container.innerHTML = `
            <h2>🏆 Mon Portfolio & Historique</h2>
            <div class="stats">
                ${reportHtml}
                <h3>Mes Preuves d'Apprentissage</h3>
                ${proofsHtml}
            </div>
        `;
    }
}
