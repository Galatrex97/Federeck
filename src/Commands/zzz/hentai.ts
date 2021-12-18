import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../client";
import clientnt from "nekos.life";
const neko = new clientnt();

import { Command } from "../../interfaces";

export const command: Command = {
  name: "hentai",
  aliases: ["h"],
  usage: "hentai/h",
  category: "NSFW",
  description: "Este comando muestra un gif hentai",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.reply(
        "Este canal no es NSFW, abstienete de usar ese comando aqui."
      );

    neko.nsfw
      .randomHentaiGif()
      .then((nya) => {
        const a = new Discord.MessageEmbed()
          .setTitle("Hentai GIF")
          .setImage(nya.url)
          .setColor("WHITE")
          .setTimestamp();

        message.reply({ embeds: [a] });
      })
      .catch((error) => {
        console.log(error);

        let errmsg = new (require("discord.js").MessageEmbed)()
          .setTitle("Ha ocurrido un error")
          .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
          .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
          .setFooter("Tipico")
          .setColor("WHITE")
          .setTimestamp();

        message.channel.send("Ha ocurrido un error.");
      });
  },
};
