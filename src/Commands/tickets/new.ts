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
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "set-tickets",
  category: "Soporte",
  cooldown: 900,
  aliases: [],
  description:
    "Esto configurará los tickets.",
  usage: "set-tickets",
  run: async (client, message, args, p) => {

    const parentParams = {
      guildId: message.guild?.id
    }
    
    let mentionData = await mentionSchema.findOne(parentParams) || await mentionSchema.create(parentParams);
    let parentData = await parentSchema.findOne(parentParams) || await parentSchema.create(parentParams);
    

if(!parentData.parentId) {
  return message.reply(`Es necesario que primero establezcas una categoria para los tickets. Usa \`${p}ticket-setup\``)
}

    ticketSystem(message, message.channel, {
      embedTitle: "Soporte",
      embedDesc: "Haz click en el botón de abajo para crear un ticket de soporte. \nNo mal usar.",
      embedColor: "#ffffff", // default: #075FFFF
      embedFoot: "Lyon tickets",
      emoji: "🎫", // default:, 🎫
      credit: false,
    });
  },
};

// to add a custom role copy this and paste it as explained in the video and replace role-id with the role ya want :D
// {
//					id: message.guild.roles.cache.get("role-id"),
//					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
//				}
