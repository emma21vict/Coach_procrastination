export class PlanningView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(plan) {
        let dateHtml = "du Jour";
        if (plan && plan.date) {
            const dateObj = new Date(plan.date + 'T12:00:00');
            dateHtml = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        }
        let html = `<h2 style="text-transform: capitalize;">📅 Planning <span style="color:#00f2fe;">${dateHtml}</span></h2>`;
        
        html += '<h3 style="color: #00f2fe; border-bottom: 1px solid #00f2fe; padding-bottom: 5px; display: flex; justify-content: space-between; align-items: center;">';
        html += '<span>🎯 Sessions du Bootcamp</span>';
        html += '<button id="btn-launch-focus" style="background:#00f2fe; color:#0f2027; padding:5px 10px; font-size:12px; border-radius:15px; border:none; cursor:pointer;">▶️ Lancer Focus</button>';
        html += '</h3>';
        html += '<ul class="session-list" style="margin-bottom: 20px;">';
        if (plan && plan.sessions && plan.sessions.length > 0) {
            plan.sessions.forEach(s => {
                const isCompleted = s.completed;
                const style = isCompleted ? 'text-decoration: line-through; opacity: 0.5;' : '';
                const checkIcon = isCompleted ? '✅' : '⬜';
                const resourceLink = s.resourceLink ? `<br><a href="${s.resourceLink}" target="_blank" style="color: #00f2fe; text-decoration: none; font-size:14px; display:inline-block; margin-top:5px;">🔗 Ouvrir la ressource</a>` : '';
                
                const timeHtml = s.startTime ? `<span style="background: #2a5268; padding: 2px 6px; border-radius: 4px; color: white; font-size: 12px; margin-right: 10px;">${s.startTime}</span>` : '';
                const diffHtml = s.difficulty ? `<span style="margin-left:5px;">${s.difficulty}</span>` : '';
                const xpHtml = s.xp ? `<span style="color:#ffd700; margin-left:5px; font-size:12px; font-weight:bold;">+${s.xp} XP</span>` : '';
                
                const blockHtml = s.block ? `<span style="background:#0f2027; border: 1px solid #00f2fe; padding: 2px 6px; border-radius: 4px; font-size:11px; margin-right:6px;">${s.block}</span>` : '';
                
                html += `<li style="${style}; padding: 15px; margin-bottom: 12px; background: #0b1a20; border-left: 4px solid #00f2fe; border-radius: 6px;">
                    <strong style="cursor: pointer;" class="task-checkbox" data-id="${s.id}">${checkIcon} ${timeHtml}${blockHtml}${s.title}</strong>
                    <span style="float:right;">⭐ ${s.difficulty || '🟢'} | 🏆 <strong style="color:#ffd700;">+${s.xp || 60} XP</strong></span>
                    <br><small style="color: #ccc;">⏱ <strong>${s.expectedDuration} min</strong> | ⚡ Priorité : ${s.priority || 'Normale'} | <span style="color:#ff9800; font-weight:bold;">${s.skillLabel || ''}</span></small>
                    <div style="margin-top: 8px; font-size: 13px; line-height: 1.5; background: rgba(0,242,254,0.05); padding: 8px; border-radius: 4px;">
                        ${s.objective ? `<div><strong>🎯 Objectif :</strong> <span style="color:#e0e0e0;">${s.objective}</span></div>` : ''}
                        ${s.expectedResult ? `<div><strong>📌 Résultat attendu :</strong> <span style="color:#a8d8ea;">${s.expectedResult}</span></div>` : ''}
                        ${s.proof ? `<div><strong>📝 Preuve exigée :</strong> <span style="color:#ffb74d;">${s.proof}</span></div>` : ''}
                        ${!isCompleted && s.resourceLink ? `<div style="margin-top:4px;"><strong>📚 Ressource :</strong> <a href="${s.resourceLink}" target="_blank" style="color: #00f2fe; text-decoration: underline;">Ouvrir le lien</a></div>` : ''}
                    </div>
                </li>`;
            });
        } else {
            html += `<li style="padding: 20px; text-align: center; background: #0b1a20; border-left: 4px solid #ff9800; border-radius: 6px; color: #a8d8ea; list-style: none;">
                <strong style="color: #ff9800; font-size: 16px;">⏳ Le Bootcamp officiel commence demain, Lundi 27 juillet !</strong>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #e0e0e0;">Aucun cours ou tâche ne t'est assigné pour aujourd'hui (Dimanche 26 juillet). Profite de cette journée pour préparer ton espace de travail, ton compte TryHackMe et te reposer avant le grand lancement demain matin à 05h30 ! 🚀</p>
            </li>`;
        }
        html += '</ul>';

        html += '<h3 style="color: #ff9800; border-bottom: 1px solid #ff9800; padding-bottom: 5px;">🔥 Habitudes du Soir</h3>';
        html += '<ul class="session-list" style="margin-bottom: 20px;">';
        if (plan && plan.habits && plan.habits.length > 0) {
            plan.habits.forEach(h => {
                const isCompleted = h.completed;
                const style = isCompleted ? 'text-decoration: line-through; opacity: 0.5;' : '';
                const checkIcon = isCompleted ? '✅' : '⬜';
                
                html += `<li style="${style}; padding: 10px; margin-bottom: 8px;">
                    <strong style="cursor: pointer;" class="habit-checkbox" data-id="${h.id}">${checkIcon} ${h.title} (${h.minTime} min)</strong>
                    <br><small style="color: #88a7b7;">Objectif : ${h.skillLabel}</small>
                </li>`;
            });
        } else {
            html += `<li style="padding: 10px; color: #88a7b7; list-style: none;">Aucune habitude programmée avant le début du Bootcamp.</li>`;
        }
        html += '</ul>';

        html += '<button id="btn-show-bilan" style="width:100%; margin-top:20px; background:#2a5268; color:white;">Voir le Bilan de fin de journée</button>';
        this.container.innerHTML = html;
        
        this.container.querySelectorAll('.habit-checkbox').forEach(el => {
            el.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                this.app.markHabitCompleted(id);
            });
        });

        this.container.querySelectorAll('.task-checkbox').forEach(el => {
            el.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                this.app.markSessionCompleted(id, { status: 'completed' }); // Default to completed from Planning list
            });
        });
        
        const btnFocus = document.getElementById('btn-launch-focus');
        if (btnFocus) {
            btnFocus.addEventListener('click', () => {
                this.app.renderView('focus');
            });
        }
        
        const btnBilan = document.getElementById('btn-show-bilan');
        if (btnBilan) {
            btnBilan.addEventListener('click', () => {
                this.app.showBilan();
            });
        }
    }
}
