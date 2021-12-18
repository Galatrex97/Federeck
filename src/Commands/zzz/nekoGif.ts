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
  name: "gifneko",
  aliases: ["nekogif"],
  usage: "nekogif y mano derecha desocupada",
  description: "",
  category: "NSFW",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    neko.nsfw
      .nekoGif()
      .then((uwu) => {
        const embed = new Discord.MessageEmbed()
          .setDescription("Neko GIF")
          .setImage(uwu.url)
          .setColor("WHITE")
          .setFooter("nya~")
          .setTimestamp();
        message.reply({ embeds: [embed] });
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
