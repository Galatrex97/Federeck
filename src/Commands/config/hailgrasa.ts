import Discord from "discord.js";
import { Client, MessageEmbed, Message } from "discord.js";
import la_grasa from "../../Models/lagrasa";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class PacmansSwitchCommand extends BaseCommand {
  constructor() {
    super({
      name: "pacmans",
      aliases: [],
      description: 'Configura las respuestas a los pacmans ":v"',
      usage: "pacmans <on/off>",
      category: "Mod",
      cooldown: 0,
      botPerms: [],
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
    const params = {
      guildId: message.guild?.id,
    };

    if (!args[0])
      return message.channel.send("Tienes que especificar. (on/off)");

    if (args[0] === "on") {
      await la_grasa.findOne(params, async (err, data) => {
        if (data?.sdlg === true) {
          return message.reply({
            content: `Las respuestas a los ":v" ya estaban activadas. Usa \`${p}pacman off\` para desactivarlas.`,
          });
        }
        if (err) {
          console.log(err);
        }

        if (data) {
          await la_grasa.findOneAndDelete(params);
          data = new la_grasa({
            guildId: message.guild?.id,
            sdlg: true,
          });
          await data.save();
          message.reply({ content: "#HailGrasa" });
        }
        if (!data) {
          data = new la_grasa({
            guildId: message.guild?.id,
            sdlg: true,
          });
          await data.save();
          message.reply({ content: "#HailGrasa" });
        }
      });
    } else if (args[0] === "off") {
      await la_grasa.findOne(params, async (err, data) => {
        if (data?.sdlg === false) {
          return message.reply({
            content: `Las respuestas a los pacmans ya estaban desactivadas. Prueba \`${p}pacman on\` para activarlas.`,
          });
        }
        if (err) console.log(err);
        if (!data) {
          return message.reply({
            content: `Las respuestas a los pacmans vienen deshabilitadas por defecto. Usa \`${p}pacman on\` para activarlas por primera vez.`,
          });
        } else if (data) {
          await la_grasa.findOneAndDelete(params);
          data = new la_grasa({
            guildId: message.guild?.id,
            sdlg: false,
          });
          await data.save();
          message.reply({
            content: "Las respuestas a los pacmans han sido desactivadas. :'v",
          });
        }
      });
    } else {
      return message.channel.send("Ese argumento no es válido. Usa on/off.");
    }
  };
}
