import { Queue, Song } from "distube";
import { PlayerEvent } from "../Interfaces";
import { MessageEmbed } from "discord.js"
export const dmpEvent: PlayerEvent = {
    name: "songFirst",
run: async(client, queue, song) => {

    let { msg } = await queue.data || queue.nowPlaying.data;
    let embed = new MessageEmbed()
    .setTitle(`Reproduciendo`)
    .setDescription(`[${song.name}](${song.url})`)
    .setColor("WHITE")
    .setThumbnail(`${song.thumbnail}`)
    .setFooter(`Pedida por: ${song.requestedBy}`)
    await msg.channel.send({embeds: [embed]});
}
}