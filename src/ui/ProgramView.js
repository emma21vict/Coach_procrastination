export class ProgramView {
    constructor(containerId, app) {
        this.container = document.getElementById(containerId);
        this.app = app;
    }
    
    render(programData) {
        if (!programData || programData.length === 0) {
            this.container.innerHTML = "<h2>📅 Programme</h2><p>Aucun programme trouvé.</p>";
            return;
        }

        let html = "<h2>📅 Programme Bootcamp (30 Jours)</h2>";
        
        const skillNames = {
            'english_speaking': 'Anglais',
            'reading': 'Lecture',
            'reflection': 'Bilan',
            'cyber_linux': 'Linux',
            'cyber_network': 'Réseau / Cisco',
            'ia_pandas': 'Pandas',
            'data_excel': 'Excel',
            'dev_git': 'Git/GitHub',
            'cyber_osint': 'OSINT',
            'ia_ml': 'Machine Learning',
            'ia_python': 'Python',
            'cyber_tryhackme': 'Cybersécurité'
        };
        
        programData.forEach((weekObj, wIdx) => {
            html += `
                <div style="background: #152b36; padding: 10px; border-radius: 5px; margin-bottom: 15px; border-left: 5px solid #00f2fe;">
                    <h3 style="margin-bottom: 10px;">Semaine ${weekObj.week}</h3>
                    <div style="display:flex; flex-direction:column; gap:10px;">
            `;
            
            weekObj.days.forEach((dayObj, dIdx) => {
                html += `
                    <div style="background: #0f2027; padding: 10px; border-radius: 5px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px;">
                            <strong style="color: #ff9800;">Jour ${dayObj.day}</strong>
                        </div>
                `;
                dayObj.sessions.forEach((s, sIdx) => {
                    const skillLabel = skillNames[s.skillId] || 'Général';
                    html += `
                        <div style="margin-left: 10px; margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #2a5268;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:14px;">${s.title} <strong style="color:#ff9800; font-size:12px;">(${skillLabel})</strong> - ${s.expectedDuration} min</span>
                                <button class="btn-edit-session" data-w="${wIdx}" data-d="${dIdx}" data-s="${sIdx}" style="background:transparent; border:none; color:#00f2fe; cursor:pointer;">✏️ Éditer</button>
                            </div>
                            ${s.resourceLink ? `<a href="${s.resourceLink}" target="_blank" style="font-size:12px; color:#88a7b7;">🔗 Lien</a>` : ''}
                        </div>
                    `;
                });
                
                html += `
                    <button class="btn-add-session" data-w="${wIdx}" data-d="${dIdx}" style="width:100%; background:#2a5268; color:white; border:none; padding:5px; border-radius:3px; font-size:12px; margin-top:5px; cursor:pointer;">+ Ajouter une tâche</button>
                    </div>
                `;
            });
            html += `</div></div>`;
        });
        
        this.container.innerHTML = html;
        
        this.container.querySelectorAll('.btn-edit-session').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const w = e.target.getAttribute('data-w');
                const d = e.target.getAttribute('data-d');
                const s = e.target.getAttribute('data-s');
                this.openEditModal(programData, w, d, s);
            });
        });
        
        this.container.querySelectorAll('.btn-add-session').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const w = e.target.getAttribute('data-w');
                const d = e.target.getAttribute('data-d');
                this.addSession(programData, w, d);
            });
        });
    }

    openEditModal(programData, w, d, s) {
        const session = programData[w].days[d].sessions[s];
        const newTitle = prompt("Nouveau titre de la session :", session.title);
        if (newTitle !== null) {
            session.title = newTitle;
            const newDuration = prompt("Durée prévue (min) :", session.expectedDuration);
            if (newDuration) session.expectedDuration = parseInt(newDuration);
            const newLink = prompt("Lien de ressource (optionnel) :", session.resourceLink || "");
            if (newLink !== null) session.resourceLink = newLink;
            
            this.app.saveProgram(programData);
        }
    }

    addSession(programData, w, d) {
        const title = prompt("Titre de la nouvelle session :");
        if (title) {
            const duration = prompt("Durée prévue (min) :", "30");
            programData[w].days[d].sessions.push({
                title: title,
                skillId: "cyber_linux",
                expectedDuration: parseInt(duration) || 30,
                resourceLink: ""
            });
            this.app.saveProgram(programData);
        }
    }
}
