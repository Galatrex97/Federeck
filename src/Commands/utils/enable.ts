import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class EnableCommand extends BaseCommand {
  constructor() {
    super({
      name: "enable",
      aliases: [],
      description:
        "Habilita un comando para usuarios normales. Este comando solo está disponible para desarrolladores",
      usage: "enable <nombre del comando>",
      category: "Útil",
      cooldown: 20,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
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
    if (args[0] == "disable" || "eval") {
      return message.reply("Ese comando está bloqueado permanentemente.");
    }

    let command = client.commands.find((x) => x.name == args[0]);
    if (!command) {
      return message.reply(
        "No se encontró el comando, reintenta y verifica que hayas escrito bien."
      );
    }
    if (!command?.devOnly) {
      return message.reply("Este comando ya estaba habilitado.");
    }

    let server = message.guild;

    if(!client.developers.includes(`${message.author.id}`)) {
      client.developers.forEach((x) => {
        client.users.fetch(x).then(user => {
          user.send(`Solicitud de uso\nHan solicitado habilitar el comando ${command} desde el servidor ${server}`);
        })
      });
      
      return message.reply("No puedes habilitar este comando por tu cuenta, pero hemos notificado a los desarrolladores con una solicitud para que puedas utilizar el comando.")
    }

    Object.defineProperty(command, "devOnly", {
      value: false,
    })

    message.reply(`El comando **${args[0]}** se ha habilitado tamporalmente.`);
  };
}
