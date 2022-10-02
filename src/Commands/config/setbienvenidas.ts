import Discord, { Client, MessageEmbed, Message } from "discord.js";
import mongoose from "mongoose";
import ugu from "../../Models/add";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class WelcomeCommand extends BaseCommand {
  constructor() {
    super({
      name: "welcome-settings",
      aliases: [],
      description: "Establece el canal de bienvenidas del servidor",
      usage: "welcome-settings <id/mencionar un canal>",
      category: "Configuración",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: ["MANAGE_GUILD"],
      devOnly: false,
      guildOnly: true,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args) => {
    let canal =
      message.guild?.channels.cache.find((canal) => canal.id == args[0]) ||
      message.mentions.channels.first();
    let bienvenida = await ugu.findOne({ Guild: message.guild?.id }).exec();

    if (!canal)
      return message.channel.send(
        "Menciona o ingresa la ID de un canal al cual se redireccionarán las bienvenidas"
      );

    if (canal.type !== "GUILD_TEXT") {
      return message.channel.send(
        "Solo se pueden establecer canales de texto."
      );
    }

    if (bienvenida) {
      await ugu.updateOne({ Guild: message.guild?.id, Channel: canal.id });

      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(
              `El canal de bienvenidas ahora es ` + canal.toString()
            )
            .setColor("WHITE"),
        ],
      });
    } else {
      await new ugu({ Guild: message.guild?.id, Channel: canal.id }).save();
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(`El canal de bienvenidas es ` + canal.toString())
            .setColor("WHITE"),
        ],
      });
    }
  };
}
