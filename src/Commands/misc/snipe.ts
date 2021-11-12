import Discord, { Client, Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";
const moment = require("moment");
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "snipe",
  aliases: [],
  usage: 'snipe',
  category: 'Misceláneo',
  description: 'Muestra un mensaje recientemente eliminado.',

run: async(client, message, args) => {
let snipes = client.snipes.get(message.channel.id);
if(message.mentions.channels.first()) {
  snipes = client.snipes.get(message.mentions.channels.first()?.id)
}

    if (!snipes) return message.reply("No se ha borrado recientemente ningun mensaje");

const snipe = +args[0] - 1 || 0;
const target = snipes[snipe];
if(!target) return message.reply(`Solo hay ${snipes.length} mensajes borrados recientemente en este canal`);

const { msg, timeAgo, image } = target;

 message.reply({embeds: [new MessageEmbed()
  .setColor("WHITE")
  .setAuthor(`Mensaje de ${msg.author.tag}`, msg.author.displayAvatarURL())
  .addField("Canal", `<#${msg.channel.id}>`)
  .setImage(image)
  .setFooter(`Borrado ${moment(timeAgo).locale("es").fromNow()} | ${snipe + 1} / ${snipes.length}`)
  .setDescription(msg.content)
]});

 
 }

}