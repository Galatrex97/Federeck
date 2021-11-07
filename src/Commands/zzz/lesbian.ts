import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
const neko = new clientnt()

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "lesbian",
  aliases: [],
  usage: 'lesbian ||y mano derecha desocupada||',
  description: 'Muestra un gif o imagen lésbica.',
  category: 'NSFW',

  run: async(client, message, args) => {

    if (!(message.channel as TextChannel).nsfw) return message.channel.send("Este no es un canal **NSFW**")

neko.nsfw.lesbian().then(aa => {
  const ugu = new MessageEmbed()
  .setDescription("Disfruta")
  .setColor("WHITE")
  .setTimestamp()
  .setImage(aa.url)
  .setFooter("Que ricoo")
  message.reply({embeds: [ugu]})
}).catch(error => {
  console.log(error)

  let errmsg = new (require('discord.js')).MessageEmbed()
  .setTitle('Ha ocurrido un error')
  .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
  .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
  .setFooter('Tipico')
  .setTimestamp()
  .setColor("WHITE")
   
  

  message.channel.send("Ha ocurrido un error.")
})


 }

}