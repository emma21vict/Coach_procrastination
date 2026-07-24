export class DashboardView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(state) {
        const completedHabits = state.dailyPlan && state.dailyPlan.habits ? state.dailyPlan.habits.filter(h => h.completed).length : 0;
        const totalHabits = state.dailyPlan && state.dailyPlan.habits ? state.dailyPlan.habits.length : 0;
        
        let insightsHtml = "";
        if (state.analytics && state.analytics.insights) {
            state.analytics.insights.forEach(insight => {
                insightsHtml += `<p style="margin-bottom:5px;"><strong>${insight.type === 'warning' ? '⚠️' : '✅'} ${insight.text}</strong></p>`;
            });
        }
        if (state.reflections && state.reflections.length > 0) {
            state.reflections.forEach(ref => {
                insightsHtml += `<p style="margin-bottom:5px;"><strong>🧠 ${ref}</strong></p>`;
            });
        }

        let skillsHtml = "";
        if (state.knowledgeGraph) {
            state.knowledgeGraph.forEach(node => {
                skillsHtml += `
                <div style="margin-bottom: 10px;">
                    <span style="display:inline-block; width:120px;">${node.title}</span>
                    <span style="display:inline-block; width:100px; background:#0f2027; border-radius:3px;">
                        <span style="display:inline-block; width:${node.estimatedLevel}%; background:#00f2fe; height:10px; border-radius:3px;"></span>
                    </span>
                    <span style="margin-left:10px; font-weight:bold;">${node.estimatedLevel} %</span>
                </div>`;
            });
        }

        let prioritiesHtml = "";
        if (state.yesterdayJournal) {
            if (state.yesterdayJournal.priority1) prioritiesHtml += `<p>1️⃣ ${state.yesterdayJournal.priority1}</p>`;
            if (state.yesterdayJournal.priority2) prioritiesHtml += `<p>2️⃣ ${state.yesterdayJournal.priority2}</p>`;
        }
        if (!prioritiesHtml) prioritiesHtml = "<p style='color:#88a7b7;'>Aucune priorité définie hier.</p>";

        this.container.innerHTML = `
            <h2>🏠 Poste de Pilotage</h2>
            
            <div class="stats" style="border-left: 5px solid #ff9800;">
                <h3>🌞 État du jour</h3>
                ${prioritiesHtml}
                <hr style="border: 0; border-top: 1px solid #2a5268; margin: 10px 0;">
                <p>Habitudes accomplies : <strong>${completedHabits} / ${totalHabits}</strong></p>
                <button id="btn-dash-plan" style="margin-top:10px; width:100%; background:#00f2fe; color:#0f2027;">Aller au Planning</button>
            </div>

            <div class="stats" style="border-left: 5px solid #00f2fe; margin-top: 15px;">
                <h3>🧠 Évolution des Compétences</h3>
                ${skillsHtml || '<p>Aucune donnée de compétence pour le moment.</p>'}
            </div>

            <div class="stats" style="border-left: 5px solid #2a5268; margin-top: 15px;">
                <h3>🤖 Le Coach</h3>
                <p style="color: #88a7b7; font-size:12px;"><em>Analyse des 7 derniers jours et de tes journaux :</em></p>
                ${insightsHtml || '<p>Continue sur cette lancée !</p>'}
            </div>
        `;
        
        const btnPlan = document.getElementById('btn-dash-plan');
        if (btnPlan) btnPlan.addEventListener('click', () => this.app.renderView('planning'));
    }
}
