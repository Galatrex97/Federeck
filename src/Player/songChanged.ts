import { Queue, Song } from "distube";
import { PlayerEvent } from "../Interfaces";
import { MessageEmbed } from "discord.js"
export const dmpEvent: PlayerEvent = {
    name: "songChanged",
run: async(client, queue, newSong, OldSong) => {
    let { msg } = await queue.data || queue.nowPlaying.data;  
      let embed = new MessageEmbed()
    .setTitle(`Ahora reproduciendo`)
    .setDescription(`[${newSong.name}](${newSong.url})`)
    .setColor("WHITE")
    .setThumbnail(`${newSong.thumbnail}`)
    .setFooter(`Solicitada por: ${newSong.requestedBy}`)
    await msg.channel.send({embeds: [embed]});

}
}