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

//en esta constante definimos un canal mencionado y si no el canal donde se ejecuto el cmd

const snipes = client.snipes.get(message.channel.id);

    if (!snipes) message.reply("No se ha borrado recientemente ningun mensaje")

const snipe = +args[0] - 1 || 0;
const target = snipes[snipe]
if(!target) return message.reply("Solo hay "+snipes.length+" mensajes");

const { msg, timeAgo, image  } = target;

//en esta constante definimos nuestro client.snipes que es nuestro objeto Map, con el metodo .get() tratamos de ver si channel.id(id del canal) esta dentro del Map  

 const main = new MessageEmbed()
 .setColor("WHITE")
 .setAuthor(`Mensaje de ${msg.author.tag}`, msg.author.displayAvatarURL())
 .addField("Canal", `<#${msg.channel.id}>`)
 .setImage(image)
 .setFooter(`Borrado hace ${moment(timeAgo).locale("es").fromNow()} | ${snipe + 1} / ${snipes.length}`)
 .setDescription(msg.content)

 message.reply({embeds: [main]});

/* 
Cada Valor esta en el evento messageDelete del cual en el comando los vas a obtener.
*/

 
 }

}