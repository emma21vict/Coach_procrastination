export class JournalView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
        this.recordedAudioUrl = null;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isRecording = false;
    }
    
    render(journalData = null) {
        const mood = journalData?.mood || 3;
        const energy = journalData?.energy || 3;
        const learned = journalData?.learned || "";
        const blockers = journalData?.blockers || "";
        const improve = journalData?.improve || "";
        const mission1 = journalData?.mission1 || "";
        const mission2 = journalData?.mission2 || "";
        this.recordedAudioUrl = journalData?.voiceNote || null;
        
        this.container.innerHTML = `
            <h2>📖 Journal Personnel & Vocal</h2>
            <div class="stats">
                <p style="font-size: 14px; color: #88a7b7;">Étape 2/2 - Le bilan qualitatif. Vous pouvez écrire ou utiliser la dictée vocale / enregistrement audio.</p>
                
                <!-- PANNEAU OPTION VOCALE (SPEECH-TO-TEXT + ENREGISTREMENT AUDIO) -->
                <div style="background: linear-gradient(135deg, #162c38 0%, #0f2027 100%); border: 2px solid #00f2fe; border-radius: 10px; padding: 15px; margin: 15px 0; box-shadow: 0 4px 15px rgba(0, 242, 254, 0.15);">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                        <div>
                            <h4 style="color: #00f2fe; margin: 0; font-size:16px;">🎙️ Assistant Vocal & Vocaux</h4>
                            <p style="color: #a0b8c4; font-size: 12px; margin: 4px 0 0 0;">Parlez au lieu d'écrire ou enregistrez une note audio.</p>
                        </div>
                        <div style="display:flex; gap:8px; flex-wrap:wrap;">
                            <button id="btn-dictation-general" type="button" style="background:#00f2fe; color:#0f2027; border:none; padding:8px 12px; border-radius:15px; font-weight:bold; cursor:pointer; display:flex; align-items:center; gap:5px; font-size:13px;">
                                🗣️ Dictée vocale
                            </button>
                            <button id="btn-record-voice" type="button" style="background:#ff5722; color:white; border:none; padding:8px 12px; border-radius:15px; font-weight:bold; cursor:pointer; display:flex; align-items:center; gap:5px; font-size:13px;">
                                🔴 Enregistrer un vocal
                            </button>
                        </div>
                    </div>
                    <div id="voice-status" style="margin-top:10px; font-size:13px; color:#ffb74d; display:none; font-weight:bold;">
                        🔴 Écoute en cours... Parlez clairement dans votre micro !
                    </div>
                    <div id="audio-player-container" style="margin-top:12px; ${this.recordedAudioUrl ? '' : 'display:none;'}">
                        <label style="display:block; color:#00f2fe; font-size:13px; font-weight:bold; margin-bottom:5px;">🎧 Ma Note Audio du jour :</label>
                        <audio id="journal-audio-player" controls src="${this.recordedAudioUrl || ''}" style="width:100%; max-height:40px;"></audio>
                        <button type="button" id="btn-delete-audio" style="background:transparent; color:#ff5252; border:1px solid #ff5252; padding:4px 10px; border-radius:8px; font-size:11px; cursor:pointer; margin-top:5px;">🗑️ Supprimer le vocal</button>
                    </div>
                </div>

                <label style="display:block; margin-top:10px;">Humeur Globale (1-5)</label>
                <input type="range" id="j-mood" min="1" max="5" value="${mood}" style="width:100%;">
                
                <label style="display:block; margin-top:10px;">Énergie Globale (1-5)</label>
                <input type="range" id="j-energy" min="1" max="5" value="${energy}" style="width:100%;">
                
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                    <label style="margin:0; font-weight:bold;">Aujourd'hui j'ai appris :</label>
                    <button type="button" class="btn-dictate-field" data-target="j-learned" style="background:#152b36; color:#00f2fe; border:1px solid #00f2fe; border-radius:10px; padding:3px 8px; font-size:11px; cursor:pointer;">🎙️ Dictée</button>
                </div>
                <textarea id="j-learned" rows="2" style="width:100%; background:#0f2027; color:white; border:1px solid #2a5268; border-radius:5px; padding:8px; margin-top:4px;" placeholder="Écrivez ou utilisez 🎙️ Dictée pour parler...">${learned}</textarea>
                
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                    <label style="margin:0; font-weight:bold;">Qu'est-ce qui m'a bloqué ?</label>
                    <button type="button" class="btn-dictate-field" data-target="j-blockers" style="background:#152b36; color:#00f2fe; border:1px solid #00f2fe; border-radius:10px; padding:3px 8px; font-size:11px; cursor:pointer;">🎙️ Dictée</button>
                </div>
                <textarea id="j-blockers" rows="2" style="width:100%; background:#0f2027; color:white; border:1px solid #2a5268; border-radius:5px; padding:8px; margin-top:4px;" placeholder="Qu'est-ce qui a freiné ma journée ?">${blockers}</textarea>
                
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                    <label style="margin:0; font-weight:bold;">Que vais-je améliorer demain ?</label>
                    <button type="button" class="btn-dictate-field" data-target="j-improve" style="background:#152b36; color:#00f2fe; border:1px solid #00f2fe; border-radius:10px; padding:3px 8px; font-size:11px; cursor:pointer;">🎙️ Dictée</button>
                </div>
                <textarea id="j-improve" rows="2" style="width:100%; background:#0f2027; color:white; border:1px solid #2a5268; border-radius:5px; padding:8px; margin-top:4px;" placeholder="Actions d'amélioration pour demain...">${improve}</textarea>
                
                <hr style="border: 0; border-top: 1px solid #2a5268; margin: 20px 0;">
                
                <p style="color: #00f2fe; font-weight: bold; margin-bottom:5px;">📅 Demain</p>
                <label style="display:block;">🎯 Mission principale</label>
                <input type="text" id="j-m1" value="${mission1}" style="width:100%; margin-bottom:10px; background:#0f2027; color:white; border:1px solid #2a5268; border-radius:5px; padding:8px;">
                
                <label style="display:block;">🎯 Mission secondaire</label>
                <input type="text" id="j-m2" value="${mission2}" style="width:100%; background:#0f2027; color:white; border:1px solid #2a5268; border-radius:5px; padding:8px;">

                <button id="btn-save-journal" style="width:100%; margin-top:25px; background:linear-gradient(90deg, #00f2fe, #4facfe); color:#0f2027; font-weight:bold; padding:12px; border:none; border-radius:8px; cursor:pointer; font-size:15px; box-shadow: 0 4px 12px rgba(0,242,254,0.3);">
                    💾 Sauvegarder mon Journal (avec mon vocal)
                </button>
            </div>
        `;
        
        this.attachVoiceEvents();

        const btnSave = document.getElementById('btn-save-journal');
        if (btnSave) {
            btnSave.addEventListener('click', () => {
                const data = {
                    mood: parseInt(document.getElementById('j-mood').value),
                    energy: parseInt(document.getElementById('j-energy').value),
                    learned: document.getElementById('j-learned').value,
                    blockers: document.getElementById('j-blockers').value,
                    improve: document.getElementById('j-improve').value,
                    mission1: document.getElementById('j-m1').value,
                    mission2: document.getElementById('j-m2').value,
                    voiceNote: this.recordedAudioUrl || null
                };
                this.app.saveJournal(data);
                btnSave.innerText = "✅ Sauvegardé !";
                btnSave.style.background = "#2a5268";
                btnSave.style.color = "white";
                setTimeout(() => {
                    this.app.renderView('coach');
                }, 1000);
            });
        }
    }

    attachVoiceEvents() {
        const voiceStatus = document.getElementById('voice-status');
        
        // 1. DICTÉE VOCALE (Speech-to-text sur champ sélectionné ou appris par défaut)
        const startDictation = (targetId = 'j-learned') => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert("Votre navigateur ne supporte pas la dictée vocale native. Utilisez le bouton '🔴 Enregistrer un vocal' pour faire une note audio !");
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = 'fr-FR';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                if (voiceStatus) {
                    voiceStatus.innerText = "🔴 Écoute en cours (Dictée)... Parlez dans votre micro !";
                    voiceStatus.style.display = 'block';
                    voiceStatus.style.color = '#00f2fe';
                }
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                const targetElem = document.getElementById(targetId);
                if (targetElem) {
                    targetElem.value = targetElem.value ? targetElem.value + " " + transcript : transcript;
                }
            };

            recognition.onerror = (event) => {
                if (voiceStatus) {
                    voiceStatus.innerText = "⚠️ Erreur micro : " + event.error;
                    voiceStatus.style.color = '#ff5252';
                }
            };

            recognition.onend = () => {
                if (voiceStatus) {
                    voiceStatus.style.display = 'none';
                }
            };

            recognition.start();
        };

        const btnGeneralDictate = document.getElementById('btn-dictation-general');
        if (btnGeneralDictate) {
            btnGeneralDictate.addEventListener('click', () => startDictation('j-learned'));
        }

        const dictationButtons = document.querySelectorAll('.btn-dictate-field');
        dictationButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = e.currentTarget.getAttribute('data-target');
                startDictation(targetId);
            });
        });

        // 2. ENREGISTREUR VOCAL (Note audio enregistrée dans le journal)
        const btnRecordVoice = document.getElementById('btn-record-voice');
        const audioPlayerContainer = document.getElementById('audio-player-container');
        const audioPlayer = document.getElementById('journal-audio-player');
        const btnDeleteAudio = document.getElementById('btn-delete-audio');

        if (btnRecordVoice) {
            btnRecordVoice.addEventListener('click', async () => {
                if (!this.isRecording) {
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        this.mediaRecorder = new MediaRecorder(stream);
                        this.audioChunks = [];

                        this.mediaRecorder.ondataavailable = (event) => {
                            if (event.data.size > 0) {
                                this.audioChunks.push(event.data);
                            }
                        };

                        this.mediaRecorder.onstop = () => {
                            const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                            const reader = new FileReader();
                            reader.readAsDataURL(audioBlob);
                            reader.onloadend = () => {
                                this.recordedAudioUrl = reader.result;
                                if (audioPlayer && audioPlayerContainer) {
                                    audioPlayer.src = this.recordedAudioUrl;
                                    audioPlayerContainer.style.display = 'block';
                                }
                            };
                            stream.getTracks().forEach(track => track.stop());
                        };

                        this.mediaRecorder.start();
                        this.isRecording = true;
                        btnRecordVoice.innerText = "⏹️ Arrêter l'enregistrement";
                        btnRecordVoice.style.background = "#ff5252";
                        if (voiceStatus) {
                            voiceStatus.innerText = "🔴 ENREGISTREMENT VOCAL EN COURS... Cliquez sur 'Arrêter' quand vous avez fini.";
                            voiceStatus.style.display = 'block';
                            voiceStatus.style.color = '#ff5722';
                        }
                    } catch (err) {
                        alert("Impossible d'accéder au microphone : " + err.message);
                    }
                } else {
                    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                        this.mediaRecorder.stop();
                    }
                    this.isRecording = false;
                    btnRecordVoice.innerText = "🔴 Enregistrer un vocal";
                    btnRecordVoice.style.background = "#ff5722";
                    if (voiceStatus) {
                        voiceStatus.style.display = 'none';
                    }
                }
            });
        }

        if (btnDeleteAudio) {
            btnDeleteAudio.addEventListener('click', () => {
                this.recordedAudioUrl = null;
                if (audioPlayer) audioPlayer.src = "";
                if (audioPlayerContainer) audioPlayerContainer.style.display = 'none';
            });
        }
    }
}
