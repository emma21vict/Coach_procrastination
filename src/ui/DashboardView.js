export class DashboardView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(state) {
        const xp = state.userProfile ? state.userProfile.xpTotal : 0;
        const streak = state.userProfile ? state.userProfile.streak : 1;
        const completed = state.dailyStats ? state.dailyStats.completedTasksCount : 0;
        const total = state.todaySessions ? state.todaySessions.length : 0;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        this.container.innerHTML = `
            <h2>🏠 Dashboard</h2>
            <div class="stats">
                <p>Niveau d'énergie actuel : <strong>Moyenne</strong></p>
                <p>Progression Journée : <strong>${progress} %</strong> (${completed}/${total})</p>
                <p>XP Total : <strong>${xp} XP</strong></p>
                <p>Série (Streak) : <strong>🔥 ${streak} Jour(s)</strong></p>
                <button id="btn-dash-bilan" style="margin-top:10px; width:100%; background:#2a5268; color:white;">Faire mon Bilan</button>
            </div>
            <div class="stats">
                <h3>Citation du Jour</h3>
                <p><em>"Discipline beats motivation."</em></p>
            </div>
        `;
        
        const btnBilan = document.getElementById('btn-dash-bilan');
        if (btnBilan) btnBilan.addEventListener('click', () => this.app.showBilan());
    }
}
