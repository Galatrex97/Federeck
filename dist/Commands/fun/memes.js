"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_memes_1 = __importDefault(require("discord-memes"));
exports.command = {
    name: "meme",
    aliases: ["momo"],
    category: 'Fun',
    usage: 'meme/',
    description: 'Hace que envié un meme al azar',
    run: (client, message, args) => {
        try {
            return message.channel.send(discord_memes_1.default.deTodoEspañol());
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            console.log(err);
        }
    }
};
//# sourceMappingURL=memes.js.map