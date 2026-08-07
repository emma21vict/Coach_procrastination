export class AgentView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render() {
        // Ajouter keyframes pour le spinner si pas existant
        if (!document.getElementById('spinner-style')) {
            const style = document.createElement('style');
            style.id = 'spinner-style';
            style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }

        this.container.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto; background: linear-gradient(135deg, #152b36 0%, #0c1921 100%); border: 2px solid #00f2fe; border-radius: 15px; padding: 25px; box-shadow: 0 8px 25px rgba(0,0,0,0.4);">
            <div style="text-align:center; margin-bottom: 20px;">
                <h2 style="color: #00f2fe; margin: 0; font-size: 26px;">🤖 Coach IA</h2>
                <p style="color: #88a7b7; font-size: 14px; margin-top: 5px;">Générateur de Bootcamp sur-mesure via Gemini 1.5 Flash</p>
            </div>
            
            <div id="agent-form-container">
                <div style="margin-bottom: 15px;">
                    <label style="color: #e0e0e0; font-size: 13px; font-weight: bold;">Clé API Gemini (Google) :</label>
                    <input type="password" id="agent-apikey" placeholder="AIzaSy..." style="width: 100%; box-sizing: border-box; padding: 10px; border-radius: 8px; border: 1px solid #2a5268; background: #0f2027; color: white; margin-top: 5px;" />
                    <p style="font-size: 11px; color: #88a7b7; margin: 4px 0 0 0;">Votre clé reste strictement locale.</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="color: #e0e0e0; font-size: 13px; font-weight: bold;">Objectif principal d'apprentissage :</label>
                    <input type="text" id="agent-goal" placeholder="Ex: Devenir développeur web React" style="width: 100%; box-sizing: border-box; padding: 10px; border-radius: 8px; border: 1px solid #2a5268; background: #0f2027; color: white; margin-top: 5px;" />
                </div>
                
                <div style="display: flex; gap: 15px; margin-bottom: 25px;">
                    <div style="flex: 1;">
                        <label style="color: #e0e0e0; font-size: 13px; font-weight: bold;">Durée (Semaines) :</label>
                        <input type="number" id="agent-weeks" value="4" min="1" max="12" style="width: 100%; box-sizing: border-box; padding: 10px; border-radius: 8px; border: 1px solid #2a5268; background: #0f2027; color: white; margin-top: 5px;" />
                    </div>
                    <div style="flex: 1;">
                        <label style="color: #e0e0e0; font-size: 13px; font-weight: bold;">Heures par jour :</label>
                        <input type="number" id="agent-hours" value="2" min="1" max="12" style="width: 100%; box-sizing: border-box; padding: 10px; border-radius: 8px; border: 1px solid #2a5268; background: #0f2027; color: white; margin-top: 5px;" />
                    </div>
                </div>
                
                <button id="btn-generate-bootcamp" style="width: 100%; background: linear-gradient(90deg, #00f2fe, #4facfe); color: #0f2027; font-weight: bold; border: none; padding: 12px; border-radius: 20px; cursor: pointer; font-size: 16px; box-shadow: 0 4px 15px rgba(0,242,254,0.4);">
                    ✨ Générer mon programme sur mesure
                </button>
            </div>
            
            <div id="agent-loading-container" style="display: none; text-align: center; padding: 20px 0;">
                <div style="width: 40px; height: 40px; border: 4px solid rgba(0,242,254,0.2); border-left-color: #00f2fe; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px auto;"></div>
                <h3 style="color: #00f2fe; margin: 0;">L'IA conçoit votre programme...</h3>
                <p style="color: #88a7b7; font-size: 13px; margin-top: 5px;">Veuillez patienter (environ 15 à 30 secondes)</p>
            </div>
        </div>
        `;

        this.attachEvents();
    }
    
    attachEvents() {
        const btnGen = document.getElementById('btn-generate-bootcamp');
        if (btnGen) {
            btnGen.addEventListener('click', async () => {
                const apiKey = document.getElementById('agent-apikey').value.trim();
                const goal = document.getElementById('agent-goal').value.trim();
                const weeks = parseInt(document.getElementById('agent-weeks').value) || 4;
                const hours = parseInt(document.getElementById('agent-hours').value) || 2;
                
                if (!apiKey || !goal) {
                    alert("Veuillez remplir la clé API et votre objectif.");
                    return;
                }
                
                document.getElementById('agent-form-container').style.display = 'none';
                document.getElementById('agent-loading-container').style.display = 'block';
                
                try {
                    await this.app.aiEngine.generateBootcamp(apiKey, goal, weeks, hours);
                    alert("Bootcamp généré avec succès ! L'application va redémarrer.");
                    window.location.reload();
                } catch (e) {
                    alert("Erreur de génération : " + e.message);
                    document.getElementById('agent-form-container').style.display = 'block';
                    document.getElementById('agent-loading-container').style.display = 'none';
                }
            });
        }
    }
}
