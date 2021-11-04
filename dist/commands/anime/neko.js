"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const clientnt = require("nekos.life");
const neko = new clientnt();
module.exports = {
    name: "neko",
    aliases: [],
    usage: 'neko',
    description: '...',
    category: 'Anime',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
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
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
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
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                message.channel.send("Ha ocurrido un error.");
            });
        }
    })
};
