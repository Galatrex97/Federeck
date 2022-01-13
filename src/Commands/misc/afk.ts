import Discord, { Message, TextChannel, MessageEmbed } from "discord.js";
import afk from "../../Models/afk";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class AFKCommand extends BaseCommand {
  constructor() {
    super({
      name: "afk",
      aliases: [],
      description: "Diles a todos que estás ausente con este comando.",
      usage: "afk [razón]",
      category: "Misceláneo",
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
    let data: any;
    try {
      data = await afk.findOne({
        userId: message.author.id,
        guildId: message.guild?.id,
      });
      if (!data) {
        data = await afk.create({
          userId: message.author.id,
          guildId: message.guild?.id,
        });
      }
    } catch (e) {
      console.log(e);
    }
    data.AFK_Reason = args.join(" ");
    if (data.AFK_Reason) {
      message.channel.send({
        content: `**${
          message.member?.nickname || message.author.username
        }** tu AFK se ha establecido a: **${data.AFK_Reason}**`,
        allowedMentions: {
          parse: ["users"],
        },
      });
    }
    if (!data.AFK_Reason) {
      message.channel.send(
        `**${
          message.member?.nickname || message.author.username
        }** Ahora estás en AFK`
      );
    }
    data.AFK = true;
    data.timeAgo = Date.now();
    await data.save(); //asd
  };
}
