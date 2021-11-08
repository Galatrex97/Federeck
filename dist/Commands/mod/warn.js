"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const warn_1 = __importDefault(require("../../Models/warn"));
exports.command = {
    name: "warn",
    aliases: [],
    usage: 'warn <@usuario>',
    category: 'Mod',
    description: '...',
    run: (client, message, args) => {
        let possibleId = args[0];
        if (!message.member?.permissions.has('ADMINISTRATOR'))
            return message.reply(`No tienes el permiso **Administrador**`);
        const user = message.mentions.members?.first() || message.guild?.members.cache.get(possibleId);
        if (!user)
            return message.reply(`Debes mencionar a alguien`);
        if (user.id === client.user?.id)
            return message.reply("No puedes warnearme a mi.");
        let userX = message.member?.id;
        let mentionedUser = message.mentions.members?.first()?.id;
        if (userX === mentionedUser) {
            return message.channel.send("No puedes usar este comando contigo mismo(a).");
        }
        const reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "No se dió un motivo";
        warn_1.default.findOne({ guildid: message.guild?.id, user: user.id }, async (err, data) => {
            if (err) {
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                console.log(err);
            }
            ;
            if (!data) {
                data = new warn_1.default({
                    guildid: message.guild?.id,
                    user: user.user.id,
                    content: [
                        {
                            moderator: message.author.id,
                            reason: reason
                        }
                    ]
                });
            }
            else {
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                };
                data.content.push(obj);
            }
            data.save();
        });
        const server = message.guild;
        const nya = new discord_js_1.MessageEmbed()
            .setTitle(`${server.name}`)
            .setDescription(`${user} fue warneado por __${reason}__\nModerador: ${message.author}`)
            .setThumbnail(server.iconURL())
            .setColor("WHITE")
            .setFooter("Bien.")
            .setTimestamp();
        const xD = new discord_js_1.MessageEmbed()
            .setTitle("Warn")
            .setDescription(`Te han warneado en ${message.guild?.name} por ${reason}\nModerador: ${message.author}`)
            .setColor("WHITE")
            .setThumbnail(server.iconURL())
            .setFooter("...")
            .setTimestamp();
        message.channel.send({ embeds: [nya] });
        try {
            user.send({ embeds: [xD] });
        }
        catch (err) {
            console.log(err);
        }
    }
};
//# sourceMappingURL=warn.js.map