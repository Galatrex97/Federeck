"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "snipe",
    aliases: [],
    usage: 'snipe',
    category: 'Misceláneo',
    description: 'Muestra un mensaje recientemente eliminado.',
    run: (client, message, args) => {
        const channel = message.mentions.channels.first() || message.channel;
        //en esta constante definimos un canal mencionado y si no el canal donde se ejecuto el cmd
        const msg = client.snipes.get(channel.id);
        //en esta constante definimos nuestro client.snipes que es nuestro objeto Map, con el metodo .get() tratamos de ver si channel.id(id del canal) esta dentro del Map  
        if (!msg) {
            message.reply("No se ha borrado recientemente ningun mensaje")
                .then(m => m.delete()).catch(error => {
                console.log(error);
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                message.channel.send("Ha ocurrido un error.");
            });
            //Si no lo esta mandamos este mensaje ^    
        }
        else {
            const main = new discord_js_1.MessageEmbed()
                .setColor("WHITE")
                .setAuthor(`Mensaje Escrito de ${msg.delete.tag}`, msg.delete.displayAvatarURL())
                .addField("Canal", `<#${msg.canal.id}>`)
                .setDescription(`${msg.content}`);
            message.reply({ embeds: [main] });
        }
        /*
        Cada Valor esta en el evento messageDelete del cual en el comando los vas a obtener.
        */
    }
};
//# sourceMappingURL=snipe.js.map