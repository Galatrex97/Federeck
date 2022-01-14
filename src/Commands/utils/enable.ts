import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class EnableCommand extends BaseCommand {
  constructor() {
    super({
      name: "enable",
      aliases: [],
      description:
        "Habilita un comando para usuarios normales. Solo disponible para desarrolladores",
      usage: "enable <nombre del comando>",
      category: "Útil",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
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
    if (!args.length) {
      return message.reply("Necesitas el nombre del comando para continuar.");
    }
    let command = client.commands.find((x) => x.name == args[0]);
    if (!command) {
      return message.reply(
        "No se encontró el comando, reintenta y verifica que hayas escrito bien."
      );
    }

    Object.defineProperty(command, "devOnly", {
      value: false,
    });

    message.reply(`El comando **${args[0]}** se ha habilitado tamporalmente.`);
    console.log(command);
  };
}
