export class WeekMission {
    constructor(id, weekNumber, title, description, targetValue = 1, unit = "items") {
        this.id = id;
        this.weekNumber = weekNumber;
        this.title = title;
        this.description = description;
        
        this.status = "Not Started"; // Not Started, In Progress, Completed, Skipped
        this.targetValue = targetValue;
        this.currentValue = 0;
        this.unit = unit;
        
        this.completedAt = null;
        this.proofs = []; // Array of proof IDs
    }

    updateProgress(value, proofsList = []) {
        this.currentValue = Math.min(value, this.targetValue);
        
        if (proofsList && proofsList.length > 0) {
            this.proofs = [...new Set([...this.proofs, ...proofsList])];
        }

        if (this.currentValue === 0) {
            this.status = "Not Started";
            this.completedAt = null;
        } else if (this.currentValue < this.targetValue) {
            this.status = "In Progress";
            this.completedAt = null;
        } else {
            this.status = "Completed";
            if (!this.completedAt) {
                this.completedAt = new Date().toISOString();
            }
        }
    }
}
