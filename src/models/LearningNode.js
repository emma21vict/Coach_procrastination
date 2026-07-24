export class LearningNode {
    constructor(id, title, parentId = null) {
        this.id = id;
        this.title = title;
        this.parentId = parentId; // e.g. 'linux' is parent of 'permissions'
        
        // Calculated fields (updated by LearningGraphEngine)
        this.level = 0; // 0 to 100%
        this.confidence = 0; // 0 to 100%
        this.lastPractice = null; // Date
        this.proofs = []; // Array of proof objects
        this.revisionDate = null; // Date for next revision
    }
}
