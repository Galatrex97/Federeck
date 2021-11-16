import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "play",
  aliases: ["p"],
  category: "Música",
  usage: "play/p",
  description: "Reproduce una canción o la añade a la playlist",

  run: async (client, message, args) => {
    let guildList = client.player.getQueue(message.guild?.id as string);

    let si = args.join(" ");
    if (!si) return message.channel.send("Debes escribir algo");
    if (!message.member?.voice.channel)
      return message.channel.send("Debes estar en un canal de voz...");

    if (
      message.guild?.me?.voice.channel &&
      message.member?.voice.channel?.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        "Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente..."
      );

    let queue = client.player.createQueue(message.guild?.id as any, {
      data: {
        msg: message,
      },
    });
    await queue.join(message.member?.voice.channel as any);
    let song: any = await queue.play(si).catch((_) => {
      if (!guildList) queue.stop();
    });

    song.setData({
      msg: message,
    });
  },
};
