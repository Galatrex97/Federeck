import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "skip",
  aliases: [],
  category: 'Música',
  usage: 'skip',
  description: 'Salta una canción, pero puedes saltar más de una utilizando el comando jump.',

run: async(client, message, args) => {
  let guildQueue = await client.player.getQueue((message.guild?.id as string));

if(!guildQueue.songs[1]) {
  return message.channel.send("No hay otra canción para reproducir, si quieres saltarte la canción actual primero tienes que añadir una.")
}

if(!message.member?.voice.channel) return message.channel.send("Debes estar en un canal de voz...")

    if(message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...")

try {

guildQueue.skip();

message.channel.send("La cancion fue omitida correctamente.")
 
} catch (err) {

  let errmsg = new (require('discord.js')).MessageEmbed()
  .setTitle('Ha ocurrido un error')
  .setDescription(`**Tengo el siguiente error:** ${err}`)
  .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
  .setFooter('Tipico')
  .setColor("WHITE")
  .setTimestamp()
   

  message.channel.send("Ha ocurrido un error.")
  console.log(err)
}

 }

}