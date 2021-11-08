"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const nekos_life_1 = __importDefault(require("nekos.life"));
const neko = new nekos_life_1.default();
exports.command = {
    name: "bj",
    aliases: ["mamada"],
    usage: '',
    description: '',
    category: 'NSFW',
    run: async (client, message, args) => {
        if (!message.channel.nsfw)
            return message.channel.send("Este no es un canal **NSFW**");
        let userX = message.member?.id;
        let mentionedUser = message.mentions.members?.first()?.id;
        if (userX === mentionedUser) {
            return message.channel.send("No puedes hacerte una mamada a ti mismo.");
        }
        const user = message.mentions.members?.first();
        if (!user)
            return message.reply("Debes mencionar a alguien.");
        neko.nsfw.bJ().then(awwia => {
            const sag = new discord_js_1.MessageEmbed()
                .setDescription(`**${message.author.username}** le hace una mamada a **${user.user.username}**`)
                .setImage(awwia.url)
                .setColor("WHITE")
                .setFooter("Inviten")
                .setTimestamp();
            message.reply({ embeds: [sag] });
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
//# sourceMappingURL=bj.js.map