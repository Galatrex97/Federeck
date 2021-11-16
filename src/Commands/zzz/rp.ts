import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
import NSFW from "discord-nsfw";
const nsfw = new NSFW();

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "real-pussy",
  aliases: ["rpussy"],
  usage: "real-pussy",
  category: "NSFW",
  description: "nya",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.channel.send("Este no es un canal **NSFW**");

    const image = await nsfw.pussy();
    const embed = new Discord.MessageEmbed()
      .setDescription(`Koya afk`)
      .setColor("WHITE")
      .setImage(image);
    message.channel.send({ embeds: [embed] });
  },
};
