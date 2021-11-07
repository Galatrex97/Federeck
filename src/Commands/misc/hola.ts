import { Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";

 import { Command } from "../../Interfaces";

export const command: Command = {
    name: "hola",
    aliases: ["hi"],
    category: 'Misceláneo',
    usage: 'hola/hi',
    description: 'Es enserio? ._.XD',
  

   run: (client: Klar, message: Message, args: String[]) => {

    try {
    message.reply(`Hola ${message.member}`);
    } catch (err) {
      console.log(err)

let errmsg = new MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 


    }
      }
   }
    
