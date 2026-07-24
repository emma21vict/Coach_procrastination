export class Session {
    constructor(id, skillId, expectedDuration, energyRequired = 'Moyenne', priority = 'Normale', resourceId) {
        this.id = id;
        this.skillId = skillId;
        this.expectedDuration = expectedDuration; // In minutes
        this.energyRequired = energyRequired; // 'Faible', 'Moyenne', 'Élevée'
        this.priority = priority; // 'Basse', 'Normale', 'Haute', 'Critique'
        this.resourceId = resourceId;
    }
}
