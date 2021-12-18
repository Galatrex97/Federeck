import Discord, { Client, MessageEmbed, Message } from "discord.js";
import mongoose from "mongoose";
import ugu from "../../Models/add";
import Klar from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "set-welcome",
  aliases: [],
  usage: "set-welcome <id o mencion del canal>",
  category: "Configuración",
  description: "",

  run: async (client, message, args) => {
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

    if (!message.member?.permissions.has("MANAGE_GUILD"))
      return message.channel.send(
        "Necesitas un permiso: \n**Gestionar Servidor**`"
      );

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
  },
};
