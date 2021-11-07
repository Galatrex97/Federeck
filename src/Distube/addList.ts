import { Playlist, Queue } from "distube"
import Klar from "../Client"
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "addList",
     run: async (client, queue, playlist) => {
    try {
        queue.textChannel?.send(`Playlist añadida correctamente: **${playlist.name}** con **${playlist.songs.length}** canciones`)
    } catch (err) {
        let errmsg = new (require('discord.js')).MessageEmbed()
        .setTitle('Ha ocurrido un error')
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter('Tipico')
        .setTimestamp()
         
        console.log(err)
    }
} 
}