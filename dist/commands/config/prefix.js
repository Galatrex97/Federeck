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
const discord_js_1 = __importDefault(require("discord.js"));
const prefix_1 = __importDefault(require("../../models/prefix"));
module.exports = {
    name: "setprefix",
    aliases: ["sp", "set-prefix"],
    category: 'Configuración',
    usage: 'setprefix/sp/set-prefix',
    description: 'Establece o cambia el prefix actual.',
    /**
     * @param { Message } message
     */
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("MANAGE_MESSAGES")))
            return message.reply("Necesitas el permiso **Gestionar mensajes para realizar este cambio.**").then(nya => {
                setTimeout(() => {
                    nya.delete();
                }, 7000);
            }).catch(error => {
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                console.log(error);
                message.channel.send("Ha ocurrido un error.");
            });
        const res = yield args.join(" ");
        let emoji = discord_js_1.default.Util.parseEmoji(res);
        const emojiRegex = require("emoji-regex");
        if (res.includes(`<:${emoji === null || emoji === void 0 ? void 0 : emoji.name}:${emoji === null || emoji === void 0 ? void 0 : emoji.id}>` || `<a:${emoji === null || emoji === void 0 ? void 0 : emoji.name}:${emoji === null || emoji === void 0 ? void 0 : emoji.id}>`) || res.length > 4 || res.match(emojiRegex)) {
            return message.reply('No puedes poner un prefix de más de 4 caracteres ni emojis.');
        }
        if (!res)
            return message.reply("A cuál prefix quieres cambiar?");
        prefix_1.default.findOne({ Guild: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d, _e;
            if (err) {
                console.log(err);
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            }
            ;
            if (data) {
                yield prefix_1.default.findOneAndDelete({ Guild: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id });
                data = new prefix_1.default({
                    Guild: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id,
                    Prefix: res
                });
                data.save();
                message.reply(`Mi prefix ha sido cambiado a **${res}**`);
            }
            else {
                data = new prefix_1.default({
                    Guild: (_e = message.guild) === null || _e === void 0 ? void 0 : _e.id,
                    Prefix: res
                });
                data.save();
                message.reply(`Mi prefix ha sido cambiado a **${res}**`);
            }
        }));
    })
};
