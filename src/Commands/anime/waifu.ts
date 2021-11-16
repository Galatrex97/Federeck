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
  name: "waifu",
  aliases: [],
  usage: "",
  description: "",
  category: "Anime",

  run: async (client, message, args) => {
    neko.sfw
      .waifu()
      .then((aa) => {
        const embed = new MessageEmbed().setDescription("ugu").setImage(aa.url);

        message.channel.send({ embeds: [embed] });
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
