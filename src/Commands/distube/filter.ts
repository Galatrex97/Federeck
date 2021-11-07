import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "filter",
  aliases: [],
  usage: 'filter <filter>',
  category: 'Música',
  description: 'Coloca un filtro',

run: async(client, message, args) => {

let guildQueue = await client.distube.getQueue(message);

if(!guildQueue) {
  return message.channel.send("No hay canciones reproduciéndose")
}

if(!message.member?.voice.channel) return message.channel.send("Debes estar en un canal de voz...")

if(message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...")


  const filtrs = args[0] as string;
  try{
     if([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`].includes(filtrs)) {

let filter = client.distube.setFilter(message, filtrs)

message.reply({ content: `Filtro actual:  + (filter || "Apagado")`, allowedMentions: {repliedUser: false} })
 }
   } catch(err) {
    message.reply("No hay nada reproduciendose.")
   }
   
if(!args[0]) return message.reply("Debes decir un filtro")

if(![`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`].includes(args[0] as string)) {

message.reply("Debes enviar un filtro válido (`3d, bassboost, echo, vaporwave, nightcore, karaoke, flanger, gate, haas, reverse, surround, mcompand, phaser, tremolo, earwax`)")

 }





}
}