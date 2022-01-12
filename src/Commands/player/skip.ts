import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class SkipCommand extends BaseCommand {
  constructor() {
    super({
      name: "skip",
      aliases: [],
      description: "Salta una canción de la lista de reproducción",
      usage: "skip",
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

    if (!guildQueue?.songs[1]) {
      return message.channel.send(
        "No hay otra canción para reproducir, si quieres saltarte la canción actual primero tienes que añadir una."
      );
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
      guildQueue.skip();

      message.channel.send("La cancion fue omitida correctamente.");
    } catch (err) {
      message.channel.send("Ha ocurrido un error.");
      console.log(err);
    }
  };
}
