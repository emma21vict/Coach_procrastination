export class Project {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.status = "pending"; // pending, in_progress, completed
        this.tasks = []; // Array of objects: { title, completed }
    }
}
