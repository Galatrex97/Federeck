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
  name: "lesbian",
  aliases: [],
  usage: "lesbian ||y mano derecha desocupada||",
  description: "Muestra un gif o imagen lésbica.",
  category: "NSFW",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    neko.nsfw
      .lesbian()
      .then((img) => {
        const embed = new MessageEmbed()
          .setDescription("Disfruta "+`**${message.member?.nickname || message.author.username}**`)
          .setColor("WHITE")
          .setTimestamp()
          .setImage(img.url)
        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  },
};
