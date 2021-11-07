import { Client, CommandInteraction, Guild, GuildMember, MessageEmbed, User } from "discord.js";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
    name: "ban",
    description: "Banea un usuario",
    options: [
			{
				name: 'user',
				description: 'Usuario a banear',
				type: 'USER',
				required: true
			},
			{
				name: 'reason',
				description: 'Razón del baneo',
				type: 'STRING',
				required: true
			},
		],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client: Klar, interaction: CommandInteraction) => {


let a = interaction.member;
const guild = interaction.guild as Guild;
const owner: any = (await guild.fetchOwner()).user.id;
const banReason = interaction.options.getString('reason') as string;
const user = interaction.options.getUser('user') as User;
const member: any = interaction.guild?.members.cache.get(user.id) || await interaction.guild?.members.fetch(user.id).catch(err => {})
if(user?.id === owner && user?.id === interaction.user.id) {
 return interaction.followUp({ content: 'No te puedes banear a ti mismo, además tu eres el dueño del servidor.', ephemeral: true	})
} if(member?.id === owner) {
 return interaction.followUp({content: "No puedes banear al dueño del servidor.", ephemeral: true})
} if(member?.id === interaction.user.id) {
 return interaction.followUp({content:"No te puedes banear a ti mismo.", ephemeral: true})
}
	 if(!interaction.guild?.me?.permissions.has("BAN_MEMBERS")) {
 return interaction.followUp({content: "No tengo el permiso para banear miembros, así que no se puede usar ese comando.", ephemeral: true})
	}
	 if(!(interaction.member as GuildMember).permissions.has("BAN_MEMBERS")) {
 return interaction.followUp({content: "No tienes el permiso para **Banear miembros**.", ephemeral: true})
	}
	if(client.user?.id === user?.id) {
 return interaction.followUp({content: "No me puedes banear.", ephemeral: true})
	}/*  else if (interaction.member.roles.highest.position <= member.roles.highest.position) {
		        return interaction.followUp({content: 'No puedes banear a una persona con un mayor o igual rango que tú.', ephemeral: true})
	 } */  
	 if (!user?.bot) {
		   const nya = new MessageEmbed()
  .setTitle("Adiós.")
  .setDescription(`Has sido baneado de **${interaction.guild?.name}** por el Moderador: **${interaction.user.username}**.\nLa razón de tu baneo fue: **${banReason}**.`)
  .setTimestamp()
	.setFooter("Hasta pronto.")
	try {
	
		 			member?.ban({ reason: banReason })
					 	 member?.send({embeds: [nya]})
					         interaction.followUp({ content: `El usuario **${user}** ha sido Baneado.\nModerador: ${interaction.user.toString()}\nRazón: **${banReason}**`, ephemeral: false });
	} catch (err: any) {
		let errmsg = new MessageEmbed()
		.setTitle('Ha ocurrido un error')
		.setDescription(`**Tengo el siguiente error:** ${err}`)
		.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
		.setFooter('Tipico')
		.setTimestamp()
		.setColor("WHITE")
		 
		console.log(err)
	}
	 } 
	 if (user?.bot){

		try {
			member?.ban({ reason: banReason })
			interaction.followUp({ content: `El bot **${user}** ha sido Baneado.\nModerador: ${interaction.user.toString()}\nRazón: **${banReason}**`, ephemeral: false });
		} catch (err: any) {

let errmsg = new MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 

			console.log(err)
		}

				
	}
    },
};