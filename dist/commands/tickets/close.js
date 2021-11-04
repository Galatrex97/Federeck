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
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'close-ticket',
    category: 'Soporte',
    description: 'Cierra el ticket.',
    aliases: [],
    usage: 'close',
    run: (client, message, args, p) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (message.channel.name.includes('ticket-')) {
            const member = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(message.channel.name.split('ticket-').join(''));
            if (((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has('ADMINISTRATOR')) || message.channel.name === `ticket-${message.author.id}`) {
                message.channel.messages.fetch().then((messages) => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        message.channel.permissionOverwrites.edit(member.user, {
                            VIEW_CHANNEL: false,
                            SEND_MESSAGES: false,
                            ATTACH_FILES: false,
                            READ_MESSAGE_HISTORY: false,
                        }).then(() => {
                            message.channel.send(`<a:see:804825153770881054> | Este ticket ha sido Cerrado ${message.channel} si quieres eliminar el ticket usa ${p}delete-ticket.`);
                        }).catch(error => {
                            console.log(error);
                            message.channel.send("Ha ocurrido un error.");
                        });
                    }
                    catch (e) {
                        console.log(e);
                        let errmsg = new discord_js_1.MessageEmbed()
                            .setTitle('Ha ocurrido un error')
                            .setDescription(`**Tengo el siguiente error:** ${e}`)
                            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                            .setFooter('Tipico')
                            .setTimestamp()
                            .setColor("WHITE");
                        client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                        return message.channel.send('Un error ha ocurrido, intentalo de nuevo.');
                    }
                }));
            }
            else {
                return message.reply('No puedes usar este comando aqui, usalo cuando quieras cerrar un ticket.');
            }
        }
    })
};
