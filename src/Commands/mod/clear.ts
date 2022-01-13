import Klar from "../../Client";
import Discord, {
  Client,
  Message,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class ClearCommand extends BaseCommand {
  constructor() {
    super({
      name: "clear",
      aliases: ["purge"],
      description: "Borra mensajes en masa (hasta 100)",
      usage: "clear <1-100>",
      category: "Mod",
      cooldown: 0,
      botPerms: ["MANAGE_MESSAGES", "SEND_MESSAGES"],
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
    let su = message.channel as TextChannel;
    let cantidad: any = args.join(" ");
    if (!cantidad) return message.reply("Debes escribir una cantidad");
    if (isNaN(cantidad))
      return message.reply("Las cantidades tienen que ser números.");
    let a = parseInt(cantidad);

    if (a === 0) return message.reply("No puedes borrar 0 mensajes");

    if (a < 0) return message.reply("No puedes borrar 0 o menos mensajes.");

    if (a > 100)
      return message.reply("No puedes borrar 100 o más mensajes a la vez.");

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
  };
}
