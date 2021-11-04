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
    name: 'remove',
    category: 'Soporte',
    description: 'Remueve/elimina/quita un usuario de un ticket.',
    aliases: [],
    usage: 'remove <@usuario> (con el arroba)',
    userperms: ['ADMINISTRATOR'],
    botperms: [],
    run: (client, message, args, p) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (message.channel.name.includes('ticket-')) {
            const member = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.get(`${args[0]}`)) || ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]));
            if (!member) {
                return message.channel.send(`Uso incorrecto! Uso correcto: \`${p}remove @usuario\` (tiene que ser con el arroba)`);
            }
            try {
                message.channel.permissionOverwrites.edit(member.user, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false,
                    ATTACH_FILES: false,
                    READ_MESSAGE_HISTORY: false,
                }).then(() => {
                    message.channel.send(`${member} Ha sido removido de ${message.channel} corectamente.`);
                });
            }
            catch (e) {
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${e}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setColor("WHITE")
                    .setFooter('Tipico')
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                return message.channel.send('Un error ha ocurrido, vuelve a intentar.');
            }
        }
    }),
};
