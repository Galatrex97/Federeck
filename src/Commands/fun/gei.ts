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
  name: "gay",
  aliases: [],
  usage: "gay <@usuario>",
  category: "Fun",
  description: "XDXDXDDDDDDDDDD",

  run: async (client, message, args) => {
    let users: any;
    if (message.mentions.users.first()) {
      users = message.mentions.users.first()?.id;
    } else {
      users = message.author.id;
    }

    let user = await client.users.fetch(users);

    const avatar = await loadImage(
      user.displayAvatarURL({ format: "png", size: 4096 })
    );
    const canvas = createCanvas(800, 800);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(`${__dirname}/el_pepe.png`);
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    const aa = await user.username;

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `gay.png`
    );

    const embed = new MessageEmbed()
      .setColor("WHITE")
      .setFooter("XD")
      .setImage(`attachment://gay.png`)
      .setTimestamp();

    try {
      message.channel.send({ embeds: [embed], files: [attachment] });
    } catch (err) {
      let errmsg = new (require("discord.js").MessageEmbed)()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setColor("WHITE")
        .setTimestamp();

      console.log(err);
    }
  },
};
