"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const nekos_life_1 = __importDefault(require("nekos.life"));
const neko = new nekos_life_1.default();
module.exports = {
    name: "kiss",
    aliases: [],
    usage: 'kiss',
    category: 'Anime',
    description: 'Besa a alguien con este comando',
    run: (client, message, args) => {
        var _a;
        let nya = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!nya)
            return message.reply("Debes mencionar a alguien");
        neko.sfw.kiss().then(neko => {
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`${message.author.username} Le ha dado un beso a ${nya === null || nya === void 0 ? void 0 : nya.user.username}`)
                .setImage(neko.url)
                .setColor("WHITE")
                .setFooter("Para cuando la boda?")
                .setTimestamp();
            message.reply({ embeds: [embed] });
        }).catch(error => {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(error);
            message.channel.send("Ha ocurrido un error.");
        });
    }
};
