export class FocusView {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }
    
    render(session) {
        this.container.innerHTML = `
            <h2>⏱️ Mode Focus</h2>
            <div class="stats" style="text-align: center;">
                <h3>${session ? session.title : 'Aucune tâche active'}</h3>
                <p style="color: #00f2fe;">Ne te concentre que sur ça.</p>
                <div class="timer">25:00</div>
                <button id="btn-complete-task" style="width: 100%; margin-top: 15px;">✅ Terminer la tâche</button>
            </div>
        `;
    }
}
