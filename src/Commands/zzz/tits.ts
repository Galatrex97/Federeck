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
      .then((img) => {
        const embed = new MessageEmbed()
          .setImage(img.url)
          .setColor("WHITE")
          .setFooter("Tetaaaaaaas")
          .setTimestamp();

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  },
};
