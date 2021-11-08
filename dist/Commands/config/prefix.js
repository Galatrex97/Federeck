"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const prefix_1 = __importDefault(require("../../Models/prefix"));
exports.command = {
    name: "setprefix",
    aliases: ["sp", "set-prefix"],
    category: 'Configuración',
    usage: 'setprefix/sp/set-prefix',
    description: 'Establece o cambia el prefix actual.',
    /**
     * @param { Message } message
     */
    run: async (client, message, args) => {
        if (!message.member?.permissions.has("MANAGE_MESSAGES"))
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
                console.log(error);
                message.channel.send("Ha ocurrido un error.");
            });
        const res = args.join(" ");
        let emoji = discord_js_1.default.Util.parseEmoji(res);
        const emojiRegex = require("emoji-regex");
        if (res.includes(`<:${emoji?.name}:${emoji?.id}>` || `<a:${emoji?.name}:${emoji?.id}>`) || res.length > 4 || res.match(emojiRegex)) {
            return message.reply('No puedes poner un prefix de más de 4 caracteres ni emojis.');
        }
        if (!res)
            return message.reply("A cuál prefix quieres cambiar?");
        prefix_1.default.findOne({ Guild: message.guild?.id }, async (err, data) => {
            if (err) {
                console.log(err);
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
            }
            ;
            if (data) {
                await prefix_1.default.findOneAndDelete({ Guild: message.guild?.id });
                data = new prefix_1.default({
                    Guild: message.guild?.id,
                    Prefix: res
                });
                data.save();
                message.reply(`Mi prefix ha sido cambiado a **${res}**`);
            }
            else {
                data = new prefix_1.default({
                    Guild: message.guild?.id,
                    Prefix: res
                });
                data.save();
                message.reply(`Mi prefix ha sido cambiado a **${res}**`);
            }
        });
    }
};
//# sourceMappingURL=prefix.js.map