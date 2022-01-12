import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import memes from "discord-memes";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class MemeCommand extends BaseCommand {
  constructor() {
    super({
      name: "meme",
      aliases: ["momo"],
      description: "Enviar un meme al azar",
      usage: "meme",
      category: "Fun",
      cooldown: 0,
      botPerms: ["ATTACH_FILES", "SEND_MESSAGES"],
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
    message.channel.send(memes.deTodoEspañol());
  };
}
