import { Command } from './command.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } from '@discordjs/voice';
import * as Path from "path";

export class Oogabooga extends Command {
    constructor(owner, client) {
        super("ooga booga", async (msg) => {
            msg.channel.send(`:rocket:  incoming tactical pipe`)
                .catch(console.error);

            let inGuild = msg.guildId !== null;

            if (inGuild) {
                let guild = msg.guild;

                guild.channels.fetch().then((result) => {
                    let voiceChannels =
                        result.filter((snowflake) => {
                            return snowflake.type === "GUILD_VOICE" && snowflake.members.size > 0 && snowflake.members.get(owner);
                        }
                    );

                    let voiceChannel = voiceChannels.first();

                    if (client.voice.adapters.size > 0) {
                        for (const channel of client.voice.adapters.values()) {
                            channel.destroy();
                        }
                    }

                    const connection = joinVoiceChannel({
                        channelId: voiceChannel.id,
                        guildId: voiceChannel.guild.id,
                        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                        selfDeaf: false,
                        selfMute: false,
                    });

                    const player = createAudioPlayer({
                        behaviors: {
                            noSubscriber: NoSubscriberBehavior.Pause,
                        },
                    });

                    const path = Path.resolve('resources/metal-pipe.mp3')

                    const metalPipeSound = createAudioResource(path);

                    connection.subscribe(player);

                    player.play(metalPipeSound);

                    setTimeout(function () {
                        connection.destroy();
                    }, 2500)
                })
            }
        }, null);
    }
}
