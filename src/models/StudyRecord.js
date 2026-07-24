export class StudyRecord {
    constructor(id, sessionId, date, startTime) {
        this.id = id;
        this.sessionId = sessionId;
        this.date = date; // ISO string (YYYY-MM-DD)
        this.startTime = startTime; // ISO string
        this.endTime = null;
        this.realDuration = 0;
        this.completed = false;
        this.xpEarned = 0;
        this.quality = 0; // 1 to 5
        this.notes = "";
    }
    
    finish(endTime, realDuration, completed, quality, notes) {
        this.endTime = endTime;
        this.realDuration = realDuration;
        this.completed = completed;
        this.quality = quality;
        this.notes = notes;
    }
}
