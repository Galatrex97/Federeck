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

    let datos = await roleSchema.findOne(Params) || await roleSchema.create(Params);

    let mentionedRoles = message.mentions.roles;
    if(!mentionedRoles) {
        return message.channel.send("Menciona al menos un rol para continuar.")
    }
    let mentArray: any = [];
   let forPush = mentionedRoles.forEach(x => mentArray.push(x.id));

if(datos) {
    datos.mentions.push({ daRoles: forPush })
    datos.save();
    message.channel.send("Se han actualizado los roles a mencionar.");
} else if(!datos) {
    datos = await roleSchema.create({
        guildId: message.guild?.id,
        mentions: [
            {
                daRoles: forPush
            }
        ]
    })
    datos.save();
    message.channel.send("Se han establecido los roles a mencionar.");
}

  },
};