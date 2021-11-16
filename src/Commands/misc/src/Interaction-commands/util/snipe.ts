import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
    name: "snipe",
    description: "Mira el último mensaje borrado en este canal o un canal mencionado",
    options: [
			{
				name: 'channel',
				description: 'Ve los mensajes borrados en el canal seleccionado.',
				type: 'CHANNEL',
				required: false
			},
		],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client: Klar, interaction: CommandInteraction) => {

let chan = interaction.options.getChannel("channel")

let msg: any;

if(chan) {
    msg = await client.snipes.get(chan.id)
} else {
    msg = await client.snipes.get(interaction.channel?.id)
}
//en esta constante definimos nuestro client.snipes que es nuestro objeto Map, con el metodo .get() tratamos de ver si channel.id(id del canal) esta dentro del Map  
    if (!msg){

	 await interaction.followUp({ content:"No se ha borrado recientemente ningún mensaje", ephemeral: true });
//Si no lo esta mandamos este mensaje ^    
	}else{

 const main = new MessageEmbed()
 .setColor("WHITE")
 .setAuthor(`Mensaje Escrito de ${msg.delete.tag}`, msg.delete.displayAvatarURL())
 .addField("Canal", `<#${msg.canal.id}>`)
 .setDescription(`${msg.content}`)
 await interaction.followUp({embeds: [main]});
}
/* 
Cada Valor esta en el evento messageDelete del cual en el comando los vas a obtener.
*/

    },
};