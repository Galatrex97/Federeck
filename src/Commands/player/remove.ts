import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class RemoveCommand extends BaseCommand {
  constructor() {
    super({
      name: "remove",
      aliases: [],
      description: "Quita una canción de la lista de reproducción actual. ",
      usage: "remove <pos>",
      category: "Música",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: true,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args) => {
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
    if (guildList?.songs[parsedSi])
      return message.reply("No hay una canción en esa posición.");
    if (isNaN(parsedSi))
      return message.reply("Debes escribir un número válido.");
    guildList?.remove(parsedSi);
    message.reply(
      "Se ha quitado la canción número " +
        parsedSi +
        " de la lista de reproducción."
    );
  };
}
