import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import { createCanvas, loadImage } from "canvas";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class HailGrasaCommand extends BaseCommand {
  constructor() {
    super({
      name: "hailgrasa",
      aliases: [],
      description: "#HailGrasa",
      usage: "#SDLG :v",
      category: "Fun",
      cooldown: 0,
      botPerms: ["ATTACH_FILES", "SEND_MESSAGES"],
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

    const avatar = await loadImage(
      user.displayAvatarURL({ format: "png", size: 4096 })
    );
    const canvas = createCanvas(800, 800);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(`${__dirname}/hailgrasa.png`);

    //link antiguo por si acaso:  https://cdn.discordapp.com/attachments/851634368619085874/909228210888273920/grasapapu.png

    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `${user.username}_grasoso.png`
    );

    message.channel.send({ files: [attachment] });
  };
}
