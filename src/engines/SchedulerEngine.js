import { AppLogger } from '../utils/AppLogger.js';
import { Habit } from '../models/Habit.js';
import { DefaultBootcampProgram } from '../data/BootcampProgram.js';

export class SchedulerEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async getFullProgram() {
        let program = await this.storage.loadData('bootcamp_program');
        
        // MIGRATION : On force le programme de 4 semaines s'il n'est pas complet
        if (program && (!Array.isArray(program) || program.length !== 4)) {
            program = null;
        }
        
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
            new Habit("hab_3", "Journal (Bilan & Objectifs)", "reflection", "Critique", 5, "Soir", 7)
        ];
        
        const skillNames = {
            'english_speaking': 'Anglais',
            'reading': 'Lecture / Culture',
            'reflection': 'Bilan & Planification',
            'cyber_linux': 'Linux',
            'cyber_network': 'Réseau / Cisco',
            'ia_pandas': 'Data / Pandas',
            'data_excel': 'Data / Excel',
            'dev_git': 'Git / GitHub',
            'cyber_osint': 'OSINT',
            'ia_ml': 'Machine Learning',
            'ia_python': 'Python',
            'cyber_tryhackme': 'Cybersécurité',
            'machine_learning': 'Machine Learning'
        };
        mockHabits.forEach(h => h.skillLabel = skillNames[h.skillId] || h.skillId);
        
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
        
        let currentHour = 9;
        let currentMinute = 30;

        const sessionsForToday = todaySessions.map((s, idx) => {
            const startTimeStr = `${currentHour.toString().padStart(2, '0')}h${currentMinute.toString().padStart(2, '0')}`;
            
            // Calculer l'heure de la prochaine session (+ durée + 15m pause)
            let totalMinutes = s.expectedDuration + 15;
            currentMinute += totalMinutes;
            while (currentMinute >= 60) {
                currentHour += 1;
                currentMinute -= 60;
                
                // Pause déjeuner si on dépasse midi (on reprend à 14h)
                if (currentHour === 12) {
                    currentHour = 14;
                    currentMinute = 0;
                }
            }
            
            return {
                id: `sess_${dateStr}_${idx}`,
                title: s.title,
                skillId: s.skillId,
                skillLabel: skillNames[s.skillId] || 'Général',
                expectedDuration: s.expectedDuration,
                priority: s.priority || "Normale",
                resourceLink: s.resourceLink,
                startTime: startTimeStr
            };
        });

        AppLogger.info(`Scheduler: ${mockHabits.length} habitudes et ${sessionsForToday.length} sessions générées.`);
        return { habits: mockHabits, sessions: sessionsForToday };
    }

    generateDefaultProgram() {
        return DefaultBootcampProgram;
    }
}
