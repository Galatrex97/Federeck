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
  name: "pussy",
  aliases: [],
  usage: "pussy",
  category: "NSFW",
  description: "Muestra una waifu desnuda.",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    neko.nsfw
      .pussyArt()
      .then((img) => {
        const embed = new MessageEmbed().setImage(img.url).setColor("WHITE").setTimestamp();
        message.channel.send({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  },
};
