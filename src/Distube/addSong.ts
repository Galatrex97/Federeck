import { Queue, Song } from "distube"
import Klar from "../Client"
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "addSong",
run: async (client, queue, song) => {
    try {
 queue.textChannel?.send(`Canción añadida: **${song.name}** - **${song.formattedDuration}**`)
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