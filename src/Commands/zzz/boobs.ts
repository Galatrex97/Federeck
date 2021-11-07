import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
const neko = new clientnt()
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "boobs",
  aliases: [],
  usage: 'boobs',
  category: 'NSFW',
  description: 'Tetas XD',

run: async (client: Klar, message: Message, args: String[]) =>{


if (!(message.channel as TextChannel).nsfw) return message.channel.send("Este no es un canal **NSFW**")

neko.nsfw.boobs().then(rico => {
const embed = new Discord.MessageEmbed()

.setImage(rico.url)
.setDescription(`Disfrutalo **${message.author.username}**`)
.setColor("WHITE")
.setTimestamp()

message.channel.send({embeds: [embed]})

}).catch(error => {
  console.log(error)

  let errmsg = new (require('discord.js')).MessageEmbed()
  .setTitle('Ha ocurrido un error')
  .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
  .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
  .setFooter('Tipico')
  .setColor("WHITE")
  .setTimestamp()
   
  

  message.channel.send("Ha ocurrido un error.")
})





 }

} 