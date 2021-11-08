"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
exports.command = {
    name: "userinfo",
    aliases: [],
    usage: 'userinfo',
    dev: true,
    category: 'Info',
    description: '',
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; // Definimos usuario, si mencionamos a alguien se obtendra su informacion, si no mencionamos a nadie se obtendra la informacion de "Nosotros"
        const row = new MessageActionRow().addComponents(new MessageButton()
            .setStyle("LINK")
            .setURL(`${user.user.displayAvatarURL()}`)
            .setLabel("Link del avatar"));
        let status; // Hacemos un let vacio
        switch (user.presence.status) { // Hacemos un switch de la funcion Presencia
            case "online": // En el caso online..
                status = "🟢 En linea"; // hacemos que el status online pase a decir lo siguiente...
                break;
            case "dnd": // En el caso dnd..
                status = "⛔ No molestar"; // hacemos que el status dnd pase a decir lo siguiente...
                break;
            case "idle": // En el caso idle..
                status = "🌙 Ausente"; // hacemos que el status idle pase a decir lo siguiente...
                break;
            case "offline": // En el caso offline..
                status = "⚪ Desconectado"; // hacemos que el status offline pase a decir lo siguiente...
                break;
        }
        const embed = new MessageEmbed() // Hacemos un nuevo embed
            .setTitle(`Informacion del usuario ${user.user.username}`) // Titulo - Recibimos el "user" y decimos su "username"
            .setColor(`WHITE`) // Color para hacerlo mas bonito <3
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true })) // Un Thumbnail de la foto de perfil del "user".
            .addFields(// Hacemos nuevas Fields
        {
            name: "Nombre",
            value: user.user.username,
            inline: true
        }, {
            name: "Apodo: ",
            value: user.nickname ? user.nickname : "No tiene apodo",
            inline: true // En linea: SI
        }, {
            name: "#️⃣ Tag: ",
            value: `#${user.user.discriminator}`,
            inline: true // En linea: SI
        }, {
            name: "🆔 ID: ",
            value: user.user.id, // Del "user" sacamos su ID
        }, {
            name: "Reciente Actividad: ",
            value: user.presence.status ? status : "⚪ Desconectado",
            inline: true // En linea: SI
        }, {
            name: "Estado: ",
            value: user.presence.activities[0] ? user.presence.activities[0].state : "Sin estado",
            inline: true // En linea: SI
        }, {
            name: 'Avatar link: ',
            value: `En el botón.` // Del "user" obtenemos su Avatar Link, Hacemos que dentro del Array se encuentre el Link y cuando se de Click te reenviara una pagina viendo el avatar del "user"
        }, {
            name: 'Fecha de creación de la cuenta: ',
            value: user.user.createdAt.toLocaleDateString("es-co"),
            inline: true // En linea: SI
        }, {
            name: 'Fecha de entrada al Servidor: ',
            value: user.joinedAt.toLocaleDateString("es-co"),
            inline: true // En linea: SI
        }, {
            name: 'Roles del usuario: ',
            value: user.roles.cache.map(role => role.toString()).join(" "),
            inline: true // En linea: SI
        });
        try {
            message.reply({ embeds: [embed], components: [row] }); // Y enviamos el mensaje
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            console.log(err);
        }
    }
};
//# sourceMappingURL=userinfo.js.map