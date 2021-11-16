import Discord, {
  Client,
  Message,
  TextChannel,
  MessageEmbed,
} from "discord.js";
import Klar from "../../Client";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "delete-ticket",
  aliases: [],
  usage: "delete",
  category: "Soporte",
  description: "Esto borrará el ticket",

  run: (client: Klar, message: Message, args: String[]) => {
    if (!message.member?.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        "No puedes hacer esto por la ausencia del permiso **Gestionar Canales**"
      );
    if (!message.guild?.me?.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        "No puedo hacer esto por la ausencia del permiso **Gestionar Canales**"
      );
    if ((message.channel as TextChannel).name.includes("ticket-")) {
      message.channel.delete();
    } else if ((message.channel as TextChannel).name === "ticket-logs") {
      return;
    } else {
      return message.reply(
        "No puedes usar este comando aqui, úsalo en un ticket."
      );
    }
  },
};
