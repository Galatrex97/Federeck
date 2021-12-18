import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../client";
import clientnt from "nekos.life";
const neko = new clientnt();

import { Command } from "../../interfaces";

export const command: Command = {
  name: "pat",
  aliases: [],
  usage: "pat",
  description: "Este comando da una palmada a un mencionado.",
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
      .pat()
      .then((asd) => {
        const embed = new MessageEmbed()
          .setDescription(
            `**${message.author.username}** le da una palmadita a **${person.user.username}**`
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
          .setTimestamp()
          .setColor("WHITE");

        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  },
};
