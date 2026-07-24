export class Goal {
    constructor(id, title, targetDate) {
        this.id = id;
        this.title = title;
        this.targetDate = targetDate;
        
        this.subGoals = []; // Array of { id, title, completed }
        this.completed = false;
        this.progress = 0; // 0 to 100% based on subGoals
    }
    
    addSubGoal(title) {
        this.subGoals.push({ id: `sub_${Date.now()}_${Math.random()}`, title, completed: false });
        this.updateProgress();
    }
    
    markSubGoal(subId, isCompleted = true) {
        let sub = this.subGoals.find(s => s.id === subId);
        if (sub) {
            sub.completed = isCompleted;
            this.updateProgress();
        }
    }
    
    updateProgress() {
        if (this.subGoals.length === 0) {
            this.progress = this.completed ? 100 : 0;
            return;
        }
        let completedCount = this.subGoals.filter(s => s.completed).length;
        this.progress = Math.round((completedCount / this.subGoals.length) * 100);
        if (this.progress === 100) this.completed = true;
    }
}
