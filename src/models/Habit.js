export class Habit {
    constructor(id, title, skillId, importance, minTime, idealTime, weeklyGoal) {
        this.id = id;
        this.title = title;
        this.skillId = skillId;
        this.importance = importance; // 'Faible', 'Moyenne', 'Élevée', 'Critique'
        this.minTime = minTime; // en minutes
        this.idealTime = idealTime; // 'Matin', 'Midi', 'Soir'
        this.weeklyGoal = weeklyGoal; // ex: 7 (tous les jours)
        
        this.streak = 0;
        this.completedToday = false;
    }
}
