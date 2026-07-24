import { AppLogger } from '../utils/AppLogger.js';

export class SchedulerEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async generateDailyPlan(dateStr) {
        AppLogger.info(`Scheduler: Génération du planning pour la date ${dateStr}`);
        
        // MVP: Mock pour la V1
        const mockSessions = [
            {
                id: "sess_1",
                title: "Shadowing Anglais",
                skillId: "english_speaking",
                expectedDuration: 25,
                priority: "Haute"
            }
        ];
        
        AppLogger.info(`Scheduler: ${mockSessions.length} sessions générées.`);
        return mockSessions;
    }
}
