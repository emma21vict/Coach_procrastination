export class BilanView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(stats) {
        if (!stats) stats = { completedTasksCount: 0, xpTotal: 0, focusTime: 0 };
        
        this.container.innerHTML = `
            <h2>🏆 Bilan de la Journée</h2>
            <div class="stats" style="text-align: center;">
                <p style="font-size: 14px; color: #88a7b7;">Étape 1/2 - Le résumé automatique.</p>
                
                <h3>Résumé Chiffré</h3>
                <p>✔ <strong>${stats.completedTasksCount}</strong> tâches/habitudes terminées.</p>
                <div class="timer" style="font-size: 36px; margin: 10px 0;">+ ${stats.xpTotal} XP</div>
                <p>Temps d'étude actif : <strong>${stats.focusTime} min</strong></p>
                
                <button id="btn-go-journal" style="width: 100%; margin-top: 25px; background: #00f2fe; color: #0f2027;">Étape 2 : Mon Journal ➡️</button>
            </div>
        `;
        
        const btnNext = document.getElementById('btn-go-journal');
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                this.app.renderView('journal');
            });
        }
    }
}
