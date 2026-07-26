export class BilanView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(stats) {
        const completedTasksCount = (stats && stats.completedTasksCount) ? stats.completedTasksCount : 0;
        const xpTotal = (stats && !isNaN(stats.xpTotal)) ? stats.xpTotal : 0;
        const focusTime = (stats && !isNaN(stats.focusTime)) ? stats.focusTime : 0;
        
        this.container.innerHTML = `
            <h2>🏆 Bilan de la Journée</h2>
            <div class="stats" style="text-align: center; background: #0e1e26; border-left: 5px solid #00f2fe; padding: 20px; border-radius: 10px; margin-top: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">
                <p style="font-size: 14px; color: #88a7b7; margin-top: 0;">Étape 1/2 - Le résumé automatique de tes efforts</p>
                
                <h3 style="color: #00f2fe; margin-bottom: 15px;">Résumé Chiffré</h3>
                <p style="font-size: 16px;">✔ <strong style="color: #fff;">${completedTasksCount}</strong> tâches/habitudes terminées</p>
                <div class="timer" style="font-size: 42px; font-weight: bold; color: #ffd700; margin: 15px 0; text-shadow: 0 0 10px rgba(255,215,0,0.3);">+ ${xpTotal} XP</div>
                <p style="font-size: 16px;">⏱ Temps d'étude actif : <strong style="color: #fff;">${focusTime} min</strong></p>
                
                <button id="btn-go-journal" style="width: 100%; margin-top: 25px; background: #00f2fe; color: #0f2027; font-weight: bold; border: none; padding: 14px; border-radius: 20px; cursor: pointer; font-size: 15px; box-shadow: 0 2px 8px rgba(0,242,254,0.3);">
                    Étape 2 : Mon Journal du Soir ➡️
                </button>
                <button id="btn-bilan-back" style="width: 100%; margin-top: 12px; background: transparent; color: #88a7b7; border: 1px solid #2a5268; padding: 10px; border-radius: 20px; cursor: pointer; font-size: 14px;">
                    ⬅️ Retour au Plan
                </button>
            </div>
        `;
        
        const btnNext = document.getElementById('btn-go-journal');
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                this.app.renderView('journal');
            });
        }

        const btnBack = document.getElementById('btn-bilan-back');
        if (btnBack) {
            btnBack.addEventListener('click', () => {
                this.app.renderView('planning');
            });
        }
    }
}
