import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import memes from "discord-memes";

import { Command } from "../../Interfaces";

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
      console.log(err);
    }
  },
};
