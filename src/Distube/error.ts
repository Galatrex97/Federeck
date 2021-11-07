import Klar from "../Client"
import { DistubeEvent } from "../Interfaces";

export const distubeEvent: DistubeEvent = {
    name: "error",
run: async (client, error) => {
console.log(error)

let errmsg = new (require('discord.js')).MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${error}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setTimestamp()
 

}
}