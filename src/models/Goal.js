export class Goal {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.milestones = []; // Array of objects: { title, completed }
    }
}
