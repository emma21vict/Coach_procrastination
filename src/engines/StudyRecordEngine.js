import { AppLogger } from '../utils/AppLogger.js';
import { StudyRecord } from '../models/StudyRecord.js';

export class StudyRecordEngine {
    constructor(storageProvider, xpEngine) {
        this.storage = storageProvider;
        this.xpEngine = xpEngine;
    }
    
    async completeSession(session, quality = 5) {
        AppLogger.info(`StudyRecordEngine: Enregistrement de la session ${session.title}`);
        
        // Calcul de l'XP
        // Par défaut: difficulté normale (1.2), completionRate (1.0), streak (1)
        const difficulty = session.priority === 'Haute' ? 1.5 : (session.priority === 'Critique' ? 2.0 : 1.2);
        const xpEarned = this.xpEngine.constructor.calculateXP(10, difficulty, 1.0, quality, 1);
        
        // Création du StudyRecord
        const record = new StudyRecord(
            `rec_${Date.now()}`,
            session.id,
            new Date().toISOString().split('T')[0],
            new Date().toISOString()
        );
        record.finish(new Date().toISOString(), session.expectedDuration, true, quality, "Terminé via UI");
        record.xpEarned = xpEarned;
        
        // Sauvegarde de l'historique
        let history = await this.storage.loadData('study_history') || [];
        history.push(record);
        await this.storage.saveData('study_history', history);
        
        // Mise à jour de l'XP Totale du User
        let user = await this.storage.loadData('user_profile') || { xpTotal: 0, streak: 1 };
        user.xpTotal += xpEarned;
        await this.storage.saveData('user_profile', user);
        
        AppLogger.info(`StudyRecordEngine: Session terminée. +${xpEarned} XP (Total: ${user.xpTotal} XP)`);
        return { record, user };
    }
    
    async getDailyStats(dateStr) {
        const history = await this.storage.loadData('study_history') || [];
        const dailyRecords = history.filter(r => r.date === dateStr);
        
        const xpTotal = dailyRecords.reduce((sum, r) => sum + r.xpEarned, 0);
        const focusTime = dailyRecords.reduce((sum, r) => sum + r.realDuration, 0);
        
        return {
            completedTasksCount: dailyRecords.length,
            xpTotal,
            focusTime
        };
    }
}
