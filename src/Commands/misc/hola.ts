import { Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "hola",
  aliases: ["hi"],
  category: "Misceláneo",
  usage: "hola/hi",
  description: "Es enserio? ._.XD",

  run: (client: Klar, message: Message, args: String[]) => {
    try {
      message.channel.sendTyping();
      message.reply(`Hola ${message.member}`);
    } catch (err) {
      console.log(err);

    }
  },
};
