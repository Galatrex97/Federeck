import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
const neko = new clientnt();

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "trap",
  aliases: [],
  usage: "",
  description: "",
  category: "NSFW",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    neko.nsfw
      .trap()
      .then((aa) => {
        const embed = new Discord.MessageEmbed()
          .setDescription("XD")
          .setImage(aa.url)
          .setFooter("Inviten")
          .setColor("WHITE")
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
          .setTimestamp()
          .setColor("WHITE");

        message.channel.send("Ha ocurrido un error.");
      });
  },
};
