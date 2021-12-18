import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";

import { Command } from "../../interfaces";

export const command: Command = {
  name: "clearList",
  aliases: [],
  category: "Música",
  usage: "clearList",
  description: "Limpia la lista de reproducción.",

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

    guildList?.clearQueue();

    message.reply("La lista de reproducción se ha borrado correctamente.");
  },
};
