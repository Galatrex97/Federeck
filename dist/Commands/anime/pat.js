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
    name: "pat",
    aliases: [],
    usage: 'pat',
    description: 'Este comando da una palmada a un mencionado.',
    category: 'Anime',
    run: async (client, message, args) => {
        let user = message.member?.id;
        let mentionedUser = message.mentions.members?.first()?.id;
        if (user === mentionedUser) {
            return message.channel.send("No puedes usar este comando contigo mismo(a).");
        }
        const person = message.mentions.members?.first();
        if (!person)
            return message.reply("Debes mencionar a alguien.");
        neko.sfw.pat().then(asd => {
            const embed = new discord_js_1.MessageEmbed()
                .setDescription(`**${message.author.username}** le da una palmadita a **${person.user.username}**`)
                .setImage(asd.url)
                .setColor("WHITE");
            message.reply({ embeds: [embed] });
        }).catch(error => {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            console.log(error);
            message.channel.send("Ha ocurrido un error.");
        });
    }
};
//# sourceMappingURL=pat.js.map