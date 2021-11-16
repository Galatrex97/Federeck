/* eslint-disable no-unused-vars */

import Klar from "../../Client";
import { GuildMember, Message, TextChannel, MessageEmbed } from "discord.js";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "open-ticket",
  category: "Soporte",
  description: "Re-abre un ticket.",
  aliases: [],
  usage: "open",
  userperms: ["ADMINISTRATOR"],
  botperms: [],
  run: async (client: Klar, message: Message, args: String[]) => {
    if ((message.channel as TextChannel).name.includes("ticket-")) {
      const member = message.guild?.members.cache.get(
        (message.channel as TextChannel).name.split("ticket-").join("")
      ) as GuildMember;
      try {
        (message.channel as TextChannel).permissionOverwrites
          .edit(member.user, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
          })
          .then(() => {
            message.reply(`El ticket se ha re-abierto ${message.channel}`);
          });
      } catch (e) {
        return message.reply("Ha ocurrido un error, Intentalo otra vez.");
      }
    } else {
      return message.reply(
        "No puedes usar este comando aqui, usalo en un ticket cerrado."
      );
    }
  },
};
