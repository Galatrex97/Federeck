import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class StopCommand extends BaseCommand {
  constructor() {
    super({
      name: "stop",
      aliases: [],
      description: "Detiene la lista de reprodución actual",
      usage: "stop",
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
  };
}
