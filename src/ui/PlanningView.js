export class PlanningView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(sessions) {
        let html = '<h2>📅 Planning du Jour</h2><ul class="session-list">';
        sessions.forEach(s => {
            const isCompleted = s.completed;
            const style = isCompleted ? 'text-decoration: line-through; opacity: 0.5;' : '';
            const checkIcon = isCompleted ? '✅' : '⬜';
            const resourceLink = s.resourceLink ? `<br><a href="${s.resourceLink}" target="_blank" style="color: #00f2fe; text-decoration: none; font-size:14px; display:inline-block; margin-top:5px;">🔗 Ouvrir la ressource</a>` : '';
            
            html += `<li style="${style}">
                <strong style="cursor: pointer;" class="task-checkbox" data-id="${s.id}">${checkIcon} ${s.title}</strong><br>
                <small style="color: #ccc;">⏱ ${s.expectedDuration} min | ⚡ Priorité: ${s.priority}</small>
                ${!isCompleted ? resourceLink : ''}
            </li>`;
        });
        html += '</ul>';
        html += '<button id="btn-show-bilan" style="width:100%; margin-top:20px; background:#2a5268; color:white;">Voir le Bilan de fin de journée</button>';
        this.container.innerHTML = html;
        
        // Add event listeners
        this.container.querySelectorAll('.task-checkbox').forEach(el => {
            el.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                this.app.markSessionCompleted(id);
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
