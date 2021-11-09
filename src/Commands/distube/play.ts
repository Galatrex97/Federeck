import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";

 import { Command } from "../../Interfaces";


export const command: Command = {
  name: "play",
  aliases: ["p"],
  dev: true,
  category: 'Música',
  usage: 'play/p',
  description: 'Reproduce una canción o la añade a la playlist',


run: async(client, message, args) => {

/*     const song = args.join(" ") as string;

    if(!message.member?.voice.channel) return message.channel.send("Debes estar en un canal de voz...")

    if(message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...")

    if(!song) return message.channel.send("Debes escribir algo...")

   await client.distube.play(message, song);
  */




  }
}