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
    name: "unban",
    aliases: ["desbanear"],
    category: 'Mod',
    usage: 'unban/desbanear <id de la persona baneada>',
    description: 'Desbanea a alguien.',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("BAN_MEMBERS"))) {
            return message.channel.send("No tienes los permisos requeridos para **Desbanear Miembros**");
        }
        if (!((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.permissions.has("BAN_MEMBERS")))
            return message.channel.send("No tengo los permisos requeridos para poder ejecutar este comando.");
        let userId = args[0];
        if (!userId)
            return message.channel.send("Debes escribir un ID");
        if (isNaN(userId))
            return message.channel.send("El id debe ser un numero");
        const member = yield client.users.fetch(userId);
        message.guild.bans.fetch().then((bans) => __awaiter(void 0, void 0, void 0, function* () {
            var _d;
            if (bans.size === 0)
                return message.reply("El server no tiene ningún miembro baneado.");
            let bannedUser = bans.find(ban => ban.user.id == userId);
            if (!bannedUser)
                return message.channel.send("Ese miembro no está baneado.");
            yield ((_d = message.guild) === null || _d === void 0 ? void 0 : _d.members.unban(bannedUser.user).catch(err => {
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                return message.channel.send("Algo salió mal.");
            }).then(() => {
                message.channel.send(`El usuario ${member} fue Desbaneado`);
            }).catch(error => {
                console.log(error);
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                message.channel.send("Ha ocurrido un error.");
            }));
        })).catch(error => {
            console.log(error);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            message.channel.send("Ha ocurrido un error.");
        });
    })
};
