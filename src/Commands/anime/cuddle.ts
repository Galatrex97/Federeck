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
    const person = message.mentions.members?.first();
    if (!person) return message.reply("Debes mencionar a alguien.");

    let user = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (user === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    neko.sfw
      .cuddle()
      .then((asd) => {
        const embed = new MessageEmbed()
          .setDescription(
            `**${message.author.username}** Abraza a **${person.user.username}**`
          )
          .setImage(asd.url)
          .setColor("WHITE");

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        let errmsg = new (require("discord.js").MessageEmbed)()
          .setTitle("Ha ocurrido un error")
          .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
          .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
          .setFooter("Tipico")
          .setColor("WHITE")
          .setTimestamp();

        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  },
};
