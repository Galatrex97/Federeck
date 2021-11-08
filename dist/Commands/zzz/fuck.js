"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const nekos_life_1 = __importDefault(require("nekos.life"));
const neko = new nekos_life_1.default();
exports.command = {
    name: "fuck",
    aliases: ["follar", 'coger'],
    usage: 'fuck/follar/coger',
    category: 'NSFW',
    description: 'Cogerse a alguien XD',
    run: async (client, message, args) => {
        if (!message.channel.nsfw)
            return message.channel.send("Este no es un canal **NSFW**");
        let userX = message.member?.id;
        let mentionedUser = message.mentions.members?.first()?.id;
        if (userX === mentionedUser) {
            return message.channel.send("No puedes follarte a ti mismo.");
        }
        let user = message.mentions.users.first();
        if (!user)
            return message.channel.send("Debes mencionar a un usuario");
        neko.nsfw.classic().then(aaa => {
            const embed = new discord_js_1.default.MessageEmbed()
                .setImage(aaa.url)
                .setDescription(`**${message.author.username}** se folló a **${user?.username}**`)
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
            message.channel.send("Ha ocurrido un error.");
        });
    }
};
//# sourceMappingURL=fuck.js.map