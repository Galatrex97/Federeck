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
const nekos_life_1 = __importDefault(require("nekos.life"));
const neko = new nekos_life_1.default();
module.exports = {
    name: "fuck",
    aliases: ["follar", 'coger'],
    usage: 'fuck/follar/coger',
    category: 'NSFW',
    description: 'Cogerse a alguien XD',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!message.channel.nsfw)
            return message.channel.send("Este no es un canal **NSFW**");
        let user = message.mentions.users.first();
        if (!user)
            return message.channel.send("Debes mencionar a un usuario");
        neko.nsfw.classic().then(aaa => {
            const embed = new discord_js_1.default.MessageEmbed()
                .setImage(aaa.url)
                .setDescription(`**${message.author.username}** se folló a **${user === null || user === void 0 ? void 0 : user.username}**`)
                .setColor("GREEN")
                .setTimestamp();
            message.reply({ embeds: [embed] });
        }).catch(error => {
            console.log(error);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            message.channel.send("Ha ocurrido un error.");
        });
    })
};
