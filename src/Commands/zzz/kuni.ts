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
  name: "kuni",
  aliases: [],
  usage: "kuni <user>",
  description: "",
  category: "NSFW",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    let userX = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (userX === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    const user = message.mentions.members?.first();

    if (!user) return message.reply("Debes mencionar a alguien");

    neko.nsfw
      .kuni()
      .then((ugu) => {
        const embed = new MessageEmbed()
          .setDescription(
            `**${message.author.username}** le está practicando pussy licking a **${user.user.username}**`
          )
          .setColor("WHITE")
          .setImage(ugu.url)
          .setFooter("Que ricoo")
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
