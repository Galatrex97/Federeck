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
    name: "jump",
    aliases: ["saltar"],
    category: 'Música',
    usage: 'jump/saltar',
    description: 'Salta entre canciones de la playlist, por ejemplo saltarse de la 1era canción hasta la 4ta.',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        let guildQueue = yield client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        let parsedArgs = parseInt(args[0]);
        if (isNaN(parsedArgs)) {
            return message.channel.send("Tienes que dar el **número** de posición en la lista de la canción deseada.");
        }
        if (!guildQueue.songs[parsedArgs]) {
            return message.channel.send("No hay ninguna canción en esa posición en la lista de reproducción actual.");
        }
        try {
            client.distube.jump(message, parseInt(args[0]));
        }
        catch (err) {
            message.channel.send("Ha ocurrido un error.");
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
    })
};
