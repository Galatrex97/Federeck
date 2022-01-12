import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class ResumeCommand extends BaseCommand {
  constructor() {
    super({
      name: "resume",
      aliases: ["continue"],
      description: "Despausa la canción actual",
      usage: "resume",
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
  };
}
