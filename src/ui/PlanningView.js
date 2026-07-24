export class PlanningView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(plan) {
        let html = '<h2>📅 Planning du Jour</h2>';
        
        html += '<h3 style="color: #ff9800; border-bottom: 1px solid #ff9800; padding-bottom: 5px;">🔥 Habitudes</h3>';
        html += '<ul class="session-list" style="margin-bottom: 20px;">';
        if (plan && plan.habits) {
            plan.habits.forEach(h => {
                const isCompleted = h.completed;
                const style = isCompleted ? 'text-decoration: line-through; opacity: 0.5;' : '';
                const checkIcon = isCompleted ? '✅' : '⬜';
                
                html += `<li style="${style}; padding: 10px; margin-bottom: 8px;">
                    <strong style="cursor: pointer;" class="habit-checkbox" data-id="${h.id}">${checkIcon} ${h.title} (${h.minTime} min)</strong>
                    <br><small style="color: #88a7b7;">Objectif : ${h.skillLabel}</small>
                </li>`;
            });
        }
        html += '</ul>';

        html += '<h3 style="color: #00f2fe; border-bottom: 1px solid #00f2fe; padding-bottom: 5px;">🎯 Sessions du Bootcamp</h3>';
        html += '<ul class="session-list">';
        if (plan && plan.sessions) {
            plan.sessions.forEach(s => {
                const isCompleted = s.completed;
                const style = isCompleted ? 'text-decoration: line-through; opacity: 0.5;' : '';
                const checkIcon = isCompleted ? '✅' : '⬜';
                const resourceLink = s.resourceLink ? `<br><a href="${s.resourceLink}" target="_blank" style="color: #00f2fe; text-decoration: none; font-size:14px; display:inline-block; margin-top:5px;">🔗 Ouvrir la ressource</a>` : '';
                
                const timeHtml = s.startTime ? `<span style="background: #2a5268; padding: 2px 6px; border-radius: 4px; color: white; font-size: 12px; margin-right: 10px;">${s.startTime}</span>` : '';
                
                html += `<li style="${style}; padding: 15px; margin-bottom: 12px;">
                    <strong style="cursor: pointer;" class="task-checkbox" data-id="${s.id}">${checkIcon} ${timeHtml}${s.title}</strong><br>
                    <small style="color: #ccc;">⏱ ${s.expectedDuration} min | ⚡ Priorité: ${s.priority}</small>
                    ${!isCompleted ? resourceLink : ''}
                </li>`;
            });
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
        
        const btnBilan = document.getElementById('btn-show-bilan');
        if (btnBilan) {
            btnBilan.addEventListener('click', () => {
                this.app.showBilan();
            });
        }
    }
}
