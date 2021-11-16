import Discord, { Client, Message, MessageEmbed } from "discord.js";
import prefixSchema from "../../Models/prefix";
let prefix = process.env.prefix as string;
import Klar from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "prefix-reset",
  aliases: ["prefix-rs"],
  category: "Configuración",
  usage: "prefix-rs/prefix-reset",
  description: "Hace que el prefix vuelva a ser el prefix por defecto (k!).",

  run: async (client, message, args) => {
    if (!message.member?.permissions.has("MANAGE_MESSAGES"))
      return message
        .reply(
          "Necesitas el permiso **Gestionar mensajes** para realizar esta acción."
        )
        .then((nya) => {
          setTimeout(() => {
            nya.delete();
          }, 7000);
        })
        .catch((error: Error) => {
          console.log(error);

          let errmsg = new (require("discord.js").MessageEmbed)()
            .setTitle("Ha ocurrido un error")
            .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
            .setThumbnail(
              `https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`
            )
            .setFooter("Tipico")
            .setColor("WHITE")
            .setTimestamp();

          message.channel.send("Ha ocurrido un error.");
        });
    await prefixSchema.findOneAndDelete({ Guild: message.guild?.id });
    message.reply(`El prefix ha sido reestablecido a **${prefix}**`);
  },
};
