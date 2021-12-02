import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import * as Discord from "discord.js";
import Klar from "../../Client";
import beautify from "beautify";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
  name: "eval-e",
  description: "Evalúa un code",
  options: [
    {
      name: "beval",
      description: "Lo que se evaluará",
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
    let toEval = interaction.options.getString("beval") as string;

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
        evaluated = eval(toEval); //"evaluated" va a evaluar el comando
      } catch (err) {
        console.log(err);
      } //Se usa beautify para que funcione
      let embed = new Discord.MessageEmbed() //Creamos otro embed
        .setColor("WHITE")
        .setTimestamp() //Usamos un Timestamp
        .setFooter(
          client.user?.username as string,
          client.user?.displayAvatarURL()
        )
        .setTitle(`:desktop: ${client.user?.username}`)
        .setDescription("Esto fue el resultado de lo que ingresaste")
        .addField(
          "Codigo:",
          "```js\n" + beautify(toEval, { format: "js" }) + "```"
        )
        .addField("Evaluado:", "```js\n" + evaluated + "```"); //Aca aparecera lo que se evalua
      interaction.followUp({ embeds: [embed] });
    } catch (err) {
      //Hacemos un catch y que defina err

      let embed2 = new Discord.MessageEmbed()
        .setTimestamp()
        .setFooter(
          client.user?.username as string,
          client.user?.displayAvatarURL()
        )
        .addField(
          "Hubo un error con el codigo que evaluaste",
          "```js\n" + err + "```"
        ) //Va a aparecer el error
        .setColor("WHITE");
      return interaction.followUp({ embeds: [embed2] });
    }
  },
};
