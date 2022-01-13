import Discord, { Client, Message, MessageEmbed } from "discord.js";
import mongoose from "mongoose";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class PingCommand extends BaseCommand {
  constructor() {
    super({
      name: "ping",
      aliases: ["ms"],
      description: "Muestra la latencia actual.",
      usage: "ping",
      category: "Info",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: false,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args) => {
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
      .setTitle("Latencia <:signalbars128:927624679659823204>")
      .setDescription(
        `<:discord:927617018142810132> **Latencia del websocket:** ${
          client.ws.ping
        } ms\n<:message:927616437525286982> **Latencia de mensajes:** ${
          Date.now() - message.createdTimestamp
        } ms\n<:mongodb:927612382736416831> **Latencia de la base de datos:** ${dbLatency} ms`
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
  };
}
