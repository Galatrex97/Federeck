"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const clientnt = require("nekos.life");
const neko = new clientnt();
exports.command = {
    name: "neko",
    aliases: [],
    usage: 'neko',
    description: '...',
    category: 'Anime',
    run: async (client, message, args) => {
        if (!message.channel.nsfw) {
            neko.sfw.neko().then(asd => {
                const embed = new MessageEmbed()
                    .setDescription(`Meow`)
                    .setImage(asd.url)
                    .setColor("WHITE");
                message.reply({ embeds: [embed] });
            }).catch(error => {
                console.log(error);
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                message.channel.send("Ha ocurrido un error.");
            });
        }
        else if (message.channel.nsfw) {
            neko.nsfw.neko().then(aa => {
                const embed = new MessageEmbed()
                    .setDescription("Nekos")
                    .setFooter("Nya~")
                    .setTimestamp()
                    .setColor("WHITE")
                    .setImage(aa.url);
                message.reply({ embeds: [embed] });
            }).catch(error => {
                console.log(error);
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                message.channel.send("Ha ocurrido un error.");
            });
        }
    }
};
//# sourceMappingURL=neko.js.map