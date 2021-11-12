import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";

 import { Command } from "../../Interfaces";


export const command: Command = {
  name: "playing",
  aliases: [],
  category: 'Música',
  usage: 'playing',
  description: 'Muestra la canción reproduciéndose y el minuto actual',


run: async(client, message, args) => {

  let guildList = client.player.getQueue((message.guild?.id as string));

    if(!message.member?.voice.channel) return message.channel.send("Debes estar en un canal de voz...")

    if(message.guild?.me?.voice.channel && message.member?.voice.channel?.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...")

const ProgressBar = guildList?.createProgressBar();
let embed = new MessageEmbed()
.setTitle(`Reproduciendo ahora`)
.setDescription(`[${guildList?.nowPlaying.name}](${guildList?.nowPlaying.url})`)
.setColor("WHITE")
.setThumbnail(`${guildList?.nowPlaying.thumbnail}`)
await message.reply({content: `${ProgressBar}`, embeds: [embed]});

  }
}