import { PlayerEvent } from "../Interfaces";
import { MessageEmbed } from "discord.js";

export const dmpEvent: PlayerEvent = {
  name: "songAdd",
  run: async (client, queue, song) => {
    try {
      let { msg } = (await queue.data) || queue.nowPlaying.data;
      let embed = new MessageEmbed()
        .setTitle(`Se añadió a la playlist`)
        .setDescription(`[${song.name}](${song.url}) - ${song.duration}`)
        .setColor("WHITE")
        .setThumbnail(`${song.thumbnail}`);
      await msg.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
