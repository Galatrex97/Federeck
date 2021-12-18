import {
  Client,
  CommandInteraction,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import { interactionCommand } from "../../interfaces";
export const Interaction: interactionCommand = {
  name: "uptime",
  description: "Muestra información sobre cuánto tiempo estuve en línea desde la última conexión",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    let days = Math.floor((client.uptime as any) / 86400000);
    let hours = Math.floor((client.uptime as any) / 3600000) % 24;
    let minutes = Math.floor((client.uptime as any) / 60000) % 60;
    let seconds = Math.floor((client.uptime as any) / 1000) % 60;

    const ugu = new MessageEmbed()
      .setTitle("**Tiempo online**")
      .setDescription(
        `:clock1: \`${days} Días\` \`${hours} Horas\` \`${minutes} Minutos\` \`${seconds} Segundos\``
      )
      .setColor("WHITE")
      .setTimestamp();

    
      interaction.followUp({ embeds: [ugu] });
  },
};