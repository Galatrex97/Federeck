
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
  name: "bj",
  aliases: ["mamada"],
  usage: "",
  description: "",
  category: "NSFW",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    let userX = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (userX === mentionedUser) {
      return message.channel.send("No puedes hacerte una mamada a ti mismo.");
    }

    const user = message.mentions.members?.first();
    if (!user) return message.reply("Debes mencionar a alguien.");

    neko.nsfw
      .bJ()
      .then((img) => {
        const embed = new MessageEmbed()
          .setDescription(
            `**${message.author.username}** le hace una mamada a **${user.user.username}**`
          )
          .setImage(img.url)
          .setColor("WHITE")
          .setFooter("Inviten")
          .setTimestamp();

        message.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  },
};
