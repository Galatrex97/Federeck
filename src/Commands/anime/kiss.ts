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
  name: "kiss",
  aliases: [],
  usage: "kiss",
  category: "Anime",
  description: "Besa a alguien con este comando",

  run: (client: Klar, message: Message, args: String[]) => {
    let nya = message.mentions.members?.first();
    if (!nya) return message.reply("Debes mencionar a alguien");

    let user = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (user === mentionedUser) {
      return message.channel.send("No puedes besarte.");
    }

    neko.sfw
      .kiss()
      .then((neko) => {
        const embed = new MessageEmbed()
          .setTitle(
            `${message.author.username} Le ha dado un beso a ${nya?.user.username}`
          )
          .setImage(neko.url)
          .setColor("WHITE")
          .setFooter("Para cuando la boda?")
          .setTimestamp();

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
