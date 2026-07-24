export class Skill {
    constructor(id, name, level = 0, xp = 0, totalHours = 0) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.xp = xp;
        this.totalHours = totalHours;
        this.evidence = []; // Array of strings (urls, commit hashes)
    }
}
