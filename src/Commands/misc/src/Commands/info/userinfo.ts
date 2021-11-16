import Discord from "discord.js";
const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "userinfo",
  aliases: [],
  usage: 'userinfo',
  dev: true,
  category: 'Info',
  description: '',

run: async(client, message, args) => {



let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; // Definimos usuario, si mencionamos a alguien se obtendra su informacion, si no mencionamos a nadie se obtendra la informacion de "Nosotros"

	const row = new MessageActionRow().addComponents(
		new MessageButton()
		.setStyle("LINK")
		.setURL(`${user.user.displayAvatarURL()}`)
		.setLabel("Link del avatar")
	)

        let status; // Hacemos un let vacio
        switch (user.presence.status) {// Hacemos un switch de la funcion Presencia
            case "online":// En el caso online..
                status = "🟢 En linea";// hacemos que el status online pase a decir lo siguiente...
                break;
            case "dnd":// En el caso dnd..
                status = "⛔ No molestar";// hacemos que el status dnd pase a decir lo siguiente...
                break;
            case "idle":// En el caso idle..
                status = "🌙 Ausente";// hacemos que el status idle pase a decir lo siguiente...
                break;
            case "offline":// En el caso offline..
                status = "⚪ Desconectado";// hacemos que el status offline pase a decir lo siguiente...
                break;
        }

        const embed = new MessageEmbed() // Hacemos un nuevo embed
            .setTitle(`Informacion del usuario ${user.user.username}`) // Titulo - Recibimos el "user" y decimos su "username"
            .setColor(`WHITE`)// Color para hacerlo mas bonito <3
            .setThumbnail(user.user.displayAvatarURL({dynamic : true})) // Un Thumbnail de la foto de perfil del "user".
            .addFields(// Hacemos nuevas Fields
            {
              name: "Nombre",
              value: user.user.username,
              inline: true
            },
                {
                    name: "Apodo: ",// Nombre - Titulo - Caso 1
                    value: user.nickname ? user.nickname : "No tiene apodo", // Si el "user" tiene apodo se envia, si es false / no tiene Se envia diciendo que "No tiene Apodo"
                    inline: true // En linea: SI
                },
                {
                    name: "#️⃣ Tag: ",// Nombre - Titulo - Caso 1
                    value: `#${user.user.discriminator}`,// Del "user" sacamos su tag / discriminador
                    inline: true// En linea: SI
                },
                {
                    name: "🆔 ID: ",// Nombre - Titulo - Caso 1
                    value: user.user.id,// Del "user" sacamos su ID
                },
                {
                    name: "Reciente Actividad: ",// Nombre - Titulo - Caso 1
                    value: user.presence.status ? status : "⚪ Desconectado",// Acá se obtiene el estado del "user" con los casos ya dichos y explicado anteriormente.
                    inline: true// En linea: SI
                },
                {
                    name: "Estado: ",// Nombre - Titulo - Caso 1
                    value: user.presence.activities[0] ? user.presence.activities[0].state : "Sin estado",// Si el "user" tiene actividad se envia, si no la tiene se envia "Sin Estado"
                    inline: true// En linea: SI
                },
                {
                    name: 'Avatar link: ',// Nombre - Titulo - Caso 1
                    value: `En el botón.`// Del "user" obtenemos su Avatar Link, Hacemos que dentro del Array se encuentre el Link y cuando se de Click te reenviara una pagina viendo el avatar del "user"
                },
                {
                    name: 'Fecha de creación de la cuenta: ',// Nombre - Titulo - Caso 1
                    value: user.user.createdAt.toLocaleDateString("es-co"),// Del "user" obtenemos su Fecha de creacion y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true// En linea: SI
                },
                {
                    name: 'Fecha de entrada al Servidor: ',// Nombre - Titulo - Caso 1
                    value: user.joinedAt.toLocaleDateString("es-co"),// Del "user" obtenemos su Fecha de entrada al servidor en donde se envio el mensaje y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true// En linea: SI
                },
                {
                    name: 'Roles del usuario: ',// Nombre - Titulo - Caso 1
                    value: user.roles.cache.map(role => role.toString()).join(" "),// Del "user" obtenemos sus roles del server y lo mapeamos tambien lo separamos con una coma ","
                    inline: true// En linea: SI
                }
            )

            try {
         message.reply({embeds: [embed], components: [row]})// Y enviamos el mensaje
            } catch (err) {

let errmsg = new (require('discord.js')).MessageEmbed()
.setTitle('Ha ocurrido un error')
.setDescription(`**Tengo el siguiente error:** ${err}`)
.setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
.setFooter('Tipico')
.setColor("WHITE")
.setTimestamp()
 

                console.log(err)
            }
 }

}