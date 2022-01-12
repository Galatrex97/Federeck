import Discord, { Client, MessageEmbed, Message } from "discord.js";
import antilink from "../../Models/antilinkbv";
import Klar from "../../Client";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class AntilinkSwitchCommand extends BaseCommand {
  constructor() {
    super({
      name: "antilink",
      aliases: [],
      description: "Interruptor del sistema de antilinks en los mensajes",
      usage: "antilink <on/off>",
      category: "Configuración",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
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

  run = async (client: Lyon, message: Message, args, p) => {
    if (!args[0])
      return message.channel.send("Tienes que especificar. (on/off)");

    if (args[0] === "on") {
      await antilink.findOne(
        { guild: message.guild?.id },
        async (err, data) => {
          if (data?.switch === true) {
            return message.reply({
              content: `El antilink ya estaba activado. Usa \`${p}antilink off\` para desactivarlo`,
            });
          }

          if (err) console.log(err);
          if (data) {
            await antilink.findOneAndDelete({ guild: message.guild?.id });
            data = new antilink({
              guild: message.guild?.id,
              switch: true,
            });
            data.save();
            message.reply({
              content:
                "El antilink ha sido activado. Ahora solo los administradores pueden enviar links.",
            });
          }
          if (!data) {
            data = new antilink({
              guild: message.guild?.id,
              switch: true,
            });
            data.save();
            message.reply({
              content: "El antilink ha sido activado por primera vez",
            });
          }
        }
      );
    } else if (args[0] === "off") {
      await antilink.findOne(
        { guild: message.guild?.id },
        async (err, data) => {
          if (data?.switch === false) {
            return message.reply({
              content: `El antilink ya estaba desactivado. Usa \`${p}antilink off\` para activarlo`,
            });
          }

          if (err) {
            console.log(err);
          }
          if (!data) {
            return message.reply({
              content: `El antilink por defecto viene deshabilitado. Usa \`${p}antilink on\` para activarlo por primera vez.`,
            });
          } else if (data) {
            await antilink.findOneAndDelete({ guild: message.guild?.id });
            data = new antilink({
              guild: message.guild?.id,
              switch: false,
            });
            data.save();
            message.reply({
              content:
                "El antilink ha sido desactivado. Ahora pueden enviar links.",
            });
          }
        }
      );
    } else {
      return message.channel.send("Ese argumento no es válido. Usa on/off");
    }
  };
}
