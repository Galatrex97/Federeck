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
    name: "boobs",
    aliases: [],
    usage: 'boobs',
    category: 'NSFW',
    description: 'Tetas XD',
    run: async (client, message, args) => {
        if (!message.channel.nsfw)
            return message.channel.send("Este no es un canal **NSFW**");
        neko.nsfw.boobs().then(rico => {
            const embed = new discord_js_1.default.MessageEmbed()
                .setImage(rico.url)
                .setDescription(`Disfrutalo **${message.author.username}**`)
                .setColor("WHITE")
                .setTimestamp();
            message.channel.send({ embeds: [embed] });
        }).catch(error => {
            console.log(error);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            message.channel.send("Ha ocurrido un error.");
        });
    }
};
//# sourceMappingURL=boobs.js.map