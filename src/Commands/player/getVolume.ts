import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class GetVolumeCommand extends BaseCommand {
  constructor() {
    super({
      name: "getvolume",
      aliases: [],
      description: "Obtiene el volumen de la lista de reproduccion actual",
      usage: "getvolume",
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

    if (!guildList?.isPlaying) {
      return message.reply("No hay nada reproduciéndose.");
    }
    message.reply("El volumen actual es: " + guildList?.volume);
  };
}
