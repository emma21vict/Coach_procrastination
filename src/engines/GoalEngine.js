import { AppLogger } from '../utils/AppLogger.js';
import { Goal } from '../models/Goal.js';

export class GoalEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async getActiveGoals() {
        let goalsData = await this.storage.loadData('active_goals');
        if (!goalsData) {
            const g = new Goal("g_1", "Obtenir la certification Cisco", "2026-12-31");
            g.addSubGoal("Module 1 - Réseaux");
            g.addSubGoal("Module 2 - Protocoles");
            goalsData = [g];
            await this.storage.saveData('active_goals', goalsData);
        }
        AppLogger.info("GoalEngine: Objectifs chargés.");
        return goalsData;
    }
}
