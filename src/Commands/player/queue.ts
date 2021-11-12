import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import { Song } from "distube";
import Klar from "../../Client";

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "queue",
  aliases: [],
  dev: true,
  category: 'Música',
  usage: 'queue',
  description: 'Muestra la lista de reproducción',

run: async(client, message, args) => {

let queue = await client.player.getQueue((message.guild?.id as string));

if(!queue) {
  return message.channel.send("No hay nada reproduciéndose")
}

let embed = new MessageEmbed()
.setTitle("Lista de reproducción actual")
.setDescription("En la siguiente lista está(n) la(s) canción(es) reproduciéndose y su posición actual: \n"+ queue.songs.map((song: any, id: any) => 
`**${id+1}**. ${song.name}`
        ).join("\n"))
        .setColor("WHITE")

message.reply({ embeds: [embed] })

}
 
 }