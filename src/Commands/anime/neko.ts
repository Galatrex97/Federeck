import { Message, TextChannel } from "discord.js";
import Klar from "../../Client";

const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const clientnt = require("nekos.life");
const neko = new clientnt();

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "neko",
  aliases: [],
  usage: "neko",
  description: "...",
  category: "Anime",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw) {
      neko.sfw
        .neko()
        .then((asd: any) => {
          const embed = new MessageEmbed()
            .setDescription(`Meow`)
            .setImage(asd.url)
            .setColor("WHITE");

          message.reply({ embeds: [embed] });
        })
        .catch((error) => {
          console.log(error);

          message.channel.send("Ha ocurrido un error.");
        });
    }
    if ((message.channel as TextChannel).nsfw) {
      neko.nsfw
        .neko()
        .then((aa: any) => {
          const embed = new MessageEmbed()
            .setDescription("Nekos")
            .setFooter("Nya~")
            .setTimestamp()
            .setColor("WHITE")
            .setImage(aa.url);

          message.reply({ embeds: [embed] });
        })
        .catch((error: Error) => {
          console.log(error);

          message.channel.send("Ha ocurrido un error.");
        });
    }
  },
};
