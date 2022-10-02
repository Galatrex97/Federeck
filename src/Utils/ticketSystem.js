const Discord = require('discord.js')

/**
 * @param {Discord.Message} message
 * @param {Discord.TextChannel} channel
 * @param {import('../index').ticketSystemOptions} options
 */

/**
 --- options ---
 
  color => (ButtonColor) String
  emoji => (Emoji ID) String

  credit => Boolean
  slash => Boolean

  embed => Embed
  
  embedFoot => String
  embedDesc => String
  embedTitle => String
  embedColor => HexColor
 */

async function ticketSystem(message, channel, options = []) {
	try {
		let { MessageButton, MessageActionRow } = require('discord.js')

		if (!message.member.permissions.has('ADMINISTRATOR'))
			return message.reply({
				content: 'Necesitas el permiso de Adminisrador para configurar los tickets.'
			})
		if (!message.guild.me.permissions.has('MANAGE_CHANNELS'))
			return message.reply({
				content:
					'Necesito el permiso **Gestionar Canales** para realizar esta acción.'
			})

		if (options.color) {
			if (options.color === 'grey') {
				options.color = 'SECONDARY'
			} else if (options.color === 'red') {
				options.color = 'DANGER'
			} else if (options.color === 'green') {
				options.color = 'SUCCESS'
			} else if (options.color === 'blurple') {
				options.color = 'PRIMARY'
			}
		}
		let ticketbtn = new MessageButton()
			.setStyle(options.color || 'SECONDARY')
			.setEmoji(options.emoji || '🎫')
			.setLabel('Ticket')
			.setCustomId('create_ticket')

		if (options.credit === false) {
			;(foot = options.embedFoot || message.guild.name), message.guild.iconURL()
		} else {
			foot = '©️ Simply Develop. npm i simply-djs'
		}

		let a = new MessageActionRow().addComponents([ticketbtn])

		let embed = new Discord.MessageEmbed()
			.setTitle(options.embedTitle || 'Create a ticket')
			.setDescription(
				options.embedDesc || '🎫 Create a ticket by clicking the button 🎫'
			)
			.setThumbnail(message.guild.iconURL())
			.setTimestamp()
			.setColor(options.embedColor || '#075FFF')
			.setFooter(foot)

		try {
			if (options.slash === true || message.commandId) {
				message.followUp('Se configuraron los tickets en ese canal')
				channel.send({ embeds: [options.embed || embed], components: [a] })
			} else if (options.slash === false || !message.commandId) {
				channel.send({ embeds: [options.embed || embed], components: [a] })
			}
		} catch (err) {
			channel.send({ content: 'Ha ocurrido un error' })
		}
	} catch (err) {
		console.log(`Ha ocurrido un error`)
	}
}
module.exports = ticketSystem;
