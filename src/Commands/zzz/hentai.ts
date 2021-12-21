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
      .then((img) => {
        const embed = new Discord.MessageEmbed()
          .setTitle("Hentai GIF")
          .setImage(img.url)
          .setColor("WHITE")
          .setTimestamp();

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  },
};
