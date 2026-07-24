export class DashboardView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    
    render(state) {
        this.container.innerHTML = `
            <h2>🏠 Dashboard</h2>
            <div class="stats">
                <p>Niveau d'énergie actuel : <strong>Moyenne</strong></p>
                <p>Progression Bootcamp : <strong>0 %</strong></p>
                <p>XP Total : <strong>0</strong></p>
                <p>Série (Streak) : <strong>🔥 1 Jour</strong></p>
            </div>
            <div class="stats">
                <h3>Citation du Jour</h3>
                <p><em>"Discipline beats motivation."</em></p>
            </div>
        `;
    }
}
