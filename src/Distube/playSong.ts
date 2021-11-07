import { Queue, Song } from "distube";
import Klar from "../Client";
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "playSong",
run: async(client, queue, song) => {
    try {
 queue.textChannel?.send(`Reproduciendo: **${song.name}** - **${song.formattedDuration}**`)
    } catch (err) {
        console.log(err)

let errmsg = new (require('discord.js')).MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setTimestamp()
 

    }
}
}