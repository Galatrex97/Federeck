import Discord, { Client, Message, MessageEmbed } from "discord.js";
import prefixSchema from "../../Models/prefix";
let prefix = process.env.prefix as string;
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class ResetprefixCommand extends BaseCommand {
  constructor() {
    super({
      name: "reset-prefix",
      aliases: ["resetprefix"],
      description: "Reestablece el prefix de comandos del servidor",
      usage: "reset-prefix",
      category: "Configuración",
      cooldown: 10,
      botPerms: ["SEND_MESSAGES"],
      userPerms: ["MANAGE_MESSAGES"],
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
    let prefixData: any;
    try {
      prefixData = await prefixSchema.findOne({
        Guild: message.guild?.id,
      });
    } catch (err) {
      console.log(err);
    }
    if (!prefixData) {
      prefixData = new prefixSchema({
        Guild: message.guild?.id,
      });
    }

    if (!prefixData.Prefix && prefixData.Guild)
      return message.reply(
        "El servidor re-estableció el prefix, así que están usando el prefix por defecto (k!)."
      );

    if (!prefixData.Prefix)
      return message.reply(
        "El servidor nunca estableció un prefix. Están usando k! como prefix."
      );

    if (prefixData.Prefix == "k!") {
      return message.reply(
        "No puedes reestablecer el prefix ya que k! ya es el prefix por defecto."
      );
    }

    await prefixSchema.findOneAndDelete({ Guild: message.guild?.id });
    message.reply(`El prefix ha sido reestablecido a **${prefix}**`);
  };
}
