import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../Interfaces";
import roleSchema from "../../Models/ticketsMentionable";
export const command: Command = {
  name: "ticket-roles",
  aliases: [],
  cooldown: 10,
  category: "Configuración",
  usage: "ticket-setup <role>",
  description: "Configura los roles a mencionar cuando se crea un ticket.",

  run: async(client, message, args) => {
  const Params = {
       guildId: message.guild?.id 
  }

  if(!message.member?.permissions.has("MANAGE_MESSAGES")) {
      return message.reply("Necesitas el permiso **Gestionar mensajes**");
  }

    let data = await roleSchema.findOne(Params) || await roleSchema.create(Params);

    let mentionedRoles = message.mentions.roles;
    if(!mentionedRoles) {
        return message.channel.send("Menciona al menos un rol para continuar.")
    }
    let mentArray: any = [];
    mentionedRoles.forEach(x => mentArray.push(x.id));

if(data) {

     mentionedRoles.forEach(x => data.mentions.push(x.id));
    data.save();
    message.channel.send("Se han actualizado los roles a mencionar.");
}
if(!data) {
    data = await roleSchema.create({
        guildId: message.guild?.id,
        mentions: mentArray
    })
    data.save();
    message.channel.send("Se han establecido los roles a mencionar.");
}

  },
};