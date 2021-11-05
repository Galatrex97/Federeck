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
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "volume",
    aliases: ["vol"],
    category: 'Música',
    usage: 'volume/vol',
    description: 'Cambia el volumen 😐',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        let guildQueue = yield client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        const nya = args[0];
        let parsedNya = parseInt(nya);
        if (isNaN(parsedNya)) {
            return message.reply("Me pasó mañana.").then(() => message.react("<a:xdd:841332542220927016>"));
        }
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
            return message.channel.send("Debes estar en un canal de voz...");
        if (((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.voice.channel) && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        try {
            client.distube.setVolume(message, nya);
            message.react("<a:vale:798231883024433163>");
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            message.reply("No hay nada reproduciendose.");
        }
    })
};
