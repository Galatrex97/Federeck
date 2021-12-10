import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import * as Discord from "discord.js";
import Klar from "../../Client";
import beautify from "beautify";
import { interactionCommand } from "../../Interfaces";
import { inspect } from "util";
export const Interaction: interactionCommand = {
  name: "eval",
  description: "Evalúa un code",
  options: [
    {
      name: "code",
      description: "Este es el código que será evaluado",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client: Klar, interaction: CommandInteraction) => {
    let toEval = interaction.options.getString("code") as string;

    if (interaction.user.id !== process.env.botOwner) {
      let embed = new Discord.MessageEmbed() //Creamos el embed
        .setDescription("Mmm, no puedes hacer esto")
        .setColor("WHITE");
      return interaction.followUp({ embeds: [embed] });
    }

    let noArray = [
      "process.env",
      "client.token",
      "client.destroy",
      "client.destroy()",
    ];
    try {
      if (noArray.includes(toEval)) {
        return interaction.followUp({
          content: "Ni lo intentes",
          ephemeral: true,
        });
      }

      let evaluated: any;
        try {
          evaluated = eval(toEval) //"evaluated" va a evaluar el comando
        } catch (err) {
          console.log(err)
        }
        let embed = new Discord.MessageEmbed() //Creamos otro embed
        .setColor("WHITE")
        .setTimestamp() //Usamos un Timestamp
        .setFooter((client.user?.username as string), client.user?.displayAvatarURL())
        .setTitle(`:desktop: ${client.user?.username}`)
        .setDescription("Este comando sirve para ejecutar codes")
        .addField("Tipo:", `\`\`\`prolog\n${typeof(evaluated)}\`\`\``, true)
        .addField("Tiempo:", `\`\`\`yaml\n${Date.now() - interaction.createdTimestamp}ms\`\`\``, true)
        .addField("Input:", "```js\n"+beautify(toEval, { format: "js" })+"```")
        .addField("Output:", "```js\n"+inspect(evaluated, {depth:  0})+"```") //Aca aparecera lo que se evalua
        interaction.followUp({embeds: [embed]})
    } catch(err: any) { //Hacemos un catch y que defina err

        let beautify = require("beautify")
       let embed2 = new Discord.MessageEmbed()
       .setTimestamp()
       .setFooter((client.user?.username as string), client.user?.displayAvatarURL())
       .addField("Hubo un error con el codigo que evaluaste", "```js\n"+err+"```") //Va a aparecer el error
       .setColor("WHITE")
       return interaction.followUp({embeds: [embed2]}) 
    }
  },
};