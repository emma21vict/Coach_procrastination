import { AppLogger } from '../utils/AppLogger.js';
import { LearningNode } from '../models/LearningNode.js';

export class LearningGraphEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
        this.nodes = {
            'english_speaking': new LearningNode('english_speaking', 'Anglais - Oral'),
            'cyber_linux': new LearningNode('cyber_linux', 'Linux - Fondamentaux'),
            'machine_learning': new LearningNode('machine_learning', 'Machine Learning')
        };
    }
    
    async evaluateGraph() {
        const history = await this.storage.loadData('study_history') || [];
        
        for(let key in this.nodes) {
            this.nodes[key].level = 0;
            this.nodes[key].confidence = 0;
            this.nodes[key].proofs = [];
        }

        history.forEach(r => {
            if ((r.status === 'completed' || r.status === 'partial') && r.skillId && this.nodes[r.skillId]) {
                const node = this.nodes[r.skillId];
                node.lastPractice = r.date;
                node.level = Math.min(100, node.level + Math.floor(r.actualDuration / 20));
                node.confidence = Math.min(100, node.confidence + (r.quality * 2));
                
                if (r.proof && r.proof.url) {
                    node.proofs.push(r.proof);
                }
            }
        });
        
        AppLogger.info("LearningGraphEngine: Graphe d'apprentissage évalué.");
        return Object.values(this.nodes);
    }
}
