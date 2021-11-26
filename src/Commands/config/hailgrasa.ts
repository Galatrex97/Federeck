import Discord from "discord.js";
import { Client, MessageEmbed, Message } from "discord.js";
import la_grasa from "../../Models/lagrasa";
import Lyon from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "pacman",
  aliases: [],
  usage: "pacman on/off",
  category: "Configuración",
  description: "",

  run: async (client, message, args, p) => {
    if (!message.member?.permissions.has("MANAGE_MESSAGES"))
      return message
        .reply("Necesitas el permiso **Gestionar mensajes**.")
        .then((nya) => {
          setTimeout(() => {
            nya.delete();
          }, 7000);
        });

    if (!args[0])
      return message.channel.send("Tienes que especificar. (on/off)");

    if (args[0] === "on") {
      await la_grasa.findOne(
        { guildId: message.guild?.id },
        async (err: any, data: any) => {
          if (data?.sdlg == true) {
            return message.reply({
              content: `Las respuestas a los ":v" ya estaban activadas. Usa \`${p}pacman off\` para desactivarlas.`,
            });
          }
          if (err) {
            console.log(err);
          }

          if (data) {
            await la_grasa.findOneAndDelete({ guildId: message.guild?.id });
            data = await new la_grasa({
              guildId: message.guild?.id,
              sdlg: true,
            }).save();
            message.reply({ content: "#HailGrasa" });
          }
          if (!data) {
            data = await new la_grasa({
              guildId: message.guild?.id,
              sdlg: true,
            }).save();
            message.reply({ content: "#HailGrasa" });
          }
        }
      );
    } else if (args[0] === "off") {
      await la_grasa.findOne(
        { guildId: message.guild?.id },
        async (err: any, data: any) => {
          if (data?.sdlg == false) {
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
            await la_grasa.findOneAndDelete({ guildId: message.guild?.id });
            data = await new la_grasa({
              guildId: message.guild?.id,
              sdlg: false,
            }).save();
            message.reply({
              content:
                "Las respuestas a los pacmans han sido desactivadas. :'v",
            });
          }
        }
      );
    } else {
      return message.channel.send("Ese argumento no es válido. Usa on/off.");
    }
  },
};
