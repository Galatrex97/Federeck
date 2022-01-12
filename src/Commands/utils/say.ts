import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  Role,
  GuildMember,
  TextChannel,
} from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";
import { is_url } from "../../functions";

export default class SayCommand extends BaseCommand {
  constructor() {
    super({
      name: "say",
      aliases: ["d"],
      category: "Útil",
      usage: "say/d",
      description:
        "Este comando hace que yo diga algo en el canal en el que se ejecuto el comando",
      cooldown: 0,
      botPerms: [],
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
    let texto = args.join(" ");

    if (!message.member?.permissions.has("ADMINISTRATOR") && is_url(texto))
      return message.reply("Para decir un link necesitas ser administrador.");

    if (!texto) return message.channel.send("Debes escribir algo...");

    if (message.deletable) {
      message.delete();
    }

    try {
      message.channel.send({
        content: texto,
        allowedMentions: {
          parse: [],
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
}
