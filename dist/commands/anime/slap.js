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
const discord_js_1 = require("discord.js");
const nekos_life_1 = __importDefault(require("nekos.life"));
const neko = new nekos_life_1.default();
module.exports = {
    name: "slap",
    aliases: ["abofetear", "cachetear"],
    usage: 'slap',
    description: 'Este comando abraza a un mencionado.',
    category: 'Anime',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const person = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!person)
            return message.reply("Debes mencionar a alguien.");
        neko.sfw.slap().then(asd => {
            const embed = new discord_js_1.MessageEmbed()
                .setDescription(`**${message.author.username}** abofetea a **${person.user.username}**`)
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
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            message.channel.send("Ha ocurrido un error.");
        });
    })
};
