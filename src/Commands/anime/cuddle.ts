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
  name: "cuddle",
  aliases: [],
  usage: "cuddle",
  description: "Este comando abraza a un mencionado.",
  category: "Anime",

  run: async (client, message, args) => {
    const mentionedMember = message.mentions.members?.first();
    if (!mentionedMember) return message.reply("Debes mencionar a alguien.");

    let user = message.member?.id;

    let mentionedId = message.mentions.members?.first()?.id;

    if (user === mentionedId) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    neko.sfw
      .cuddle()
      .then((img) => {
        const embed = new MessageEmbed()
          .setDescription(
            `**${message.author.username}** Abraza a **${mentionedMember.user.username}**`
          )
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
