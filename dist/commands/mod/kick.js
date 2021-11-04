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
    name: "kick",
    aliases: ["pg"],
    category: 'Mod',
    usage: 'kick/pg',
    description: 'Expulsa a alguien del server.',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let owner = (yield message.guild.fetchOwner()).user.id;
        let perms = (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("KICK_MEMBERS");
        if (!perms)
            return message.reply("No tienes los permisos requeridos para **Expulsar miembros**");
        const user = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
        if (!user)
            return message.reply("Debes mencionar a alguien");
        if (user.id === message.author.id)
            return message.reply("Es enserio? :neutral_face:");
        if (user.id === client.user.id)
            return message.reply('😔');
        if (user.id === owner)
            return message.reply("No se puede kickear al dueño del servidor. XD?");
        if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0)
            return message.reply("No puedes banear a esa persona por que tiene un mayor o igual rango que tú.");
        let reason = args.slice(1).join(' ');
        if (!reason) {
            reason = 'No especificado';
        }
        try {
            user.kick(reason);
        }
        catch (err) {
            console.log(err);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
        message.reply(`El usuario **${user}** fue expulsado por **${reason}**\nModerador: **${message.author}**`);
    })
};
