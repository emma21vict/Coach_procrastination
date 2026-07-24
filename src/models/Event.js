export class Event {
    constructor(id, type, date, impact = 'bloc', priority = 'Haute', mandatory = true) {
        this.id = id;
        this.type = type; // e.g., 'Force-N', 'Exam', 'Vacances'
        this.date = date; // Date string or range
        this.impact = impact; // Expected impact on the schedule
        this.priority = priority;
        this.mandatory = mandatory;
    }
}
