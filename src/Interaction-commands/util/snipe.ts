import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
import moment from "moment";
export const Interaction: interactionCommand = {
  name: "snipe",
  description:
    "Mira el último mensaje borrado en este canal o un canal mencionado",
  options: [
    {
      name: "channel",
      description: "Ve los mensajes borrados en el canal seleccionado.",
      type: "CHANNEL",
      required: false,
    },
    {
      name: "pos",
      description: "Posición del mensaje borrado",
      type: "NUMBER",
      required: false
    }
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    let chan = interaction.options.getChannel("channel");
    let str = interaction.options.getNumber("pos") as number;
    let snipes: any;

    if (chan) {
     snipes = await client.snipes.get(chan.id);
    } else {
     snipes = await client.snipes.get(interaction.channel?.id);
    }
    //en esta constante definimos nuestro client.snipes que es nuestro objeto Map, con el metodo .get() tratamos de ver si channel.id(id del canal) esta dentro del Map
    if (!snipes) {
      return await interaction.followUp({
        content: "No se ha borrado recientemente ningún mensaje",
        ephemeral: true,
      });
    }
      //Si no lo esta mandamos este mensaje ^
      let snipe = +str - 1 || 0;

      const target = snipes[snipe];
      if (snipes.length === 1 && !target) {
        return interaction.followUp(
          `Solo hay ${snipes.length} mensaje borrado recientemente en este canal`
        );
      }
  
      if (snipes.length >= 2 && !target) {
        return interaction.followUp(
          `Solo hay ${snipes.length} mensajes borrados recientemente en este canal`
        );
      }
      let { msg, timeAgo, image } = target;
  
      try {
        interaction.followUp({
          embeds: [
            new MessageEmbed()
              .setColor("WHITE")
              .setAuthor(
                `Mensaje de ${msg.author.tag}`,
                msg.author.displayAvatarURL()
              )
              .addField("Canal", `<#${msg.channel.id}>`)
              .setImage(image)
              .setFooter(
                `Borrado ${moment(timeAgo).locale("es").fromNow()} | ${
                  snipe + 1
                } / ${snipes.length}`
              )
              .setDescription(msg.content),
          ],
        });
      } catch (err) {
        console.log(err);
      }
    /* 
Cada Valor esta en el evento messageDelete del cual en el comando los vas a obtener.
*/
    
  },
};
