import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import canvacord from "canvacord";
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ytcomment",
  aliases: [],
  usage: 'ytcomment <args>',
  category: 'Fun',
  description: '"comenta" algo en yt',

run: async(client, message, args) => {

const comment = args.join(''); // definimos el comentario a poner
if(!comment) return message.reply(`Que quieres comentar?`) // si el usuario no indica ningun comentario dice que lo pongas ;)
try {    
let yt = await canvacord.Canvacord.youtube({"avatar":message.author.displayAvatarURL({format: "png", size: 4096}),"username":message.author.username, "content":args.join(" ")}) // generamos la foto, podemos canviar el user a lo que queramos
let enviar = new Discord.MessageAttachment(yt, 'comentario.png') // generamos el Attachment para enviarlo
message.reply({files: [enviar]}) // finalmente lo enviamos, se puede puede poner en embed si lo deseas.
}catch(err) { // si hay un error lo loguea en la consola


let errmsg = new MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 


  console.log("Ha ocurrido un error.") // logeamos en caso de error
}

/*
Bien ahora se puede hacer otra cosa y es con await messages cojer la foto, el user y el contenido. Quedaria mejor.
10 likes y lo subo ;)
*/
 
 }

}