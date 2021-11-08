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
    name: "hug",
    aliases: ["abrazar"],
    usage: 'hug',
    description: 'Este comando abraza a un mencionado.',
    category: 'Anime',
    run: async (client, message, args) => {
        const person = message.mentions.members?.first();
        if (!person)
            return message.reply("Debes mencionar a alguien.");
        let user = message.member?.id;
        let mentionedUser = message.mentions.members?.first()?.id;
        if (user === mentionedUser) {
            return message.channel.send("No puedes usar este comando contigo mismo(a).");
        }
        neko.sfw.hug().then(asd => {
            const embed = new discord_js_1.MessageEmbed()
                .setDescription(`**${message.author.username}** Abraza a **${person.user.username}**`)
                .setImage(asd.url)
                .setColor("WHITE");
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
//# sourceMappingURL=hug.js.map