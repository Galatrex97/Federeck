import { PlayerEvent } from "../Interfaces";
import { MessageEmbed } from "discord.js";
export const dmpEvent: PlayerEvent = {
  name: "songChanged",
  run: async (client, queue, newSong, OldSong) => {
    try {
      let { msg } = (await queue.data) || queue.nowPlaying.data;
      let embed = new MessageEmbed()
        .setTitle(`Ahora reproduciendo`)
        .setDescription(
          `[${newSong.name}](${newSong.url}) - ${newSong.duration}`
        )
        .setColor("WHITE")
        .setThumbnail(`${newSong.thumbnail}`);
      await msg.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  },
};
