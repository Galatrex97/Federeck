import Discord, { Client, MessageEmbed, MessageActionRow, MessageButton, Message } from "discord.js";
import moment from "moment";
import play from "google-play-scraper";
import Klar from "../../Client";
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "play-store",
  aliases: ["playstore"],
  usage: 'play-store <app>',
  category: 'Misceláneo',
  description: '',

run: async(client, message, args) => {



    let busqueda = args.join(" ")
    if(!busqueda){
        return message.reply({ content: "Que quieres buscar?"})
    }
    play.search({
        term: busqueda,
        num: 1
        }).then(aa =>{
    play.app({
			appId: aa[0].appId,
			lang: "es"
		}).then(async gg => {

const numb=gg.reviews;

function separator(numb) {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
}

let jaj = moment(gg.updated).locale("es").fromNow();


const row = new MessageActionRow().addComponents(
	new MessageButton()
	.setCustomId("playstore_text")
	.setStyle("PRIMARY")
	.setLabel("Descripción completa"),
		new MessageButton()
	.setURL(gg.url)
	.setStyle("LINK")
	.setLabel("App URL"),
			new MessageButton()
	.setURL(gg.developerWebsite + "")
	.setStyle("LINK")
	.setLabel("Sitio web de "+gg.title)
)


        const embed = new Discord.MessageEmbed()
        .setColor("WHITE")
				.setTitle("Aplicación")
        .setThumbnail(gg.icon)
        .addField("Nombre",gg.title, true)
				.addField("Puntuación", `${gg.scoreText} ⭐`, true)
        .addField("Resumen",gg.summary, true)
        .addField("Reseñas", `${separator(numb)}`, true)
				.addField("Descargas",gg.installs, true)
        .addField("Precio",`${gg.priceText.replace("Free", "Gratis")}`, true)
        .addField("ID (Nombre del paquete)",gg.appId, true)
				.addField("Actualizado", gg.updated ? jaj : "No hay datos", true )
        .addField("Género", `${gg.genre}`, true)
				.addField("Creado el", gg.released ? `${gg.released} (${moment(new Date(gg.released.replace("abr", "apr").replace("ago", "aug").replace("ene", "jan").replace("dic", "dec"))).locale("es").fromNow()})`: "No hay datos", true)
				.addField("Descripción (recortada)", `${gg.description.split(".")[0].slice(0, 256)}.`)
        .addField("Creador","Nombre: "+gg.developer+"\n"+"Gmail: "+gg.developerEmail+"\n"+"Dirección: "+`${gg.developerAddress || "No hay datos"}`+ "\n" +"ID: "+gg.developerId)
        .addField("Novedades",`${gg.recentChanges ? gg.recentChanges.replace(/<br>/g, "\n").replace(/&quot;/g, `"`) : "No hay datos" }`)
        .setFooter("Encontré la aplicación")
        .setTimestamp()
let msg = await message.reply({embeds: [embed], components: [row]})

const desc = new MessageEmbed()
.setColor("WHITE")
.setTitle(`Descripcion completa de ${gg.title}`)
.setDescription(`${gg.description}`)
.setThumbnail(gg.icon)

const collector = msg.createMessageComponentCollector({
  componentType: "BUTTON",
  time: 7500
});

	collector.on("collect", (interactionxd) => {

interactionxd.deferUpdate();


		const id = interactionxd.customId;
		if(id === "playstore_text") {
		interactionxd.user.send({embeds: [desc]})
			msg.channel.send(`${interactionxd.user} he enviado la descripción completa de la aplicación ${gg.title} a tu MD`)
		} 
	})

  collector.on("end", () => {
    msg.channel.send("Se han acabado los 7 segundos para ver la descripción.")
  })



    }).catch(error => {
        message.reply({content: `Ha ocurrido un error con la búsqueda: ${busqueda}`})

let errmsg = new (require('discord.js')).MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${error.stack}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 

				console.log(error)
    })
}) 
 
 }

}