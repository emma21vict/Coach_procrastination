import { AppLogger } from '../utils/AppLogger.js';

export class SchedulerEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async generateDailyPlan(dateStr) {
        AppLogger.info(`Scheduler: Génération du planning pour la date ${dateStr}`);
        
        // MVP: Mock pour la V1 (avec des vraies ressources pour tester l'interactivité)
        const mockSessions = [
            {
                id: "sess_1",
                title: "TryHackMe - Linux Basics",
                skillId: "cyber_linux",
                expectedDuration: 25,
                priority: "Haute",
                resourceLink: "https://tryhackme.com"
            },
            {
                id: "sess_2",
                title: "Busuu - Leçon d'Anglais",
                skillId: "english_speaking",
                expectedDuration: 15,
                priority: "Normale",
                resourceLink: "https://www.busuu.com"
            },
            {
                id: "sess_3",
                title: "GitHub Skills",
                skillId: "git_basics",
                expectedDuration: 10,
                priority: "Normale",
                resourceLink: "https://skills.github.com"
            }
        ];
        
        AppLogger.info(`Scheduler: ${mockSessions.length} sessions générées.`);
        return mockSessions;
    }
}
