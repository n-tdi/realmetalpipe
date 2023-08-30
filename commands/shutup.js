import {Command} from "./command.js";

export class ShutUp extends Command {
    constructor() {
        super("shut up", async (msg) => {
            msg.channel.send("Yeah, " + msg.content);
        }, ["shutup"]);
    }
}