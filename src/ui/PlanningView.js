export class PlanningView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    
    render(sessions) {
        let html = '<h2>📅 Planning du Jour</h2><ul class="session-list">';
        sessions.forEach(s => {
            html += `<li>
                <strong>${s.title}</strong><br>
                <small style="color: #ccc;">⏱ ${s.expectedDuration} min | ⚡ Priorité: ${s.priority}</small>
            </li>`;
        });
        html += '</ul>';
        this.container.innerHTML = html;
    }
}
