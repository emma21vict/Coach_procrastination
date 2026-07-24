export class FocusView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(session) {
        if (!session) {
            this.container.innerHTML = `
                <h2>⏱️ Mode Focus</h2>
                <div class="stats" style="text-align: center;">
                    <h3>Aucune tâche en cours</h3>
                    <p style="color: #ccc;">Tu as terminé tout ton programme d'aujourd'hui ! 🎉</p>
                    <button id="btn-focus-bilan" style="width: 100%; margin-top: 15px; background: #2a5268; color: white;">Faire mon bilan</button>
                </div>
            `;
            const btnBilan = document.getElementById('btn-focus-bilan');
            if (btnBilan) btnBilan.addEventListener('click', () => this.app.showBilan());
            return;
        }

        this.container.innerHTML = `
            <h2>⏱️ Mode Focus</h2>
            <div class="stats" style="text-align: center;">
                <h3>${session.title}</h3>
                <p style="color: #00f2fe;">Ne te concentre que sur ça.</p>
                <div class="timer">${session.expectedDuration}:00</div>
                ${session.resourceLink ? `<a href="${session.resourceLink}" target="_blank" style="color: #00f2fe; display: block; margin-bottom: 20px; font-weight: bold; text-decoration: underline;">🔗 Ouvrir la ressource</a>` : ''}
                <button id="btn-complete-task" data-id="${session.id}" style="width: 100%; margin-top: 15px; background: #00f2fe; color: #0f2027;">✅ Tâche Terminée</button>
            </div>
        `;
        
        const btnComplete = document.getElementById('btn-complete-task');
        if (btnComplete) {
            btnComplete.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                this.app.markSessionCompleted(id);
            });
        }
    }
}
