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
  name: "stop",
  aliases: [],
  category: "Música",
  usage: "stop",
  description:
    "Detiene la canción y la lista entera, esto hará que me salga del canal",

  run: async (client, message, args) => {
    let guildQueue = await client.player.getQueue(message.guild?.id as string);

    if (!guildQueue) {
      return message.channel.send("No hay canciones reproduciéndose");
    }

    if (!message.member?.voice.channel)
      return message.channel.send("Debes estar en un canal de voz...");

    if (
      message.guild?.me?.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        "Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente..."
      );

    try {
      guildQueue.stop();
      message.channel.send("La musica se ha detenido correctamente.");
    } catch (err) {
      console.log(err);

      message.channel.send("Ha ocurrido un error.");

    }
  },
};
