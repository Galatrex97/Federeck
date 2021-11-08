"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "continue",
    aliases: ["resume"],
    category: 'Música',
    usage: 'continue/resume',
    description: 'Continua la canción si ha sido pausada.',
    run: (client, message, args) => {
        const serverQueue = client.distube.getQueue(message);
        if (!message.member?.voice.channel)
            return message.channel.send("Debes estar en un canal de voz para usar este cmd");
        if (message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
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
            message.channel.send("Ha ocurrido un error.");
            console.log(err);
        }
    }
};
//# sourceMappingURL=continue.js.map