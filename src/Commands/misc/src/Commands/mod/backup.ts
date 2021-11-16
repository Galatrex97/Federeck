import Discord, { Client, Message, MessageEmbed, Guild, GuildMember } from "discord.js";
import * as backup from "discord-backup";
import Klar from "../../Client";
  backup.setStorageFolder(__dirname+"/backups/");

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "backup",
  aliases: ["cloud"],
  usage: 'backup/cloud',
  category: 'Mod',
  description: 'Crea una copia de seguridad del server',

run: (client: Klar, message: Message, args: string) => {

//Otra vez vuelvo a subir este comando, por favor, no me lo borren por los comentaios que hay en los codigos, son porque estoy desarrollando un bot en ingles

//Aparte de eso no olviden instalar el npm de "discord-backup" y crear una carpeta llamda backups
	  
let guild = message.guild as Guild;

let i = message.guild?.me as GuildMember;

    let perms = message.member?.permissions.has("ADMINISTRATOR");

    if (!perms)
      return message.reply(
       "No tienes el permiso de Administrador como para usar este comando"
      );
    backup
      .create(guild, {
        jsonBeautify: true
      })
      .then(backupData => {
        // And send informations to the backup owner
        message.author.send({ embeds: [
					          new Discord.MessageEmbed()
         .setAuthor(`Backup creada correctamente`)
          .setColor(i.displayHexColor)
          .setDescription(`Para cargar esta backup usa ${backupData.id}`)
          .setThumbnail(message.author.displayAvatarURL())
				]
          })
        message.channel.send({ embeds: [//backupData.id
          new Discord.MessageEmbed()
          .setAuthor(`Backup creada correctamente`)
          .setColor(i.displayHexColor)
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription("**El ID de la backup se ha enviado a tu MD**")
				]});
      }).catch(error => {
        console.log(error)

let errmsg = new MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${error}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 

        message.channel.send("Ha ocurrido un error.")
      });
 
 }

}