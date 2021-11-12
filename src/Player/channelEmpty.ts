import { Queue } from "distube";
import { MessageEmbed } from "discord.js";
import { PlayerEvent } from "../Interfaces";

export const dmpEvent: PlayerEvent = {
    name: "channelEmpty",
run: async(client, queue) => {

    let { msg } = await queue.data || queue.nowPlaying.data;
    await msg.channel.send(`El canal de voz está vacío, me saldré en unos segundos.`);
 }
}