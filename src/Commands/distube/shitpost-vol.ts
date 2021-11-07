import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "shitpost-v",
  aliases: ["s-vol"],
  category: 'Música',
  usage: 'shitpost-vol/s-vol',
  description: '🥶',

run: async(client, message, args) => {

let guildQueue = await client.distube.getQueue(message);

if(!guildQueue) {
  return message.channel.send("No hay canciones reproduciéndose")
}

if(!message.member?.voice.channel) return message.channel.send("Debes estar en un canal de voz...")

if(message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...")


 if(!message.member?.permissions.has("ADMINISTRATOR")) return message.channel.send("Necesitas ser admin para hacer esto")


const shitpost = '999999999';
let parsedShitpost: number = parseInt(shitpost)
try {
client.distube.setVolume(message, parsedShitpost);
} catch (err) {

let errmsg = new (require('discord.js')).MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 

  console.log(err)
}
message.channel.send("Sale chipos")
 
 }

}