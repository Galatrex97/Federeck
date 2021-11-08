"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "skip",
    aliases: [],
    category: 'Música',
    usage: 'skip',
    description: 'Salta una canción, pero puedes saltar más de una utilizando el comando jump.',
    run: async (client, message, args) => {
        let guildQueue = await client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        if (!guildQueue.songs[1]) {
            return message.channel.send("No hay otra canción para reproducir, si quieres saltarte la canción actual primero tienes que añadir una.");
        }
        if (!message.member?.voice.channel)
            return message.channel.send("Debes estar en un canal de voz...");
        if (message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        try {
            client.distube.skip(message);
            message.channel.send("La cancion fue omitida correctamente.");
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            message.channel.send("Ha ocurrido un error.");
            console.log(err);
        }
    }
};
//# sourceMappingURL=skip.js.map