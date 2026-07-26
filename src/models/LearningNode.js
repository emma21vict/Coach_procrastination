export class LearningNode {
    constructor(id, skillId, name, parentId = null) {
        this.id = id;
        this.skillId = skillId;
        this.name = name;
        this.parentId = parentId; // e.g. 'linux' is parent of 'permissions'
        
        // Calculated fields (updated by LearningGraphEngine)
        this.mastery = 0; // 0 to 100%
        this.confidence = 0; // 0 to 100%
        this.lastReview = null; // Date
        this.proofIds = []; // Array of proof IDs
    }
}
