export class FocusView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
        this.timerInterval = null;
        this.currentSessionId = null;
        this.focusEndTime = null;
        this.openedResourceWindow = null;
    }

    triggerTimeUpAlert(sessionTitle) {
        // 1. Fermer l'onglet externe du cours s'il a été ouvert par le chrono
        try {
            if (this.openedResourceWindow && !this.openedResourceWindow.closed) {
                this.openedResourceWindow.close();
                console.log("Onglet de ressource fermé automatiquement par la fin du chrono.");
            }
        } catch(e) {
            console.warn("Fermeture onglet externe : " + e.message);
        }

        // 2. Ramener le focus sur l'application
        try { window.focus(); } catch(e) {}

        // 3. Alerte sonore (Carillon de fin de session via AudioContext)
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const playBeep = (freq, startTime, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
                gain.gain.setValueAtTime(0.3, ctx.currentTime + startTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(ctx.currentTime + startTime);
                osc.stop(ctx.currentTime + startTime + duration);
            };
            playBeep(880, 0, 0.3);      // A5
            playBeep(880, 0.4, 0.3);    // A5
            playBeep(1320, 0.8, 0.6);   // E6
        } catch(e) {
            console.warn("Audio non supporté : " + e.message);
        }

        // 4. Notification native Bureau
        if ('Notification' in window && Notification.permission === 'granted') {
            try {
                const n = new Notification("⏰ Temps écoulé : " + sessionTitle, {
                    body: "Ton chrono est terminé ! Le site du cours a été fermé. Reviens sur Coach Procrastination pour valider ton XP !",
                    icon: "https://emma21vict.github.io/Coach_procrastination/favicon.ico"
                });
                n.onclick = () => {
                    window.focus();
                    n.close();
                };
            } catch(e) {}
        }
    }
    
    render(session) {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        if (!session) {
            this.container.innerHTML = `
                <h2>⏱️ Mode Focus</h2>
                <div class="stats" style="text-align: center;">
                    <h3>Toutes les sessions sont terminées ! 🎉</h3>
                    <button id="btn-focus-bilan" style="width: 100%; margin-top: 15px; background: #2a5268; color: white;">Faire mon Bilan</button>
                    <button id="btn-focus-back" style="width: 100%; margin-top: 10px; background: transparent; color: #00f2fe; border: 1px solid #00f2fe;">Retour au Planning</button>
                </div>
            `;
            const btnBilan = document.getElementById('btn-focus-bilan');
            if (btnBilan) btnBilan.addEventListener('click', () => this.app.showBilan());
            
            const btnBack = document.getElementById('btn-focus-back');
            if (btnBack) btnBack.addEventListener('click', () => this.app.renderView('planning'));
            
            return;
        }

        this.container.innerHTML = `
            <h2>⏱️ Mode Focus</h2>
            <div class="stats" style="text-align: center;">
                <h3 style="color: #ff9800; font-size: 20px;">${session.title}</h3>
                <div style="font-size: 14px; color: #88a7b7; margin-bottom: 5px;">🎯 Objectif : ${session.objective || session.skillLabel || ''}</div>
                ${session.expectedResult ? `<div style="font-size: 14px; color: #4CAF50; margin-bottom: 15px;">📌 Résultat attendu : ${session.expectedResult}</div>` : ''}
                <div id="focus-timer-display" style="font-size: 48px; font-weight: bold; color: #00f2fe; text-shadow: 0 0 10px rgba(0,242,254,0.5); margin: 20px 0;">
                    ${session.expectedDuration}:00
                </div>

                <div id="focus-warning-banner" style="display: none; background: #3e2723; border: 1px solid #ff9800; color: #ffbc00; padding: 12px; border-radius: 8px; margin-bottom: 15px; font-size: 14px;">
                    ⏳ <strong>Attention : Plus que 15 minutes !</strong><br>
                    Veux-tu prolonger ton temps avant la fermeture automatique du cours ?
                </div>

                <div id="focus-time-extensions" style="margin-bottom: 20px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                    <button class="btn-extend-time" data-min="10" style="background: #152b36; color: #00f2fe; border: 1px solid #00f2fe; padding: 6px 14px; border-radius: 15px; cursor: pointer; font-size: 13px; font-weight: bold;">⏱️ +10 min</button>
                    <button class="btn-extend-time" data-min="15" style="background: #152b36; color: #ff9800; border: 1px solid #ff9800; padding: 6px 14px; border-radius: 15px; cursor: pointer; font-size: 13px; font-weight: bold;">⏱️ +15 min</button>
                    <button class="btn-extend-time" data-min="30" style="background: #152b36; color: #4CAF50; border: 1px solid #4CAF50; padding: 6px 14px; border-radius: 15px; cursor: pointer; font-size: 13px; font-weight: bold;">⏱️ +30 min</button>
                </div>

                ${session.resourceLink ? `<button id="btn-open-resource" data-url="${session.resourceLink}" style="background: #2a5268; color: #00f2fe; border: 1px solid #00f2fe; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 14px; margin-bottom: 20px; font-weight: bold; box-shadow: 0 4px 15px rgba(0,242,254,0.2);">🔗 Ouvrir le cours certifiant (Fermeture automatique à la fin du chrono)</button>` : ''}
                
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
                            <option value="Capture">Capture / Photo</option>
                            <option value="Note">Note / Résumé</option>
                        </select>
                        <input type="text" id="f-proof-url" placeholder="URL (optionnel)" style="width:100%; margin-bottom:5px; padding:5px; background:#0f2027; color:white; border:1px solid #2a5268;">
                        <input type="text" id="f-proof-desc" placeholder="Description courte" style="width:100%; padding:5px; background:#0f2027; color:white; border:1px solid #2a5268;">
                    </div>
                    
                    <label>Niveau de maîtrise</label>
                    <select id="f-actual-difficulty" style="width:100%; margin-bottom:10px; padding:5px; background:#0f2027; color:white; border:1px solid #2a5268;">
                        <option value="🟢" ${session.difficulty === '🟢' ? 'selected' : ''}>🟢 Je maîtrise</option>
                        <option value="🟡" ${session.difficulty === '🟡' ? 'selected' : ''}>🟡 À revoir</option>
                        <option value="🔴" ${session.difficulty === '🔴' ? 'selected' : ''}>🔴 Je n'ai pas compris</option>
                    </select>

                    <label style="display:block; font-weight:bold; margin-bottom:5px;">Commentaire / Réflexion</label>
                    <textarea id="f-reflection" placeholder="Ex: J'ai compris les boucles mais je dois revoir les listes..." style="width:100%; padding:5px; background:#0f2027; color:white; border:1px solid #2a5268; margin-bottom:10px; height:60px;"></textarea>

                    <label>Qualité (1-5)</label><input type="range" id="f-quality" min="1" max="5" value="3" style="width:100%; margin-bottom:10px;">
                    <label>Énergie (1-5)</label><input type="range" id="f-energy" min="1" max="5" value="3" style="width:100%; margin-bottom:10px;">
                    
                    <button id="btn-confirm-task" data-id="${session.id}" style="width: 100%; margin-top: 15px; background: #00f2fe; color: #0f2027;">Valider et Enregistrer</button>
                </div>

                <button id="btn-pre-complete-task" style="width: 100%; margin-top: 15px; background: #00f2fe; color: #0f2027;">✅ Tâche Terminée ou Stoppée</button>
            </div>
        `;
        
        const btnOpenResource = document.getElementById('btn-open-resource');
        if (btnOpenResource) {
            btnOpenResource.addEventListener('click', (e) => {
                const url = e.currentTarget.getAttribute('data-url');
                this.openedResourceWindow = window.open(url, '_blank');
                if ('Notification' in window && Notification.permission !== 'granted') {
                    try { Notification.requestPermission(); } catch(err) {}
                }
            });
        }

        const extendButtons = document.querySelectorAll('.btn-extend-time');
        extendButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const addMin = parseInt(e.currentTarget.getAttribute('data-min'), 10);
                this.focusEndTime += addMin * 60 * 1000;
                remainingSeconds = Math.max(0, Math.floor((this.focusEndTime - Date.now()) / 1000));
                updateTimerDisplay();
                
                const banner = document.getElementById('focus-warning-banner');
                if (banner) banner.style.display = 'none';
                
                if (remainingSeconds > 900) {
                    this.hasWarned15Min = false;
                }
                
                const originalText = btn.textContent;
                btn.textContent = `✔ +${addMin}m ajoutées !`;
                btn.style.background = "#2a5268";
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = "#152b36";
                }, 1500);
            });
        });

        const btnPreComplete = document.getElementById('btn-pre-complete-task');
        const evalSection = document.getElementById('focus-evaluation');
        const btnConfirm = document.getElementById('btn-confirm-task');
        const timerDisplay = document.getElementById('focus-timer-display');

        if (this.currentSessionId !== session.id || !this.focusEndTime) {
            this.currentSessionId = session.id;
            this.focusEndTime = Date.now() + (session.expectedDuration * 60 * 1000);
            this.hasWarned15Min = false;
        }

        let remainingSeconds = Math.max(0, Math.floor((this.focusEndTime - Date.now()) / 1000));
        
        const updateTimerDisplay = () => {
            const m = Math.floor(remainingSeconds / 60);
            const s = remainingSeconds % 60;
            timerDisplay.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        // Initial display update
        updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            remainingSeconds = Math.max(0, Math.floor((this.focusEndTime - Date.now()) / 1000));
            if (remainingSeconds > 0) {
                updateTimerDisplay();
                if (remainingSeconds <= 900 && remainingSeconds > 895 && !this.hasWarned15Min) {
                    this.hasWarned15Min = true;
                    const banner = document.getElementById('focus-warning-banner');
                    if (banner) banner.style.display = 'block';

                    try {
                        const ctx = new (window.AudioContext || window.webkitAudioContext)();
                        const playDing = (freq, duration) => {
                            const osc = ctx.createOscillator();
                            const gain = ctx.createGain();
                            osc.type = 'triangle';
                            osc.frequency.setValueAtTime(freq, ctx.currentTime);
                            gain.gain.setValueAtTime(0.25, ctx.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
                            osc.connect(gain);
                            gain.connect(ctx.destination);
                            osc.start();
                            osc.stop(ctx.currentTime + duration);
                        };
                        playDing(660, 0.6); // E5 doux
                    } catch(e) {}

                    if ('Notification' in window && Notification.permission === 'granted') {
                        try {
                            new Notification("⏳ Plus que 15 minutes : " + session.title, {
                                body: "Il reste 15 minutes au chrono ! Tu peux prolonger ton temps (+10m, +15m, +30m) si tu as besoin d'avancer encore.",
                                icon: "https://emma21vict.github.io/Coach_procrastination/favicon.ico"
                            });
                        } catch(e) {}
                    }
                }
            } else {
                clearInterval(this.timerInterval);
                updateTimerDisplay();
                timerDisplay.style.color = '#ff9800';
                timerDisplay.style.textShadow = '0 0 10px rgba(255,152,0,0.5)';
                this.triggerTimeUpAlert(session.title);
                // Auto-show evaluation when time is up
                if (btnPreComplete && evalSection.style.display === 'none') {
                    btnPreComplete.click();
                }
            }
        }, 1000);

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
                    difficulty: document.getElementById('f-actual-difficulty').value,
                    reflection: document.getElementById('f-reflection').value,
                    quality: parseInt(document.getElementById('f-quality').value),
                    energy: parseInt(document.getElementById('f-energy').value)
                };
                
                // Clear state when session is completed
                this.currentSessionId = null;
                this.focusEndTime = null;

                this.app.markSessionCompleted(id, metrics);
            });
        }
    }
}
