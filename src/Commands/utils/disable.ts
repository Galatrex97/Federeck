import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class DisableCommand extends BaseCommand {
  constructor() {
    super({
      name: "disable",
      aliases: [],
      description: "",
      usage: "",
      category: "",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: true,
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
    let command = client.commands.find((x) => x.name == args[0]);

    console.log(command);

    Object.defineProperty(command, "devOnly", {
      value: true,
    });

    console.log(command);
  };
}
