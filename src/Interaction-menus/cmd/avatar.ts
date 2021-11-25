import {
  Client,
  CommandInteraction,
  ContextMenuInteraction,
  MessageEmbed,
} from "discord.js";
import Klar from "../../Client";
import { interactionMenu } from "../../Interfaces";
export const InteractionMenu: interactionMenu = {
  name: "Avatar",
  type: "USER",
  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    let fetchedMember = await client.users.fetch(interaction.targetId);

const pfp = fetchedMember.displayAvatarURL({ dynamic: true, size: 4096 })

    const embed = new MessageEmbed()
      .setDescription(`Avatar de: __**${fetchedMember.username}**__`)
      .addField("Pedido por:", `${interaction.member}`)
      .setImage(`${pfp}`)
      .setColor("WHITE")
      .setFooter(":)", client.user?.displayAvatarURL())
      .setTimestamp();

    interaction.followUp({ embeds: [embed] });
  },
};
