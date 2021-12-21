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
  name: "slap",
  aliases: ["abofetear", "cachetear"],
  usage: "slap",
  description: "Este comando abraza a un mencionado.",
  category: "Anime",

  run: async (client, message, args) => {
    let user = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (user === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    const person = message.mentions.members?.first();
    if (!person) return message.reply("Debes mencionar a alguien.");

    neko.sfw
      .slap()
      .then((asd) => {
        const embed = new MessageEmbed()
          .setDescription(
            `**${message.author.username}** abofetea a **${person.user.username}**`
          )
          .setImage(asd.url)
          .setColor("WHITE");

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);


        message.channel.send("Ha ocurrido un error.");
      });
  },
};
