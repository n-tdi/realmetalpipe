import { configDotenv } from "dotenv";

configDotenv();

import { Client } from 'discord.js-selfbot-v13';

const client = new Client({
    checkUpdate: false,
    patchVoice: true,
});

const token = process.env.TOKEN;
const owner = process.env.OWNER;

console.log("Logging in with TOKEN " + token);
console.log("Using OWNER id " + owner);

import { Oogabooga } from './commands/oogabooga.js';
import { ShutUp } from "./commands/shutup.js";

let commands = [
    new Oogabooga(owner, client),
    new ShutUp()
];

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
});

client.on('messageCreate', async (msg) => {
    let author = msg.author;
    let id = author.id;

    if (id !== owner) {
        return;
    }

    let content = msg.content.toLocaleLowerCase();

    for (const command of commands) {
        if (content.startsWith(command.request)) {
            command.action(msg);
        }
        if (command.aliases != null) {
            for (const alias of command.aliases) {
                if (content.startsWith(alias)) {
                    command.action(msg);
                }
            }
        }
    }
});

client.login(token);