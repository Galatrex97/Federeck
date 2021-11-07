import math from "math-expression-evaluator"; // Este NPM es con el que se podrá hacer los calculos
import Discord, { Client, Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "math",
  aliases: ["Útil"],
  usage: 'math <args>',
  category: 'Útil',
  description: 'Una calculadora para resolver operaciones matematicas de forma sencilla.',

run: async(client, message, args) => {

const embed = new Discord.MessageEmbed()
  .setColor(`WHITE`);
  
  if (!args[0]) {
    embed.setFooter("Por favor escribe una \`expresión\`.");
    return await message.reply({embeds: [embed]}); // Devuelve un mensaje si es que ejecuta el comando sin nada
  }
  let resultado: any;
  try {
    resultado = math.eval(args.join(" ")); // El Args toma el calculo
  } catch (e) {

let errmsg = new (require('discord.js')).MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${e}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 

    resultado = "Error: Entrada Invalida"; // Cuando es incorrecta
  }
  embed.addField("Entrada:", `\`\`\`js\n${args.join(" ")}\`\`\``, false) // Te da el calculo
  .setTitle("Calculadora de Lyon")
  .addField("Resultado", `\`\`\`js\n${resultado}\`\`\``, false);
  await message.channel.send({embeds: [embed]});
}
 
 };

   // Finaliza el código
// Cualquier duda, lean la doc de la NPM 