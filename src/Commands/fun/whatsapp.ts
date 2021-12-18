import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../client";
import { createCanvas, loadImage } from "canvas";

import { Command } from "../../interfaces";

export const command: Command = {
  name: "whatsapp",
  aliases: ["wa"],
  usage: "",
  category: "Fun",
  description: "wasaaaa",

  run: async (client: Klar, message: Message, args, p) => {
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
    const background = await loadImage(`${__dirname}/whatsapp.png`);

    //antiguo link por si acaso: https://cdn.discordapp.com/attachments/788657156428660757/836802519639392296/PicsArt_04-27-09.59.41.png
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `${user.username}_whatsapp.png`
    );

    message.channel.send({ files: [attachment] });
  },
};
