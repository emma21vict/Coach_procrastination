import { AppLogger } from '../utils/AppLogger.js';
import { LearningNode } from '../models/LearningNode.js';

export class LearningGraphEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async evaluateGraph() {
        const history = await this.storage.loadData('study_history') || [];
        const dbSkills = await this.storage.loadData('bootcamp_skills') || [];
        
        let nodes = {};
        
        if (dbSkills.length > 0) {
            dbSkills.forEach(s => {
                nodes[s.id] = new LearningNode(s.id, s.label);
                nodes[s.id].color = s.color || "#00f2fe"; // Garder la trace de la couleur
            });
        } else {
            // Fallback old structure
            nodes = {
                'english_speaking': new LearningNode('english_speaking', '🇬🇧 Anglais & Éloquence'),
                'cyber': new LearningNode('cyber', '🛡️ Cybersécurité & Réseau'),
                'ia': new LearningNode('ia', '🤖 Intelligence Artificielle & Code'),
                'excel': new LearningNode('excel', '📊 Excel & Data Analysis'),
                'force_n': new LearningNode('force_n', '🎓 Projets Force-N'),
                'reflection': new LearningNode('reflection', '🌿 Développement Perso & Agenda')
            };
        }
        
        // Ancienne map de compatibilité au cas où il y a des vieux historiques
        const categoryMap = {
            'eloquence_fr': 'english_speaking',
            'reading': 'english_speaking',
            'cyber_network': 'cyber',
            'cyber_linux': 'cyber',
            'cyber_tryhackme': 'cyber',
            'cyber_osint': 'cyber',
            'ia_python': 'ia',
            'ia_numpy': 'ia',
            'ia_pandas': 'ia',
            'ia_ml': 'ia',
            'dev_git': 'ia',
            'data_excel': 'excel'
        };
        
        for(let key in nodes) {
            nodes[key].level = 0;
            nodes[key].confidence = 0;
            nodes[key].proofs = [];
            nodes[key].hours = 0;
        }

        history.forEach(r => {
            if (r.status === 'completed' || r.status === 'partial') {
                const rawSkillId = r.skillId || 'reflection';
                
                // On essaie de trouver le noeud direct, sinon on tente la fallback map
                let catId = rawSkillId;
                if (!nodes[catId] && categoryMap[catId]) {
                    catId = categoryMap[catId];
                }
                
                if (nodes[catId]) {
                    const node = nodes[catId];
                    node.lastPractice = r.date;
                    // Actual duration est en minutes. 1h = 60 minutes.
                    // level = progression relative (XP)
                    node.level = Math.min(100, node.level + Math.floor(r.actualDuration / 15));
                    node.confidence = Math.min(100, node.confidence + (r.quality * 2));
                    node.hours += (r.actualDuration / 60);
                    
                    if (r.proof && r.proof.url || r.proof && r.proof.image || r.proof && r.proof.type) {
                        node.proofs.push(r.proof);
                    }
                }
            }
        });
        
        AppLogger.info("LearningGraphEngine: Graphe d'apprentissage évalué (avec catégories).");

        return Object.values(nodes);
    }
}
