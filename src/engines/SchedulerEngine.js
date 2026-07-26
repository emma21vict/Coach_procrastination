import { AppLogger } from '../utils/AppLogger.js';
import { Habit } from '../models/Habit.js';
import { DefaultBootcampProgram } from '../data/BootcampProgram.js?v=4';

export class SchedulerEngine {
    constructor(storageProvider) {
        this.storage = storageProvider;
    }
    
    async getFullProgram() {
        let program = await this.storage.loadData('bootcamp_program');
        const currentVersion = "1.6_semaine2_officielle";
        const savedVersion = await this.storage.loadData('bootcamp_program_version');
        
        // MIGRATION / UPGRADE : Si la version en cache n'est pas la version 1.6_semaine2_officielle ou s'il manque les blocs sur les séances, on remplace par le nouveau programme officiel !
        const hasBlocks = program && Array.isArray(program) && program.length === 4 && program[0] && program[0].days && program[0].days[0] && program[0].days[0].sessions && program[0].days[0].sessions[0] && program[0].days[0].sessions[0].block;
        if (!program || !hasBlocks || savedVersion !== currentVersion) {
            program = this.generateDefaultProgram();
            await this.storage.saveData('bootcamp_program', program);
            await this.storage.saveData('bootcamp_program_version', currentVersion);
            AppLogger.info("Scheduler: Nouveau programme officiel v1.6 Semaine 2 chargé et sauvegardé dans le cache !");
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
        
        const startDate = new Date('2026-07-26T12:00:00');
        const currentObj = new Date(dateStr + 'T12:00:00');
        
        let dayIndex = 0;
        if (currentObj >= startDate) {
            const diffTime = currentObj - startDate;
            dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        }
        
        // On s'assure de ne pas dépasser le programme de 28 jours (index 27)
        dayIndex = Math.min(Math.max(0, dayIndex), 27);
        
        const weekIndex = Math.floor(dayIndex / 7);
        const dayOfWeek = dayIndex % 7;
        
        if (program[weekIndex] && program[weekIndex].days[dayOfWeek]) {
            todaySessions = program[weekIndex].days[dayOfWeek].sessions;
        }
        
        let currentHour = 9;
        let currentMinute = 30;

        const sessionsForToday = todaySessions.map((s, idx) => {
            const startTimeStr = s.startTime || `${currentHour.toString().padStart(2, '0')}h${currentMinute.toString().padStart(2, '0')}`;
            
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
                startTime: startTimeStr,
                objective: s.objective || "",
                expectedResult: s.expectedResult || "",
                proof: s.proof || "",
                difficulty: s.difficulty || "🟢",
                xp: s.xp || 60,
                block: s.block || ""
            };
        });

        AppLogger.info(`Scheduler: ${mockHabits.length} habitudes et ${sessionsForToday.length} sessions générées.`);
        return { date: dateStr, habits: mockHabits, sessions: sessionsForToday };
    }

    generateDefaultProgram() {
        return DefaultBootcampProgram;
    }
}
