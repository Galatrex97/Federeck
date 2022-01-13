import { calculator } from "../../Utils";
import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class MathCommand extends BaseCommand {
  constructor() {
    super({
      name: "math",
      aliases: ["calculator"],
      description:
        "Una calculadora que puede resolver tus operaciones matemáticas, de forma similar a una calculadora real",
      usage: "math <expresión>",
      category: "Útil",
      cooldown: 34,
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
      calculator(message as any, {
        embedColor: "#ffffff",
        credit: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
