import Discord, { Client, Message, MessageEmbed } from "discord.js";
import figlet from "figlet";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class AsciiCommand extends BaseCommand {
  constructor() {
    super({
      name: "ascii",
      aliases: [],
      description: "Convierte texto de esta manera para que sea mas llamativo",
      usage: "ascii <texto>",
      category: "Misceláneo",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: false,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args) => {
    let si = args[0] as string;

    if (!si) return message.reply("¿Y el texto?");
    if (si.length > 15)
      return message.reply("El texto no puede contener más de 15 Caracteres");
    figlet(si, (err, data) => {
      if (err) {
        console.log(err);
        return message.reply("Ha ocurrido un error.");
      }
      message.reply("```" + data + "```");
    });
  };
}
