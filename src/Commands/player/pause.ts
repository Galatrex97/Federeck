import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "pause",
  aliases: ["ps"],
  category: 'Música',
  usage: 'pause/ps',
  description:'Pausa la canción que se está reproduciendo.',

run: async (client: Klar, message: Message, args: String[]) => {

  const serverQueue = await client.player.getQueue((message.guild?.id))

  if(!message.member?.voice.channel) return message.channel.send("Debes estar en un canal de voz para usar el cmd")

  if(message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo")

  if(!serverQueue) return message.channel.send("No hay canciones reproduciéndose...")

  if(serverQueue.paused) return message.channel.send("La canción ya había sido pausada...")

  try {
    serverQueue.pause()

  message.channel.send("La canción ha sido pausada.")
  } catch (err) {

let errmsg = new MessageEmbed()
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