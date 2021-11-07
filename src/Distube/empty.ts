import { Queue } from "distube";
import Klar from "../Client";
import { MessageEmbed } from "discord.js";
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "empty",
run: async(client, queue) => {

    try {
queue.textChannel?.send("No hay nadie en el canal de voz, así que me voy a salir.")
    } catch (err) {

let errmsg = new MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setTimestamp()
 

        console.log(err)
    }
 }
}