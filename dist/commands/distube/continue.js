"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "continue",
    aliases: ["resume"],
    category: 'Música',
    usage: 'continue/resume',
    description: 'Continua la canción si ha sido pausada.',
    run: (client, message, args) => {
        var _a, _b, _c;
        const serverQueue = client.distube.getQueue(message);
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
            return message.channel.send("Debes estar en un canal de voz para usar este cmd");
        if (((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.voice.channel) && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("debes estar en el mismo canal de voz que yo");
        if (!serverQueue)
            return message.channel.send("No hay canciones reproduciendose...");
        if (!serverQueue.pause)
            return message.channel.send("La canción no está pausada.");
        try {
            client.distube.resume(message);
            message.channel.send("La canción fue reanudada correctamente.");
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            message.channel.send("Ha ocurrido un error.");
            console.log(err);
        }
    }
};
