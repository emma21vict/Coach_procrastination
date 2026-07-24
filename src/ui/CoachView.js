export class CoachView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(state) {
        const xp = state.userProfile ? state.userProfile.xpTotal : 0;
        const streak = state.userProfile ? state.userProfile.streak : 1;
        const completed = state.dailyStats ? state.dailyStats.completedTasksCount : 0;
        const total = state.todaySessions ? state.todaySessions.length : 0;

        let recommendation = "Busuu, TryHackMe";
        let message = "Prête pour une nouvelle journée d'apprentissage ?";
        if (streak > 3) message = "Super série ! Continue comme ça, la constance est la clé.";
        if (completed > 0 && completed === total) message = "Incroyable, tu as terminé tout ton programme aujourd'hui !";

        this.container.innerHTML = `
            <h2>🤖 Le Coach</h2>
            <div class="stats">
                <h3>Bonjour Emmanuela.</h3>
                <p>Tu as un <strong>streak de ${streak} jours 🔥</strong>.</p>
                <p style="color: #88a7b7;"><em>${message}</em></p>
                
                <hr style="border: 0; border-top: 1px solid #2a5268; margin: 15px 0;">
                
                <p><strong>Objectif du jour :</strong> Terminer tes ${total} tâches.</p>
                <p><strong>Recommandations :</strong> ${recommendation}</p>
                
                <button id="btn-start-plan" style="margin-top:15px; width:100%; background:#00f2fe; color:#0f2027;">Voir mon programme</button>
            </div>
            
            <div class="stats" style="margin-top: 15px;">
                <h3>Ta Progression</h3>
                <p>XP Total : <strong>${xp} XP</strong></p>
                <p>Tâches aujourd'hui : <strong>${completed}/${total}</strong></p>
            </div>
        `;
        
        const btnPlan = document.getElementById('btn-start-plan');
        if (btnPlan) btnPlan.addEventListener('click', () => this.app.renderView('planning'));
    }
}
