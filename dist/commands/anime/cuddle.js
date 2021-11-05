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
    name: "cuddle",
    aliases: [],
    usage: 'cuddle',
    description: 'Este comando abraza a un mencionado.',
    category: 'Anime',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const person = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        if (!person)
            return message.reply("Debes mencionar a alguien.");
        let user = (_b = message.member) === null || _b === void 0 ? void 0 : _b.id;
        let mentionedUser = (_d = (_c = message.mentions.members) === null || _c === void 0 ? void 0 : _c.first()) === null || _d === void 0 ? void 0 : _d.id;
        if (user === mentionedUser) {
            return message.channel.send("No puedes usar este comando contigo mismo(a).");
        }
        neko.sfw.cuddle().then(asd => {
            const embed = new discord_js_1.MessageEmbed()
                .setDescription(`**${message.author.username}** Abraza a **${person.user.username}**`)
                .setImage(asd.url)
                .setColor("WHITE");
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
    })
};
