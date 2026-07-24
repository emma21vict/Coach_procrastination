import { AppLogger } from '../utils/AppLogger.js';
import { Habit } from '../models/Habit.js';

export class SchedulerEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async getFullProgram() {
        let program = await this.storage.loadData('bootcamp_program');
        if (!program) {
            program = this.generateDefaultProgram();
            await this.storage.saveData('bootcamp_program', program);
        }
        return program;
    }

    async saveFullProgram(program) {
        await this.storage.saveData('bootcamp_program', program);
        AppLogger.info("Scheduler: Programme sauvegardé.");
    }

    async generateDailyPlan(dateStr) {
        AppLogger.info(`Scheduler: Génération du planning pour la date ${dateStr}`);
        
        const mockHabits = [
            new Habit("hab_1", "Shadowing", "english_speaking", "Élevée", 15, "Matin", 7),
            new Habit("hab_2", "Lecture", "reading", "Moyenne", 20, "Soir", 5),
            new Habit("hab_3", "Journal", "reflection", "Critique", 5, "Soir", 7)
        ];
        
        const program = await this.getFullProgram();
        
        let todaySessions = program[0].days[0].sessions;
        
        let user = await this.storage.loadData('user_profile');
        if (user && user.currentBootcampDay !== undefined) {
            const dayIndex = user.currentBootcampDay; // 0 to 27
            const weekIndex = Math.floor(dayIndex / 7);
            const dayOfWeek = dayIndex % 7;
            if (program[weekIndex] && program[weekIndex].days[dayOfWeek]) {
                todaySessions = program[weekIndex].days[dayOfWeek].sessions;
            }
        }
        
        const sessionsForToday = todaySessions.map((s, idx) => ({
            id: `sess_${dateStr}_${idx}`,
            title: s.title,
            skillId: s.skillId,
            expectedDuration: s.expectedDuration,
            priority: s.priority || "Normale",
            resourceLink: s.resourceLink
        }));

        AppLogger.info(`Scheduler: ${mockHabits.length} habitudes et ${sessionsForToday.length} sessions générées.`);
        return { habits: mockHabits, sessions: sessionsForToday };
    }

    generateDefaultProgram() {
        const program = [];
        for (let w = 1; w <= 4; w++) {
            const week = { week: w, days: [] };
            for (let d = 1; d <= 7; d++) {
                week.days.push({
                    day: d,
                    sessions: [
                        { title: `TryHackMe - Module S${w}J${d}`, skillId: 'cyber_linux', expectedDuration: 30, resourceLink: "https://tryhackme.com" },
                        { title: `Busuu - Leçon ${d + (w-1)*7}`, skillId: 'english_speaking', expectedDuration: 15, resourceLink: "https://www.busuu.com" }
                    ]
                });
            }
            program.push(week);
        }
        return program;
    }
}
