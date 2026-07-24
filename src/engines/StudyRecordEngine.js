import { AppLogger } from '../utils/AppLogger.js';
import { StudyRecord } from '../models/StudyRecord.js';

export class StudyRecordEngine {
    constructor(storageProvider, xpEngine) {
        this.storage = storageProvider;
        this.xpEngine = xpEngine;
    }
    
    async completeSession(session, metrics = {}) {
        AppLogger.info(`StudyRecordEngine: Enregistrement complet de la session ${session.title}`);
        
        const quality = metrics.quality || 3;
        const difficulty = session.priority === 'Haute' ? 1.5 : (session.priority === 'Critique' ? 2.0 : 1.2);
        const xpEarned = this.xpEngine.constructor.calculateXP(10, difficulty, 1.0, quality, 1);
        
        const record = new StudyRecord(
            `rec_${Date.now()}`,
            session.id,
            new Date().toLocaleDateString('fr-CA'),
            new Date().toISOString(),
            session.skillId
        );
        
        record.finish(new Date().toISOString(), session.expectedDuration, metrics);
        record.xpEarned = xpEarned;
        
        let history = await this.storage.loadData('study_history') || [];
        history.push(record);
        await this.storage.saveData('study_history', history);
        
        let user = await this.storage.loadData('user_profile') || { xpTotal: 0, streak: 1, lastActive: null };
        user.xpTotal += xpEarned;
        
        const today = new Date().toLocaleDateString('fr-CA');
        if (user.lastActive !== today) {
            user.streak = (user.lastActive === getYesterdayDateString()) ? user.streak + 1 : 1;
            user.lastActive = today;
        }
        await this.storage.saveData('user_profile', user);
        
        AppLogger.info(`StudyRecordEngine: Session terminée avec métriques. +${xpEarned} XP`);
        return { record, user };
    }
    
    async uncompleteSession(sessionId, dateStr) {
        let history = await this.storage.loadData('study_history') || [];
        const recordIndex = history.findIndex(r => r.sessionId === sessionId && r.date === dateStr);
        
        if (recordIndex !== -1) {
            const record = history[recordIndex];
            history.splice(recordIndex, 1);
            await this.storage.saveData('study_history', history);
            
            let user = await this.storage.loadData('user_profile');
            if (user && record.xpEarned) {
                user.xpTotal = Math.max(0, user.xpTotal - record.xpEarned);
                await this.storage.saveData('user_profile', user);
            }
            AppLogger.info(`StudyRecordEngine: Session annulée (${sessionId}), XP retiré.`);
        }
    }
    
    async getDailyStats(dateStr) {
        const history = await this.storage.loadData('study_history') || [];
        const dailyRecords = history.filter(r => r.date === dateStr);
        const xpTotal = dailyRecords.reduce((sum, r) => sum + r.xpEarned, 0);
        const focusTime = dailyRecords.reduce((sum, r) => sum + r.realDuration, 0);
        return { completedTasksCount: dailyRecords.length, xpTotal, focusTime };
    }

    async saveDailyJournal(dateStr, journalData) {
        let journals = await this.storage.loadData('daily_journals') || {};
        journals[dateStr] = journalData;
        await this.storage.saveData('daily_journals', journals);
        AppLogger.info(`StudyRecordEngine: Journal sauvegardé pour la date ${dateStr}`);
    }

    async getJournal(dateStr) {
        let journals = await this.storage.loadData('daily_journals') || {};
        return journals[dateStr] || null;
    }
    
    async getFullHistory() {
        return await this.storage.loadData('study_history') || [];
    }
}

function getYesterdayDateString() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toLocaleDateString('fr-CA');
}
