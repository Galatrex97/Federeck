import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";

 import { Command } from "../../Interfaces";


export const command: Command = {
  name: "get-volume",
  aliases: [],
  category: 'Música',
  usage: 'get-volume',
  description: 'Muestra el volumen actual de la canción reproduciéndose.',


run: async(client, message, args) => {

let guildList = client.player.getQueue((message.guild?.id as string));

    if(!message.member?.voice.channel) return message.channel.send("Debes estar en un canal de voz...")

    if(message.guild?.me?.voice.channel && message.member?.voice.channel?.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...")

message.reply("El volumen actual es: "+ guildList?.volume)

  }
}