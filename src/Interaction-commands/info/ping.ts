import {
  Client,
  CommandInteraction,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import mongoose from "mongoose";
import { interactionCommand } from "../../interfaces";
export const Interaction: interactionCommand = {
  name: "ping",
  description: "Muestra información detallada sobre mi latencia.",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {

    let date = Date.now();
    let pingDataBase = await new Promise((r, j) => {
      mongoose.connection.db
        .admin()
        .ping((err: any, result: any) => r(Date.now() - date));
    });

    let embed = new MessageEmbed()
      .setTitle("Latencia")
      .setDescription(
        `**Latencia de la API de Discord:** ${
          client.ws.ping
        } ms\n**Latencia general:** ${
          Date.now() - interaction.createdTimestamp
        } ms\n**Latencia de la base de datos:** ${pingDataBase} ms`
      )
      .setColor("WHITE");

      interaction.followUp({
        embeds: [embed],
      });

  },
};