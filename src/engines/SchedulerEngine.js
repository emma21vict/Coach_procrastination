import { AppLogger } from '../utils/AppLogger.js';
import { Habit } from '../models/Habit.js';

export class SchedulerEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async generateDailyPlan(dateStr) {
        AppLogger.info(`Scheduler: Génération du planning pour la date ${dateStr}`);
        
        // MVP: Mock pour la V1.2 (Habits + Sessions)
        const mockHabits = [
            new Habit("hab_1", "Shadowing", "english_speaking", "Élevée", 15, "Matin", 7),
            new Habit("hab_2", "Lecture", "reading", "Moyenne", 20, "Soir", 5),
            new Habit("hab_3", "Journal", "reflection", "Critique", 5, "Soir", 7)
        ];
        
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
            }
        ];
        
        AppLogger.info(`Scheduler: ${mockHabits.length} habitudes et ${mockSessions.length} sessions générées.`);
        return { habits: mockHabits, sessions: mockSessions };
    }
}
