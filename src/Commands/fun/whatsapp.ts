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
  name: "whatsapp",
  aliases: ["wa"],
  usage: "",
  category: "Fun",
  description: "wasaaaa",

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
      "https://cdn.discordapp.com/attachments/788657156428660757/836802519639392296/PicsArt_04-27-09.59.41.png"
    );
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `${user.username}_whatsapp.png`
    );

    message.channel.send({ files: [attachment] });
  },
};
