import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import distube from "distube";

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "jump",
  aliases: ["saltar"],
  category: 'Música',
  usage: 'jump/saltar',
  description: 'Salta entre canciones de la playlist, por ejemplo saltarse de la 1era canción hasta la 4ta.',

run: async(client, message, args) => {

let guildQueue = await client.distube.getQueue(message);

if(!guildQueue) {
  return message.channel.send("No hay canciones reproduciéndose")
}

let parsedArgs = parseInt(args[0] as string)

if(isNaN(parsedArgs)) {
  return message.channel.send("Tienes que dar el **número** de posición en la lista de la canción deseada.")
}

if(!guildQueue.songs[parsedArgs]) {
  return message.channel.send("No hay ninguna canción en esa posición en la lista de reproducción actual.")
}

if(!message.member?.voice.channel) return message.channel.send("Debes estar en un canal de voz...")

if(message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...")


  try {
client.distube.jump(message, parseInt(args[0] as string))
  } catch (err) {

message.channel.send("Ha ocurrido un error.")

let errmsg = new (require('discord.js')).MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setTimestamp()
.setColor("WHITE")
 

    console.log(err)
  }
 
 }

};