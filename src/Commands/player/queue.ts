import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class QueueCommand extends BaseCommand {
  constructor() {
    super({
      name: "queue",
      aliases: [],
      description: "Muestra la lista de reproducción actual",
      usage: "queue",
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
    let queue = await client.player.getQueue(message.guild?.id as string);

    if (!queue) {
      return message.channel.send("No hay nada reproduciéndose");
    }

    let embed = new MessageEmbed()
      .setTitle("Lista de reproducción actual")
      .setDescription(
        "En la siguiente lista está(n) la(s) canción(es) reproduciéndose y su posición actual: \n" +
          queue.songs
            .map(
              (song: any, id: any) =>
                `**${id + 1}**. ${song.name} - \`${song.duration}\``
            )
            .join("\n")
      )
      .setColor("WHITE");

    message.reply({ embeds: [embed] });
  };
}
