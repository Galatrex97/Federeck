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
  name: "fuck",
  aliases: ["follar", "coger"],
  usage: "fuck/follar/coger",
  category: "NSFW",
  description: "Cogerse a alguien XD",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    let userX = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (userX === mentionedUser) {
      return message.channel.send("No puedes follarte a ti mismo.");
    }

    let user = message.mentions.users.first();
    if (!user) return message.channel.send("Debes mencionar a un usuario");

    neko.nsfw
      .classic()
      .then((aaa) => {
        const embed = new Discord.MessageEmbed()

          .setImage(aaa.url)
          .setDescription(
            `**${message.author.username}** se folló a **${user?.username}**`
          )
          .setColor("GREEN")
          .setTimestamp();

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);

        let errmsg = new (require("discord.js").MessageEmbed)()
          .setTitle("Ha ocurrido un error")
          .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
          .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
          .setFooter("Tipico")
          .setTimestamp()
          .setColor("WHITE");

        message.channel.send("Ha ocurrido un error.");
      });
  },
};
