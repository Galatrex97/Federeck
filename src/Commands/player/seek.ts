import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "seek",
  aliases: [],
  category: "Música",
  usage: "seek <segundo>",
  description: "Salta la canción a el segundo especificado",

  run: async (client, message, args) => {
    let guildList = client.player.getQueue(message.guild?.id as string);

    if (!message.member?.voice.channel)
      return message.channel.send("Debes estar en un canal de voz...");

    if (
      message.guild?.me?.voice.channel &&
      message.member?.voice.channel?.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        "Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente..."
      );

    let si = args[0];
    let parsedSi = parseInt(si);

    if (isNaN(parsedSi))
      return message.reply("Debes escribir un número válido.");
    guildList?.seek(parsedSi * 1000);
    message.reply("Se ha saltado al segundo " + parsedSi);
  },
};
