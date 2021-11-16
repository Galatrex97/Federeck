import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
    name: "play",
    description: "Reproduce una canción",
    options: [
			{
				name: 'song',
				description: 'Canción a reproducir',
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
    run: async (client: Klar, interaction: any) => {

    if(!interaction.member.voice.channel) return interaction.followUp("Debes estar en un canal de voz...")

    if(interaction.guild?.me?.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...")
			
			let voice = interaction.member.voice.channel
			const song = interaction.options.getString("song")
			let member = interaction.member
			let channel = interaction.channel


			interaction.followUp("Buscando...")
			try {
			client.distube.playVoiceChannel(voice, song, {
				member: member,
				textChannel: channel,
				
			})
		} catch (err: any) {

			let errmsg = new MessageEmbed()
			.setTitle('Ha ocurrido un error')
			.setDescription(`**Tengo el siguiente error:** ${err.stack}`)
			.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
			.setFooter('Tipico')
			.setColor("WHITE")
			.setTimestamp()
			 

			console.log(err)
		}
    },
};