
import Discord, { Client, Message, MessageEmbed } from "discord.js";
import figlet from "figlet";
import Klar from "../../Client";
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ascii",
  aliases: [],
  cooldown: 7,
  usage: 'ascii',
  category: 'Misceláneo',
  description: '',

run: (client: Klar, message: Message, args: String[]) => {

let si = args[0] as string;

 if (!si) return message.reply("¿Y el Texto?")
    if (si.length > 15) return message.reply("El texto no puede contener más de 15 Caracteres")
    figlet(si, (err, data) => message.reply("```" + data + "```"))
 
 }

}