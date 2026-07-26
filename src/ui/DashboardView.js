export class DashboardView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(state) {
        const completedHabits = state.dailyPlan && state.dailyPlan.habits ? state.dailyPlan.habits.filter(h => h.completed).length : 0;
        const totalHabits = state.dailyPlan && state.dailyPlan.habits ? state.dailyPlan.habits.length : 0;
        
        let insightsHtml = "";
        if (state.coachInsights && state.coachInsights.length > 0) {
            state.coachInsights.forEach(insight => {
                insightsHtml += `<p style="margin-bottom:5px;"><strong>${insight.type === 'warning' ? '⚠️' : '✅'} ${insight.text}</strong></p>`;
            });
        }
        
        let skillsHtml = "";
        let activeSkills = 0;
        let forgottenSkills = 0;
        
        if (state.learningGraph) {
            state.learningGraph.forEach(node => {
                if (node.level > 0) {
                    activeSkills++;
                    skillsHtml += `
                    <div style="margin-bottom: 10px;">
                        <span style="display:inline-block; width:140px;">${node.title}</span>
                        <span style="display:inline-block; width:80px; background:#0f2027; border-radius:3px;">
                            <span style="display:inline-block; width:${node.level}%; background:#00f2fe; height:10px; border-radius:3px;"></span>
                        </span>
                        <span style="margin-left:10px; font-weight:bold;">${node.level}%</span>
                    </div>`;
                } else {
                    forgottenSkills++;
                }
            });
        }

        let healthHtml = "";
        if (state.systemHealth) {
            healthHtml = `
                <p>Habitudes : <strong>${state.systemHealth.habitsScore || completedHabits} / ${totalHabits}</strong></p>
                <p>Compétences actives : <strong>${state.systemHealth.activeSkills || activeSkills}</strong></p>
                <p>Compétences oubliées : <strong>${state.systemHealth.forgottenSkills || forgottenSkills}</strong></p>
                <p>Objectifs en retard : <strong>${state.systemHealth.lateGoals || 0}</strong></p>
                <p>Streak : <strong>${state.systemHealth.streak || 0} jours</strong></p>
            `;
        }

        let missionsHtml = "";
        let theme = "Semaine en cours";
        let objective = "";
        
        if (state.fullProgram && state.fullProgram.length > 0) {
            const currentWeek = state.fullProgram[0];
            if (currentWeek) {
                theme = currentWeek.theme || theme;
                objective = currentWeek.objective || "";
                if (currentWeek.missions && currentWeek.missions.length > 0) {
                    currentWeek.missions.forEach(m => {
                        missionsHtml += `<p style="margin:5px 0; font-size:13px;"><input type="checkbox" style="margin-right:8px;"> ${m}</p>`;
                    });
                }
            }
        }
        if (!missionsHtml) missionsHtml = "<p style='color:#88a7b7;'>Aucune mission définie cette semaine.</p>";

        let todayJournalHtml = "";
        if (state.currentJournal) {
            const moodEmojis = ["", "😭", "😟", "😐", "🙂", "🤩"];
            const energyEmojis = ["", "🔋 (Vide)", "🔋 (Faible)", "🔋 (Moyenne)", "🔋 (Bonne)", "🔋 (Pleine)"];
            todayJournalHtml = `
                <hr style="border: 0; border-top: 1px solid #2a5268; margin: 10px 0;">
                <p>Humeur : ${moodEmojis[state.currentJournal.mood] || 'Non renseigné'}</p>
                <p>Énergie : ${energyEmojis[state.currentJournal.energy] || 'Non renseigné'}</p>
            `;
        }

        let todayBlocsHtml = "";
        const sessions = state.dailyPlan && state.dailyPlan.sessions ? state.dailyPlan.sessions : [];
        if (sessions.length > 0) {
            sessions.forEach(s => {
                const blockBadge = s.block ? `<span style="background:#0f2027; border: 1px solid #00f2fe; padding: 2px 6px; border-radius: 4px; font-size:11px; margin-right:6px; color:#00f2fe;">${s.block}</span>` : '';
                todayBlocsHtml += `
                    <div style="background:#0b1a20; border-left:4px solid #00f2fe; padding:12px; border-radius:6px; margin-bottom:10px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:14px; font-weight:bold; color:#fff;">${blockBadge}${s.title}</span>
                            <span style="font-size:12px;">⭐ ${s.difficulty || '🟢'} | 🏆 <strong style="color:#ffd700;">+${s.xp || 60} XP</strong></span>
                        </div>
                        <div style="font-size:12px; color:#a8d8ea; margin-top:4px;">⏱ <strong>${s.expectedDuration} min</strong> ${s.startTime ? `(${s.startTime})` : ''} | <span style="color:#ff9800; font-weight:bold;">${s.skillLabel || ''}</span></div>
                        ${s.objective ? `<div style="font-size:13px; color:#e0e0e0; margin-top:6px;">🎯 <strong>Objectif :</strong> ${s.objective}</div>` : ''}
                        ${s.expectedResult ? `<div style="font-size:12px; color:#a8d8ea; margin-top:3px;">📌 <strong>Résultat attendu :</strong> ${s.expectedResult}</div>` : ''}
                        ${s.proof ? `<div style="font-size:12px; color:#ffb74d; margin-top:3px;">📝 <strong>Preuve :</strong> ${s.proof}</div>` : ''}
                        ${s.resourceLink ? `<div style="margin-top:5px;"><a href="${s.resourceLink}" target="_blank" style="font-size:12px; color:#00f2fe; text-decoration:underline;">🔗 Ouvrir la ressource</a></div>` : ''}
                    </div>
                `;
            });
        } else {
            todayBlocsHtml = `
            <div style="background:#0b1a20; border-left:4px solid #ff9800; padding:15px; border-radius:6px; margin-bottom:10px;">
                <strong style="color:#ff9800; font-size:15px;">⏳ Le Bootcamp officiel commence demain, Lundi 27 juillet !</strong>
                <p style="margin:8px 0 0 0; color:#e0e0e0; font-size:13px;">Aucune séance ni habitude ne t'est assignée pour aujourd'hui (Dimanche 26 juillet). Profite de cette journée pour préparer tes outils, te reposer et être en pleine forme pour le grand départ demain à 05h30 ! 🚀</p>
            </div>`;
        }

        this.container.innerHTML = `
            <h2>🏠 Poste de Pilotage</h2>
            
            <div class="stats" style="border-left: 5px solid #00f2fe; background: #0e1e26; margin-bottom: 20px;">
                <h3 style="color:#00f2fe; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
                    <span>🔥 BLOCS & SÉANCES DU JOUR (9,3/10 Coach)</span>
                    <span style="font-size:12px; background:#00f2fe; color:#0f2027; padding:2px 8px; border-radius:12px;">${sessions.length} Séances</span>
                </h3>
                <p style="font-size:12px; color:#88a7b7; margin-bottom:12px;">Chaque bloc affiche son objectif précis et la preuve à produire.</p>
                ${todayBlocsHtml}
                <button id="btn-dash-plan-top" style="margin-top:15px; width:100%; background:#00f2fe; color:#0f2027; font-weight:bold; padding:12px; border:none; border-radius:6px; cursor:pointer;">
                    📋 Ouvrir le planning interactif & valider mes preuves
                </button>
            </div>
            
            <div class="stats" style="border-left: 5px solid #ff9800;">
                <h3>🎯 Mission de la Semaine : ${theme}</h3>
                <p style="font-style:italic; font-size:14px; margin-bottom:10px; color:#88a7b7;">${objective}</p>
                ${missionsHtml}
            </div>
            
            <div class="stats" style="border-left: 5px solid #2a5268; margin-top: 15px;">
                <h3>🤖 Le Coach IA</h3>
                <p style="color: #88a7b7; font-size:12px;"><em>Analyse de ta progression par rapport aux objectifs de la semaine :</em></p>
                ${insightsHtml || '<p>Continue sur cette lancée, tu es sur la bonne voie par rapport à tes missions !</p>'}
            </div>

            <div class="stats" style="border-left: 5px solid #9C27B0; margin-top: 15px;">
                <h3>🧠 Santé du Learning OS</h3>
                ${healthHtml || '<p>Analyse en cours...</p>'}
            </div>

            <div class="stats" style="border-left: 5px solid #4CAF50; margin-top: 15px;">
                <h3>🌞 État du jour</h3>
                ${todayJournalHtml}
                <hr style="border: 0; border-top: 1px solid #2a5268; margin: 10px 0;">
                <p>Habitudes accomplies : <strong>${completedHabits} / ${totalHabits}</strong></p>
                <button id="btn-dash-plan" style="margin-top:10px; width:100%; background:#00f2fe; color:#0f2027;">Aller au Planning du Jour</button>
            </div>

            <div class="stats" style="border-left: 5px solid #00f2fe; margin-top: 15px;">
                <h3>📊 Learning Graph (Compétences)</h3>
                ${skillsHtml || '<p>Aucune donnée de compétence pour le moment.</p>'}
            </div>
        `;
        
        const btnPlan = document.getElementById('btn-dash-plan');
        if (btnPlan) btnPlan.addEventListener('click', () => this.app.renderView('planning'));
        const btnPlanTop = document.getElementById('btn-dash-plan-top');
        if (btnPlanTop) btnPlanTop.addEventListener('click', () => this.app.renderView('planning'));
    }
}
