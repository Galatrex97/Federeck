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
  name: "pussygif",
  aliases: ["g-pussy", "gpussy"],
  usage: "pussygif",
  category: "NSFW",
  description: "Muestra una waifu horny",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    neko.nsfw
      .pussy()
      .then((img) => {
        const embed = new Discord.MessageEmbed()

          .setImage(img.url)
          .setDescription(`Aqui tienes`)
          .setColor("WHITE")
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  },
};
