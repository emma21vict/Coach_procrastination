export class Proof {
    constructor(id, type, title, description, url, source, metadata = {}) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
        this.url = url;
        this.source = source;
        this.createdAt = new Date().toISOString();
        this.verified = false;
        this.metadata = metadata;
    }
}
