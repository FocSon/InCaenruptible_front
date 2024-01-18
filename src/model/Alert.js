export class Alert {
    id;
    title;
    description;
    startTime;
    endTime;
    type;
    category;

    constructor(id) {
        this.id = id;
    }
}