import Discord, { Client, CommandInteraction, MessageEmbed } from "discord.js";
import figlet from "figlet";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
  name: "ascii",
  description: "Muestra un texto en formato ASCII",
  options: [
    {
      name: "text",
      description: "Texto a convertir",
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
    let str = interaction.options.getString("text") as string;

    if (str.length > 15) {
      return interaction.followUp(
        "El texto no puede sobrepasar los 15 carácteres para evitar errores."
      );
    }

    figlet(str, (err: any, data: any) =>
      interaction.followUp("```" + data + "```")
    );
  },
};
