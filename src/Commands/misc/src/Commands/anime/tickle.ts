import Discord, { Channel, Client, MessageEmbed, Message, TextChannel } from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
const neko = new clientnt()

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "tickle",
  aliases: ["cosquillas"],
  usage: 'tickle/cosquillas',
  description: 'Este comando le hace cosquillas a un mencionado.',
  category: 'Anime',

run: async(client, message, args) => {


  let user = message.member?.id;

  let mentionedUser = message.mentions.members?.first()?.id;

  if(user === mentionedUser) {
    return message.channel.send("No puedes usar este comando contigo mismo(a).")
  }

const person = message.mentions.members?.first();
if(!person) return message.reply("Debes mencionar a alguien.")

neko.sfw.tickle().then(asd => {
  const embed = new MessageEmbed()
  .setDescription(`**${message.author.username}** le hace cosquillas a **${person.user.username}**`)
  .setImage(asd.url)

  message.reply({embeds: [embed]})
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