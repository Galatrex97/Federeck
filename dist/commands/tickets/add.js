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
    name: 'add',
    category: 'Soporte',
    description: 'Añade un usuario a un ticket.',
    aliases: [],
    usage: 'add <@usuario>',
    userperms: ['ADMINISTRATOR'],
    botperms: [],
    run: (client, message, args, p) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (message.channel.name.includes('ticket-')) {
            const member = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(args[0])) || ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]));
            if (!member) {
                return message.channel.send(`Uso incorrecto! El uso correcto es: \`${p}add @usuario\` (tiene que ser con el arroba, puedes copiarlo de otro canal)`);
            }
            try {
                message.channel.permissionOverwrites.edit(member.user, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    READ_MESSAGE_HISTORY: true,
                }).then(() => {
                    message.channel.send(`${member} fue añadido correctamente a ${message.channel}`);
                });
            }
            catch (e) {
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${e}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                return message.channel.send('Ha ocurrido un error, vuelve a intentarlo!');
            }
        }
    }),
};
