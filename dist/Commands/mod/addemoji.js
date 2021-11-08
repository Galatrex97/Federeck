"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
exports.command = {
    name: "add-emoji",
    aliases: ["addemoji"],
    usage: "add-emoji <:emoji:>",
    category: "Útil",
    description: `"Toma prestado" un emoji de otro servidor`,
    run: async (client, message, args) => {
        if (!message.member?.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
            message.reply("Necesitas el permiso **Gestionar emojis** para usar este comando.");
            return;
        }
        if (!args.length) {
            message.reply("Por favor especifica el emoji");
            return;
        }
        for (let emojix of args) {
            let emojibv = discord_js_1.default.Util.parseEmoji(emojix);
            if (emojibv?.id) {
                let emojiExt = emojibv.animated ? ".gif" : ".png";
                let emojiURL = `https://cdn.discordapp.com/emojis/${emojibv.id + emojiExt}`;
                try {
                    message.guild?.emojis.create(emojiURL, emojibv.name).then(emoji => message.channel.send(`El emoji (<:${emoji.name}:${emoji.id}>) ha sido añadido al servidor.`));
                }
                catch (err) {
                    console.log(err);
                    let errmsg = new (require('discord.js')).MessageEmbed()
                        .setTitle('Ha ocurrido un error')
                        .setDescription(`**Tengo el siguiente error:** ${err}`)
                        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                        .setFooter('Tipico')
                        .setColor("WHITE")
                        .setTimestamp();
                }
            }
        }
    }
};
//# sourceMappingURL=addemoji.js.map