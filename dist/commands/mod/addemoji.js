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
module.exports = {
    name: "add-emoji",
    aliases: ["addemoji"],
    usage: "add-emoji <:emoji:>",
    category: "Útil",
    description: `"Toma prestado" un emoji de otro servidor`,
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("MANAGE_EMOJIS_AND_STICKERS"))) {
            message.reply("Necesitas el permiso **Gestionar emojis** para usar este comando.");
            return;
        }
        if (!args.length) {
            message.reply("Por favor especifica el emoji");
            return;
        }
        for (let emojix of args) {
            let emojibv = discord_js_1.default.Util.parseEmoji(emojix);
            if (emojibv === null || emojibv === void 0 ? void 0 : emojibv.id) {
                let emojiExt = emojibv.animated ? ".gif" : ".png";
                let emojiURL = `https://cdn.discordapp.com/emojis/${emojibv.id + emojiExt}`;
                try {
                    (_b = message.guild) === null || _b === void 0 ? void 0 : _b.emojis.create(emojiURL, emojibv.name).then(emoji => message.channel.send(`El emoji (<:${emoji.name}:${emoji.id}>) ha sido añadido al servidor.`));
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
                    client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                }
            }
        }
    })
};
