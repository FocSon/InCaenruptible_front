export class Alert {
    id;
    title;
    description;
    startTime;
    endTime;
    type;
    category;

    constructor(id, type, category, title, description) {
        this.id = id;
        this.type = type;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startTime = Date.now();
    }
}