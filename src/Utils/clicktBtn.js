const Discord = require('discord.js')
const fs = require('fs')

/**
 * @param {Discord.ButtonInteraction} button
 * @param {import('../index').clickBtnOptions} options
 */

/**
 --- options ---
 
credit => Boolean
ticketname => (Options {username} | {id} | {tag} ) String

embed => Embed
logembed => Embed
confirmEmb => Embed

logChannel => (Channel ID) String

closeColor => (ButtonColor) String
openColor => (ButtonColor) String
delColor => (ButtonColor) String
trColor => (ButtonColor) String

cooldownMsg => String
role => (Role ID) String
categoryID => String

embedDesc => String
embedColor => HexColor
embedTitle => String

delEmoji => (Emoji ID) String
closeEmoji => (Emoji ID) String
openEmoji => (Emoji ID) String
trEmoji => (Emoji ID) String

timeout => Boolean
pingRole => (Role ID) String

db => Database
 */

async function clickBtn(button, options = []) {
	if (button.isButton()) {
		try {
			if (options.credit === false) {
				;(foot = button.message.guild.name), button.message.guild.iconURL()
			} else {
				foot = '©️ Simply Develop. npm i simply-djs'
			}

			if (button.customId.startsWith('role-')) {
				button.deferReply({ ephemeral: true })
				let rle = button.customId.replace('role-', '')

				let real = button.guild.roles.cache.find((r) => r.id === rle)
				if (!real) return
				else {
					if (button.member.roles.cache.find((r) => r.id === real.id)) {
						button.followUp({
							content: 'Tu ya tienes el rol, te será removido.',
							ephemeral: true
						})

						button.member.roles
							.remove(real)
							.catch((err) =>
								button.message.channel.send(
									'Ese rol tiene una mayor jerarquía que la mía, no puedo continuar.'
								)
							)
					} else {
						button.followUp({
							content: `Te he dado el rol ${real} | Nombre: ${real.name} | ID: ${real.id}`,
							ephemeral: true
						})

						button.member.roles
							.add(real)
							.catch((err) =>
								button.message.channel.send(
									'El rol tiene una mayor jerarquía que la mia, no puedo continuar'
								)
							)
					}
				}
			}

			let { MessageButton, MessageActionRow } = require('discord.js')

			if (button.customId === 'create_ticket') {
				button.deferUpdate()
				let ticketname = `ticket_${button.user.id}`

				if (options.ticketname) {
					ticketname = options.ticketname
						.replace('{username}', button.user.username)
						.replace('{id}', button.user.id)
						.replace('{tag}', button.user.tag)
				}

				let topic = `Ticket de <@${button.user.id}>`
				let antispamo = await button.guild.channels.cache.find(
					(ch) => ch.topic === topic
				)

				if (options.trColor) {
					if (options.trColor === 'grey') {
						options.trColor = 'SECONDARY'
					} else if (options.trColor === 'red') {
						options.trColor = 'DANGER'
					} else if (options.trColor === 'green') {
						options.trColor = 'SUCCESS'
					} else if (options.trColor === 'blurple') {
						options.trColor = 'PRIMARY'
					}
				}

				if (options.closeColor) {
					if (options.closeColor === 'grey') {
						options.closeColor = 'SECONDARY'
					} else if (options.closeColor === 'red') {
						options.closeColor = 'DANGER'
					} else if (options.closeColor === 'green') {
						options.closeColor = 'SUCCESS'
					} else if (options.closeColor === 'blurple') {
						options.closeColor = 'PRIMARY'
					}
				}

				if (options.openColor) {
					if (options.openColor === 'grey') {
						options.openColor = 'SECONDARY'
					} else if (options.openColor === 'red') {
						options.openColor = 'DANGER'
					} else if (options.openColor === 'green') {
						options.openColor = 'SUCCESS'
					} else if (options.openColor === 'blurple') {
						options.openColor = 'PRIMARY'
					}
				}

				if (options.delColor) {
					if (options.delColor === 'grey') {
						options.delColor = 'SECONDARY'
					} else if (options.delColor === 'red') {
						options.delColor = 'DANGER'
					} else if (options.delColor === 'green') {
						options.delColor = 'SUCCESS'
					} else if (options.delColor === 'blurple') {
						options.delColor = 'PRIMARY'
					}
				}

				if (antispamo) {
					button.followUp({
						content:
							options.cooldownMsg ||
							'You already have a ticket opened.. Please delete it before opening another ticket.',
						ephemeral: true
					})
				} else if (!antispamo) {
					chparent = options.categoryID || null
					let categ = button.guild.channels.cache.get(options.categoryID)
					if (!categ) {
						chparent = null
					}

					button.guild.channels
						.create(ticketname, {
							type: 'text',
							topic: topic,
							parent: chparent,
							permissionOverwrites: [
								{
									id: button.message.guild.roles.everyone,
									deny: [
										'VIEW_CHANNEL',
										'SEND_MESSAGES',
										'READ_MESSAGE_HISTORY'
									] //Deny permissions
								},
								{
									id: button.user.id,
									allow: [
										'VIEW_CHANNEL',
										'SEND_MESSAGES',
										'READ_MESSAGE_HISTORY'
									]
								}
							]
						})
						.then((ch) => {
							let lep = []

							if (options.role && Array.isArray(options.role)) {
								options.role.forEach((e) => {
									let rw = button.guild.roles.cache.find((r) => r.id === e)

									if (rw) {
										lep.push(e)
									}
								})
							} else if (options.role && !Array.isArray(options.role)) {
								let rew = button.guild.roles.cache.find(
									(r) => r.id === options.role
								)

								if (rew) {
									lep.push(options.role)
								}
							}

							if (options.pingRole && Array.isArray(options.pingRole)) {
								options.pingRole.forEach(e => {
									let rw = button.guild.roles.cache.find((r) => r.id === e)

									if (rw) {
										lep.push(e)
									}
								})
							} else if (options.pingRole && !Array.isArray(options.pingRole)) {
								let rww = button.guild.roles.cache.find(
									(r) => r.id === `${options.pingRole}`
								)

								if (rww) {
									lep.push(options.pingRole)
								}
							}

							lep.forEach((e) => {
								ch.permissionOverwrites
									.create(e, {
										VIEW_CHANNEL: true,
										SEND_MESSAGES: true,
										READ_MESSAGE_HISTORY: true
									})
									.catch((er) => {
										console.log(`Error | clickBtn | ${er.stack}`)
										ch.send({ content: `Ocurrió un error.` })
									})
							})

							let lele =
								'\nEste canal será eliminado en 10 minutos.'

							if (options.timeout === false) {
								lele = ''
							}

							let emb = new Discord.MessageEmbed()
								.setTitle('Ticket Creado')
								.setDescription(
									options.embedDesc ||
										`Este ticket ha sido creado por ${button.user}. \n**User ID**: \`${button.user.id}\` | **User Tag**: \`${button.user.tag}\`\n${lele}`
								)
								.setThumbnail(button.message.guild.iconURL())
								.setTimestamp()
								.setColor(options.embedColor || '#075FFF')
								.setFooter(foot)

							if (options.embed) {
								options.embed.description = options.embed.description
									.replaceAll('{tag}', button.user.tag)
									.replaceAll('{user}', button.user)
									.replaceAll('{id}', button.user.id)
									.replaceAll('{timeout}', lele)
									.replaceAll('{guild}', button.guild.name)
							}

							let close_btn = new MessageButton()
								.setStyle(options.closeColor || 'PRIMARY')
								.setEmoji(options.closeEmoji || '🔒')
								.setLabel('Close')
								.setCustomId('close_ticket')

							let closerow = new MessageActionRow().addComponents([close_btn])
							let pingrole = []

							if (options.pingRole) {
								if (options.pingRole && Array.isArray(options.pingRole)) {
									options.pingRole.forEach(e => {
										let rollw = button.guild.roles.cache.find((r) => r.id === `${e}`)

										if (rollw) {
											pingrole.push(`${rollw}`)
										}
									})
								} else if (
									options.pingRole &&
									!Array.isArray(options.pingRole)
								) {
									let rol = button.guild.roles.cache.find(
										(r) => r.id === `${options.pingRole}`
									)

									if (rol) {
										pingrole.push(`${rol}`)
									}
								}
							}

							if (pingrole.length === 0) {
								pingrole = ''
							}

							ch.send({
								content: `${button.user} -${pingrole}-`,
								embeds: [options.embed || emb],
								components: [closerow]
							}).then(async (msg) => {
								await msg.pin()
							})

							if (options.timeout === false) return
						})
				}
			}

			if (button.customId === 'tr_ticket') {
				button.deferUpdate()
				let messagecollection = await button.channel.messages.fetch({
					limit: 100
				})
				let response = []

				messagecollection = messagecollection.sort(
					(a, b) => a.createdTimestamp - b.createdTimestamp
				)

				messagecollection.forEach((m) => {
					if (m.author.bot) return
					const attachment = m.attachments.first()
					const url = attachment ? attachment.url : null
					if (url !== null) {
						m.content = url
					}

					response.push(`| ${m.author.tag} | => ${m.content}`)
				})

				let kek = await button.followUp({
					embeds: [
						new Discord.MessageEmbed()
							.setColor('#075FFF')
							.setAuthor(
								'Creando un log...',
								'https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1'
							)
					]
				})

				let attach = new Discord.MessageAttachment(
					Buffer.from(response.toString().replaceAll(',', '\n'), 'utf-8'),
					`${button.channel.topic}.txt`
				)

				setTimeout(async () => {
					await kek.edit({ files: [attach], embeds: [] })
				}, 3000)
			}
			if (button.customId === 'close_ticket') {
				button.deferUpdate()

				button.channel.permissionOverwrites
					.edit(button.user.id, {
						SEND_MESSAGES: false,
						VIEW_CHANNEL: true
					})
					.catch((err) => {})

				let X_btn = new MessageButton()
					.setStyle(options.delColor || 'SECONDARY')
					.setEmoji(options.delEmoji || '❌')
					.setLabel('Eliminar')
					.setCustomId('delete_ticket')

				let open_btn = new MessageButton()
					.setStyle(options.openColor || 'SUCCESS')
					.setEmoji(options.openEmoji || '🔓')
					.setLabel('Reabrir')
					.setCustomId('open_ticket')

				let tr_btn = new MessageButton()
					.setStyle(options.trColor || 'PRIMARY')
					.setEmoji(options.trEmoji || '📜')
					.setLabel('Log')
					.setCustomId('tr_ticket')

				let row = new MessageActionRow().addComponents([
					open_btn,
					X_btn,
					tr_btn
				])

				button.message.edit({
					content: `${button.user}`,
					components: [row]
				})
			}

			if (button.customId === 'open_ticket') {
				button.deferUpdate()
				button.channel.permissionOverwrites
					.edit(button.user.id, {
						SEND_MESSAGES: true,
						VIEW_CHANNEL: true
					})
					.catch((err) => {})

				let close_btn = new MessageButton()
					.setStyle(options.closeColor || 'PRIMARY')
					.setEmoji(options.closeEmoji || '🔒')
					.setLabel('Cerrar')
					.setCustomId('close_ticket')

				let closerow = new MessageActionRow().addComponents([close_btn])

				button.message.edit({
					content: `${button.user}`,
					components: [closerow]
				})
				button.followUp({ content: 'El ticket se ha reabierto', ephemeral: true })
			}

			if (button.customId === 'delete_ticket') {
				button.deferUpdate()
				let surebtn = new MessageButton()
					.setStyle('DANGER')
					.setLabel('Eliminar')
					.setCustomId('s_ticket')

				let nobtn = new MessageButton()
					.setStyle('SUCCESS')
					.setLabel('Cancelar')
					.setCustomId('no_ticket')

				let row1 = new MessageActionRow().addComponents([surebtn, nobtn])

				let emb = new Discord.MessageEmbed()
					.setTitle('¿Quieres continuar?')
					.setDescription(
						`Esta acción borrará el canal y el ticket. Esto es **Irreversible**`
					)
					.setTimestamp()
					.setColor('#ffffff')
					.setFooter(foot)

				button.followUp({
					embeds: [options.confirmEmb || emb],
					components: [row1]
				})
			}

			if (button.customId === 's_ticket') {
				button.reply({
					content: 'Eliminando el ticket.. Por favor espere.'
				})

				let logch = button.message.guild.channels.cache.get(options.logChannel)

				if (logch) {
					let messagecollection = await button.channel.messages.fetch({
						limit: 100
					})
					let response = []

					messagecollection = messagecollection.sort(
						(a, b) => a.createdTimestamp - b.createdTimestamp
					)

					messagecollection.forEach((m) => {
						if (m.author.bot) return
						const attachment = m.attachments.first()
						const url = attachment ? attachment.url : null
						if (url !== null) {
							m.content = url
						}

						response.push(`| ${m.author.tag} | => ${m.content}`)
					})

					let attach = new Discord.MessageAttachment(
						Buffer.from(response.toString().replaceAll(',', '\n'), 'utf-8'),
						`${button.channel.topic}.txt`
					)

					let embbb = new Discord.MessageEmbed()
						.setTitle('Ticket eliminado!')
						.setDescription(
							`Un ticket fue eliminado por *<@${button.user.id}>* | Tag: ***${button.user.tag}***\n\nNombre del ticket: \`${button.channel.name}\` | ID del ticket: \`${button.channel.id}\`\n${button.channel.topic}`
						)
						.setTimestamp()
						.setColor('#ffffff')
						.setFooter(foot)

					let ek = button.channel.name

					if (options.logembed) {
						options.logembed.description = options.logembed.description
							.replaceAll('{username}', button.user.username)
							.replaceAll('{id}', button.user.id)
							.replaceAll('{tag}', button.user.tag)
							.replaceAll('{chname}', button.channel.name)
							.replaceAll('{chtopic}', button.channel.topic)
							.replaceAll('{chid}', button.channel.id)
					}

					setTimeout(async () => {
						logch
							.send({
								embeds: [options.logembed || embbb],
								components: []
							})
							.then((c) => {
								c.channel.send({
									content: `***Archivo:*** \`#${ek}\``,
									files: [attach]
								})
							})
					}, 3000)
				}

				setTimeout(() => {
					let delch = button.message.guild.channels.cache.get(
						button.message.channel.id
					)
					delch.delete().catch((err) => {
						button.message.channel.send({
							content: 'Ha ocurrido un error. ' + err,
							ephemeral: true
						})
					})
				}, 2000)
			}

			if (button.customId === 'no_ticket') {
				button.deferUpdate()

				button.followUp({
					content: 'La eliminación del ticket fue cancelada',
					ephemeral: true
				})

				button.message.delete()
			}
        } catch(err) {
            console.log(err)
        }
    }
}

module.exports = clickBtn; 