import Klar from "../../Client";
const emojiRegex = require("emoji-regex");
import Discord, { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class AddEmojiCommand extends BaseCommand {
  constructor() {
    super({
      name: "add-emoji",
      aliases: [],
      description: "Añade un emoji al servidor",
      usage: "add-emoji <:emoji:>",
      category: "Mod",
      cooldown: 0,
      botPerms: ["MANAGE_EMOJIS_AND_STICKERS", "SEND_MESSAGES"],
      userPerms: ["MANAGE_EMOJIS_AND_STICKERS"],
      devOnly: true,
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
    if (!message.member?.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
      message.reply(
        "Necesitas el permiso **Gestionar emojis** para usar este comando."
      );
      return;
    }
    if (!message.guild?.me?.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
      return message.reply(
        "Para el uso adecuado de este comando necesito el permiso **Gestionar emojis**."
      );
    }

    let res = args.join(" ");

    if (res.match(emojiRegex)) {
      return message.reply("No puedes poner emojis que ya trae Discord.");
    }

    /* let parsedRes = parseInt(res);

	if(isNaN(parsedRes) === false) {
		return message.reply("No puedes poner numeros ")
	} */

    if (!args.length) {
      message.reply(
        "Para el uso adecuado de este comando se necesita especificar un emoji **de otro servidor**. No puedes añadir emojis que el servidor ya tenga."
      );
      return;
    }

    let reg = /^<a?:(\w{2,32}):(\d{17,18})>/;
    let x = reg.test(args.join("  "));

    if (args.join(" ") && !x) {
      return message.reply("Ese no es un emoji válido, reintenta.");
    }

    for (let emojix of args) {
      let emojibv = Discord.Util.parseEmoji(emojix);

      if (emojibv?.id) {
        let emojiExt = emojibv.animated ? ".gif" : ".png";
        let emojiURL = `https://cdn.discordapp.com/emojis/${
          emojibv.id + emojiExt
        }`;
        try {
          message.guild?.emojis
            .create(emojiURL, emojibv.name)
            .then((emoji) =>
              message.channel.send(
                `El emoji (<:${emoji.name}:${emoji.id}>) ha sido añadido al servidor.`
              )
            )
            .catch((err) =>
              message.channel.send(
                "Ha sucedido un error, reintenta. ¿Has escrito bien?"
              )
            );
        } catch (err) {
          console.log(err);

          message.reply(
            "Sucedió un error, reintenta. Tal vez pusiste un emoji inválido."
          );
        }
      }
    }
  };
}
