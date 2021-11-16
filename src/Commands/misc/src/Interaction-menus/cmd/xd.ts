import { Client, CommandInteraction, ContextMenuInteraction, MessageEmbed } from "discord.js";
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
    run: async (client: Klar, interaction: ContextMenuInteraction) => {

	let member = await client.users.fetch(interaction.targetId);

		const embed = new MessageEmbed()
			.setDescription(`Avatar de: __**${member.username}**__`)
			.addField('Pedido por:', `${interaction.member}`)
			.setImage(member.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))	
			.setColor('WHITE')
			.setFooter(':)', client.user?.displayAvatarURL())
			.setTimestamp();

        interaction.followUp({ embeds: [embed]});
    },
};