export class JournalView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(journalData = null) {
        const mood = journalData?.mood || 3;
        const energy = journalData?.energy || 3;
        const learned = journalData?.learned || "";
        const blockers = journalData?.blockers || "";
        const improve = journalData?.improve || "";
        
        this.container.innerHTML = `
            <h2>📖 Journal Personnel</h2>
            <div class="stats">
                <p style="font-size: 14px; color: #88a7b7;">Étape 2/2 - Le bilan qualitatif.</p>
                
                <label style="display:block; margin-top:10px;">Humeur Globale (1-5)</label>
                <input type="range" id="j-mood" min="1" max="5" value="${mood}" style="width:100%;">
                
                <label style="display:block; margin-top:10px;">Énergie Globale (1-5)</label>
                <input type="range" id="j-energy" min="1" max="5" value="${energy}" style="width:100%;">
                
                <label style="display:block; margin-top:10px;">Aujourd'hui j'ai appris :</label>
                <textarea id="j-learned" rows="2" style="width:100%; background:#0f2027; color:white; border:1px solid #2a5268; border-radius:5px; padding:5px;">${learned}</textarea>
                
                <label style="display:block; margin-top:10px;">Qu'est-ce qui m'a bloqué ?</label>
                <textarea id="j-blockers" rows="2" style="width:100%; background:#0f2027; color:white; border:1px solid #2a5268; border-radius:5px; padding:5px;">${blockers}</textarea>
                
                <label style="display:block; margin-top:10px;">Que vais-je améliorer demain ?</label>
                <textarea id="j-improve" rows="2" style="width:100%; background:#0f2027; color:white; border:1px solid #2a5268; border-radius:5px; padding:5px;">${improve}</textarea>
                
                <button id="btn-save-journal" style="width:100%; margin-top:20px; background:#00f2fe; color:#0f2027;">Sauvegarder mon Journal</button>
            </div>
        `;
        
        const btnSave = document.getElementById('btn-save-journal');
        if (btnSave) {
            btnSave.addEventListener('click', () => {
                const data = {
                    mood: parseInt(document.getElementById('j-mood').value),
                    energy: parseInt(document.getElementById('j-energy').value),
                    learned: document.getElementById('j-learned').value,
                    blockers: document.getElementById('j-blockers').value,
                    improve: document.getElementById('j-improve').value
                };
                this.app.saveJournal(data);
                btnSave.innerText = "✅ Sauvegardé !";
                btnSave.style.background = "#2a5268";
                btnSave.style.color = "white";
                setTimeout(() => {
                    this.app.renderView('dashboard');
                }, 1000);
            });
        }
    }
}
