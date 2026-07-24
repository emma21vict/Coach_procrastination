export class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.streak = 0;
        this.schemaVersion = "1.0";
        this.preferences = {
            theme: "dark",
            focusDuration: 25,
            breakDuration: 5
        };
    }
}
