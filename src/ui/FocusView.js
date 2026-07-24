export class FocusView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    
    render(session) {
        if (!session) {
            this.container.innerHTML = `
                <h2>⏱️ Mode Focus</h2>
                <div class="stats" style="text-align: center;">
                    <h3>Aucune tâche en cours</h3>
                    <p style="color: #ccc;">Tu n'as plus rien de prévu aujourd'hui ! 🎉</p>
                </div>
            `;
            return;
        }

        this.container.innerHTML = `
            <h2>⏱️ Mode Focus</h2>
            <div class="stats" style="text-align: center;">
                <h3>${session.title}</h3>
                <p style="color: #00f2fe;">Ne te concentre que sur ça.</p>
                <div class="timer">${session.expectedDuration}:00</div>
                <button id="btn-complete-task" style="width: 100%; margin-top: 15px;">✅ Terminer la tâche</button>
            </div>
        `;
    }
}
