export class KnowledgeNode {
    constructor(id, title, parentId = null) {
        this.id = id;
        this.title = title;
        this.parentId = parentId; // e.g. 'linux' is parent of 'permissions'
        
        // Calculated fields (updated by KnowledgeEngine)
        this.estimatedLevel = 0; // 0 to 100%
        this.lastPracticed = null; // Date
        this.totalDuration = 0; // minutes
    }
}
