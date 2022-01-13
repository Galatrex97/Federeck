// @ts-check
import Discord, { Client, MessageEmbed, Message } from "discord.js";
import prefixSchema from "../../Models/prefix";
import Klar from "../../Client";
import emojiRegex from "emoji-regex";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class SetprefixCommand extends BaseCommand {
  constructor() {
    super({
      name: "set-prefix",
      aliases: ["setprefix"],
      description: "Establece un prefix personalizado para el servidor.",
      usage: "set-prefix <nuevo prefix>",
      category: "Configuración",
      cooldown: 15,
      botPerms: ["SEND_MESSAGES"],
      userPerms: ["MANAGE_MESSAGES"],
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
    const res = args.join(" ");
    let emoji = Discord.Util.parseEmoji(res);

    let regx = emojiRegex();

    if (regx.test(res)) {
      return message.reply("No puedes poner emojis como prefix.");
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
        if (res == "k!" && data.Prefix == "k!") {
          return message.reply(
            "No puedes re-establecer k! como prefix, es el prefix por defecto, además de que el servidor ya estableció este prefix."
          );
        }

        await prefixSchema.findOneAndDelete({ Guild: message.guild?.id });
        data = await new prefixSchema({
          Guild: message.guild?.id,
          Prefix: res,
        });
        await data.save();
        message.reply(`Mi prefix ha sido cambiado a **${res}**`);
      } else {
        if (res == "k!") {
          return message.reply(
            "No puedes establecer k! como prefix ya que es el prefix por defecto que estás utilizando."
          );
        }

        data = await new prefixSchema({
          Guild: message.guild?.id,
          Prefix: res,
        });
        await data.save();
        message.reply(`Mi prefix ha sido establecido a **${res}**`);
      }
    });
  };
}
