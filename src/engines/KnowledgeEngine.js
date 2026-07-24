import { AppLogger } from '../utils/AppLogger.js';
import { KnowledgeNode } from '../models/KnowledgeNode.js';

export class KnowledgeEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
        this.nodes = {
            'english_speaking': new KnowledgeNode('english_speaking', 'Anglais'),
            'cyber_linux': new KnowledgeNode('cyber_linux', 'Linux'),
            'machine_learning': new KnowledgeNode('machine_learning', 'Machine Learning')
        };
    }
    
    async evaluateGraph() {
        const history = await this.storage.loadData('study_history') || [];
        
        for(let key in this.nodes) {
            this.nodes[key].estimatedLevel = 0;
            this.nodes[key].totalDuration = 0;
        }

        history.forEach(r => {
            if ((r.status === 'completed' || r.status === 'partial') && r.skillId && this.nodes[r.skillId]) {
                const node = this.nodes[r.skillId];
                node.totalDuration += r.actualDuration;
                node.lastPracticed = r.date;
                node.estimatedLevel = Math.min(100, Math.floor(node.totalDuration / 10)); // 1% = 10 minutes
            }
        });
        
        AppLogger.info("KnowledgeEngine: Graphe évalué.");
        return Object.values(this.nodes);
    }
}
