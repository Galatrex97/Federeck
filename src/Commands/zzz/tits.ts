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
  name: "tits",
  aliases: [],
  usage: "tits",
  description: "",
  category: "NSFW",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    neko.nsfw
      .tits()
      .then((asa) => {
        const aa = new MessageEmbed()
          .setImage(asa.url)
          .setColor("WHITE")
          .setFooter("ig de la minita?")
          .setTimestamp();

        message.reply({ embeds: [aa] });
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
