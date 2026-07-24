import { AppLogger } from '../utils/AppLogger.js';

export class XPEngine {
    static calculateXP(baseXP, difficulty, completionRate, quality, streakBonus) {
        AppLogger.info(`XP: Calcul en cours (Base:${baseXP}, Diff:${difficulty}, Comp:${completionRate}, Qual:${quality}, Streak:${streakBonus})`);
        
        // Formule: baseXP × difficulty × completionRate × quality × streakBonus
        const difficultyFactor = difficulty || 1;
        const qualityFactor = quality ? (quality / 5) : 1;
        const completionFactor = completionRate || 0;
        
        const xp = baseXP * difficultyFactor * completionFactor * qualityFactor * streakBonus;
        const roundedXp = Math.round(xp);
        
        AppLogger.info(`XP: Points gagnés = ${roundedXp}`);
        return roundedXp;
    }
}
