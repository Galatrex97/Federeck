import math from "math-expression-evaluator";
import Discord, { Client, MessageEmbed, CommandInteraction } from "discord.js";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
  name: "math",
  description: "Calcula una expresión.",
  options: [
    {
      name: "expression",
      description: "Expresión a evaluar",
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
    const embed = new Discord.MessageEmbed().setColor(`WHITE`);

    let calc = interaction.options.getString("expression") as string;

    let resultado: any;
    try {
      resultado = math.eval(calc); // El Args toma el calculo
    } catch (e) {
      let errmsg = new MessageEmbed()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${e}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setColor("WHITE")
        .setTimestamp();

      resultado = "Error: Entrada Invalida"; // Cuando es incorrecta
    }
    embed
      .addField("Entrada:", `\`\`\`js\n${calc}\`\`\``, false) // Te da el calculo
      .setTitle("Calculadora de Lyon")
      .addField("Resultado", `\`\`\`js\n${resultado}\`\`\``, false);
    await interaction.followUp({ embeds: [embed] });
  },
};
