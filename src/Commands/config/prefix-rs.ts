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
          message.channel.send("Ha ocurrido un error.");
        });

    let prefixData: any;
    try {
      prefixData = await prefixSchema.findOne({
        Guild: message.guild?.id,
      });
    } catch (err) {
      console.log(err);
    }
      if (!prefixData) {
        prefixData = new prefixSchema({
          Guild: message.guild?.id,
        });
      }

      if (!prefixData.Prefix && prefixData.Guild)
        return message.reply(
          "El servidor re-estableció el prefix, así que están usando el prefix por defecto (k!)."
        );

        if(!prefixData.Prefix) return message.reply("El servidor nunca estableció un prefix. Están usando k! como prefix.")

      if (prefixData.Prefix == "k!") {
        return message.reply(
          "No puedes reestablecer el prefix ya que k! ya es el prefix por defecto."
        );
      }


    await prefixSchema.findOneAndDelete({ Guild: message.guild?.id });
    message.reply(`El prefix ha sido reestablecido a **${prefix}**`);
  },
};
