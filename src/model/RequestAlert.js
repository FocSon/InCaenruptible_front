export default class RequestAlert {
    type;
    category;
    title;
    description;
    token;

    constructor(type, category, title, description, token){
        this.type = type;
        this.category = category;
        this.title = title;
        this.description = description;
        this.token = token;
    }
}