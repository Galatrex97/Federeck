import Discord, { Message } from "discord.js";
import Klar from "../../Client";
const emojiRegex = require("emoji-regex");
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "add-emoji",
  aliases: ["addemoji"],
  cooldown: 15,
  usage: "add-emoji <:emoji:>",
  category: "Útil",
  description: `"Toma prestado" un emoji de otro servidor`,

  run: async (client, message, args) => {
    if (!message.member?.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
      message.reply(
        "Necesitas el permiso **Gestionar emojis** para usar este comando."
      );
      return;
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
      message.reply("Por favor especifica el emoji");
      return;
    }

    let reg = /^<a?:(\w{2,32}+):(\d{17,18}+)>$/;
    let x = reg.test(args.join("  "));

    if(args.join(" ") && !x) {
      return message.reply("Ese no es un emoji válido, reintenta.")
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

          let errmsg = new (require("discord.js").MessageEmbed)()
            .setTitle("Ha ocurrido un error")
            .setDescription(`**Tengo el siguiente error:** ${err}`)
            .setThumbnail(
              `https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`
            )
            .setFooter("Tipico")
            .setColor("WHITE")
            .setTimestamp();

          message.reply(
            "Sucedió un error, reintenta. Tal vez pusiste un emoji inválido."
          );
        }
      }
    }
  },
};
