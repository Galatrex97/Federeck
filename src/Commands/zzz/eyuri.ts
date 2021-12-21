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
  name: "e-yuri",
  aliases: [],
  usage: "",
  description: "",
  category: "NSFW",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    neko.nsfw
      .eroYuri()
      .then((img) => {
        const embed = new MessageEmbed()
          .setDescription("Aqui tienes "+`**${message.member?.nickname || message.author.username}**`)
          .setImage(img.url)
          .setTimestamp();
        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  },
};
