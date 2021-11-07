import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
const neko = new clientnt()

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "e-kitsune",
  aliases: [],
  usage: '',
  description: '',
  category: 'NSFW',

  run: async(client, message, args) => {



    if (!(message.channel as TextChannel).nsfw) return message.channel.send("Este no es un canal **NSFW**")


neko.nsfw.eroKitsune().then(owo => {

  const embed = new Discord.MessageEmbed()
  .setDescription("Uff")
  .setImage(owo.url)
  .setFooter("Hay paja chavales")
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