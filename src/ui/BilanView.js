export class BilanView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app; // Reference to app to handle state
    }
    
    render(stats) {
        if (!stats) stats = { completedTasksCount: 0, xpTotal: 0, focusTime: 0 };
        
        this.container.innerHTML = `
            <h2>🏆 Bilan de la Journée</h2>
            <div class="stats" style="text-align: center;">
                <h3>Excellent travail !</h3>
                <p>Tu as terminé <strong>${stats.completedTasksCount}</strong> tâches aujourd'hui.</p>
                <div class="timer" style="font-size: 36px; margin: 10px 0;">+ ${stats.xpTotal} XP</div>
                <p>Temps de concentration : <strong>${stats.focusTime} min</strong></p>
                <p style="color: #00f2fe; margin-top: 20px;">Ta progression a été sauvegardée.</p>
                
                <button id="btn-close-day" style="width: 100%; margin-top: 15px; background: #2a5268; color: white;">Fermer la journée</button>
            </div>
        `;
        
        const closeBtn = document.getElementById('btn-close-day');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.app.renderView('dashboard');
            });
        }
    }
}
