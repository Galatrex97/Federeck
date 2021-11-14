import Discord, { Client, Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import { inspect } from "util";
const nya = process.env.botOwner;
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "eval",
  aliases: [],
  usage: 'eval',
  category: 'Misceláneo',
  description: '...',

run: async(client, message, args) => {

if(message.author.id !== nya) {
            let embed = new Discord.MessageEmbed() //Creamos el embed
            .setDescription("Mmm, no puedes hacer esto")
            .setColor("WHITE")
       return message.reply({embeds: [embed]})

        
        } 

				let no = ["process.env", "client.token", "client.destroy", "client.destroy()"]



        let toEval = args.join(" ") as any; //Definimos toEval con argumentos
				if([no].includes(toEval)) return;
        if(!toEval) { //Creamos un if para que diga
            let embed = new Discord.MessageEmbed()
            .setDescription("Y el code? <a:xdd:841332542220927016>")
            .setColor("WHITE")
           return message.reply({embeds: [embed]})
            .then((m) => m.delete()).catch(error => {
              console.log(error)
              message.channel.send("Ha ocurrido un error.")
            })
        }
        try {
					if (no.includes(toEval)){
             return message.reply("No puedes intentar la acción que ingresaste.");
        } 
        let evaluated: any;
        try {
          evaluated = eval(toEval) //"evaluated" va a evaluar el comando
        } catch (err) {
          console.log(err)
        }
       if(!args.join(" ")) return;
        let beautify = require("beautify") //Se usa beautify para que funcione
        let embed = new Discord.MessageEmbed() //Creamos otro embed
        .setColor("WHITE")
        .setTimestamp() //Usamos un Timestamp
        .setFooter((client.user?.username as string), client.user?.displayAvatarURL())
        .setTitle(`:desktop: ${client.user?.username}`)
        .setDescription("Este comando sirve para ejecutar codes")
        .addField("Tipo:", `\`\`\`prolog\n${typeof(evaluated)}\`\`\``, true)
        .addField("Tiempo:", `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\``, true)
        .addField("Input:", "```js\n"+beautify(args.join(" "), { format: "js" })+"```")
        .addField("Output:", "```js\n"+inspect(evaluated, {depth:  0})+"```") //Aca aparecera lo que se evalua
        message.reply({embeds: [embed]})
    } catch(err: any) { //Hacemos un catch y que defina err

        let beautify = require("beautify")
       let embed2 = new Discord.MessageEmbed()
       .setTimestamp()
       .setFooter((client.user?.username as string), client.user?.displayAvatarURL())
       .addField("Hubo un error con el codigo que evaluaste", "```js\n"+err+"```") //Va a aparecer el error
       .setColor("WHITE")
       return message.reply({embeds: [embed2]}) 
    }
    }
 
 }