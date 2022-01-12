import {
  Message,
  MessageEmbed,
  MessageAttachment,
  Snowflake,
} from "discord.js";
import Klar from "../../Client";
import DIG from "discord-image-generation";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class TrashCommand extends BaseCommand {
  constructor() {
    super({
      name: "trash",
      aliases: [],
      description: "When olvidas tus lentes",
      usage: "trash <@user>",
      category: "Fun",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES", "ATTACH_FILES"],
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
    let when = args[0];

    let regg = /^\d{17,18}$/;

    let si = regg.test(when);

    if (args[0] && !message.mentions.members?.first() && !si) {
      return message.channel.send(
        "Esa no es una id válida, da otra, menciona a alguien o usa el comando contigo mismo."
      );
    }

    let users: any;
    if (message.mentions.users.first()) {
      users = message.mentions.users.first()?.id;
    } else if (args[0] && !!si) {
      users = args[0];
    } else {
      users = message.author.id;
    }
    let user = await client.users.fetch(users);

    let pfp = user.displayAvatarURL({ format: "png", size: 4096 });

    let img = await new DIG.Trash().getImage(pfp);

    message.reply({ files: [new MessageAttachment(img, "trash.png")] });
  };
}
