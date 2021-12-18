import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../client";
import memes from "discord-memes";

import { Command } from "../../interfaces";

export const command: Command = {
  name: "meme",
  aliases: ["momo"],
  category: "Fun",
  usage: "meme/",
  description: "Hace que envié un meme al azar",

  run: (client: Klar, message: Message, args: String[]) => {
    try {
      return message.channel.send(memes.deTodoEspañol());
    } catch (err) {
      let errmsg = new (require("discord.js").MessageEmbed)()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setTimestamp()
        .setColor("WHITE");

      console.log(err);
    }
  },
};
