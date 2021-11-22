import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Role,
  GuildMember,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "say-c",
  aliases: ["sc"],
  category: "Útil",
  usage: "say-c/sc",
  description:
    "Este comando hace que yo diga algo en un canal especifico (tienes que mencionar el canal obviamente).",

  run: (client: Klar, message: Message, args: String[]) => {
    function is_url(str: string) {
      let regexp =
      /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
      if (regexp.test(str)) {
        return true;
      } else {
        return false;
      }
    }

    let perms = message.member?.permissions.has("ADMINISTRATOR");
    if (!perms)
      return message.channel.send(
        "No tienes los permisos requeridos para usar este comando."
      );

    let canal = message.mentions.channels.first();
    if (!canal) return message.channel.send("Debes mencionar un canal.");

    let texto = args.slice(1).join(" ");

    let roleMention = message.mentions.roles.first() as Role;

    if (roleMention && !message.member?.permissions.has("ADMINISTRATOR")) {
      return message.reply(
        "Para mencionar debes tener el permiso de Administrador."
      );
    }

    if (
      !(message.member as unknown as GuildMember).permissions.has(
        "ADMINISTRATOR"
      ) &&
      is_url(texto) === true
    )
      return message.reply(
        "Para mencionar un link debes tener el permiso de Administrador."
      );

    if (
      texto.includes(roleMention as any) &&
      !message.member?.permissions.has("ADMINISTRATOR")
    ) {
      return message.reply(
        "Para mencionar debes tener el permiso de Administrador."
      );
    }
    if (texto.includes("@here") && !perms)
      return message
        .reply("Para mencionar debes tener el permiso de Administrador.")
        .then((e) => {
          setTimeout(() => {
            e.delete();
          }, 7000);
        });
    if (!texto) return message.channel.send("Debes escribir algo.");
    message.delete().catch(() => null);

    try {
      (canal as TextChannel).send({content: texto, allowedMentions: {
        parse: [],
        },
       });
    } catch (err) {
      let errmsg = new (require("discord.js").MessageEmbed)()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setTimestamp()
        .setColor("WHITE");

      console.log(err);
    }
  },
};
