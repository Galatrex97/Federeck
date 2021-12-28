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
/*     let dbLatency = await new Promise((r, j) => {
      mongoose.connection.db
        .admin()
        .ping((err: any, result: any) => r(Date.now() - date));
    }); */

    let dbLatency = await new Promise((r, j) => {
        mongoose.connection.db
          .admin()
          .ping((err, result) =>
            err || !result ? j(err || result) : r(Date.now() - date)
          );
      });

    let embed = new Discord.MessageEmbed()
      .setTitle("Latencia")
      .setDescription(
        `**Latencia del websocket:** ${
          client.ws.ping
        } ms\n**Latencia de mensajes:** ${
          Date.now() - message.createdTimestamp
        } ms\n**Latencia de la base de datos:** ${dbLatency} ms`
      )
      .setColor("WHITE");

    try {
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: true },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
