import { PlayerEvent } from "../interfaces";
import { MessageEmbed } from "discord.js";
export const dmpEvent: PlayerEvent = {
  name: "songFirst",
  run: async (client, queue, song) => {
    try {
      let { msg } = (await queue.data) || queue.nowPlaying.data;
      let embed = new MessageEmbed()
        .setTitle(`Reproduciendo`)
        .setDescription(`[${song.name}](${song.url}) - ${song.duration}`)
        .setColor("WHITE")
        .setThumbnail(`${song.thumbnail}`)
        .setFooter(`Pedida por: ${msg.member.nickname || msg.author.username}`)
      await msg.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
