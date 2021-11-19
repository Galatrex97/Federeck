import Klar from "../../Client";
import Discord, {
  Client,
  Message,
  MessageEmbed,
  TextChannel,
} from "discord.js";


import { Command } from "../../Interfaces";

export const command: Command = {
  name: "clear",
  cooldown: 7,
  aliases: ["del", "purge"],
  category: "Mod",
  usage: "clear/del <numero de mensajes a borrar>",
  description: "Elimina los mensajes que quieras",

  run: (client: Klar, message: Message, args: String[]) => {

    let su = message.channel as TextChannel;
    let cantidad: any = args.join(" ");
    if (!cantidad) return message.reply("Debes escribir una cantidad");
    if (isNaN(cantidad))
      return message.reply("Las cantidades tienen que ser números.");
    let a = parseInt(cantidad);

    let perms = message.member?.permissions.has("MANAGE_MESSAGES");
    if (!perms)
      return message.reply(
        "No tienes los permisos requeridos para **Borrar Mensajes**"
      );

    if (a === 0) return message.reply("No puedes borrar 0 mensajes");

    if (a < 0) return message.reply("No puedes borrar 0 o menos mensajes.");

    if (a > 100)
      return message.reply("No puedes borrar 100 o más mensajes a la vez.");

    if (!message.guild?.me?.permissions.has("MANAGE_MESSAGES"))
      return message.reply(
        "Necesito el permiso **Gestionar Mensajes** para poder ejecutar este comando."
      );

    su.bulkDelete(a)
      .then(() => {
        if (a === 1) {
          message.channel.send(`**${a}** mensaje borrado.`);
        }
        if (a > 1 && a < 101) {
          return message.channel.send(`**${a}** mensajes borrados`);
        }
      })
      .catch((error: Error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  },
};
