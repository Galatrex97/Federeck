import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import { createCanvas, loadImage } from "canvas";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "grasoso",
  aliases: [],
  usage: "",
  category: "Fun",
  description: "#HailGrasa",

  run: async (client: Klar, message: Message, args, p) => {
    let users: any;
    if (message.mentions.users.first()) {
      users = message.mentions.users.first()?.id;
    } else if (args[0]) {
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
    const background = await loadImage(
      "https://i.imgur.com/PMMncdy.png"
    );

//link antiguo por si acaso:  https://cdn.discordapp.com/attachments/851634368619085874/909228210888273920/grasapapu.png 

    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `${user.username}_grasoso.png`
    );

    message.channel.send({ files: [attachment] });
  },
};