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

run: (client: Klar, message: Message, args: String[], p: string) => {

	if(!message.member?.permissions.has("MANAGE_MESSAGES")) return message.reply("Necesitas el permiso **Gestionar mensajes**.").then(nya => {
  setTimeout(() => {
    nya.delete()
  }, 7000)
})

if(!args[0]) return;

	if(args[0] === 'on') {
		antilink.findOne({ Guild: message.guild?.id }, async(err, data) => {
			if(data.jaja === true) {
				return message.reply({ content: `El antilink ya estaba activado. Usa \`${p}antilink off\` para desactivarlo`})
			}
	if (err) console.log(err);
	if(data) {
		await antilink.findOneAndDelete({ Guild: message.guild?.id })
		data = new antilink({
			Guild: message.guild?.id,
			jaja: true
		})
		data.save()
		message.reply({ content: "El antilink ha sido activado. Ahora solo los administradores pueden enviar links."})
	}
	if (!data) {
		data = new antilink({
			Guild: message.guild?.id,
			jaja: true
		})
		data.save()
		message.reply({ content: "El antilink ha sido activado por primera vez"})
	}
})
	} else if(args[0] === 'off') {
		antilink.findOne({ Guild: message.guild?.id }, async(err, data) => {
			if(data.jaja === false){
				return message.reply({ content: `El antilink ya estaba desactivado. Prueba \`${p}antilink on\` para activarlo.`})
			}
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
		await antilink.findOneAndDelete({ Guild: message.guild?.id })
		data = new antilink({
			Guild: message.guild?.id,
			jaja: false
		})
		data.save()
		message.reply({ content: "El antilink ha sido desactivado. Ahora pueden enviar links."})
	}
		})
	} else {
		return;
	}

  
 }

}