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
      description: "Pon aqui el código que quieres probar.",
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
        .setDescription("**No** puedes realizar la acción solicitada ya que no eres parte del equipo de **Desarrolladores**.")
        .setColor("RED");
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
          content: "No puedes solicitar está información confidencial en un chat de Discord.",
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
        .setDescription("**Información acerca de tu code:**")
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
       .addField("Hubo un error con el código que evaluaste", "```js\n"+err+"```") //Va a aparecer el error
       .setColor("RED")
       return interaction.followUp({embeds: [embed2]}) 
    }
  },
};