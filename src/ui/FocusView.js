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
                    <button id="btn-focus-bilan" style="width: 100%; margin-top: 15px; background: #2a5268; color: white;">Faire mon Bilan</button>
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
                <div class="timer">${session.expectedDuration}:00</div>
                ${session.resourceLink ? `<a href="${session.resourceLink}" target="_blank" style="color: #00f2fe; display: block; margin-bottom: 20px;">🔗 Ouvrir la ressource</a>` : ''}
                
                <div id="focus-evaluation" style="display: none; text-align: left; margin-top: 20px; border-top: 1px solid #2a5268; padding-top: 15px;">
                    <p style="margin-bottom: 10px; color:#88a7b7;">Bilan de la tâche :</p>
                    
                    <label>Statut</label>
                    <select id="f-status" style="width:100%; margin-bottom:10px; padding:5px; background:#0f2027; color:white; border:1px solid #2a5268;">
                        <option value="completed">✔ Terminée (100%)</option>
                        <option value="partial">⏳ Partielle (Inachevée)</option>
                        <option value="skipped">⏭ Ignorée (Sautée)</option>
                        <option value="cancelled">❌ Annulée</option>
                    </select>

                    <div style="background: #152b36; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                        <label style="display:block; font-weight:bold; margin-bottom:5px;">Preuve (Proof)</label>
                        <select id="f-proof-type" style="width:100%; margin-bottom:5px; padding:5px; background:#0f2027; color:white; border:1px solid #2a5268;">
                            <option value="">-- Aucune --</option>
                            <option value="GitHub Commit">GitHub Commit</option>
                            <option value="Certificat">Certificat</option>
                            <option value="Projet">Lien de Projet</option>
                            <option value="Note">Note / Résumé</option>
                        </select>
                        <input type="text" id="f-proof-url" placeholder="URL (optionnel)" style="width:100%; margin-bottom:5px; padding:5px; background:#0f2027; color:white; border:1px solid #2a5268;">
                        <input type="text" id="f-proof-desc" placeholder="Description courte" style="width:100%; padding:5px; background:#0f2027; color:white; border:1px solid #2a5268;">
                    </div>

                    <label>Qualité (1-5)</label><input type="range" id="f-quality" min="1" max="5" value="3" style="width:100%; margin-bottom:10px;">
                    <label>Énergie (1-5)</label><input type="range" id="f-energy" min="1" max="5" value="3" style="width:100%; margin-bottom:10px;">
                    
                    <button id="btn-confirm-task" data-id="${session.id}" style="width: 100%; margin-top: 15px; background: #00f2fe; color: #0f2027;">Valider et Enregistrer</button>
                </div>

                <button id="btn-pre-complete-task" style="width: 100%; margin-top: 15px; background: #00f2fe; color: #0f2027;">✅ Tâche Terminée ou Stoppée</button>
            </div>
        `;
        
        const btnPreComplete = document.getElementById('btn-pre-complete-task');
        const evalSection = document.getElementById('focus-evaluation');
        const btnConfirm = document.getElementById('btn-confirm-task');

        if (btnPreComplete) {
            btnPreComplete.addEventListener('click', () => {
                btnPreComplete.style.display = 'none';
                evalSection.style.display = 'block';
            });
        }

        if (btnConfirm) {
            btnConfirm.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const proofType = document.getElementById('f-proof-type').value;
                let proofObj = null;
                if (proofType) {
                    proofObj = {
                        type: proofType,
                        url: document.getElementById('f-proof-url').value,
                        description: document.getElementById('f-proof-desc').value,
                        date: new Date().toLocaleDateString('fr-CA'),
                        source: session.title
                    };
                }
                
                const metrics = {
                    status: document.getElementById('f-status').value,
                    proof: proofObj,
                    quality: parseInt(document.getElementById('f-quality').value),
                    energy: parseInt(document.getElementById('f-energy').value)
                };
                this.app.markSessionCompleted(id, metrics);
            });
        }
    }
}
