export class Resource {
    constructor(id, title, category, difficulty, estimatedTimeMinutes, cost = 0, offline = true, language = 'Français') {
        this.id = id;
        this.title = title;
        this.category = category; // e.g. 'Documentation', 'Exercice', 'Vidéo', 'Projet'
        this.difficulty = difficulty; // 1 to 5
        this.estimatedTimeMinutes = estimatedTimeMinutes;
        this.cost = cost;
        this.offline = offline;
        this.language = language;
    }
}
