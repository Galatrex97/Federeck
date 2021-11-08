"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "stop",
    aliases: [],
    category: 'Música',
    usage: 'stop',
    description: 'Detiene la canción y la lista entera, esto hará que me salga del canal',
    run: async (client, message, args) => {
        let guildQueue = await client.distube.getQueue(message);
        if (!guildQueue) {
            return message.channel.send("No hay canciones reproduciéndose");
        }
        if (!message.member?.voice.channel)
            return message.channel.send("Debes estar en un canal de voz...");
        if (message.guild?.me?.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        try {
            client.distube.stop(message);
            message.channel.send("La musica se ha detenido correctamente.");
        }
        catch (err) {
            console.log(err);
            message.channel.send("Ha ocurrido un error.");
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
        }
    }
};
//# sourceMappingURL=stop.js.map