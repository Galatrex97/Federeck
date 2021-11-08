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
    name: "anal",
    aliases: [],
    usage: 'anal',
    description: 'Dudo que tenga que describirlo',
    category: 'NSFW',
    run: async (client, message, args) => {
        if (!message.channel.nsfw)
            return message.channel.send("Este no es un canal **NSFW**");
        let userX = message.member?.id;
        let mentionedUser = message.mentions.members?.first()?.id;
        if (userX === mentionedUser) {
            return message.channel.send("No puedes hacerte un anal a ti mismo.");
        }
        let user = message.mentions.users.first();
        if (!user)
            return message.channel.send("Debes de mencionar a un usuario");
        neko.nsfw.anal().then(nya => {
            const embed = new discord_js_1.default.MessageEmbed()
                .setImage(nya.url)
                .setDescription(`**${message.author.username}** le esta haciendo un anal a **${user?.username}**`)
                .setColor("GREEN")
                .setTimestamp();
            message.channel.send({ embeds: [embed] });
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
//# sourceMappingURL=anal.js.map