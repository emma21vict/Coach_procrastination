export class DashboardView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(state) {
        const xp = state.userProfile ? state.userProfile.xpTotal : 0;
        const streak = state.userProfile ? state.userProfile.streak : 1;
        
        const totalTasks = state.dailyPlan && state.dailyPlan.sessions ? state.dailyPlan.sessions.length : 0;
        const completedTasks = state.dailyStats ? state.dailyStats.completedTasksCount : 0;
        
        const totalHabits = state.dailyPlan && state.dailyPlan.habits ? state.dailyPlan.habits.length : 0;
        const completedHabits = state.dailyPlan && state.dailyPlan.habits ? state.dailyPlan.habits.filter(h => h.completed).length : 0;
        
        let insightsHtml = "";
        if (state.analytics && state.analytics.insights) {
            state.analytics.insights.forEach(insight => {
                const icon = insight.type === 'warning' ? '⚠️' : '✅';
                insightsHtml += `<div style="background: #0f2027; padding: 10px; border-radius: 5px; margin-top: 10px; font-size: 14px;">
                    <strong>${icon} ${insight.text}</strong>
                </div>`;
            });
        }

        this.container.innerHTML = `
            <h2>🏠 Dashboard</h2>
            
            <!-- Carte 1 : État du jour -->
            <div class="stats" style="border-left: 5px solid #ff9800;">
                <h3>🌞 État du jour</h3>
                <p>Énergie : 😊</p>
                <p>Force-N : ✔ Oui</p>
                <p>Bootcamp : Jour 8 / 24</p>
                <p>Habitudes : <strong>${completedHabits} / ${totalHabits}</strong></p>
            </div>

            <!-- Carte 2 : Coach Explicable -->
            <div class="stats" style="border-left: 5px solid #00f2fe; margin-top: 15px;">
                <h3>🤖 Le Coach</h3>
                <p style="color: #88a7b7;"><em>Basé sur ton activité des 7 derniers jours :</em></p>
                ${insightsHtml || '<p>Continue sur cette lancée !</p>'}
                <button id="btn-dash-plan" style="margin-top:15px; width:100%; background:#00f2fe; color:#0f2027;">Voir mon programme</button>
            </div>
            
            <!-- Carte 3 : Progression -->
            <div class="stats" style="margin-top: 15px;">
                <h3>Progression</h3>
                <p>XP Total : <strong>${xp} XP</strong></p>
                <p>Série (Streak) : <strong>🔥 ${streak} Jour(s)</strong></p>
                <p>Sessions aujourd'hui : <strong>${completedTasks}/${totalTasks}</strong></p>
            </div>
        `;
        
        const btnPlan = document.getElementById('btn-dash-plan');
        if (btnPlan) btnPlan.addEventListener('click', () => this.app.renderView('planning'));
    }
}
