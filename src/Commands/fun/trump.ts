import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "trumptweet",
  aliases: ["trump"],
  usage: 'trumptweet <texto>',
  category: 'Fun',
  description: '',

run: (client: Klar, message: Message, args: String[], p: string) => {

if (!message.guild?.me?.permissions.has("ATTACH_FILES")) return message.channel.send("Yo no tengo permisos de `Enviar Imagenes`");

const texto = args.join(" ")
if(!texto) return message.channel.send("No has ingresado un texto")
// Si no ingresan nada

if(texto.length >= 80) return message.channel.send("Para evitar problemas el texto no puede superar los 80 caracteres")
// Si el texto supera los 80 caracteres retorna el mensaje

let attachment = new Discord.MessageAttachment(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${texto}&raw=1`, 'ttweet.png') //Creamos la imagen con la API de NekoBot

message.channel.send({files: [attachment]}).catch(err => {

let errmsg = new (require('discord.js')).MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 


// En caso de algun error
if (err == "TypeError [ERR_UNESCAPED_CHARACTERS]: Request path contains unescaped characters") {
return message.channel.send("El texto ingresado NO puede contener Emojis.")
} else {
message.channel.send(`Tengo este error, reportalo en nuestro server de Discord o con el comando ${p}bug-report.\n El error es: ||${err.message}||`)
}
// En caso de que en el texto haya emojis y la API te de este error retorna este mensaje

});

 }

}