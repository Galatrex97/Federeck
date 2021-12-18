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
  name: "cum",
  aliases: [],
  usage: "cum",
  category: "NSFW",
  description: "XD",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    let userX = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (userX === mentionedUser) {
      return message.channel.send("No puedes correrte en ti mismo.");
    }

    const user = message.mentions.members?.first();
    if (!user) return message.reply("Necesitas mencionar a alguien");

    neko.nsfw
      .cumsluts()
      .then((ugu) => {
        const ah = new Discord.MessageEmbed()
          .setDescription(
            `**${message.author.username}** se corre en **${user.user.username}**`
          )
          .setImage(ugu.url)
          .setFooter("Que ricoo")
          .setTimestamp();

        message.channel.send({ embeds: [ah] });
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
