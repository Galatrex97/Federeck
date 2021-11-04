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
        let guildQueue = yield client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        const nya = args[0];
        let parsedNya = parseInt(nya);
        if (isNaN(parsedNya)) {
            return message.reply("Me pasó mañana.").then(() => message.react("<a:xdd:841332542220927016>"));
        }
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
