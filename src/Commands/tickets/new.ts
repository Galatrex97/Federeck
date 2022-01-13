import parentSchema from "../../Models/parent";
import Klar from "../../Client";
import {
  CategoryChannel,
  TextChannel,
  Message,
  MessageEmbed,
} from "discord.js";
import { ticketSystem } from "../../Utils";
import mentionSchema from "../../Models/ticketsMentionable";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class TicketsCommand extends BaseCommand {
  constructor() {
    super({
      name: "tickets",
      aliases: ["set-tickets", "tickets-btn"],
      description: "Crea un ticket nuevo",
      usage: "tickets <Dar click en el botón>",
      category: "Mod",
      cooldown: 25,
      botPerms: ["MANAGE_CHANNELS", "MANAGE_MESSAGES", "SEND_MESSAGES"],
      userPerms: ["MANAGE_CHANNELS", "MANAGE_MESSAGES"],
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
    const parentParams = {
      guildId: message.guild?.id,
    };

    let mentionData =
      (await mentionSchema.findOne(parentParams)) ||
      (await mentionSchema.create(parentParams));
    let parentData =
      (await parentSchema.findOne(parentParams)) ||
      (await parentSchema.create(parentParams));

    if (!parentData.parentId) {
      return message.reply(
        `Es necesario que primero establezcas una categoria para los tickets. Usa \`${p}ticket-setup\``
      );
    }

    ticketSystem(message, message.channel, {
      embedTitle: "Soporte",
      embedDesc:
        "Haz click en el botón de abajo para crear un ticket de soporte. \n**Opciones que puedes utilizar**: Cerrarlo en cualquier momento\nRe-abrirlo\nSolicitar un archivo de texto con los últimos 100 mensajes del ticket\nBorrarlo.",
      embedColor: "#ffffff", // default: #075FFFF
      embedFoot: "Lyon tickets",
      emoji: "🎫", // default:, 🎫
      credit: false,
    });
  };
}

// to add a custom role copy this and paste it as explained in the video and replace role-id with the role ya want :D
// {
//					id: message.guild.roles.cache.get("role-id"),
//					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
//				}
