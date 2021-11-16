import Discord, { Client, Message, MessageEmbed } from "discord.js";
import figlet from "figlet";
import Klar from "../../Client";
let cooldown = new Set();

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ascii",
  aliases: [],
  usage: 'ascii',
  category: 'Misceláneo',
  description: '',

run: (client: Klar, message: Message, args: String[]) => {

if(cooldown.has(message.author.id)){

message.reply(`Hey ${message.author} espera 7seg antes de volver a usar el comando`)

return;
}

cooldown.add(message.author.id);

setTimeout(() =>{
  cooldown.delete(message.author.id);
}, 7000);


let si = args[0] as string;

 if (!si) return message.reply("¿Y el Texto?")
    if (si.length > 15) message.reply("El texto no puede contener más de 15 Caracteres")
    figlet(si, (err, data) => message.reply("```" + data + "```"))
 
 }

}