import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "continue",
  aliases: ["resume"],
  category: "Música",
  usage: "continue/resume",
  description: "Continua la canción si ha sido pausada.",

  run: (client, message, args) => {
    let guildList = client.player.getQueue(message.guild?.id as string);

    if (!message.member?.voice.channel)
      return message.channel.send(
        "Debes estar en un canal de voz para usar este cmd"
      );

    if (
      message.guild?.me?.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        "debes estar en el mismo canal de voz que yo"
      );

    if (!guildList)
      return message.channel.send("No hay canciones reproduciendose...");

    if (!guildList.paused)
      return message.channel.send("La canción no está pausada.");

    try {
      guildList.setPaused(false);
      message.channel.send("La canción fue reanudada correctamente.");
    } catch (err) {
      message.channel.send("Ha ocurrido un error.");

      console.log(err);
    }
  },
};
