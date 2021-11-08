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
    name: "hentai",
    aliases: ['h'],
    usage: 'hentai/h',
    category: 'NSFW',
    description: 'Este comando muestra un gif hentai',
    run: async (client, message, args) => {
        if (!message.channel.nsfw)
            return message.reply("Este canal no es NSFW, abstienete de usar ese comando aqui.");
        neko.nsfw.randomHentaiGif().then(nya => {
            const a = new discord_js_1.default.MessageEmbed()
                .setTitle("Hentai GIF")
                .setImage(nya.url)
                .setColor("WHITE")
                .setTimestamp();
            message.reply({ embeds: [a] });
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
//# sourceMappingURL=hentai.js.map