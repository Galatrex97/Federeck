import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class RepeatCommand extends BaseCommand {
  constructor() {
    super({
      name: "repeat",
      aliases: [],
      description: "Repite una canción, la lista entera o desactiva este modo.",
      usage: "repeat <0 (apagar)/1 (canción actual)/2 (Playlist entera)>",
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

    let parsedString: number = parseInt(args[0] as string);

    if (parsedString > 2)
      return message.reply("Solo se admiten números del 0 al 2");
    if (parsedString < 0)
      return message.reply("Solo se admiten números del 0 al 2");

    let mode: any = guildQueue.setRepeatMode(parsedString);
    mode = mode
      ? mode == 2
        ? "Repetir playlist"
        : "Repetir canción"
      : "Apagado";
    message.channel.send("El modo de repetición actual es: `" + mode + "`");
  };
}
