import { AppLogger } from '../utils/AppLogger.js';
import { LearningNode } from '../models/LearningNode.js';

export class LearningGraphEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
        this.nodes = {
            'english_speaking': new LearningNode('english_speaking', '🇬🇧 Anglais & Éloquence'),
            'cyber': new LearningNode('cyber', '🛡️ Cybersécurité & Réseau'),
            'ia': new LearningNode('ia', '🤖 Intelligence Artificielle & Code'),
            'excel': new LearningNode('excel', '📊 Excel & Data Analysis'),
            'force_n': new LearningNode('force_n', '🎓 Projets Force-N'),
            'reflection': new LearningNode('reflection', '🌿 Développement Perso & Agenda')
        };

        this.categoryMap = {
            'english_speaking': 'english_speaking',
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
            'data_excel': 'excel',
            'force_n': 'force_n',
            'reflection': 'reflection'
        };
    }
    
    async evaluateGraph() {
        const history = await this.storage.loadData('study_history') || [];
        
        for(let key in this.nodes) {
            this.nodes[key].level = 0;
            this.nodes[key].confidence = 0;
            this.nodes[key].proofs = [];
            this.nodes[key].hours = 0; // Ajout d'une propriété d'heures pour chaque domaine
        }

        history.forEach(r => {
            if (r.status === 'completed' || r.status === 'partial') {
                const rawSkillId = r.skillId || 'reflection';
                const catId = this.categoryMap[rawSkillId] || rawSkillId;
                
                if (this.nodes[catId]) {
                    const node = this.nodes[catId];
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
        return Object.values(this.nodes);
    }
}
