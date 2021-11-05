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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const warn_js_1 = __importDefault(require("../../models/warn.js"));
module.exports = {
    name: "warn",
    aliases: [],
    usage: 'warn <@usuario>',
    category: 'Mod',
    description: '...',
    run: (client, message, args) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let possibleId = args[0];
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has('ADMINISTRATOR')))
            return message.reply(`No tienes el permiso **Administrador**`);
        const user = ((_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first()) || ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.cache.get(possibleId));
        if (!user)
            return message.reply(`Debes mencionar a alguien`);
        if (user.id === client.user.id)
            return message.reply("No puedes warnearme a mi.");
        let userX = (_d = message.member) === null || _d === void 0 ? void 0 : _d.id;
        let mentionedUser = (_f = (_e = message.mentions.members) === null || _e === void 0 ? void 0 : _e.first()) === null || _f === void 0 ? void 0 : _f.id;
        if (userX === mentionedUser) {
            return message.channel.send("No puedes usar este comando contigo mismo(a).");
        }
        const reason = args.slice(1).join(" ") ? args.slice(1).join(" ") : "No se dió un motivo";
        warn_js_1.default.findOne({ guildid: (_g = message.guild) === null || _g === void 0 ? void 0 : _g.id, user: user.id }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            var _j;
            if (err) {
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                console.log(err);
            }
            ;
            if (!data) {
                data = new warn_js_1.default({
                    guildid: (_j = message.guild) === null || _j === void 0 ? void 0 : _j.id,
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
        }));
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
            .setDescription(`Te han warneado en ${(_h = message.guild) === null || _h === void 0 ? void 0 : _h.name} por ${reason}\nModerador: ${message.author}`)
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
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
    }
};
