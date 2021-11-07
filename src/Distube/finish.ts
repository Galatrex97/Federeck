import { Queue } from "distube"
import Klar from "../Client"
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "finish",
run: async(client, queue) => {
    try {
queue.textChannel?.send("No hay más canciones para reproducir, abandonaré el canal.")
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