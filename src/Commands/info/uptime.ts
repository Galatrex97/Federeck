import Discord from "discord.js";
const { Client, MessageEmbed } = require("discord.js");

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "uptime",
  aliases: [],
  usage: "uptime",
  category: "Info",
  description: "Muestra el tiempoque ha estado el bot online",

  run: (client, message, args) => {
    let days = Math.floor((client.uptime as any) / 86400000);
    let hours = Math.floor((client.uptime as any) / 3600000) % 24;
    let minutes = Math.floor((client.uptime as any) / 60000) % 60;
    let seconds = Math.floor((client.uptime as any) / 1000) % 60;

    const ugu = new MessageEmbed()
      .setTitle("**Tiempo online**")
      .setDescription(
        `:clock1: \`${days} Días\` \`${hours} Horas\` \`${minutes} Minutos\` \`${seconds} Segundos\``
      )
      .setColor("WHITE")
      .setFooter("Mmm...")
      .setTimestamp();

    try {
      message.reply({ embeds: [ugu] });
    } catch (err) {
      console.log(err);
    }
  },
};
