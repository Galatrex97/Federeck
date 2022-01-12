import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class PauseCommand extends BaseCommand {
  constructor() {
    super({
      name: "pause",
      aliases: [],
      description: "Ppausa la lista de reproducción actual",
      usage: "pause",
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
      return message.channel.send(
        "Debes estar en un canal de voz para usar el cmd"
      );

    if (
      message.guild?.me?.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(
        "Debes estar en el mismo canal de voz que yo"
      );

    if (!guildList)
      return message.channel.send("No hay canciones reproduciéndose...");

    if (guildList.paused)
      return message.channel.send("La canción ya había sido pausada...");

    try {
      guildList.setPaused(true);

      message.channel.send("La canción ha sido pausada.");
    } catch (err) {
      message.channel.send("Ha ocurrido un error.");
      console.log(err);
    }
  };
}
