import Discord, { Client, MessageEmbed, Message } from "discord.js";
import antilink from "../../Models/antilinkbv";
import Klar from "../../Client";
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "antilink",
  aliases: ["antilinks"],
  usage: 'antilinks on/off',
  category: 'Configuración',
  description: '',

run: async(client, message, args, p) => {

	if(!message.member?.permissions.has("MANAGE_MESSAGES")) return message.reply("Necesitas el permiso **Gestionar mensajes**.").then(nya => {
  setTimeout(() => {
    nya.delete()
  }, 7000)
})

if(!args[0]) return message.channel.send("Tienes que especificar. (on/off)");

	if(args[0] === 'on') {
		await antilink.findOne({ guild: message.guild?.id }, async(err: Error, data: any) => {
	if (err) console.log(err);
	if(data) {
		if(data?.jaja === true) {
			return message.reply({ content: `El antilink ya estaba activado. Usa \`${p}antilink off\` para desactivarlo`})
		}
		await antilink.findOneAndDelete({ guild: message.guild?.id })
		data = new antilink({
			guild: message.guild?.id,
			jaja: true
		})
		data.save()
		message.reply({ content: "El antilink ha sido activado. Ahora solo los administradores pueden enviar links."})
	}
	if (!data) {
		data = new antilink({
			guild: message.guild?.id,
			jaja: true
		})
		data.save()
		message.reply({ content: "El antilink ha sido activado por primera vez"})
	}
})
	} else if(args[0] === 'off') {
		await antilink.findOne({ guild: message.guild?.id }, async(err: any, data: any) => {
			if(err) {
		console.log(err)

let errmsg = new MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err.stack}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 

			}
			if(!data) {
			return message.reply({ content: `El antilink por defecto viene deshabilitado. Usa \`${p}antilink on\` para activarlo por primera vez.`})
			}else if(data) {
				if(data?.jaja === false){
					return message.reply({ content: `El antilink ya estaba desactivado. Prueba \`${p}antilink on\` para activarlo.`})
				}

		await antilink.findOneAndDelete({ guild: message.guild?.id })
		data = new antilink({
			guild: message.guild?.id,
			jaja: false
		})
		data.save()
		message.reply({ content: "El antilink ha sido desactivado. Ahora pueden enviar links."})
	}
		})
	} else {
		return message.channel.send("Ese argumento no es válido. Usa on/off");
	}

  
 }

}