"use strict";
/* eslint-disable no-unused-vars */
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
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'open-ticket',
    category: 'Soporte',
    description: 'Re-abre un ticket.',
    aliases: [],
    usage: 'open',
    userperms: ['ADMINISTRATOR'],
    botperms: [],
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (message.channel.name.includes('ticket-')) {
            const member = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(message.channel.name.split('ticket-').join(''));
            try {
                message.channel.permissionOverwrites.edit(member.user, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    READ_MESSAGE_HISTORY: true,
                })
                    .then(() => {
                    message.reply(`El ticket se ha re-abierto ${message.channel}`);
                });
            }
            catch (e) {
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${e}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                return message.reply('Ha ocurrido un error, Intentalo otra vez.');
            }
        }
        else {
            return message.reply('No puedes usar este comando aqui, usalo en un ticket cerrado.');
        }
    }),
};
