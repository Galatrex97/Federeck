import {
  Client,
  CommandInteraction,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import { interactionCommand } from "../../Interfaces";
import morse from "morse";
export const Interaction: interactionCommand = {
  name: "morse",
  description: "Codifica o decodifica texto morse",
  options: [
    {
      name: "option",
      description: "Codificar o Decodificar morse",
      type: "STRING",
      choices: [
          {
          name: "encode",
          value: "encode"
      },
      {
          name: "decode",
          value: "decode"
      }
    ],
      required: true,
    },
    {
        name: "text",
        description: "Texto a manipular",
        type: "STRING",
        required: true,
    }
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
let opt = interaction.options.getString("option");
let text = interaction.options.getString("text");

if(opt === "decode") {
let decoded = await morse.decode(text);
let embed = new MessageEmbed()
.setTitle("Morse")
.setColor("WHITE")
.addField("Acción", `Decodificación`, true)
.addField("Entrada", `${text}`, true)
.addField("Resultado", `${decoded}`, true)



await interaction.followUp({ embeds: [embed] });

} else if(opt === "encode") {
    let encoded = await morse.encode(text);
    let embed = new MessageEmbed()
    .setTitle("Morse")
    .setColor("WHITE")
    .addField("Acción", `Codificación`, true)
    .addField("Entrada", `${text}`, true)
    .addField("Resultado", `${encoded}`, true)
    
    
    
    await interaction.followUp({ embeds: [embed] });
}

  },
};