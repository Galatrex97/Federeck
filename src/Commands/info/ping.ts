import Discord, { Client, Message, MessageEmbed } from "discord.js";
import mongoose from "mongoose";
import Klar from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ping",
  aliases: ["ms"],
  category: "Útil",
  usage: "ping/ms",
  description: "Muestra la latencia o ping del bot en milisegundos.",

  run: async (client: Klar, message: Message, args: String[]) => {
    let date = Date.now();
    let pingDataBase = await new Promise((r, j) => {
      mongoose.connection.db
        .admin()
        .ping((err: any, result: any) => r(Date.now() - date));
    });

    let embed = new Discord.MessageEmbed()
      .setTitle("Latencia")
      .setDescription(
        `**Latencia de la API de Discord:** ${
          client.ws.ping
        } ms\n**Latencia general:** ${
          Date.now() - message.createdTimestamp
        } ms\n**Latencia de la base de datos:** ${pingDataBase} ms`
      )
      .setColor("WHITE");

    try {
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (err) {
      let errmsg = new MessageEmbed()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setColor("WHITE")
        .setTimestamp();

      console.log(err);
    }
  },
};
