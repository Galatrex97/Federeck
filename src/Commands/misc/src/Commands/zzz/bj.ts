import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
const neko = new clientnt()

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "bj",
  aliases: ["mamada"],
  usage: '',
  description: '',
  category: 'NSFW',

run: async(client, message, args) => {

  if (!(message.channel as TextChannel).nsfw) return message.channel.send("Este no es un canal **NSFW**")


  let userX = message.member?.id;

  let mentionedUser = message.mentions.members?.first()?.id;

  if(userX === mentionedUser) {
    return message.channel.send("No puedes hacerte una mamada a ti mismo.")
  }

const user = message.mentions.members?.first();
if(!user) return message.reply("Debes mencionar a alguien.")

neko.nsfw.bJ().then(awwia => {
  const sag = new MessageEmbed()
  .setDescription(`**${message.author.username}** le hace una mamada a **${user.user.username}**`)
  .setImage(awwia.url)
  .setColor("WHITE")
  .setFooter("Inviten")
  .setTimestamp()

  message.reply({embeds: [sag]})
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