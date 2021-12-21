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
  name: "ggirl",
  aliases: [],
  usage: "",
  description: "",
  category: "NSFW",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    neko.nsfw
      .girlSoloGif()
      .then((img) => {
        const embed = new MessageEmbed()
          .setImage(img.url)
          .setFooter("When no tienes el name")
          .setTimestamp()
          .setColor("WHITE");

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  },
};
