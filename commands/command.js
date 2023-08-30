export class Command {
    request;
    action;
    aliases;
    constructor(request, action, aliases) {
        this.request = request;
        this.action = action;
        this.aliases = aliases;
    }
}