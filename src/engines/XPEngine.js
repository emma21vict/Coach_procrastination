export class XPEngine {
    static calculateXP(baseXP, difficulty, completionRate, quality, streakBonus) {
        // Formule: baseXP × difficulty × completionRate × quality × streakBonus
        const difficultyFactor = difficulty || 1;
        const qualityFactor = quality ? (quality / 5) : 1;
        const completionFactor = completionRate || 0;
        
        const xp = baseXP * difficultyFactor * completionFactor * qualityFactor * streakBonus;
        return Math.round(xp);
    }
}
