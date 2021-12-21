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
  name: "fuck",
  aliases: ["follar", "coger"],
  usage: "fuck/follar/coger",
  category: "NSFW",
  description: "Cogerse a alguien XD",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    let userId = message.member?.id;

    let mentionedUserId = message.mentions.members?.first()?.id;

    if (userId === mentionedUserId) {
      return message.channel.send("No puedes follarte a ti mismo.");
    }

    let user = message.mentions.members?.first();
    if (!user) return message.channel.send("Debes mencionar a un usuario");

    neko.nsfw
      .classic()
      .then((img) => {
        const embed = new Discord.MessageEmbed()

          .setImage(img.url)
          .setDescription(
            `**${message.member?.nickname || message.author.username}** se folló a **${user?.nickname || user?.user.username}**`
          )
          .setColor("WHITE")
          .setTimestamp();

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  },
};
