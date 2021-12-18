import math from "math-expression-evaluator";
import Discord, { Client, MessageEmbed, CommandInteraction } from "discord.js";
import Klar from "../../client";
import { interactionCommand } from "../../interfaces";
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
  run: async (client, interaction) => {
    const embed = new Discord.MessageEmbed().setColor(`WHITE`);

    let calc = interaction.options.getString("expression") as string;

    let resultado: any;
    try {
      resultado = math.eval(calc); // El Args toma el calculo
    } catch (e) {
      resultado = "Error: Entrada Invalida"; // Cuando es incorrecta
      embed.setColor("RED")
    }
    embed
      .addField("Entrada:", `\`\`\`js\n${calc}\`\`\``, false) // Te da el calculo
      .setTitle("Calculadora de Lyon")
      .addField("Resultado", `\`\`\`js\n${resultado}\`\`\``, false);
    await interaction.followUp({ embeds: [embed] });
  },
};
