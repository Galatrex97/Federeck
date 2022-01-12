import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class VolumeCommand extends BaseCommand {
  constructor() {
    super({
      name: "volume",
      aliases: ["vol"],
      description: "Cambia el volumen en la lista de reproducción actual.",
      usage: "volume <numero>",
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

    const nya = args[0] as string;
    let parsedNya = parseInt(nya);

    if (isNaN(parsedNya)) {
      return message.reply("Me pasó mañana.");
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
      guildQueue.setVolume(parsedNya);
      message.reply("El volumen se ha establecido a " + parsedNya);
    } catch (err) {
      message.reply("No hay nada reproduciendose.");
    }
  };
}
