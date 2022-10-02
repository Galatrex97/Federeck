import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class NameCommand extends BaseCommand {
  constructor() {
    super({
      name: "hola",
      aliases: ["hi"],
      description: "Ni siquiera sé por qué tengo un comando tan inútil",
      usage: "hola",
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
    try {
      message.channel.sendTyping();
      message.reply(`Hola ${message.author}`);
    } catch (err) {
      console.log(err);
    }
  };
}
