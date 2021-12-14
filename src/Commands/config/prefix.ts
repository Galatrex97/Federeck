import Discord, { Client, MessageEmbed, Message } from "discord.js";
import prefixSchema from "../../Models/prefix";
import Klar from "../../Client";
import { Command } from "../../Interfaces";
import emojiRegex from "emoji-regex";
export const command: Command = {
  name: "setprefix",
  cooldown: 60,
  aliases: ["sp", "set-prefix"],
  category: "Configuración",
  usage: "setprefix/sp/set-prefix",
  description: "Establece o cambia el prefix actual.",

  /**
   * @param { Message } message
   */

  run: async (client, message, args) => {
    if (!message.member?.permissions.has("MANAGE_MESSAGES")) {
      return message
        .reply(
          "Necesitas el permiso **Gestionar mensajes** para realizar este cambio.**"
        )
        .then((nya) => {
          setTimeout(() => {
            nya.delete();
          }, 7000);
        })
        .catch((error) => {
          console.log(error);
          message.channel.send("Ha ocurrido un error.");
        });
      }
    const res = args.join(" ");    
    let emoji = Discord.Util.parseEmoji(res);

let regx = emojiRegex();

if(regx.test(res)) {
  return message.reply("No puedes poner emojis como prefix.")
}


    if (
      res.includes(
        `<:${emoji?.name}:${emoji?.id}>` || `<a:${emoji?.name}:${emoji?.id}>`
      ) ||
      res.length > 4
    ) {
      return message.reply(
        "No puedes poner un prefix de más de 4 caracteres ni emojis."
      );
    }
    if (!res) return message.reply("A cuál prefix quieres cambiar?");

    prefixSchema.findOne({ Guild: message.guild?.id }, async (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {

        if(res == "k!"  && data.Prefix == "k!") {
          return message.reply("No puedes re-establecer k! como prefix, es el prefix por defecto, además de que el servidor ya estableció este prefix.")
        }

        await prefixSchema.findOneAndDelete({ Guild: message.guild?.id });
        data = await new prefixSchema({
          Guild: message.guild?.id,
          Prefix: res,
        });
        await data.save();
        message.reply(`Mi prefix ha sido cambiado a **${res}**`);
      } else {

        if(res == "k!") {
          return message.reply("No puedes establecer k! como prefix ya que es el prefix por defecto que estás utilizando.")
        }

        data = await new prefixSchema({
          Guild: message.guild?.id,
          Prefix: res,
        });
        await data.save();
        message.reply(`Mi prefix ha sido establecido a **${res}**`);
      }
    });
  },
};


