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
  name: "baka",
  aliases: [],
  usage: "baka",
  description: "...",
  category: "Anime",

  run: async (client, message, args) => {
    let user = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (user === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    neko.sfw
      .baka()
      .then((img) => {
        const embed = new MessageEmbed()
          .setDescription(`Idiota`)
          .setImage(img.url)
          .setColor("WHITE");

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  },
};
