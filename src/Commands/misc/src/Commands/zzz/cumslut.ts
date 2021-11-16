import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
const neko = new clientnt()

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "cumslut",
  aliases: ["cumsluts"],
  usage: 'cumslut/s',
  description: '',
  category: 'NSFW',

run: async(client, message, args) => {


  if (!(message.channel as TextChannel).nsfw) return message.channel.send("Este no es un canal **NSFW**")

neko.nsfw.cumsluts().then(asja => {
  const ahd = new Discord.MessageEmbed()
  .setDescription("Que ricoo")
  .setImage(asja.url)
  .setColor("WHITE")
  .setFooter("Esta noche me voy a manosear")
  .setTimestamp()

  message.reply({embeds: [ahd]})
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