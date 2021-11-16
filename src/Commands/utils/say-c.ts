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
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
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
    if (texto.includes("@everyone") && !perms)
      return message
        .reply("Para mencionar debes tener el permiso de Administrador.")
        .then((e) => {
          setTimeout(() => {
            e.delete();
          }, 7000);
        });

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
        "Para mencionar debes tener el permiso de Administrador."
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
      (canal as TextChannel).send(texto);
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
